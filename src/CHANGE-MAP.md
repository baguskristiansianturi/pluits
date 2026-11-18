# Frontend V2 — Change Map

Status: IMPLEMENTED IN MAIN / PROVISIONAL PRODUCT FOUNDATION  
Scope: Account access, public-facing Global Home, and authenticated User Dashboard.

## Source-of-truth and ownership
| Domain | Canonical path | Owner | Consumers |
|---|---|---|---|
| App lifecycle and route guards | src/app/create-app.js | app | All routed features |
| Route names and session redirects | src/app/routes.js | app | App and route tests |
| Runtime URLs and release flags | src/config/runtime.js | config | App, features and Auth service |
| Design tokens | src/design-system/tokens.css | design-system | All feature screens |
| Icon registry | src/design-system/icons.js | design-system | Auth, Global Home and Dashboard |
| Layout registry | src/design-system/layouts.js | design-system | Feature page specifications |
| Shared brand/header/footer | src/design-system/page-shell.js and page-shell.css | design-system | Global Home, Auth, Legal and Dashboard |
| Global Home landing page | src/features/home/home-page.js and home-page.css | features/home | Guest and signed-in \`#/home\`; one public-facing composition |
| User Dashboard | src/features/dashboard/dashboard-page.js and dashboard-page.css | features/dashboard | Protected \`#/dashboard\`; flexible three-panel control center |
| Auth UI | src/features/auth/auth-page.js and auth-page.css | features/auth | App router |
| Legal draft screens | src/features/legal/policy-page.js and policy-page.css | features/legal | App router |
| Auth operations | src/services/auth/auth-service.js | services/auth | App and Auth feature |
| Supabase client | src/lib/supabase/client.js | lib/supabase | Auth service |
| Global base styles | src/styles/global.css | styles | Entire frontend |
| PWA assets | public/manifest.webmanifest and public/sw.js | platform runtime | Browser lifecycle |
| Official brand assets | public/assets/brand/ | brand owner | Shared shell and PWA |

## Runtime route map
- Empty URL/hash or \`#/home\` → the same public-facing PLUITS homepage for guests and authenticated users.
- Session state changes only the homepage header actions and relevant CTA wording; it does not replace Beranda with a personal dashboard.
- Successful login → protected \`#/dashboard\`.
- Authenticated visits to Login, Registration, or Forgot Password → \`#/dashboard\`.
- Signed-in account avatar/name on Global Home → \`#/dashboard\`.
- PLUITS logo from every page → \`#/home\`.
- Guest access to \`#/dashboard\` → \`#/login\`.
- Unknown route → safe registration route.
- \`#/register\` → registration information screen; submit disabled by default.
- \`#/login\` → existing-account login.
- \`#/forgot\` → password recovery request.
- \`?auth=reset\` or \`#/reset\` → password reset.
- \`#/terms\` and \`#/privacy\` → draft policy status screens.
- Workspace is an internal development term, not a public runtime route or user-facing page.

## Dashboard responsibility
Dashboard is the single authenticated entry point and central control area for PLUITS. Its prototype contains a left module navigator, top open-page tabs, a central active work area, and a right Social PLUITS panel on desktop. Left and right panels are independently resizable and collapsible. Mobile prioritizes module navigation and management content without the social side panel.

Dashboard also contains entry points for personal social profile management, Business Account (Store or Service), Purchase/Sales transactions, privacy, security, addresses, bank details, and notification preferences. One Auth identity is shared across personal and business activity. The public-facing social profile remains owned by Social Media. Marketplace contains the Store and Restaurant & Café merchant modules.

## Backend contracts and protected surfaces
This increment changes Dashboard frontend composition and its layout registry/documentation only. Existing Supabase Auth, SDK version pin, browser publishable key, database triggers, profiles, wallets, user data, RLS, migrations, SMTP, production Auth configuration, router, and shared shell remain unchanged. No business, transaction, notification, Inbox, or social activity data is fabricated.

## Change rules
Keep feature changes within their owner. Shared route/brand changes require consumer impact review. Preserve Auth recovery and session persistence. Do not change Supabase configuration, migrations, database records, RLS or triggers in this frontend scope.

## Required verification
Run \`npm test\`, \`npm run build\`, verify workflow/deployment, and perform manual Android/mobile and desktop UAT. Public signup, email delivery, Android publication and legal consent are NOT TESTED / NOT READY until their separate release gates are cleared.

## Current limitations
- Signup remains disabled unless explicitly enabled after readiness review.
- Social Media, Marketplace, Store, Restaurant & Café, and other ecosystem modules are not yet connected to operational routes/data services in this frontend.
- Dashboard profile editing, Business Account creation, transaction data, Inbox, notification data, and social side-panel content remain presentation-only until their owning services and authorization contracts are integrated.
- The number of Business Accounts allowed per personal account remains a product decision.
- Legal content and durable consent persistence are not finalized.
- UI values remain provisional, not approved platform-wide standards.
