package httpapi

import (
	"net/http"
	"strings"
)

// CORSHandler permits only explicitly configured browser origins. It does not
// enable credential cookies; browser clients authenticate with bearer tokens.
func CORSHandler(next http.Handler, configuredOrigins []string) http.Handler {
	allowed := make(map[string]struct{}, len(configuredOrigins))
	for _, origin := range configuredOrigins {
		origin = strings.TrimSpace(origin)
		if origin == "" || origin == "*" { continue }
		allowed[origin] = struct{}{}
	}
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		origin := r.Header.Get("Origin")
		if origin != "" {
			if _, ok := allowed[origin]; !ok {
				http.Error(w, "origin not allowed", http.StatusForbidden)
				return
			}
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Add("Vary", "Origin")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Authorization, Content-Type")
			w.Header().Set("Access-Control-Max-Age", "600")
		}
		if r.Method == http.MethodOptions {
			if origin == "" {
				http.Error(w, "origin required", http.StatusBadRequest)
				return
			}
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}
