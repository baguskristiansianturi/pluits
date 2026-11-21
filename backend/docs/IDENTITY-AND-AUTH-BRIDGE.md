# PLUITS Identity and Authentication Bridge

**Status:** implementation mapping and migration contract. This document does not change Supabase or authorize a production authentication cutover.

## 1. Current source of truth

The repository currently uses Supabase Auth in production. The frontend service at src/services/auth/auth-service.js calls Supabase directly for:
- Registration using email/password and a full_name user-metadata field.
- Email confirmation and resend.
- Password sign-in.
- Password-reset email and password update.
- Session retrieval, auth-state subscription and sign-out.

The current UI recognizes HTTP 402 from Supabase Auth as a service/organization restriction, not an incorrect password. The independent backend must not silently fall back to a fake/local login when production authentication is unavailable.

## 2. Existing identity and profile records

The existing Supabase schema and migration history show these records:
- auth.users: canonical login identity and Supabase-issued subject UUID.
- public.user_profiles: Personal profile; primary key is the same UUID as auth.users.id. A trigger creates it on new auth.users rows and seeds existing legacy profiles.
- public.user_addresses: private user-owned delivery addresses. Current validation assumes Indonesian five-digit postal codes and province/city/district/village fields; this is not a globally complete address model.
- public.professional_profiles: one Professional profile per user, linked by user_id.
- public.professional_portfolio_items: portfolio records owned through professional_profiles.
- public.account_context_preferences: active Personal/Professional/Business context and active_store_id.
- public.stores and public.store_members: existing Business/store entity and team membership; do not create a duplicate business identity table.
- public.profile_verification_cases: Professional/store verification cases. Applicant permissions and reviewer privileges are separate.
- admin/moderator reviewer checks currently use trusted JWT app_metadata claims, not user-editable user_metadata.

Relevant source migrations:
- 20261107131208_pluits_user_first_social_foundation.sql
- 20261107172444_pluits_profile_context_foundation.sql
- 20261107172504_pluits_profile_context_rls_tuning.sql
- 20261110090000_submit_professional_profile.sql
- 20261110091730_enforce_personal_profile_identity_rules.sql

## 3. Identity mapping rules

1. Preserve the existing auth.users UUID as the canonical user identifier during transition. Do not generate replacement IDs for existing users.
2. Preserve Personal profile, Professional profile, store ownership, store memberships, content ownership, conversation membership, orders and audit references.
3. Never copy passwords, password hashes of unknown provenance, refresh tokens or live session secrets from Supabase.
4. Do not infer a user's verified status from a non-empty email or phone field. Import only explicit verification evidence and timestamps.
5. Do not elevate roles from frontend metadata, user_metadata, profile text or client-provided workspace identifiers.
6. Keep profile privacy and content audience rules as first-class authorization inputs.
7. Preserve separate Personal, Professional and Business contexts; do not merge business identity into the human profile.
8. Keep membership tier policy out of authorization while the membership master model is PROPOSED.

## 4. Independent backend authentication target

When the first-party identity service is implemented, it must provide:
- Account registration with normalized unique identifiers and abuse-resistant enumeration behavior.
- Email verification and optional phone verification through a configured delivery provider.
- Password credentials hashed using Argon2id with versioned parameters and per-credential salts.
- Short-lived access tokens and rotating, opaque refresh tokens stored only as hashes.
- Refresh-token family tracking and reuse detection; revoke the affected family on replay.
- Session listing, device metadata minimization, session revocation and global sign-out.
- Password reset with single-use, time-limited, hashed tokens and generic responses.
- MFA/step-up authentication for sensitive operations and privileged users.
- Login throttling and abuse controls at edge and account/IP dimensions.
- Security events and audit trails that never store plaintext passwords, tokens or recovery secrets.

The API must not accept a user_id supplied by the browser as the authenticated identity. The identity is derived only from a verified credential.

## 5. Transition strategy

### Phase A — preserve current production
- Supabase remains the active login issuer for existing users.
- The Go API may be developed independently, but must reject missing/invalid credentials for protected endpoints.
- A bridge adapter can validate the configured trusted issuer and audience once the exact signing-key mode and issuer configuration are verified.
- Do not assume the project's JWT signing mode or publish a guessed JWKS URL as configuration.

### Phase B — first-party account enrollment
- Create a first-party identity record using the same canonical UUID when a verified existing user links or resets credentials.
- For a new registration, issue a new UUID and create Personal profile atomically.
- Require a verified email/phone challenge before enabling trust-sensitive features.
- Use an outbox for verification and recovery messages; actual delivery requires a configured mail/SMS provider and tested sender domain.

### Phase C — gradual credential transition
- Invite existing users to establish a new password through a verified, single-use reset/link flow.
- Link the first-party identity to the prior canonical UUID after proof of control.
- Keep old login available until parity, security tests, support and rollback are ready.
- Reconcile user counts, profile ownership, role membership and foreign keys before any traffic switch.

### Phase D — controlled cutover
- Switch one client capability at a time behind a feature flag.
- Monitor sign-in success, reset completion, token failures, account recovery and abuse indicators.
- Keep a documented rollback path; never create duplicate user identities to work around migration failures.

## 6. Global profile and address evolution

The current user_addresses shape is Indonesia-specific. The independent model must support:
- ISO 3166-1 alpha-2 country code.
- Country-specific address lines and administrative subdivisions without assuming every country has province/district/postal code.
- E.164 phone numbers and explicit phone verification.
- Optional coordinates with purpose, precision and retention controls.
- A distinction between private contact/delivery addresses and public service-area/location data.

Do not rewrite the live Supabase address table as part of backend construction. Introduce a normalized target model and a reviewed, reversible mapping later.

## 7. Authorization requirements

- Resolve the active context from the authenticated user's stored preference, then verify current membership and status on every workspace operation.
- A workspace ID in a URL/body is only a resource selector, never proof of access.
- Every action checks actor, resource, workspace, permission, resource state and relevant verification scope.
- Deny by default. Separate support, moderator, finance, business owner, driver, accommodation staff and customer permissions.
- Apply privacy rules to profile headers, feed visibility, follower lists, chat availability and content media independently.
- High-risk actions require step-up authentication, audit records and potentially dual approval.

## 8. Current implementation status

- Existing Supabase Auth and profile data have been inspected from repository migrations and frontend adapters.
- The independent Go API currently has no authentication endpoints or production token verifier.
- No Supabase project settings, production users, passwords, tokens, profile rows or data were changed or exported.
- The next implementation step is to add a verified-token boundary and explicit principal/workspace authorization tests after the issuer configuration and transition contract are finalized.
