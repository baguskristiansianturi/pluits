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
