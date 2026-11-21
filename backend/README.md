# PLUITS Independent Backend

**Status:** foundation and PostgreSQL migration tooling implemented in source; no public deployment and no production cutover.

This is the first-party backend platform owned and controlled by PLUITS Official Indonesia. It starts with a clean PostgreSQL database and has no runtime dependency on Supabase.

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
- This is a baseline only; rate limiting and authorization are being implemented in their dedicated modules. MFA, advanced abuse detection and edge protections remain future work.

### First-party identity and email delivery
- Argon2id password hashing with parameter encoding and bounded verification settings.
- Normalized email validation and generic duplicate-registration responses.
- Transactional registration creates a pending account, primary email, credentials, personal profile, one-time verification challenge and encrypted email-outbox item.
- Email verification activates the account and consumes the challenge atomically.
- Login issues opaque access/refresh tokens; only SHA-256 hashes are stored.
- Refresh rotates tokens; reuse of a rotated refresh token revokes its complete token family.
- Logout revokes the current session.
- AES-256-GCM protects short-lived verification secrets in the email outbox.
- A standalone worker claims queued messages with PostgreSQL row locking, sends through SMTP with mandatory STARTTLS, retries transient failures and marks terminal failures.
- HTTP handlers exist for registration, verification, resend, login, refresh, logout, password recovery and current-account lookup. Identity routes remain disabled unless both encryption and rate-limit keys are configured.
- PostgreSQL-backed shared rate limiting is applied by IP and canonical email for identity routes; access-token authentication middleware checks active account and session state on every protected request.
- Password reset uses one-time hashed challenges, encrypted outbox delivery and revokes all active sessions after completion.
- New accounts receive an isolated personal workspace, `personal_owner` role and baseline PLUITS member access. No access to other products is inherited; each future product requires its own explicit workspace grant and product-scoped role.
- `GET /v1/identity/me` returns the authenticated account's verified primary email, personal profile, workspace and role assignments.
- MFA, trusted-device controls, keyring-based outbox key rotation, account recovery support operations and broader abuse/fraud detection remain outstanding. Do not treat the identity module as production-ready until these release gates and deployment configuration are reviewed.

### Database migration system
- Dedicated `pluits_meta.schema_migrations` ledger.
- Ordered SQL migrations named `<version>_<description>.sql`.
- SHA-256 checksum for every applied migration.
- PostgreSQL advisory lock prevents concurrent migration runners.
- Each migration and its ledger entry commit in one transaction.
- Re-running migrations is idempotent.
- Editing or deleting an already-applied migration is rejected.
- Migrations are **not** run automatically by API startup; an explicit command is required.
- Migration `000001` creates the isolated `pluits` namespace. Migration `000002` defines first-party identity and session data; `000003` adds encrypted email delivery; `000004` adds shared rate limits; `000005` adds personal workspaces, scoped authorization, legal-consent records and password-reset challenges; `000006` adds the product registry and product-bound role constraints. These migrations are validated against disposable PostgreSQL CI, not applied to a persistent production database.

### Identity API and email worker

Identity routes:
- POST /v1/identity/register
- POST /v1/identity/verify-email
- POST /v1/identity/resend-verification
- POST /v1/identity/password-reset/request
- POST /v1/identity/password-reset/complete
- POST /v1/identity/login
- POST /v1/identity/refresh
- POST /v1/identity/logout (Bearer access token)
- GET /v1/identity/me (Bearer access token)

The API only activates identity routes when both PLUITS_OUTBOX_ENCRYPTION_KEY and PLUITS_RATE_LIMIT_KEY are configured. Browser calls require PLUITS_ALLOWED_ORIGINS to contain the exact HTTPS origin(s), such as https://baguskristiansianturi.github.io; wildcard origins are rejected. Supply a base64 raw-standard-encoded 32-byte key and keep it in the runtime secret manager, never in Git or PostgreSQL. PLUITS_OUTBOX_KEY_VERSION defaults to 1. Identity routes also require PLUITS_RATE_LIMIT_KEY, a separate base64 raw-standard-encoded 32-byte HMAC key. Rate-limit buckets store HMAC identifiers rather than raw IP or email values.

The email worker is a separate process. Configure DATABASE_URL, PLUITS_OUTBOX_ENCRYPTION_KEY, PLUITS_OUTBOX_KEY_VERSION, PLUITS_PUBLIC_BASE_URL, PLUITS_SMTP_HOST, PLUITS_SMTP_PORT, PLUITS_SMTP_FROM, PLUITS_SMTP_USERNAME and PLUITS_SMTP_PASSWORD, then run: go run ./cmd/email-worker from the backend directory.

SMTP STARTTLS is mandatory. The worker never logs verification tokens or email bodies. Verification and password-reset links resolve through the PLUITS auth route. A real SMTP provider, HTTPS PLUITS deployment, API deployment and exact CORS allowlist must be configured before public account registration is enabled. The frontend first-party API adapter is implemented but remains opt-in; the live frontend continues using its existing Supabase adapter until a reviewed backend cutover. No provider credentials are committed or assumed.

### Self-hosted container stack

The repository now includes a multi-stage, non-root Docker build for the API, migration command and email worker, plus a PostgreSQL 17 Compose stack. It is designed to run on infrastructure controlled by PLUITS; it does not provision a cloud account or purchase compute.

From the backend directory:

1. Copy .env.example to .env.
2. Replace every placeholder. Generate two independent 32-byte keys with openssl rand -base64 32; never reuse the same key for outbox encryption and rate-limit HMAC.
3. Set a long random hexadecimal PostgreSQL password, the exact allowed browser origin, the public PLUITS base URL and real SMTP STARTTLS credentials.
4. Start the stack with docker compose --env-file .env -f compose.yaml up --build -d.
5. Inspect service state with docker compose --env-file .env -f compose.yaml ps and logs with docker compose --env-file .env -f compose.yaml logs -f api email-worker.

The database has a named persistent Docker volume and is not exposed on a host port. The API binds to loopback; place a TLS-terminating reverse proxy in front of it before public access. The email worker is a separate process. The migration container runs before API/worker startup. Apply later migrations with docker compose --env-file .env -f compose.yaml run --rm migrate.

The .env file is ignored by Git. Never commit provider credentials, production keys or database passwords. This Compose setup is a self-hosting baseline, not a claim of high availability: production still needs independent backups and restore drills, monitoring/alerts, host hardening, TLS proxy configuration, capacity/load testing, and a multi-node/replicated database strategy when required. Do not expose the database directly to the internet.

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

Detailed database ownership, global data, identity, privacy and migration rules are documented in [`docs/DATABASE-FOUNDATION-AND-MIGRATION-STRATEGY.md`](docs/DATABASE-FOUNDATION-AND-MIGRATION-STRATEGY.md). The cross-platform domain contracts for profiles, dashboards, transport and accommodation are in [`docs/PLATFORM-DOMAIN-CONTRACTS.md`](docs/PLATFORM-DOMAIN-CONTRACTS.md). The clean first-party account strategy is documented in [`docs/IDENTITY-AND-AUTH-BRIDGE.md`](docs/IDENTITY-AND-AUTH-BRIDGE.md). The PLUITS-owned internal platform architecture is documented in [`docs/INTERNAL-COMPANY-PLATFORM.md`](docs/INTERNAL-COMPANY-PLATFORM.md).

## Data model and migration policy

- Supabase remains the live production source of truth until a separately reviewed migration is completed.
- The new backend starts with its own clean PostgreSQL database. Supabase is a reference/legacy environment only and is not a dependency of the new backend.
- Do not copy production credentials, service-role keys, user passwords, private messages, or personal data into Git.
- Do not create demo users, fake marketplace listings, fake orders, fake reviews, fake balances or seeded social activity.
- Do not modify or replay the existing Supabase migration history.
- Account/membership rules that remain PROPOSED are not treated as approved schema requirements.
- Domain tables must be designed from the approved PLUITS business model, current live schema inventory, privacy boundaries and ownership rules.
- No Supabase account or profile import is planned. New test and production accounts will register directly with the Go API. Any future cross-product data transfer requires explicit approval.
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
| First-party identity, encrypted email outbox, rate limits, workspaces, scoped authorization and product registry | Migrations authored; PostgreSQL CI integration tests run on each main push |
| Argon2id password hashing and opaque token primitives | Implemented in source; CI validation pending |
| AES-256-GCM outbox secret encryption | Implemented in source; CI validation pending |
| Unit and PostgreSQL integration tests | Added; CI run pending |
| Identity schema | Authored: accounts, email addresses, credentials, personal profiles, verification challenges, sessions and security events |
| Registration, verification, login, refresh, logout and password recovery | Implemented in source; PostgreSQL integration tests added |
| Personal workspace and scoped role assignment | Implemented in source; PostgreSQL integration tests added |
| Product authorization policy evaluator | Implemented in source; cross-product isolation integration tests added |
| Current-account endpoint and first-party browser auth adapter | Implemented in source; frontend tests added |
| Profiles and permission-scoped dashboards | Target contract documented; API not started |
| Transport operations | Target contract documented; schema/API not started |
| Accommodation operations | Target contract documented; schema/API not started |
| Social, messaging, media, calls/live | Not started |
| Marketplace and merchant domains | Not started |
| Docker image and self-hosted Compose topology | Implemented in source; not deployed |
| Public API hosting, persistent database and SMTP configuration | Not started; requires controlled host, DNS/TLS and provider configuration |
| First-party frontend auth cutover | Adapter implemented; remains disabled until API deployment and verification |
| Production data migration/cutover | Not started |

The first real account deployment and registration steps are documented in [First PLUITS Account Runbook](docs/FIRST-ACCOUNT-REGISTRATION-RUNBOOK.md). The codebase can be maintained through GitHub from a phone. Signup remains disabled in the live frontend until the first-party API URL, provider mode, deployment secrets and SMTP delivery are configured and tested. A public API still needs a compute host and a database; free hosting limits must be verified before deployment. No paid service or hosting resource has been created by this work.
