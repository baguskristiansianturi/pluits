package identity

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"
	"time"
)

// RequestPasswordReset always returns nil for unknown addresses so callers cannot
// use the recovery endpoint to enumerate registered accounts.
func (s *Service) RequestPasswordReset(ctx context.Context, emailInput string) error {
	email, err := NormalizeEmail(emailInput)
	if err != nil { return nil }
	var accountID, address string
	err = s.db.QueryRowContext(ctx, `
		SELECT a.id::text, e.email
		FROM pluits.accounts a
		JOIN pluits.account_emails e ON e.account_id=a.id AND e.is_primary=TRUE AND e.verified_at IS NOT NULL
		WHERE e.email_normalized=$1 AND a.status='active'
	`, email.Canonical).Scan(&accountID, &address)
	if errors.Is(err, sql.ErrNoRows) { return nil }
	if err != nil { return ErrIdentityUnavailable }

	token, err := NewOpaqueToken()
	if err != nil { return ErrIdentityUnavailable }
	hash := TokenHash(token)
	encrypted, err := EncryptSecret(s.outboxKey, []byte(token))
	if err != nil { return ErrIdentityUnavailable }

	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil { return ErrIdentityUnavailable }
	defer tx.Rollback()
	if _, err := tx.ExecContext(ctx, `
		UPDATE pluits.password_reset_challenges SET consumed_at=NOW()
		WHERE account_id=$1 AND consumed_at IS NULL
	`, accountID); err != nil { return ErrIdentityUnavailable }
	if _, err := tx.ExecContext(ctx, `
		INSERT INTO pluits.password_reset_challenges (account_id, token_hash, expires_at)
		VALUES ($1, $2, NOW() + INTERVAL '30 minutes')
	`, accountID, hash[:]); err != nil { return ErrIdentityUnavailable }
	if _, err := tx.ExecContext(ctx, `
		INSERT INTO pluits.email_outbox
		(account_id, recipient_email, template_key, payload_ciphertext, encryption_key_version)
		VALUES ($1, $2, 'password_reset', $3, $4)
	`, accountID, address, encrypted, s.keyVersion); err != nil { return ErrIdentityUnavailable }
	if _, err := tx.ExecContext(ctx, `
		INSERT INTO pluits.security_events (account_id, event_type)
		VALUES ($1, 'account.password_reset_requested')
	`, accountID); err != nil { return ErrIdentityUnavailable }
	if err := tx.Commit(); err != nil { return ErrIdentityUnavailable }
	return nil
}

func (s *Service) ResetPassword(ctx context.Context, rawToken, newPassword string) error {
	if rawToken == "" || len(rawToken) > 256 { return ErrInvalidVerification }
	if err := ValidatePassword(newPassword); err != nil { return err }
	passwordHash, err := HashPassword(newPassword)
	if err != nil { return ErrIdentityUnavailable }
	params, _ := json.Marshal(map[string]any{
		"memory_kib": argonMemory, "iterations": argonIterations,
		"parallelism": argonParallelism, "salt_bytes": argonSaltLength, "key_bytes": argonKeyLength,
	})
	hash := TokenHash(rawToken)
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil { return ErrIdentityUnavailable }
	defer tx.Rollback()
	var challengeID, accountID string
	err = tx.QueryRowContext(ctx, `
		SELECT id::text, account_id::text FROM pluits.password_reset_challenges
		WHERE token_hash=$1 AND consumed_at IS NULL AND expires_at>NOW()
		FOR UPDATE
	`, hash[:]).Scan(&challengeID, &accountID)
	if errors.Is(err, sql.ErrNoRows) { return ErrInvalidVerification }
	if err != nil { return ErrIdentityUnavailable }
	if _, err := tx.ExecContext(ctx, `
		UPDATE pluits.password_reset_challenges SET consumed_at=NOW() WHERE id=$1
	`, challengeID); err != nil { return ErrIdentityUnavailable }
	if _, err := tx.ExecContext(ctx, `
		UPDATE pluits.account_credentials SET password_hash=$2, password_parameters=$3::jsonb, password_changed_at=NOW()
		WHERE account_id=$1
	`, accountID, passwordHash, string(params)); err != nil { return ErrIdentityUnavailable }
	if _, err := tx.ExecContext(ctx, `
		UPDATE pluits.sessions SET revoked_at=COALESCE(revoked_at,NOW()), revoke_reason='password_reset'
		WHERE account_id=$1
	`, accountID); err != nil { return ErrIdentityUnavailable }
	if _, err := tx.ExecContext(ctx, `
		INSERT INTO pluits.security_events (account_id, event_type)
		VALUES ($1, 'account.password_reset_completed')
	`, accountID); err != nil { return ErrIdentityUnavailable }
	if err := tx.Commit(); err != nil { return ErrIdentityUnavailable }
	return nil
}

var _ = time.Second
