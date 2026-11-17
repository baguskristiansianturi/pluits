# Frontend V2 — Change Map

Status: IMPLEMENTED IN BRANCH / PROVISIONAL PRODUCT FOUNDATION  
Scope: Stage 01 account access and internal development workspace  
Owner: PLUITS product owner; implementation ownership is split by module below.

## Source-of-truth and ownership

| Domain | Canonical path | Owner | Consumers |
|---|---|---|---|
| App lifecycle and route guards | src/app/create-app.js | app | All routed features |
| Route names and session redirect rules | src/app/routes.js | app | create-app.js and route tests |
| Runtime URLs and release flags | src/config/runtime.js | config | App, feature views, Auth service flag consumers |
| Dimension and semantic color tokens | src/design-system/tokens.css | design-system | Auth and Workspace screens |
| Local icon registry | src/design-system/icons.js | design-system | Auth and Workspace screens |
| Layout identity registry | src/design-system/layouts.js | design-system | Workspace and future page specifications |
| Registration/login/recovery UI | src/features/auth/auth-page.js and auth-page.css | features/auth | App router |
| Legal draft status screens | src/features/legal/policy-page.js and policy-page.css | features/legal | App router |
| Post-login workbench | src/features/workspace/workspace-page.js and workspace-page.css | features/workspace | App router |
| Auth business operations | src/services/auth/auth-service.js | services/auth | App and Auth feature via injection |
| Supabase browser SDK client | src/lib/supabase/client.js | lib/supabase | Auth service through dependency injection |
| Global reset and base styles | src/styles/global.css | styles | Entire frontend |
| PWA manifest and service worker | public/manifest.webmanifest and public/sw.js | platform runtime | Browser install/update lifecycle |
| Official brand assets | public/assets/brand/ | brand asset owner | Auth, Workspace, PWA |

## Runtime route map

- Empty hash or unknown route → register.
- #/register → registration screen; submit is disabled by default.
- #/login → existing-account email/password login.
- #/forgot → request password recovery.
- ?auth=reset or #/reset → password reset flow.
- #/workspace → requires an authenticated Supabase session.
- #/terms and #/privacy → explicitly draft policy status pages.

## Backend contracts and protected surfaces

- Supabase project: existing PLUITS project, ref ytndswhqxayqpftszwfh.
- Browser SDK is pinned to @supabase/supabase-js 2.119.0.
- Browser code uses only the publishable key.
- Signup contract: supabase.auth.signUp with email, password, full_name user metadata, and canonical emailRedirectTo.
- Existing Auth database triggers create profile and wallet rows. The frontend must not create those records directly.
- Login contract: supabase.auth.signInWithPassword with normalized email and password.
- Recovery contract: resetPasswordForEmail followed by updateUser({ password }).
- User metadata is display data only; it is not an authorization source.
- Protected: supabase/ migrations, Auth users, profiles, user_profiles, wallets, posts, media, messages, orders, RLS, triggers, functions, SMTP, and production Auth settings.
- No database schema, migration, Auth configuration, or production data is changed by this frontend scope.

## Change rules

1. A change to one feature must stay in its feature files unless a documented shared dependency is involved.
2. A shared token, icon, or layout change requires an impact review of all listed consumers.
3. A service change must preserve the service interface and must not import feature UI or access the DOM.
4. Auth client changes require an audit of session persistence, callback URLs, signup metadata, and existing-account compatibility.
5. Database/Auth trigger changes are outside this Change Map and require a separate backend Change Map and owner authorization.
6. If an actual path differs from this map, inspect the repository and update this map; do not invent a replacement path.

## Required verification

- npm test — architecture, production-surface, Auth, route, backend migration, PWA, and governance checks.
- npm run build — Vite production output.
- GitHub Actions — PR validation and artifact upload; main push deploys Pages.
- Manual UAT — existing-account login, workspace entry, logout, password recovery, responsive checks on Android/mobile and desktop.
- Email delivery, new-account signup, and legal consent are NOT TESTED / NOT READY until SMTP, redirect, final policy, and durable consent requirements are verified.

## Current limitations

- Public signup is disabled unless VITE_PUBLIC_SIGNUP_ENABLED=true is explicitly set at build time.
- Legal content and durable consent persistence are not implemented.
- Workspace cards are informational and do not store tasks or chat messages.
- UI dimensions, icons, colors, and layouts are provisional, not approved platform-wide standards.
