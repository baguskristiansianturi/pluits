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
| Global Home | src/features/home/home-page.js and home-page.css | features/home | Guest and signed-in #/home |
| Circle Home and Jelajah | src/features/social/social-pages.js and social-pages.css | features/social | #/circle and #/discover |
| User Dashboard | src/features/dashboard/dashboard-page.js and dashboard-page.css | features/dashboard | Protected #/dashboard |
| Auth UI | src/features/auth/auth-page.js and auth-page.css | features/auth | App router |
| Legal draft screens | src/features/legal/policy-page.js and policy-page.css | features/legal | App router |
| Auth operations | src/services/auth/auth-service.js | services/auth | App and Auth feature |
| Supabase client | src/lib/supabase/client.js | lib/supabase | Auth service |
| Global base styles | src/styles/global.css | styles | Entire frontend |

## Route map
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

## Shared UI constraints
Global Home, Circle, and Jelajah consume the shared page shell and existing tokens. Keep canonical navbar-to-content gap at 50px. Do not alter Dashboard composition, auth, Supabase services, or global tokens in this increment.

## Data truthfulness
Do not fabricate people, stories, posts, live streams, products, nearby businesses, notifications, cart data, or transactions. Show honest empty states until owning services are integrated.

## Validation
Run npm test and npm run build. Manually verify desktop/tablet/mobile, sticky header-to-tabs handoff in both directions, tab scroll and active state, full-bleed rail edges, no document horizontal overflow, bottom navigation and safe area. Real Android visual acceptance and live service integration remain separate gates.
