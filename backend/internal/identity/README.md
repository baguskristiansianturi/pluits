# First-party identity security primitives

Implemented:
- Normalized email validation and first-party account registration.
- Argon2id password hashing with per-hash parameter encoding and bounded verification parameters.
- One-time email verification challenges with hashed tokens and atomic account activation.
- AES-256-GCM encryption for short-lived delivery secrets in the asynchronous email outbox.
- Opaque 32-byte access and refresh tokens; only SHA-256 hashes are persisted.
- Login rejects unverified/suspended/closed accounts and uses dummy Argon2id work for unknown addresses.
- Refresh rotates tokens; replay of a previously rotated token revokes the entire token family.
- Logout revokes the current session; access-token middleware checks session and account state on each protected request.
- HMAC-keyed PostgreSQL rate limits shared across API instances. Client identifiers are not stored in plaintext.
- Email outbox worker supports row-lock claiming, stale-job recovery, retry backoff and SMTP STARTTLS delivery.

HTTP endpoints are mounted by the API, but remain unavailable unless both PLUITS_OUTBOX_ENCRYPTION_KEY and PLUITS_RATE_LIMIT_KEY are configured. The outbox worker separately requires SMTP settings and PLUITS_PUBLIC_BASE_URL.

Security and release gates still outstanding:
- Password reset/recovery and MFA.
- Full role/permission and product-scope authorization.
- Trusted proxy configuration before using a reverse proxy; the limiter currently keys on RemoteAddr and deliberately ignores untrusted forwarding headers.
- Keyring-based outbox encryption key rotation. The worker currently loads one active key version.
- Rate-limit bucket retention cleanup and operational alerting.
- Independent security review, load testing and deployment hardening.

Do not enable public registration until a real SMTP provider, HTTPS verification page, database migrations, shared rate-limit key and outbox encryption key are configured. Never commit runtime secrets.
