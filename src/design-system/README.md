# Provisional UI Foundation

The first frontend screen establishes a small, reviewable foundation in the exact working order requested for PLUITS:

1. Dimensions — spacing, page gutters, containers, form width, breakpoints, radii, and responsive targets in tokens.css.
2. Icons — local inline SVG registry in icons.js; no unreviewed external icon dependency.
3. Colors — semantic tokens derived from the existing PLUITS teal brand mark and neutral ink/surface roles.
4. Behavior — validation, loading, error, password visibility, confirmation-pending, keyboard focus, and auth-state transitions.
5. Layouts — LAY-AUTH-SPLIT-001 and LAY-USER-DASHBOARD-001 in layouts.js.

All token values, icon IDs, and layouts are marked PROVISIONAL until reviewed and approved. The feature screens consume these tokens and scoped styles; they must not create competing global scales.


## Shared account and legal page frame

`page-shell.js` and `page-shell.css` own the canonical brand header, page frame, responsive header/footer geometry, and footer for Login, Registration, Terms, and Privacy. Feature styles own only the content composition inside that frame. Do not redefine the shared header, footer, logo dimensions, or page-frame spacing in feature CSS. The shared shell pattern is registered as `LAY-SHARED-PAGE-SHELL-001` in `layouts.js`.


## Reusable navigation, header, and footer contracts

The canonical chrome API is `src/design-system/page-shell.js`, styled only by `page-shell.css`:
- `renderBrand()`: canonical approved PLUITS logo and brand link.
- `renderNavbar({ items, active, ariaLabel })`: reusable navigation; each experience supplies its own menu data, while geometry, typography, active state and responsive behavior stay shared.
- `renderPageHeader({ items, active, rightContent, variant })`: shared header composition with optional navigation and a slot for context-specific actions (for example, signed-in user and sign-out).
- `renderPageFooter({ groups, legalLinks, copyright, attribution })`: shared footer composition; each experience supplies its own menu groups and legal links.

Menu contents are configuration, not separate page-specific markup. Do not copy header/navbar/footer HTML or redefine their dimensions in feature styles. A page may omit navigation or footer when its experience does not require them, but when present it must use these shared renderers. Feature-specific slots may provide content/actions; they must not replace shared geometry. Keep the logo source canonical and shared.


## Canonical brand sizing and page geometry (single source of truth)

- The rendered PLUITS logo symbol is globally **34 × 34 CSS px**.
- `--pl-brand-logo-size` in `tokens.css` is the only editable size value.
- `global.css` applies that token to every logo rendered by `renderBrand()`; do not pass per-page pixel sizes or hard-code dimensions in HTML.
- Desktop, tablet, and mobile use the same logo size. A different size requires an explicitly registered and approved brand variant.

The page vertical rhythm is owned by `tokens.css` and applied by `page-shell.css`, never by feature-page margins:
- Header height: `--pl-shell-header-height` / mobile counterpart.
- Header-to-content distance: `--pl-shell-header-content-gap` / mobile counterpart.
- Content-to-footer distance: `--pl-shell-content-footer-gap` / mobile counterpart.
- Footer minimum height: shared desktop/mobile tokens.
- Reading and standard maximum widths: shared container tokens.

Every page with shared chrome uses `.pl-page-shell`; every page body uses `.pl-page-main`. The main region owns both vertical gaps and expands to keep the footer at the bottom on short pages. Feature CSS may set its inner content width and composition, but MUST NOT add page-level top/bottom margins or padding that duplicate shell spacing. Page-specific section spacing is a separate content-layout concern, not shell geometry.


## Brand lockup contract — LOGO-02

The symbol-plus-wordmark lockup uses the canonical symbol asset and the existing PLUITS wordmark text treatment. Its horizontal separation is controlled by `--pl-brand-lockup-gap` in `tokens.css`, currently **4 CSS px**. The symbol remains 34 × 34 CSS px. Wordmark font size, weight, letter spacing, and color are unchanged; the existing mobile font-size rule is also preserved. Do not introduce page-local gaps or adjust typography to compensate for this spacing.


## Shared navbar/header divider — NAV-001

Every header/navigation rendered through `renderPageHeader()` receives a soft bottom divider automatically. The divider is part of the shared chrome, not page content and not an optional page-level decoration.

- Runtime: `src/design-system/page-shell.css`, selector `.pl-page-header`.
- Tokens: `--pl-shell-divider-width` and `--pl-shell-divider-color` in `src/design-system/tokens.css`.
- The footer top divider consumes the same tokens so both boundaries stay visually consistent.
- Do not add local borders to individual pages or individual navbar instances.
- Pages must use the shared header renderer; a custom header requires an explicitly documented and approved exception.


## Global brand destination

The shared `renderBrand()` renderer always targets the canonical `#/home` Beranda for guests and authenticated users. On Global Home, the signed-in account avatar/name links to the separate protected `#/dashboard` user Dashboard. Dashboard is the only post-login control center. Workspace is an internal development term and is not exposed as a separate product page or route.


## Shared header geometry — NAV-001

The shared page header has one fixed runtime height at each viewport class, rather than a minimum height that can grow with page-specific content:

- Desktop and tablet: `--pl-shell-header-height` (currently 82px).
- Mobile: `--pl-shell-header-height-mobile` (currently 68px).
- Runtime enforcement: `height` and `min-height` are both bound to the same token in `src/design-system/page-shell.css`.
- Feature styles may configure header content, gaps, sticky behavior, and action controls, but must not redefine the shared header height.
- The logo remains 34 × 34 CSS px at every viewport, controlled only by `--pl-brand-logo-size`; wordmark typography remains controlled by `src/styles/global.css`.

**Status note:** These dimensions describe the current runtime baseline. The token register and responsive system still identify global dimension values as provisional pending formal product-owner approval. This audit does not silently upgrade provisional tokens to Approved.


## Shared header adoption — NAV-002

- Runtime header contract: `renderPageHeader()` in `src/design-system/page-shell.js`; all experience-specific header content is supplied through its navigation items or `rightContent` slot.
- Global Home (`src/features/home/home-page.js`), Social pages (`src/features/social/social-pages.js`), Dashboard, Auth, Legal, and Public Information pages use the shared renderer. Feature-specific classes may control only placement/experience behavior (for example sticky behavior and action-slot composition); they must not replace the shared brand renderer, logo sizing, header height, divider, or base geometry.
- `className` and `dataGlobalHeader` are integration hooks for scoped behavior and lifecycle observation. They do not create a second header implementation.
- Social's bottom app navigation remains a separate navigation pattern from the page header. It must be documented and governed as its own component/variant; it is not a substitute for the shared header.
- Validation status: runtime adoption updated; full visual regression across all listed routes and viewports remains pending until browser verification is completed.


## CSS ownership and cascade contract

The authoritative rule for which layer owns dimensions, spacing, layout, responsive behavior and interaction is [CSS-OWNERSHIP-AND-CASCADE-CONTRACT-001.md](../../PLUITS-MASTER-MODEL-APP/06-PLATFORM-UI-FOUNDATION/01-DESIGN-TOKENS/CSS-OWNERSHIP-AND-CASCADE-CONTRACT-001.md). HTML owns structure; CSS owns all visual presentation; design tokens own reusable platform values; component/feature CSS owns its scoped geometry; JavaScript owns behavior and state. Do not add late overrides to bypass the cascade. Preserve the current visual baseline and verify computed styles in a browser before consolidating repeated selectors.
