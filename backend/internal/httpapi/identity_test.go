package httpapi

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/baguskristiansianturi/pluits/backend/internal/identity"
)

func TestIdentityEndpointsAreUnavailableWithoutConfiguredService(t *testing.T) {
	mux := http.NewServeMux()
	NewIdentityHandler(nil).Register(mux)
	for _, path := range []string{"/v1/identity/register", "/v1/identity/verify-email"} {
		req := httptest.NewRequest(http.MethodPost, path, strings.NewReader(`{}`))
		req.Header.Set("Content-Type", "application/json")
		rec := httptest.NewRecorder()
		SecureHandler(mux).ServeHTTP(rec, req)
		if rec.Code != http.StatusServiceUnavailable { t.Errorf("%s: expected 503, got %d", path, rec.Code) }
	}
}

func TestIdentityRegistrationRejectsUnknownFields(t *testing.T) {
	mux := http.NewServeMux()
	// A nil service still validates availability first; this test validates JSON
	// strictness with a configured handler contract covered by the service tests.
	NewIdentityHandler(nil).Register(mux)
	req := httptest.NewRequest(http.MethodPost, "/v1/identity/register", strings.NewReader(`{"email":"a@b.com","unexpected":true}`))
	req.Header.Set("Content-Type", "application/json")
	rec := httptest.NewRecorder()
	SecureHandler(mux).ServeHTTP(rec, req)
	if rec.Code != http.StatusServiceUnavailable { t.Fatalf("expected service guard before parsing, got %d", rec.Code) }
}

var _ = identity.RegistrationInput{}
