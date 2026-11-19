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

Signup currently sends full_name metadata and redirects to the canonical PLUITS base URL. Database triggers create the related profile and wallet records.

## Local frontend test mode
Append `?pluits-demo=1` to the PLUITS URL to select the isolated local-demo Auth adapter. The login page then offers a demo entry. It creates a clearly marked local-only session; it does not call Supabase Auth, create an Auth user, or grant any production permission. Demo store drafts are saved only in the current browser's local storage and are never published or visible to other users. Remove the query parameter to return to the normal Supabase Auth flow.

This mode is a frontend testing aid, not production authentication, not public signup, and not a substitute for backend authorization.

## Open before public signup
- Confirm final Terms of Service and Privacy Policy.
- Design a durable legal-consent record; the current checkbox is only a client-side gate.
- Verify Supabase SMTP, email templates, Site URL, and allowed redirects.
- Review leaked-password protection in Supabase Auth.

Signup remains disabled by default and requires VITE_PUBLIC_SIGNUP_ENABLED=true only after the release requirements are met.
