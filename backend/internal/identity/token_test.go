package identity

import "testing"

func TestOpaqueTokensAreUniqueAndHashable(t *testing.T) {
	a, err := NewOpaqueToken()
	if err != nil { t.Fatal(err) }
	b, err := NewOpaqueToken()
	if err != nil { t.Fatal(err) }
	if a == b { t.Fatal("tokens must be independently random") }
	if TokenHash(a) == TokenHash(b) { t.Fatal("different tokens must have different hashes") }
	if len(TokenHash(a)) != 32 { t.Fatal("expected SHA-256 token hash") }
}
