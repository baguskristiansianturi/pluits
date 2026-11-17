# PLUITS — Agent and Engineering Instructions

## Current product-owner directive (17 November 2026)

The product owner explicitly authorized a clean replacement of the old frontend runtime. This is a scoped exception to the earlier default preference for incremental migration.

- Remove the old frontend runtime source, legacy UI tests, and obsolete frontend verification scripts when replacing this runtime.
- Build the new frontend in clear, isolated modules with one shared UI foundation.
- Do not merge old page/component/CSS implementations into the new runtime.
- Preserve the Master Model documentation, Sharing Inbox, Supabase migrations, backend contracts, database schema, Auth users, profiles, wallet records, media, messages, and all existing user data.
- Frontend cleanup is not permission to reset, truncate, recreate, or otherwise modify production data or backend security.
- Do not change Supabase Auth configuration, SMTP, password policy, RLS, triggers, functions, or migrations without a separate explicit scope and impact plan.
- The initial authenticated destination is an internal development workspace for discussion and review. It is not the final Global Home or public Social Media experience.
- Build sequence: Registration → Global Home → Primary Profile → Social Media. Each stage requires user review and acceptance before moving on.

## Mandatory starting point

1. Read PLUITS-MASTER-MODEL-APP/README.md and PLUITS-MASTER-MODEL-APP/00-START-HERE.md.
2. Read the account/membership master model and decision log.
3. Read the relevant ecosystem, Product Design, and Application Modularization documents for the requested scope.
4. Read PLUITS-SHARING-INBOX/README.md when processing discussion notes. Inbox material is raw input until reviewed and approved.
5. Inspect actual source paths, routes, imports, tests, workflows, database migrations, and backend contracts before implementation.

## Authority and status

- Explicit product-owner decisions take precedence over older defaults where they directly conflict.
- Approved Master Model requirements are authoritative; Sharing Inbox notes remain raw until accepted.
- Source code and applied database migrations show what is actually implemented. Documentation alone is not proof of runtime behavior.
- Keep statuses distinct: PROPOSED, IN-DESIGN, APPROVED, IMPLEMENTED, DEPLOYED, TESTED, and ACCEPTED.

## Required change workflow

1. Capture the request and clarify its intended outcome.
2. Identify the owner of the page, feature, component, token, service, data contract, and deployment surface.
3. Inspect imports, consumers, dependencies, backend tables/RPCs, security policies, and tests.
4. Read protected boundaries and identify the exact files allowed to change.
5. Write or update a Change Map for cross-module/shared changes.
6. Implement only the scoped change; do not refactor unrelated areas.
7. Run automated tests and production build.
8. Inspect affected mobile/desktop states and run regression checks.
9. Verify GitHub Actions and deployment status before claiming success.
10. Record exact changed paths, commit SHA, test/build evidence, deployment status, and remaining UAT.

## Strict module boundaries

- app/ owns bootstrap, routing, guards, and lifecycle.
- features/ owns user-facing feature behavior and page-scoped UI.
- services/ owns business/service logic and data access orchestration; it must not render HTML or access page DOM.
- lib/ owns low-level SDK clients and adapters.
- design-system/ owns tokens, icon registry, and layout/interaction patterns.
- styles/ owns only truly global resets and base styles.
- Feature styles must be scoped to their feature root.
- Services must not import features, pages, components, or design-system UI.
- Features must not import app/page internals or sibling feature internals.
- A shared token/component change requires consumer impact analysis.
- Do not invent source paths or assume a README-only module is implemented.

## Live application and data safety

- Treat Supabase as production with real users and real data.
- Never delete or rewrite applied migrations, Auth users, profiles, posts, media, messages, wallet balances, orders, or settings as part of frontend work.
- Never expose service-role or secret keys in browser code, repository files, build artifacts, or logs.
- Do not use user_metadata as a source of authorization.
- Do not duplicate profile/wallet creation already handled by database triggers.
- Backend authorization and RLS are mandatory; hiding a button is not security.
- Any database/security/permission/credential change requires a separate scope, validation, and rollback plan.

## UI Foundation rules

- Follow the documented sequence: dimensions → icons → colors → behavior → layout.
- Use one canonical token and icon registry; do not scatter arbitrary global values.
- New token values and layouts must be marked PROVISIONAL until the product owner approves them.
- Do not add external fonts, icon packages, UI frameworks, or runtime dependencies without a reviewed reason and approval.
- Keep page styles scoped; no global CSS override to fix one page.
- Every reusable layout/component must have an owner, identity, status, usage rules, and consumer mapping.

## Testing and deployment

- npm test must run architecture and production-surface checks plus unit tests.
- npm run build must produce a valid Vite production build.
- Pull Requests validate and upload artifacts; only main deploys to GitHub Pages.
- Do not claim browser UAT, email delivery, or real-account authentication has passed until it has been tested.
- Keep the site noindex during internal testing until public launch is approved.
