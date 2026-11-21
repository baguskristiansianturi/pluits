# PLUITS Backend

**Owner:** PLUITS Official Indonesia  
**Runtime:** Go API + PostgreSQL, deployed by PLUITS on infrastructure it controls.  
**Status:** identity foundation and self-hosted container topology are implemented in source; no production host or domain has been provisioned.

## Platform components

| Component | Responsibility | Implementation |
|---|---|---|
| Go API | Identity, account sessions, health/readiness, domain APIs | `cmd/api` |
| PostgreSQL 17 | Transactional source of truth | Private Compose network + persistent volume |
| Migration runner | Ordered, checksummed, advisory-locked SQL migrations | `cmd/migrate` |
| Email worker | Encrypted transactional outbox and SMTP STARTTLS | `cmd/email-worker` |
| HTTPS edge | TLS certificate automation and reverse proxy | Caddy; only public ingress |
| Backup worker | Daily compressed PostgreSQL dumps encrypted with age | Separate non-root container |
| CI | Unit, PostgreSQL integration, race, build and Compose validation | GitHub Actions |

There is no managed backend SDK in the browser runtime. Browser identity requests use only the PLUITS Go API. If the API origin is not configured, guest pages remain available and account actions report that the PLUITS backend is not connected; there is no provider fallback or synthetic account path.

## Implemented identity capabilities

- Argon2id password hashing and bounded password verification.
- Email normalization, duplicate-safe registration and pending-verification account lifecycle.
- Transactional creation of the account, email, credential, personal profile, consent records, personal workspace, membership roles, product grant, verification challenge and encrypted email-outbox message.
- One-time expiring email verification and password recovery challenges.
- Opaque access and refresh tokens, hashed token storage, refresh rotation/reuse detection and logout revocation.
- Account endpoint, scoped product authorization and database-backed rate limiting.
- Encrypted outbox payloads and separate SMTP STARTTLS delivery worker.

Identity endpoints:
- `POST /v1/identity/register`
- `POST /v1/identity/verify-email`
- `POST /v1/identity/resend-verification`
- `POST /v1/identity/login`
- `POST /v1/identity/refresh`
- `POST /v1/identity/logout`
- `POST /v1/identity/password-reset/request`
- `POST /v1/identity/password-reset/complete`
- `GET /v1/identity/me`

Identity routes are enabled only when the required encryption and rate-limit secrets are configured. Never put runtime secrets in Git, Vite variables or browser bundles.

## Self-hosted deployment

The Compose stack contains PostgreSQL, the migration job, Go API, email worker, Caddy HTTPS edge and encrypted backup worker. It uses:
- A private internal data network for PostgreSQL and application traffic.
- A separate outbound network for API/email worker connections.
- Caddy as the only internet-facing ingress on TCP 80/443 and UDP 443.
- No public PostgreSQL port and no direct public API port.
- Persistent named volumes for PostgreSQL, encrypted backups and TLS state.
- Non-root/distroless API and worker containers, read-only root filesystems, dropped Linux capabilities and no-new-privileges.

### Host preparation

1. Prepare a Linux host controlled by PLUITS Official Indonesia with Docker Engine and Docker Compose v2.
2. Point the API DNS A/AAAA record to the host public IP. Permit inbound TCP 80/443 and UDP 443; do not expose PostgreSQL.
3. Copy `.env.example` to `.env` on the host. Replace every placeholder.
4. Generate independent secrets:
   - `openssl rand -hex 24` for the PostgreSQL password.
   - `openssl rand -base64 32` for the outbox encryption key.
   - A second `openssl rand -base64 32` for the rate-limit HMAC key.
   - `age-keygen -o pluits-backup-key.txt`; store the private key offline and place only its public recipient in `PLUITS_BACKUP_AGE_RECIPIENT`.
5. Configure the exact frontend origin, public app URL, API domain, ACME contact email and real SMTP STARTTLS sender.
6. Start from this directory:
   ```sh
   docker compose --env-file .env -f compose.yaml config --quiet
   docker compose --env-file .env -f compose.yaml up --build -d
   docker compose --env-file .env -f compose.yaml ps
   docker compose --env-file .env -f compose.yaml logs --tail=100 api email-worker edge backup
   ```
7. Verify `https://<PLUITS_API_DOMAIN>/health/live` and `/health/ready`, exact CORS behavior, email delivery, backup creation and a restore drill.

The backup worker runs a full PostgreSQL dump every 24 hours, compresses it, encrypts it to the configured age public key and retains 14 days by default. The private key is never placed on the server. The local backup volume is on the same host; it is not an off-site disaster-recovery copy. Before accepting real user data, replicate encrypted backups to a separately controlled location and test restoration from that copy.

See [Self-Hosted Operations](docs/SELF-HOSTED-OPERATIONS.md) and [First Real Account Runbook](docs/FIRST-ACCOUNT-REGISTRATION-RUNBOOK.md).

## Domain implementation status

The backend foundation is not the complete PLUITS platform. Identity is the first implemented domain. Profile, Social, Inbox, media/object storage, realtime, calls/live, GeoDirectory, Marketplace, Store, Restaurant & Café, Trips, moderation and ledger still require PLUITS-owned schemas, APIs, workers and authorization tests. Follow the domain register in [PLUITS-Owned Infrastructure Migration](docs/PLUITS-OWNED-INFRASTRUCTURE-MIGRATION.md).

## Local development

From `backend/`:
```sh
go test ./...
go run ./cmd/migrate -command=up
go run ./cmd/api
```

PostgreSQL integration tests run when `DATABASE_TEST_URL` is set. CI provisions a disposable PostgreSQL 17 service; it is not a production database.

## Operational safety

- Do not enable public signup before HTTPS, persistent PostgreSQL, SMTP, exact CORS, encrypted backups, off-site replication and successful restore validation are proven.
- Never seed demo users, fake reviews, orders, balances or social activity.
- Never manually insert the first account or bypass email verification.
- Keep PostgreSQL private. Do not expose the database port to the internet.
- Keep the age private key and application secrets offline/in a secure secret manager; never commit `.env`.
- Apply migrations explicitly and keep them immutable after application.
- Do not provision paid infrastructure without the product owner's explicit approval.
