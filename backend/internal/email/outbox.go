package email

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"net/url"
	"strings"
	"time"

	"github.com/baguskristiansianturi/pluits/backend/internal/identity"
)

type Message struct { To, Subject, Body string }
type Sender interface { Send(context.Context, Message) error }

type OutboxWorker struct {
	db *sql.DB
	sender Sender
	keys map[int16][]byte
	publicBaseURL string
	batchSize int
}

func NewOutboxWorker(db *sql.DB, sender Sender, keys map[int16][]byte, publicBaseURL string) (*OutboxWorker, error) {
	if db == nil || sender == nil || len(keys) == 0 { return nil, errors.New("outbox worker requires database, sender and encryption keys") }
	parsed, err := url.Parse(publicBaseURL)
	if err != nil || parsed.Scheme != "https" || parsed.Host == "" { return nil, errors.New("public base URL must be an absolute HTTPS URL") }
	for version, key := range keys { if version < 1 || len(key) != 32 { return nil, errors.New("each outbox key must have a positive version and 32 bytes") } }
	return &OutboxWorker{db:db, sender:sender, keys:keys, publicBaseURL:strings.TrimRight(publicBaseURL, "/"), batchSize:20}, nil
}

type queuedMessage struct {
	id, recipient, template string
	ciphertext []byte
	keyVersion int16
	attempts int
}

func (w *OutboxWorker) ProcessBatch(ctx context.Context) (int, error) {
	tx, err := w.db.BeginTx(ctx, nil)
	if err != nil { return 0, err }
	defer tx.Rollback()
	rows, err := tx.QueryContext(ctx, `
		SELECT id::text, recipient_email, template_key, payload_ciphertext, encryption_key_version, attempts
		FROM pluits.email_outbox
		WHERE (status = 'pending' AND available_at <= NOW())
		   OR (status = 'processing' AND locked_at < NOW() - INTERVAL '5 minutes')
		ORDER BY created_at
		LIMIT $1
		FOR UPDATE SKIP LOCKED
	`, w.batchSize)
	if err != nil { return 0, err }
	var batch []queuedMessage
	for rows.Next() {
		var item queuedMessage
		if err := rows.Scan(&item.id, &item.recipient, &item.template, &item.ciphertext, &item.keyVersion, &item.attempts); err != nil { rows.Close(); return 0, err }
		batch = append(batch, item)
	}
	if err := rows.Err(); err != nil { rows.Close(); return 0, err }
	if err := rows.Close(); err != nil { return 0, err }
	for _, item := range batch {
		if _, err := tx.ExecContext(ctx, "UPDATE pluits.email_outbox SET status='processing', locked_at=NOW(), attempts=attempts+1 WHERE id=$1", item.id); err != nil { return 0, err }
	}
	if err := tx.Commit(); err != nil { return 0, err }

	for _, item := range batch {
		key, ok := w.keys[item.keyVersion]
		if !ok {
			if err := w.markFailed(ctx, item.id, "encryption_key_unavailable"); err != nil { return len(batch), err }
			continue
		}
		plain, err := identity.DecryptSecret(key, item.ciphertext)
		if err != nil {
			if err := w.markFailed(ctx, item.id, "payload_decryption_failed"); err != nil { return len(batch), err }
			continue
		}
		message, err := w.render(item, string(plain))
		if err == nil { err = w.sender.Send(ctx, message) }
		if err != nil {
			delay := retryDelay(item.attempts + 1)
			status := "pending"
			if item.attempts+1 >= 8 { status = "failed" }
			_, updateErr := w.db.ExecContext(ctx, `
				UPDATE pluits.email_outbox SET status=$2, locked_at=NULL,
				available_at=NOW() + ($3 * INTERVAL '1 second'), last_error_code='delivery_failed'
				WHERE id=$1
			`, item.id, status, int(delay.Seconds()))
			if updateErr != nil { return len(batch), updateErr }
			continue
		}
		if _, err := w.db.ExecContext(ctx, `
			UPDATE pluits.email_outbox SET status='sent', sent_at=NOW(), locked_at=NULL, last_error_code=NULL
			WHERE id=$1
		`, item.id); err != nil { return len(batch), err }
	}
	return len(batch), nil
}

func (w *OutboxWorker) render(item queuedMessage, token string) (Message, error) {
	link, err := url.Parse(w.publicBaseURL + "/")
	if err != nil { return Message{}, err }
	query := link.Query()
	subject := ""
	body := ""
	switch item.template {
	case "verify_email":
		query.Set("auth", "verify")
		subject = "Verify your PLUITS account"
		body = "Complete your PLUITS account verification using this one-time link:\n\n"
	case "password_reset":
		query.Set("auth", "reset")
		subject = "Reset your PLUITS password"
		body = "Use this one-time link to reset your PLUITS password:\n\n"
	default:
		return Message{}, fmt.Errorf("unsupported email template")
	}
	query.Set("token", token)
	link.RawQuery = query.Encode()
	expiry := "This link expires in 30 minutes. If you did not request this, you can ignore this email.\n"
	return Message{To:item.recipient, Subject:subject, Body:body + link.String() + "\n\n" + expiry}, nil
}

func (w *OutboxWorker) markFailed(ctx context.Context, id, code string) error {
	_, err := w.db.ExecContext(ctx, "UPDATE pluits.email_outbox SET status='failed', locked_at=NULL, last_error_code=$2 WHERE id=$1", id, code)
	return err
}

func retryDelay(attempt int) time.Duration {
	if attempt < 1 { attempt = 1 }
	if attempt > 8 { attempt = 8 }
	seconds := 1 << attempt
	if seconds > 3600 { seconds = 3600 }
	return time.Duration(seconds) * time.Second
}

