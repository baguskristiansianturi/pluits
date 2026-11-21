# PLUITS Independent Backend

**Status:** foundation and PostgreSQL migration tooling implemented in source; no public deployment and no production cutover.

This is the first-party backend codebase for the full PLUITS ecosystem. It is intentionally isolated from the existing frontend and Supabase production runtime while domain contracts and migration safety are established.

## Platform scope

The target is a global, multi-domain platform, not a single social feed. The backend roadmap covers:
- Global identity, accounts, sessions, verification, recovery, profiles, privacy, roles and permissions.
- Social feed, posts, comments, reactions, follows, Stories and Reels.
- Messaging, delivery/read receipts, presence and notifications.
- Voice/video calling, group calls and live streaming.
- Media upload, private access, image/video processing, transcoding and playback delivery.
- GeoDirectory, local entities, places, organizations and business verification.
- Marketplace discovery and transactions.
- Store and Restaurant & Café merchant operations as distinct modules connected to Marketplace.
- Trips, tickets, transport/services, blog and future entitlements/wallet capabilities.
- Trust/safety, moderation, audit, localization, multi-currency and regional settings.

This is the platform target, not a statement that every feature is already implemented. Release order follows the approved product roadmap; Social Media remains the P0 product gate.

## Technology baseline

- **Go 1.27** for the backend API and worker processes.
- **PostgreSQL** for relational and transactional data.
- **pgx** driver through `database/sql`.
- Go standard library HTTP server for the initial API.
- Versioned SQL migrations embedded into the migration executable.
- GitHub Actions with a real PostgreSQL 17 service for CI integration tests.

Go 1.27 is selected because it is a currently supported stable release; CI uses the current 1.27 patch line. See the [official Go release history](https://go.dev/doc/devel/release).

## Implemented in this foundation

### API process
- `GET /health/live` reports process liveness.
- `GET /health/ready` verifies PostgreSQL connectivity.
- Configurable `PORT` and `DATABASE_URL`.
- Database connection pool defaults: 20 maximum open, 5 idle, 30-minute maximum lifetime and 5-minute idle lifetime.
- Startup database connectivity check when `DATABASE_URL` is configured.
- Conservative HTTP timeouts and graceful shutdown.

### API security baseline
- Every API response receives a cryptographically random request ID and security headers.
- Panic recovery returns a generic server error while logging the correlation ID; panic details are not returned to clients.
- Request bodies are capped at 2 MiB for the JSON API. Media uploads must use a separately authorized object-storage flow rather than the application API process.
- This is a baseline only; distributed rate limiting, authentication, authorization, MFA, audit storage and edge protections remain future work.

### Database migration system
- Dedicated `pluits_meta.schema_migrations` ledger.
- Ordered SQL migrations named `<version>_<description>.sql`.
- SHA-256 checksum for every applied migration.
- PostgreSQL advisory lock prevents concurrent migration runners.
- Each migration and its ledger entry commit in one transaction.
- Re-running migrations is idempotent.
- Editing or deleting an already-applied migration is rejected.
- Migrations are **not** run automatically by API startup; an explicit command is required.
- Initial migration creates only the isolated `pluits` schema. No account, user, post, message or merchant tables are invented before the approved data model and migration mapping are complete.

### Current migration command

From the `backend/` directory:

```sh
DATABASE_URL='postgres://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require' go run ./cmd/migrate -command=up
```

The command requires an explicit database URL and a reachable PostgreSQL database. Do not point it at the current Supabase production project. It is intended for the separately provisioned PLUITS-owned database only.

### Run the API

```sh
cd backend
go mod tidy
DATABASE_URL='postgres://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require' go run ./cmd/api
```

Health endpoints:
- `GET /health/live`
- `GET /health/ready`

Run unit tests:

```sh
go test ./...
```

PostgreSQL integration tests run when `DATABASE_TEST_URL` is set. GitHub Actions provisions a disposable PostgreSQL 17 service and runs:

```sh
go test -race ./...
go build ./cmd/api
go build ./cmd/migrate
```

Detailed database ownership, global data, identity, privacy and migration rules are documented in [`docs/DATABASE-FOUNDATION-AND-MIGRATION-STRATEGY.md`](docs/DATABASE-FOUNDATION-AND-MIGRATION-STRATEGY.md). The cross-platform domain contracts for profiles, dashboards, transport and accommodation are in [`docs/PLATFORM-DOMAIN-CONTRACTS.md`](docs/PLATFORM-DOMAIN-CONTRACTS.md). The existing Supabase identity mapping and safe first-party authentication transition are documented in [`docs/IDENTITY-AND-AUTH-BRIDGE.md`](docs/IDENTITY-AND-AUTH-BRIDGE.md).

## Data model and migration policy

- Supabase remains the live production source of truth until a separately reviewed migration is completed.
- The new database is a distinct target. Never run the new migration command against production Supabase.
- Do not copy production credentials, service-role keys, user passwords, private messages, or personal data into Git.
- Do not create demo users, fake marketplace listings, fake orders, fake reviews, fake balances or seeded social activity.
- Do not modify or replay the existing Supabase migration history.
- Account/membership rules that remain PROPOSED are not treated as approved schema requirements.
- Domain tables must be designed from the approved PLUITS business model, current live schema inventory, privacy boundaries and ownership rules.
- Any data transfer needs stable identity mapping, export/import reconciliation, backup, repeatable dry-run, rollback and founder acceptance.
- Passwords must never be exported in plaintext. Account migration requires a secure credential-reset, verified linking or other reviewed strategy.
- Backend authorization is mandatory. Frontend visibility is not security.

## Delivery status

| Capability | Status |
|---|---|
| Go API process | Implemented in source |
| Health/readiness endpoints | Implemented in source |
| API request IDs, security headers, panic recovery and body cap | Implemented in source; CI validation pending |
| PostgreSQL connection pool | Implemented in source |
| Versioned migration runner | Implemented in source |
| Migration checksum/lock/transaction | Implemented in source |
| Initial isolated database namespace | Migration authored; CI integration test verifies application |
| Unit and PostgreSQL integration tests | Added; CI run pending |
| Identity/authentication and workspace authorization | Existing schema and frontend flow audited; independent token verification and endpoints not started |
| Profiles and permission-scoped dashboards | Target contract documented; API not started |
| Transport operations | Target contract documented; schema/API not started |
| Accommodation operations | Target contract documented; schema/API not started |
| Social, messaging, media, calls/live | Not started |
| Marketplace and merchant domains | Not started |
| Public hosting/deployment | Not started |
| Production data migration/cutover | Not started |

The codebase can be maintained through GitHub from a phone. A public API still needs a compute host and a database; free hosting limits must be verified before deployment. No paid service or hosting resource has been created by this work.
