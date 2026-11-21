package identity

import (
	"context"
	"database/sql"
	"os"
	"testing"
	"time"

	"github.com/baguskristiansianturi/pluits/backend/internal/migrate"
	_ "github.com/jackc/pgx/v5/stdlib"
)

func TestRateLimiterSharesFixedWindowStateInPostgres(t *testing.T) {
	dsn := os.Getenv("DATABASE_TEST_URL")
	if dsn == "" { t.Skip("DATABASE_TEST_URL is not set; PostgreSQL rate-limit test runs in CI") }
	ctx := context.Background()
	db, err := sql.Open("pgx", dsn)
	if err != nil { t.Fatal(err) }
	defer db.Close()
	if err := migrate.Up(ctx, db); err != nil { t.Fatal(err) }
	key := make([]byte, 32)
	for i := range key { key[i] = byte(i+33) }
	limiter, err := NewRateLimiter(db, key)
	if err != nil { t.Fatal(err) }
	identifier := "192.0.2." + time.Now().UTC().Format("150405.000000000")
	for i := 0; i < 2; i++ {
		allowed, err := limiter.Allow(ctx, "test.login", identifier, 2, time.Minute)
		if err != nil { t.Fatal(err) }
		if !allowed { t.Fatalf("request %d should be allowed", i+1) }
	}
	allowed, err := limiter.Allow(ctx, "test.login", identifier, 2, time.Minute)
	if err != nil { t.Fatal(err) }
	if allowed { t.Fatal("third request should be rate limited") }
}
