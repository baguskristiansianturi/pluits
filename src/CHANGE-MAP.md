# Frontend V2 — Change Map

Status: IMPLEMENTED IN MAIN / PROVISIONAL PRODUCT FOUNDATION  
Scope: Account access, public-facing Global Home landing page, and internal development workspace.

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
| Global Home landing page | src/features/home/home-page.js and home-page.css | features/home | Guest and signed-in `#/home`; one public-facing composition |
| Auth UI | src/features/auth/auth-page.js and auth-page.css | features/auth | App router |
| Legal draft screens | src/features/legal/policy-page.js and policy-page.css | features/legal | App router |
| Internal development workspace | src/features/workspace/workspace-page.js and workspace-page.css | features/workspace | Protected internal route |
| Auth operations | src/services/auth/auth-service.js | services/auth | App and Auth feature |
| Supabase client | src/lib/supabase/client.js | lib/supabase | Auth service |
| Global base styles | src/styles/global.css | styles | Entire frontend |
| PWA assets | public/manifest.webmanifest and public/sw.js | platform runtime | Browser lifecycle |
| Official brand assets | public/assets/brand/ | brand owner | Shared shell and PWA |

## Runtime route map
- Empty URL/hash or `#/home` → the same public-facing PLUITS homepage for guests and authenticated users.
- Session state changes only the homepage header actions and relevant CTA wording; it does not replace the landing page with a personal welcome, profile summary, feed, or dashboard.
- Unknown route → safe registration route.
- `#/register` → registration information screen; submit disabled by default.
- `#/login` → existing-account login.
- `#/forgot` → password recovery request.
- `?auth=reset` or `#/reset` → password reset.
- `#/workspace` → protected internal development workspace; not the user dashboard and not Global Home.
- `#/terms` and `#/privacy` → draft policy status screens.

## Shared brand navigation
`renderBrand()` defaults to `#/home`. Every PLUITS logo returns to the same platform landing page, regardless of session. The active session affects only the account controls shown in the header.

## Backend contracts and protected surfaces
The existing Supabase Auth, SDK version pin, browser publishable key, database triggers, profiles, wallets, user data, RLS, migrations, SMTP and production Auth configuration are unchanged by this homepage increment.

## Change rules
Keep feature changes within their owner. Shared route/brand changes require consumer impact review. Preserve Auth recovery, session persistence and existing workspace behavior. Do not change Supabase configuration, migrations, database records, RLS or triggers in this homepage scope.

## Required verification
Run `npm test`, `npm run build`, verify workflow/deployment, and perform manual Android/mobile and desktop UAT. Public signup, email delivery, Android publication and legal consent are NOT TESTED / NOT READY until their separate release gates are cleared.

## Current limitations
- Signup remains disabled unless explicitly enabled after readiness review.
- Circle/social personal space, Main Profile, and the user dashboard are separate product areas; none is substituted for Global Home.
- The internal Workspace is a development-only protected area.
- Legal content and durable consent persistence are not finalized.
- UI values remain provisional, not approved platform-wide standards.
