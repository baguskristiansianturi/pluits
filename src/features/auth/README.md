# Account Access Feature

Owner: features/auth  
Status: bootstrap implementation with isolated frontend-demo entry.

## Responsibilities
- Registration form and field-level validation.
- Email/password login.
- Signup confirmation pending state and resend action.
- Password recovery and password reset screens.
- Friendly error and loading feedback.
- Navigation links between guest auth routes.
- Explicit local-demo entry for frontend UAT when the preview query flag is present.

## Backend contract
The feature calls the injected Auth service only. It does not access Supabase directly and does not insert profile or wallet rows.

The legacy adapter sends full_name metadata to Supabase. The first-party adapter sends display_name and legal consent to the Go API, which creates a personal profile and isolated personal workspace. Email verification and password recovery use PLUITS auth query routes.

## Local frontend test mode
Append `?pluits-demo=1` to the PLUITS URL to select the isolated local-demo Auth adapter. The login page then offers a demo entry. It creates a clearly marked local-only session; it does not call Supabase Auth, create an Auth user, or grant any production permission. Demo store drafts are saved only in the current browser's local storage and are never published or visible to other users. Remove the query parameter to return to the normal Supabase Auth flow.

This mode is a frontend testing aid, not production authentication, not public signup, and not a substitute for backend authorization.

## Open before public signup
- Confirm final Terms of Service and Privacy Policy.
- Design a durable legal-consent record; the current checkbox is only a client-side gate.
- Deploy the PLUITS Go API and persistent PostgreSQL database.
- Configure SMTP STARTTLS, outbox encryption key, rate-limit HMAC key and exact CORS origin allowlist.
- Configure VITE_AUTH_PROVIDER=first-party, VITE_API_BASE_URL and VITE_PUBLIC_SIGNUP_ENABLED=true only after an end-to-end registration test.
- Review browser token storage and move to HttpOnly same-site cookies before broader public rollout.

Signup remains disabled by default. The flag only enables signup when the first-party provider and API URL are also configured.
