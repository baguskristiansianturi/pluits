# 05 — Icon Library

Owns the approved icon catalogue used throughout PLUITS.

## Register fields

Each icon entry should record:

- Canonical semantic name and intended meaning.
- Preview and approved visual variant.
- Source/library and exact source link.
- License or usage constraints.
- Stroke/fill characteristics and supported states.
- Approved size tokens and color behavior.
- Runtime component/name mapping.
- Status: Proposed, Under Review, Approved, Deprecated, or Retired.

## Mandatory selection process

1. Search this library before using an icon.
2. If it exists and is approved, use the exact registered icon and its standard sizing.
3. If it does not exist, do not import a substitute or choose a different icon independently.
4. Submit the use case and candidate source links/previews to the product owner.
5. Add the selected icon only after approval, then map it to the runtime library.

Icon meaning and visual shape require product-owner review. The developer must not make that visual decision on the user's behalf.

## Profile content tab icons — approved
- `grid` — 3×3 square grid, used for icon-only Feed tab.
- `play` — Reels; `mapPin` — Trips; `book` — Blog; `store` — combined Toko / Layanan tab.
- `grid` and `store` are local inline SVG entries in `src/design-system/icons.js`; profile tabs use `renderIcon()`.
- The product owner explicitly requested and approved the grid and storefront icon meanings. Keep accessible names on icon-led controls.

## Profile navigation icon refinements
- `grid`: icon-only Feed.
- `film`: Reels.
- `map`: Trips.
- `fileText`: Blog.
- `store`: Toko.
- `briefcase`: Layanan.
- All are inline SVGs with consistent outline treatment and inherit the PLUITS design token color from their parent control; active state is brand-token teal and inactive state is muted neutral.
