# Frontend V2 — Change Map

Status: IMPLEMENTATION PROTOTYPE / PROVISIONAL PRODUCT FOUNDATION
Scope: Public Business Homepage, Accommodation Discovery, Hangout & Leisure, Marketplace, authenticated Social App, Jelajah, Ruang Kerja, Messages, Profile, and separate business-center direction.

## Source-of-truth and ownership
| Domain | Canonical path | Owner | Consumers |
|---|---|---|---|
| App lifecycle and route guards | src/app/create-app.js | app | All routed features |
| Route names and session redirects | src/app/routes.js | app | App and route tests |
| Runtime URLs and release flags | src/config/runtime.js | config | App, features and Auth service |
| Design tokens | src/design-system/tokens.css | design-system | All feature screens |
| Icon registry | src/design-system/icons.js | design-system | All features |
| Shared brand/header/footer | src/design-system/page-shell.js and page-shell.css | design-system | Business Homepage, Social Home, Jelajah, Auth, Legal and Ruang Kerja |
| Accommodation Discovery and Property Detail Preview | src/features/accommodation/accommodation-home-page.js and accommodation-home-page.css | features/accommodation | #/accommodation; frontend-only discovery and editorial property detail preview |
| Public PLUITS Homepage / ecosystem entrypoints | src/features/home/business-home-page.js and business-home.css | features/home | #/home; copy-led entry links to Accommodation, Restaurant & Café, Hangout, Places, Marketplace and Social; public brand destination |
| Authenticated Social Home (former Global Home composition) | src/features/home/home-page.js and home-page.css | features/home | protected #/social after login |
| Jelajah, Messages, redesigned Profile, Settings, and legacy Circle route | src/features/social/social-pages.js and social-pages.css | features/social | #/discover, #/messages, #/profile, #/settings; legacy #/circle redirects to #/social |
| Ruang Kerja | src/features/dashboard/dashboard-page.js and dashboard-page.css | features/dashboard | Protected #/dashboard |
| Auth UI | src/features/auth/auth-page.js and auth-page.css | features/auth | App router |
| Legal draft screens | src/features/legal/policy-page.js and policy-page.css | features/legal | App router |
| Auth operations | src/services/auth/auth-service.js | services/auth | App and Auth feature |
| Supabase client | src/lib/supabase/client.js | lib/supabase | Auth and public social feed |
| Global base styles | src/styles/global.css | styles | Entire frontend |

## Runtime route map
- #/accommodation → public Accommodation discovery homepage; frontend-only sample data in this increment.
- #/home → public PLUITS Homepage / pusat bisnis; the PLUITS logo always returns here, including from the signed-in app.
- #/social → authenticated social-media Beranda; successful login and authenticated visits to Login, Registration, or Forgot Password resolve here.
- An existing authenticated session with an empty URL hash starts at #/social; an explicit #/home remains the public business homepage.
- Legacy #/circle → #/social; Circle Home is no longer a separate primary destination.
- #/discover → nationwide Jelajah, independent of user location.
- #/dashboard → authenticated Ruang Kerja, entered from the center plus button.
- #/messages and #/profile → dedicated authenticated app destinations.
- #/settings → protected account settings hub linked from Profile; sign-out uses the existing auth service.
- Guest access to protected app routes → #/login.
- Workspace remains an internal development term only.

## Navigation contract
The signed-in app navigation exposes Beranda (#/social), Jelajah (#/discover), center plus / Ruang Kerja (#/dashboard), Pesan (#/messages), and Profil (#/profile). Profile links to the dedicated account settings hub (#/settings), where sign-out is available. The PLUITS logo is intentionally separate and returns to the public business homepage (#/home).
The Social Home header uses icon-only Favorit, account, search, cart, and notifications actions. The former Global Home composition is reused as the signed-in social home; the separate business-center surface remains a distinct product area and must not be folded into social content. Header and sticky category tabs span the physical viewport width while their inner content observes shared page gutters. Horizontal content rails remain full-bleed without widening the page shell.

## Backend contracts and protected surfaces
This increment reads the existing public/published social stream through the existing Supabase browser client. Feed reads public/published rows from public.user_posts and author display fields from public.user_profiles; Reels filters the same stream by content_kind. Media/avatar assets are requested as signed URLs from the private pluits-user-media bucket and remain subject to existing RLS and Storage policies. No schema, RLS, policy, migration, trigger, account, transaction, or production content record is created or changed. No secret key is introduced.
Demo fixtures for Top Global, nearby, people, Stories, Live, Blog, and product rails exist only in frontend presentation code for visual QA. They are not production records and must not be seeded into Supabase.

## Change rules
Keep feature changes within their owner. Shared route/brand changes require consumer impact review. Preserve Auth recovery and session persistence. Do not change Supabase configuration, migrations, database records, RLS, triggers, Dashboard behavior, or global design tokens in this scope.

## Required verification
Run npm test and npm run build. Verify Public homepage, Social Home, legacy Circle redirect, Jelajah, Messages, Profile, and Settings routes; icon-only header; full-width header and sticky tabs; sticky handoff in both directions; tab scroll and active state; real public Feed/Reels query and signed media rendering; loading/error/empty states; visual demo rails; full-bleed rail edges; no document horizontal overflow; bottom navigation and safe area; Profile → Settings navigation; sign-out confirmation and auth session clearing; no website footer on signed-in app surfaces; guest/authenticated behavior; desktop/tablet/mobile layouts.

## Accommodation detail preview
- Property cards open an editorial photo-led detail overlay: gallery, property identity, overview, review placeholder, room/unit options, facilities, area, and policy disclosure.
- Booking utility is presented as a clear sample-price rail on desktop and a sticky selection bar on mobile. Room choices are illustrative only; dates, guest count, rates, taxes, inventory, booking, and payment are not connected.
- No review score or verified review is fabricated. Review section explicitly remains empty until real PLUITS account-linked experiences exist.
- Property gallery images, room types, and displayed prices are frontend fixtures and must not be interpreted as real property inventory or offers.

## Current limitations
- Signup remains disabled unless explicitly enabled after readiness review.
- Stories, Live, Blog, Marketplace, Geo Directory, Accommodation inventory/booking, nearby businesses, notifications, cart data, and product feeds are not yet connected to operational data services; corresponding Global Home content currently uses visual demo fixtures where noted in the canonical page specification.
- Create actions remain disabled until their publishing services are available.
- Messages remains an initial empty inbox surface. Profile now has a borderless identity card, tier badge, follower-stat placeholders, upgrade entry point, quick profile settings panel, and account-settings shortcut. Profile editing, privacy persistence, subscription checkout, follower counts, notification preferences, and published profile media are not yet connected.
- Location permission request flow is not implemented; Circle displays a clear no-location fallback.
- Real Android visual acceptance and founder product approval remain NOT TESTED / NOT READY.
