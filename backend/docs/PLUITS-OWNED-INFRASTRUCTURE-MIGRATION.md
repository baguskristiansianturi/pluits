# PLUITS-Owned Infrastructure Migration

**Decision:** Supabase is retired from the PLUITS target architecture. The platform will run on infrastructure controlled by PLUITS Official Indonesia.

**Current implementation status:** the Go API, PostgreSQL migration runner, first-party identity endpoints, encrypted email outbox, SMTP worker and Docker Compose topology exist in source. They are not yet deployed on a durable production host. The identity frontend adapter is now the only supported authentication path. No live PLUITS account has been created on the new backend.

## 1. Target platform

| Layer | PLUITS-owned target |
|---|---|
| Browser application | Vite frontend on GitHub Pages during the current stage |
| API | Go HTTP API under `backend/` |
| Primary database | PostgreSQL with versioned PLUITS-owned migrations |
| Identity | Go identity service, Argon2id, opaque access/refresh tokens, session revocation |
| Email | Encrypted transactional outbox + separate SMTP STARTTLS worker |
| Media/object storage | Dedicated private object-storage adapter, signed access, ownership validation, lifecycle cleanup and CDN delivery; provider selection remains open |
| Realtime | PLUITS-owned event delivery/gateway, designed separately from relational writes |
| Background work | Dedicated Go workers and durable job/outbox patterns |
| Operations | Docker baseline, backups, restore drills, monitoring, alerting, secret rotation and deployment automation |

No host, object-storage, DNS or SMTP provider is assumed. Do not provision paid resources without explicit approval.

## 2. Decommission boundary

- The frontend must not load a Supabase SDK/client, Auth adapter, project URL, publishable key or local synthetic login adapter.
- All new browser data access must go through PLUITS-owned API contracts.
- The old SQL files under `backend/legacy-schema-reference/sql/` are read-only reconstruction references, not an executable deployment target.
- Do not delete those SQL files until every unique table, index, constraint, RLS rule, trigger, RPC, storage policy, scheduled task and domain invariant has an equivalent reviewed PLUITS implementation and regression test.
- Decommission only the PLUITS project. Do not touch the separate Bagusin or BDM Trans projects or other organization resources.

## 3. Domain migration register

| Domain | PLUITS replacement | Exit criteria |
|---|---|---|
| Identity and sessions | Go identity service + PostgreSQL | Register, verify, login, refresh rotation, logout, reset, account isolation and rate-limit tests pass |
| Personal profile and privacy | Account/profile API and owned schema | Profile CRUD, privacy, account deletion/export, authorization and unique username tests pass |
| Social graph and feed | Social schema/API + event/outbox workers | Public/private visibility, follower permissions, moderation and feed regression tests pass |
| Inbox and messaging | Messaging domain + realtime gateway + media integration | Two genuine accounts can message; membership, block, receipts, retention, delete/undo and media tests pass |
| Media | Private object storage + upload authorization/finalization API + processing workers | Ownership/path, private/public access, upload/resume, transcode, deletion and lifecycle tests pass |
| GeoDirectory | GeoDirectory domain and claim-review services | Canonical entity identity, duplicate resolution, verified source, claims and permission tests pass |
| Marketplace | Marketplace discovery/transaction layer | Catalog, checkout, payment state, cancellation, refund and authorization tests pass |
| Store operations | Store merchant module | Workspace isolation, staff permissions, catalog/inventory and verification tests pass |
| Restaurant & Café | Restaurant & Café module | Dine-in lifecycle, session gates, order/payment and role tests pass |
| Wallet/ledger | Ledger only after financial model approval | No financial feature is exposed until reconciliation, idempotency and audit requirements pass |

## 4. Migration sequence

1. **Identity cutover:** remove the Supabase browser client/Auth adapter and demo auth path; make Go API the only identity adapter. Keep signup disabled until the API is deployed and real email/persistence is verified.
2. **Backend runtime:** provision a PLUITS-controlled host, durable PostgreSQL volume, encrypted off-host backups, HTTPS reverse proxy, monitoring and real SMTP STARTTLS. Verify restore before storing user data.
3. **Schema reconstruction:** inventory every legacy migration and classify objects as current, obsolete, draft or already represented. Translate domain invariants into new versioned migrations; do not bulk-copy provider-specific SQL/RLS/RPC code.
4. **Domain APIs:** migrate one bounded domain at a time with server-side authorization, idempotency, audit events and integration tests.
5. **Media and realtime:** choose and deploy owned adapters only after access rules and lifecycle contracts are defined. Never expose a public bucket as a shortcut.
6. **Cutover and verification:** test with genuine owner-controlled accounts and email addresses. Remove each legacy runtime integration only after parity tests pass.
7. **Provider decommission:** delete the PLUITS Supabase project from its provider dashboard after verifying no PLUITS runtime calls remain and PLUITS-owned replacements are accepted. The connected provider tools do not expose project deletion, so this final console action cannot be executed from this session.

## 5. First real account gate

A real account is possible only after durable PLUITS-controlled PostgreSQL, HTTPS API, identity secrets, SMTP verification/reset delivery, exact CORS, tested backups/restores and GitHub Pages variables `VITE_AUTH_PROVIDER=first-party` plus the real `VITE_API_BASE_URL` are configured. Signup remains disabled until this gate passes.

Do not create demo users, seed accounts, manually insert identity rows, disable email verification or expose outbox tokens.

## 6. Known gaps

- No durable public API host or production PostgreSQL instance is provisioned.
- No real SMTP sender or production secrets are configured.
- The first-party API origin is not yet configured in GitHub Pages variables.
- Domain APIs beyond identity are not yet implemented in Go.
- Media storage, realtime delivery and background processing for social/marketplace domains remain to be built.
- The provider connector lists the PLUITS project but has no project deletion operation. Other Supabase projects exist in the same organization and must not be deleted as part of PLUITS cleanup.
