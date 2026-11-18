# Social Home — Product Specification

- **ID:** PAGE-SOCIAL-HOME-001
- **Status:** Under Review / implementation prototype
- **Purpose:** Primary social-media landing page for an authenticated PLUITS user.
- **Decision:** Reuse the former Global Home composition as the signed-in user's single Beranda. Do not maintain Global Home and Circle Home as competing primary home destinations.
- **Business separation:** Business-center capabilities remain a distinct product area. They must not be merged into the social feed merely because the former Global Home layout is reused.

## Navigation contract
- Beranda → `#/home` (active on the social home).
- Jelajah → `#/discover` (nationwide discovery).
- Center plus → `#/dashboard` (Ruang Kerja / management hub).
- Pesan → existing authenticated management route until a dedicated inbox route is implemented.
- Profil → existing authenticated management route until a dedicated public profile route is implemented.

## Authentication and legacy routes
- Successful login routes to `#/home`.
- Authenticated visits to login, registration, and forgot-password routes resolve to `#/home`.
- Legacy `#/circle` resolves to `#/home`; the old Circle implementation is retained but is no longer a separate primary destination.
- Guests may still see the existing home surface; access to `#/dashboard` remains protected.

## Content and data integrity
- Retain the existing public/published Feed and Reels data query and signed-media behavior.
- Keep visual fixtures clearly marked as demo-only; do not seed them into Supabase.
- Stories, Live, Blog, products, nearby, and recommendation rails remain prototype surfaces until their services are connected.

## Implementation mapping
- Routing/auth redirect: `src/app/create-app.js`, `src/app/routes.js`.
- Social home and bottom navigation: `src/features/home/home-page.js`, `src/features/home/home-page.css`.
- Ruang Kerja: `src/features/dashboard/dashboard-page.js` (existing management shell).
- Architecture index: `src/CHANGE-MAP.md`.

## Dependencies and impact
- Affects login redirect, authenticated route resolution, the legacy Circle route, and Social Home bottom navigation.
- Does not change database schema, RLS, storage policies, auth provider, design tokens, or unrelated business modules.
- Pesan and Profil are not yet separate route implementations; this limitation is explicit and must be resolved in follow-up work.

## Validation
- Verify successful login lands at `#/home`.
- Verify authenticated login/register/forgot routes resolve to `#/home`.
- Verify legacy `#/circle` resolves to `#/home`.
- Verify center plus opens authenticated `#/dashboard` and guests are redirected to login.
- Verify public Feed/Reels still use real published rows and no fixtures are written to Supabase.
- Verify mobile bottom navigation, safe area, desktop/tablet/mobile layouts, and no horizontal page overflow.
