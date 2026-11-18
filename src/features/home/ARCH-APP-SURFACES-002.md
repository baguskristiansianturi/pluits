# PLUITS Public Homepage & Signed-in Social App

- **ID:** ARCH-APP-SURFACES-002
- **Status:** Product direction confirmed; frontend prototype

## Product surface separation
1. **Public Homepage (#/home)** — reached by tapping the PLUITS logo from anywhere. This is the public platform homepage and business-center entry point, describing the PLUITS business ecosystem, marketplace, store, restaurant/café, services, tickets/accommodation, logistics/transportation, and how to enter the social app.
2. **Signed-in Social App (#/social)** — the user's primary destination after login. It reuses the former Global Home composition for social activity and content. It replaces the old Dashboard as the primary post-login landing page.
3. **Ruang Kerja (#/dashboard)** — accessed only through the center plus button in the signed-in navigation. It is the user's creation and management area, not the default landing page.

## Signed-in bottom navigation
- Beranda → #/social
- Jelajah → #/discover
- Center plus → #/dashboard (Ruang Kerja)
- Pesan → #/messages
- Profil → #/profile

## Authentication contract
- Successful login → #/social.
- Authenticated visits to login/register/forgot → #/social.
- Existing session with an empty hash → #/social.
- Explicit #/home always remains the public business homepage, even while authenticated, so the PLUITS logo can return there.
- Guests attempting to access social app, Ruang Kerja, Messages, or Profile are sent to login.
- Legacy #/circle resolves to #/social.

## Scope and honest limitations
- Public business homepage and social home are separate page surfaces.
- Messages and Profile now have separate initial route/screen surfaces. Inbox data, profile editing, public visibility controls, and profile content feeds remain future service integrations.
- The existing social feed continues to read published public posts from Supabase; visual fixtures remain presentation-only.
- No Supabase schema, RLS, storage policies, or production data changed.

## Implementation mapping
- src/features/home/business-home-page.js, business-home.css: public business homepage.
- src/features/home/home-page.js, home-page.css: signed-in social home.
- src/features/social/social-pages.js, social-pages.css: Jelajah, Messages, Profile.
- src/app/create-app.js, src/app/routes.js, src/config/paths.js: route/auth behavior.
- src/features/dashboard/dashboard-page.js: Ruang Kerja entered through plus.
- src/CHANGE-MAP.md: source-of-truth route and ownership map.

## Validation
- Verify logo from signed-in app returns #/home.
- Verify login and existing session land at #/social.
- Verify bottom navigation destinations and guest route protection.
- Verify desktop/mobile layouts and no horizontal overflow.
- Run npm test and npm run build.