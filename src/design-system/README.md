# Provisional UI Foundation

The first frontend screen establishes a small, reviewable foundation in the exact working order requested for PLUITS:

1. Dimensions — spacing, page gutters, containers, form width, breakpoints, radii, and responsive targets in tokens.css.
2. Icons — local inline SVG registry in icons.js; no unreviewed external icon dependency.
3. Colors — semantic tokens derived from the existing PLUITS teal brand mark and neutral ink/surface roles.
4. Behavior — validation, loading, error, password visibility, confirmation-pending, keyboard focus, and auth-state transitions.
5. Layouts — LAY-AUTH-SPLIT-001 and LAY-WORKSPACE-BOARD-001 in layouts.js.

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
- Reading, standard, and workspace maximum widths: shared container tokens.

Every page with shared chrome uses `.pl-page-shell`; every page body uses `.pl-page-main`. The main region owns both vertical gaps and expands to keep the footer at the bottom on short pages. Feature CSS may set its inner content width and composition, but MUST NOT add page-level top/bottom margins or padding that duplicate shell spacing. Page-specific section spacing is a separate content-layout concern, not shell geometry.
