# UI Technology Decision Register

The professional engineering standard is a requirement. Individual runtime technologies below are proposed target choices and must be adopted through scoped, tested changes.

| ID | Technology / choice | Current state | Target direction | Status |
|---|---|---|---|---|
| UI-TECH-001 | React | Not installed in audited runtime | Adopt for complex new UI modules and incremental module migration | Proposed target |
| UI-TECH-002 | TypeScript strict | Current app is JavaScript | Adopt incrementally; enforce types for new module contracts | Proposed target |
| UI-TECH-003 | Vite 8 | In use | Retain as build/dev tool | Continue |
| UI-TECH-004 | React Router | Current custom routing exists | Introduce only with a bounded React route migration | Proposed target |
| UI-TECH-005 | CSS Modules + CSS custom properties | Native CSS and tokens currently exist | Use scoped component styles with shared global tokens | Proposed target |
| UI-TECH-006 | CSS Grid/Flexbox/media/container queries | In use | Retain and consolidate responsive rules | Continue |
| UI-TECH-007 | TanStack Query | Not installed | Use for remote/server state where caching and synchronization are needed | Proposed target |
| UI-TECH-008 | Zustand | Not installed | Use only for proven shared client state; local state by default | Conditional |
| UI-TECH-009 | React Hook Form + Zod | Not installed | Use for complex validated forms in React modules | Proposed target |
| UI-TECH-010 | Supabase JS npm package | SDK imported from esm.sh | Move to pinned npm dependency and lockfile | Proposed |
| UI-TECH-011 | Generated Supabase TypeScript types | Not confirmed as enforced | Generate and use typed database contracts | Proposed target |
| UI-TECH-012 | Local inline SVG registry | In use | Retain; audit duplicates and semantics | Continue |
| UI-TECH-013 | System UI font stack | In use | Retain until an approved font is selected | Continue |
| UI-TECH-014 | Node node:test | In use in CI | Retain for architecture and repository checks | Continue |
| UI-TECH-015 | Vitest + React Testing Library | Not installed | Add for new React module logic and component behavior | Proposed target |
| UI-TECH-016 | Playwright | Not installed/configured | Add for browser, viewport, keyboard, touch, and end-to-end regression | Proposed target |
| UI-TECH-017 | ESLint + Prettier | Not confirmed as enforced | Add as standard code-quality gates | Proposed target |
| UI-TECH-018 | GitHub Actions | In use | Extend CI gates as the stack is adopted | Continue |
| UI-TECH-019 | PWA manifest + service worker | In use | Retain and regression-test | Continue |
| UI-TECH-020 | Next.js / SSR | Not in use | Defer until server rendering or hosting requirements justify it | Deferred |
| UI-TECH-021 | Tailwind / Bootstrap | Not in use | Defer; keep one token-led styling system | Deferred |
| UI-TECH-022 | Storybook | Not installed | Reassess after shared component library stabilizes | Deferred |
| UI-TECH-023 | Native wrapper (Capacitor, etc.) | Not in use | Defer unless a native-only capability is required | Deferred |

## Adoption rule

- A **professional engineering standard** is mandatory.
- A **Proposed target** is the recommended technology direction, not evidence that it is already installed.
- Each adoption must be scoped, version-pinned, documented, tested, and reversible.
- No full application rewrite. Preserve existing working pages and migrate bounded modules incrementally.
