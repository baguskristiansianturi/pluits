# 04 — CHECKLIST & AUDIT

## Audit documents
- [Audit findings and completeness review](AUDIT-FINDINGS.md)

## Cross-check for every Feature ID
1. DESIGN: business purpose, user journey, page/form, rules, edge cases and acceptance criteria.
2. DEVELOPMENT: components, data, APIs, permissions, security, integrations and failure handling.
3. PROJECT: code paths, commit, reproducible test evidence and known defects.
4. AUDIT: design-to-code parity, tenant isolation, privacy, regression and operational readiness.

## Initial release gates
- Seller/customer data isolation and backend authorization.
- Physical-store verification and seller lifecycle controls.
- Product price and availability validated server-side.
- Inventory consistency under concurrent marketplace and POS orders.
- Idempotent checkout/payment and reliable order creation.
- Explicit cancellation, return, refund and dispute rules.
- Payment/settlement capability verified against provider contracts.
- Shipping/fulfillment states and exception handling tested.
- Mobile usability and performance checked.
- No regression in existing PLUITS pages, routes or navigation.

## Current audit statement
The design audit baseline is documented. It identifies critical open decisions and missing specifications. This is not a code/security audit: no implementation, test, deployment or production regression verification has been performed.
