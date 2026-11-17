# UI Technology Decision Register

All recommendations below are **proposed** until explicitly approved.

| ID | Technology / choice | Current state | Proposed decision | Status |
|---|---|---|---|---|
| UI-TECH-001 | HTML + JavaScript ES modules | In use | Retain; do not rewrite the app during foundation setup | Proposed to continue |
| UI-TECH-002 | Vite 8 | In use; `^8.3.0` in package.json | Retain as dev server/build tool | Proposed to continue |
| UI-TECH-003 | Native CSS | In use | Retain; no competing CSS framework for now | Proposed to continue |
| UI-TECH-004 | CSS custom properties | In use in design-system tokens and legacy styles | Retain and consolidate ownership/aliases | Proposed to consolidate |
| UI-TECH-005 | CSS Grid/Flexbox/media queries | In use | Retain; audit thresholds and page overrides | Proposed to continue |
| UI-TECH-006 | CSS container queries | Not confirmed as a current standard | Use selectively for reusable components whose layout depends on parent width | Proposed |
| UI-TECH-007 | Local inline SVG registries | In use | Retain; audit duplicates and semantic consistency | Proposed to consolidate |
| UI-TECH-008 | System UI font stack | In use | Retain until a licensed local font is selected | Proposed to continue |
| UI-TECH-009 | Supabase JS from esm.sh | In use; version pinned in import URL | Move to a pinned npm dependency and lockfile in a separate change | Proposed |
| UI-TECH-010 | Node `node:test` | In use in CI | Retain for unit, contract, and architecture checks | Proposed to continue |
| UI-TECH-011 | Playwright | Not installed/configured | Add later for browser, viewport, keyboard, and touch regression | Proposed, phase 2 |
| UI-TECH-012 | PWA manifest + service worker | In use | Retain; evaluate native wrapper only against a concrete requirement | Proposed to continue |
| UI-TECH-013 | React/Vue/Svelte | Not used by current runtime dependency set | Do not introduce during current foundation work | Deferred |
| UI-TECH-014 | Tailwind/Bootstrap | Not used by current runtime dependency set | Do not introduce during current CSS consolidation | Deferred |
| UI-TECH-015 | Storybook | Not installed/configured | Reassess when shared components are stable and numerous enough | Deferred |
| UI-TECH-016 | TypeScript | Current source is JavaScript | Keep JS; use JSDoc contracts first, reassess later | Deferred |

## Approval rule

A status of `Proposed` or `Deferred` is not authorization to install or migrate. Record a product-owner decision before changing dependencies, runtime architecture, or shared styles.
