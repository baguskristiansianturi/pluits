# First-party identity security primitives

Implemented:
- Normalized email validation and first-party account registration.
- Argon2id password hashing with per-hash parameter encoding and bounded verification parameters.
- One-time email verification challenges with hashed tokens and atomic account activation.
- AES-256-GCM encryption for short-lived delivery secrets in the asynchronous email outbox.
- Opaque 32-byte access and refresh tokens; only SHA-256 hashes are persisted.
- Login rejects unverified, suspended or closed accounts and uses dummy Argon2id work for unknown addresses.
- Refresh rotates tokens; replay of a previously rotated token revokes the entire token family.
- Logout revokes the current session; access-token middleware checks session and account state on each protected request.
- HMAC-keyed PostgreSQL rate limits shared across API instances. Client identifiers are not stored in plaintext.
- Email outbox worker supports row-lock claiming, stale-job recovery, retry backoff and SMTP STARTTLS delivery.
- Password recovery uses generic responses, one-time hashed challenges, encrypted email delivery and session-family revocation after reset.
- Registration creates a personal workspace, membership, owner role and versioned Terms/Privacy consent records.
- Product access requires both an explicit workspace-to-product grant and a product-scoped role/permission.
- Current-account endpoint returns only the authenticated account's verified primary identity, personal profile and workspace roles.

HTTP endpoints are mounted by the API, but identity routes remain unavailable unless both PLUITS_OUTBOX_ENCRYPTION_KEY and PLUITS_RATE_LIMIT_KEY are configured. The email worker separately requires SMTP settings and PLUITS_PUBLIC_BASE_URL.

Release gates still outstanding:
- MFA and trusted-device controls.
- Keyring-based outbox encryption key rotation; the worker currently loads configured key versions.
- Rate-limit bucket retention cleanup and operational alerting.
- Full product-specific permission catalogs and admin-granted product access workflows.
- Trusted proxy configuration before using a reverse proxy; rate limiting currently keys on RemoteAddr and deliberately ignores untrusted forwarding headers.
- Independent security review, load testing, backup/restore drills and deployment hardening.

Do not enable public registration until a persistent PLUITS-owned PostgreSQL database, real SMTP provider, HTTPS verification page, exact CORS allowlist, API deployment, outbox encryption key and rate-limit HMAC key are configured. Never commit runtime secrets. The frontend adapter for the first-party API is implemented but remains opt-in; the live site must not be switched until the complete registration and verification journey is exercised.
