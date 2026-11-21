# First PLUITS Account — Release and Registration Runbook

This runbook is the final operational path from the current tested code to the first real account. It does not create fake users and does not use the existing Supabase project.

## Current readiness

Implemented in source:
- First-party Go API registration, email verification, login, refresh rotation, logout and password recovery.
- PostgreSQL migrations through product registry and scoped authorization.
- Encrypted email outbox and SMTP STARTTLS worker.
- Browser adapter, email verification route and password-reset route.
- Docker images and a self-hosted PostgreSQL/API/worker Compose stack.

Still required before the first real registration:
- A host controlled by PLUITS Official Indonesia that can run Docker Compose and remain online.
- A persistent disk/volume and backup destination for PostgreSQL.
- A DNS name and HTTPS reverse proxy for the API.
- A real SMTP sender account and credentials.
- Runtime secrets generated on the host.
- GitHub Pages build variables for the first-party API.

No server, database, domain, SMTP account or paid resource has been provisioned by this repository work.

## 1. Prepare the host

Install Docker Engine and the Docker Compose plugin on the chosen PLUITS-controlled host. Do not expose PostgreSQL publicly. The included Compose file binds the API to loopback so a TLS reverse proxy can forward requests to it.

Copy backend/.env.example to backend/.env on the host. Do not upload the completed .env file to GitHub or paste its secrets into chat.

Generate independent secrets on the host:
- PLUITS_OUTBOX_ENCRYPTION_KEY: openssl rand -base64 32
- PLUITS_RATE_LIMIT_KEY: openssl rand -base64 32
- POSTGRES_PASSWORD: openssl rand -hex 24

Use the first key only for encrypted email payloads and the second only for HMAC rate-limit identifiers. Set POSTGRES_PASSWORD to the hexadecimal output so it remains URL-safe in the internal PostgreSQL connection URL.

Set:
- PLUITS_ALLOWED_ORIGINS to the exact frontend origin, currently https://baguskristiansianturi.github.io. Never use *.
- PLUITS_PUBLIC_BASE_URL to https://baguskristiansianturi.github.io/pluits
- PLUITS_SMTP_HOST, PLUITS_SMTP_PORT=587, PLUITS_SMTP_FROM, PLUITS_SMTP_USERNAME and PLUITS_SMTP_PASSWORD to the real provider settings.

## 2. Start the backend

From backend/ on the host:
- docker compose --env-file .env -f compose.yaml up --build -d
- docker compose --env-file .env -f compose.yaml ps
- docker compose --env-file .env -f compose.yaml logs --tail=100 api email-worker

The migration service applies the numbered migrations before the API and email worker start. PostgreSQL data is held in the named pluits-postgres-data volume.

Configure the host's HTTPS reverse proxy to forward to 127.0.0.1:8080. Keep PostgreSQL private. Configure monitoring, encrypted backups and tested restore procedures before storing valuable user data.

## 3. Verify service and browser connectivity

Check:
- GET https://api.<PLUITS-owned-domain>/health/live
- GET https://api.<PLUITS-owned-domain>/health/ready

Check CORS preflight from the configured frontend origin. The API must return 204 and the exact Access-Control-Allow-Origin value; an unlisted origin must receive 403.

Check email delivery using a controlled mailbox before enabling public signup. The worker must deliver the verification message and mark the outbox row sent. Never inspect, print or log the one-time token outside the intended email link.

## 4. Connect the PLUITS frontend

In GitHub repository settings, open Settings → Secrets and variables → Actions → Variables. Set:
- VITE_AUTH_PROVIDER = first-party
- VITE_API_BASE_URL = https://api.<PLUITS-owned-domain>
- VITE_PUBLIC_SIGNUP_ENABLED = false for the first deployment

The Pages workflow reads these variables at build time. Deploy with signup disabled first and verify that the existing public site loads and the first-party API can be reached. The legacy Supabase adapter remains selected until the first-party provider variable is changed.

Only after the HTTPS API, CORS, SMTP verification, database persistence and backup checks pass, set VITE_PUBLIC_SIGNUP_ENABLED = true and run the Pages workflow again.

## 5. First real account test

Once the first-party build is deployed:
1. Open the PLUITS registration page.
2. Enter the real account details and accept the current Terms of Service and Privacy Policy.
3. Submit registration. The API should return a generic accepted response and create one pending account, profile, personal workspace, owner membership, consent records and encrypted outbox item.
4. Open the verification email and follow its one-time link.
5. Return to PLUITS and sign in with the same email and password.
6. Verify the account profile and personal workspace through GET /v1/identity/me.
7. Test logout, sign in again, and password recovery using the same mailbox.

The first account is created by the real registration flow. Do not manually insert an account row, disable verification, seed a user or expose an outbox token.

## Stop conditions

Do not enable signup if any of these are missing: persistent database, HTTPS API, exact CORS allowlist, independent encryption and HMAC keys, SMTP delivery, verified email link routing, backups and successful restore validation.

Do not run the Compose stack on an ephemeral host or assume a free database tier is persistent. The code is self-hostable; durable global service availability still depends on the physical infrastructure and operational controls selected by PLUITS.
