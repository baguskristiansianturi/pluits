# Global Home Feature

Owner: `features/home` · Pages: `PAGE-GLOBAL-HOME-PUBLIC`, `PAGE-GLOBAL-HOME-AUTHENTICATED` · Layout: `LAY-GLOBAL-HOME-001`

## Purpose
Own one Global Home route, one page entry point, and one feature stylesheet. The active Supabase session selects which homepage content is rendered; there are not two independent homepage implementations.

## Runtime ownership
- `home-page.js`: single `mountHomePage({ root, user, onSignOut })` entry point; public and authenticated content states.
- `home-page.css`: all feature-scoped styles for both states.
- `src/app/create-app.js`: supplies the current session user to the same renderer.
- Shared header, footer, brand, shell, tokens and geometry: `src/design-system/`.

## Session behavior
- Guest at `#/home`: public introduction, ecosystem preview, identity explanation, Android availability and registration/login actions.
- Authenticated at `#/home`: personalized account welcome, ecosystem overview and account identity summary.
- Shared PLUITS brand always links to `#/home`; session state determines the displayed homepage.
- Successful login and sign-out update the same route through the existing Auth state listener.
- Internal Workspace remains separate and unchanged.

## Content truthfulness
Do not fabricate posts, people, activity, notifications, recommendations, metrics, products, reviews, transactions or provider records. Authenticated content uses only the active session's display name/email until real product data sources are released.

## Shared resources
- Official symbol: `public/assets/brand/pluits-logo.svg`.
- Shared shell: `LAY-SHARED-PAGE-SHELL-001`.
- Existing tokens: `src/design-system/tokens.css`.
- No new global token, font, icon, image, external package or runtime dependency.

## Responsive behavior
Both states consume the same page shell, page gutters and canonical 50px navbar-to-content gap. State-specific sections use scoped styles in the same `home-page.css`; they do not alter shared shell geometry or styles on other pages.

## Validation
Run `npm test` and `npm run build`. Verify guest and authenticated sessions on the same `#/home` route, login, logout, brand navigation and mobile/desktop layouts. Device visual UAT remains a separate step.
