# Auth Service

Owner: services/auth

PLUITS uses one authentication authority: the first-party Go identity API owned by PLUITS.

- The frontend does not load a Supabase SDK/client, third-party identity provider, or local/demo authentication adapter.
- The first-party adapter calls PLUITS identity endpoints for registration, email verification, login, refresh rotation, logout and password recovery.
- If `VITE_API_BASE_URL` is not configured, the public application still mounts in guest mode, but account actions return a clear backend-not-connected message. It must never fall back to another provider.
- The adapter stores only the rotating refresh token in tab-scoped sessionStorage; access tokens remain in memory. This reduces persistence but does not eliminate browser XSS risk. A future same-site HttpOnly-cookie session design requires an API origin/proxy and CSRF controls.

## First-party deployment flags

- `VITE_AUTH_PROVIDER=first-party` (canonical; no alternate provider is supported)
- `VITE_API_BASE_URL=https://<PLUITS-owned-api-origin>`
- `VITE_PUBLIC_SIGNUP_ENABLED=true` only after database, SMTP, CORS, API, backup/restore and verification journey are validated.

Without a reachable HTTPS API and the release gate, public signup remains disabled. Do not place backend secrets in Vite variables or browser bundles.
