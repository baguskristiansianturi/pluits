# Mobile Layout Contract

Status: shared mobile geometry contract.

## Standard mobile content
- Breakpoint: viewport width up to 767px.
- Standard page content, headings, supporting copy and form content use a 10px left/right inset.
- Standard page containers must not introduce inconsistent nested gutters.
- Feature-owned card appearance and dimensions remain controlled by their feature styles.

## Horizontal carousels
- The first card begins at the standard 10px left inset.
- The scrollable rail extends through the right 10px content gutter to the physical right edge of the mobile viewport.
- The rail must not be clipped by the page content container.
- Cards keep their intrinsic/fixed responsive widths; do not shrink them to fit the viewport. A partial next card is intentional and signals horizontal scrolling.
- The last card remains fully reachable by swiping.
- Desktop/tablet carousels remain within the normal page content boundary.

## Full-viewport content surfaces
Feed, Reels, Blog and Live content surfaces retain their full-viewport treatment. Their headings and supporting copy use the standard 10px inset where applicable.

## Desktop and tablet
No new mobile breakout rules apply above 767px. Existing desktop content boundaries and carousel behavior remain authoritative.

## Change safety
- Implement shared geometry in the design-system responsive layout contract.
- Do not change colors, typography, card dimensions, component interaction or unrelated visual treatments as part of a gutter adjustment.
- Verify homepage, social profile, marketplace, auth and workspace layouts for overflow and clipping.
