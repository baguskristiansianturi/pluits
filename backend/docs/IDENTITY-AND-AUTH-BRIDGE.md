# PLUITS First-Party Identity Architecture

**Status:** implemented foundation; production deployment and real-account acceptance remain blocked on host, DNS/TLS, SMTP, off-host backups and operational verification.

## Authority

The Go identity service and PLUITS-owned PostgreSQL database are the sole identity authority. The browser calls the first-party adapter only. No provider fallback or local synthetic account is supported.

## Identity capabilities in source

- Registration with normalized email and Argon2id password hash.
- Generic duplicate-registration response to reduce account enumeration.
- Pending-verification lifecycle and single-use expiring email challenge.
- Transactional account, email, credential, profile, consent, workspace, role and product-grant creation.
- Encrypted email outbox and separate SMTP STARTTLS worker.
- Login with opaque access and refresh tokens.
- Refresh rotation and token-family replay revocation.
- Logout/session revocation and current-account endpoint.
- Password recovery and completion flow.
- Database-backed rate limiting with HMAC identifiers.
- Product/workspace authorization based on explicit grants.

## First real account acceptance

1. Configure the PLUITS-controlled PostgreSQL host and run immutable migrations.
2. Configure independent encryption and rate-limit keys.
3. Configure SMTP STARTTLS and confirm verification and recovery mail delivery.
4. Configure HTTPS API origin and exact CORS allowlist.
5. Verify encrypted local backup, off-host replication and restore drill.
6. Configure the frontend API base URL with signup disabled.
7. Verify health/readiness, CORS, registration pending state, verification email, login, refresh rotation, logout and password reset.
8. Enable public signup only after all release gates pass.

Never create a seed account, manually insert an account row, disable verification or expose one-time challenge tokens in logs.

## Data model principles

- UUIDs for account/workspace/session IDs.
- Unique normalized email.
- Versioned password hash parameters.
- Hash-at-rest one-time verification and recovery tokens.
- Opaque refresh token hashes and token-family revocation.
- Profile data separate from credentials.
- Explicit lifecycle states and UTC timestamps.
- Workspace and product grants separate from global identity.
- Transactional outbox for email.
- MFA and step-up verification required before privileged staff/admin operations.

## Security acceptance

- Password and challenge secrets never logged or returned.
- Registration/login/reset resist account enumeration.
- Rate limits and abuse monitoring on authentication endpoints.
- Refresh reuse revokes compromised token family.
- Cross-user and cross-workspace authorization denial tests.
- Least-privilege database roles.
- Security events contain correlation IDs but no credentials or private content.
- Unit, PostgreSQL integration, race and negative security tests run in CI.

## Remaining work

The identity source code exists, but it has not been deployed to a persistent production database. Email sender credentials, public API host, DNS/TLS, off-host backup replication and restore acceptance remain operational prerequisites. Privileged account MFA and complete staff identity lifecycle are still required before internal admin access is exposed.
