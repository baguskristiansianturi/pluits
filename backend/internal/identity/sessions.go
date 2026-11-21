package identity

import (
	"context"
	"crypto/rand"
	"database/sql"
	"errors"
	"time"

	"golang.org/x/crypto/argon2"
)

var ErrInvalidCredentials = errors.New("email or password is incorrect")
var ErrInvalidSession = errors.New("session is invalid or expired")

const (
	accessTokenTTL = 15 * time.Minute
	refreshTokenTTL = 30 * 24 * time.Hour
)

type SessionTokens struct {
	AccountID string
	AccessToken string
	RefreshToken string
	AccessExpiresAt time.Time
	RefreshExpiresAt time.Time
}

func dummyPasswordWork(password string) {
	if len(password) > maxPasswordBytes { password = password[:maxPasswordBytes] }
	salt := []byte("pluits-identity-dummy-salt")
	_ = argon2.IDKey([]byte(password), salt, argonIterations, argonMemory, argonParallelism, argonKeyLength)
}

func (s *Service) Login(ctx context.Context, emailInput, password string) (SessionTokens, error) {
	email, err := NormalizeEmail(emailInput)
	if err != nil { return SessionTokens{}, ErrInvalidCredentials }
	if len(password) > maxPasswordBytes { dummyPasswordWork(password); return SessionTokens{}, ErrInvalidCredentials }

	var accountID, status, passwordHash string
	err = s.db.QueryRowContext(ctx, `
		SELECT a.id::text, a.status, c.password_hash
		FROM pluits.account_emails e
		JOIN pluits.accounts a ON a.id = e.account_id
		JOIN pluits.account_credentials c ON c.account_id = a.id
		WHERE e.email_normalized = $1
	`, email.Canonical).Scan(&accountID, &status, &passwordHash)
	if errors.Is(err, sql.ErrNoRows) {
		dummyPasswordWork(password)
		return SessionTokens{}, ErrInvalidCredentials
	}
	if err != nil { return SessionTokens{}, ErrIdentityUnavailable }
	matches, err := VerifyPassword(passwordHash, password)
	if err != nil || !matches || status != "active" { return SessionTokens{}, ErrInvalidCredentials }

	access, err := NewOpaqueToken()
	if err != nil { return SessionTokens{}, ErrIdentityUnavailable }
	refresh, err := NewOpaqueToken()
	if err != nil { return SessionTokens{}, ErrIdentityUnavailable }
	now := time.Now().UTC()
	result := SessionTokens{
		AccountID: accountID, AccessToken: access, RefreshToken: refresh,
		AccessExpiresAt: now.Add(accessTokenTTL), RefreshExpiresAt: now.Add(refreshTokenTTL),
	}
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil { return SessionTokens{}, ErrIdentityUnavailable }
	defer tx.Rollback()
	_, err = tx.ExecContext(ctx, `
		INSERT INTO pluits.sessions
		(account_id, token_family_id, access_token_hash, refresh_token_hash, access_expires_at, refresh_expires_at)
		VALUES ($1, gen_random_uuid(), $2, $3, $4, $5)
	`, accountID, TokenHash(access)[:], TokenHash(refresh)[:], result.AccessExpiresAt, result.RefreshExpiresAt)
	if err != nil { return SessionTokens{}, ErrIdentityUnavailable }
	if _, err := tx.ExecContext(ctx, "INSERT INTO pluits.security_events (account_id, event_type) VALUES ($1, 'account.login_succeeded')", accountID); err != nil {
		return SessionTokens{}, ErrIdentityUnavailable
	}
	if err := tx.Commit(); err != nil { return SessionTokens{}, ErrIdentityUnavailable }
	return result, nil
}

func (s *Service) Refresh(ctx context.Context, rawRefreshToken string) (SessionTokens, error) {
	if rawRefreshToken == "" || len(rawRefreshToken) > 256 { return SessionTokens{}, ErrInvalidSession }
	hash := TokenHash(rawRefreshToken)
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil { return SessionTokens{}, ErrIdentityUnavailable }
	defer tx.Rollback()

	var oldID, accountID, familyID string
	var expiresAt time.Time
	var revokedAt sql.NullTime
	err = tx.QueryRowContext(ctx, `
		SELECT id::text, account_id::text, token_family_id::text, refresh_expires_at, revoked_at
		FROM pluits.sessions WHERE refresh_token_hash = $1 FOR UPDATE
	`, hash[:]).Scan(&oldID, &accountID, &familyID, &expiresAt, &revokedAt)
	if errors.Is(err, sql.ErrNoRows) { return SessionTokens{}, ErrInvalidSession }
	if err != nil { return SessionTokens{}, ErrIdentityUnavailable }

	if revokedAt.Valid {
		// Reuse of a rotated token is treated as compromise: revoke the entire family.
		if _, err := tx.ExecContext(ctx, `
			UPDATE pluits.sessions SET revoked_at = COALESCE(revoked_at, NOW()), revoke_reason = 'refresh_replay'
			WHERE token_family_id = $1
		`, familyID); err != nil { return SessionTokens{}, ErrIdentityUnavailable }
		if err := tx.Commit(); err != nil { return SessionTokens{}, ErrIdentityUnavailable }
		return SessionTokens{}, ErrInvalidSession
	}
	if !expiresAt.After(time.Now().UTC()) { return SessionTokens{}, ErrInvalidSession }

	var accountStatus string
	if err := tx.QueryRowContext(ctx, "SELECT status FROM pluits.accounts WHERE id = $1", accountID).Scan(&accountStatus); err != nil {
		if errors.Is(err, sql.ErrNoRows) { return SessionTokens{}, ErrInvalidSession }
		return SessionTokens{}, ErrIdentityUnavailable
	}
	if accountStatus != "active" { return SessionTokens{}, ErrInvalidSession }

	access, err := NewOpaqueToken()
	if err != nil { return SessionTokens{}, ErrIdentityUnavailable }
	refresh, err := NewOpaqueToken()
	if err != nil { return SessionTokens{}, ErrIdentityUnavailable }
	now := time.Now().UTC()
	result := SessionTokens{
		AccountID: accountID, AccessToken: access, RefreshToken: refresh,
		AccessExpiresAt: now.Add(accessTokenTTL), RefreshExpiresAt: expiresAt,
	}
	var newID string
	if err := tx.QueryRowContext(ctx, `
		INSERT INTO pluits.sessions
		(account_id, token_family_id, access_token_hash, refresh_token_hash, access_expires_at, refresh_expires_at)
		VALUES ($1, $2, $3, $4, $5, $6) RETURNING id::text
	`, accountID, familyID, TokenHash(access)[:], TokenHash(refresh)[:], result.AccessExpiresAt, result.RefreshExpiresAt).Scan(&newID); err != nil {
		return SessionTokens{}, ErrIdentityUnavailable
	}
	if _, err := tx.ExecContext(ctx, `
		UPDATE pluits.sessions SET revoked_at = NOW(), revoke_reason = 'rotated', replaced_by_session_id = $2
		WHERE id = $1 AND revoked_at IS NULL
	`, oldID, newID); err != nil { return SessionTokens{}, ErrIdentityUnavailable }
	if _, err := tx.ExecContext(ctx, "INSERT INTO pluits.security_events (account_id, event_type) VALUES ($1, 'account.session_refreshed')", accountID); err != nil {
		return SessionTokens{}, ErrIdentityUnavailable
	}
	if err := tx.Commit(); err != nil { return SessionTokens{}, ErrIdentityUnavailable }
	return result, nil
}

func (s *Service) Logout(ctx context.Context, rawAccessToken string) error {
	if rawAccessToken == "" || len(rawAccessToken) > 256 { return ErrInvalidSession }
	hash := TokenHash(rawAccessToken)
	result, err := s.db.ExecContext(ctx, `
		UPDATE pluits.sessions SET revoked_at = NOW(), revoke_reason = 'logout'
		WHERE access_token_hash = $1 AND revoked_at IS NULL
	`, hash[:])
	if err != nil { return ErrIdentityUnavailable }
	changed, err := result.RowsAffected()
	if err != nil { return ErrIdentityUnavailable }
	if changed == 0 { return ErrInvalidSession }
	return nil
}

func newSessionFamilyID() ([16]byte, error) {
	var id [16]byte
	_, err := rand.Read(id[:])
	return id, err
}
