-- Product-neutral authorization, personal workspace, legal consent and recovery.
-- No product-specific role or fake account is seeded here.
CREATE TABLE pluits.workspaces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_type TEXT NOT NULL CHECK (workspace_type IN ('personal', 'organization')),
    display_name TEXT NOT NULL CHECK (length(display_name) BETWEEN 1 AND 120),
    created_by_account_id UUID NOT NULL REFERENCES pluits.accounts(id) ON DELETE RESTRICT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX workspaces_creator_idx ON pluits.workspaces (created_by_account_id, created_at);

CREATE TABLE pluits.workspace_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES pluits.workspaces(id) ON DELETE RESTRICT,
    account_id UUID NOT NULL REFERENCES pluits.accounts(id) ON DELETE RESTRICT,
    membership_status TEXT NOT NULL DEFAULT 'active'
        CHECK (membership_status IN ('invited', 'active', 'suspended', 'removed')),
    joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (workspace_id, account_id)
);
CREATE INDEX workspace_memberships_account_idx ON pluits.workspace_memberships (account_id, membership_status);

CREATE TABLE pluits.authorization_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_key TEXT NOT NULL UNIQUE,
    scope_type TEXT NOT NULL CHECK (scope_type IN ('platform', 'workspace', 'product')),
    description TEXT NOT NULL,
    is_system_role BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE pluits.authorization_permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    permission_key TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE pluits.role_permissions (
    role_id UUID NOT NULL REFERENCES pluits.authorization_roles(id) ON DELETE RESTRICT,
    permission_id UUID NOT NULL REFERENCES pluits.authorization_permissions(id) ON DELETE RESTRICT,
    PRIMARY KEY (role_id, permission_id)
);
CREATE TABLE pluits.membership_roles (
    membership_id UUID NOT NULL REFERENCES pluits.workspace_memberships(id) ON DELETE RESTRICT,
    role_id UUID NOT NULL REFERENCES pluits.authorization_roles(id) ON DELETE RESTRICT,
    granted_by_account_id UUID REFERENCES pluits.accounts(id) ON DELETE RESTRICT,
    granted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (membership_id, role_id)
);
CREATE TABLE pluits.workspace_product_grants (
    workspace_id UUID NOT NULL REFERENCES pluits.workspaces(id) ON DELETE RESTRICT,
    product_key TEXT NOT NULL CHECK (length(product_key) BETWEEN 2 AND 80),
    granted_by_account_id UUID NOT NULL REFERENCES pluits.accounts(id) ON DELETE RESTRICT,
    granted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (workspace_id, product_key)
);

CREATE TABLE pluits.account_consents (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    account_id UUID NOT NULL REFERENCES pluits.accounts(id) ON DELETE RESTRICT,
    consent_type TEXT NOT NULL CHECK (consent_type IN ('terms_of_service', 'privacy_policy')),
    document_version TEXT NOT NULL CHECK (length(document_version) BETWEEN 1 AND 40),
    document_sha256 BYTEA,
    accepted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    source TEXT NOT NULL DEFAULT 'web_registration',
    CHECK (document_sha256 IS NULL OR octet_length(document_sha256) = 32)
);
CREATE INDEX account_consents_account_idx ON pluits.account_consents (account_id, accepted_at DESC);

CREATE TABLE pluits.password_reset_challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID NOT NULL REFERENCES pluits.accounts(id) ON DELETE RESTRICT,
    token_hash BYTEA NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    consumed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CHECK (octet_length(token_hash) = 32),
    CHECK (expires_at > created_at)
);
CREATE INDEX password_reset_account_idx ON pluits.password_reset_challenges (account_id, created_at DESC);

-- Generic platform permissions only. Product-specific permissions are added with
-- the owning product module and never imply access to another product.
INSERT INTO pluits.authorization_roles (role_key, scope_type, description) VALUES
    ('personal_owner', 'workspace', 'Owner of an individual personal workspace'),
    ('platform_support', 'platform', 'Support role granted only through controlled administration');

INSERT INTO pluits.authorization_permissions (permission_key, description) VALUES
    ('workspace.read', 'Read an authorized workspace'),
    ('workspace.manage', 'Manage an authorized workspace'),
    ('workspace.members.manage', 'Manage workspace membership and invitations'),
    ('account.profile.read', 'Read own account profile'),
    ('account.profile.update', 'Update own account profile');

INSERT INTO pluits.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM pluits.authorization_roles r
CROSS JOIN pluits.authorization_permissions p
WHERE r.role_key = 'personal_owner'
  AND p.permission_key IN ('workspace.read', 'workspace.manage', 'workspace.members.manage');
