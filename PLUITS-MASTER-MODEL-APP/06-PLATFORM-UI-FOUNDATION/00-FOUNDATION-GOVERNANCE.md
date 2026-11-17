# Foundation Governance and Mandatory Rules

Status: **Initial governance baseline. Specific design values remain pending audit and approval.**

## 1. Purpose and authority

This document governs how the PLUITS Platform UI Foundation is used and changed. The rules apply to every page, route, ecosystem, shared shell, and reusable interface component in the PLUITS application.

The foundation is a shared platform standard, not a page template and not an ecosystem business model.

## 2. Separation of responsibilities

| Area | Owns |
|---|---|
| Platform UI Foundation | Global visual rules, design tokens, responsive system, brand assets, typography, icons, shared components, layout/interaction patterns, UI-specific technology/tooling decisions, UI SOP and UI quality gates |
| Product Design | User needs, page purpose, information architecture, page inventory, page-specific composition, content hierarchy, and approved page behavior |
| Application Modularization | Overall runtime architecture, source ownership, module boundaries, API/data contracts, backend/database architecture, security, technical testing infrastructure, deployment, and rollback |
| Runtime source | The actual implementation of approved tokens, components, patterns, and page specifications |

The technology register in this folder is limited to UI construction, presentation, assets, and UI validation. It does not select or replace the overall backend, database, hosting, or platform architecture governed by Application Modularization.

A page-specific design may choose a different composition when its purpose requires it. It may not create a competing global foundation.

## 3. Mandatory rules

1. Every new or revised page must use the approved foundation.
2. Do not invent page-local global colors, font families, type scales, spacing scales, breakpoints, container widths, radii, shadows, icon sizes, or component styles.
3. Do not source or introduce an external icon, font, logo, illustration, UI library, or runtime dependency without review and explicit approval from the product owner.
4. Search the approved library first. If a resource is missing, report the gap and provide reviewable candidates with source links and visual previews. Do not silently choose one.
5. Reuse shared components. A page may compose or configure them, but must not duplicate them to bypass shared standards.
6. A local exception is allowed only when the page requirement genuinely needs it, the reason and scope are documented, and the product owner approves it. An exception must not silently become a new global rule.
7. Do not change a global token or shared component only to solve one page's local problem without impact analysis.
8. Keep documentation and runtime implementation aligned. The approved specification and the production implementation must have a traceable mapping.
9. Never claim a value, asset, component, tool, or technology is approved when it is only an example, proposal, or pending decision.
10. All implementation must meet the professional engineering bar defined in 12-TECHNOLOGY-AND-TOOLING/README.md: maintainable module boundaries, explicit/typed or validated contracts, secure backend authorization, automated tests, accessibility, responsive verification, dependency governance, and documented deployment evidence.
11. Prefer mature, widely adopted, actively maintained technologies appropriate to PLUITS. Do not choose a technology merely because it is popular; record its engineering purpose, trade-offs, maintenance and security implications.
12. Do not perform a big-bang rewrite of working pages. Framework and language adoption must be incremental, scoped, tested, and reversible.
13. Every new or changed deliverable must create or update its own canonical documentation in the same work item: assign/retain an ID, record purpose, specification, variants/states, source assets/tokens, implementation mapping, consumers/dependencies, usage guidance, change impact, change procedure, and validation status. Update the relevant registry/index so future developers and AI can discover it without searching unrelated page source. Documentation is not a later optional task.

## 4. Rule precedence when requirements conflict

Use this order to resolve conflicts:

1. Explicitly approved product-owner decision.
2. Approved page-specific Product Design requirement for page purpose and composition.
3. Approved platform-wide UI Foundation for shared measurements, assets, tools, and visual/interaction conventions.
4. Existing implementation conventions, only where they do not conflict with approved requirements.

A page-specific requirement can define a unique layout; it cannot silently override global brand, typography, responsive, or component rules. If a conflict cannot be resolved from approved documents, stop the affected decision and request clarification.

## 5. Approval lifecycle

Use these statuses consistently:

- **Proposed** — suggested, not approved for production use.
- **Under Review** — submitted for product-owner review.
- **Approved** — may be used as the standard.
- **Deprecated** — must not be used for new work; migration guidance is required.
- **Retired** — removed from active use after impact and dependency checks.

Only **Approved** resources and technology choices are eligible for normal production implementation.

## 6. Adding a missing resource or technology

When a required icon, font, asset, component, tool, or dependency is absent:

1. Identify the exact use case and required behavior.
2. Search the current approved library and existing runtime dependencies first.
3. If absent, record the gap in the relevant library or technology register.
4. Present a small set of candidates, with source links, license/usage information where applicable, bundle/network cost, maintenance considerations, and visual examples for visual resources.
5. Wait for the product owner's selection/approval.
6. Add the approved item to the canonical library and document its source, version, variants, measurements, usage rules, and owner.
7. Update the runtime implementation mapping, lockfile, and tests when a dependency is introduced.

Do not substitute a visually similar resource or add a package merely for convenience.

## 7. Change control

Before changing a shared token, component, layout pattern, asset, or UI dependency:

- Identify all known consumers and affected routes.
- Identify responsive and interaction states that may change.
- Check ecosystem-specific overrides and dependencies.
- Define migration or compatibility requirements.
- Review bundle size, external network requests, license, maintenance, and browser support when relevant.
- Run targeted tests and regression checks.
- Update the canonical documentation and implementation mapping.

Global changes must be reviewed as global changes, not disguised as local page edits.

## 8. No premature locking of values

This setup does not approve exact breakpoints, container widths, spacing values, typography, icon sets, logo variants, component dimensions, or an immediate framework migration.

Those values and changes must be established through an audit of the current application, design requirements, and viewport testing, then reviewed and approved. Until then, examples and provisional values must be labelled clearly.

## 9. Required evidence for completion

A page or shared UI change is not complete merely because it renders once. Completion evidence must include:

- The foundation resources, technologies, and patterns used.
- Viewports and relevant states tested.
- Any approved exception or missing-resource request.
- Impact analysis and regression result.
- Runtime files changed and deployment/commit status, when applicable.
