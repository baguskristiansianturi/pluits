# NAV-001 — Shared Navbar/Header

Status: **Approved shared foundation behavior.**

## Purpose

Provide one consistent global header/navigation boundary across PLUITS pages. The header may contain different content by experience (brand, navigation links, application actions, or workspace controls), but its shared geometry and boundary treatment are centrally governed.

## Mandatory divider rule

Every page header created through `renderPageHeader()` automatically displays a subtle horizontal divider along its bottom edge. The divider separates the shared header/navigation region from page content, matching the soft top divider used by the shared footer.

- Thickness: `--pl-shell-divider-width` (currently 1px).
- Color: `--pl-shell-divider-color` (currently rgba(198, 215, 210, 0.65)).
- Placement: bottom edge of `.pl-page-header`.
- Scope: all `renderPageHeader()` consumers, independent of which content/slots the header contains.
- Responsive behavior: remains present at desktop, tablet, and mobile; it does not change the registered header height.
- Footer consistency: `.pl-page-footer` top border uses the same width and color tokens.

## Runtime mapping

- Renderer: `renderPageHeader()` in `src/design-system/page-shell.js`.
- Header styles: `.pl-page-header` in `src/design-system/page-shell.css`.
- Footer styles: `.pl-page-footer` in `src/design-system/page-shell.css`.
- Tokens: `--pl-shell-divider-width` and `--pl-shell-divider-color` in `src/design-system/tokens.css`.

## Usage rules

1. Use the shared header renderer for every page that requires the standard PLUITS navbar/header.
2. Do not add a second bottom border in page or feature CSS.
3. Do not remove the divider from a single page to solve a local spacing issue.
4. Different navbar contents belong in the renderer's configuration/slots; they do not create a different divider standard.
5. A genuinely borderless header is an explicit variant request and must be registered, documented, and approved before implementation.

## Change impact

Changing either shared divider token affects the bottom boundary of every shared page header and the top boundary of every shared page footer. Check all routes consuming `renderPageHeader()`, both footer states, and all supported viewport ranges.

Changing only navbar content/configuration must not change divider thickness, color, or placement.

## Change procedure

1. Inspect this specification and the current token values.
2. Confirm whether the requested change is global or a formally approved variant.
3. Change the canonical token(s), not page-local CSS.
4. Update this specification, token documentation, and implementation mapping in the same work item.
5. Run responsive and shared-consumer regression checks.
6. Record the tested routes, results, commit, and deployment status.

## Change record

- **2026-11-18:** Added a mandatory 1px soft bottom divider to the shared page header. Header bottom and footer top now share the same divider tokens.
