# Frontend V2 — Change Map

Status: IMPLEMENTED IN MAIN / PROVISIONAL PRODUCT FOUNDATION  
Scope: Account access, public Global Home and internal development workspace.

## Source-of-truth and ownership
| Domain | Canonical path | Owner | Consumers |
|---|---|---|---|
| App lifecycle and route guards | src/app/create-app.js | app | All routed features |
| Route names and session redirects | src/app/routes.js | app | App and route tests |
| Runtime URLs and release flags | src/config/runtime.js | config | App, features and Auth service |
| Design tokens | src/design-system/tokens.css | design-system | All feature screens |
| Icon registry | src/design-system/icons.js | design-system | Auth and Workspace |
| Layout registry | src/design-system/layouts.js | design-system | Feature page specifications |
| Shared brand/header/footer | src/design-system/page-shell.js and page-shell.css | design-system | Home, Auth, Legal and Workspace |
| Public Global Home | src/features/home/home-page.js and home-page.css | features/home | Guest route |
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
- Authenticated `#/home` → current internal development workspace until authenticated Global Home is implemented.
- Unknown route → safe registration route.
- `#/register` → registration information screen; submit disabled by default.
- `#/login` → existing-account login.
- `#/forgot` → password recovery request.
- `?auth=reset` or `#/reset` → password reset.
- `#/workspace` → requires an authenticated Supabase session.
- `#/terms` and `#/privacy` → draft policy status screens.

## Shared brand navigation
`renderBrand()` defaults to `#/home`. Guest clicks open public Global Home. Authenticated clicks resolve through the auth-aware guard to the current internal workspace. Any change affects all shared-header consumers and requires route regression coverage.

## Protected backend surfaces
The existing Supabase Auth, SDK version pin, browser publishable key, database triggers, profiles, wallets, user data, RLS, migrations, SMTP and production Auth configuration are unchanged by this homepage increment.

## Change rules and verification
Keep feature changes within their owner. Shared route/brand changes require consumer impact review. Run `npm test`, `npm run build`, verify workflow/deployment, and perform manual Android/mobile and desktop UAT. Public signup, email delivery, Android publication and legal consent remain gated/not verified.

## Current limitations
- Signup remains disabled unless explicitly enabled after readiness review.
- Authenticated Global Home is not implemented; signed-in users still reach internal workspace.
- Legal content and durable consent persistence are not finalized.
- UI values remain provisional, not approved platform-wide standards.
