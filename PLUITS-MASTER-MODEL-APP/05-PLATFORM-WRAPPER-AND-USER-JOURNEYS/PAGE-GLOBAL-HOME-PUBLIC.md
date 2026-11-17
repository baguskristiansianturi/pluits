# PAGE-GLOBAL-HOME-PUBLIC — Public Global Homepage

Status: IMPLEMENTED — provisional copy/layout; founder visual UAT pending.  
Page ID: `PAGE-GLOBAL-HOME-PUBLIC` · Layout: `LAY-GLOBAL-HOME-001` · Owner: Platform Wrapper & User Journeys  
Route: `#/home` and empty application hash for guests.

## Purpose and journey
Introduce PLUITS to a first-time visitor before registration. Visitors understand the platform proposition, explore the ecosystem direction, learn about one connected identity, see Android availability, then may open Login or Registration.

## Content architecture
1. Hero — platform proposition, concise explanation, registration/discovery actions and conceptual ecosystem composition.
2. Platform introduction — PLUITS is an ecosystem, not a single feature.
3. Ecosystem overview — Social & Community, Local Discovery, Marketplace and Everyday Services.
4. One identity — connected identity direction with role/permission boundaries.
5. Android availability — Google Play information area without an invented listing URL.
6. Closing CTA — invitation to learn about registration with current availability explained.

## Copy and truthfulness constraints
- Main message: “Terhubung dengan lebih banyak hal, di satu tempat.”
- Describe PLUITS as an ecosystem connecting people, communities, places, businesses and services.
- Ecosystem cards describe product direction and carry “Dikembangkan bertahap”; they must not imply live availability.
- No fabricated posts, names, testimonials, transaction counts, ratings, products, provider records or live activity.
- Registration CTAs route to the existing registration screen; signup remains disabled by the release gate.
- Google Play is “Coming soon”; no download URL until an official listing exists.
- Keep noindex during internal product testing.

## Shared visual and asset contracts
- Shared shell: `LAY-SHARED-PAGE-SHELL-001`.
- Page composition: `LAY-GLOBAL-HOME-001`.
- Canonical asset only: `public/assets/brand/pluits-logo.svg`.
- Consume existing tokens from `src/design-system/tokens.css`; no new global scales or tokens.
- No external font, icon package, stock image, illustration asset or runtime dependency.
- Feature styles are scoped under `.home-page` and `.home-*`.

## Responsive contract
- Desktop: editorial two-column hero, four-column ecosystem grid, split identity and mobile sections.
- Tablet: reduced hero scale and two-column ecosystem grid.
- Mobile <=767px: single-column flow, stacked cards, readable copy, touch-sized actions, no fixed-width content.
- Narrow mobile <=380px: compact header actions and scaled hero diagram.
- Shared shell owns page gutters and vertical rhythm; feature CSS must not override `.pl-page-main` top/bottom spacing.

## Navigation and authentication
- Shared `renderBrand()` defaults to `#/home`.
- Guest `#/home` renders this public page.
- Authenticated `#/home` renders `PAGE-GLOBAL-HOME-AUTHENTICATED` at the same route; the session selects the experience, not a different logo or route.
- Shared `renderBrand()` always targets `#/home`, so the brand returns to the correct home state from every shared-header page.
- Login success and authenticated visits to guest-only Auth screens return to `#/home`.
- The authenticated Global Home is the platform entry point and cross-ecosystem overview. It is not Circle or the Social Media personal space.
- The internal development workspace remains a separate protected route and must not be presented as the user's Global Home.
- Existing workspace protection, login, recovery, legal routes and signup release gate remain unchanged.

## Runtime ownership and dependencies
- Both public and authenticated compositions are states of the single `src/features/home/home-page.js` entry point and `src/features/home/home-page.css` stylesheet.
- `mountHomePage({ root, user, onSignOut })` receives the current session user; it selects the appropriate state without a second homepage module.
- Route registry: `src/config/paths.js`.
- Route/session redirect: `src/app/routes.js`.
- Rendering lifecycle: `src/app/create-app.js`.
- CSS entry: `src/main.js`.
- Shared brand destination: `src/design-system/page-shell.js`.
- Layout registry: `src/design-system/layouts.js`.
- Tests: `tests/routes.test.js`.
- Source map: `src/CHANGE-MAP.md`.

## Change impact and procedure
Copy/section edits affect this feature and this specification. Root route or auth redirect changes affect app routing and must preserve Auth recovery/workspace behavior. Default brand destination affects every `renderBrand()` consumer: auth, legal, workspace and public home. Shared shell/token changes require a separate consumer audit.

For each change, read this specification, UI Foundation governance and responsive/layout guidance; inspect route, auth, shell, tokens and assets; update docs/registries/tests in the same work item; run `npm test` and `npm run build`; verify guest/authenticated rendering on the same route, desktop/tablet/mobile, anchors and brand links. Keep noindex until explicitly authorized.

## Validation
Implementation complete in source. Automated tests, build and deployment await current CI. Android/desktop visual UAT and founder acceptance are pending.
