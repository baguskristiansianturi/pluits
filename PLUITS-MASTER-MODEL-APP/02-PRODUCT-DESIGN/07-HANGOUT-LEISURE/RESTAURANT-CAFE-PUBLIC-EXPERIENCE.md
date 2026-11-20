# Restaurant & Café — Public Experience and Customer Ordering

**Document ID:** PD-RC-001  
**Status:** APPROVED — product-owner direction, 21 November 2026  
**Owner:** Hangout & Leisure / Restaurant & Café public experience  
**Runtime mapping:** `src/features/venue/venue-provider-page.js`, `venue-provider-page.css`, `restaurant-ordering.js`, `restaurant-ordering.css`

## 1. Purpose and boundaries

The public restaurant page is the merchant's shareable presence inside PLUITS Hangout & Leisure. It is not the restaurant operator dashboard and is not a product-detail page. It introduces the venue, its atmosphere and areas, food and drink menu, guest experiences, reviews, gallery, and visit information.

Restaurant & Café is an operational merchant module. Marketplace may surface restaurants, menus, and orders, but must not own the restaurant's internal table/session, menu operations, kitchen, or staff workflows.

## 2. Public page structure

1. PLUITS shared page header and Hangout & Leisure return link.
2. Restaurant navigation.
3. Hero / restaurant identity.
4. Introduction, rating summary, location and operating facts.
5. **Dining Areas & Experiences** — visual, image-led cards for areas enabled by the merchant.
6. **Food Menu & Ordering** — menu categories and photo-first menu cards.
7. **Guest Reviews** — account-linked review stories and order context.
8. Gallery.
9. Visit information and contact/reservation entry points.
10. Shared public footer.

The current accepted public-page visual direction remains the baseline. New sections must be composed within it, not redesign the whole page.

## 3. Dining Areas & Experiences

Each restaurant configures its own set of enabled areas/experiences. Example types include Indoor / Air-conditioned Room, Garden Dining, Outdoor / Patio, Beachfront / Front-row Seating, Private Dining, and Special Occasion / Honeymoon Setup.

Each area may carry:
- Display name and type.
- One or more photographs and a cover image.
- Description / atmosphere.
- Capacity and seating notes.
- Availability or reservation requirement.
- Additional charge, minimum spend, or custom request terms when applicable.
- Optional booking/request action.

Only configured areas are rendered. Restaurants are not required to offer every type. Basic facts such as parking can remain a concise text/amenity list rather than an image card.

Merchant setup/persistence is a later operational interface/backend scope. This public UI consumes a provider configuration model; demo content must be marked as preview data.

## 4. Food Menu & Ordering

Menu catalog cards are photo-led and do not display a fixed/sticky price bar or purchase CTA. The customer opens a menu item to see full image, description, price, variants, add-ons, notes, quantity, and add-to-cart action.

A cart supports multiple dishes and beverages and remains merchant-separated. Each line item retains selected variant, add-ons, notes, quantity, and price snapshot.

### Checkout routing

Before checkout, ask: **“Apakah Anda sedang berada di restoran ini?”**

- **Ya, saya di sini**: ask for table number; pass the submitted table identifier to the Restaurant & Café table-validation/session resolver. Text entry is not proof of presence and must not create a verified visit on its own.
- **Tidak, pesan online**: route to the restaurant's available online fulfillment options (for example pickup or delivery, depending on merchant configuration).

After successful backend validation, dine-in order creation must resolve/create the current active visit session and bind the order to the verified table/session. This public frontend must not invent or locally mark a LIVE session.

## 5. Existing Restaurant & Café operational lifecycle

The customer journey must align with the operational module, not create a second session model:

- Verified arrival / table check-in binds the customer to the restaurant and table.
- A verified visit session enters **LIVE**.
- Dine-in orders and later additions are attached to that same visit session (with separate order rounds if required by the operational model).
- Customer call-waiter / service-request controls are enabled only while the verified visit remains LIVE.
- Payment settlement and visit closure end the LIVE session and disable in-visit controls.
- After closure, the customer may review, view history, and share an experience subject to consent.

Backend validation, transaction atomicity, table occupancy, staff/KDS routing, and payment settlement remain authoritative; frontend state is never authorization.

## 6. Reviews, identity and social sharing

- Reviews belong to PLUITS accounts and reference transaction/visit evidence when verified.
- Verification status and public-sharing consent are separate properties.
- A review may display the full order item list when the author explicitly chooses to share it. The author may spotlight one or more items, but a spotlight does not replace the complete order record.
- Each item reference links to its menu context and the source restaurant.
- Public reviewer links respect account privacy. Private profiles expose only permitted header/summary data; private feed content stays hidden. Chat affordances appear only when the account allows them.
- Review/story synchronization and visit/trip history are explicit user-controlled sharing actions. A transaction is never automatically made public.

## 7. Menu labels and analytics

Do not use an unqualified generic “Best Seller” label.

- **Most Ordered** — system-calculated from valid order records; define time window and distinguish orders containing an item from units sold and unique buyers.
- **Customer Favorite** — only when sufficient trustworthy signals exist (satisfaction, repeat orders, recommendations).
- **Restaurant Signature / Recommended** — merchant-designated, clearly identified as the restaurant's choice.

Analytics should exclude cancelled/refunded orders where appropriate and distinguish units, order count, unique buyers, repeat purchase, ratings, revenue and time period. Merchant curation and system ranking remain separate signals.

## 8. Preview and implementation states

Current frontend is a visual/interaction preview. Sample providers, menu entries, reviews, prices, profile links, and badges are not real merchant or transaction records. Table-number entry does not verify a table. No real order, payment, reservation, review, session, or backend synchronization is claimed.

## 9. Acceptance criteria

- Existing accepted page shell and overall composition remain intact.
- Areas render from provider configuration; disabled/unavailable areas do not appear.
- Parking/basic amenities render as concise facts.
- Menu cards have no sticky price/checkout bar; item detail contains price and order controls.
- Checkout offers dine-in vs online, then table-number entry for dine-in.
- No frontend-only table number can mark a visit verified or LIVE.
- Multiple order items can be represented together in review context, with optional highlights.
- Review verification, public consent and profile privacy are distinct.
- Menu labels distinguish system metrics from merchant designation.
- Responsive layout remains usable on mobile and desktop; scoped CSS only.
- No Supabase schema, RLS, auth, production data, or unrelated modules are changed.
