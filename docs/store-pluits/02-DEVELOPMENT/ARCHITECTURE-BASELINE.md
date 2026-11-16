# Technical Architecture Baseline

Status: **PROPOSED; no technology or provider selected**.

## Bounded domains
1. Identity and access control.
2. Merchant, store and branch.
3. Verification and compliance evidence.
4. Category, attribute and product catalog.
5. Variant/SKU/barcode.
6. Pricing and promotion.
7. Inventory and stock movements.
8. Search and discovery indexing.
9. Cart and checkout.
10. Order and order-line snapshots.
11. Payment and provider webhooks.
12. Fulfillment, pickup and delivery.
13. POS and cashier shifts.
14. Return, refund and dispute.
15. Reviews and reputation.
16. Commission, ledger and settlement.
17. Notifications and support.
18. Admin moderation and audit.
19. Reporting and analytics.

## Data ownership boundaries
- Merchant owns store-level business data; PLUITS owns platform taxonomy and policy.
- Store owns branch definitions; inventory is location-scoped.
- Product parent belongs to seller catalog; variant is the sellable SKU.
- Inventory service is the sole authority for sellable quantity.
- Order lines store immutable snapshots; they do not depend on current catalog joins for historical truth.
- Payment provider events are normalized and processed idempotently.
- Seller data access is scoped by merchant/store/branch and verified server-side.

## Core consistency patterns
- Use transactions/conditional updates for stock reservation and deduction.
- Use idempotency keys for checkout, payment initiation, provider webhook processing, POS sale and refunds.
- Use transactional outbox or equivalent reliable event publication for order/inventory/notification side effects.
- Treat search and homepage indexes as eventually consistent projections.
- Never trust client-supplied price, discount, tax, stock or payment-success state.
- Store timestamps in a consistent canonical format and render in store/customer locale.
- Keep audit history append-only for privileged and financially relevant changes.

## Security and privacy baseline
- Enforce tenant authorization on every API and storage object.
- Least-privilege roles and branch scoping.
- Verify uploaded documents/media; isolate private verification evidence from public product media.
- Protect personal data, payment references and precise location.
- Rate-limit authentication, search abuse, reviews and seller application endpoints.
- Secret/provider credentials remain server-side.
- Define retention, deletion, legal hold, backup and incident-response policies before launch.

## Integration boundary
Store should use explicit adapters/contracts to existing PLUITS identity, profile, inbox, notification and account systems. Do not directly rewrite or globally restyle those modules. Final routes and navigation must be reconciled with the existing app before any integration.
