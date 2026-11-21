package httpapi

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestRequireAccountRejectsMissingBearerToken(t *testing.T) {
	handler := RequireAccount(nil, http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusNoContent)
	}))
	rec := httptest.NewRecorder()
	handler.ServeHTTP(rec, httptest.NewRequest(http.MethodGet, "/private", nil))
	if rec.Code != http.StatusServiceUnavailable { t.Fatalf("expected unavailable without database, got %d", rec.Code) }
}
