# 01 — Design Tokens

Owns the canonical visual values used by the entire application.

## Register scope

- Semantic color roles and themes.
- Spacing scale and layout gaps.
- Sizing and dimension scales.
- Border widths, radii, and shadows/elevation.
- Layering/z-index conventions.
- Motion duration/easing and opacity, where required.
- Naming conventions and token aliases.

## Rules

- Components and pages consume semantic tokens; they do not scatter arbitrary values.
- A token has one canonical name, definition, purpose, and status.
- Avoid duplicate tokens that represent the same design decision.
- Document theme behavior and contrast requirements.
- A global token change requires consumer impact analysis.

## Not yet approved

No final palette, spacing scale, radius scale, or shadow scale is declared by this setup. Audit the current runtime and proposed visual direction, present the values for review, then mark approved values explicitly.


## Shared shell divider tokens

- `--pl-shell-divider-width`: canonical divider thickness for the shared header and footer boundary (currently 1px).
- `--pl-shell-divider-color`: canonical soft divider color shared by the header bottom and footer top.
- Change these tokens once to update both shared boundaries. Do not hard-code a page-local border for either boundary.


## Shared page-shell vertical spacing — current runtime contract

The distance from the bottom edge of the shared navbar/header to the start of page content is **50px on desktop, tablet, and mobile**. This is one global shell rule, not a page-specific value.

- One token for every viewport: `--pl-shell-header-content-gap: 50px`.
- There is no separate mobile/tablet spacing token; the global gap does not change at breakpoints.
- Runtime owner: `src/design-system/tokens.css`.
- Enforcement: `src/design-system/page-shell.css`, using `.pl-page-shell > .pl-page-main` so page-specific layout classes cannot silently override the shared top gap.
- All pages using the shared shell must place their main content as a direct `.pl-page-main` child of `.pl-page-shell`.
- A different gap is not allowed as a local CSS override; any future exception must be explicitly reviewed and documented.
