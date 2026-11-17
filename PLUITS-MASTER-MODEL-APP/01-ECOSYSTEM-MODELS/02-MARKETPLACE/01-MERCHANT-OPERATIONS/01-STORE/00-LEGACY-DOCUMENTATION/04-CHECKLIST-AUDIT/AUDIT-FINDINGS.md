# PLUITS Store — Design Audit Findings

Audit scope: discussion-derived business model, homepage/discovery, customer pages, seller workspace, product catalog/variants, inventory, checkout, fulfillment, POS, finance, admin and end-to-end journeys.

Status: **DESIGN BASELINE RECORDED — NOT FINAL APPROVAL; NO CODE AUDIT PERFORMED**.

## 1. Findings summary
| ID | Finding | Severity | Required action |
|---|---|---|---|
| AUD-001 | Physical-store verification is foundational but evidence, renewal, appeal and re-verification policy need detail | Critical | Define verification SOP and risk rules |
| AUD-002 | Reseller/sourcing eligibility remains unresolved | High | Owner policy decision |
| AUD-003 | Merchant, store and branch relationship needs final cardinality and legal ownership model | High | Confirm multi-store and multi-branch rules |
| AUD-004 | Category taxonomy and attribute governance needs admin workflow/versioning | High | Define category schema governance |
| AUD-005 | Variant/SKU and inventory requirements are complex and must be modeled before UI implementation | Critical | Approve catalog and inventory model |
| AUD-006 | Shared stock across POS and online orders needs concurrency, reservation and return rules | Critical | Specify inventory transaction contracts |
| AUD-007 | Multi-seller cart/payment/settlement cannot be promised before provider capability is verified | Critical | Select provider and legal settlement model |
| AUD-008 | Fulfillment and delivery responsibility is not fully decided | High | Define pickup, seller delivery, carrier and platform delivery models |
| AUD-009 | Refund, return, cancellation and dispute rules need country/category-specific policy | High | Define state machines and responsibility |
| AUD-010 | Trending/popularity/recommendation signals need anti-abuse and transparency rules | High | Define metric windows, eligibility and moderation |
| AUD-011 | Global ambition needs staged country activation rather than a single global assumption | High | Country capability matrix |
| AUD-012 | Route map and integration contract with existing PLUITS router are not approved | High | Inspect current application routing before final URLs |
| AUD-013 | Five operational lanes may be separate surfaces but need not be five standalone apps | Medium | Validate role workflows and device needs |
| AUD-014 | Seller staff permissions, branch scope and privileged finance actions need a complete RBAC matrix | High | Define permission matrix |
| AUD-015 | Product moderation, prohibited goods and recall/withdrawal workflows need explicit policy | High | Create category and enforcement policy |

## 2. Completeness checks
- [x] Multi-seller marketplace and physical-store eligibility baseline captured.
- [x] Customer, seller, staff, POS and PLUITS admin roles identified.
- [x] Homepage shelves and discovery principles recorded.
- [x] Customer and seller/admin page inventories drafted.
- [x] Seller verification, product publication, purchase, fulfillment, POS, return and settlement flows drafted.
- [x] Product types, typed attributes, variant matrix, SKU, inventory movements and immutable order snapshots recorded.
- [x] Initial technical boundaries and release gates retained.
- [ ] Detailed route contract reconciled with live PLUITS app.
- [ ] Full RBAC matrix approved.
- [ ] Category taxonomy and attribute dictionary approved.
- [ ] Country, tax, payment and fulfillment capability matrix completed.
- [ ] Provider contracts and commercial fee policy selected.
- [ ] All OPEN business decisions resolved.
- [ ] Wireframes, acceptance criteria and test cases completed.
- [ ] Implementation, security audit, regression test and deployment evidence produced.

## 3. Flow gaps to close before implementation
1. Seller identity/business verification: required documents by country, evidence expiry, duplicate/ownership changes, appeals and branch verification.
2. Product moderation: prohibited/restricted categories, brand authorization, counterfeit reports, recall and takedown.
3. Inventory: reservation timeout, backorders (if allowed), partial fulfillment, stock transfer, damaged goods and return inspection.
4. Checkout: mixed seller carts, partial payment failure, split shipment, shipping recalculation, address validation and abandoned checkout.
5. Order lifecycle: seller rejection, partial cancellation, partial shipment, failed pickup, lost/damaged delivery and customer unreachable.
6. Money: authorization/capture/refund timing, partial refunds, fee reversal, chargebacks, payout holds and reconciliation discrepancy.
7. POS: cash/card methods, shift close, void/return permissions, offline policy and duplicate terminal events.
8. Support: response deadlines, evidence retention, escalation, appeal and customer/seller access boundaries.
9. International: currency conversion display, settlement currency, language, tax, restricted items and customs responsibilities.
10. Operations: service outage, backup/recovery, event retries, webhook replay and manual recovery procedures.

## 4. Architecture invariants
- Backend authorization is authoritative; hiding a button is not access control.
- Tenant isolation applies to every seller-owned record, query and file.
- Store approval and product publication are independent eligibility gates.
- Checkout revalidates price, promotion, stock, seller and fulfillment.
- Inventory mutation is atomic, idempotent and attributable.
- Payment state comes from verified provider events, not client redirect.
- Order and receipt snapshots are immutable.
- Every privileged seller/admin/finance action is auditable.
- Search, ranking and homepage caches never authorize a sale.
- Existing PLUITS pages, URLs, navigation and global styles remain untouched during isolated development.

## 5. Release gates
No production integration until:
- business OPEN decisions required for launch are resolved;
- design and technical specifications are cross-linked by stable Feature IDs;
- automated and manual tests cover normal, boundary, concurrency, permission and failure cases;
- security, privacy, tenant isolation and file upload checks pass;
- payment, refund and settlement provider flows are verified;
- mobile usability and performance are validated;
- regression checks confirm existing PLUITS functionality is unchanged;
- user explicitly approves integration.

## 6. Audit conclusion
The discussion-derived design is broad enough to establish a coherent marketplace baseline, but it is **not yet a complete implementation-ready specification**. Critical open decisions remain around merchant eligibility, inventory concurrency, multi-seller payment/settlement, fulfillment, country support and permissions. This audit records those gaps rather than silently inventing policy.

No code, test, security audit, deployment or production integration is claimed.
