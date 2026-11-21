package email

import (
	"context"
	"database/sql"
	"net/url"
	"os"
	"strings"
	"testing"
	"time"

	"github.com/baguskristiansianturi/pluits/backend/internal/identity"
	"github.com/baguskristiansianturi/pluits/backend/internal/migrate"
	_ "github.com/jackc/pgx/v5/stdlib"
)

type captureSender struct { messages []Message }
func (s *captureSender) Send(_ context.Context, message Message) error {
	s.messages = append(s.messages, message)
	return nil
}

func TestOutboxWorkerDeliversEncryptedVerificationMessage(t *testing.T) {
	dsn := os.Getenv("DATABASE_TEST_URL")
	if dsn == "" { t.Skip("DATABASE_TEST_URL is not set; PostgreSQL outbox test runs in CI") }
	ctx := context.Background()
	db, err := sql.Open("pgx", dsn)
	if err != nil { t.Fatal(err) }
	defer db.Close()
	if err := migrate.Up(ctx, db); err != nil { t.Fatal(err) }

	key := make([]byte, 32)
	for i := range key { key[i] = byte(255-i) }
	service, err := identity.NewService(db, key, 1)
	if err != nil { t.Fatal(err) }
	address := "outbox-" + time.Now().UTC().Format("20060102150405.000000000") + "@example.test"
	if _, err := service.Register(ctx, identity.RegistrationInput{Email:address, Password:"test-password-that-is-long-enough", DisplayName:"Outbox Test"}); err != nil { t.Fatal(err) }

	sender := &captureSender{}
	worker, err := NewOutboxWorker(db, sender, map[int16][]byte{1:key}, "https://pluits.example")
	if err != nil { t.Fatal(err) }
	processed, err := worker.ProcessBatch(ctx)
	if err != nil { t.Fatal(err) }
	if processed < 1 { t.Fatalf("expected at least one delivered message, processed=%d", processed) }
	var message Message
	found := false
	for _, candidate := range sender.messages { if candidate.To == address { message = candidate; found = true; break } }
	if !found { t.Fatalf("expected verification email for %s among %d delivered messages", address, len(sender.messages)) }
	if message.To != address { t.Fatalf("unexpected recipient %q", message.To) }
	if !strings.Contains(message.Subject, "PLUITS") { t.Fatalf("unexpected subject %q", message.Subject) }
	linkLine := strings.Split(message.Body, "\n")[2]
	link, err := url.Parse(linkLine)
	if err != nil { t.Fatal(err) }
	token := link.Query().Get("token")
	if token == "" { t.Fatal("verification token missing from delivery link") }
	if err := service.VerifyEmail(ctx, token); err != nil { t.Fatalf("delivered token should verify account: %v", err) }

	var status string
	if err := db.QueryRowContext(ctx, "SELECT status FROM pluits.email_outbox WHERE recipient_email=$1", address).Scan(&status); err != nil { t.Fatal(err) }
	if status != "sent" { t.Fatalf("expected outbox status sent, got %s", status) }
}

func TestRetryDelayIsBounded(t *testing.T) {
	if got := retryDelay(0); got != 2*time.Second { t.Fatalf("unexpected first retry delay %s", got) }
	if got := retryDelay(99); got > time.Hour { t.Fatalf("retry delay exceeded cap: %s", got) }
}

func TestOutboxRendersVerificationAndRecoveryRoutes(t *testing.T) {
	worker := &OutboxWorker{publicBaseURL:"https://baguskristiansianturi.github.io/pluits"}
	verify, err := worker.render(queuedMessage{recipient:"user@example.test", template:"verify_email"}, "verify-token")
	if err != nil { t.Fatal(err) }
	if !strings.Contains(verify.Body, "/pluits/?auth=verify&token=verify-token") { t.Fatalf("verification link has wrong route: %s", verify.Body) }
	reset, err := worker.render(queuedMessage{recipient:"user@example.test", template:"password_reset"}, "reset-token")
	if err != nil { t.Fatal(err) }
	if !strings.Contains(reset.Body, "/pluits/?auth=reset&token=reset-token") { t.Fatalf("password reset link has wrong route: %s", reset.Body) }
	if _, err := worker.render(queuedMessage{template:"unsupported"}, "token"); err == nil { t.Fatal("unsupported template must be rejected") }
}
