# Global Home Feature

Owner: `features/home` · Canonical page: `PAGE-GLOBAL-HOME` · Layout: `LAY-GLOBAL-HOME-001`

## Purpose
Own one public-facing PLUITS platform homepage. It introduces the ecosystem to visitors and remains the same homepage after login. It is not a personal profile or authenticated Dashboard.

## Runtime ownership
- `home-page.js`: single `mountHomePage({ root, user, onSignOut })` entry point and one landing-page composition.
- `home-page.css`: feature-scoped styles for that same composition.
- `src/app/create-app.js`: supplies the active session so the header actions and calls to action can reflect login state.
- Shared header, footer, brand, shell, tokens and geometry: `src/design-system/`.

## Session behavior
- Guest at `#/home`: platform landing page with login and registration actions.
- Authenticated at `#/home`: the exact same hero, platform introduction, ecosystem overview, identity section, Android information and closing CTA. Only account controls and action wording change (account identity and sign-out replace login/register).
- Session state must never replace the landing page with a personal welcome panel, profile summary, feed, dashboard cards, or account workspace.
- The PLUITS logo always links to `#/home`, regardless of session.
- The signed-in account avatar and name link to the protected User Dashboard at `#/dashboard`.
- User Dashboard is the single post-login control center at `src/features/dashboard/`; it is not rendered inside Global Home.
- Workspace is an internal development term only; it is not a separate protected route or user-facing page.

## Content truthfulness
Do not fabricate posts, people, activity, notifications, recommendations, metrics, products, reviews, transactions, or provider records. Ecosystem and Android information must reflect actual release state.

## Shared resources
- Official symbol: `public/assets/brand/pluits-logo.svg`.
- Shared shell: `LAY-SHARED-PAGE-SHELL-001`.
- Existing tokens: `src/design-system/tokens.css`.
- No new global token, font, icon, image, external package or runtime dependency.

## Responsive behavior
The same landing page consumes the shared page shell, page gutters and canonical 50px navbar-to-content gap on desktop, tablet and mobile. Session controls use scoped styles and do not alter shared shell geometry or other pages.

## Validation
Run `npm test` and `npm run build`. Verify guest and authenticated sessions show the same landing sections on `#/home`, while header actions change appropriately. Verify login, logout, brand navigation and mobile/desktop layouts. Device visual UAT remains a separate step.
