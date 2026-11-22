package httpapi

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestSocialEndpointsUnavailableWithoutDatabase(t *testing.T) {
	mux := http.NewServeMux()
	NewSocialHandler(nil, nil).Register(mux)
	cases := []struct{ method, path, body string }{
		{http.MethodGet, "/v1/social/feed", ""},
		{http.MethodGet, "/v1/social/posts/me", ""},
		{http.MethodPost, "/v1/social/posts", `{"caption":"Halo PLUITS"}`},
	}
	for _, item := range cases {
		req := httptest.NewRequest(item.method, item.path, strings.NewReader(item.body))
		if item.body != "" { req.Header.Set("Content-Type", "application/json") }
		rec := httptest.NewRecorder()
		SecureHandler(mux).ServeHTTP(rec, req)
		if rec.Code != http.StatusServiceUnavailable { t.Errorf("%s %s: expected 503, got %d", item.method, item.path, rec.Code) }
	}
}

func TestDecodeSocialPostValidation(t *testing.T) {
	cases := []struct { body string; wantErr bool; wantVisibility string }{
		{`{"caption":"  Cerita hari ini  "}`, false, "public"},
		{`{"caption":"Catatan privat","visibility":"private"}`, false, "private"},
		{`{"caption":"   "}`, true, ""},
		{`{"caption":"x","visibility":"followers"}`, true, ""},
		{`{"caption":"x","unexpected":true}`, true, ""},
		{`{"caption":"x"} {"second":true}`, true, ""},
	}
	for _, item := range cases {
		req := httptest.NewRequest(http.MethodPost, "/v1/social/posts", strings.NewReader(item.body))
		req.Header.Set("Content-Type", "application/json")
		got, err := decodeSocialPost(req)
		if (err != nil) != item.wantErr { t.Errorf("body %s: error=%v", item.body, err); continue }
		if err == nil && got.Visibility != item.wantVisibility { t.Errorf("body %s: visibility=%q", item.body, got.Visibility) }
	}
}

func TestDecodeSocialPostRejectsOversizedCaption(t *testing.T) {
	body := `{"caption":"` + strings.Repeat("a", 5001) + `"}`
	req := httptest.NewRequest(http.MethodPost, "/v1/social/posts", strings.NewReader(body))
	req.Header.Set("Content-Type", "application/json")
	if _, err := decodeSocialPost(req); err == nil { t.Fatal("expected oversized caption to be rejected") }
}
