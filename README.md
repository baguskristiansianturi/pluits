# PLUITS

PLUITS is a live multi-application platform. The deployed application code remains in the repository's runtime folders; product planning and technical blueprints are maintained separately.



## Current frontend delivery

The frontend is being replaced with a clean modular foundation. The current frontend includes account access, public Global Home, and one authenticated User Dashboard as the post-login control center. The new runtime is in src/. PLUITS runs its backend on its own Go + PostgreSQL infrastructure. Each domain is implemented and tested in PLUITS-owned services before release.

Public signup is disabled while SMTP, legal documents, and durable consent recording are reviewed. The site remains noindex during this internal stage. Workspace is an internal development term, not a separate user-facing page or route.

## Main working areas
- [PLUITS Master Model App](PLUITS-MASTER-MODEL-APP/README.md) — ecosystem models, product design, application modularization, shared services and the main PLUITS wrapper.
- [PLUITS Sharing Inbox](PLUITS-SHARING-INBOX/README.md) — raw notes and outcomes from each discussion session, waiting for review and sorting.
- [Application source](src/) — current application implementation.
- [PLUITS Backend](backend/) — first-party Go API, PostgreSQL migrations, identity and worker services.
- [Automated tests](tests/) and [engineering scripts](scripts/).

## Working principle
A discussion note is not an approved requirement. Sort and review it in the Sharing Inbox first, then move approved decisions into the relevant model, product design, or modularization folder. Implement only after the relevant scope and acceptance criteria are clear.

Protect the live application: changes must stay within the owning module, shared dependencies require a consumer audit, and unrelated routes, components, styles, database objects and user data must remain untouched.
