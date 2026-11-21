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

func TestRegistrationVerificationLifecyclePostgres(t *testing.T) {
	dsn := os.Getenv("DATABASE_TEST_URL")
	if dsn == "" { t.Skip("DATABASE_TEST_URL is not set; PostgreSQL lifecycle test runs in CI") }
	ctx := context.Background()
	db, err := sql.Open("pgx", dsn)
	if err != nil { t.Fatal(err) }
	defer db.Close()
	if err := migrate.Up(ctx, db); err != nil { t.Fatal(err) }

	key := make([]byte, 32)
	for i := range key { key[i] = byte(i + 1) }
	service, err := NewService(db, key, 1)
	if err != nil { t.Fatal(err) }

	email := "identity-" + time.Now().UTC().Format("20060102150405.000000000") + "@example.test"
	result, err := service.Register(ctx, RegistrationInput{
		Email: email, Password: "strong-test-password-123", DisplayName: "CI Identity",
	})
	if err != nil { t.Fatal(err) }
	if !result.Accepted { t.Fatal("expected accepted registration") }

	var accountID, normalized string
	if err := db.QueryRowContext(ctx, `
		SELECT a.id::text, e.email_normalized
		FROM pluits.accounts a JOIN pluits.account_emails e ON e.account_id = a.id
		WHERE e.email_normalized = $1
	`, email).Scan(&accountID, &normalized); err != nil { t.Fatal(err) }
	if normalized != email { t.Fatalf("unexpected normalized email %q", normalized) }

	var status string
	if err := db.QueryRowContext(ctx, "SELECT status FROM pluits.accounts WHERE id = $1", accountID).Scan(&status); err != nil { t.Fatal(err) }
	if status != "pending_verification" { t.Fatalf("expected pending verification, got %s", status) }

	var encrypted []byte
	if err := db.QueryRowContext(ctx, `
		SELECT payload_ciphertext FROM pluits.email_outbox
		WHERE account_id = $1 AND template_key = 'verify_email'
		ORDER BY created_at DESC LIMIT 1
	`, accountID).Scan(&encrypted); err != nil { t.Fatal(err) }
	rawToken, err := DecryptSecret(key, encrypted)
	if err != nil { t.Fatal(err) }
	if len(rawToken) == 0 { t.Fatal("expected verification token in encrypted outbox payload") }

	if err := service.VerifyEmail(ctx, string(rawToken)); err != nil { t.Fatal(err) }
	if err := db.QueryRowContext(ctx, "SELECT status FROM pluits.accounts WHERE id = $1", accountID).Scan(&status); err != nil { t.Fatal(err) }
	if status != "active" { t.Fatalf("expected active account after verification, got %s", status) }
	if err := service.VerifyEmail(ctx, string(rawToken)); err != ErrInvalidVerification {
		t.Fatalf("expected one-time token replay rejection, got %v", err)
	}

	duplicate, err := service.Register(ctx, RegistrationInput{
		Email: email, Password: "another-strong-password-456", DisplayName: "Duplicate",
	})
	if err != nil { t.Fatal(err) }
	if !duplicate.Accepted { t.Fatal("duplicate registration must return generic accepted response") }
	var count int
	if err := db.QueryRowContext(ctx, "SELECT COUNT(*) FROM pluits.accounts a JOIN pluits.account_emails e ON e.account_id = a.id WHERE e.email_normalized = $1", email).Scan(&count); err != nil { t.Fatal(err) }
	if count != 1 { t.Fatalf("duplicate registration created %d accounts", count) }
}
