package httpapi

import (
	"context"
	"database/sql"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"
	"time"

	"github.com/baguskristiansianturi/pluits/backend/internal/identity"
	"github.com/baguskristiansianturi/pluits/backend/internal/migrate"
	_ "github.com/jackc/pgx/v5/stdlib"
)

func TestRequireAccountRejectsWhenDatabaseIsNotConfigured(t *testing.T) {
	handler := RequireAccount(nil, http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusNoContent)
	}))
	rec := httptest.NewRecorder()
	handler.ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/private", nil))
	if rec.Code != http.StatusServiceUnavailable { t.Fatalf("expected unavailable without database, got %d", rec.Code) }
}

func TestRequireAccountAcceptsOnlyActiveUnrevokedSession(t *testing.T) {
	dsn := os.Getenv("DATABASE_TEST_URL")
	if dsn == "" { t.Skip("DATABASE_TEST_URL is not set; auth middleware integration test runs in CI") }
	ctx := context.Background()
	db, err := sql.Open("pgx", dsn)
	if err != nil { t.Fatal(err) }
	defer db.Close()
	if err := migrate.Up(ctx, db); err != nil { t.Fatal(err) }
	key := make([]byte, 32)
	for i := range key { key[i] = byte(i+7) }
	service, err := identity.NewService(db, key, 1)
	if err != nil { t.Fatal(err) }
	address := "auth-" + time.Now().UTC().Format("20060102150405.000000000") + "@example.test"
	if _, err := service.Register(ctx, identity.RegistrationInput{Email:address, Password:"auth-test-password-is-long-enough", DisplayName:"Auth Test"}); err != nil { t.Fatal(err) }
	var accountID string
	if err := db.QueryRowContext(ctx, "SELECT account_id::text FROM pluits.account_emails WHERE email_normalized=$1", address).Scan(&accountID); err != nil { t.Fatal(err) }
	var encrypted []byte
	if err := db.QueryRowContext(ctx, "SELECT payload_ciphertext FROM pluits.email_outbox WHERE account_id=$1", accountID).Scan(&encrypted); err != nil { t.Fatal(err) }
	token, err := identity.DecryptSecret(key, encrypted)
	if err != nil { t.Fatal(err) }
	if err := service.VerifyEmail(ctx, string(token)); err != nil { t.Fatal(err) }
	if _, err := db.ExecContext(ctx, "UPDATE pluits.email_outbox SET status='sent', sent_at=NOW() WHERE account_id=$1", accountID); err != nil { t.Fatal(err) }
	session, err := service.Login(ctx, address, "auth-test-password-is-long-enough")
	if err != nil { t.Fatal(err) }

	protected := RequireAccount(db, http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if AccountIDFromContext(r.Context()) != accountID { t.Errorf("unexpected authenticated account ID") }
		w.WriteHeader(http.StatusNoContent)
	}))
	request := httptest.NewRequest(http.MethodGet, "/private", nil)
	request.Header.Set("Authorization", "Bearer "+session.AccessToken)
	response := httptest.NewRecorder()
	protected.ServeHTTP(response, request)
	if response.Code != http.StatusNoContent { t.Fatalf("expected authenticated request, got %d", response.Code) }

	meRequest := httptest.NewRequest(http.MethodGet, "/v1/identity/me", nil)
	meRequest.Header.Set("Authorization", "Bearer "+session.AccessToken)
	meResponse := httptest.NewRecorder()
	NewAccountMeHandler(db).ServeHTTP(meResponse, meRequest)
	if meResponse.Code != http.StatusOK { t.Fatalf("expected current account endpoint success, got %d: %s", meResponse.Code, meResponse.Body.String()) }
	if !strings.Contains(meResponse.Body.String(), "\"display_name\":\"Auth Test\"") || !strings.Contains(meResponse.Body.String(), "\"personal_owner\"") {
		t.Fatalf("current account response missing profile or workspace role: %s", meResponse.Body.String())
	}

	if err := service.Logout(ctx, session.AccessToken); err != nil { t.Fatal(err) }
	response = httptest.NewRecorder()
	protected.ServeHTTP(response, request)
	if response.Code != http.StatusUnauthorized { t.Fatalf("revoked session must be rejected, got %d", response.Code) }
}
