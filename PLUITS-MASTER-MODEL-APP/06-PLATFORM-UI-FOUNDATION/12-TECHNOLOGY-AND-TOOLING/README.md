# 12 — Technology and Tooling

Status: **AUDIT COMPLETE — recommendations are PROPOSED, not yet approved for implementation.**

## 1. Purpose and boundary

This register evaluates technologies needed to design, build, render, and validate the PLUITS user interface.

It does not replace `03-APPLICATION-MODULARIZATION/`, which owns the overall application architecture, backend, database, security, API contracts, hosting strategy, and deployment architecture.

The goal is to extend the existing working application safely—not to replace its stack simply to adopt a fashionable framework.

## 2. Runtime audit — what exists today

The following points were checked against the current `main` branch:

| Area | Current evidence |
|---|---|
| Frontend language | JavaScript ES modules; runtime source is organized into app, components, features, pages, services, and design-system folders. |
| Build tool | Vite `^8.3.0`; the project is configured for the `/pluits/` GitHub Pages base path. |
| CSS | Native CSS files imported through the Vite entry point. No Tailwind, Bootstrap, Sass, or CSS-in-JS dependency is declared. |
| Design tokens | CSS custom properties in `src/design-system/tokens/foundation.css`; legacy global values also remain in `src/style.css`. |
| Layout | Native CSS Grid/Flexbox and namespaced, opt-in `plds-*` layout primitives. |
| Icons | Repository-owned inline SVG registries exposed through `src/design-system/icons/index.js`; no icon font or icon CDN is used by the facade. |
| Typography | System UI font stack; no bundled local font files were found in the asset registry. |
| Backend client | Supabase JS `2.119.0` is imported from `esm.sh` in `src/lib/supabase/client.js`; it is not currently declared as an npm dependency. |
| PWA | Web app manifest and service worker are present. |
| Tests | Node's built-in `node:test` runner plus custom production, module-boundary, style-boundary, and design-system checks. |
| Browser automation | Playwright is not currently declared as a dependency or configured in the workflow. |
| CI and hosting | GitHub Actions uses Node 22, `npm ci`, `npm test`, `vite build`, and deploys the static build to GitHub Pages. |

This is an as-is audit. Existing values in source code are not automatically approved as the future global standard.

## 3. Recommended UI technology direction

| Area | Recommendation | Status | Reason |
|---|---|---|---|
| Frontend foundation | Keep HTML + JavaScript ES modules + Vite 8 | **RECOMMENDED — continue** | Already deployed, modular, and compatible with the current static hosting model. |
| UI framework | Do not migrate to React, Vue, or Svelte now | **DEFER** | A framework migration would touch routing, page rendering, components, and tests across a live app. No current evidence proves that the migration is necessary. Re-evaluate only if measured complexity justifies it. |
| Styling | Keep native CSS | **RECOMMENDED — continue** | Existing page styles and opt-in design-system primitives are already CSS-based. Avoid introducing a second styling system during foundation consolidation. |
| Design tokens | Keep CSS custom properties as the runtime token format | **RECOMMENDED — consolidate** | Values can be defined once and consumed by many components. Separate semantic tokens from legacy aliases and page-specific exceptions. |
| Layout | Use CSS Grid, Flexbox, fluid sizing, media queries, and container queries where component context requires them | **RECOMMENDED** | Native browser layout tools cover the current responsive needs without a CSS framework. |
| Shared components | Build framework-agnostic, reusable components with explicit variants and states | **RECOMMENDED — gradual** | Fits the existing JavaScript module architecture and avoids duplicating component logic. |
| Icons | Continue the local inline SVG registry | **RECOMMENDED — consolidate** | No runtime icon CDN/font request; artwork can be versioned and tested in the repository. Resolve duplicate/legacy names through an audited registry, not a blind replacement. |
| Fonts | Keep the system UI stack until a font is reviewed and approved | **RECOMMENDED — continue** | Avoids remote font requests and unapproved font licensing or visual changes. A future selected font should be locally bundled where licensing permits. |
| Supabase JS | Move the current pinned SDK import from the external `esm.sh` URL into a pinned npm dependency and lockfile | **RECOMMENDED — pending scoped change** | Makes dependency installation reproducible through `npm ci` and brings the SDK into the Vite build graph. Preserve the single shared client and verify auth/realtime/storage behavior after migration. |
| Unit and architecture tests | Keep Node `node:test` and the existing verification scripts | **RECOMMENDED — continue** | Already integrated into the CI gate and useful for pure logic, registries, contracts, and structural checks. |
| Browser and responsive tests | Introduce Playwright in a later, isolated test-only change | **RECOMMENDED — phase 2** | Needed to verify rendered behavior, navigation, touch interactions, and selected viewport sizes in real browser engines. It is not a replacement for the existing Node tests. |
| PWA | Keep the existing manifest and service-worker approach | **RECOMMENDED — continue** | The app already has an installable web-app foundation. Do not add a native wrapper unless a required device capability cannot be met by the web platform. |
| Component workbench | Reassess Storybook only after the shared component library is stable | **DEFER** | A workbench has maintenance value when there are enough stable, independently reusable components; it is not a prerequisite for creating the foundation. |
| Type system | Keep JavaScript for the current migration; use JSDoc for important contracts before considering TypeScript | **DEFER** | A whole-repository conversion would expand scope and is not required to centralize visual rules. |

## 4. Technologies not recommended for immediate adoption

- **React / Vue / Svelte:** no framework migration during the UI Foundation setup.
- **Tailwind / Bootstrap / another global CSS framework:** would add a competing styling vocabulary while the existing CSS and tokens are being reconciled.
- **Remote icon fonts or icon CDNs:** conflict with the repository-owned SVG catalogue and create another runtime dependency.
- **Unreviewed remote fonts:** keep the system stack until a font is selected, licensed, and approved.
- **Storybook:** defer until the shared component catalogue is sufficiently stable.
- **Capacitor or another native wrapper:** keep the PWA path unless a concrete native-only requirement appears.

These are deferrals, not permanent bans. Any future proposal must include the problem it solves, alternatives, migration impact, performance cost, license, maintenance burden, and rollback path.

## 5. Current gaps that must be audited before standards are locked

1. **Responsive values are not yet one approved system.** Runtime styles contain multiple media-query thresholds, including 340, 360, 420, and 760 pixels. Treat these as existing implementation evidence, not approved breakpoints.
2. **Container widths vary by page.** The foundation has shared width tokens, while page styles still contain narrower and wider local values. Inventory consumers before consolidating them.
3. **Legacy and foundation styling coexist.** `src/style.css` still defines legacy global palette and geometry values alongside the newer structural tokens. Reconcile aliases and ownership before changing the cascade.
4. **Icon registries overlap.** General, application, social, and legacy icon maps contain overlapping semantic names. Review their actual visual output before merging or replacing artwork.
5. **Supabase SDK is loaded externally.** The SDK version is pinned in the URL, but the package is absent from `package.json` and `package-lock.json`. A local npm dependency is the recommended next technical improvement, but it should be a separate tested change.
6. **Existing tests are mostly code/structure tests.** They do not replace browser-level viewport, keyboard, touch, and visual regression testing.

## 6. Proposed implementation sequence

1. Record the current route, component, CSS, token, and asset consumers without changing rendered pages.
2. Approve the responsive and token model using actual page comparisons and viewport tests.
3. Approve typography, brand assets, icon meanings, and shared component specifications.
4. Migrate the Supabase SDK import to the npm dependency graph in a separate change; run the complete test/build/deploy pipeline and verify authentication and realtime behavior.
5. Add Playwright as a separate test-only change, beginning with critical routes and a small agreed viewport matrix.
6. Expand the shared component library gradually, with impact analysis for every global change.

## 7. Decision and change record

Every technology must have an owner, reason, status, source/version, license, runtime/bundle implications, affected modules, test plan, and rollback or removal plan.

Do not install a new package or change the current framework solely because it appears in this proposal. Product-owner approval and a scoped implementation plan are required first.

## 8. Official references

- [Vite 8 — production build and static hosting](https://v8.vite.dev/guide/build)
- [Vite 8 release announcement](https://vite.dev/blog/announcing-vite8)
- [Supabase JavaScript — installation](https://supabase.com/docs/reference/javascript/installing)
- [Supabase JavaScript — client initialization](https://supabase.com/docs/reference/javascript/initializing)
- [Node.js test runner](https://nodejs.org/api/test.html)
- [Playwright — browser and device emulation](https://playwright.dev/docs/emulation)
- [MDN — CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties)
- [MDN — CSS media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries)
