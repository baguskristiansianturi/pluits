# Account Access Feature

Owner: features/auth  
Status: bootstrap implementation; visual and interaction values are provisional.

## Responsibilities

- Registration form and field-level validation.
- Email/password login.
- Signup confirmation pending state and resend action.
- Password recovery and password reset screens.
- Friendly error and loading feedback.
- Navigation links between guest auth routes.

## Backend contract

The feature calls the injected Auth service only. It does not access Supabase directly and does not insert profile or wallet rows.

Signup currently sends full_name metadata and redirects to the canonical PLUITS base URL. Database triggers create the related profile and wallet records.

## Open before public signup

- Confirm final Terms of Service and Privacy Policy.
- Design a durable legal-consent record; the current checkbox is only a client-side gate.
- Verify Supabase SMTP, email templates, Site URL, and allowed redirects.
- Review leaked-password protection in Supabase Auth.
