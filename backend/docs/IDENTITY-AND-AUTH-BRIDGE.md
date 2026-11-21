# First-Party Identity and New Account Strategy

**Status:** independent implementation contract. New Go/PostgreSQL backend is the target source of truth for new test accounts and future production accounts.

## 1. Decision

The independent backend starts clean. Do not migrate the current Supabase user or profile records into it. The existing Supabase project is retained as a separate historical/legacy environment and reference only. It is not a runtime dependency, identity issuer, database, storage provider or authentication bridge for the new backend.

The current known account count is one founder account. There is no business reason to spend effort importing it. Testing begins with a new registration through the first-party Go API and creates a new account ID in the new PostgreSQL database.

## 2. What to learn from the existing implementation

Supabase remains useful as a reference for product behaviors and patterns: email/password registration and sign-in UX, email confirmation and password recovery, session lifecycle, profile creation, row-level privacy, storage access policies and relational migrations. These behaviors must be reimplemented in our own domain model. Do not copy Supabase-specific APIs, table internals or policy syntax into the new runtime.

## 3. First-party account contract

The Go identity module owns account registration, normalized email uniqueness, Argon2id password hashing, email verification challenges, sign-in, short-lived access sessions, rotating opaque refresh tokens stored only as hashes, refresh reuse detection, logout, password reset, account status, security events, MFA/step-up authentication, session inventory and revocation.

Never store plaintext passwords, verification secrets, reset secrets, access tokens or refresh tokens. Never trust user_id, roles, workspace IDs or product IDs supplied by the browser.

## 4. Initial new-account test

The first end-to-end test must use a real account entered by the founder through the new registration UI/API. No seeded user and no fake account are permitted.

1. Register with a new email and strong password.
2. Verify the email using a real delivery channel once configured.
3. Sign in and receive a new first-party session.
4. Fetch the authenticated account and Personal profile.
5. Update profile fields and privacy preferences.
6. Sign out; confirm the old session no longer works.
7. Sign in again; test refresh rotation and replay rejection.
8. Request password reset, complete it, and confirm old credentials fail.
9. Inspect session revocation, audit events and authorization boundaries.
10. Use this account as the first real PLUITS test account; add no artificial content or transactions.

If email delivery is not yet configured, registration may be tested up to the pending-verification state in an isolated development environment. Do not bypass verification or expose verification tokens in production logs or API responses. Configure a real sender before testing the full verification journey.

## 5. Product and company identity boundaries

The backend is owned and governed by PLUITS Official Indonesia. Customer identity and privileged workspace access remain separate authorization concerns. Any future identity federation or account linking requires explicit proof of account ownership, consent and separate authorization.

Internal staff/service identities are distinct from customer identities. Staff access must use dedicated roles, MFA, audit and least privilege. A PLUITS customer must not automatically receive BDM operator access or Bagusin admin access.

## 6. Data model principles

- Use UUIDs for account and session identifiers.
- Normalize email carefully and enforce uniqueness consistently.
- Store email verification timestamps, not just a mutable boolean.
- Store password hash algorithm/version/parameters so credentials can be upgraded.
- Store refresh-token hashes and token-family/revocation metadata.
- Keep profiles separate from credentials.
- Use explicit account lifecycle states.
- Use UTC timestamps and record locale/timezone separately.
- Keep product/workspace memberships separate from global identity.
- Use transactional outbox for verification/recovery messages.
- Apply retention and account deletion rules without destroying financial/legal audit obligations.

## 7. Security acceptance criteria

- Passwords use Argon2id with calibrated, versioned parameters.
- Registration/login/reset responses resist account enumeration.
- Login and verification endpoints have rate limits and abuse monitoring.
- Tokens are cryptographically random; stored token values are hashes.
- Refresh rotation rejects reuse and revokes compromised token families.
- Session revocation is checked by protected endpoints.
- Email verification/reset secrets are single-use, expiring and hash-at-rest.
- Authorization tests cover cross-user and cross-workspace access denial.
- Security logs contain correlation IDs but no secrets or private message content.
- Database roles follow least privilege and schema migrations run explicitly.
- CI tests include unit, PostgreSQL integration, race and negative security cases.

## 8. Implementation status

- Existing Supabase schema/frontend behavior has been reviewed only as a product reference.
- No Supabase data, credentials, passwords, tokens or sessions are imported.
- Go API currently has health/readiness and PostgreSQL foundation; first-party auth endpoints are not yet implemented.
- Next implementation stage: first-party identity schema, secure registration, verification outbox, session rotation, login/logout and end-to-end tests against disposable PostgreSQL.