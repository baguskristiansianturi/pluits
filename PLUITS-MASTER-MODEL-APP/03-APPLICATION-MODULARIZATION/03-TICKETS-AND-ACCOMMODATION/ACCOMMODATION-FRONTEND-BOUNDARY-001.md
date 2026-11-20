# Accommodation Frontend Boundary — AM-ACCOM-001

- **Status:** IN-DESIGN — initial homepage prototype
- **Runtime owner:** `src/features/accommodation/`
- **Route:** `#/accommodation`
- **Shared dependencies:** app route registry, shared page shell, existing icon registry, existing CSS tokens, public footer renderer
- **Backend:** none in this increment

## Ownership

Accommodation owns its customer-facing discovery homepage and future property discovery/detail flows. It does not own Marketplace's shared aggregation layer, Restaurant & Café merchant operations, shared account identity, or cross-ecosystem Push delivery.

## Initial frontend files

- `src/features/accommodation/accommodation-home-page.js` — page composition, sample discovery fixtures, local filter state, search and card interactions.
- `src/features/accommodation/accommodation-home-page.css` — styles scoped under `.ac-page`.
- `src/app/create-app.js` — route-to-feature mount only.
- `src/config/paths.js` — public route key/path.
- `src/main.js` — feature stylesheet import.
- `tests/routes.test.js` — route contract regression.
- `src/CHANGE-MAP.md` — ownership and route mapping.

## Boundaries

- Do not import or modify Restaurant & Café or Store internals.
- Do not change shared tokens, page shell, icon registry, auth, global styles, Supabase configuration, migrations, RLS, or production data for the initial page.
- Use existing shared renderers and registered icons.
- Keep all page CSS scoped to `.ac-page`.
- Sample properties are frontend-only preview fixtures, not real provider records, verified businesses, availability, rates, or reviews.
- Push is a future shared platform capability; the Accommodation page must not implement a vertical-owned ad engine or fixed paid slot.

## State and data

The initial prototype uses local in-memory state and deterministic sample filtering only. Search inputs do not make network requests or create backend records. No provider identity, booking inventory, availability, or transaction is represented as live data.

## Validation

- Run `npm test` and `npm run build`.
- Verify `#/accommodation` and route fallback behavior.
- Verify search, destination, dates, guests, type, budget, reset, saved state, and no-results state.
- Verify mobile, tablet, desktop, no horizontal overflow, and image loading behavior.
- Regress existing homepage, Marketplace, Hangout & Leisure, auth, and authenticated social routes.
- Record preview deployment and founder UAT separately; a successful build is not acceptance.
