package migrate

import (
	"context"
	"crypto/sha256"
	"embed"
	"encoding/hex"
	"errors"
	"fmt"
	"io/fs"
	"sort"
	"strconv"
	"strings"

	"database/sql"
)

const advisoryLockID int64 = 731905210044

//go:embed migrations/*.sql
var migrationFiles embed.FS

type migration struct {
	version int64
	name    string
	sql     string
	checksum string
}

func Up(ctx context.Context, db *sql.DB) error {
	return UpFS(ctx, db, migrationFiles)
}

// UpFS applies only new, forward-only SQL migrations. It never changes or
// removes an already-applied migration. The filesystem parameter is exposed
// to make migration behavior testable without a running application server.
func UpFS(ctx context.Context, db *sql.DB, source fs.FS) error {
	if db == nil {
		return errors.New("database is required")
	}

	migrations, err := load(source)
	if err != nil {
		return err
	}

	conn, err := db.Conn(ctx)
	if err != nil {
		return fmt.Errorf("reserve migration connection: %w", err)
	}
	defer conn.Close()

	if _, err := conn.ExecContext(ctx, "SELECT pg_advisory_lock($1)", advisoryLockID); err != nil {
		return fmt.Errorf("acquire migration lock: %w", err)
	}
	defer func() {
		_, _ = conn.ExecContext(context.Background(), "SELECT pg_advisory_unlock($1)", advisoryLockID)
	}()

	if _, err := conn.ExecContext(ctx, "CREATE SCHEMA IF NOT EXISTS pluits_meta"); err != nil {
		return fmt.Errorf("create migration metadata schema: %w", err)
	}
	if _, err := conn.ExecContext(ctx, `
		CREATE TABLE IF NOT EXISTS pluits_meta.schema_migrations (
			version BIGINT PRIMARY KEY,
			name TEXT NOT NULL UNIQUE,
			checksum TEXT NOT NULL,
			applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
		)
	`); err != nil {
		return fmt.Errorf("create migration ledger: %w", err)
	}

	rows, err := conn.QueryContext(ctx, "SELECT version, name, checksum FROM pluits_meta.schema_migrations ORDER BY version")
	if err != nil {
		return fmt.Errorf("read migration ledger: %w", err)
	}
	applied := make(map[int64]migration, len(migrations))
	for rows.Next() {
		var item migration
		if err := rows.Scan(&item.version, &item.name, &item.checksum); err != nil {
			_ = rows.Close()
			return fmt.Errorf("scan migration ledger: %w", err)
		}
		applied[item.version] = item
	}
	if err := rows.Err(); err != nil {
		_ = rows.Close()
		return fmt.Errorf("iterate migration ledger: %w", err)
	}
	if err := rows.Close(); err != nil {
		return fmt.Errorf("close migration ledger: %w", err)
	}

	known := make(map[int64]struct{}, len(migrations))
	var highestApplied int64
	for version, previous := range applied {
		if version > highestApplied {
			highestApplied = version
		}
	}
	for _, item := range migrations {
		known[item.version] = struct{}{}
	}
	for version, previous := range applied {
		if _, ok := known[version]; !ok {
			return fmt.Errorf("applied migration %d (%s) is missing from source; restore the original file instead of rewriting history", version, previous.name)
		}
	}

	for _, item := range migrations {
		if _, ok := applied[item.version]; !ok && item.version <= highestApplied {
			return fmt.Errorf("migration %s is older than the latest applied migration; refusing out-of-order history", item.name)
		}
		if previous, ok := applied[item.version]; ok {
			if previous.name != item.name || previous.checksum != item.checksum {
				return fmt.Errorf("applied migration %d was changed: database has %s (%s), source has %s (%s)", item.version, previous.name, previous.checksum, item.name, item.checksum)
			}
			continue
		}

		tx, err := conn.BeginTx(ctx, nil)
		if err != nil {
			return fmt.Errorf("begin migration %s: %w", item.name, err)
		}
		if _, err := tx.ExecContext(ctx, item.sql); err != nil {
			_ = tx.Rollback()
			return fmt.Errorf("execute migration %s: %w", item.name, err)
		}
		if _, err := tx.ExecContext(ctx,
			"INSERT INTO pluits_meta.schema_migrations (version, name, checksum) VALUES ($1, $2, $3)",
			item.version, item.name, item.checksum,
		); err != nil {
			_ = tx.Rollback()
			return fmt.Errorf("record migration %s: %w", item.name, err)
		}
		if err := tx.Commit(); err != nil {
			return fmt.Errorf("commit migration %s: %w", item.name, err)
		}
	}

	return nil
}

func load(source fs.FS) ([]migration, error) {
	entries, err := fs.ReadDir(source, "migrations")
	if err != nil {
		return nil, fmt.Errorf("read migrations directory: %w", err)
	}
	result := make([]migration, 0, len(entries))
	for _, entry := range entries {
		if entry.IsDir() || !strings.HasSuffix(entry.Name(), ".sql") {
			continue
		}
		name := entry.Name()
		prefix := strings.SplitN(name, "_", 2)
		if len(prefix) != 2 {
			return nil, fmt.Errorf("invalid migration filename %q: expected <version>_<name>.sql", name)
		}
		version, err := strconv.ParseInt(prefix[0], 10, 64)
		if err != nil || version < 1 {
			return nil, fmt.Errorf("invalid migration version in %q", name)
		}
		body, err := fs.ReadFile(source, "migrations/"+name)
		if err != nil {
			return nil, fmt.Errorf("read migration %s: %w", name, err)
		}
		sum := sha256.Sum256(body)
		result = append(result, migration{
			version: version,
			name: name,
			sql: string(body),
			checksum: hex.EncodeToString(sum[:]),
		})
	}
	sort.Slice(result, func(i, j int) bool { return result[i].version < result[j].version })
	for i := 1; i < len(result); i++ {
		if result[i-1].version == result[i].version {
			return nil, fmt.Errorf("duplicate migration version %d", result[i].version)
		}
	}
	return result, nil
}
