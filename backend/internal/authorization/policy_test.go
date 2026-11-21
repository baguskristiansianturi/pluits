package authorization

import (
	"context"
	"database/sql"
	"os"
	"testing"
	"time"

	"github.com/baguskristiansianturi/pluits/backend/internal/identity"
	"github.com/baguskristiansianturi/pluits/backend/internal/migrate"
	_ "github.com/jackc/pgx/v5/stdlib"
)

func TestWorkspaceAndProductPermissionsAreExplicit(t *testing.T) {
	dsn := os.Getenv("DATABASE_TEST_URL")
	if dsn == "" { t.Skip("DATABASE_TEST_URL is not set; authorization integration test runs in CI") }
	ctx := context.Background()
	db, err := sql.Open("pgx", dsn)
	if err != nil { t.Fatal(err) }
	defer db.Close()
	if err := migrate.Up(ctx, db); err != nil { t.Fatal(err) }
	key := make([]byte, 32)
	for i := range key { key[i] = byte(i+111) }
	identityService, err := identity.NewService(db, key, 1)
	if err != nil { t.Fatal(err) }
	email := "authorization-" + time.Now().UTC().Format("20060102150405.000000000") + "@example.test"
	if _, err := identityService.Register(ctx, identity.RegistrationInput{Email:email, Password:"authorization-test-password", DisplayName:"Authorization Test"}); err != nil { t.Fatal(err) }
	var accountID, workspaceID, membershipID string
	if err := db.QueryRowContext(ctx, "SELECT account_id::text FROM pluits.account_emails WHERE email_normalized=$1", email).Scan(&accountID); err != nil { t.Fatal(err) }
	if err := db.QueryRowContext(ctx, "SELECT id::text FROM pluits.workspaces WHERE created_by_account_id=$1", accountID).Scan(&workspaceID); err != nil { t.Fatal(err) }
	if err := db.QueryRowContext(ctx, "SELECT id::text FROM pluits.workspace_memberships WHERE workspace_id=$1 AND account_id=$2", workspaceID, accountID).Scan(&membershipID); err != nil { t.Fatal(err) }
	var encrypted []byte
	if err := db.QueryRowContext(ctx, "SELECT payload_ciphertext FROM pluits.email_outbox WHERE account_id=$1 AND template_key='verify_email'", accountID).Scan(&encrypted); err != nil { t.Fatal(err) }
	token, err := identity.DecryptSecret(key, encrypted)
	if err != nil { t.Fatal(err) }
	if err := identityService.VerifyEmail(ctx, string(token)); err != nil { t.Fatal(err) }

	policy, err := NewPolicy(db)
	if err != nil { t.Fatal(err) }
	allowed, err := policy.Can(ctx, accountID, workspaceID, "", "workspace.manage")
	if err != nil { t.Fatal(err) }
	if !allowed { t.Fatal("personal workspace owner should manage their own workspace") }
	allowed, err = policy.Can(ctx, accountID, workspaceID, "store", "store.manage")
	if err != nil { t.Fatal(err) }
	if allowed { t.Fatal("workspace owner must not receive implicit product access") }

	if _, err := db.ExecContext(ctx, "INSERT INTO pluits.platform_products (product_key, display_name) VALUES ('store','Store')"); err != nil { t.Fatal(err) }
	if _, err := db.ExecContext(ctx, "INSERT INTO pluits.authorization_permissions (permission_key, description) VALUES ('store.manage','Manage store operations')"); err != nil { t.Fatal(err) }
	var permissionID string
	if err := db.QueryRowContext(ctx, "SELECT id::text FROM pluits.authorization_permissions WHERE permission_key='store.manage'").Scan(&permissionID); err != nil { t.Fatal(err) }
	var roleID string
	if err := db.QueryRowContext(ctx, "INSERT INTO pluits.authorization_roles (role_key,scope_type,description,product_key) VALUES ('store_operator','product','Store operator','store') RETURNING id::text").Scan(&roleID); err != nil { t.Fatal(err) }
	if _, err := db.ExecContext(ctx, "INSERT INTO pluits.role_permissions (role_id,permission_id) VALUES ($1,$2)", roleID, permissionID); err != nil { t.Fatal(err) }
	if _, err := db.ExecContext(ctx, "INSERT INTO pluits.membership_roles (membership_id,role_id,granted_by_account_id) VALUES ($1,$2,$3)", membershipID, roleID, accountID); err != nil { t.Fatal(err) }
	if _, err := db.ExecContext(ctx, "INSERT INTO pluits.workspace_product_grants (workspace_id,product_key,granted_by_account_id) VALUES ($1,'store',$2)", workspaceID, accountID); err != nil { t.Fatal(err) }
	allowed, err = policy.Can(ctx, accountID, workspaceID, "store", "store.manage")
	if err != nil { t.Fatal(err) }
	if !allowed { t.Fatal("explicit product grant and product role should authorize store operation") }
}
