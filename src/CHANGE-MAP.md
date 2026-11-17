# Frontend V2 — Change Map

Status: IMPLEMENTED IN MAIN / PROVISIONAL PRODUCT FOUNDATION  
Scope: Account access, guest and authenticated Global Home, and internal development workspace.

## Source-of-truth and ownership
| Domain | Canonical path | Owner | Consumers |
|---|---|---|---|
| App lifecycle and route guards | src/app/create-app.js | app | All routed features |
| Route names and session redirects | src/app/routes.js | app | App and route tests |
| Runtime URLs and release flags | src/config/runtime.js | config | App, features and Auth service |
| Design tokens | src/design-system/tokens.css | design-system | All feature screens |
| Icon registry | src/design-system/icons.js | design-system | Auth, Global Home and Workspace |
| Layout registry | src/design-system/layouts.js | design-system | Feature page specifications |
| Shared brand/header/footer | src/design-system/page-shell.js and page-shell.css | design-system | Global Home, Auth, Legal and Workspace |
| Session-aware Global Home | src/features/home/home-page.js and home-page.css | features/home | Guest and signed-in `#/home`; one renderer and one feature stylesheet |
| Auth UI | src/features/auth/auth-page.js and auth-page.css | features/auth | App router |
| Legal draft screens | src/features/legal/policy-page.js and policy-page.css | features/legal | App router |
| Internal workspace | src/features/workspace/workspace-page.js and workspace-page.css | features/workspace | Authenticated route |
| Auth operations | src/services/auth/auth-service.js | services/auth | App and Auth feature |
| Supabase client | src/lib/supabase/client.js | lib/supabase | Auth service |
| Global base styles | src/styles/global.css | styles | Entire frontend |
| PWA assets | public/manifest.webmanifest and public/sw.js | platform runtime | Browser lifecycle |
| Official brand assets | public/assets/brand/ | brand owner | Shared shell and PWA |

## Runtime route map
- Empty URL/hash or `#/home` → public homepage for guests.
- Authenticated `#/home` → personalized authenticated Global Home; the same route selects the view from the active session.
- Unknown route → safe registration route.
- `#/register` → registration information screen; submit disabled by default.
- `#/login` → existing-account login.
- `#/forgot` → password recovery request.
- `?auth=reset` or `#/reset` → password reset.
- `#/workspace` → requires an authenticated Supabase session.
- `#/terms` and `#/privacy` → draft policy status screens.

## Shared brand navigation
`renderBrand()` defaults to `#/home`. Guest clicks open public Global Home. Authenticated clicks open the authenticated Global Home on the same `#/home` route. Any change affects all shared-header consumers and requires route regression coverage.

## Backend contracts and protected surfaces
The existing Supabase Auth, SDK version pin, browser publishable key, database triggers, profiles, wallets, user data, RLS, migrations, SMTP and production Auth configuration are unchanged by this homepage increment.

## Change rules
Keep feature changes within their owner. Shared route/brand changes require consumer impact review. Preserve Auth recovery, session persistence and existing workspace behavior. Do not change Supabase configuration, migrations, database records, RLS or triggers in this homepage scope.

## Required verification
Run `npm test`, `npm run build`, verify workflow/deployment, and perform manual Android/mobile and desktop UAT. Public signup, email delivery, Android publication and legal consent are NOT TESTED / NOT READY until their separate release gates are cleared.

## Current limitations
- Signup remains disabled unless explicitly enabled after readiness review.
- Authenticated Global Home is implemented as the platform entry point; Circle/social personal space and the main profile remain separate future product areas.
- Legal content and durable consent persistence are not finalized.
- UI values remain provisional, not approved platform-wide standards.
