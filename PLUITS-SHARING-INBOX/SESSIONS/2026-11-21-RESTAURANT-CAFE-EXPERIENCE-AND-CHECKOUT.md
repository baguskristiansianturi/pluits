# 2026-11-21 — Restaurant & Café: Dining Areas, Ordering, Table Check-in, Reviews

Status: **SORTED — approved scope captured below by explicit product-owner instruction on 21 November 2026.**
Related work: Restaurant & Café design discussions on 16–20 November 2026; existing Hangout & Leisure provider page and menu-ordering preview.

## Approved product decisions

1. Restaurant & Café public profile must present the physical venue experience, not only a menu. Add a configurable Dining Areas & Experiences section. A merchant may enable only the areas it actually has, such as air-conditioned indoor room, garden dining, outdoor/patio, beachfront/front-row seating, private dining, or special occasion/honeymoon setup. Each enabled area can have its own images, description, capacity, booking/availability rules, price or minimum-spend disclosure, and custom-request notes. Do not force every restaurant to show every area.
2. Simple facilities such as parking can remain concise text/icon facts; they do not need image-led cards.
3. Keep the public provider homepage and the restaurant's operational workspace distinct. The public page renders the areas and services configured by the merchant; the merchant configuration interface and backend persistence are later work.
4. Menu discovery cards remain photo-led and do not carry a sticky price/checkout bar. Price and purchase controls appear only after the customer opens a menu item detail panel.
5. Cart can contain multiple dishes and drinks. A transaction/review may refer to the complete purchased-item list, not only one selected dish. A customer may optionally spotlight one or more menu items in a public review/story.
6. Before checkout, ask whether the customer is physically at the restaurant:
   - **Yes, I'm here** → request table number, then validate the table and connect the order to the existing active dine-in visit/session.
   - **No, order online** → continue through the separate online-order fulfillment flow supported by that restaurant.
   The table number alone is not proof of check-in. Never create a live session or mark a visit verified from an unvalidated text entry.
7. Dine-in order flow must reuse the agreed Restaurant & Café session lifecycle: verified check-in/table binding → LIVE visit session → orders and additional order rounds tied to that session → customer call/request controls only while LIVE → payment completion closes the session. No parallel cart-only dine-in state.
8. Reviews are linked to PLUITS accounts and transaction/visit evidence. Verification is distinct from publication permission. Full order details appear publicly only when the customer explicitly shares them. Reviewer links respect profile privacy; private accounts expose only permitted profile header/summary, and chat is shown only when enabled.
9. Review/menu performance must distinguish:
   - **Most Ordered**: system-derived quantity/order/buyer signals over a defined time window.
   - **Customer Favorite**: satisfaction/repeat/recommendation signals when reliable data exists.
   - **Restaurant Signature / Recommended**: explicitly designated by the merchant.
   Never collapse these into one unsupported Best Seller claim. Public labels must communicate their source.
10. Frontend preview data must be clearly identified as sample/demo. It must not fabricate real transactions, reviews, verified visits, best-seller statistics, or successful table validation.

## Implementation scope approved now

- Extend the existing public restaurant page with configurable visual Dining Areas & Experiences and text-based facilities.
- Improve menu checkout frontend to present the dine-in vs online choice and table-number step before any dine-in session handoff.
- Show the complete set of items in review/order presentation with optional highlighted menu item(s).
- Replace ambiguous Best Seller sample labeling with explicit source-aware label variants.
- Keep the existing shared page shell, route, design tokens, and scoped feature styles.
- Do not change Supabase schema, RLS, Auth, production data, payments, or claim backend/session integration. The current repository has no confirmed Restaurant & Café table/session/order backend contract; frontend handoff remains a clearly marked integration boundary until audited and approved.

## Protected decisions and boundaries

- Hangout & Leisure remains the everyday-business discovery experience; Destinations and GeoDirectory remain separate.
- Marketplace remains the customer-facing discovery/transaction layer; Restaurant & Café owns restaurant operations.
- Do not change unrelated routes, Social, Inbox, Marketplace, global tokens, or shared components.
- Existing dine-in LIVE-session call-control rule remains in force: call controls only during an active, verified LIVE visit session; unavailable before check-in and after session closure/final payment.
