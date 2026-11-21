package migrate

import (
	"context"
	"database/sql"
	"io/fs"
	"os"
	"testing"
	"testing/fstest"

	_ "github.com/jackc/pgx/v5/stdlib"
)

func TestMigrationRunnerIsIdempotentAndProtectsHistory(t *testing.T) {
	dsn := os.Getenv("DATABASE_TEST_URL")
	if dsn == "" {
		t.Skip("DATABASE_TEST_URL is not set; PostgreSQL integration test runs in CI")
	}
	ctx := context.Background()
	db, err := sql.Open("pgx", dsn)
	if err != nil {
		t.Fatal(err)
	}
	defer db.Close()
	if err := db.PingContext(ctx); err != nil {
		t.Fatal(err)
	}

	if err := Up(ctx, db); err != nil {
		t.Fatalf("first migration run: %v", err)
	}
	if err := Up(ctx, db); err != nil {
		t.Fatalf("second migration run should be idempotent: %v", err)
	}

	var count int
	if err := db.QueryRowContext(ctx, "SELECT COUNT(*) FROM pluits_meta.schema_migrations WHERE version = 1").Scan(&count); err != nil {
		t.Fatal(err)
	}
	if count != 1 {
		t.Fatalf("expected exactly one ledger record for migration 1, got %d", count)
	}
	var latestMigrationCount int
	if err := db.QueryRowContext(ctx, "SELECT COUNT(*) FROM pluits_meta.schema_migrations WHERE version = 7").Scan(&latestMigrationCount); err != nil { t.Fatal(err) }
	if latestMigrationCount != 1 { t.Fatalf("expected migration 7 to be applied exactly once, got %d", latestMigrationCount) }
	var productCount int
	if err := db.QueryRowContext(ctx, "SELECT COUNT(*) FROM pluits.platform_products WHERE product_key='pluits'").Scan(&productCount); err != nil { t.Fatal(err) }
	if productCount != 1 { t.Fatalf("expected PLUITS core product to be registered, got %d", productCount) }

	var identityMigrationCount int
	if err := db.QueryRowContext(ctx, "SELECT COUNT(*) FROM pluits_meta.schema_migrations WHERE version = 2").Scan(&identityMigrationCount); err != nil {
		t.Fatal(err)
	}
	if identityMigrationCount != 1 {
		t.Fatalf("expected exactly one ledger record for migration 2, got %d", identityMigrationCount)
	}

	for _, table := range []string{
		"pluits.accounts",
		"pluits.account_emails",
		"pluits.account_credentials",
		"pluits.personal_profiles",
		"pluits.email_verification_challenges",
		"pluits.sessions",
		"pluits.security_events",
		"pluits.email_outbox",
		"pluits.rate_limit_buckets",
		"pluits.workspaces",
		"pluits.workspace_memberships",
		"pluits.authorization_roles",
		"pluits.authorization_permissions",
		"pluits.role_permissions",
		"pluits.membership_roles",
		"pluits.workspace_product_grants",
		"pluits.account_consents",
		"pluits.password_reset_challenges",
		"pluits.platform_products",
	} {
		var actual sql.NullString
		if err := db.QueryRowContext(ctx, "SELECT to_regclass($1)", table).Scan(&actual); err != nil {
			t.Fatal(err)
		}
		if !actual.Valid {
			t.Errorf("expected identity table %s to exist after migrations", table)
		}
	}

	changed := fstest.MapFS{
		"migrations/000001_platform_namespace.sql": &fstest.MapFile{Data: []byte("CREATE SCHEMA IF NOT EXISTS pluits; -- changed\n")},
	}
	if err := UpFS(ctx, db, changed); err == nil {
		t.Fatal("expected changed applied migration to be rejected")
	}

	missing := fstest.MapFS{"migrations": &fstest.MapFile{Mode: fs.ModeDir}}
	if err := UpFS(ctx, db, missing); err == nil {
		t.Fatal("expected missing applied migration to be rejected")
	}
}
