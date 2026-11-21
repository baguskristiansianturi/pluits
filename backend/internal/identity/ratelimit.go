package identity

import (
	"context"
	"crypto/hmac"
	"crypto/sha256"
	"database/sql"
	"errors"
	"time"
)

type RateLimiter struct {
	db *sql.DB
	key []byte
}

func NewRateLimiter(db *sql.DB, key []byte) (*RateLimiter, error) {
	if db == nil || len(key) != 32 { return nil, errors.New("rate limiter requires database and 32-byte HMAC key") }
	return &RateLimiter{db:db, key:append([]byte(nil), key...)}, nil
}

// Allow atomically increments a fixed-window bucket shared by all API instances.
// The supplied identifier should be the network peer address, not an untrusted proxy header.
func (l *RateLimiter) Allow(ctx context.Context, scope, identifier string, limit int, window time.Duration) (bool, error) {
	if scope == "" || identifier == "" || limit < 1 || window < time.Second { return false, errors.New("invalid rate-limit parameters") }
	mac := hmac.New(sha256.New, l.key)
	_, _ = mac.Write([]byte(scope))
	_, _ = mac.Write([]byte{0})
	_, _ = mac.Write([]byte(identifier))
	bucket := mac.Sum(nil)
	seconds := int(window.Seconds())
	var hits int
	err := l.db.QueryRowContext(ctx, `
		INSERT INTO pluits.rate_limit_buckets (bucket_hash, window_started_at, hits, expires_at)
		VALUES ($1, NOW(), 1, NOW() + ($2 * INTERVAL '1 second'))
		ON CONFLICT (bucket_hash) DO UPDATE SET
			hits = CASE
				WHEN pluits.rate_limit_buckets.window_started_at <= NOW() - ($2 * INTERVAL '1 second') THEN 1
				ELSE pluits.rate_limit_buckets.hits + 1
			END,
			window_started_at = CASE
				WHEN pluits.rate_limit_buckets.window_started_at <= NOW() - ($2 * INTERVAL '1 second') THEN NOW()
				ELSE pluits.rate_limit_buckets.window_started_at
			END,
			expires_at = NOW() + ($2 * INTERVAL '1 second')
		RETURNING hits
	`, bucket, seconds).Scan(&hits)
	if err != nil { return false, err }
	return hits <= limit, nil
}
