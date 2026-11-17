# 02 — DEVELOPMENT

## Technical status
Architecture is a proposed baseline only. Technology, payment providers, shipping providers and production integration contracts are not yet selected or approved.

## Documents
- [Technical architecture baseline](ARCHITECTURE-BASELINE.md)

## Required specifications before implementation
- Route map reconciled with existing PLUITS router
- Frontend page/component inventory and acceptance criteria
- Seller/customer/admin role and permission matrix
- Merchant/store/branch and verification data model
- Category, typed attributes, product/variant/SKU and media model
- Inventory transaction, reservation and POS consistency rules
- Cart, multi-seller checkout and order state machines
- Shipping/fulfillment provider contracts
- Payment, refund, ledger and settlement contracts
- Promotion/discount/tax calculation rules
- API contracts, validation, idempotency and error handling
- Notifications, event delivery and realtime recovery
- Tenant isolation, audit logging and moderation controls
- Security, privacy, retention, backup and incident response
- Test strategy, migration and rollback plan

## Isolation requirements
Use module-scoped routes, components, styles, assets and state. Avoid broad global CSS changes. Do not modify PLUITS homepage, Inbox, Profile, Community, global navigation or unrelated modules during isolated development.

Do not assume payment custody, split settlement, shipping integrations, offline POS or seller verification capabilities until provider, policy and compliance requirements are checked.
