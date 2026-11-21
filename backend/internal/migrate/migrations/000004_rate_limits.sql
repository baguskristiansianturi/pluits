-- Shared, database-backed rate-limit state so API instances enforce the same limits.
-- Client identifiers are HMACed by the application; raw IP/email values are not stored.
CREATE TABLE pluits.rate_limit_buckets (
    bucket_hash BYTEA PRIMARY KEY,
    window_started_at TIMESTAMPTZ NOT NULL,
    hits INTEGER NOT NULL CHECK (hits > 0),
    expires_at TIMESTAMPTZ NOT NULL,
    CHECK (octet_length(bucket_hash) = 32)
);
CREATE INDEX rate_limit_buckets_expiry_idx
    ON pluits.rate_limit_buckets (expires_at);
