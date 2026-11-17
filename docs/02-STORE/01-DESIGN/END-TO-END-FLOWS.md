# End-to-End Business & User Flows

Status: **AUDIT BASELINE — unresolved policies remain OPEN**.

## FLOW-01: Seller application and physical-store verification
1. User registers/signs in to PLUITS.
2. User selects seller application; this does not grant selling privileges.
3. Applicant submits owner identity, business details, store category, physical address, contact, operating hours and required evidence.
4. System validates required fields, file types and duplicate/risk signals.
5. Application enters SUBMITTED / UNDER_REVIEW.
6. Verifier checks evidence and may request more information, approve or reject with reason.
7. Applicant can respond to NEEDS_INFORMATION; changes are versioned.
8. Approval activates seller workspace, but public store/product visibility still depends on profile completion and product publication.
9. Material changes (owner, address, business type) trigger re-verification.
10. Suspension blocks new sales/listing visibility according to policy while preserving order and financial records.

Failure/edge cases: duplicate applications, unverifiable address, inconsistent identity, abandoned application, expired documents, ownership transfer, temporary closure, branch addition, appeal after rejection.

## FLOW-02: Store and branch setup
1. Approved owner completes public store profile and policies.
2. Owner registers physical branch details and operating schedule.
3. PLUITS validates branch under merchant scope.
4. Owner assigns manager/staff with least-privilege roles.
5. Branch defines fulfillment methods/capacity, service area and pickup instructions.
6. Store becomes discoverable only when activation requirements are met.

## FLOW-03: Product creation and publication
1. Staff with catalog permission selects category and product type.
2. Category supplies suggested/required attributes and validation.
3. Staff enters product identity, brand, description, media and condition.
4. Staff configures variant dimensions (e.g. color and size) and allowed combinations.
5. System creates or validates variant-level SKU/barcode, price and sellable stock location.
6. Staff configures package weight/dimensions and fulfillment constraints.
7. Preview validates required data, policy and image quality.
8. Product is saved as DRAFT, submitted for moderation if required, then PUBLISHED/REJECTED.
9. Updates to category, price, variant or media are versioned/audited; sensitive edits may trigger re-review.
10. Unpublish/archive does not delete order history.

Edge cases: duplicate SKU, duplicate barcode, variant explosion, unsupported combination, missing required attributes, prohibited product, missing image, price outlier, product out of stock, product with batch/serial tracking, discontinued variant.

## FLOW-04: Browse, search and discovery
1. Homepage API returns eligible campaigns, categories and shelves.
2. Product eligibility checks store status, product publication, policy, price validity and sellable availability.
3. Search indexes public product/store fields, not private seller data.
4. Category filters are generated from category attribute definitions.
5. Ranking considers the relevant shelf objective, freshness, quality and anti-abuse signals.
6. Guest receives general/local discovery; signed-in customer may receive consent-aware personalization.
7. User opens product detail and selects a valid variant/branch/fulfillment option.
8. If location is unavailable, show clear location prompt or general results without claiming nearby availability.

## FLOW-05: Cart and multi-seller checkout
1. Customer adds a specific variant and quantity; server validates eligibility.
2. Cart groups lines by seller/store and fulfillment constraints.
3. At checkout, server revalidates price, promotion, stock, seller status, address and fulfillment eligibility.
4. Cart may be split into seller orders and, where necessary, branch/fulfillment suborders under one customer checkout reference.
5. Shipping/pickup choices and quotes are calculated per eligible group.
6. Customer sees item subtotal, discounts, shipping, taxes, fees and grand total with transparent payer/rule breakdown.
7. Inventory is reserved atomically for a bounded period; reservation expiry releases stock.
8. Customer confirms and payment is initiated using an idempotency key.
9. Payment provider result is verified server-to-server; browser redirect alone is not proof of payment.
10. Successful payment confirms order(s); failed/expired payment releases reservation safely.

OPEN: whether one payment can cover multiple seller orders and how provider settlement/split payout will work. Do not promise a single checkout until provider capability is verified.

## FLOW-06: Seller order processing and fulfillment
1. Paid/authorized order appears in seller queue according to payment policy.
2. Seller accepts or rejects only within permitted policy and time window.
3. Staff picks exact variant and quantity; substitution requires explicit customer consent.
4. Staff checks condition, packs and records handover.
5. Pickup: customer receives readiness notice and secure pickup verification.
6. Delivery: carrier/driver assignment, tracking events and proof of delivery are recorded.
7. Exceptions (unavailable item, late dispatch, failed delivery, customer unreachable) create actionable states and notifications.
8. Order completes only after defined fulfillment completion conditions.

## FLOW-07: Physical POS sale and shared inventory
1. Cashier selects/scans variant and branch.
2. Server checks branch stock and current price/discount policy.
3. POS creates an idempotent sale and decrements/allocates the same inventory pool used by online orders.
4. Receipt and stock movement are recorded with cashier, terminal and branch attribution.
5. Offline mode, if later supported, must use explicit limits and conflict reconciliation; do not silently oversell.
6. POS return/refund restores stock only after inspection and policy decision.

## FLOW-08: Cancellation, return, refund and dispute
- Cancellation eligibility depends on order/payment/fulfillment state and seller/customer/platform policy.
- A cancellation racing with picking/dispatch must be resolved atomically.
- Return request records item/quantity, reason, evidence and deadlines.
- Return receipt and inspection are separate from refund approval.
- Refund amount is calculated from original transaction snapshots and policy; partial refunds are supported only with ledger consistency.
- Disputes preserve messages, evidence, state history and actor attribution.
- Product/order snapshots remain immutable even if catalog data changes.

## FLOW-09: Review and reputation
- Reviews are limited to verified eligible purchases and completed/eligible order lines.
- Define one-review/edit window and moderation policy.
- Store rating and product rating remain distinct.
- Incentivized reviews must be disclosed and cannot be required to receive a benefit.
- Fraudulent, abusive or conflicted reviews can be reported and moderated with audit trail.

## FLOW-10: Settlement and finance
1. Capture provider payment and webhook events idempotently.
2. Record gross amount, discount funding, taxes, delivery charges, platform fees, provider fees, refunds and seller payable separately.
3. Reconcile provider statement, internal ledger and seller payout.
4. Settlement states include pending, eligible, processing, paid, failed, held and adjusted.
5. Holds/reserves and negative balances require explicit policy and audit.
6. No payout/custody capability is assumed before provider, legal and country review.

## FLOW-11: Customer support and notifications
- Notify customer and seller on meaningful state changes, not every internal event.
- Support case links to customer, seller, order and affected order lines with scoped access.
- Escalation, response SLA, resolution reason and appeal are recorded.
- Notification delivery failures must be retryable and visible without duplicating orders or payments.

## FLOW-12: Store lifecycle and policy enforcement
- Active → paused by owner (existing orders handled) or suspended by PLUITS (risk/policy response).
- Closed store retains legally/operationally required records.
- Reopening may require verification.
- Product listing and order acceptance follow store, branch and category eligibility.
