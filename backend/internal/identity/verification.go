package identity

import (
	"context"
	"database/sql"
	"errors"
	"time"
)

// ResendVerification uses a generic response at the HTTP boundary. It creates a
// fresh challenge only for an existing pending, unverified account.
func (s *Service) ResendVerification(ctx context.Context, emailInput string) error {
	email, err := NormalizeEmail(emailInput)
	if err != nil { return nil }
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil { return ErrIdentityUnavailable }
	defer tx.Rollback()
	var accountID, emailID, address string
	err = tx.QueryRowContext(ctx, `
		SELECT a.id::text, e.id::text, e.email
		FROM pluits.accounts a
		JOIN pluits.account_emails e ON e.account_id=a.id AND e.is_primary=TRUE
		WHERE e.email_normalized=$1 AND a.status='pending_verification' AND e.verified_at IS NULL
		FOR UPDATE OF a, e
	`, email.Canonical).Scan(&accountID, &emailID, &address)
	if errors.Is(err, sql.ErrNoRows) { return nil }
	if err != nil { return ErrIdentityUnavailable }
	rawToken, err := NewOpaqueToken()
	if err != nil { return ErrIdentityUnavailable }
	hash := TokenHash(rawToken)
	ciphertext, err := EncryptSecret(s.outboxKey, []byte(rawToken))
	if err != nil { return ErrIdentityUnavailable }
	if _, err := tx.ExecContext(ctx, `
		UPDATE pluits.email_verification_challenges SET consumed_at=NOW()
		WHERE account_id=$1 AND consumed_at IS NULL
	`, accountID); err != nil { return ErrIdentityUnavailable }
	if _, err := tx.ExecContext(ctx, `
		INSERT INTO pluits.email_verification_challenges (account_id, account_email_id, token_hash, expires_at)
		VALUES ($1, $2, $3, $4)
	`, accountID, emailID, hash[:], time.Now().UTC().Add(30*time.Minute)); err != nil { return ErrIdentityUnavailable }
	if _, err := tx.ExecContext(ctx, `
		INSERT INTO pluits.email_outbox (account_id, recipient_email, template_key, payload_ciphertext, encryption_key_version)
		VALUES ($1, $2, 'verify_email', $3, $4)
	`, accountID, address, ciphertext, s.keyVersion); err != nil { return ErrIdentityUnavailable }
	if _, err := tx.ExecContext(ctx, `
		INSERT INTO pluits.security_events (account_id, event_type)
		VALUES ($1, 'account.verification_resent')
	`, accountID); err != nil { return ErrIdentityUnavailable }
	if err := tx.Commit(); err != nil { return ErrIdentityUnavailable }
	return nil
}
