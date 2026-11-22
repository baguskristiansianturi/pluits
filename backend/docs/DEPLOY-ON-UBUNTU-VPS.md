# Deploy PLUITS Backend on an Ubuntu VPS

This is the provider-independent production deployment path for the existing PLUITS Go + PostgreSQL stack. It runs the repository's Docker Compose topology: PostgreSQL 17, migration runner, Go API, SMTP worker, Caddy HTTPS edge and encrypted backup worker.

The VPS is infrastructure only. PLUITS owns the application code, API, database schema, migrations and operational configuration. No managed-backend SDK or provider-specific database client is introduced.

## What is required before deployment

- An Ubuntu 24.04 LTS VPS with a stable public IPv4 address and persistent disk.
- A domain name controlled by PLUITS, with an API hostname such as `api.<your-domain>`.
- DNS A record for that hostname pointing to the VPS IPv4 address.
- VPS firewall allowing inbound TCP 80/443 and UDP 443. Keep SSH restricted to trusted access. Do not expose TCP 5432 or 8080.
- A real SMTP sender with STARTTLS support and credentials.
- A secure way to keep the PostgreSQL password, independent application keys and backup decryption key.
- An off-host destination for encrypted backups before real user data is accepted.

A public HTTPS API hostname is required because the frontend is served over HTTPS. Do not use a raw HTTP IP address for the browser API.

## 1. Prepare the server

Connect to the VPS over SSH using its normal non-root account. Download the bootstrap script from the public repository, then run it:

```sh
git clone --depth 1 https://github.com/baguskristiansianturi/pluits.git /tmp/pluits-bootstrap
sudo bash /tmp/pluits-bootstrap/backend/scripts/bootstrap-ubuntu-24.04.sh
```

The script installs Docker Engine and Compose v2, clones the repository into `/opt/pluits`, prepares the backup directory and copies the environment template without replacing an existing `.env`.

Disconnect and reconnect SSH after bootstrap so the account receives Docker group membership.

## 2. Configure production values

Edit `/opt/pluits/backend/.env` on the VPS. Never commit this file or paste its secrets into a public issue/chat.

Generate independent values on the VPS:

```sh
openssl rand -hex 24
openssl rand -base64 32
openssl rand -base64 32
age-keygen -o pluits-backup-key.txt
```

Use the first output for `POSTGRES_PASSWORD`, the second for `PLUITS_OUTBOX_ENCRYPTION_KEY`, and the third for `PLUITS_RATE_LIMIT_KEY`. Do not reuse keys. Keep the age private key offline in at least two protected copies; set only its public `age1...` recipient in `PLUITS_BACKUP_AGE_RECIPIENT`.

Set these values in `.env`:
- `PLUITS_API_DOMAIN`: the DNS hostname pointed to this VPS.
- `PLUITS_TLS_CONTACT_EMAIL`: an email address for TLS certificate notices.
- `PLUITS_ALLOWED_ORIGINS`: the exact HTTPS origin of the deployed PLUITS frontend, without a path. For the current GitHub Pages project site this is `https://baguskristiansianturi.github.io`.
- `PLUITS_PUBLIC_BASE_URL`: the public PLUITS site URL used in verification links.
- `PLUITS_SMTP_HOST`, `PLUITS_SMTP_PORT`, `PLUITS_SMTP_FROM`, `PLUITS_SMTP_USERNAME`, and `PLUITS_SMTP_PASSWORD`: the real SMTP STARTTLS configuration.
- `PLUITS_BACKUP_AGE_RECIPIENT`: the public recipient printed by `age-keygen`.
- Keep `PLUITS_TRUSTED_PROXY_CIDRS` aligned with `PLUITS_EDGE_PROXY_IP` and the Compose data subnet. Do not expose database or API ports.

Keep `VITE_PUBLIC_SIGNUP_ENABLED=false` in the GitHub Pages repository variable until all release gates are complete. After the API passes its HTTPS health checks, set the GitHub repository Actions variable `VITE_API_BASE_URL` to `https://<PLUITS_API_DOMAIN>`, then run the existing **Build and deploy PLUITS to GitHub Pages** workflow once. This rebuilds the frontend with the real API address; it does not enable public signup.

## 3. First deployment

On the VPS, run:

```sh
cd /opt/pluits
bash backend/scripts/deploy.sh
```

The script fetches the selected branch, validates required configuration, validates the Compose model, builds the existing container targets, runs the migration job and starts the stack. It refuses to deploy while required `.env` values still contain template placeholders.

Caddy obtains and renews HTTPS certificates automatically once DNS and firewall routing are correct.

Verify:
- `https://<PLUITS_API_DOMAIN>/health/live` returns HTTP 200.
- `https://<PLUITS_API_DOMAIN>/health/ready` returns HTTP 200 only when PostgreSQL is reachable.
- An unlisted browser origin does not receive an allowed CORS response.
- A controlled registration request creates a pending account and encrypted outbox message.
- The SMTP worker delivers the verification email.
- An encrypted database backup and checksum are created.
- A restore drill from an off-host encrypted backup succeeds.

Useful commands:

```sh
cd /opt/pluits/backend
docker compose --env-file .env -f compose.yaml ps
docker compose --env-file .env -f compose.yaml logs --tail=100 api email-worker edge backup
```

## 4. Automatic deployment from GitHub

After the first manual deployment works, add these GitHub Actions repository secrets:

| Secret | Value |
|---|---|
| `PLUITS_DEPLOY_HOST` | VPS IP address or hostname |
| `PLUITS_DEPLOY_USER` | SSH account added to the Docker group |
| `PLUITS_DEPLOY_SSH_KEY` | Private SSH key authorized for that account |
| `PLUITS_DEPLOY_KNOWN_HOSTS` | Verified SSH host-key line for the VPS |
| `PLUITS_DEPLOY_PORT` | Optional; defaults to `22` |
| `PLUITS_DEPLOY_PATH` | Optional; defaults to `/opt/pluits` |

The workflow `.github/workflows/deploy-backend.yml` deploys only when backend files change on `main`, or when manually started. It uses strict SSH host-key checking. It does not store the VPS password, application secrets, SMTP password or database password in GitHub.

## 5. Production release gates

Keep public signup disabled until all of these are complete:

- [ ] VPS access, firewall, DNS and HTTPS verified.
- [ ] Persistent PostgreSQL volume verified; database port remains private.
- [ ] Independent application secrets configured.
- [ ] SMTP STARTTLS delivery verified using a controlled mailbox.
- [ ] Encrypted backups created and checksum verified.
- [ ] Encrypted backups replicated to a separate location with separate credentials.
- [ ] Restore drill from the off-host copy passed.
- [ ] Host monitoring and alerting configured.
- [ ] Health/readiness and exact CORS behavior verified.
- [ ] Real registration, email verification, login, refresh rotation, logout and password recovery tested.
- [ ] Final legal documents and durable consent requirements reviewed.

The local backup volume is on the same VPS and is not disaster recovery. Do not accept real user data until off-host replication and a restore drill pass. Never seed fake users or manually bypass email verification.
