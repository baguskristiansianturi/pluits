package identity

import "testing"

func TestNormalizeEmail(t *testing.T) {
	got, err := NormalizeEmail("  Bagus.Example+pluits@Example.COM ")
	if err != nil { t.Fatal(err) }
	if got.Original != "Bagus.Example+pluits@Example.COM" { t.Fatalf("unexpected original: %q", got.Original) }
	if got.Canonical != "bagus.example+pluits@example.com" { t.Fatalf("unexpected canonical: %q", got.Canonical) }
}

func TestNormalizeEmailRejectsInvalidAndDisplayName(t *testing.T) {
	for _, value := range []string{"", "not-an-email", "Bagus <bagus@example.com>", "a@b.com extra", "a@b.com\nBcc:x@y.com"} {
		if _, err := NormalizeEmail(value); err == nil { t.Errorf("expected invalid email rejection for %q", value) }
	}
}
