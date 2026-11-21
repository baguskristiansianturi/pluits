package identity

import (
	"bytes"
	"testing"
)

func TestEncryptDecryptSecret(t *testing.T) {
	key := bytes.Repeat([]byte{0x42}, 32)
	secret := []byte("single-use verification token")
	ciphertext, err := EncryptSecret(key, secret)
	if err != nil { t.Fatal(err) }
	if bytes.Contains(ciphertext, secret) { t.Fatal("ciphertext must not contain plaintext") }
	plain, err := DecryptSecret(key, ciphertext)
	if err != nil { t.Fatal(err) }
	if !bytes.Equal(plain, secret) { t.Fatal("decrypted secret mismatch") }
}

func TestDecryptRejectsWrongKeyAndTampering(t *testing.T) {
	key := bytes.Repeat([]byte{0x11}, 32)
	ciphertext, err := EncryptSecret(key, []byte("secret"))
	if err != nil { t.Fatal(err) }
	wrong := bytes.Repeat([]byte{0x22}, 32)
	if _, err := DecryptSecret(wrong, ciphertext); err == nil { t.Fatal("expected wrong key rejection") }
	ciphertext[len(ciphertext)-1] ^= 0xff
	if _, err := DecryptSecret(key, ciphertext); err == nil { t.Fatal("expected tampering rejection") }
}
