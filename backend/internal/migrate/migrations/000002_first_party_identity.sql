-- First-party identity foundation for the clean PLUITS database.
-- Secrets are stored only as cryptographic hashes; delivery encryption is a later
-- application-layer concern. No Supabase identities or credentials are imported.

CREATE TABLE pluits.accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    status TEXT NOT NULL DEFAULT 'pending_verification'
        CHECK (status IN ('pending_verification', 'active', 'suspended', 'closed')),
    verified_at TIMESTAMPTZ,
    suspended_at TIMESTAMPTZ,
    closed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CHECK ((status <> 'active') OR verified_at IS NOT NULL),
    CHECK ((status <> 'suspended') OR suspended_at IS NOT NULL),
    CHECK ((status <> 'closed') OR closed_at IS NOT NULL)
);

CREATE TABLE pluits.account_emails (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL REFERENCES pluits.accounts(id) ON DELETE RESTRICT,
    email TEXT NOT NULL,
    email_normalized TEXT NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT TRUE,
    verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (account_id, email_normalized),
    CHECK (length(email_normalized) BETWEEN 3 AND 320)
);
CREATE UNIQUE INDEX account_emails_normalized_unique
    ON pluits.account_emails (email_normalized);
CREATE UNIQUE INDEX account_emails_one_primary_per_account
    ON pluits.account_emails (account_id) WHERE is_primary;

CREATE TABLE pluits.account_credentials (
    account_id UUID PRIMARY KEY REFERENCES pluits.accounts(id) ON DELETE RESTRICT,
    password_hash TEXT NOT NULL,
    password_algorithm TEXT NOT NULL DEFAULT 'argon2id',
    password_parameters JSONB NOT NULL,
    password_changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CHECK (password_algorithm = 'argon2id')
);

CREATE TABLE pluits.personal_profiles (
    account_id UUID PRIMARY KEY REFERENCES pluits.accounts(id) ON DELETE RESTRICT,
    display_name TEXT NOT NULL,
    username TEXT,
    bio TEXT,
    avatar_media_id UUID,
    profile_visibility TEXT NOT NULL DEFAULT 'public'
        CHECK (profile_visibility IN ('public', 'private')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CHECK (length(display_name) BETWEEN 1 AND 80),
    CHECK (username IS NULL OR length(username) BETWEEN 3 AND 30)
);
CREATE UNIQUE INDEX personal_profiles_username_normalized_unique
    ON pluits.personal_profiles (lower(username))
    WHERE username IS NOT NULL;

CREATE TABLE pluits.email_verification_challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL REFERENCES pluits.accounts(id) ON DELETE RESTRICT,
    account_email_id UUID NOT NULL REFERENCES pluits.account_emails(id) ON DELETE RESTRICT,
    token_hash BYTEA NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    consumed_at TIMESTAMPTZ,
    failed_attempts INTEGER NOT NULL DEFAULT 0 CHECK (failed_attempts >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CHECK (octet_length(token_hash) = 32),
    CHECK (expires_at > created_at)
);
CREATE INDEX email_verification_challenges_account_created_idx
    ON pluits.email_verification_challenges (account_id, created_at DESC);

CREATE TABLE pluits.sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL REFERENCES pluits.accounts(id) ON DELETE RESTRICT,
    token_family_id UUID NOT NULL,
    access_token_hash BYTEA NOT NULL UNIQUE,
    refresh_token_hash BYTEA NOT NULL UNIQUE,
    access_expires_at TIMESTAMPTZ NOT NULL,
    refresh_expires_at TIMESTAMPTZ NOT NULL,
    last_seen_at TIMESTAMPTZ,
    user_agent TEXT,
    ip_address INET,
    revoked_at TIMESTAMPTZ,
    revoke_reason TEXT,
    replaced_by_session_id UUID REFERENCES pluits.sessions(id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CHECK (octet_length(access_token_hash) = 32),
    CHECK (octet_length(refresh_token_hash) = 32),
    CHECK (refresh_expires_at > access_expires_at)
);
CREATE INDEX sessions_account_active_idx
    ON pluits.sessions (account_id, created_at DESC)
    WHERE revoked_at IS NULL;
CREATE INDEX sessions_token_family_idx
    ON pluits.sessions (token_family_id, created_at DESC);

CREATE TABLE pluits.security_events (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    account_id UUID REFERENCES pluits.accounts(id) ON DELETE RESTRICT,
    event_type TEXT NOT NULL,
    request_id TEXT,
    ip_address INET,
    user_agent TEXT,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CHECK (length(event_type) BETWEEN 1 AND 80)
);
CREATE INDEX security_events_account_created_idx
    ON pluits.security_events (account_id, created_at DESC);
CREATE INDEX security_events_type_created_idx
    ON pluits.security_events (event_type, created_at DESC);
