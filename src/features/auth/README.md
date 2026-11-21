# Account Access Feature

Owner: features/auth

## Responsibilities
- Registration form and field-level validation.
- Email/password login.
- Signup confirmation pending state and resend action.
- Password recovery and password reset screens.
- Friendly error and loading feedback.
- Navigation links between guest auth routes.

## Backend contract
The feature calls the injected PLUITS first-party Auth service only. It does not access a third-party identity provider directly and does not insert profile or wallet rows.

The Go API accepts display_name and legal consent, creates the personal profile and isolated personal workspace, and owns verification, login, refresh rotation, logout and password recovery.

## Release gate
- Deploy the PLUITS Go API and PLUITS-controlled PostgreSQL database.
- Configure SMTP STARTTLS, outbox encryption key, rate-limit HMAC key and exact CORS origin allowlist.
- Configure `VITE_AUTH_PROVIDER=first-party` and `VITE_API_BASE_URL`.
- Keep public signup disabled until end-to-end registration, email verification, persistence and backup/restore tests pass.
- Never use local synthetic accounts for account or authorization acceptance testing.
