# PLUITS Self-Hosted Operations

**Scope:** deploy and operate the PLUITS Go/PostgreSQL backend on a host controlled by PLUITS Official Indonesia. This guide does not assume a specific hosting company, DNS provider or paid plan.

## Network topology

```text
Internet
  |
  | TCP 80/443, UDP 443
  v
Caddy HTTPS edge (public ingress, automatic TLS)
  |
  +---- Go API :8080 (private Docker network)
           |
           +---- PostgreSQL 17 (private only)
           |
           +---- encrypted email outbox
  |
Email worker ---- outbound SMTP STARTTLS
Backup worker --- PostgreSQL dump -> age encryption -> persistent backup volume
```

Only Caddy publishes host ports. PostgreSQL has no published port. The API has no published host port. The API and email worker share the internal data network and a restricted outbound network; the database is only on the internal data network. The backup worker has no internet-facing port and encrypts dumps before writing them to disk.

## Host and DNS prerequisites

- A PLUITS-controlled Linux host with Docker Engine and Compose v2.
- Persistent storage with sufficient capacity for PostgreSQL, WAL growth, encrypted dumps and logs.
- A stable public IP address.
- DNS A/AAAA record for the API hostname pointing to that IP.
- Inbound TCP 80/443 and UDP 443 allowed; outbound SMTP STARTTLS and ACME HTTPS allowed.
- A real SMTP sender with a verified sending domain and STARTTLS support.
- A monitored host clock using NTP.

Do not expose port 5432 or 8080 to the public internet. If a firewall is available, allow only required inbound ports. Restrict SSH to trusted operator access and key-based authentication.

## Secret generation

Run these commands on the host, not in a public chat or committed script:

```sh
openssl rand -hex 24
openssl rand -base64 32
openssl rand -base64 32
age-keygen -o pluits-backup-key.txt
```

Assign the three random outputs independently:
1. PostgreSQL password (hex output).
2. Email outbox AES-256-GCM encryption key.
3. Rate-limit HMAC key.

The age key file contains the private decryption identity. Keep it offline in at least two protected copies. Copy only its public recipient (the `age1...` value) into `PLUITS_BACKUP_AGE_RECIPIENT`. Loss of the private key makes encrypted database backups unrecoverable.

Never reuse the encryption key as the rate-limit key. Never commit the .env file or private age key.

## Deploy and verify

```sh
cd backend
cp .env.example .env
# Edit .env locally on the host. Replace every placeholder.
docker compose --env-file .env -f compose.yaml config --quiet
docker compose --env-file .env -f compose.yaml up --build -d
docker compose --env-file .env -f compose.yaml ps
docker compose --env-file .env -f compose.yaml logs --tail=100 api email-worker edge backup
```

Caddy obtains and renews TLS certificates for `PLUITS_API_DOMAIN`. The DNS record must already point to the host, and ports 80/443 must be reachable. The API is reachable through Caddy at `https://PLUITS_API_DOMAIN`.

Verify:
- `GET /health/live` returns 200.
- `GET /health/ready` returns 200 only when PostgreSQL responds.
- Allowed browser origin receives the exact CORS header; an unlisted origin is rejected.
- Registration writes a pending account and encrypted outbox record atomically.
- SMTP worker delivers the verification message without logging its token.
- A non-empty encrypted backup and matching SHA-256 file appear in the backup volume.
- A restore drill into a separate disposable database succeeds.

## Backup and restore

The backup worker performs a compressed PostgreSQL custom-format dump and encrypts it using age. It writes a UTC timestamped `.dump.age` file and checksum. Default schedule is 24 hours; default retention is 14 days.

Inspect the backup container:
```sh
docker compose --env-file .env -f compose.yaml logs --tail=100 backup
docker compose --env-file .env -f compose.yaml exec backup ls -lh /backups
```

Restore drill (run on a trusted machine holding the private age key):
```sh
age --decrypt --identity pluits-backup-key.txt pluits-postgres-YYYYMMDDTHHMMSSZ.dump.age > restore.dump
pg_restore --list restore.dump
```

For a full restore, create an empty PostgreSQL 17 database, then use `pg_restore --clean --if-exists --no-owner --no-acl --dbname="$RESTORE_DATABASE_URL" restore.dump`. Validate migration ledger, account counts, ownership constraints, indexes and representative reads before directing traffic to the restored database.

**Disaster recovery requirement:** the Compose backup volume is on the same host as PostgreSQL and protects against logical mistakes, not host/disk loss. Before production signup, copy encrypted backup files to a second PLUITS-controlled host or storage location with separate credentials and test restoration from that copy. This repository does not yet configure remote replication automatically.

## Operations checklist

- [ ] Host firewall and SSH access hardened.
- [ ] DNS A/AAAA record and public TLS verified.
- [ ] PostgreSQL port not published.
- [ ] API port not published; Caddy is the only ingress.
- [ ] Persistent PostgreSQL volume verified.
- [ ] Independent application secrets generated and stored securely.
- [ ] SMTP STARTTLS delivery tested.
- [ ] Encrypted backup generated and checksum verified.
- [ ] Private age key stored offline with recovery copies.
- [ ] Off-host encrypted backup replication configured.
- [ ] Restore drill from off-host backup passed.
- [ ] Host disk, CPU, memory, service health and backup freshness monitored.
- [ ] Signup remains disabled until every release gate passes.

## Current limitations

This stack is a self-hostable foundation, not a fully operated production service. No host, DNS record, SMTP sender or persistent server has been provisioned by repository changes. Object storage/media processing, realtime delivery, WebRTC/SFU, observability dashboards and automated off-host backup replication are not yet implemented. Do not claim the platform is production-ready until these requirements are addressed for the features being launched.
