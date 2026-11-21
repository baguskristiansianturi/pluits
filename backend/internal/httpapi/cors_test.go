package httpapi

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestCORSAllowsOnlyConfiguredOrigin(t *testing.T) {
	handler := CORSHandler(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusNoContent)
	}), []string{"https://baguskristiansianturi.github.io"})
	request := httptest.NewRequest(http.MethodOptions, "/v1/identity/register", nil)
	request.Header.Set("Origin", "https://baguskristiansianturi.github.io")
	request.Header.Set("Access-Control-Request-Method", "POST")
	response := httptest.NewRecorder()
	handler.ServeHTTP(response, request)
	if response.Code != http.StatusNoContent { t.Fatalf("expected preflight success, got %d", response.Code) }
	if response.Header().Get("Access-Control-Allow-Origin") != "https://baguskristiansianturi.github.io" { t.Fatal("allowed origin header missing") }
}

func TestCORSRejectsUnknownAndWildcardOrigins(t *testing.T) {
	handler := CORSHandler(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusNoContent)
	}), []string{"*"})
	request := httptest.NewRequest(http.MethodGet, "/health/live", nil)
	request.Header.Set("Origin", "https://attacker.example")
	response := httptest.NewRecorder()
	handler.ServeHTTP(response, request)
	if response.Code != http.StatusForbidden { t.Fatalf("expected forbidden origin, got %d", response.Code) }
	if response.Header().Get("Access-Control-Allow-Origin") != "" { t.Fatal("wildcard must never be emitted") }
}
