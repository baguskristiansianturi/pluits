package httpapi

import (
  "net/http/httptest"
  "testing"
)

func TestClientIdentifierUsesForwardedIPOnlyFromTrustedProxy(t *testing.T) {
  handler := NewIdentityHandler(nil)
  if err := handler.SetTrustedProxyCIDRs("172.31.255.2/32"); err != nil {
    t.Fatal(err)
  }

  trusted := httptest.NewRequest("POST", "http://pluits.local/v1/identity/login", nil)
  trusted.RemoteAddr = "172.31.255.2:43120"
  trusted.Header.Set("X-Forwarded-For", "198.51.100.17, 172.31.255.2")
  if got := handler.clientIdentifier(trusted); got != "198.51.100.17" {
    t.Fatalf("trusted proxy client IP = %q, want 198.51.100.17", got)
  }

  untrusted := httptest.NewRequest("POST", "http://pluits.local/v1/identity/login", nil)
  untrusted.RemoteAddr = "203.0.113.24:43120"
  untrusted.Header.Set("X-Forwarded-For", "198.51.100.17")
  if got := handler.clientIdentifier(untrusted); got != "203.0.113.24" {
    t.Fatalf("untrusted forwarded header changed peer IP: got %q", got)
  }
}

func TestClientIdentifierIgnoresForwardedHeaderWithoutTrustedProxy(t *testing.T) {
  handler := NewIdentityHandler(nil)
  request := httptest.NewRequest("POST", "http://pluits.local/v1/identity/login", nil)
  request.RemoteAddr = "203.0.113.24:43120"
  request.Header.Set("X-Forwarded-For", "198.51.100.17")

  if got := handler.clientIdentifier(request); got != "203.0.113.24" {
    t.Fatalf("untrusted forwarded header changed peer IP: got %q", got)
  }
}

func TestSetTrustedProxyCIDRsRejectsInvalidNetwork(t *testing.T) {
  handler := NewIdentityHandler(nil)
  if err := handler.SetTrustedProxyCIDRs("not-a-cidr"); err == nil {
    t.Fatal("expected invalid trusted proxy CIDR to be rejected")
  }
}
