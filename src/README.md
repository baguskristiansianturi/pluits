# PLUITS Frontend V2 — Runtime Structure

Status: bootstrap implementation; first stage only.

## Current runtime scope

- Account registration.
- Email/password login for existing Supabase accounts.
- Signup confirmation pending state and resend request.
- Password recovery and reset.
- Authenticated internal workspace after login.
- Draft-only policy information pages.

This workspace is not the Global Home, Primary Profile, or Social Media experience.

## Module ownership

| Path | Responsibility |
|---|---|
| app/ | Application bootstrap, route resolution, auth guard, lifecycle |
| config/ | Non-secret runtime URL and asset configuration |
| design-system/ | Provisional dimensions/tokens, local icon registry, layout registry |
| features/auth/ | Registration, login, recovery, and auth screen interactions |
| features/workspace/ | Authenticated development workspace |
| features/legal/ | Explicit draft status for policy documents |
| services/auth/ | Supabase Auth calls and validation; no DOM rendering |
| lib/supabase/ | One shared browser Supabase client |
| styles/ | Small global reset and base styles |

## Dependency direction

- app → features/services/lib.
- features → config/design-system; feature screens receive service interfaces by injection.
- services → lib/config only; services never import page or feature UI.
- lib does not import app or feature modules.
- Feature CSS is scoped to its owning page root.

## UI foundation order

1. Dimensions and responsive scale.
2. Local icon registry.
3. Semantic color tokens.
4. Interaction states and validation.
5. Layout registry.

The current values and layouts are PROVISIONAL. They are test material for the first registration screen and workspace, not approved global standards.

## Authentication boundaries

- Browser client uses only the Supabase publishable key.
- Signup goes through supabase.auth.signUp with full_name metadata and the canonical app redirect.
- Database triggers already create profile and wallet records. The frontend must not duplicate those inserts.
- User metadata is display information only, never authorization.
- Existing Supabase users, profiles, database migrations, media, and other records must be preserved.
- The consent checkbox currently gates the UI. A durable legal-consent record and final legal documents remain open requirements before public registration.

## Verification

Run npm test and npm run build. GitHub Actions runs both on pull requests and deploys GitHub Pages only from main.
