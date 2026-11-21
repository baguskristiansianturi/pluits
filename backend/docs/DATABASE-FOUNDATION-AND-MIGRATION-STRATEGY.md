# PLUITS Backend — Database Foundation and Migration Strategy

**Status:** technical implementation baseline for the independent backend.  
**Production status:** isolated development branch only. The existing Supabase database remains production.

## 1. Purpose

Establish a safe, repeatable PostgreSQL foundation before creating domain tables. PLUITS has a broad international product scope: social identity, content, messaging, realtime, media, calls/live, GeoDirectory, Marketplace, merchant operations, Trips, Blog, and future services. The database foundation must support transactional integrity, clear domain ownership, privacy, gradual growth and eventual data migration without locking the product to a hosted backend vendor.

## 2. Current implementation

Runtime source:
- `internal/database/open.go`: connection pool setup and fail-fast connectivity check.
- `internal/migrate/migrate.go`: embedded, ordered SQL migration runner.
- `internal/migrate/migrations/000001_platform_namespace.sql`: creates only the isolated `pluits` schema.
- `cmd/migrate/main.go`: explicit migration CLI.
- `cmd/api/main.go`: API process connects to PostgreSQL when `DATABASE_URL` is configured.

Migration metadata:
- `pluits_meta.schema_migrations` records version, filename, SHA-256 checksum and application time.
- A PostgreSQL advisory lock serializes migration runs.
- Each migration body and its ledger row are committed in one transaction.
- An already-applied migration cannot be edited or removed silently.
- The API process never applies DDL automatically.

## 3. Domain ownership boundaries

The database will be organized around domain ownership, not around frontend page names.

| Domain | Owns | Important boundary |
|---|---|---|
| Identity | Account identity, credentials, sessions, recovery and verification | One person has one PLUITS identity |
| Profile | Public/private profile attributes and preferences | Exact address and sensitive data are private |
| Authorization | Roles, permissions, workspace membership and ownership grants | Membership level alone never grants access |
| Social | Posts, comments, reactions, follows, Stories and Reels metadata | Content visibility is enforced server-side |
| Messaging | Conversations, participants, messages and delivery state | Every read/write checks conversation membership and blocks |
| Media | Object metadata, ownership, access class and processing state | Bytes live in object storage, not large PostgreSQL rows |
| Realtime | Presence, subscriptions and event outbox | Events are emitted only after authorized state changes |
| Calls & Live | Rooms, participants, signaling and session lifecycle | Signaling authorization is separate from media transport |
| GeoDirectory | Place/entity records, categories, locations, claims and source provenance | Directory entity is distinct from the merchant account |
| Store | Merchant workspace, catalog, variants and inventory | Merchant operations belong to Store |
| Restaurant & Café | Menus, tables, dine-in sessions, service calls and orders | Restaurant operations remain distinct from Marketplace |
| Marketplace | Discovery eligibility, cart, checkout, orders and payment lifecycle | Marketplace aggregates merchant offers; it does not own merchant operations |
| Trips & Services | Itineraries and bookable service requests | Provider ownership and fulfillment are explicit |
| Trust & Safety | Reports, moderation cases, appeals and audit trails | Moderation actions are attributable and reviewable |

Schemas may be introduced incrementally. The initial `pluits` namespace is only a root boundary; domain schemas/tables must follow approved contracts and tests.

## 4. Identity and account design constraints

The approved platform principle is one PLUITS identity across personal, professional, business, organization and community contexts. The account/membership master document currently marks detailed membership rules as PROPOSED. Therefore:
- Do not encode Silver/Gold/Platinum/Priority entitlements into database constraints yet.
- Keep verification state separate from membership level.
- Workspace roles and explicit permissions control actions; membership does not replace authorization.
- Do not merge personal profile and merchant storefront into one record.
- Do not expose private addresses, exact coordinates, credential data, recovery tokens or private media through public profile APIs.
- Existing Supabase Auth users and profiles need a stable identity mapping plan before import.
- Never transfer plaintext passwords. Use verified account linking, secure password reset or a separately reviewed credential migration.
- Authentication schema must include account lifecycle, email/phone verification, session revocation, recovery, abuse throttling and auditability before public registration is enabled.

No identity or membership tables are created in this database stage because the account model and current production data mapping must first be reconciled.

## 5. Relational data rules

Future domain migrations must follow these rules:
1. Use stable primary keys and explicit foreign keys for ownership and relationships.
2. Use database constraints for invariants that must hold under concurrent requests.
3. Use transactions for multi-record business state changes, especially checkout, payment status and merchant fulfillment.
4. Store timestamps as `TIMESTAMPTZ`; keep user-facing timezone preferences separate from canonical event timestamps.
5. Store money as integer minor units plus ISO currency code; never use floating point for monetary values.
6. Preserve source/provider references when importing records; do not silently collapse entities with uncertain identity.
7. Add indexes based on query paths and measured plans; do not add speculative indexes to every column.
8. Define deletion, retention, archival and legal-hold behavior before implementing destructive cascades.
9. Use idempotency keys for retryable external requests and transaction-creating APIs.
10. Keep an audit trail for privileged access, account security changes, moderation and financial state transitions.

## 6. Global readiness

The schema must not assume Bali-only or Indonesia-only data:
- Use ISO country, language and currency codes where applicable.
- Keep display locale, timezone and currency preferences separate from canonical data.
- Phone numbers are stored in normalized international form (E.164) with verification metadata.
- Addresses use country-aware structured fields; do not assume one postal format.
- Search and geospatial indexing will be introduced with a documented provider/extension choice and fallback plan.
- Tenant/workspace ownership must be explicit for merchant and organization data.
- Regional deployment, data residency and privacy-law requirements need legal/product decisions before multi-region replication or cross-border data transfer.

Global support does not mean launching every region simultaneously. Region rollout is an operational release gate.

## 7. Media and realtime are separate capacity domains

- PostgreSQL stores media metadata, ownership, policy, processing status and references; object storage stores the actual bytes.
- Uploads use short-lived, scoped authorization. Private objects are private by default.
- Media processing is asynchronous and idempotent; original files, derivatives and retention are tracked.
- Video delivery requires adaptive renditions and a delivery strategy; a Go API server must not proxy every video byte.
- WebSocket is suitable for authenticated messaging/presence events, not for carrying video streams.
- WebRTC requires signaling plus STUN/TURN and, for scalable group calls/live, an SFU/media server. Those are separate deployable services.
- Background jobs must have retries, bounded concurrency, dead-letter/error handling and observability.

## 8. Migration operation

Run only against the separately provisioned PLUITS-owned database:

```sh
cd backend
DATABASE_URL='postgres://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require' go run ./cmd/migrate -command=up
```

Never point this command at the production Supabase URL.

Migration requirements:
- Numbered immutable SQL files.
- Review schema impact and lock duration before applying.
- Test against disposable PostgreSQL in CI.
- Back up before any production data migration.
- Use additive expand/contract changes when a running service must remain compatible.
- Reconcile row counts, stable IDs, ownership, privacy, media references and transaction totals after import.
- Keep a rollback plan; destructive rollback is not assumed to be safe or possible.

## 9. Cost and mobile-only development

- Go, PostgreSQL and the migration tooling are open-source.
- GitHub Actions currently runs a disposable PostgreSQL service for CI; this does not create a paid persistent database.
- The founder can continue product direction and review through the phone; code changes and automated checks are performed through GitHub.
- A public always-on service still needs compute, database storage, bandwidth and backups. Free tiers have limits and must not be represented as unlimited or production-grade.
- Do not create paid cloud resources, add billing commitments or provision external services without explicit authorization.

## 10. Exit criteria before identity tables

Before the next stage creates identity/auth tables, complete:
- Inventory of the current production Auth identity and related profile triggers.
- Reconciliation of profile, seller workspace, professional profile and role ownership.
- Approved account lifecycle and recovery rules.
- Threat model for credential storage, sessions, email verification and abuse prevention.
- Data mapping for stable IDs and duplicate detection.
- Positive and negative authorization tests.
- Backup, import dry-run, reconciliation and rollback plan.

## 11. Current state

Implemented in source:
- Go 1.27 API foundation.
- PostgreSQL connection pool and startup ping.
- Explicit migration CLI.
- Version/checksum migration ledger and advisory lock.
- Initial isolated `pluits` schema migration.
- PostgreSQL integration test in CI.

Not implemented:
- Identity/account tables or auth endpoints.
- Profile/social/messaging/marketplace domain schema.
- Object storage, realtime, WebRTC, media processing or workers.
- Public hosting, production data migration or frontend cutover.
