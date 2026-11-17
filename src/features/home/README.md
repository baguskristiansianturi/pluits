# Public Global Home Feature

Owner: `features/home` · Page: `PAGE-GLOBAL-HOME-PUBLIC` · Layout: `LAY-GLOBAL-HOME-001`  
Status: IMPLEMENTED — provisional content/design; founder UAT pending.

## Purpose
Present PLUITS to visitors who are not signed in. Explain the platform's direction without claiming planned services are operational.

## Runtime ownership
- `home-page.js`: page composition and semantic content.
- `home-page.css`: feature-scoped responsive presentation.
- Routes/auth-aware destination: `src/app/`.
- Shared header, footer, brand and shell: `src/design-system/page-shell.js`.

## Content and availability
- Hero introduces PLUITS as a connected digital ecosystem.
- Ecosystem cards describe intended domains and carry a staged-development label.
- Registration CTAs link to the existing registration screen; its submit remains disabled until the public signup release gate is cleared.
- Google Play area is an availability notice only. No fabricated listing URL.
- No fake people, posts, products, reviews, metrics or inventory.

## Shared resources
- Official symbol: `public/assets/brand/pluits-logo.svg`.
- Shared shell: `LAY-SHARED-PAGE-SHELL-001`.
- Existing tokens: `src/design-system/tokens.css`.
- No new font, icon, image, external package or global token.

## Responsive behavior
- Uses shared page gutter, container and shell vertical-rhythm tokens.
- Desktop: editorial hero split and multi-column content.
- Tablet: reduced hero and two-column ecosystem cards.
- Mobile: stacked single-column sections, touch-sized actions, no fixed-width content.
- Feature CSS is scoped to `.home-page`; it must not override shared page-shell geometry.

## Dependencies and consumers
- Guest route: `#/home`; empty URL/hash also resolves to public home.
- Shared `renderBrand()` points to `#/home`.
- Authenticated `#/home` redirects to the current internal workspace until authenticated Global Home is built.
- Consumes shared page shell and canonical brand asset.

## Change impact and procedure
- Copy/section edits affect this feature and its Product Design specification.
- Root route or auth redirect changes affect app routing and require route regression tests.
- Default brand destination affects all `renderBrand()` consumers: auth, legal, workspace and public home.
- Shared shell/token changes require a separate consumer impact audit.
- For each change, read this file and the page specification; inspect route, auth, shell, token and asset dependencies; update docs/registries/tests in the same work item; run `npm test` and `npm run build`.

## Validation
- Implementation: complete in source.
- Automated tests/build: pending CI for current commit.
- Android/desktop visual UAT and founder acceptance: pending.
