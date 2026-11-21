package httpapi

import (
	"context"
	"database/sql"
	"errors"
	"net/http"
	"strings"

	"github.com/baguskristiansianturi/pluits/backend/internal/identity"
)

type authenticatedAccountKey struct{}

func AccountIDFromContext(ctx context.Context) string {
	accountID, _ := ctx.Value(authenticatedAccountKey{}).(string)
	return accountID
}

// RequireAccount validates the opaque access token against the current session
// and account state on every protected request. Revocation is therefore immediate.
func RequireAccount(db *sql.DB, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if db == nil {
			writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"})
			return
		}
		const prefix = "Bearer "
		header := r.Header.Get("Authorization")
		if !strings.HasPrefix(header, prefix) {
			writeJSON(w, http.StatusUnauthorized, map[string]string{"error":"authentication_required"})
			return
		}
		token := strings.TrimSpace(strings.TrimPrefix(header, prefix))
		if token == "" || len(token) > 256 {
			writeJSON(w, http.StatusUnauthorized, map[string]string{"error":"invalid_session"})
			return
		}
		hash := identity.TokenHash(token)
		var accountID string
		err := db.QueryRowContext(r.Context(), `
			SELECT s.account_id::text
			FROM pluits.sessions s
			JOIN pluits.accounts a ON a.id = s.account_id
			WHERE s.access_token_hash = $1
			  AND s.revoked_at IS NULL
			  AND s.access_expires_at > NOW()
			  AND a.status = 'active'
		`, hash[:]).Scan(&accountID)
		if errors.Is(err, sql.ErrNoRows) {
			writeJSON(w, http.StatusUnauthorized, map[string]string{"error":"invalid_session"})
			return
		}
		if err != nil {
			writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"})
			return
		}
		ctx := context.WithValue(r.Context(), authenticatedAccountKey{}, accountID)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
