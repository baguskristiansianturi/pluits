# Product Scope, Business Model & Roles

Status: **AUDIT BASELINE — decisions requiring owner confirmation are marked OPEN**.

## 1. Product definition
PLUITS Store is a multi-seller marketplace module within PLUITS. Buyers discover products across approved physical stores. Each approved merchant receives an independent store-management workspace. PLUITS controls merchant eligibility, marketplace rules, moderation, discovery placement and dispute oversight.

The marketplace is intended to support local discovery first while allowing multi-country operation when country-specific legal, payment, tax, currency, address and fulfillment requirements are supported.

## 2. Physical-store eligibility
- A seller must operate a real, verifiable physical store or business premises.
- Seller account registration is separate from seller approval and store activation.
- Submission should capture owner identity, business identity where applicable, store name, category, physical address, contact details, operating hours and evidence required by the verification policy.
- Verification may include document review, storefront/interior evidence, location checks and manual inspection where needed.
- Store states: DRAFT → SUBMITTED → UNDER_REVIEW → NEEDS_INFORMATION / APPROVED / REJECTED. An approved store can later become ACTIVE, PAUSED, SUSPENDED or CLOSED.
- Only approved and active stores, and eligible published products, can appear in public discovery or accept marketplace orders.
- Re-verification and review triggers are required for ownership, address or material business changes.
- OPEN POLICY: whether a physical retailer that resells third-party branded goods is eligible, and what proof of sourcing/authorization is required for restricted brands or product classes. Do not assume all resellers are automatically prohibited.

## 3. Actors and responsibilities
| Actor | Scope |
|---|---|
| Visitor | Browse public marketplace and store/product pages |
| Customer | Manage addresses, cart, checkout, orders, reviews and support |
| Applicant | Submit store application and respond to verification requests |
| Store owner | Manage approved store, catalog, inventory, staff, orders and store settings |
| Store manager | Operate assigned store/branches within delegated permissions |
| Catalog staff | Create/edit product content; no financial or store-verification authority by default |
| Inventory staff | Receive, count, adjust and transfer stock within assigned locations |
| Fulfillment staff | Pick, pack, hand over and update delivery/pickup tasks |
| Cashier | Process in-person POS transactions and permitted refunds |
| PLUITS verifier | Review merchant evidence and store eligibility |
| PLUITS marketplace admin | Manage categories, moderation, marketplace policies and campaigns |
| PLUITS support/dispute operator | Handle complaints and disputes under scoped permissions |
| Finance operator | Review payments, fees, refunds and settlements; privileged actions audited |

## 4. Seller workspace lanes
The experience should be separated by responsibility, not forced into five standalone apps:
1. Customer marketplace.
2. Store owner/manager console.
3. Staff operations.
4. Inventory and fulfillment workbench (may be a staff-console area).
5. Cashier/POS (may be a dedicated responsive surface if operational needs justify it).

## 5. Store and branch model
- One merchant account may own one or more stores only if PLUITS policy allows it.
- A store may have one or more physical branches.
- Store identity, public profile and merchant verification are distinct from branch-specific address, opening hours, fulfillment capacity and stock.
- Products may be shared across branches, but sellable inventory and availability are location-scoped.
- OPEN: whether one seller account may operate multiple legally distinct businesses or brands.

## 6. Marketplace revenue and money boundaries
Potential commercial elements: seller commission, payment-provider fee, delivery fee, optional seller subscription and promotional placement. Each must be separately defined by contract, country, category and payer.
Do not claim PLUITS can hold, split or remit funds until provider capability, legal structure and reconciliation design are verified. Record provider references and ledger liabilities where appropriate.

## 7. Scope exclusions until separately approved
- No unrestricted account-to-seller self-activation.
- No assumption that every product category is legally permitted.
- No assumption of international shipping or cross-border settlement at launch.
- No full accounting/payroll/procurement suite by default.
- No public seller ratings or ranking without moderation and anti-manipulation rules.
