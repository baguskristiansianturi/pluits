# PLUITS Independent Backend

**Status:** FOUNDATION IN PROGRESS — not deployed and not connected to production.

This is the beginning of a first-party PLUITS backend codebase. It is intentionally isolated from the existing frontend and Supabase production runtime while the migration is designed and validated.

## Goals

The backend must eventually support the complete PLUITS ecosystem: global identity and account security, profiles, social feed and media, stories/reels, messaging, realtime presence and notifications, voice/video calling, live streaming, GeoDirectory, Marketplace, merchant operations, trips, and future platform services.

The backend must preserve the existing business boundaries:
- Marketplace is the customer discovery and transaction layer.
- Store and Restaurant & Café own their merchant operations.
- Social identity is shared across applications, while authorization is scoped by role, ownership, membership, and permissions.
- User privacy and server-side authorization are mandatory.

## Current implementation

- Go HTTP server with conservative request timeouts and graceful shutdown.
- `GET /health/live` verifies that the process is running.
- `GET /health/ready` verifies database connectivity and returns 503 until a database is configured and reachable.
- PostgreSQL driver is included; no database schema or production data is created or changed.

## Run

Requires Go 1.23+ and a PostgreSQL connection supplied through `DATABASE_URL`.

```sh
cd backend
go mod tidy
DATABASE_URL='postgres://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require' go run ./cmd/api
```

Check:
- `GET /health/live`
- `GET /health/ready`

Run tests:

```sh
go test ./...
```

## Non-negotiable migration safety

- Existing Supabase remains the current production source of truth until a separately reviewed migration is completed.
- Never copy production credentials, service-role keys, user passwords, private messages, or personal data into Git.
- Do not create demo users, fake marketplace listings, fake orders, or seeded social activity.
- Do not modify or replay the existing Supabase migration history.
- New schema changes must be additive, documented, tested, and accompanied by an export/import and rollback plan.
- Authentication migration must preserve account ownership and provide a secure credential-reset or verified credential-transfer path; plaintext passwords are never exported.
- Do not switch the frontend to this API until authentication, authorization, privacy, media access, and recovery tests pass.

## Delivery status

| Capability | Status |
|---|---|
| Independent Go service skeleton | Implemented in source |
| Liveness/readiness endpoints | Implemented in source |
| Automated Go tests | Added; execution pending a Go build environment |
| PostgreSQL schema | Not started |
| Identity/authentication | Not started |
| Social, messaging, media, marketplace | Not started |
| Public hosting/deployment | Not started |
| Production cutover | Not started |

The initial development environment can be maintained through GitHub from a phone. A running public API still requires a compute host and database; free hosting availability and limits must be verified before deployment.
