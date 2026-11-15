# PLUITS — Change-Scope Safety Checklist

Status: Active engineering guardrail  
Applies to: every frontend change, including small visual fixes.

This checklist exists for one reason: a change to one page or feature must not silently damage another. It complements, and does not replace, the existing Modularization Acceptance Contract, Frontend Module Map, Frontend Module Contracts, and Engineering Delivery SOP.

## 1. Before editing — identify the owner

- [ ] Confirm current base branch and commit; work on a task-specific branch, never directly on `main`.
- [ ] Identify the canonical route and its page controller in `PAGE-ROUTE-AND-SECTION-REGISTRY.md`.
- [ ] Identify the exact section/component/feature that owns the requested behavior.
- [ ] Find every importer, renderer, event binder, CSS selector, asset, icon and route consumer.
- [ ] Identify service, Supabase table/RPC, Storage, Realtime and authorization dependencies where relevant.
- [ ] Record the requested outcome and the behavior/design that must remain unchanged.
- [ ] Classify the change as page-local, feature-local, shared-component, design-system, routing, or backend-contract work.

## 2. Define the change boundary

Before coding, write down:

| Boundary | Required record |
|---|---|
| Primary owner | Exact page, feature, component or service |
| Allowed files | Files expected to change |
| Consumers | Routes/features that use the owner |
| Protected surfaces | Pages and behavior that must not change |
| Shared dependencies | Tokens, icons, assets, services, route contracts |
| Risk | Low / medium / high, with reason |
| Rollback | Smallest revertable unit |

If a shared dependency must change, expand the consumer map and test scope first. Do not silently widen the change.

## 3. During implementation

- [ ] Reuse existing token, icon, asset, component and service contracts before creating another implementation.
- [ ] Keep page composition in `src/pages/`, reusable capability behavior in `src/features/`, shared UI in `src/components/`, visual foundations in `src/design-system/`, and backend communication in `src/services/`.
- [ ] Keep component/feature CSS under an owned namespace: `.pl-*`, `.ua-*`, `.ds-*`, or `.plds-*`.
- [ ] Do not add broad global selectors to fix a local page.
- [ ] Do not make a page-specific change in a shared component unless all consumers are intentionally included.
- [ ] Do not change unrelated layout, copy, spacing, icon artwork, route behavior, schema, RLS or data.
- [ ] Keep cleanup/refactoring separate from the requested behavior change where possible.
- [ ] Remove listeners/subscriptions on unmount and preserve existing loading, empty, error and offline states.

## 4. Required verification

- [ ] Run the relevant focused tests.
- [ ] Run `npm test` (includes production-surface and JS/CSS module-boundary checks).
- [ ] Run `npm run build`.
- [ ] Inspect the complete diff for unrelated changes and accidental global selectors.
- [ ] Test the changed route and every consumer of changed shared code.
- [ ] Check responsive behavior at 320, 360, 390 and 430 CSS px, then tablet and desktop.
- [ ] Check keyboard/focus, touch targets, overflow, image/video aspect ratio and safe areas where relevant.
- [ ] If a real browser/device test was not performed, record it as NOT TESTED.

## 5. Pull request evidence

Every PR description must state:

1. What was requested and which owner was changed.
2. Exact files changed and why.
3. Consumers and protected pages checked.
4. Commands run and their actual results.
5. Browser/device checks performed versus NOT TESTED.
6. Remaining risks and rollback path.

## 6. Completion states

Never collapse these states:

- `IMPLEMENTED`: code exists.
- `TESTED`: required automated/focused checks passed.
- `PREVIEWED`: preview deployment exists and its URL is verified.
- `ACCEPTED`: founder has reviewed and explicitly accepted.
- `DEPLOYED`: production deployment for the exact commit is verified.

A folder, README, successful build, or successful deployment alone does not mean a feature is accepted.

## 7. Scope rule

If the task is to fix one small thing, change only its owner and the minimum required dependencies. If investigation proves another owner must change, explain why in the PR and test all affected consumers. Do not claim isolation merely because files live in separate folders.
