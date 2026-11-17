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
| Design token | `src/design-system/tokens.css` — `--pl-shell-header-content-gap: 25px` | One value at every viewport; no page-specific or mobile duplicate token |
| Shared shell | `src/design-system/page-shell.css` — `.pl-page-shell > .pl-page-main` | Every page body placed in the shared shell inherits the spacing automatically |
| Regression test | `tests/routes.test.js` | Confirms there is exactly one token and the shared shell consumes it |

Feature pages must not define or override navbar-to-content spacing. New pages use the shared page-shell contract rather than adding their own gap.
