package identity

import (
	"strings"
	"testing"
)

func TestHashAndVerifyPassword(t *testing.T) {
	password := "correct horse battery staple"
	hash, err := HashPassword(password)
	if err != nil { t.Fatal(err) }
	if !strings.HasPrefix(hash, "$argon2id$v=19$") { t.Fatalf("unexpected hash format: %q", hash) }
	ok, err := VerifyPassword(hash, password)
	if err != nil || !ok { t.Fatalf("expected password match, ok=%v err=%v", ok, err) }
	ok, err = VerifyPassword(hash, "incorrect password")
	if err != nil || ok { t.Fatalf("expected mismatch, ok=%v err=%v", ok, err) }
}

func TestPasswordValidation(t *testing.T) {
	for _, password := range []string{"short", strings.Repeat("x", maxPasswordBytes+1)} {
		if err := ValidatePassword(password); err == nil { t.Errorf("expected rejection for password length %d", len(password)) }
	}
	if err := ValidatePassword("long-enough-password"); err != nil { t.Fatalf("unexpected validation error: %v", err) }
}

func TestVerifyRejectsUnsafeHashParameters(t *testing.T) {
	_, err := VerifyPassword("$argon2id$v=19$m=999999999,t=3,p=2$c2FsdHNhbHRzYWx0MTIzNA$YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4", "any password")
	if err == nil { t.Fatal("expected unsafe hash parameters to be rejected") }
}
