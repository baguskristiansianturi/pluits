package authorization

import (
	"context"
	"database/sql"
	"errors"
	"strings"
)

type Policy struct { db *sql.DB }

func NewPolicy(db *sql.DB) (*Policy, error) {
	if db == nil { return nil, errors.New("authorization policy requires database") }
	return &Policy{db:db}, nil
}

// Can checks account status, active workspace membership, scoped role permission,
// and (for product operations) an explicit workspace-to-product grant.
func (p *Policy) Can(ctx context.Context, accountID, workspaceID, productKey, permissionKey string) (bool, error) {
	if strings.TrimSpace(accountID)=="" || strings.TrimSpace(workspaceID)=="" || strings.TrimSpace(permissionKey)=="" {
		return false, errors.New("account, workspace and permission are required")
	}
	scope := "workspace"
	if productKey != "" { scope = "product" }
	var allowed bool
	err := p.db.QueryRowContext(ctx, `
		SELECT EXISTS (
			SELECT 1
			FROM pluits.accounts a
			JOIN pluits.workspace_memberships m ON m.account_id=a.id AND m.workspace_id=$2 AND m.membership_status='active'
			JOIN pluits.membership_roles mr ON mr.membership_id=m.id
			JOIN pluits.authorization_roles r ON r.id=mr.role_id AND r.scope_type=$5
			JOIN pluits.role_permissions rp ON rp.role_id=r.id
			JOIN pluits.authorization_permissions p ON p.id=rp.permission_id AND p.permission_key=$4
			WHERE a.id=$1 AND a.status='active'
			  AND ($3='' OR EXISTS (
				SELECT 1 FROM pluits.workspace_product_grants g
				WHERE g.workspace_id=m.workspace_id AND g.product_key=$3
			  ))
		)
	`, accountID, workspaceID, productKey, permissionKey, scope).Scan(&allowed)
	if err != nil { return false, err }
	return allowed, nil
}
