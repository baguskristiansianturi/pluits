package identity

import (
	"context"
	"crypto/subtle"
	"database/sql"
	"encoding/json"
	"errors"
	"fmt"
	"strings"
	"time"
)

var (
	ErrInvalidVerification = errors.New("verification token is invalid or expired")
	ErrIdentityUnavailable = errors.New("identity service unavailable")
)

type Service struct {
	db *sql.DB
	outboxKey []byte
	keyVersion int16
}

type RegistrationInput struct {
	Email string
	Password string
	DisplayName string
	TermsVersion string
	PrivacyVersion string
}

type RegistrationResult struct {
	Accepted bool
}

func NewService(db *sql.DB, outboxKey []byte, keyVersion int16) (*Service, error) {
	if db == nil || len(outboxKey) != 32 || keyVersion < 1 {
		return nil, errors.New("identity service requires database and a versioned 32-byte outbox key")
	}
	keyCopy := append([]byte(nil), outboxKey...)
	return &Service{db: db, outboxKey: keyCopy, keyVersion: keyVersion}, nil
}

// Register creates a pending account and encrypted verification email atomically.
// It intentionally returns the same accepted result for duplicate email addresses.
func (s *Service) Register(ctx context.Context, input RegistrationInput) (RegistrationResult, error) {
	email, err := NormalizeEmail(input.Email)
	if err != nil { return RegistrationResult{}, err }
	if err := ValidatePassword(input.Password); err != nil { return RegistrationResult{}, err }
	displayName := stringsTrim(input.DisplayName)
	if len([]rune(displayName)) < 2 || len([]rune(displayName)) > 80 { return RegistrationResult{}, errors.New("display name must contain 2 to 80 characters") }

	passwordHash, err := HashPassword(input.Password)
	if err != nil { return RegistrationResult{}, fmt.Errorf("prepare credentials: %w", err) }
	rawToken, err := NewOpaqueToken()
	if err != nil { return RegistrationResult{}, err }
	tokenHash := TokenHash(rawToken)
	encryptedPayload, err := EncryptSecret(s.outboxKey, []byte(rawToken))
	if err != nil { return RegistrationResult{}, err }

	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil { return RegistrationResult{}, ErrIdentityUnavailable }
	defer tx.Rollback()

	var accountID string
	if err := tx.QueryRowContext(ctx,
		"INSERT INTO pluits.accounts (status) VALUES ('pending_verification') RETURNING id",
	).Scan(&accountID); err != nil { return RegistrationResult{}, ErrIdentityUnavailable }

	var emailID string
	err = tx.QueryRowContext(ctx, `
		INSERT INTO pluits.account_emails (account_id, email, email_normalized)
		VALUES ($1, $2, $3)
		ON CONFLICT (email_normalized) DO NOTHING
		RETURNING id
	`, accountID, email.Original, email.Canonical).Scan(&emailID)
	if errors.Is(err, sql.ErrNoRows) {
		return RegistrationResult{Accepted: true}, nil
	}
	if err != nil { return RegistrationResult{}, ErrIdentityUnavailable }

	params, _ := json.Marshal(map[string]any{
		"memory_kib": argonMemory, "iterations": argonIterations,
		"parallelism": argonParallelism, "salt_bytes": argonSaltLength, "key_bytes": argonKeyLength,
	})
	if _, err = tx.ExecContext(ctx, `
		INSERT INTO pluits.account_credentials
		(account_id, password_hash, password_parameters)
		VALUES ($1, $2, $3::jsonb)
	`, accountID, passwordHash, string(params)); err != nil { return RegistrationResult{}, ErrIdentityUnavailable }

	if _, err = tx.ExecContext(ctx, `
		INSERT INTO pluits.personal_profiles (account_id, display_name)
		VALUES ($1, $2)
	`, accountID, displayName); err != nil { return RegistrationResult{}, ErrIdentityUnavailable }

	termsVersion := input.TermsVersion
	if termsVersion == "" { termsVersion = "2026-11-21" }
	privacyVersion := input.PrivacyVersion
	if privacyVersion == "" { privacyVersion = "2026-11-21" }
	if _, err = tx.ExecContext(ctx, `
		INSERT INTO pluits.account_consents (account_id, consent_type, document_version, source)
		VALUES ($1, 'terms_of_service', $2, 'web_registration'),
		       ($1, 'privacy_policy', $3, 'web_registration')
	`, accountID, termsVersion, privacyVersion); err != nil { return RegistrationResult{}, ErrIdentityUnavailable }

	expiresAt := time.Now().UTC().Add(30 * time.Minute)
	if _, err = tx.ExecContext(ctx, `
		INSERT INTO pluits.email_verification_challenges
		(account_id, account_email_id, token_hash, expires_at)
		VALUES ($1, $2, $3, $4)
	`, accountID, emailID, tokenHash[:], expiresAt); err != nil { return RegistrationResult{}, ErrIdentityUnavailable }

	if _, err = tx.ExecContext(ctx, `
		INSERT INTO pluits.email_outbox
		(account_id, recipient_email, template_key, payload_ciphertext, encryption_key_version)
		VALUES ($1, $2, 'verify_email', $3, $4)
	`, accountID, email.Original, encryptedPayload, s.keyVersion); err != nil { return RegistrationResult{}, ErrIdentityUnavailable }

	// Every account receives its own personal workspace. No product access is
	// granted implicitly; product modules must grant access explicitly.
	var workspaceID string
	if err = tx.QueryRowContext(ctx, `
		INSERT INTO pluits.workspaces (workspace_type, display_name, created_by_account_id)
		VALUES ('personal', $1, $2) RETURNING id
	`, displayName, accountID).Scan(&workspaceID); err != nil { return RegistrationResult{}, ErrIdentityUnavailable }
	var membershipID string
	if err = tx.QueryRowContext(ctx, `
		INSERT INTO pluits.workspace_memberships (workspace_id, account_id)
		VALUES ($1, $2) RETURNING id
	`, workspaceID, accountID).Scan(&membershipID); err != nil { return RegistrationResult{}, ErrIdentityUnavailable }
	if _, err = tx.ExecContext(ctx, `
		INSERT INTO pluits.membership_roles (membership_id, role_id, granted_by_account_id)
		SELECT $1, id, $2 FROM pluits.authorization_roles WHERE role_key = 'personal_owner'
	`, membershipID, accountID); err != nil { return RegistrationResult{}, ErrIdentityUnavailable }

	if _, err = tx.ExecContext(ctx, `
		INSERT INTO pluits.security_events (account_id, event_type)
		VALUES ($1, 'account.registration_requested')
	`, accountID); err != nil { return RegistrationResult{}, ErrIdentityUnavailable }

	if err := tx.Commit(); err != nil { return RegistrationResult{}, ErrIdentityUnavailable }
	return RegistrationResult{Accepted: true}, nil
}

// VerifyEmail consumes a one-time token and activates the account in one transaction.
func (s *Service) VerifyEmail(ctx context.Context, rawToken string) error {
	if rawToken == "" || len(rawToken) > 256 { return ErrInvalidVerification }
	hash := TokenHash(rawToken)
	tx, err := s.db.BeginTx(ctx, nil)
	if err != nil { return ErrIdentityUnavailable }
	defer tx.Rollback()

	var challengeID, accountID, emailID string
	err = tx.QueryRowContext(ctx, `
		SELECT id, account_id, account_email_id
		FROM pluits.email_verification_challenges
		WHERE token_hash = $1 AND consumed_at IS NULL AND expires_at > NOW()
		FOR UPDATE
	`, hash[:]).Scan(&challengeID, &accountID, &emailID)
	if errors.Is(err, sql.ErrNoRows) { return ErrInvalidVerification }
	if err != nil { return ErrIdentityUnavailable }

	result, err := tx.ExecContext(ctx, `
		UPDATE pluits.email_verification_challenges SET consumed_at = NOW()
		WHERE id = $1 AND consumed_at IS NULL
	`, challengeID)
	if err != nil { return ErrIdentityUnavailable }
	changed, err := result.RowsAffected()
	if err != nil || changed != 1 { return ErrInvalidVerification }

	if _, err := tx.ExecContext(ctx, `
		UPDATE pluits.account_emails SET verified_at = NOW() WHERE id = $1 AND account_id = $2
	`, emailID, accountID); err != nil { return ErrIdentityUnavailable }
	if _, err := tx.ExecContext(ctx, `
		UPDATE pluits.accounts SET status = 'active', verified_at = NOW(), updated_at = NOW()
		WHERE id = $1 AND status = 'pending_verification'
	`, accountID); err != nil { return ErrIdentityUnavailable }
	if _, err := tx.ExecContext(ctx, `
		INSERT INTO pluits.security_events (account_id, event_type)
		VALUES ($1, 'account.email_verified')
	`, accountID); err != nil { return ErrIdentityUnavailable }
	if err := tx.Commit(); err != nil { return ErrIdentityUnavailable }
	return nil
}

// ConstantTimeTokenEqual is useful when comparing fixed-size derived token material.
func ConstantTimeTokenEqual(a, b []byte) bool {
	return len(a) == len(b) && subtle.ConstantTimeCompare(a, b) == 1
}

func stringsTrim(value string) string {
	return strings.TrimSpace(value)
}
