# 12 — Technology and Tooling

Status: **CURRENT STACK AUDITED — PROFESSIONAL TARGET STACK PROPOSED.**

## 1. Purpose and engineering bar

PLUITS must be engineered to the standard expected of a professional senior web-development team: maintainable architecture, explicit module boundaries, typed contracts, secure data access, predictable dependency management, automated quality gates, accessibility, responsive behavior, performance budgets, and regression evidence.

The objective is not to collect fashionable packages. Every technology must solve a real engineering need, fit the platform architecture, be maintained, and be testable.

This register evaluates technologies used to design, build, render, and validate the PLUITS user interface. It does not replace 03-APPLICATION-MODULARIZATION, which owns the overall application architecture, backend, database, security, API contracts, hosting strategy, and deployment architecture.

## 2. Current runtime audit — as-is

The following points were checked against the current main branch:

| Area | Current evidence |
|---|---|
| Frontend language | JavaScript ES modules; source is organized into app, components, features, pages, services, and design-system folders. |
| Build tool | Vite ^8.3.0; configured for the /pluits/ GitHub Pages base path. |
| CSS | Native CSS imported through the Vite entry point. No Tailwind, Bootstrap, Sass, or CSS-in-JS dependency is declared. |
| Design tokens | CSS custom properties in src/design-system/tokens/foundation.css; legacy global values remain in src/style.css. |
| Layout | Native CSS Grid/Flexbox and namespaced, opt-in plds-* layout primitives. |
| Icons | Repository-owned inline SVG registries exposed through src/design-system/icons/index.js. |
| Typography | System UI font stack; no bundled local font files were found in the asset registry. |
| Backend client | Supabase JS 2.119.0 imported from esm.sh; not currently declared as an npm dependency. |
| PWA | Web app manifest and service worker are present. |
| Tests | Node node:test plus custom production, module-boundary, style-boundary, and design-system checks. |
| Browser automation | Playwright is not currently declared or configured in the workflow. |
| CI and hosting | GitHub Actions uses Node 22, npm ci, npm test, vite build, and deploys static output to GitHub Pages. |

This is the current state, not the final professional target. Existing implementation choices must not be misrepresented as already upgraded.

## 3. Recommended professional target stack

The following is the recommended target for new and progressively migrated application modules. It is intentionally compatible with the existing Vite/static deployment path.

| Layer | Target technology | Why it belongs |
|---|---|---|
| UI framework | **React** | Mature component model for complex, interactive, multi-module application interfaces and shared UI composition. |
| Main language | **TypeScript with strict checking** | Catches invalid data shapes and interface mismatches earlier; makes module contracts and refactoring safer. |
| Build and dev server | **Vite 8** | Already used by PLUITS; fast development and static production builds compatible with current GitHub Pages hosting. |
| Routing | **React Router** when React modules are introduced | Explicit route nesting, layouts, route parameters, and navigation boundaries. Existing routing remains until a scoped migration is ready. |
| Styling | **CSS Modules + shared CSS custom properties** | Component-level style isolation while preserving one platform-wide token system. |
| Layout | **CSS Grid, Flexbox, fluid sizing, media queries, selective container queries** | Native responsive layout without forcing every page into a framework's layout conventions. |
| Remote/server state | **TanStack Query**, where server-state caching and synchronization are needed | Standardizes loading, cache invalidation, retries, and asynchronous server data lifecycle. |
| Local shared UI state | **Zustand only when cross-component state warrants it** | Lightweight shared client state; local state remains local. Avoid introducing a global store for every input. |
| Forms | **React Hook Form + Zod** for complex forms | Efficient form state and explicit runtime validation schemas. |
| Backend client | **Supabase JS installed as a pinned npm dependency** | Reproducible builds, lockfile governance, and consistent SDK usage. |
| Data contracts | **Generated Supabase TypeScript database types + validated boundary schemas** | Reduces hand-written database shape drift; validate untrusted input at application boundaries. |
| Unit/component tests | **Vitest + React Testing Library** for React modules | Fast tests for logic and user-observable component behavior. |
| Existing architecture tests | **Keep Node node:test checks** | Retain current production-surface, module-boundary, and repository-specific checks. |
| End-to-end/browser tests | **Playwright** | Verify critical user journeys, viewport behavior, keyboard access, touch interaction, and real browser rendering. |
| Code quality | **ESLint + Prettier + TypeScript typecheck** | Consistent code style, static analysis, and a repeatable quality gate. |
| CI/CD | **GitHub Actions** | Run install, lint, typecheck, tests, production build, and deployment gates on every relevant change. |
| Installable web app | **Keep the existing PWA manifest and service worker** | Preserve the current installable web application direction. |

### Framework and styling decisions

- **React + TypeScript is the recommended target** for complex new UI modules and future module-level migrations. It is not currently installed in the audited runtime.
- **Vite remains the build system.** There is no current reason to replace it with Next.js while the deployed application is a static Vite app on GitHub Pages.
- **CSS Modules plus shared design tokens** are the preferred styling direction. Do not introduce Tailwind or Bootstrap alongside the foundation unless a documented comparison proves a concrete benefit.
- **Next.js / server rendering** may be reconsidered if public-page SEO, server-side rendering, or server runtime requirements justify moving beyond static hosting. That decision belongs to platform architecture and hosting review, not a casual UI dependency addition.

## 4. Adoption and migration policy

This target stack is not permission for a big-bang rewrite.

1. Preserve all currently working pages, routes, authentication, PWA behavior, and deployed surfaces.
2. Complete the source/module boundary and route-consumer audit before selecting a migration boundary.
3. Add TypeScript and quality tooling in a way that can coexist with the current JavaScript modules.
4. Introduce React only in a bounded module or route with explicit ownership and integration contracts.
5. Do not maintain two competing implementations of the same page or shared component after a migration is accepted.
6. Migrate module-by-module only when tests and rollback boundaries exist.
7. Keep the existing Vite build and GitHub Pages deployment working throughout the transition.
8. Add each dependency with a pinned, reviewed version and committed lockfile update.
9. Run the full existing test suite plus new tests for the migrated module before deployment.

## 5. Technologies not recommended for immediate adoption

- **A full Next.js migration:** defer until SSR/server runtime and hosting requirements are proven.
- **Tailwind / Bootstrap:** do not add a second global styling vocabulary while CSS tokens and component ownership are being consolidated.
- **Remote icon fonts or icon CDNs:** keep the repository-owned SVG registry.
- **Unreviewed remote fonts:** retain the system font stack until a font is selected, licensed, and approved.
- **Storybook:** reassess once the shared component library has enough stable components to justify a separate workbench.
- **Capacitor or another native wrapper:** keep the PWA path unless a concrete native-only capability is required.
- **A global state library everywhere:** use local state first; introduce shared state only for a proven cross-module need.

Deferral is not a permanent ban. A proposal must explain the problem, alternatives, migration impact, performance and bundle cost, license, maintenance burden, and rollback path.

## 6. Current gaps to resolve

1. **Responsive values are not one approved system.** Runtime styles contain thresholds such as 340, 360, 420, and 760 pixels. These are observations, not approved breakpoints.
2. **Container widths vary by page.** Inventory consumers before consolidation.
3. **Legacy and foundation styling coexist.** Reconcile src/style.css with design-system token ownership before changing the cascade.
4. **Icon registries overlap.** Review actual visual output before merging or replacing icons.
5. **Supabase SDK is loaded externally.** Move it to a pinned npm dependency in a separate tested change.
6. **Browser-level regression is missing.** Current structural tests do not replace viewport, keyboard, touch, and end-to-end browser tests.
7. **Type safety is not yet enforced across the app.** Establish an incremental TypeScript adoption plan before migrating complex modules.

## 7. Proposed implementation sequence

1. Audit routes, module ownership, component consumers, CSS, tokens, and asset dependencies.
2. Approve the platform responsive/token/typography/icon foundation.
3. Add professional code-quality gates: ESLint, Prettier, and TypeScript typecheck, without changing rendered behavior.
4. Move Supabase JS into the pinned npm dependency graph; verify auth, realtime, and storage.
5. Introduce TypeScript incrementally, beginning with isolated contracts and new modules.
6. Pilot React + TypeScript in one bounded module after its product design and integration contract are approved.
7. Add Vitest and React Testing Library for new React modules; retain existing Node tests.
8. Add Playwright for critical user journeys and agreed responsive viewports.
9. Expand the architecture only after the pilot proves the migration safe and maintainable.

## 8. Professional engineering acceptance gate

A production change is not complete because the page merely renders. The change must satisfy the relevant gates:

- Clear module ownership and no unintended cross-module coupling.
- Typed or explicitly validated data contracts at module and API boundaries.
- Authentication and authorization enforced by backend policy, not UI visibility alone.
- No secrets committed to frontend code or repository.
- Accessible semantic markup, keyboard operation, and visible focus states.
- Responsive behavior verified on agreed viewport sizes and real browser engines.
- Loading, empty, error, success, and permission-denied states handled.
- Tests cover changed behavior and critical regressions.
- No unexplained console errors, broken routes, or failing production build.
- Performance and bundle impact reviewed for new dependencies.
- Documentation, decision register, and runtime implementation mapping updated.
- Deployment status and commit SHA recorded.

## 9. Decision and change record

Every technology must have an owner, reason, status, source/version, license, runtime/bundle implications, affected modules, test plan, and rollback/removal plan.

The professional engineering bar is mandatory. Exact framework adoption and migration boundaries must still be recorded and approved before runtime changes are made.

## 10. Official references

- [React documentation](https://react.dev/learn)
- [TypeScript handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Vite 8 production build](https://v8.vite.dev/guide/build)
- [React Router documentation](https://reactrouter.com/start/library/installation)
- [TanStack Query documentation](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Zustand documentation](https://zustand.docs.pmnd.rs/getting-started/introduction)
- [React Hook Form documentation](https://react-hook-form.com/get-started)
- [Zod documentation](https://zod.dev/)
- [Supabase JavaScript installation](https://supabase.com/docs/reference/javascript/installing)
- [Vitest documentation](https://vitest.dev/guide/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright documentation](https://playwright.dev/docs/intro)
- [ESLint documentation](https://eslint.org/docs/latest/)
- [Prettier documentation](https://prettier.io/docs/)
