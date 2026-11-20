# 11 — Implementation Mapping

Connects the canonical UI specifications in this folder to the actual runtime source code.

## Purpose

The documentation defines what is approved. Runtime code implements it. This register prevents standards from being copied into unrelated files or drifting between documentation and code.

## Register fields

For each foundation item, record:

- Canonical documentation path.
- Runtime source path(s).
- Exported token/component/API name.
- Consuming modules or routes.
- Test location and verification method.
- Current status and last verified commit.

## Rules

- Do not assume a source path before inspecting the current repository.
- Identify one authoritative runtime implementation for each shared token or component.
- Avoid duplicate token definitions and competing component implementations.
- If the runtime and approved specification disagree, record the discrepancy and resolve it through change control.
- Update this mapping whenever implementation paths or shared exports change.

## Initial status

The mapping is intentionally not populated with guessed source paths. It must be completed during the runtime foundation audit, before broad redesign or migration begins.

## Relationship to Application Modularization

Use `03-APPLICATION-MODULARIZATION/` for code ownership, module boundaries, architecture, contracts, security, technical tests, deployment, and rollback. This register points from the approved UI standard to the correct runtime implementation; it does not replace technical architecture documentation.


## NAV-001 — Shared navbar/header divider

| Specification | Runtime source | Token/API | Consumer rule |
|---|---|---|---|
| `06-COMPONENT-LIBRARY/NAV-001-SHARED-NAVBAR.md` | `src/design-system/page-shell.css` | `.pl-page-header` | All pages using `renderPageHeader()` inherit the bottom divider |
| `01-DESIGN-TOKENS/README.md` | `src/design-system/tokens.css` | `--pl-shell-divider-width`, `--pl-shell-divider-color` | Header bottom and footer top share the same values |


## LAY-GLOBAL-HOME-001 — Public Global Home

| Specification | Runtime source | API/token | Consumer |
|---|---|---|---|
| `05-PLATFORM-WRAPPER-AND-USER-JOURNEYS/PAGE-GLOBAL-HOME-PUBLIC.md` | `src/features/home/home-page.js`, `home-page.css` | `mountHomePage()`, `.home-*` | Guest `#/home` |
| Shared shell | `src/design-system/page-shell.js`, `page-shell.css` | `renderPageHeader()`, `renderPageFooter()`, `renderBrand()` | Home, auth, legal, workspace |
| Layout registry | `src/design-system/layouts.js` | `LAY-GLOBAL-HOME-001` | `PAGE-GLOBAL-HOME-PUBLIC` |
| Route/auth state | `src/app/routes.js`, `src/config/paths.js`, `src/app/create-app.js` | `home` route and session redirect | Guest home; signed-in workspace fallback |
| Regression coverage | `tests/routes.test.js` | Route and brand-link assertions | Route/navigation regression |


## Shared navbar-to-content spacing — one global rule

| Owner | Single source of truth | Application rule |
|---|---|---|
| Design token | `src/design-system/tokens.css` — `--pl-shell-header-content-gap: 50px` | One value at every viewport; no page-specific or mobile duplicate token |
| Shared shell | `src/design-system/page-shell.css` — `.pl-page-shell > .pl-page-main` | Every page body placed in the shared shell inherits the spacing automatically |
| Regression test | `tests/routes.test.js` | Confirms there is exactly one token and the shared shell consumes it |

Feature pages must not define or override navbar-to-content spacing. New pages use the shared page-shell contract rather than adding their own gap.


## NAV-001 — Shared header geometry and LOGO-02

| Specification | Runtime source | Token/API | Consumer rule |
|---|---|---|---|
| `06-COMPONENT-LIBRARY/NAV-001-SHARED-NAVBAR.md` | `src/design-system/page-shell.css` | `--pl-shell-header-height`, `--pl-shell-header-height-mobile` | Every shared page header has one fixed 82px desktop/tablet and 68px mobile runtime height; feature CSS cannot override it |
| `03-BRAND-ASSETS/LOGO-02-SYMBOL-WORDMARK.md` | `src/styles/global.css`, `src/design-system/page-shell.js` | `--pl-brand-logo-size`, `--pl-brand-lockup-gap`, `.pluits-brand` | Every shared brand renderer uses the canonical 34px symbol and 4px lockup gap |
| Responsive header consumers | `src/features/home/home-page.css`, `src/features/home/business-home.css`, `src/features/dashboard/dashboard-page.css`, `src/features/social/social-pages.css` | Content-only modifiers | Configure sticky state, spacing, and actions only; do not define header height |
| Regression coverage | `tests/routes.test.js` | Shared-header sizing assertions | Checks fixed token use, brand dimensions, and absence of page-local height overrides |


## FOOTER-PAYMENTS-001 — Public payment channel presentation

| Specification | Runtime source | API/token | Consumers |
|---|---|---|---|
| `04-SHARED-PLATFORM-SERVICES/PLUITS-PAYMENTS-AND-PAYMENT-METHODS.md` | `src/features/public-info/public-footer.js` | `renderPaymentMethods()`, compact inline SVG channel pictograms | Public Global Home and public information pages through `renderPublicFooter()` |
| Shared shell styling | `src/design-system/page-shell.css` | `.pl-footer-payment-*` | Footer only; no global token or shell geometry changes |
| Responsive checks | GitHub Actions production build and test suite | 6/3/2-column card grid | Desktop, tablet, and mobile |
| Status | IMPLEMENTED IN SOURCE — payment channels remain proposed and not activated | Inline SVG only; no remote image requests or new dependencies | Verify CI and Pages deployment before acceptance |

The footer presents payment *channel families*, not provider logos or a claim of live acceptance. Do not add a specific provider/network mark or label a channel as active until the payment provider and channel activation are confirmed. SVG pictograms are inline, accessible-hidden decoration; labels carry the meaning. The availability disclaimer must remain visible.
