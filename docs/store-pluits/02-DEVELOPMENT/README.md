# 02 — DEVELOPMENT

## Technical status
Technology choices and implementation architecture are **not yet selected or approved**.

## Required specifications before implementation
- Route map and module boundary
- Frontend page/component inventory
- Seller and customer role/permission matrix
- Product/catalog data model and media handling
- Cart, checkout and order state machines
- Inventory/stock consistency rules
- Shipping/fulfillment provider contracts
- Payment, refund and settlement contracts
- Promotion/discount calculation rules
- API contracts, validation and error handling
- Notifications and realtime requirements
- Tenant/seller isolation and audit logging
- Security, privacy, retention and backup plan
- Test strategy, migration and rollback plan

## Isolation requirements
Use module-scoped routes, components, styles, assets and state. Avoid broad global CSS changes. Do not modify PLUITS homepage, Inbox, Profile, Community, global navigation or unrelated modules during isolated development.

Do not assume payment custody, split settlement, shipping integrations or seller verification capabilities until provider and compliance requirements are checked.
