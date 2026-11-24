# PLUITS — Modular Ownership, Team Boundaries, and Change Governance

Status: **CANONICAL ARCHITECTURE GOVERNANCE**  
Scope: repository organization, module ownership, frontend/backend responsibility, team onboarding, version history, integration, and fault containment.

## 1. Why this structure exists

PLUITS is one integrated product ecosystem, but it is not one undivided code area.

The repository is the shared, version-controlled source of truth where the product is developed while the team is small. Inside it, each domain and module has a clearly owned area. The repository keeps the whole ecosystem connected; module boundaries keep responsibilities, changes, and failures from spreading unnecessarily.

This structure is established now, before the team grows, so future contributors can identify:
- which module owns a feature;
- which frontend and backend areas they may change;
- which contracts they must preserve when integrating;
- which tests and evidence are required;
- who must review a change that crosses a boundary;
- how to trace, release, roll back, and learn from each version.

The current state of a feature is preserved as the baseline. New versions extend or deliberately replace that baseline through recorded changes; they do not silently erase its history.

## 2. One ecosystem, independent ownership

PLUITS has one product identity, common platform foundations, and connected user journeys. Each domain nevertheless owns its own requirements and implementation.

A module owns, as applicable:
- product requirements and domain rules;
- user journeys, pages, routes, and UI composition;
- frontend components, local state, styles, and accessibility behavior;
- backend services, domain logic, validation, and authorization;
- database schema/migrations and data ownership;
- public APIs, events, and integration adapters;
- tests, fixtures, observability, operational runbooks, and rollback;
- documentation, version history, and change records.

No module may directly take over another module's private implementation. Cross-module collaboration happens through explicit, reviewed contracts.

## 3. Responsibility layers

### 3.1 Platform / ecosystem governance

Owns:
- ecosystem-wide architecture principles and module registry;
- shared identity, authentication primitives, security baselines, and platform capabilities;
- Platform UI Foundation: approved logo, icon registry, typography, design tokens, spacing, breakpoints, accessibility primitives, and explicitly approved shared components;
- cross-domain integration standards, CI quality gates, release policy, and engineering governance.

Platform governance does not own each module's private page composition or business rules.

### 3.2 Domain owner

Each domain has a product/technical owner responsible for its scope, roadmap, interfaces, quality, and compatibility. The owner coordinates its frontend and backend work and approves changes to its public contracts.

Examples of sibling domains include Social Media, Marketplace, Tickets & Accommodation, Geo Directory, Logistics/Courier/Transportation, and Digital Wallet, as defined in the Ecosystem Models registry.

### 3.3 Frontend and backend ownership inside each domain

A domain may have separate contributors or teams for:
- **Frontend — [Domain]**: pages, components, local state, CSS, responsive behavior, accessibility, frontend API adapters, and UI tests.
- **Backend — [Domain]**: domain services, API handlers, validation, authorization, database ownership/migrations, jobs, events, observability, and backend tests.

They share the domain requirements and integration contracts, but do not casually edit each other's internal implementation. Frontend/backend changes that require a coordinated contract change must be planned and reviewed together.

Examples:
- Frontend — Social Media / Backend — Social Media
- Frontend — Transportation / Backend — Transportation
- Frontend — Ticketing / Backend — Ticketing

These are ownership lanes, not a claim that all listed future teams or services already exist.

### 3.4 Contributors and staff onboarding

A contributor is assigned a domain and a responsibility lane. Before changing code, they must read:
1. the ecosystem model and domain README;
2. the domain's application modularization specification;
3. the relevant design and development rules;
4. the current runtime ownership/change map;
5. the API/data/event contracts used by the task;
6. the tests and release/rollback procedure.

A contributor should be able to answer: "What is my module? What folders do I own? What may I consume? What may I publish? Which tests prove my change is safe?"

## 4. Canonical repository organization

The repository remains a single integrated monorepo for now. A monorepo is a collaboration and versioning choice; it does not mean modules share internal ownership or may import each other's private files.

Canonical top-level code organization:

```text
pluits/
├── src/
│   ├── app/                         # composition root; mounts module entry points
│   ├── config/                      # route/config registry; no domain business logic
│   ├── platform/                    # cross-domain runtime capabilities, when approved
│   ├── design-system/               # Platform UI Foundation runtime
│   └── features/
│       ├── social-media/
│       │   ├── frontend/
│       │   │   ├── experience/
│       │   │   ├── feed/
│       │   │   ├── blog/
│       │   │   ├── reels/
│       │   │   ├── stories/
│       │   │   └── live/
│       │   ├── backend/
│       │   │   ├── api/
│       │   │   ├── application/
│       │   │   ├── domain/
│       │   │   └── infrastructure/
│       │   ├── contracts/
│       │   ├── tests/
│       │   └── README.md
│       ├── marketplace/
│       │   ├── frontend/
│       │   ├── backend/
│       │   ├── contracts/
│       │   ├── tests/
│       │   └── README.md
│       ├── transportation/          # future domain, own lanes
│       ├── tickets/                 # future domain, own lanes
│       ├── geo-directory/            # future domain, own lanes
│       └── ...
├── backend/                         # current Go backend root; migration only by plan
├── tests/                           # cross-domain / platform-level tests
├── docs/                             # engineering-wide policies, if adopted
└── PLUITS-MASTER-MODEL-APP/
    ├── 01-ECOSYSTEM-MODELS/
    ├── 03-APPLICATION-MODULARIZATION/
    └── 06-PLATFORM-UI-FOUNDATION/
```

**Important:** this is the target ownership map, not a claim that the existing runtime has already been moved into these folders. Current runtime paths must remain accurately documented in each domain's Change Map. Do not move the existing Go backend or frontend files merely to make the tree look like this. Migration requires a separate dependency audit, staged plan, tests, and approval.

A module may use a language/framework-appropriate internal layout. The example `api/application/domain/infrastructure` is a suggested backend separation, not a mandatory folder quota.

## 5. What the GitHub repository is responsible for

The GitHub repository is the shared engineering record and delivery mechanism. It provides:
- one discoverable source of truth for code and specifications;
- version history, commits, branches, pull requests, reviews, and issue tracking;
- module ownership boundaries through folders, contracts, CODEOWNERS and review rules as the team grows;
- automated checks, build/test evidence, release records, and rollback points;
- traceability from requirement → design → implementation → tests → deployment.

GitHub itself does not create runtime isolation. Folder boundaries and branch permissions reduce accidental changes, but technical isolation must also be implemented and tested in the application architecture.

Separate repositories are not required merely because domains have separate owners. Consider splitting a domain into its own repository only when deployment, security, access control, release cadence, scale, or team autonomy makes that operationally valuable. If split later, preserve explicit API/event contracts and a discoverable ecosystem integration registry.

## 6. Integration without internal dependency

Allowed integration patterns:
- versioned public API contracts;
- documented events and schemas;
- explicit frontend adapters/read models;
- stable IDs and deep links to the source domain;
- platform services with declared ownership;
- composition-root registration of public module entry points.

Not allowed:
- importing another module's private components, CSS, state store, database tables, or internal service implementation;
- directly writing another domain's tables;
- duplicating another domain's business rules in a consumer;
- relying on undocumented DOM selectors, global CSS side effects, shared mutable state, or import order;
- treating a visual preview as authorization to perform a transaction.

The source domain remains authoritative for its data and lifecycle. A consumer may display a projection, but commands that change source data must be sent to the owning domain and validated there.

## 7. Fault containment and failure boundaries

The goal is that a defect in one module does not unnecessarily take down unrelated modules. This is a design objective, not something folder separation alone guarantees.

### Frontend containment
- Each module has an explicit root and scoped CSS ownership.
- Components and state are module-local unless intentionally promoted to a platform contract.
- Route-level lazy loading and error boundaries should be used where supported and justified.
- A failed module should show a controlled fallback and must not corrupt navigation or shared application state.
- Global event listeners, portals, timers, observers, media playback, and subscriptions must be cleaned up on unmount.
- Shared shell/platform changes require cross-module regression.

### Backend containment
- Domain logic is separated from transport handlers and infrastructure.
- Each domain validates and authorizes its own commands.
- Database ownership is explicit; other domains use public APIs/events rather than direct writes.
- Timeouts, bounded retries, idempotency, circuit breakers, queue isolation, and graceful degradation are applied where appropriate.
- A module failure should not cascade through unbounded synchronous dependencies.
- Service/process/deployment isolation is introduced when risk and operational scale justify it.

### Data and security containment
- A module may access only data authorized by its contracts and permissions.
- Tenant/user boundaries are enforced server-side.
- Secrets, credentials, and privileged operations are never shared through frontend code.
- Failure of an integration should degrade that integration gracefully without inventing success or corrupting source records.

A single frontend bundle or backend process can still create shared failure modes. Stronger isolation requires runtime boundaries, not only source folders. The architecture must state honestly which level is implemented today.

## 8. Change ownership and version traceability

Every change must have:
- a named owning domain and responsibility lane (frontend/backend/platform);
- a linked requirement, issue, or approved task;
- an impact map of files, routes, contracts, consumers, and data;
- a branch and pull request with a focused scope;
- tests appropriate to the changed boundary;
- migration and rollback notes for data/API/runtime changes;
- evidence of checks and deployment status;
- documentation/Change Map updates when ownership, behavior, routes, contracts, or runtime paths change.

Use semantic versioning for independently versioned public contracts/packages/services where it is meaningful:
- MAJOR: incompatible public contract change;
- MINOR: backward-compatible capability addition;
- PATCH: backward-compatible fix.

For application modules without independent releases, record a module release/change version or milestone in the module's changelog and associate it with the repository commit/PR. Do not invent independent deployable versions when the runtime is still released as one application.

Preserve the previous working state through Git history and tagged/release checkpoints when appropriate. Never overwrite historical decisions silently; supersede them with a dated decision and rationale.

## 9. Cross-boundary change procedure

If a task affects one module only:
1. work inside that module's owned paths;
2. consume existing platform/public contracts;
3. run that module's tests plus required platform checks;
4. document the module change and evidence.

If a task affects multiple modules:
1. identify every affected owner;
2. describe the public contract change first;
3. agree compatibility and migration sequence;
4. update producer and consumer in a coordinated plan;
5. test both sides and the integrated user journey;
6. deploy in a safe order and keep rollback paths.

If a task affects Platform UI Foundation, authentication, shared routing, global CSS, or common backend infrastructure, treat it as a platform-level change and run the full affected-domain regression suite.

## 10. Current maturity and honest status

The current PLUITS repository is evolving from an early integrated application into explicitly governed modules. Documentation and target trees establish ownership policy; they do not prove that runtime isolation, independent deployment, microservices, or independent module releases are already implemented.

Each domain must maintain three clearly separated views:
1. **Current implementation** — verified paths and behaviors that exist now.
2. **Approved target architecture** — intended ownership and boundaries.
3. **Migration/change history** — what changed, when, why, tests, and deployment evidence.

Do not describe a planned folder, API, service, team, or isolation boundary as implemented until code and tests demonstrate it.

## 11. Definition of done for a module boundary

A module boundary is operationally credible when:
- its owner and responsibility lane are clear;
- its private code and data are not directly controlled by sibling modules;
- public integration contracts are documented and tested;
- CSS/state/event/async cleanup boundaries are explicit;
- module tests and cross-module contract tests exist;
- failures are handled at the appropriate boundary;
- changes can be traced and reverted without guessing;
- staff can onboard using the module's documentation without relying on oral context.
