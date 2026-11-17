# Foundation Governance and Mandatory Rules

Status: **Initial governance baseline. Specific design values remain pending audit and approval.**

## 1. Purpose and authority

This document governs how the PLUITS Platform UI Foundation is used and changed. The rules apply to every page, route, ecosystem, shared shell, and reusable interface component in the PLUITS application.

The foundation is a shared platform standard, not a page template and not an ecosystem business model.

## 2. Separation of responsibilities

| Area | Owns |
|---|---|
| Platform UI Foundation | Global visual rules, design tokens, responsive system, brand assets, typography, icons, shared components, layout/interaction patterns, UI SOP and UI quality gates |
| Product Design | User needs, page purpose, information architecture, page inventory, page-specific composition, content hierarchy, and approved page behavior |
| Application Modularization | Runtime source ownership, module boundaries, technical architecture, data/API contracts, security, technical testing, deployment, and rollback |
| Runtime source | The actual implementation of approved tokens, components, patterns, and page specifications |

A page-specific design may choose a different composition when its purpose requires it. It may not create a competing global foundation.

## 3. Mandatory rules

1. Every new or revised page must use the approved foundation.
2. Do not invent page-local global colors, font families, type scales, spacing scales, breakpoints, container widths, radii, shadows, icon sizes, or component styles.
3. Do not source or introduce an external icon, font, logo, illustration, or UI library without review and explicit approval from the product owner.
4. Search the approved library first. If a resource is missing, report the gap and provide reviewable candidates with source links and visual previews. Do not silently choose one.
5. Reuse shared components. A page may compose or configure them, but must not duplicate them to bypass shared standards.
6. A local exception is allowed only when the page requirement genuinely needs it, the reason and scope are documented, and the product owner approves it. An exception must not silently become a new global rule.
7. Do not change a global token or shared component only to solve one page's local problem without impact analysis.
8. Keep documentation and runtime implementation aligned. The approved specification and the production implementation must have a traceable mapping.
9. Never claim a value, asset, component, or pattern is approved when it is only an example, proposal, or pending decision.

## 4. Rule precedence when requirements conflict

Use this order to resolve conflicts:

1. Explicitly approved product-owner decision.
2. Approved page-specific Product Design requirement for page purpose and composition.
3. Approved platform-wide UI Foundation for shared measurements, assets, and visual/interaction conventions.
4. Existing implementation conventions, only where they do not conflict with approved requirements.

A page-specific requirement can define a unique layout; it cannot silently override global brand, typography, responsive, or component rules. If a conflict cannot be resolved from approved documents, stop the affected decision and request clarification.

## 5. Approval lifecycle

Use these statuses consistently:

- **Proposed** — suggested, not approved for production use.
- **Under Review** — submitted for product-owner review.
- **Approved** — may be used as the standard.
- **Deprecated** — must not be used for new work; migration guidance is required.
- **Retired** — removed from active use after impact and dependency checks.

Only **Approved** resources are eligible for normal production implementation.

## 6. Adding a missing resource

When a required icon, font, asset, component, or pattern is absent:

1. Identify the exact use case and required behavior.
2. Search the current approved library.
3. If absent, record the gap in the relevant library register.
4. Present a small set of candidates, with source links, license/usage information where applicable, and visual examples.
5. Wait for the product owner's selection/approval.
6. Add the approved item to the canonical library and document its name, source, variants, measurements, and usage rules.
7. Update the runtime implementation mapping and tests.

Do not substitute a visually similar resource without approval.

## 7. Change control

Before changing a shared token, component, layout pattern, or asset:

- Identify all known consumers and affected routes.
- Identify responsive and interaction states that may change.
- Check ecosystem-specific overrides and dependencies.
- Define migration or compatibility requirements.
- Run targeted tests and regression checks.
- Update the canonical documentation and implementation mapping.

Global changes must be reviewed as global changes, not disguised as local page edits.

## 8. No premature locking of values

This setup does not approve exact breakpoints, container widths, spacing values, typography, icon sets, logo variants, or component dimensions.

Those values must be established through an audit of the current application, design requirements, and viewport testing, then reviewed and approved. Until then, examples and provisional values must be labelled clearly.

## 9. Required evidence for completion

A page or shared UI change is not complete merely because it renders once. Completion evidence must include:

- The foundation resources and patterns used.
- Viewports and relevant states tested.
- Any approved exception or missing-resource request.
- Impact analysis and regression result.
- Runtime files changed and deployment/commit status, when applicable.
