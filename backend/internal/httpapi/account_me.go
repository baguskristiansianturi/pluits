package httpapi

import (
	"database/sql"
	"net/http"
)

type accountMeResponse struct {
	AccountID string `json:"account_id"`
	Email string `json:"email"`
	DisplayName string `json:"display_name"`
	ProfileVisibility string `json:"profile_visibility"`
	WorkspaceID string `json:"personal_workspace_id"`
	Roles []string `json:"roles"`
}

func NewAccountMeHandler(db *sql.DB) http.Handler {
	return RequireAccount(db, http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		accountID := AccountIDFromContext(r.Context())
		var response accountMeResponse
		response.AccountID = accountID
		err := db.QueryRowContext(r.Context(),
			"SELECT e.email, p.display_name, p.profile_visibility, w.id::text "+
			"FROM pluits.accounts a "+
			"JOIN pluits.account_emails e ON e.account_id=a.id AND e.is_primary=TRUE AND e.verified_at IS NOT NULL "+
			"JOIN pluits.personal_profiles p ON p.account_id=a.id "+
			"JOIN pluits.workspaces w ON w.created_by_account_id=a.id AND w.workspace_type='personal' "+
			"JOIN pluits.workspace_memberships m ON m.workspace_id=w.id AND m.account_id=a.id AND m.membership_status='active' "+
			"WHERE a.id=$1 AND a.status='active' ORDER BY w.created_at ASC LIMIT 1",
			accountID,
		).Scan(&response.Email, &response.DisplayName, &response.ProfileVisibility, &response.WorkspaceID)
		if err != nil {
			writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"})
			return
		}
		rows, err := db.QueryContext(r.Context(),
			"SELECT r.role_key FROM pluits.workspace_memberships m "+
			"JOIN pluits.membership_roles mr ON mr.membership_id=m.id "+
			"JOIN pluits.authorization_roles r ON r.id=mr.role_id "+
			"WHERE m.account_id=$1 AND m.workspace_id=$2 AND m.membership_status='active' "+
			"ORDER BY r.role_key",
			accountID, response.WorkspaceID,
		)
		if err != nil {
			writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"})
			return
		}
		defer rows.Close()
		response.Roles = []string{}
		for rows.Next() {
			var role string
			if err := rows.Scan(&role); err != nil {
				writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"})
				return
			}
			response.Roles = append(response.Roles, role)
		}
		if err := rows.Err(); err != nil {
			writeJSON(w, http.StatusServiceUnavailable, map[string]string{"status":"unavailable"})
			return
		}
		writeJSON(w, http.StatusOK, response)
	}))
}
