package identity

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"encoding/base64"
	"errors"
	"fmt"
	"io"
)

// EncryptSecret encrypts short-lived delivery secrets before they enter an
// asynchronous outbox. The caller must keep the 32-byte key outside the database.
func EncryptSecret(key, plaintext []byte) ([]byte, error) {
	if len(key) != 32 { return nil, errors.New("outbox encryption key must be 32 bytes") }
	block, err := aes.NewCipher(key)
	if err != nil { return nil, fmt.Errorf("initialize encryption: %w", err) }
	aead, err := cipher.NewGCM(block)
	if err != nil { return nil, fmt.Errorf("initialize authenticated encryption: %w", err) }
	nonce := make([]byte, aead.NonceSize())
	if _, err := io.ReadFull(rand.Reader, nonce); err != nil { return nil, errors.New("secure nonce generation failed") }
	return append(nonce, aead.Seal(nil, nonce, plaintext, []byte("pluits-email-outbox-v1"))...), nil
}

func DecryptSecret(key, ciphertext []byte) ([]byte, error) {
	if len(key) != 32 { return nil, errors.New("outbox encryption key must be 32 bytes") }
	block, err := aes.NewCipher(key)
	if err != nil { return nil, fmt.Errorf("initialize decryption: %w", err) }
	aead, err := cipher.NewGCM(block)
	if err != nil { return nil, fmt.Errorf("initialize authenticated decryption: %w", err) }
	if len(ciphertext) < aead.NonceSize()+aead.Overhead() { return nil, errors.New("encrypted secret is truncated") }
	nonce, body := ciphertext[:aead.NonceSize()], ciphertext[aead.NonceSize():]
	plain, err := aead.Open(nil, nonce, body, []byte("pluits-email-outbox-v1"))
	if err != nil { return nil, errors.New("encrypted secret authentication failed") }
	return plain, nil
}

func DecodeEncryptionKey(encoded string) ([]byte, error) {
	key, err := base64.RawStdEncoding.DecodeString(encoded)
	if err != nil || len(key) != 32 { return nil, errors.New("outbox encryption key must be base64-encoded 32-byte material") }
	return key, nil
}
