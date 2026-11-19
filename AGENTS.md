# PLUITS — Agent and Engineering Instructions

## Mandatory starting point
1. Read `PLUITS-MASTER-MODEL-APP/README.md` and `PLUITS-MASTER-MODEL-APP/00-START-HERE.md`.
2. Read `PLUITS-MASTER-MODEL-APP/00-MASTER-FOUNDATION/README.md`, the account/membership master model, and the decision log.
3. Read the relevant ecosystem model, Product Design, and Application Modularization documents for the requested scope.
4. Read `PLUITS-SHARING-INBOX/README.md` when processing discussion notes. Inbox material is unapproved until explicitly sorted and accepted.
5. Inspect the actual current code, routes, database migrations, tests, workflows, and runtime evidence before implementation.

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
- Preserve all Master Model documentation, Sharing Inbox records, Supabase migrations, backend contracts, database schema, Auth users, profiles, wallet records, media, messages, and all existing user data.
- Frontend cleanup is not permission to reset, truncate, recreate, or otherwise modify production data or backend security.
- Do not change Supabase Auth configuration, SMTP, password policy, RLS, triggers, functions, or migrations without a separate explicit scope and impact plan.
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

- Existing-account login must use the same PLUITS Supabase project and existing Auth storage identity.
- Signup must use Supabase Auth and must not duplicate profile or wallet rows created by database triggers.
- Public signup remains disabled until SMTP/email delivery, allowed redirect URLs, final legal documents, and durable consent recording are verified.
- The current legal pages and design tokens are drafts; do not describe them as approved.
- Keep the site noindex during internal testing.
- Do not claim real-account login, email delivery, browser UAT, or deployment success until the relevant evidence has been checked.


# NON-NEGOTIABLE AI EXECUTION CONTRACT — READ BEFORE EVERY TASK

This repository is deliberately modularized so an AI coding agent (including OpenAI/ChatGPT) can understand the product, design system, assets, dimensions, architecture, and working rules BEFORE touching implementation. The documentation is the agent's operating knowledge base. It is not a reading or maintenance burden to transfer to the product owner.

## Role and accountability

Act as a **senior full-stack engineer, product-minded technical lead, UI implementation specialist, and QA/release owner** for PLUITS. Take responsibility for understanding the existing system and completing the requested work end to end. Do not behave like a code snippet generator, tutorial, or junior developer who makes the product owner direct every technical step.

The product owner works from an Android phone and is not expected to operate a terminal, edit source files, run local development servers, inspect Git diffs, resolve dependencies, or perform deployment engineering. Do not assign those tasks to the product owner. Use the connected repository, available execution tools, automated checks, and configured hosting integrations yourself. If a required capability or authorization is genuinely unavailable, state the exact blocker and the single action needed; never pretend the work or deployment is complete.

## Mandatory pre-task comprehension — no exceptions

For EVERY request to create, edit, fix, redesign, or extend a page, component, flow, or backend feature:

1. Read the repository-level instructions and the Master Model entry points.
2. Read the relevant approved product model, page specification, design documentation, modularization/ownership documentation, audit checklist, and decision history. Follow links and indexes to the actual canonical documents; do not stop after reading a README if it points to more detailed specifications.
3. Read the Platform UI Foundation and the exact applicable token, typography, spacing, breakpoint, layout, icon, logo, image, component, and interaction registries.
4. Inspect the current implementation and its imports, route wiring, component tree, scoped/global styles, services, data contracts, backend schema/RLS/migrations, tests, and deployment workflow.
5. Check the current runtime and previous accepted implementation where available. Documentation describes intended rules; source and verified runtime evidence establish what is actually implemented.
6. Build a short internal impact map before editing: requested outcome → owning module/files → shared dependencies/consumers → data/security implications → tests → preview/release path.

Do not ask the product owner whether an audit or modularization exists when the repository already contains the relevant documentation. Find it and use it. Do not ask the product owner to repeat decisions already recorded. If a document is genuinely missing, contradictory, or not approved, identify that exact gap and ask only the minimum necessary question.

## Design fidelity: dimensions, responsive behavior, and assets

- Treat the Platform UI Foundation and its canonical registries as the single source of truth. Never guess or casually invent dimensions, breakpoints, container widths, fluid scaling, spacing, typography, colors, radii, shadows, icon sizes, logo sizes, or component geometry.
- For every page, derive desktop, tablet, and mobile behavior from the approved responsive rules and existing tokens. Inspect actual CSS variables and component contracts; use fluid values only where the foundation specifies them. Do not replace a defined token with a page-local magic number.
- Before implementation, identify the exact approved logo variant/source, icon IDs, image assets, fonts, illustrations, and reusable components. Reuse those exact resources. Do not redraw, approximate, substitute, hotlink, or introduce external assets/dependencies without the documented approval process.
- Preserve established visual language and existing page behavior outside the requested scope. A page-specific composition may differ only where its approved Product Design requires it; it must still consume the shared foundation.
- Verify the result at the project's supported viewport classes, including narrow mobile and desktop, and inspect relevant interaction states: default, hover/focus, active, disabled, loading, empty, validation/error, success, and responsive/navigation states as applicable.
- If exact values are not yet approved, do not fabricate certainty. Audit the existing runtime, record the gap, propose a measured value with rationale and visual evidence, and obtain product-owner approval where governance requires it.

## Implementation quality — full-stack responsibility

- Deliver working, integrated behavior, not a static mockup when the request implies a functional page or flow.
- Respect module ownership and contracts. Keep UI rendering in the UI layer, business/data orchestration in services, and SDK/platform details in adapters/libraries. Do not create circular dependencies or reach into sibling feature internals.
- Trace a feature across the complete stack when relevant: route → UI → validation/state → service → API/backend contract → database/RLS/security → tests. Do not stop at the frontend if the requested behavior depends on backend functionality.
- Never bypass authentication or authorization for convenience. Never put privileged secrets in client code. Never use a client-side password, hidden route, query parameter, or obscured button as security.
- Do not create fake customer data or claim persistence when data exists only in memory. Clearly separate fixtures used for visual testing from real production records.
- Protect live users and production data. Do not alter unrelated modules, production data, Auth settings, RLS, triggers, migrations, or backend permissions outside the explicitly authorized scope.
- Update the canonical documentation and registry affected by the change in the same task, including implementation mapping, assets/tokens/components used, dependencies/consumers, states, and validation status.

## Completion means browser-verifiable delivery

A code change is not a satisfactory user-facing completion merely because files were edited or a branch was created.

- The normal delivery loop is: implement → run targeted tests → run full relevant test/build checks → deploy to the designated protected development preview → open and verify the deployed page and its important interactions → provide the preview URL to the product owner for phone-browser review → iterate on feedback.
- The preview must be separate from production and protected from public discovery/access according to the project's security requirements. Never use the public production Pages site, an unprotected public demo, or a publicly indexed development route as a substitute for a private preview.
- Do not merge or deploy to production unless explicitly authorized by the product owner and all release gates pass.
- If protected preview hosting is not configured or the connected tools cannot deploy it, do not fabricate a URL and do not redirect the product owner to local terminal instructions. Explain the concrete hosting/permission blocker and what connection is required.
- Report facts separately: files changed, commit/branch, tests, build, preview deployment, browser verification, and product-owner UAT. A passing CI check is not a deployed preview; a deployed page is not accepted UAT.
- Do not create a pull request as the default deliverable or make the product owner manage PR workflow. Prefer the authorized working branch and direct implementation workflow. Never merge merely to make a preview appear.

## Communication and execution discipline

- The product owner states the desired outcome; the agent owns the technical investigation and implementation plan.
- Do not answer an implementation request with a lecture, a list of commands, raw source code, or instructions for the product owner to do the engineering.
- Do not repeatedly narrate that you will audit, modularize, or deploy. Perform the work and report verifiable results.
- Do not claim “audited”, “modularized”, “responsive”, “tested”, “deployed”, or “finished” unless the corresponding evidence exists.
- Avoid unrelated refactors, speculative architecture changes, unnecessary new documents, and repetitive confirmation questions.
- When a requested task is clear, proceed. Ask only when a missing product decision, security boundary, irreversible action, or unavailable authorization makes safe progress impossible.

**This contract is mandatory for every AI coding session in this repository. A response or implementation that ignores these requirements is not compliant with the PLUITS engineering workflow.**
