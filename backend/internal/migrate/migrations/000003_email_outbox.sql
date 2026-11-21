-- Durable asynchronous email delivery queue.
-- Verification tokens are encrypted at the application layer; the database never
-- stores delivery secrets in plaintext. Encryption keys stay outside PostgreSQL.
CREATE TABLE pluits.email_outbox (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID REFERENCES pluits.accounts(id) ON DELETE RESTRICT,
    recipient_email TEXT NOT NULL,
    template_key TEXT NOT NULL,
    payload_ciphertext BYTEA NOT NULL,
    encryption_key_version SMALLINT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'processing', 'sent', 'failed')),
    attempts INTEGER NOT NULL DEFAULT 0 CHECK (attempts >= 0),
    available_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    locked_at TIMESTAMPTZ,
    sent_at TIMESTAMPTZ,
    last_error_code TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CHECK (length(recipient_email) BETWEEN 3 AND 320),
    CHECK (length(template_key) BETWEEN 1 AND 80),
    CHECK (octet_length(payload_ciphertext) > 0),
    CHECK (encryption_key_version > 0)
);
CREATE INDEX email_outbox_pending_idx
    ON pluits.email_outbox (available_at, created_at)
    WHERE status = 'pending';
CREATE INDEX email_outbox_account_created_idx
    ON pluits.email_outbox (account_id, created_at DESC);
