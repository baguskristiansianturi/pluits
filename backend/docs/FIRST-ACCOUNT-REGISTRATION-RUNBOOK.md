# First PLUITS Account — Release Runbook

This runbook creates the first genuine account through the PLUITS-owned Go API. It does not create synthetic users or seed data.

## Current readiness

Implemented in source:
- Go identity API and PostgreSQL migrations.
- Registration, verification, login, refresh rotation, logout and password recovery.
- Encrypted transactional email outbox and SMTP STARTTLS worker.
- First-party browser adapter.
- Self-hosted Compose stack with PostgreSQL, migration job, API, email worker, HTTPS edge and encrypted local backup worker.

Still required:
- A PLUITS-controlled always-on host and persistent disk.
- API DNS name and publicly reachable HTTPS.
- Real SMTP sender credentials.
- Independent application secrets and an offline backup decryption key.
- Off-host encrypted backup replication and a successful restore drill.
- Host monitoring and alerting.

No production host, DNS, SMTP sender or paid resource has been provisioned by repository work.

## 1. Prepare the host

Install Docker Engine and Docker Compose v2 on a Linux host controlled by PLUITS Official Indonesia. Point the API DNS A/AAAA record to the host. Permit inbound TCP 80/443 and UDP 443. Do not expose PostgreSQL or the Go API directly.

Copy `backend/.env.example` to `backend/.env` on the host. Replace every placeholder. Generate:
- PostgreSQL password: `openssl rand -hex 24`
- Email outbox encryption key: `openssl rand -base64 32`
- Rate-limit HMAC key: `openssl rand -base64 32` (independent)
- Backup encryption keypair: `age-keygen -o pluits-backup-key.txt`

Keep the age private key offline and configure only its public `age1...` recipient. Configure the exact frontend origin, API domain, TLS contact email, app URL and SMTP STARTTLS credentials.

## 2. Start the self-hosted stack

From `backend/` on the host:

```sh
docker compose --env-file .env -f compose.yaml config --quiet
docker compose --env-file .env -f compose.yaml up --build -d
docker compose --env-file .env -f compose.yaml ps
docker compose --env-file .env -f compose.yaml logs --tail=100 api email-worker edge backup
```

Caddy obtains and renews the API TLS certificate. PostgreSQL has no public port; Caddy is the only public ingress. Verify:
- `https://<API_DOMAIN>/health/live`
- `https://<API_DOMAIN>/health/ready`
- Allowed CORS origin is accepted; unlisted origins are rejected.
- SMTP verification and recovery messages reach a controlled mailbox.
- An encrypted backup is created and can be decrypted with the offline key.
- A restore drill from the off-host backup copy succeeds.

The local backup volume alone is not disaster recovery. Replicate encrypted dumps to a second PLUITS-controlled location before storing real user data.

## 3. Connect the frontend

In GitHub repository Settings → Secrets and variables → Actions → Variables, set:
- `VITE_API_BASE_URL=https://<API_DOMAIN>`
- `VITE_PUBLIC_SIGNUP_ENABLED=false` initially.

The authentication provider is fixed to the PLUITS first-party adapter in source; no provider selector variable is used. Deploy, verify guest pages and API connectivity, then test the complete identity flow with a controlled mailbox.

## 4. First genuine account

Only after all release gates pass:
1. Set `VITE_PUBLIC_SIGNUP_ENABLED=true` and deploy.
2. Open PLUITS registration.
3. Enter the founder's real account details and accept the current legal documents.
4. Submit. The API creates the pending account, profile, consent, workspace, membership, product grant and encrypted outbox item in one transaction.
5. Verify using the one-time email link.
6. Sign in and check `GET /v1/identity/me`.
7. Test refresh rotation, logout and password recovery.

Never manually insert an account, disable verification, seed a fake user or expose the outbox token.

## Stop conditions

Keep signup disabled if any of these are missing: durable PostgreSQL, HTTPS API, exact CORS, independent secrets, SMTP delivery, encrypted backup, off-host replication, successful restore drill and host monitoring. A development Codespace or ephemeral runner is not production hosting.
