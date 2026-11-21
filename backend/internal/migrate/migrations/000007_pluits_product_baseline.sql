-- PLUITS is the first registered product in its own platform registry.
-- New verified accounts receive only the baseline PLUITS member capability.
INSERT INTO pluits.platform_products (product_key, display_name, lifecycle_status)
VALUES ('pluits', 'PLUITS', 'active')
ON CONFLICT (product_key) DO NOTHING;

INSERT INTO pluits.authorization_permissions (permission_key, description)
VALUES ('pluits.account.use', 'Access the standard PLUITS account experience')
ON CONFLICT (permission_key) DO NOTHING;

INSERT INTO pluits.authorization_roles (role_key, scope_type, description, product_key)
VALUES ('pluits_member', 'product', 'Standard PLUITS member', 'pluits')
ON CONFLICT (role_key) DO NOTHING;

INSERT INTO pluits.role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM pluits.authorization_roles r
JOIN pluits.authorization_permissions p ON p.permission_key = 'pluits.account.use'
WHERE r.role_key = 'pluits_member'
ON CONFLICT DO NOTHING;
