package identity

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"errors"
)

const tokenBytes = 32

// NewOpaqueToken returns a URL-safe cryptographically random bearer token.
// Persist only the SHA-256 hash, never the raw token.
func NewOpaqueToken() (string, error) {
	raw := make([]byte, tokenBytes)
	if _, err := rand.Read(raw); err != nil { return "", errors.New("secure token generation failed") }
	return base64.RawURLEncoding.EncodeToString(raw), nil
}

func TokenHash(token string) [32]byte { return sha256.Sum256([]byte(token)) }
