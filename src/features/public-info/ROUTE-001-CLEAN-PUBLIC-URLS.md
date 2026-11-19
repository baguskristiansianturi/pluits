# PLUITS Public Routes — ROUTE-001

Status: IMPLEMENTED IN BRANCH / DEPLOYMENT PENDING

## Purpose
Give every public footer destination a distinct, shareable URL path. Routes use the GitHub Pages project base path and trailing slashes, for example `/pluits/about/`, `/pluits/help/`, and `/pluits/privacy/`.

## Canonical ownership
- Route slugs and URL generation: `src/config/paths.js`.
- Pathname parsing and access redirects: `src/app/routes.js`.
- Browser history and page dispatch: `src/app/create-app.js`.
- Footer navigation inventory: `src/features/public-info/public-footer.js`.
- Public information page frame: `src/features/public-info/public-info-page.js`; page-specific content is grouped in `src/features/public-info/pages/{company,support,community,marketplace,privacy}/`.
- Terms and Privacy content: `src/features/legal/pages/{terms,privacy}/`; shared document frame remains in `src/features/legal/policy-page.js`.
- Feature page-folder ownership and addition workflow: `src/features/public-info/pages/README.md` and `src/features/legal/pages/README.md`.
- GitHub Pages static entry points: `scripts/generate-pages-routes.mjs`.

## Behavior
- Navigation uses normal path URLs and the browser History API; hash-based route navigation is retired.
- The production build generates a route directory with its own `index.html` for each configured route. Direct opening, refresh, and shared links therefore resolve on GitHub Pages without relying on a hash fragment.
- The generated `404.html` is a fallback only; it does not replace the explicit route directories.
- Public information and policy routes remain accessible without authentication. Authenticated routes retain their existing session guard.
- Registration remains disabled by the existing release gate. Login and existing-account authentication behavior are not intentionally changed.
- In-page policy contents may continue using fragment links for section scrolling; fragments are not used for application routing.

## Validation
Required: `npm test`, `npm run build`, verify generated folders for every route, then mobile and desktop browser checks for every footer destination, direct URL entry, refresh, back/forward navigation, and auth-protected routes.

## Status boundary
A source change or successful build does not prove GitHub Pages deployment or browser UAT. Those statuses must be reported separately.
