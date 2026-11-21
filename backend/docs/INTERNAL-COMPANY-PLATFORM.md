# Internal Company Platform — Shared Backend Blueprint

**Status:** architecture decision for the company's own products. This is an internal platform, not a public backend-as-a-service offering.

## 1. Purpose

Build and own a reusable backend foundation that can operate PLUITS and future company products such as BDM Transport, Bagusin and a future digital-payment product. The company owns the code, data model, APIs, operational policies and deployment decisions.

The platform may provide capabilities similar in spirit to a backend platform (identity, database access, storage, events, notifications, authorization and operations), but only to applications owned or explicitly approved by the company. We are not building a public Supabase competitor or selling backend infrastructure to third parties.

## 2. Product and data boundaries

- **PLUITS:** social identity and profiles, content, messaging, GeoDirectory, Marketplace, Store, Restaurant & Café, transport/accommodation listings and operations, trips and bookings.
- **BDM Transport:** transport business operations, fleet, drivers, quotes, dispatch, trip records, customer booking and support.
- **Bagusin:** service/project workflows, customer accounts, products/courses and member operations.
- **Future Payments:** payment orchestration, ledger, reconciliation, refunds, settlement and provider integrations, subject to legal and regulatory approval.

Each product has a stable product ID, environment, API client identity, data ownership policy and permission boundary. A PLUITS user must not automatically gain access to BDM or Bagusin business data. Cross-product identity linking and SSO are explicit opt-in capabilities with consent, account-link proof and separate authorization.

Shared infrastructure does not mean shared unrestricted data. Product-owned records are scoped by product/workspace and enforced server-side. High-risk financial data and credentials may require a separately isolated database/service as the payment product matures.

## 3. Platform layers

### A. Platform control plane
- Product/application registry and environment configuration.
- Service and API client identities, scopes and credential rotation.
- Organization/workspace registry and membership policy.
- Feature flags and rollout controls.
- Operational health, incident and deployment metadata.
- Internal administration with strong MFA, least privilege and audit.

The control plane configures products; it does not become a universal superuser path around domain authorization.

### B. Shared platform services
- **Identity:** human and service identities, credentials, verification, sessions, recovery and MFA.
- **Authorization:** product scopes, workspaces, roles, resource permissions and policy evaluation.
- **Profile:** reusable person/profile primitives, while product-specific public profiles remain owned by their product.
- **Audit & security:** append-only security and privileged-operation events.
- **Notification:** templates, preferences, delivery adapters, retries and delivery receipts.
- **Media & files:** metadata, private object storage, signed access, scanning and processing pipeline.
- **Events & jobs:** transactional outbox, durable queues, idempotent consumers, retries and dead-letter handling.
- **Search:** indexing and discovery interfaces; each product controls what becomes searchable.
- **Observability:** structured logs, metrics, traces, alerts and correlation IDs.
- **Regional settings:** country, locale, language, currency, timezone and region policy.

### C. Product domain modules
PLUITS social, marketplace, merchant, restaurant, transport, accommodation and trip modules; BDM transport operations; Bagusin service/store/course modules; and future payment domains. Domain modules own their business rules, records, lifecycle transitions and APIs.

### D. Infrastructure adapters
PostgreSQL, object storage, email/SMS providers, payment gateways, maps/geocoding, search engines, realtime gateways and WebRTC/SFU. Each adapter is replaceable behind an internal interface. Provider secrets are stored in a secret manager/environment, never in Git or browser code.

## 4. Architecture strategy

Start with a **modular Go backend (modular monolith)** with explicit domain packages and shared platform packages. Run API and background workers as separate processes from the same versioned codebase where appropriate.

Do not start with dozens of microservices. Extract a domain into a separate deployable service only when independent scaling, isolation, team ownership, regulatory boundary or operational evidence justifies the additional complexity.

Suggested code boundaries:
- internal/platform/identity
- internal/platform/authorization
- internal/platform/audit
- internal/platform/notifications
- internal/platform/media
- internal/platform/events
- internal/platform/observability
- internal/products/pluits/...
- internal/products/bdm/...
- internal/products/bagusin/...
- internal/products/payments/... (future, gated)

Keep domain packages from reaching into one another's tables or repositories. Cross-domain changes use explicit application services/events and documented contracts. Shared IDs do not imply shared authorization.

## 5. Data ownership and isolation

- One company-owned PostgreSQL platform is acceptable for the first stage, with separate schemas and strict ownership boundaries.
- Every business record carries an explicit product and/or workspace owner where relevant.
- Enforce tenant/product isolation in application authorization and database constraints; add row-level security as defense in depth where it fits the connection model.
- Avoid one generic entities table for every business concept. Use domain-specific relational models.
- Keep financial ledger and sensitive identity data on stricter access paths; separate database/cluster when risk or scale justifies it.
- Media bytes live in object storage; PostgreSQL stores metadata, access policy, and processing state.
- Backups, restore tests, retention, legal holds and export/deletion workflows are platform capabilities, not afterthoughts.

## 6. Identity model

The platform may have a company-wide identity directory for employees and service principals. Customer identities remain product-scoped by default. A person may link PLUITS, BDM or Bagusin accounts only through an explicit verified linking flow.

Authentication establishes who the actor is. Authorization separately checks which product the request targets, which workspace/resource is targeted, whether the actor belongs to it, whether the actor's role permits the requested operation, and whether resource state and verification conditions permit it.

Never trust a browser-provided user ID, role, product ID or workspace membership as proof.

## 7. Payments and financial boundary

Future digital payments must be a separately governed domain:
- Use payment-provider tokenization/hosted fields; do not store raw card PAN or CVV.
- Maintain an immutable double-entry ledger with balanced postings, currency precision and idempotent transaction references.
- Separate payment intent, authorization, capture, refund, payout, settlement and reconciliation states.
- Reconcile provider statements and internal ledger totals.
- Restrict adjustments and payouts with approval policies and immutable audit.
- Complete legal, licensing, AML/KYC, tax, consumer-protection and PCI scope assessments before processing real money.
- Do not represent a wallet balance as spendable funds until the ledger and regulatory model are approved.

## 8. Security and operational controls

- Deny by default; least privilege for humans and services.
- MFA and step-up checks for administrators, finance and account recovery.
- Short-lived credentials, refresh rotation, revocation and secret rotation.
- Rate limiting, bot/abuse detection, login throttling and replay/idempotency controls.
- TLS, encrypted backups/storage, tested disaster recovery and least-privilege database accounts.
- Dependency/secret scanning, SAST, race tests, integration tests and authorization regression tests.
- Audit access to sensitive records and privileged actions without logging credentials, tokens, private message bodies or payment secrets.
- Incident response, key compromise and account recovery procedures.
- No claim of absolute security or unlimited physical capacity.

## 9. Cost and scaling principles

Owing the backend avoids being structurally dependent on a hosted backend vendor, but does not remove hosting costs. Compute, database storage, backups, bandwidth, email/SMS, object storage, TURN/SFU, monitoring and payment-provider fees still exist.

Scale in evidence-based stages: one deployable modular backend and PostgreSQL; independent background workers and object storage; caching/search/realtime components when required; separate services and databases for independently scaling or high-risk domains; and multi-region/data residency only when demand, legal obligations and operations justify it.

Never call a system unlimited. Build horizontal scaling, quotas, backpressure, observability and graceful degradation into the design.

## 10. Implementation sequence

1. Complete PostgreSQL and API foundation; keep production Supabase untouched.
2. Build first-party identity, registration, email verification, sessions, recovery and security.
3. Build product/workspace authorization, audit and platform configuration.
4. Build profile/context and permission-scoped dashboards.
5. Build reusable notification, media, event/outbox and worker foundations.
6. Build PLUITS product domains and frontend integration.
7. Build BDM and Bagusin product workspaces on shared platform services.
8. Design the payment ledger and compliance boundary; enable real payment only after approval.
9. Add search, realtime, video/Live infrastructure and independent scaling as operationally justified.

## 11. Explicit exclusions

- No public third-party BaaS product.
- No production Supabase data import, account linking or dependency for the new backend.
- No deletion or modification of the existing Supabase project.
- No paid resource provisioning without explicit approval.
- No fake users, products, bookings, payments or seeded activity.
- No real-money payment processing before compliance and reconciliation controls are ready.