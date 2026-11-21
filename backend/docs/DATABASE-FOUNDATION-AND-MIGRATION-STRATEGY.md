# PLUITS Database Foundation and Domain Migration Strategy

**Authority:** PLUITS-owned Go services and PostgreSQL are the only backend runtime.  
**Current implementation:** PostgreSQL migration runner and first-party identity domain are implemented. Other product domains remain in design/migration stages.

## 1. Purpose

Build a durable, portable relational foundation for the PLUITS platform: identity, profiles, social content, messaging, media metadata, GeoDirectory, Marketplace, Store, Restaurant & Café, Trips, Trust & Safety and future services. The database must preserve domain ownership, privacy, transactional integrity and controlled growth without locking PLUITS to a hosted backend vendor.

## 2. Current database implementation

- PostgreSQL 17.
- Go `database/sql` with pgx driver.
- Explicit migration command under `cmd/migrate`.
- Ordered SQL files embedded into the migration executable.
- `pluits_meta.schema_migrations` stores version, filename, SHA-256 checksum and application time.
- PostgreSQL advisory lock serializes migration runs.
- Each migration and ledger update commit in one transaction.
- Applied migrations are immutable; checksum drift fails safely.
- API startup never runs DDL automatically.
- CI runs unit tests, race tests and PostgreSQL integration tests against a disposable database.

The live Compose database uses a persistent Docker volume and is not published to a host port.

## 3. Domain ownership boundaries

| Domain | Owns | Security boundary |
|---|---|---|
| Identity | Account, credentials, verification, sessions and recovery | One person has one PLUITS identity; secrets never leave the server |
| Profile | Personal/professional profile, preferences and privacy | Private fields are not part of public profile reads |
| Authorization | Workspace, membership, roles, permissions and product grants | Explicit permission checks; frontend visibility is never authorization |
| Social | Posts, comments, reactions, follows, Stories and Reels metadata | Visibility and interaction preferences enforced server-side |
| Messaging | Conversations, participants, messages, receipts, deletion and blocks | Every operation checks conversation membership and account blocks |
| Media | Object metadata, ownership, access class and processing state | Private by default; bytes are stored outside PostgreSQL |
| Realtime | Event outbox, presence and authenticated subscriptions | Events emitted only after authorized committed changes |
| Calls & Live | Rooms, participants, signaling and lifecycle | Separate signaling authorization and media transport |
| GeoDirectory | Canonical places/entities, category, location, claims and source provenance | Directory entity is separate from merchant workspace |
| Store | Merchant workspace, catalog, variants, inventory and staff permissions | Merchant operations belong to Store |
| Restaurant & Café | Menus, tables, dine-in sessions, service calls and orders | Restaurant operations remain distinct from Marketplace |
| Marketplace | Discovery eligibility, cart, checkout, orders and payment lifecycle | Aggregates merchant offers; does not own merchant operations |
| Trips & Services | Itineraries and bookable service requests | Provider ownership and fulfillment are explicit |
| Trust & Safety | Reports, moderation cases, appeals and audit trails | Actions are attributable, reviewable and appealable |
| Ledger | Financial entries, reconciliation and audit | No balances or financial actions without an approved ledger model |

## 4. Identity and account rules

- One PLUITS identity can own personal, professional, business, organization and community contexts.
- Keep detailed membership entitlements out of constraints until the membership model is approved.
- Verification state is separate from membership level.
- Workspace roles and explicit permissions control actions.
- Personal profile and merchant storefront are separate records.
- Exact addresses, credentials, recovery tokens and private media are never public.
- Passwords use versioned Argon2id parameters.
- Refresh tokens are opaque, rotated and stored as hashes; reuse revokes the token family.
- Email challenges are single-use, expiring and hash-at-rest.
- Registration creates the pending account, email, credential, personal profile, consent, workspace, roles, product grant and encrypted outbox item in one transaction.
- No fake or seeded customer account is permitted. The first real account is created through the registration journey.

## 5. Relational data rules

1. Use stable primary keys and explicit foreign keys for ownership and relationships.
2. Enforce concurrent invariants with database constraints.
3. Use transactions for multi-record state changes, especially checkout, payments and fulfillment.
4. Store timestamps as `TIMESTAMPTZ`; user timezone is a separate preference.
5. Store money as integer minor units plus ISO currency code; never use floating point.
6. Preserve source provenance and do not silently merge uncertain entities.
7. Add indexes for measured query paths.
8. Define retention, deletion, archival and legal hold before destructive cascades.
9. Use idempotency keys for retryable operations.
10. Keep audit trails for privileged access, security changes, moderation and financial transitions.

## 6. Global readiness

- Use ISO country, language and currency codes.
- Keep display locale, timezone and currency preferences separate from canonical values.
- Normalize verified phone numbers to E.164.
- Use country-aware structured address fields.
- Explicitly model workspace ownership and regional data residency.
- Decide geospatial extension/indexing and search architecture before implementing large directory workloads.
- Roll out regions deliberately; global schema does not mean global operations are already available.

## 7. Media, realtime and calls

- PostgreSQL stores metadata, ownership, access policy and processing state, not large media bytes.
- Uploads require short-lived scoped authorization; private objects are private by default.
- Processing is asynchronous and idempotent.
- Video requires adaptive renditions and a delivery strategy; the Go API must not proxy all video bytes.
- Messaging/presence events use an authenticated realtime gateway, separate from relational writes.
- WebRTC requires signaling plus STUN/TURN; group calls and live broadcasts require a dedicated SFU/media server.
- Background jobs require bounded concurrency, retry policy, dead-letter handling and observability.

## 8. Migration operation

Run migrations only against the PLUITS-controlled PostgreSQL instance:

```sh
cd backend
DATABASE_URL='postgres://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require' go run ./cmd/migrate -command=up
```

Requirements:
- Numbered immutable SQL files.
- Review lock duration and impact before applying.
- Test on disposable PostgreSQL in CI.
- Back up before production changes.
- Use expand/contract changes for live systems.
- Reconcile row counts, ownership, privacy, media references and transaction totals after imports.
- Destructive rollback is never assumed safe.

## 9. Current implementation status

Implemented:
- Go API process, health/readiness endpoints, request IDs and security middleware.
- PostgreSQL pool and explicit versioned migration runner.
- Identity schema, registration, email verification, login, refresh, logout and password recovery.
- Encrypted email outbox and SMTP STARTTLS worker.
- Database-backed rate limiting and scoped workspace/product authorization.
- Self-hosted Compose topology with HTTPS edge and encrypted local backups.

Not yet implemented:
- Full profile and privacy APIs.
- Social graph/feed/posts/comments/reactions/Stories/Reels.
- Inbox/messaging APIs and realtime gateway.
- Object storage, media upload/finalization and processing/transcoding workers.
- Calls/live signaling, STUN/TURN and SFU.
- GeoDirectory and claim/review services.
- Marketplace, Store and Restaurant & Café domain APIs.
- Trips, moderation workflows and ledger.
- Off-host backup replication, production monitoring and restore acceptance.
- Production host, DNS and SMTP configuration.

Do not describe the entire PLUITS platform as implemented until each domain has migrations, server-side authorization, API contracts, negative tests, observability and accepted UAT.
