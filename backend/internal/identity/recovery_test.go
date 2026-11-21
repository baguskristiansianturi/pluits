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

func TestPasswordRecoveryRevokesExistingSessions(t *testing.T) {
	dsn := os.Getenv("DATABASE_TEST_URL")
	if dsn == "" { t.Skip("DATABASE_TEST_URL is not set; PostgreSQL recovery test runs in CI") }
	ctx := context.Background()
	db, err := sql.Open("pgx", dsn)
	if err != nil { t.Fatal(err) }
	defer db.Close()
	if err := migrate.Up(ctx, db); err != nil { t.Fatal(err) }
	key := make([]byte, 32)
	for i := range key { key[i] = byte(i+91) }
	service, err := NewService(db, key, 1)
	if err != nil { t.Fatal(err) }
	email := "recovery-" + time.Now().UTC().Format("20060102150405.000000000") + "@example.test"
	oldPassword := "old-strong-password-123"
	if _, err := service.Register(ctx, RegistrationInput{Email:email, Password:oldPassword, DisplayName:"Recovery Test"}); err != nil { t.Fatal(err) }
	var accountID string
	if err := db.QueryRowContext(ctx, "SELECT account_id::text FROM pluits.account_emails WHERE email_normalized=$1", email).Scan(&accountID); err != nil { t.Fatal(err) }
	var verifyCipher []byte
	if err := db.QueryRowContext(ctx, "SELECT payload_ciphertext FROM pluits.email_outbox WHERE account_id=$1 AND template_key='verify_email'", accountID).Scan(&verifyCipher); err != nil { t.Fatal(err) }
	verifyToken, err := DecryptSecret(key, verifyCipher)
	if err != nil { t.Fatal(err) }
	if err := service.VerifyEmail(ctx, string(verifyToken)); err != nil { t.Fatal(err) }
	if _, err := db.ExecContext(ctx, "UPDATE pluits.email_outbox SET status='sent', sent_at=NOW() WHERE account_id=$1", accountID); err != nil { t.Fatal(err) }
	session, err := service.Login(ctx, email, oldPassword)
	if err != nil { t.Fatal(err) }

	if err := service.RequestPasswordReset(ctx, email); err != nil { t.Fatal(err) }
	// Unknown addresses receive the same success response and create no outbox item.
	if err := service.RequestPasswordReset(ctx, "not-registered@example.test"); err != nil { t.Fatal(err) }
	var resetCipher []byte
	if err := db.QueryRowContext(ctx, "SELECT payload_ciphertext FROM pluits.email_outbox WHERE account_id=$1 AND template_key='password_reset' ORDER BY created_at DESC LIMIT 1", accountID).Scan(&resetCipher); err != nil { t.Fatal(err) }
	resetToken, err := DecryptSecret(key, resetCipher)
	if err != nil { t.Fatal(err) }
	newPassword := "new-strong-password-456"
	if err := service.ResetPassword(ctx, string(resetToken), newPassword); err != nil { t.Fatal(err) }
	if err := service.ResetPassword(ctx, string(resetToken), newPassword); err != ErrInvalidVerification { t.Fatalf("expected one-time reset token rejection, got %v", err) }
	if _, err := service.Login(ctx, email, oldPassword); err != ErrInvalidCredentials { t.Fatalf("old password should no longer work, got %v", err) }
	if _, err := service.Login(ctx, email, newPassword); err != nil { t.Fatalf("new password should work, got %v", err) }
	if err := service.Logout(ctx, session.AccessToken); err != ErrInvalidSession { t.Fatalf("password reset should revoke all existing sessions, got %v", err) }
}
