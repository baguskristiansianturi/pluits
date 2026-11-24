# PLUITS UI Foundation Preflight — Mandatory Before Every Page

ID: `UI-FOUNDATION-PREFLIGHT-001`  
Status: **MANDATORY ENGINEERING WORKFLOW**  
Owner: Platform UI Foundation  
Applies to: every new page, route, feature surface, redesign, responsive adjustment, and shared UI change.

## Purpose

Prevent PLUITS pages from drifting into separate visual systems. Pages may have different information architecture, content, and composition, but they must look and behave like parts of one product because they consume the same platform tokens, assets, components, and interaction rules.

This document is the required entry point before page work. It does not create a second design system and does not duplicate the detailed specifications. It tells developers and AI agents exactly where the authoritative rules and actual runtime implementations live.

## Non-negotiable rule

**Do not start page markup or page CSS until this preflight has been completed.**

A page is a composition of shared building blocks, not a new website with its own measurements. Do not invent local replacements for an existing global token, icon, component, shell, breakpoint, spacing rule, or interaction pattern.

A different page layout is allowed when its product purpose requires it. A different design language is not.

## 1. Mandatory reading order

Before implementing or modifying a page, inspect these sources in order:

1. `AGENTS.md` — repository-wide engineering rules and boundaries.
2. `PLUITS-MASTER-MODEL-APP/06-PLATFORM-UI-FOUNDATION/README.md` — foundation index and status.
3. `00-FOUNDATION-GOVERNANCE.md` — authority, approval, exceptions, and change control.
4. The relevant register under each applicable foundation area:
   - `01-DESIGN-TOKENS/` — measurements, spacing, colors, radii, shadows, and semantic tokens.
   - `02-RESPONSIVE-SYSTEM/` — breakpoints, containers, grids, gutters, overflow, and viewport behavior.
   - `03-BRAND-ASSETS/` — approved logo and brand assets.
   - `04-TYPOGRAPHY/` — font families, type scale, weights, line heights, and text roles.
   - `05-ICON-LIBRARY/` — icon inventory, exact IDs/names, visual source, and usage.
   - `06-COMPONENT-LIBRARY/` — shared components, dimensions, variants, states, and usage.
   - `07-LAYOUT-PATTERNS/` — reusable page and section compositions.
   - `08-INTERACTION-PATTERNS/` — behavior, keyboard, focus, loading, empty, error, and responsive interactions.
   - `09-DESIGN-AND-DEVELOPMENT-SOP/` — required build/change procedure.
   - `10-QUALITY-AND-CHANGE-CONTROL/` — regression and approval gates.
   - `11-IMPLEMENTATION-MAPPING/` — specification-to-code mapping.
   - `12-TECHNOLOGY-AND-TOOLING/` — UI implementation and validation tools.
5. `src/design-system/README.md` and the actual runtime files listed in section 2.
6. The target page's approved Product Design specification, route owner, feature README, existing markup, styles, tests, and all shared component consumers.

Read the relevant files in each area; do not assume a folder name or this index alone contains the detailed standard.

## 2. Runtime source-of-truth map

These are the canonical implementation locations. Search and reuse them before creating anything.

| What you need | Single runtime source |
|---|---|
| Global spacing, page gutter, containers, breakpoints, colors, radii, shadows, font family, shell dimensions | `src/design-system/tokens.css` |
| Icon artwork, icon IDs/names, icon renderer and registry | `src/design-system/icons.js` |
| Shared logo, navbar, page header, footer and shell markup | `src/design-system/page-shell.js` |
| Shared shell/header/footer geometry, page surface variants, and standard content frame/gutter | `src/design-system/page-shell.css` |
| Global base typography, default icon box, logo rendering and reset | `src/styles/global.css` |
| Registered reusable layout patterns | `src/design-system/layouts.js` |
| Global responsive layout contract | `src/design-system/mobile-layout-contract.css` and `MOBILE-LAYOUT-CONTRACT.md` |
| App stylesheet import order and runtime entry | `src/main.js` |
| Page-specific composition and behavior | The owning `src/features/<feature>/` module only |

The shared shell modifiers `.pl-page-shell--surface` and `.pl-page-shell--standard-content` are the required source for pages using the common surface and standard content frame. The shell owns the outer page gutter; the child main content must not add a second page gutter. Do not create another token file, icon registry, shared component registry, shell implementation, or global CSS scale inside a feature folder.

## 3. Current runtime baseline — inspect, do not guess

The following values are already present in the runtime and are the starting reference for implementation. Their formal approval status remains whatever the relevant foundation register says; this index does not silently upgrade provisional values.

| Dimension | Current runtime source/value |
|---|---|
| Base spacing unit | `--pl-unit: 4px` |
| Spacing steps | `--pl-space-1..6`: 4, 8, 12, 16, 20, 24px; `--pl-space-8/10/12/16`: 32, 40, 48, 64px |
| Standard page gutter | `--pl-page-gutter`: 24px desktop; 10px at <=767px |
| Wide container | `--pl-container-wide: 1180px` |
| Auth container | `--pl-container-auth: 1120px` |
| Form width | `--pl-form-width: 460px` |
| Responsive token breakpoints | `--pl-breakpoint-mobile: 480px`; tablet: 768px; desktop: 1024px |
| Shell header | 82px desktop/tablet; 68px mobile |
| Header-to-content gap | `--pl-shell-header-content-gap: 50px` |
| Standard card radius | `--pl-radius-card: 10px` |
| Other radius tokens | 8px, 14px, 20px, 28px, pill |
| Brand symbol | 34 × 34px |
| Default icon box | 20 × 20px via `.ui-icon` in `src/styles/global.css` |
| Base body text | 16px; family from `--pl-font-sans` |

The runtime may still contain historical local values and provisional dimensions. Those are not permission to copy them into a new page. When a needed global value has no canonical token/register entry, record the gap and follow the foundation change process before use.

## 4. Icon rule

- Search `src/design-system/icons.js` and the canonical Icon Library inventory first.
- Use the exact registered icon name through `renderIcon()`; do not redraw an icon, paste a one-off SVG, use emoji as a substitute, or introduce a second icon package.
- Preserve the same icon artwork across the product. Only a documented size variant may change its rendered dimensions.
- Default runtime icon box is 20 × 20px (`.ui-icon`). If the required size variant is not registered, add it through the foundation review/change process; do not set arbitrary width/height in page CSS.
- Record new icons in both the runtime registry and the canonical icon inventory in the same work item.

## 5. Component and layout rule

Before writing markup, search the Component Library, Layout Patterns, `layouts.js`, and existing shared renderers.

- Reuse the component if it exists.
- Use documented variants/slots when the content or layout differs.
- If the component is missing, document the gap and propose a reusable platform component before implementing a page-local substitute.
- Page-specific composition belongs to the feature. Shared visual behavior and dimensions belong to the shared component/tokens.
- A component may have responsive variants, but those variants must be registered and consistent wherever that component is used.
- Header, brand, footer, and shell must use canonical renderers when present. Do not reproduce their markup or geometry locally.

## 6. Mandatory pre-coding checklist

Record this checklist in the work/PR description before implementation:

- [ ] Target route, feature owner, user purpose, page states, and approved Product Design spec identified.
- [ ] Existing page and sibling pages inspected for reusable patterns.
- [ ] Relevant design tokens and their exact values/status checked.
- [ ] Existing icon identified by registry ID/name; icon size source checked.
- [ ] Existing component and variants checked; no duplicate component is being created.
- [ ] Existing layout pattern and shared shell/container checked.
- [ ] Responsive contract and supported viewport widths checked.
- [ ] Existing feature CSS, cascade, breakpoints, and duplicate selectors audited.
- [ ] Shared consumers and regression surfaces identified.
- [ ] Missing standards or exceptions documented before implementation.

If any item cannot be checked, stop and resolve the missing information. Do not fill the gap with an arbitrary number or local workaround.

## 7. Rules while implementing

1. Use tokens for all platform-wide values. Do not hard-code a second global spacing, color, type, radius, shadow, container, or breakpoint scale.
2. Use the registered icon and component sources. Do not clone them in page markup/CSS.
3. Keep page-specific CSS under the owning feature root and scoped to that page/feature.
4. Do not add late overrides to compensate for earlier conflicting rules. Edit the original owning rule and remove obsolete duplicates.
5. Do not redefine shared shell geometry, page gutters, logo dimensions, default icon dimensions, or shared control dimensions in feature styles.
6. A unique dimension is allowed only when it is truly intrinsic to that page's content composition (for example, a product image aspect ratio or a particular card's content layout), not as a substitute for a missing shared standard.
7. If a reusable pattern is created, register its ID, dimensions, responsive behavior, variants, consumers, source data owner, and tests.
8. If a global standard must change, change its canonical source once, audit every consumer, update documentation/tests, and migrate affected pages in the same controlled work item.

## 8. Exceptions and missing standards

A page-local exception is not an informal shortcut. It requires:
- exact requirement and reason the shared component cannot satisfy it;
- scope and affected viewport/state;
- impact on consistency/accessibility;
- proposed implementation and migration implications;
- product-owner approval;
- a registered exception ID and expiry/review condition where appropriate.

If a token, icon, component, or pattern is absent, add a gap record to its canonical library. Never silently invent it in the page stylesheet.

## 9. Completion checklist

- [ ] Page uses the shared tokens, icon registry, components, shell, and layout patterns wherever available.
- [ ] No duplicate global values, icon artwork, or shared component implementation introduced.
- [ ] CSS ownership and cascade remain clear; no override pile or conflicting duplicate selector.
- [ ] Relevant responsive widths tested: 320, 360, 390, 430, 768, 1024, and 1440px (plus any documented edge case).
- [ ] Relevant page states, keyboard/focus behavior, overflow, and touch interactions checked.
- [ ] Shared consumer regression tests/build pass.
- [ ] Canonical docs/registers and implementation mapping updated in the same work item.
- [ ] PR records exact foundation resources, exceptions, tests, commit and deployment evidence.
- [ ] Browser/device UAT is explicitly marked pending unless it was actually performed.

## 10. Definition of done

A page is not complete merely because it looks acceptable in isolation. It is complete when it is demonstrably composed from the same PLUITS foundation as the rest of the product, its differences are explained by its layout/content purpose, and its shared dependencies pass regression checks.
