package identity

import (
	"crypto/rand"
	"crypto/subtle"
	"encoding/base64"
	"errors"
	"fmt"
	"strconv"
	"strings"

	"golang.org/x/crypto/argon2"
)

const (
	argonMemory uint32 = 64 * 1024
	argonIterations uint32 = 3
	argonParallelism uint8 = 2
	argonSaltLength = 16
	argonKeyLength = 32
	maxPasswordBytes = 1024
)

var ErrInvalidPasswordHash = errors.New("invalid password hash")

// HashPassword uses Argon2id and stores its parameters with the resulting hash.
func HashPassword(password string) (string, error) {
	if err := ValidatePassword(password); err != nil { return "", err }
	salt := make([]byte, argonSaltLength)
	if _, err := rand.Read(salt); err != nil { return "", fmt.Errorf("generate password salt: %w", err) }
	key := argon2.IDKey([]byte(password), salt, argonIterations, argonMemory, argonParallelism, argonKeyLength)
	enc := base64.RawStdEncoding
	return fmt.Sprintf("$argon2id$v=19$m=%d,t=%d,p=%d$%s$%s", argonMemory, argonIterations, argonParallelism, enc.EncodeToString(salt), enc.EncodeToString(key)), nil
}

func ValidatePassword(password string) error {
	if len(password) < 12 { return errors.New("password must contain at least 12 bytes") }
	if len(password) > maxPasswordBytes { return errors.New("password is too long") }
	return nil
}

func VerifyPassword(encoded, password string) (bool, error) {
	if len(password) > maxPasswordBytes { return false, nil }
	parts := strings.Split(encoded, "$")
	if len(parts) != 6 || parts[1] != "argon2id" || parts[2] != "v=19" { return false, ErrInvalidPasswordHash }
	var memory, iterations, parallelism uint64
	for _, field := range strings.Split(parts[3], ",") {
		pair := strings.SplitN(field, "=", 2)
		if len(pair) != 2 { return false, ErrInvalidPasswordHash }
		value, err := strconv.ParseUint(pair[1], 10, 32)
		if err != nil { return false, ErrInvalidPasswordHash }
		switch pair[0] {
		case "m": memory = value
		case "t": iterations = value
		case "p": parallelism = value
		default: return false, ErrInvalidPasswordHash
		}
	}
	if memory < 8*1024 || memory > 256*1024 || iterations < 1 || iterations > 10 || parallelism < 1 || parallelism > 8 { return false, ErrInvalidPasswordHash }
	enc := base64.RawStdEncoding
	salt, err := enc.DecodeString(parts[4])
	if err != nil || len(salt) < 16 || len(salt) > 64 { return false, ErrInvalidPasswordHash }
	expected, err := enc.DecodeString(parts[5])
	if err != nil || len(expected) < 16 || len(expected) > 64 { return false, ErrInvalidPasswordHash }
	actual := argon2.IDKey([]byte(password), salt, uint32(iterations), uint32(memory), uint8(parallelism), uint32(len(expected)))
	return subtle.ConstantTimeCompare(actual, expected) == 1, nil
}
