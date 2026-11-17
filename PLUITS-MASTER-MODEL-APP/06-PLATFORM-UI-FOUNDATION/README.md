# PLUITS Platform UI Foundation

Status: **FOUNDATION SETUP — standards and values are not yet fully approved.**

This folder is the cross-platform source of design and interface rules for every PLUITS page and ecosystem. It defines the approved materials, measurements, reusable components, layout patterns, interaction patterns, and the procedures required to design, implement, review, and change an interface.

It is deliberately a separate top-level workstream inside `PLUITS-MASTER-MODEL-APP/`. It is not owned by Social Media, Marketplace, or another individual ecosystem.

## Core principle

**Every page may have a different purpose, composition, content, and behavior, but it must use the same approved platform foundation.**

A page must not independently invent global measurements, typography, colors, logo usage, icon treatment, component styles, or responsive rules. If an approved resource does not exist, the gap must be reported for review rather than silently sourcing or inventing a replacement.

## What this folder governs

- Design tokens and visual measurements.
- Responsive breakpoints, containers, grids, and viewport behavior.
- Official brand assets and their usage.
- Typography and font assets.
- The approved icon catalogue.
- Shared UI components and their variants/states.
- Reusable layout and interaction patterns.
- Design/development SOP, quality checks, and change control.
- The mapping between these standards and their implementation in the runtime codebase.

## Directory map

```text
06-PLATFORM-UI-FOUNDATION/
├── 00-FOUNDATION-GOVERNANCE.md
├── 01-DESIGN-TOKENS/
├── 02-RESPONSIVE-SYSTEM/
├── 03-BRAND-ASSETS/
├── 04-TYPOGRAPHY/
├── 05-ICON-LIBRARY/
├── 06-COMPONENT-LIBRARY/
├── 07-LAYOUT-PATTERNS/
├── 08-INTERACTION-PATTERNS/
├── 09-DESIGN-AND-DEVELOPMENT-SOP/
├── 10-QUALITY-AND-CHANGE-CONTROL/
└── 11-IMPLEMENTATION-MAPPING/
```

Each numbered folder owns one specific area. Its README defines the scope and the material that belongs there.

## Where rules belong

- Platform-wide visual and interface rules belong here, with the governing policy in `00-FOUNDATION-GOVERNANCE.md`.
- Page purpose, user needs, page inventory, content hierarchy, and page-specific UX decisions belong in `02-PRODUCT-DESIGN/`.
- Technical module boundaries, source-code ownership, API/data contracts, security, testing infrastructure, deployment, and rollback belong in `03-APPLICATION-MODULARIZATION/`.
- Actual production implementation belongs in the runtime source folders, not in this documentation folder.

The other areas must link to this foundation rather than copy its global rules.

## Approval status

The directory and governance workflow are established first. Specific values, fonts, icon selections, component specifications, and responsive breakpoints remain **proposed / pending audit** until they are reviewed and explicitly approved. Illustrations or examples are not automatically approved standards.

## Required workflow

1. Read the governance document.
2. Read the relevant foundation standards.
3. Read the target page's Product Design specification.
4. Check existing runtime implementation and module boundaries.
5. Reuse approved assets, tokens, components, and patterns.
6. Report missing resources or conflicting requirements before inventing replacements.
7. Implement, test all relevant viewports, perform impact analysis, and document the result.
