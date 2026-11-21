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
	var workspaceID, membershipID string
	if err := db.QueryRowContext(ctx, "SELECT id::text FROM pluits.workspaces WHERE created_by_account_id=$1 AND workspace_type='personal'", accountID).Scan(&workspaceID); err != nil { t.Fatal(err) }
	if err := db.QueryRowContext(ctx, "SELECT id::text FROM pluits.workspace_memberships WHERE workspace_id=$1 AND account_id=$2 AND membership_status='active'", workspaceID, accountID).Scan(&membershipID); err != nil { t.Fatal(err) }
	var ownerRoleCount int
	if err := db.QueryRowContext(ctx, "SELECT COUNT(*) FROM pluits.membership_roles mr JOIN pluits.authorization_roles r ON r.id=mr.role_id WHERE mr.membership_id=$1 AND r.role_key='personal_owner'", membershipID).Scan(&ownerRoleCount); err != nil { t.Fatal(err) }
	if ownerRoleCount != 1 { t.Fatalf("expected personal_owner role, got %d", ownerRoleCount) }
	var productGrantCount int
	if err := db.QueryRowContext(ctx, "SELECT COUNT(*) FROM pluits.workspace_product_grants WHERE workspace_id=$1 AND product_key='pluits'", workspaceID).Scan(&productGrantCount); err != nil { t.Fatal(err) }
	if productGrantCount != 1 { t.Fatalf("expected baseline PLUITS product grant, got %d", productGrantCount) }
	var memberRoleCount int
	if err := db.QueryRowContext(ctx, "SELECT COUNT(*) FROM pluits.membership_roles mr JOIN pluits.authorization_roles r ON r.id=mr.role_id WHERE mr.membership_id=$1 AND r.role_key='pluits_member'", membershipID).Scan(&memberRoleCount); err != nil { t.Fatal(err) }
	if memberRoleCount != 1 { t.Fatalf("expected pluits_member role, got %d", memberRoleCount) }
	var consentCount int
	if err := db.QueryRowContext(ctx, "SELECT COUNT(*) FROM pluits.account_consents WHERE account_id=$1", accountID).Scan(&consentCount); err != nil { t.Fatal(err) }
	if consentCount != 2 { t.Fatalf("expected terms and privacy consent records, got %d", consentCount) }

	var status string
	if err := db.QueryRowContext(ctx, "SELECT status FROM pluits.accounts WHERE id = $1", accountID).Scan(&status); err != nil { t.Fatal(err) }
	if status != "pending_verification" { t.Fatalf("expected pending verification, got %s", status) }
	if _, err := service.Login(ctx, email, "strong-test-password-123"); err != ErrInvalidCredentials { t.Fatalf("unverified account must not log in, got %v", err) }

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
	if _, err := db.ExecContext(ctx, "UPDATE pluits.email_outbox SET status='sent', sent_at=NOW() WHERE account_id=$1", accountID); err != nil { t.Fatal(err) }
	if err := db.QueryRowContext(ctx, "SELECT status FROM pluits.accounts WHERE id = $1", accountID).Scan(&status); err != nil { t.Fatal(err) }
	if status != "active" { t.Fatalf("expected active account after verification, got %s", status) }
	if err := service.VerifyEmail(ctx, string(rawToken)); err != ErrInvalidVerification {
		t.Fatalf("expected one-time token replay rejection, got %v", err)
	}

	login, err := service.Login(ctx, email, "strong-test-password-123")
	if err != nil { t.Fatalf("login after verification: %v", err) }
	if login.AccountID != accountID || login.AccessToken == "" || login.RefreshToken == "" { t.Fatal("login did not return a complete session") }
	rotated, err := service.Refresh(ctx, login.RefreshToken)
	if err != nil { t.Fatalf("refresh session: %v", err) }
	if rotated.RefreshToken == login.RefreshToken { t.Fatal("refresh token must rotate") }
	if _, err := service.Refresh(ctx, login.RefreshToken); err != ErrInvalidSession { t.Fatalf("expected replay detection, got %v", err) }
	if _, err := service.Refresh(ctx, rotated.RefreshToken); err != ErrInvalidSession { t.Fatalf("replay must revoke the entire token family, got %v", err) }

	secondLogin, err := service.Login(ctx, email, "strong-test-password-123")
	if err != nil { t.Fatal(err) }
	if err := service.Logout(ctx, secondLogin.AccessToken); err != nil { t.Fatalf("logout: %v", err) }
	if err := service.Logout(ctx, secondLogin.AccessToken); err != ErrInvalidSession { t.Fatalf("expected revoked access token rejection, got %v", err) }

	duplicate, err := service.Register(ctx, RegistrationInput{
		Email: email, Password: "another-strong-password-456", DisplayName: "Duplicate",
	})
	if err != nil { t.Fatal(err) }
	if !duplicate.Accepted { t.Fatal("duplicate registration must return generic accepted response") }
	var count int
	if err := db.QueryRowContext(ctx, "SELECT COUNT(*) FROM pluits.accounts a JOIN pluits.account_emails e ON e.account_id = a.id WHERE e.email_normalized = $1", email).Scan(&count); err != nil { t.Fatal(err) }
	if count != 1 { t.Fatalf("duplicate registration created %d accounts", count) }
}
