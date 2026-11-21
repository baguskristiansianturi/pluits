package httpapi

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
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

func TestDecodeJSONRejectsUnknownFieldsAndTrailingValues(t *testing.T) {
	for _, body := range []string{
		`{"email":"a@example.com","unexpected":true}`,
		`{"email":"a@example.com"} {"second":true}`,
	} {
		req := httptest.NewRequest(http.MethodPost, "/", strings.NewReader(body))
		req.Header.Set("Content-Type", "application/json")
		var target map[string]any
		if err := decodeJSON(httptest.NewRecorder(), req, &target); err == nil {
			t.Errorf("expected strict JSON rejection for %s", body)
		}
	}
}
