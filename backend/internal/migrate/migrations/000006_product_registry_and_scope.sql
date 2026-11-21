-- Product registry and tighter product-scoped role ownership.
-- Product rows represent real modules registered by PLUITS, not demo listings.
CREATE TABLE pluits.platform_products (
    product_key TEXT PRIMARY KEY CHECK (length(product_key) BETWEEN 2 AND 80),
    display_name TEXT NOT NULL CHECK (length(display_name) BETWEEN 1 AND 120),
    lifecycle_status TEXT NOT NULL DEFAULT 'active'
        CHECK (lifecycle_status IN ('active', 'maintenance', 'retired')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE pluits.workspace_product_grants
    ADD CONSTRAINT workspace_product_grants_product_fk
    FOREIGN KEY (product_key) REFERENCES pluits.platform_products(product_key) ON DELETE RESTRICT;

ALTER TABLE pluits.authorization_roles
    ADD COLUMN product_key TEXT REFERENCES pluits.platform_products(product_key) ON DELETE RESTRICT;

ALTER TABLE pluits.authorization_roles
    ADD CONSTRAINT authorization_roles_product_scope_check
    CHECK (
        (scope_type = 'product' AND product_key IS NOT NULL)
        OR (scope_type IN ('platform', 'workspace') AND product_key IS NULL)
    );

CREATE UNIQUE INDEX workspaces_one_personal_per_owner
    ON pluits.workspaces (created_by_account_id)
    WHERE workspace_type = 'personal';
