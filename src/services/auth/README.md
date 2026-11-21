# Auth Service

Owner: services/auth

PLUITS has one authentication authority: the first-party Go identity API owned and operated by PLUITS.

- The frontend uses only the first-party adapter for registration, email verification, login, refresh rotation, logout and password recovery.
- If `VITE_API_BASE_URL` is not configured, guest pages remain available but account actions show a clear backend-not-connected message.
- No local/demo authentication adapter or provider fallback is permitted.
- The adapter stores the rotating refresh token in tab-scoped sessionStorage; access tokens remain in memory. This reduces persistence but does not eliminate browser XSS risk. A future same-site HttpOnly-cookie design requires a same-origin API proxy and CSRF controls.

## Build configuration

- `VITE_API_BASE_URL=https://<PLUITS-owned-api-origin>`
- `VITE_PUBLIC_SIGNUP_ENABLED=true` only after database, SMTP, CORS, HTTPS, off-host backup/restore and verification journeys are validated.

Never place backend secrets in Vite variables or browser bundles.
