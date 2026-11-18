# Frontend V2 — Change Map

Status: IMPLEMENTATION PROTOTYPE / PROVISIONAL PRODUCT FOUNDATION
Scope: Account access, Global Home, Circle Home, Jelajah, and authenticated User Dashboard.

## Source-of-truth and ownership
| Domain | Canonical path | Owner | Consumers |
|---|---|---|---|
| App lifecycle and route guards | src/app/create-app.js | app | All routed features |
| Route names and session redirects | src/app/routes.js | app | App and route tests |
| Runtime URLs and release flags | src/config/runtime.js | config | App, features and Auth service |
| Design tokens | src/design-system/tokens.css | design-system | All feature screens |
| Icon registry | src/design-system/icons.js | design-system | All features |
| Shared brand/header/footer | src/design-system/page-shell.js and page-shell.css | design-system | Global Home, Circle, Jelajah, Auth, Legal and Dashboard |
| Global Home and public Feed/Reels rendering | src/features/home/home-page.js and home-page.css | features/home | Guest and signed-in #/home |
| Circle Home and Jelajah | src/features/social/social-pages.js and social-pages.css | features/social | #/circle and #/discover |
| User Dashboard | src/features/dashboard/dashboard-page.js and dashboard-page.css | features/dashboard | Protected #/dashboard |
| Auth UI | src/features/auth/auth-page.js and auth-page.css | features/auth | App router |
| Legal draft screens | src/features/legal/policy-page.js and policy-page.css | features/legal | App router |
| Auth operations | src/services/auth/auth-service.js | services/auth | App and Auth feature |
| Supabase client | src/lib/supabase/client.js | lib/supabase | Auth and public social feed |
| Global base styles | src/styles/global.css | styles | Entire frontend |

## Runtime route map
- Empty URL/hash and #/home → Global Home for guests and authenticated users.
- PLUITS logo from public social surfaces → #/home.
- #/circle → personalized Circle Home.
- #/discover → nationwide Jelajah, independent of user location.
- Successful login → protected #/dashboard.
- Authenticated visits to Login, Registration, or Forgot Password → #/dashboard.
- Guest access to #/dashboard → #/login.
- Workspace remains an internal development term only.

## Navigation contract
Mobile navigation exposes Beranda (Circle), Jelajah, create hub, Pesan, and Akun. Initial Pesan and Akun entry points lead to the authenticated Dashboard surface until dedicated destinations are connected. The create hub is an honest capability preview; unavailable publishing actions remain disabled.
Global Home header uses icon-only Favorit, account, search, cart, and notifications actions. Header and sticky category tabs span the physical viewport width while their inner content observes shared page gutters. Horizontal content rails remain full-bleed without widening the page shell.

## Backend contracts and protected surfaces
This increment reads the existing public/published social stream through the existing Supabase browser client. Feed reads public/published rows from public.user_posts and author display fields from public.user_profiles; Reels filters the same stream by content_kind. Media/avatar assets are requested as signed URLs from the private pluits-user-media bucket and remain subject to existing RLS and Storage policies. No schema, RLS, policy, migration, trigger, account, transaction, or production content record is created or changed. No secret key is introduced.
Demo fixtures for Top Global, nearby, people, Stories, Live, Blog, and product rails exist only in frontend presentation code for visual QA. They are not production records and must not be seeded into Supabase.

## Change rules
Keep feature changes within their owner. Shared route/brand changes require consumer impact review. Preserve Auth recovery and session persistence. Do not change Supabase configuration, migrations, database records, RLS, triggers, Dashboard behavior, or global design tokens in this scope.

## Required verification
Run npm test and npm run build. Verify Global Home, Circle, and Jelajah routes; icon-only header; full-width header and sticky tabs; sticky handoff in both directions; tab scroll and active state; real public Feed/Reels query and signed media rendering; loading/error/empty states; visual demo rails; full-bleed rail edges; no document horizontal overflow; bottom navigation and safe area; guest/authenticated behavior; desktop/tablet/mobile layouts.

## Current limitations
- Signup remains disabled unless explicitly enabled after readiness review.
- Stories, Live, Blog, Marketplace, Geo Directory, nearby businesses, notifications, cart data, and product feeds are not yet connected to operational data services; corresponding Global Home content currently uses visual demo fixtures where noted in the canonical page specification.
- Create actions remain disabled until their publishing services are available.
- Pesan and Akun navigation currently enter the Dashboard surface; dedicated destinations are not yet connected.
- Location permission request flow is not implemented; Circle displays a clear no-location fallback.
- Real Android visual acceptance and founder product approval remain NOT TESTED / NOT READY.
