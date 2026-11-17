# Page Inventory & Navigation Blueprint

Status: **PROPOSED INFORMATION ARCHITECTURE; route strings are not approved**.

## A. Customer marketplace
| ID | Page / surface | Core responsibility |
|---|---|---|
| CUS-01 | Marketplace home | Campaigns, categories, discovery shelves and product feed |
| CUS-02 | All categories | Browse category hierarchy |
| CUS-03 | Category/subcategory listing | Category-specific products and filters |
| CUS-04 | Search results | Search, suggestions, filters, sort and empty states |
| CUS-05 | Product detail | Media, variants, price, availability, seller, delivery/pickup, reviews |
| CUS-06 | Store profile | Verified store identity, location, hours, policies and reputation |
| CUS-07 | Store catalog | Products from one store/branch |
| CUS-08 | Cart | Items grouped by seller/fulfillment group |
| CUS-09 | Checkout | Address, fulfillment, shipping quote, item validation and summary |
| CUS-10 | Payment handoff/status | Provider handoff and verified payment result |
| CUS-11 | Order confirmation | Order references and next steps |
| CUS-12 | Order list | Active and historical orders |
| CUS-13 | Order detail/tracking | Seller-specific status, delivery/pickup and receipt |
| CUS-14 | Wishlist | Saved products |
| CUS-15 | Reviews | Verified-purchase product/store feedback |
| CUS-16 | Returns/refunds | Return request, evidence and status |
| CUS-17 | Customer support/dispute | Help and complaint case |
| CUS-18 | Notifications | Order, payment, delivery and support updates |
| CUS-19 | Address book | Saved delivery addresses |
| CUS-20 | Marketplace policies/help | Buying, shipping, privacy, returns and terms |

## B. Seller and staff workspace
| ID | Page / surface | Core responsibility |
|---|---|---|
| SEL-01 | Seller application | Merchant and physical-store submission |
| SEL-02 | Verification status | Review state, missing evidence and decision history |
| SEL-03 | Seller dashboard | Sales, orders, alerts, stock and store health |
| SEL-04 | Store profile/settings | Public details, hours, policies and contact |
| SEL-05 | Branch management | Branch address, hours, staff and fulfillment |
| SEL-06 | Product list | Search, filter, bulk actions and publication state |
| SEL-07 | Product editor | Product identity, category, media and attributes |
| SEL-08 | Variant matrix | Options, combinations, SKU, barcode, price and stock assignment |
| SEL-09 | Inventory overview | Available, reserved, damaged and location stock |
| SEL-10 | Stock movements/counts | Receive, adjust, transfer, count and history |
| SEL-11 | Order inbox | New, accepted and exception orders |
| SEL-12 | Order processing | Confirm, pick, pack, handover and cancellation request |
| SEL-13 | Fulfillment board | Pickup, dispatch, carrier handover and delivery exceptions |
| SEL-14 | Promotions | Discounts, coupons and campaign participation |
| SEL-15 | Staff and roles | Invitations, branch scope and permissions |
| SEL-16 | POS/cashier | In-person sale, receipt, return and stock sync |
| SEL-17 | Finance/settlement | Gross sales, fees, refunds, payout and reconciliation |
| SEL-18 | Reports | Product, sales, inventory and staff activity |
| SEL-19 | Reviews/support | Respond to reviews and handle assigned cases |
| SEL-20 | Import/export | Product and inventory bulk operations |
| SEL-21 | Audit/activity log | Attributed changes and privileged actions |

## C. PLUITS operations/admin
| ID | Page / surface | Core responsibility |
|---|---|---|
| ADM-01 | Marketplace overview | Marketplace health and operational alerts |
| ADM-02 | Seller applications | Verification queue and decisions |
| ADM-03 | Seller/store detail | Evidence, ownership, branches and status history |
| ADM-04 | Category/attribute manager | Taxonomy, required attributes and filters |
| ADM-05 | Product moderation | Reports, prohibited items and listing decisions |
| ADM-06 | Campaign/banner manager | Homepage campaign and merchandising |
| ADM-07 | Discovery/ranking controls | Eligibility, placement policy and monitoring |
| ADM-08 | Orders/disputes | Escalated order and customer cases |
| ADM-09 | Payment/settlement oversight | Provider events, ledger and reconciliation |
| ADM-10 | Fees/commission policy | Versioned commercial rules |
| ADM-11 | Reviews/reports moderation | Abuse and policy enforcement |
| ADM-12 | Audit/security | Admin activity and access review |

## D. Homepage composition
1. Marketplace header: search, delivery location, account, wishlist and cart.
2. Category navigation and category discovery.
3. Main campaign/banner area.
4. Popular categories.
5. Trending products.
6. Best sellers.
7. Personalized recommendations (fallback to general discovery for guests).
8. Popular/nearby verified stores.
9. New arrivals.
10. Nearby products where location and stock are available.
11. Active offers.
12. Explore-more product feed.
13. Marketplace help/policy footer.

Homepage shelves are configurable and data-driven. Empty or low-confidence shelves should be hidden or replaced with useful content, not populated with fake metrics.

## E. Navigation rules
- One canonical URL per page responsibility; final paths must be reconciled with existing PLUITS routing before approval.
- Product and store links must preserve stable identifiers and support direct open/share.
- Filters, sort and pagination should be shareable where practical.
- Checkout/payment surfaces must not lose cart/order context on refresh or provider return.
- Customer, seller and admin navigation must be role-scoped.
- Do not alter existing PLUITS global navigation or unrelated routes as part of isolated Store work.
