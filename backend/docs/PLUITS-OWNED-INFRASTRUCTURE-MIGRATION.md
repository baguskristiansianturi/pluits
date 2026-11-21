# PLUITS-Owned Infrastructure and Backend Migration

**Decision:** PLUITS runs its own Go services and PostgreSQL on infrastructure controlled by PLUITS Official Indonesia. The browser has one first-party identity adapter and no provider fallback.

**Current status:** identity source and a self-hosted deployment topology exist. No durable production host, DNS, SMTP sender or production database has been provisioned. No real account has been created on the new runtime.

## Target infrastructure

| Layer | PLUITS-owned implementation |
|---|---|
| Web frontend | Current static frontend deployment; browser calls PLUITS API |
| API | Go HTTP services under `backend/` |
| Database | PostgreSQL 17, private network and persistent volume |
| Identity | Argon2id, one-time email verification, opaque rotating sessions |
| Email | Encrypted transactional outbox + SMTP STARTTLS worker |
| HTTPS ingress | Caddy reverse proxy and automatic TLS |
| Backups | Compressed PostgreSQL dumps encrypted with age |
| Background work | Separate Go workers and durable outbox/job processing |
| Media | Private object storage adapter and processing workers — not implemented |
| Realtime | Authenticated event gateway — not implemented |
| Operations | CI, migration checks, backups, restore drills, monitoring and secret rotation |

## Implemented now

- Go API and health/readiness endpoints.
- PostgreSQL pool, explicit immutable migrations and migration checksums/lock.
- First-party identity endpoints, account/session lifecycle and scoped authorization.
- Encrypted email outbox and SMTP worker.
- Self-hosted Compose topology: PostgreSQL, migration job, API, email worker, Caddy and encrypted backup worker.
- Private Docker data network; only HTTPS edge publishes internet-facing ports.
- Authentication rate limiting reads forwarded client IP only from the exact configured edge-proxy address.
- No production secrets, hostnames or credentials committed.

## Domain migration register

| Domain | PLUITS-owned work still required |
|---|---|
| Identity | Production host, SMTP, MFA for privileged roles, off-host backup and accepted end-to-end account test |
| Profile | Profile/privacy schema and APIs, visibility and account lifecycle tests |
| Social | Posts, comments, reactions, follows, Stories/Reels, visibility preferences, feed APIs and moderation |
| Inbox | Conversation/message schema, membership/block enforcement, receipts, deletion/undo, realtime gateway |
| Media | Private object storage, scoped upload/download, processing, transcoding, retention and deletion |
| GeoDirectory | Canonical entities, location/category indexes, source provenance, claim/review workflow |
| Marketplace | Discovery/checkout/orders/payment lifecycle and transaction idempotency |
| Store | Merchant workspace, roles, catalog, variants, inventory and verification |
| Restaurant & Café | Menus, tables, live dine-in sessions, calls, orders and payment lifecycle |
| Trips & Services | Itineraries, availability, booking and provider fulfillment |
| Trust & Safety | Reports, moderation queue, appeals, audit and abuse prevention |
| Ledger | Double-entry ledger, reconciliation, idempotency and financial audit before balances are exposed |

## Delivery sequence

1. Finish self-hosted infrastructure, TLS, encrypted backups, off-host replication and restore validation.
2. Deploy identity API and email worker with signup disabled.
3. Complete genuine account end-to-end tests, including email verification, session rotation, logout and password recovery.
4. Implement profile and privacy APIs.
5. Implement Social and Inbox as separate domains with server-side authorization and real-time delivery.
6. Implement private media storage and asynchronous processing before enabling photo/video-heavy experiences.
7. Implement GeoDirectory, then Store and Restaurant & Café operations, then Marketplace integration.
8. Add calls/live and ledger only after their dedicated infrastructure and security gates pass.

Every domain needs versioned PostgreSQL migrations, Go API contracts, positive and negative authorization tests, observability, backup/restore impact review and accepted UAT before release.

## Production release gates

- PLUITS-controlled host, DNS, HTTPS and firewall verified.
- PostgreSQL persistent volume and private network verified.
- Independent encryption and HMAC secrets.
- SMTP STARTTLS delivery verified.
- Encrypted backup and off-host replication verified.
- Restore drill from off-host copy passed.
- Monitoring/alerts and host access hardening completed.
- API readiness and exact CORS verified.
- Real account registration/verification/login/reset tested.
- Signup remains disabled until all above are accepted.

## Known blockers

The repository cannot provision physical/cloud compute, DNS, a sender mailbox or private runtime secrets on the owner's behalf. Those require access and credentials controlled by the owner. Object storage, media processing, realtime, domain APIs beyond identity and automated off-host backup replication are not yet implemented. Do not describe the whole platform as complete until those are built and tested.
