# Frontend V2 — Change Map

Status: IMPLEMENTATION PROTOTYPE / PROVISIONAL PRODUCT FOUNDATION
Scope: Public Business Homepage, authenticated Social App, Jelajah, Ruang Kerja, Messages, Profile, and separate business-center direction.

## Source-of-truth and ownership
| Domain | Canonical path | Owner | Consumers |
|---|---|---|---|
| App lifecycle and route guards | src/app/create-app.js | app | All routed features |
| Clean URL route names, pathname resolution and session redirects | src/config/paths.js and src/app/routes.js | app/config | App and route tests |
| Runtime URLs and release flags | src/config/runtime.js | config | App, features and Auth service |
| Design tokens | src/design-system/tokens.css | design-system | All feature screens |
| Icon registry | src/design-system/icons.js | design-system | All features |
| Shared brand/header/footer | src/design-system/page-shell.js and page-shell.css | design-system | Business Homepage, Social Home, Jelajah, Auth, Legal and Ruang Kerja |
| Public Business Homepage | src/features/home/business-home-page.js and business-home.css | features/home | `/pluits/`; PLUITS brand destination |
| Authenticated Social Home (former Global Home composition) | src/features/home/home-page.js and home-page.css | features/home | protected `/pluits/social/` after login |
| Jelajah, Messages, redesigned Profile, Settings, and legacy Circle route | src/features/social/social-pages.js, profile-cover-controls.js, and social-pages.css | features/social | `/pluits/discover/`, `/pluits/messages/`, `/pluits/profile/`, `/pluits/settings/`; legacy `/pluits/circle/` redirects to `/pluits/social/` |
| Ruang Kerja | src/features/dashboard/dashboard-page.js and dashboard-page.css | features/dashboard | Protected `/pluits/dashboard/` |
| Auth UI | src/features/auth/auth-page.js and auth-page.css | features/auth | App router |
| Legal draft screens | src/features/legal/policy-page.js and policy-page.css | features/legal | App router |
| Public footer information pages | src/features/public-info/pages/ grouped by company, support, community, marketplace and privacy; shared frame in public-info-page.js | features/public-info | Public homepage, Auth, legal and footer destinations |
| Auth operations | src/services/auth/auth-service.js | services/auth | App and Auth feature |
| Supabase client | src/lib/supabase/client.js | lib/supabase | Auth and public social feed |
| Global base styles | src/styles/global.css | styles | Entire frontend |

## Runtime route map
- `/pluits/` → public PLUITS Homepage / pusat bisnis; the PLUITS logo always returns here, including from the signed-in app.
- `/pluits/social/` → authenticated social-media Beranda; successful login and authenticated visits to Login, Registration, or Forgot Password resolve here.
- An existing authenticated session at the public root resolves to `/pluits/social/`; the explicit `/pluits/` remains the public business homepage.
- `/pluits/circle/` → legacy route that redirects to `/pluits/social/`; Circle Home is no longer a separate primary destination.
- `/pluits/discover/` → nationwide Jelajah, independent of user location.
- `/pluits/dashboard/` → authenticated Ruang Kerja, entered from the center plus button.
- `/pluits/messages/` and `/pluits/profile/` → dedicated authenticated app destinations.
- `/pluits/settings/` → protected account settings hub linked from Profile; sign-out uses the existing auth service.
- Guest access to protected app routes → `/pluits/login/`.
- Each public footer destination has its own clean URL, including `/pluits/about/`, `/pluits/help/`, `/pluits/faq/`, `/pluits/contact/`, `/pluits/marketplace-info/`, `/pluits/terms/`, and `/pluits/privacy/`.
- Production build generates a static route entry directory for every configured route so direct URL entry and refresh work on GitHub Pages. Route slugs are maintained once in `src/config/paths.js`.
- Workspace remains an internal development term only.

## Navigation contract
The signed-in app navigation exposes Beranda (/pluits/social/), Jelajah (/pluits/discover/), center plus / Ruang Kerja (/pluits/dashboard/), Pesan (/pluits/messages/), and Profil (/pluits/profile/). Profile links to the dedicated account settings hub (/pluits/settings/), where sign-out is available. The PLUITS logo is intentionally separate and returns to the public business homepage (/pluits/).
The Social Home header uses icon-only Favorit, account, search, cart, and notifications actions. The former Global Home composition is reused as the signed-in social home; the separate business-center surface remains a distinct product area and must not be folded into social content. Header and sticky category tabs span the physical viewport width while their inner content observes shared page gutters. Horizontal content rails remain full-bleed without widening the page shell.

## Backend contracts and protected surfaces
This increment reads the existing public/published social stream through the existing Supabase browser client. Feed reads public/published rows from public.user_posts and author display fields from public.user_profiles; Reels filters the same stream by content_kind. Media/avatar assets are requested as signed URLs from the private pluits-user-media bucket and remain subject to existing RLS and Storage policies. No schema, RLS, policy, migration, trigger, account, transaction, or production content record is created or changed. No secret key is introduced.
Demo fixtures for Top Global, nearby, people, Stories, Live, Blog, and product rails exist only in frontend presentation code for visual QA. They are not production records and must not be seeded into Supabase.

## Change rules
Keep feature changes within their owner. Shared route/brand changes require consumer impact review. Preserve Auth recovery and session persistence. Do not change Supabase configuration, migrations, database records, RLS, triggers, Dashboard behavior, or global design tokens in this scope.

## Required verification
Run npm test and npm run build. Verify Public homepage, Social Home, legacy Circle redirect, Jelajah, Messages, Profile, and Settings routes; icon-only header; full-width header and sticky tabs; sticky handoff in both directions; tab scroll and active state; real public Feed/Reels query and signed media rendering; loading/error/empty states; visual demo rails; full-bleed rail edges; no document horizontal overflow; bottom navigation and safe area; Profile → Settings navigation; sign-out confirmation and auth session clearing; no website footer on signed-in app surfaces; guest/authenticated behavior; desktop/tablet/mobile layouts.

## Current limitations
- Signup remains disabled unless explicitly enabled after readiness review.
- Stories, Live, Blog, Marketplace, Geo Directory, nearby businesses, notifications, cart data, and product feeds are not yet connected to operational data services; corresponding Global Home content currently uses visual demo fixtures where noted in the canonical page specification.
- Create actions remain disabled until their publishing services are available.
- Messages remains an initial empty inbox surface. Profile now has a borderless identity card, tier badge, follower-stat placeholders, upgrade entry point, quick profile settings panel, and account-settings shortcut. Profile editing, cover upload persistence, privacy persistence, subscription checkout, follower counts, notification preferences, and published profile media are not yet connected. Profile cover controls provide a session-only image/text preview, a no-cover layout, and a reserved Fluvara library state; no unapproved library artwork is presented.
- Location permission request flow is not implemented; Circle displays a clear no-location fallback.
- Real Android visual acceptance and founder product approval remain NOT TESTED / NOT READY.
