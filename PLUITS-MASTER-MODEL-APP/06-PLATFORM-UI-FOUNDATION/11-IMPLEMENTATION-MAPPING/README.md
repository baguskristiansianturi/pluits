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


## FOOTER-PAYMENTS-001 — Public payment brand presentation

| Specification | Runtime source | API/token | Consumers |
|---|---|---|---|
| Payment channel taxonomy | `04-SHARED-PLATFORM-SERVICES/PLUITS-PAYMENTS-AND-PAYMENT-METHODS.md` | `PAYMENT_GROUPS`, `renderPaymentMethods()` | Public Global Home and public information pages through `renderPublicFooter()` |
| Brand assets | `src/features/public-info/public-footer.js` | Original QRIS, BCA, BNI, BRI (2025), Bank Mandiri, GoPay, Visa and Mastercard SVG marks | Brand marks are visual demo content; they do not assert provider integration or acceptance |
| Shared shell styling | `src/design-system/page-shell.css` | `.pl-footer-payment-*` | Footer only; no global token or shell geometry changes |
| Responsive layout | `src/design-system/page-shell.css` | 4/2-column card grid | Desktop/tablet and mobile |
| Public presentation | `src/features/public-info/public-footer.js` | Only customer-facing heading and payment category labels | No implementation status, activation disclaimer, or internal roadmap copy in the public footer |

The footer uses real brand marks rather than pictograms. Keep assets small, preserve aspect ratios, and retain descriptive alt text. The demo presentation is separate from provider selection, activation, and transaction capability, which remain internal product decisions. Do not represent any provider as integrated in product behavior until the corresponding payment capability is implemented and verified.


## SOCIAL-PROFILE-COVER-EDITOR-001 — Profile cover media editor

| Specification | Runtime source | API/token | Consumer |
|---|---|---|---|
| `02-PRODUCT-DESIGN/01-SOCIAL-MEDIA/PLUITS-VISUAL-ASSET-LIBRARIES-001.md` — profile-cover controls and editor presentation | `src/features/social/profile-cover-controls.js`, `src/features/social/social-pages.css` | `mountProfileCoverControls()`, `.social-profile-cover-dialog`, `.social-profile-cover-upload` | Social Profile cover menu and editor |
| Regression coverage | `tests/features/profile-cover-controls.test.js` | Format validation, native picker, crop interaction, modal layout and dismissal | Profile cover editor |
