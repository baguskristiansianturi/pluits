# PROFILE-CONTENT-TABS-AND-FEATURED-SHOP-001

Status: APPROVED — UI contract; data integration remains pending.
Owner: Product Owner / Social Media Product Design.
Consumers: authenticated user profile and public profile view.

## Purpose
Provide clear profile destinations for each content type while allowing a profile owner to showcase a curated set of products or services without embedding the complete merchant catalogue in the social profile.

## Tab order and presentation
1. Feed — 3×3 grid icon only, accessible name “Feed”.
2. Reels — play icon and visible label.
3. Trips — map pin icon and visible label.
4. Blog — book icon and visible label.
5. Toko / Layanan — storefront icon and visible label.

Live is removed from the profile tab navigation.

## Behavior
- Exactly one tab is active at a time. Each tab controls its matching panel and exposes selected state accessibly.
- Toko / Layanan is a curated featured showcase. It must not list the full store catalogue.
- The owner chooses which products or services are featured.
- Selecting a featured product/service takes the visitor to the owner's store/service homepage. Full catalogue browsing happens there.
- If the owner has no featured items or no store/service destination, show an honest empty state. Never fabricate sample items or URLs.

## Data contract still required
A future implementation must identify the owner-to-store/service relationship, owner-selected featured item IDs, publication/availability state, item display fields, and canonical store/service homepage URL. Enforce public visibility and owner authorization server-side. Do not implement client-only trust for featured-item selection.

## Runtime mapping
- `src/features/social/social-pages.js` — tabs, panels, and accessible selection behavior.
- `src/features/social/social-pages.css` — responsive tab presentation.
- `src/design-system/icons.js` — shared grid and storefront icon assets.

## Validation
- Feed shows only the grid icon visually and remains accessible as Feed.
- Reels, Trips, Blog, and Toko / Layanan show icons and labels.
- Live is absent.
- Tab changes update panel visibility and aria-selected.
- Mobile tabs remain reachable without document-level horizontal overflow.
- Empty showcase state appears until verified featured-item data and homepage destination are connected.
