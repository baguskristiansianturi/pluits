# 02 — DEVELOPMENT

## Architectural baseline
Start with a modular monolith and explicit domain boundaries. Do not introduce microservices until measured scale or operational isolation requires them.

## Isolation requirements
- Keep module routes, components, styles, assets and state isolated.
- Prefer scoped styles/CSS modules; do not add broad global CSS selectors.
- Do not edit PLUITS homepage, Inbox, Profile, Community, global navigation, global styles or unrelated modules during isolated work.
- Integrate existing authentication, profile, inbox and notification capabilities through adapters/contracts; avoid invasive changes to their internals.
- Backend authorization is mandatory; hiding a button is not access control.
- Mobile-first and lightweight; test on constrained Android hardware and mobile browsers.

## Proposed domain modules
Identity/RBAC; Restaurant/Branch; Visit/Table; Reservation; Menu/Category; Variant/Modifier; Pricing; Cart; Order; Kitchen; Staff/Attendance; Service Assignment; Fulfillment; Billing/Fiscal; Promotion; Payment; Partner/Provider Integration; Commission/Fee; Settlement; Ledger; Reconciliation; Notification; Review; Support/Dispute; Reporting; Media; Audit.

## Critical backend invariants
1. Tenant and branch scoping on every read/write.
2. Server validates current price, availability, discounts, tax and service charge at checkout.
3. Historical order line snapshots are immutable.
4. Idempotency keys prevent duplicate order/payment submissions.
5. Order and order-item creation is transactional.
6. Cancellation versus kitchen-start is an atomic state transition.
7. Persisted orders reach kitchen through a transactional outbox or equivalent reliable delivery.
8. Staff task claims are atomic; preserve full assignment history.
9. Every LIVE-only customer call revalidates Visit state on the server.
10. Realtime reconnect must resync authoritative state; never assume socket delivery is guaranteed.

## Financial boundaries
- Menu Pricing defines list/sale price.
- Promotion Engine determines eligible discount and funding source.
- Billing/Fiscal Engine calculates total, tax and service charge.
- Payment Engine records funds received.
- Settlement Engine allocates obligations.
- Ledger and Reconciliation record and compare balances.
Do not assume PLUITS can custody or split funds. Use a compliant provider or record liabilities for controlled reconciliation. Rates and tax rules must be configurable and legally reviewed, not hardcoded.

## Security and privacy
RBAC and tenant isolation; secure provider credentials; least privilege; audit sensitive actions; protect customer address/payment data; minimize group-visit data exposure; explicit consent for social sharing; no automatic publication of order ID, amount, table, address or payment details.

## Required technical specifications before coding
Route map; component inventory; API contracts; entity/relationship model; state machines; authorization matrix; event/realtime contracts; error and retry policy; migration/rollback plan; logging/monitoring; test strategy; backup/recovery expectations.
