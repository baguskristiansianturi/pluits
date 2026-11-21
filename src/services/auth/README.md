# Auth Service

Owner: services/auth

The frontend supports two explicit authentication adapters:
- **Supabase legacy adapter**: retained for the current live site while the independent Go API is prepared. It is dynamically loaded only when VITE_AUTH_PROVIDER is not first-party.
- **First-party Go API adapter**: selected only with VITE_AUTH_PROVIDER=first-party and VITE_API_BASE_URL configured. It calls PLUITS-owned identity endpoints for registration, email verification, login, refresh rotation, logout and password recovery.

The first-party adapter stores only the rotating refresh token in tab-scoped sessionStorage; access tokens remain in memory. This reduces persistence but does not eliminate browser XSS risk. A future same-site HttpOnly-cookie session design requires an API origin/proxy and CSRF controls before replacing this bearer-token flow.

The local-demo adapter is selected only by the explicit ?pluits-demo=1 preview query parameter. It persists a synthetic session locally, labels the user with app_metadata.provider = local-demo, and never calls Supabase Auth. It is strictly for frontend UAT and must never be used as production authentication or authorization.

Services must not render HTML, access the DOM, or decide user permissions from user_metadata.

## First-party deployment flags

- VITE_AUTH_PROVIDER=first-party
- VITE_API_BASE_URL=https://<deployed-api-origin>
- VITE_PUBLIC_SIGNUP_ENABLED=true only after database, SMTP, CORS, API and verification journey are validated.

Without all three flags, public signup remains disabled. Do not place backend secrets in Vite variables or browser bundles.