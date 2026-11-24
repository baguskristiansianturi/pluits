# PLUITS — Agent and Engineering Instructions

## Mandatory starting point
1. Read `PLUITS-MASTER-MODEL-APP/README.md` and `PLUITS-MASTER-MODEL-APP/00-START-HERE.md`.
2. Read `PLUITS-MASTER-MODEL-APP/00-MASTER-FOUNDATION/README.md`, the account/membership master model, and the decision log.
3. Read the relevant ecosystem model, Product Design, and Application Modularization documents for the requested scope.
4. Read `PLUITS-SHARING-INBOX/README.md` when processing discussion notes. Inbox material is unapproved until explicitly sorted and accepted.
5. Inspect the actual current code, routes, database migrations, tests, workflows, and runtime evidence before implementation.
6. Before creating or changing any page/UI, complete `PLUITS-MASTER-MODEL-APP/06-PLATFORM-UI-FOUNDATION/09-DESIGN-AND-DEVELOPMENT-SOP/UI-FOUNDATION-PREFLIGHT-AND-CONSUMPTION-001.md`. This is mandatory; do not begin markup or page CSS until existing tokens, icons, components, layout patterns, responsive rules, and consumers have been inspected.

## Authority and status
- Approved requirements and decisions in the Master Model App are authoritative.
- Sharing Inbox content is raw input, not an approved requirement.
- Source code and applied database migrations show what is actually implemented; do not claim a feature works based only on a document.
- Keep statuses distinct: PROPOSED, IN-DESIGN, APPROVED, IMPLEMENTED, DEPLOYED, TESTED, and ACCEPTED.

## Required workflow
Sharing session → capture raw notes in one session file → sort into topics → clarify conflicts and dependencies → record explicit decisions → update the correct model/design/modularization documents → implement the approved scope → run tests/build → verify deployment → report exact evidence and remaining UAT.

## Strict module boundaries
- Every application and merchant workspace has explicit ownership.
- Before changing a feature, identify its owning route/page, feature module, components, styles, services, backend tables/RPCs, and tests.
- Modify only the requested module and its owned files. Do not refactor sibling modules as a side effect.
- Shared component, global CSS, shared service, authentication, database schema, or navigation changes require a consumer/dependency audit and explicit explanation of impact.
- Keep Marketplace as the customer-facing discovery/transaction layer. Store and Restaurant & Café own their merchant operations.
- Do not declare the platform fully modular until route/component/style/service ownership and regression checks support that claim.

## Live application safety
- Treat PLUITS as a live/published application with registered users and real data.
- Do not delete or rewrite applied migrations, production data, user accounts, posts, media, messages, or settings.
- Do not expose secrets, private test records, personal data, or credentials.
- Backend authorization is mandatory; frontend visibility is not security.
- Do not introduce fake products, orders, reviews, balances, engagement, or provider verification.
- Preserve existing behavior and unrelated UI. Work mobile-first.
- Before deleting any source file, inspect imports, routes, dynamic references, workflows, tests, and database dependencies; move unique required content first.
- Any database/security/permission/credential change requires explicit scope, validation, and rollback planning.

## Deployment and evidence
- Check `.github/workflows/deploy.yml` before changing workflow behavior. A push to `main` currently triggers the Pages pipeline.
- For code changes, run the required tests and production build; verify the workflow and deployment result.
- For documentation-only changes, confirm no application source, build configuration, or runtime assets changed. Do not claim deployment was required unless a deployment actually ran.
- Report exact commit SHA, workflow status, deployment status, tests/build result, and UAT state.


## Explicit product-owner directive — frontend replacement (17 November 2026)

The product owner explicitly authorized a clean replacement of the old frontend runtime. This is a scoped exception to the earlier default preference for incremental migration.

- Remove the old frontend runtime source, page/component/CSS implementations, legacy frontend tests, and obsolete frontend-only verification scripts when replacing this runtime.
- Build the new frontend in clear, isolated modules with one shared UI foundation. Do not merge old page/component/CSS implementations into the new runtime.
- Preserve all Master Model documentation, Sharing Inbox records, backend contracts, database design, and existing PLUITS user data until an approved replacement and migration are verified.
- PLUITS uses only its own Go API, PostgreSQL migrations, workers and self-hosted infrastructure. Do not add hosted-backend SDKs, provider-specific database clients, remote auth adapters or vendor deployment bindings.
- All domain schema, authorization rules, triggers, jobs and storage access must be implemented in PLUITS-owned services and tested before release.
- Do not introduce edge-provider-specific runtime code, DNS automation or deployment bindings into the repository.
- Preserve tests that verify backend security, database migrations, repository governance, deployment behavior, and PWA assets. Replace only tests that are coupled to deleted frontend implementations.
- The first authenticated destination is an internal development workspace for discussion and review. It is not the final Global Home or public Social Media experience, and it does not claim to provide an in-app chat system.
- Build sequence: Registration → Global Home → Primary Profile → Social Media. Each stage requires user review and acceptance before moving on.

## Frontend V2 module ownership

- app/ owns bootstrap, routing, auth guards, and lifecycle.
- features/ owns user-facing feature behavior and page-scoped UI.
- services/ owns business/service logic and data access orchestration; it must not render HTML or access page DOM.
- lib/ owns low-level SDK clients and adapters.
- design-system/ owns tokens, icon registry, and layout/interaction patterns.
- styles/ owns only truly global resets and base styles.
- Feature styles must be scoped to their feature root.
- Services must not import features, pages, components, or design-system UI.
- Features must not import app/page internals or sibling feature internals.
- A shared token/component change requires consumer impact analysis.

## Registration and release gates

- All account registration and login must use the PLUITS first-party Go identity API. No provider fallback is permitted.
- Public signup remains disabled until the PLUITS-owned API, PostgreSQL persistence, SMTP/email delivery, allowed redirect URLs, backups, restore validation, final legal documents, and durable consent recording are verified.
- The current legal pages and design tokens are drafts; do not describe them as approved.
- Keep the site noindex during internal testing.
- Do not claim real-account login, email delivery, browser UAT, or deployment success until the relevant evidence has been checked.


## PLUITS-owned infrastructure directive — 22 November 2026

- PLUITS backend ownership belongs to the Go API and PostgreSQL platform under `backend/`; the runtime is self-hosted and provider-independent.
- The frontend uses only `first-party-auth-service.js`. If the API URL is not configured, guest pages may load but account actions must clearly report that the PLUITS backend is not connected. Never fall back to external identity providers or synthetic accounts.
- Migrate identity, profile, social/feed, Inbox/chat, media/storage, GeoDirectory, Marketplace, Store, Restaurant & Café and wallet into PLUITS-owned PostgreSQL schemas, Go APIs, workers and object storage with server-side authorization and regression tests.
- Do not reintroduce archived provider-specific SQL or provider-specific runtime code.
