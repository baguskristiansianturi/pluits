# PROFILE-CONTENT-TABS-AND-FEATURED-SHOP-001

Status: APPROVED — conditional business tabs; featured product/service selection and public destination routing remain pending.
Owner: Product Owner / Social Media Product Design.
Consumers: authenticated profile and future public profile view.

## Tab order and presentation
1. Feed — 3×3 grid icon only, accessible name “Feed”.
2. Reels — consistent film/video icon and visible label.
3. Trips — map icon and visible label.
4. Blog — document icon and visible label.
5. Toko — shown only when the profile owner has at least one active, verified store.
6. Layanan — shown only when the profile owner has at least one active, public professional profile.

Toko and Layanan are separate conditional tabs. Never show a combined “Toko / Layanan” label. Live is removed.

## Visibility data source
- Store presence is read from `public.stores` for the authenticated owner, filtered to `store_status = active` and `verification_status = verified`.
- Service presence is read from `public.professional_profiles` for the authenticated owner, filtered to `profile_status = active` and `visibility = public`.
- Service portfolio cards may read only published `professional_portfolio_items` belonging to those profiles.
- If either query fails, do not infer presence from editable user metadata; omit that business tab and retain the four core tabs.

## Visual system
- All tab icons use the shared inline SVG icon registry and consistent 1.8px stroke style.
- Inactive icons/text use the design-system muted color.
- Active icons/text and active indicator use the PLUITS brand token `--pl-color-brand`; no hard-coded black or one-off icon colors.
- Feed remains icon-only. Other tabs keep their labels.
- Every tab occupies an equal-width flex slot, using the existing `--pl-space-16` (64px) minimum basis so the center-to-center spacing remains consistent when optional Toko/Layanan tabs appear; overflow scrolls horizontally on narrow screens rather than compressing individual tabs unevenly.
- The icon-to-label gap is shared by every labelled tab and consumes the existing `--pl-space-2` (8px) token. Feed remains icon-only and is centered in the same slot width.
- Tab icons use one consistent 19px rendered size across viewport widths; the Feed glyph follows the same size to avoid a separate spacing rhythm.
- Horizontal carousel behavior is reserved for genuinely long lists (more than three cards); do not force carousel presentation for one or two items.

## Store/service content and routing
- One Toko tab represents all active, verified stores owned by the account; multiple stores are listed inside the panel rather than creating duplicate tabs.
- One Layanan tab represents the owner's active, public professional profiles; multiple service profiles are listed inside the panel rather than creating duplicate tabs.
- Store panel must ultimately show only owner-selected featured products, never the complete catalogue. Selecting a featured item should open the owner's canonical storefront homepage.
- Service panel must show only owner-selected featured services/portfolio items. Selecting an item should open its public service destination.
- Current schema does not yet provide a product-level featured-selection field, and current app router does not yet implement the documented `#/shop/{username}` storefront route. Do not fake either capability or display arbitrary catalogue products as featured.
- Until the featured selection and public destination contracts are implemented, show a truthful empty state rather than fabricated featured items or broken links.

## Runtime mapping
- Optional business tabs are inserted only after the authenticated-owner presence queries succeed and return at least one eligible record. Do not use editable `user_metadata` as an ownership signal.
- Query failures fail closed: the four core content tabs remain visible and optional business tabs are omitted.
- Query cancellation is tied to profile-page teardown.
- `src/features/social/social-pages.js`: conditional presence lookup and tab/panel rendering.
- `src/features/social/social-pages.css`: responsive tab styling and conditional showcase panels.
- `src/design-system/icons.js`: shared grid, film, map, document, storefront and briefcase icons.
