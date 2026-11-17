# 03 — Brand Assets

Owns the approved PLUITS brand files and their usage specifications.

## Canonical logo size

- **Global rendered symbol size: 34 × 34 CSS px.**
- Source of truth: `--pl-brand-logo-size` in `src/design-system/tokens.css`.
- Runtime consumer: `.pluits-brand img` in `src/styles/global.css`.
- Shared renderer: `renderBrand()` in `src/design-system/page-shell.js`.
- The same token applies on desktop, tablet, and mobile. Do not create per-page or per-breakpoint logo sizes unless a separately named, approved brand variant is formally registered.
- To change the standard later, update the token once. All consumers of the shared brand component inherit the new size.
- Preserve the source SVG aspect ratio; do not stretch, redraw, recolor, or replace it.

## Register scope

- Primary logo and approved logo variants.
- Symbol/wordmark combinations and approved compact forms.
- Clear space, minimum size, alignment, and placement rules.
- Approved light/dark and background treatments.
- File formats, export sizes, and asset naming.
- Rules for contextual variants, including footer or compact placements.

## Rules

- Reuse the canonical source asset; do not redraw, approximate, recolor, stretch, or replace it.
- A contextual size or variant must be explicitly documented and approved.
- Keep logo proportions and clear space intact.
- If a required variant is missing, submit candidates or a production request for approval.
