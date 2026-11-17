# 07 — Layout Patterns

Owns reusable page-composition patterns. A layout pattern defines structure, not business functionality.

## Register scope

- Global application shell and page frame.
- Feed and content-stream layouts.
- Discovery/listing and search-result layouts.
- Detail/profile layouts.
- Form and checkout layouts.
- Split-pane, dashboard, workspace, and editorial layouts where justified.
- Responsive transformations for each pattern.

## Rules

- Select a pattern based on the page's purpose and approved Product Design specification.
- Different pages may use different patterns; they must still use the same foundation tokens, container rules, and shared components.
- A new pattern must be justified as reusable, reviewed for responsive behavior, and registered before it becomes a standard.
- Do not force every page into one universal composition.


## LAY-GLOBAL-HOME-001 — Public Global Home

A public editorial ecosystem layout with a split hero, ecosystem overview, identity explanation, mobile availability notice, closing CTA and shared footer. It uses the shared page shell and existing tokens; current visual values remain provisional. See `05-PLATFORM-WRAPPER-AND-USER-JOURNEYS/PAGE-GLOBAL-HOME-PUBLIC.md`.
