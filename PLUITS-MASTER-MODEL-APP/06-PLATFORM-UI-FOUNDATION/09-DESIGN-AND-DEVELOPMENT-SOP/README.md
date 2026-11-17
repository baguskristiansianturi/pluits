# 09 — Design and Development SOP

Mandatory workflow for creating or changing any PLUITS page or shared UI.

## SOP A — Create a new page

1. Read the user request and identify page purpose, audience, content, actions, and expected states.
2. Locate the approved page specification in Product Design. If it does not exist, document the gap rather than inventing product behavior.
3. Read this UI Foundation and identify the applicable responsive system, tokens, assets, icons, components, layout patterns, and interaction patterns.
4. Inspect the current runtime implementation and module ownership before coding.
5. Reuse approved material. Compose the page inside the canonical page shell and page-main contract. Do not create page-local header/content or content/footer spacing.
6. Treat tokens.css as the single source of truth for dimensions, spacing, typography, colors, radii, icon sizing and breakpoints; use registered components and layout patterns rather than adding independent CSS scales.
7. If an asset, icon, font, component, or pattern is missing, submit the gap and candidate options for product-owner approval.
8. Implement within the owning module and keep changes within the approved scope.
9. Test all supported viewport classes and relevant interaction states.
10. Perform impact analysis and regression checks for shared consumers.
11. Record files changed, foundation resources used, test evidence, exceptions, and commit/deployment status.

## SOP B — Change an existing page

1. Identify the exact requested change and preserve unrelated design and behavior.
2. Classify it as token/global, shared component, layout pattern, or page-local change.
3. Trace all consumers and dependencies before editing shared resources.
4. Make the smallest safe change that satisfies the request.
5. Verify the target page and affected consumers at relevant viewports.
6. Document any migration, approved exception, and regression result.

## SOP C — Request a missing resource

Do not independently source a replacement. Submit: use case, required meaning/behavior, missing library entry, candidate links, visual previews, license/usage notes, and the decision required from the product owner.

## Required completion report

State: scope, files changed, shared resources reused/added, viewports tested, regression results, unresolved issues, commit SHA, and deployment status. Never claim tests or deployment succeeded without evidence.
