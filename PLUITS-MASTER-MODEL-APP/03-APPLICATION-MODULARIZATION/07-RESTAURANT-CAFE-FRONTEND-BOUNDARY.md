# Restaurant & Café — Frontend Ownership and Integration Boundary

**Document ID:** AM-RC-001  
**Status:** APPROVED WORKING SCOPE — 21 November 2026  
**Runtime status:** partial public frontend preview; operational backend contract not yet implemented/verified.

## Ownership

- Public Hangout & Leisure restaurant page: `src/features/venue/venue-provider-page.js` and `venue-provider-page.css`.
- Restaurant menu and customer ordering interaction: `src/features/venue/restaurant-ordering.js` and `restaurant-ordering.css`.
- Route registration remains in the existing app router; no route change is required for this increment.
- Tests: `tests/routes.test.js` plus focused restaurant ordering tests as added.
- Shared header/footer and global design tokens are consumers, not owned by this feature; do not change them for this work.

## Data responsibilities (future backend contract)

Restaurant & Café will own restaurant identity/configuration, branches/areas, tables, menu/catalog, variants/modifiers, availability, reservations, dine-in visit sessions, order rounds, kitchen routing, waiter/service calls, bill/payment lifecycle, customer feedback and restaurant analytics.

Identity & Accounts owns PLUITS account identity/privacy. Social owns posts/stories/follows and social publication. GeoDirectory owns canonical location/entity records. Marketplace owns public discovery/transaction coordination. Integrations must use explicit service/API/event contracts; do not directly read or mutate another module's internal tables.

## Dine-in integration boundary

The frontend submits restaurant/branch identity and table number to an authoritative table/session resolver. The backend must validate that the table belongs to the selected branch, is eligible for guest check-in, and is not bound to an incompatible active session. Successful resolution returns the canonical visit-session identifier and LIVE state. Orders and additional order rounds bind to that identifier. A text field, GPS, or frontend flag is not sufficient proof.

Call-waiter and other in-visit actions must be authorized against the active LIVE session. Payment completion/session closure invalidates those controls. No database schema/RPC is inferred or created in this frontend-only task.

## Multi-item order/review contract

An order stores item lines with menu item identity, name/price snapshots, selected variant, add-ons, quantity, notes and fulfillment/session references. A review can reference the order and one or more menu items. Public sharing of item details is a separate consent choice; verified purchase/visit evidence does not grant public disclosure permission.

## Analytics source separation

System-derived Most Ordered, Customer Favorite and merchant-designated Signature/Recommended are separate fields/signals. Analytics must use eligible transaction states and explicit time windows. Do not infer sales performance from hardcoded menu tags or demo records.

## Change safety

This increment is feature-local. Do not edit Supabase migrations, RLS, Auth, global CSS/tokens, Marketplace, Social, Inbox or other routes. Verify route ownership, tests, build, branch workflow and preview deployment independently.
