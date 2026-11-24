# Mobile Layout Contract

Status: implementation for mobile UI review.

## Standard mobile content
- Breakpoint: viewport width up to 767px.
- Shared page gutter: 5px from the left and right screen edges.
- This applies to ordinary page content, headings, forms and standard cards unless a feature has a documented independent composition.

## Horizontal carousels
- The rail begins 5px from the left viewport edge.
- The rail may scroll horizontally to the full right viewport edge.
- The last item must remain reachable; do not clip the scrollable content at the page container boundary.
- Section heading and supporting copy remain aligned to the standard 5px gutter.
- Carousel item dimensions, gaps, typography, colors and card treatments remain feature-owned.

## Full-viewport content surfaces
The following content families are exempt from the standard horizontal gutter:
- Feed
- Reels
- Blog
- Live

Their media/content surface may extend to both viewport edges. Their section title and description may retain a 5px inset for readability.

## Desktop and tablet
No geometry changes are introduced above the mobile breakpoint. Existing feature layouts remain authoritative.

## Change safety
- Implement layout geometry in the shared responsive layout contract.
- Do not alter colors, typography, radii, iconography, media aspect ratios, card dimensions or interaction behavior as part of a gutter change.
- Check homepage, social profile, marketplace, auth and workspace surfaces for overflow and regressions after each update.
