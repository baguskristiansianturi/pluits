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
