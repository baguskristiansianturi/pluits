# Global Home, Circle Home, and Discovery — Product/UI Specification

Status: **IMPLEMENTATION PROTOTYPE / CONTENT SERVICES PARTIALLY CONNECTED**
IDs: `PAGE-GLOBAL-HOME`, `PAGE-CIRCLE-HOME`, `PAGE-DISCOVER`.

## Product boundaries
1. Global Home is the PLUITS platform homepage for guests and signed-in users. The PLUITS brand always returns here. Its scope is nationwide discovery, not a user's personal Circle.
2. Jelajah is a nationwide discovery destination, independent of the user's Circle and current location.
3. Circle Home is the personalized home. Its content is selected from Circle relationships, interests, and location-aware relevance. It remains usable without location permission; only location-based relevance is reduced.
4. Dashboard remains the authenticated control center and is not replaced by either homepage.

## Global Home information architecture
1. Full-viewport global header: PLUITS brand and icon-only Favorit at left; account, search, cart, and notifications as icon actions at right. Header background, divider, and hit area extend to both physical viewport edges.
2. Global introduction.
3. Top Global — nationwide highlight rail; CTA opens Jelajah.
4. Di Sekitar Anda — nearby rail; CTA opens discovery.
5. Orang yang Mungkin Anda Kenal — people discovery rail.
6. Stories — horizontal story rail.
7. Social content categories: Feed, Reels, Live, Blog.
8. Produk Lokal — CTA opens Marketplace/discovery.
9. Semua Fitur.
10. Shared footer and mobile bottom navigation.

## Sticky ownership and tab behavior
- Header is sticky at the top during the initial page portion.
- When the content-tab bar reaches the header's sticky boundary, release the header from sticky positioning. The content tabs then occupy the top sticky position.
- When the user scrolls back above the handoff point, restore header sticky behavior.
- The sticky tab bar remains reachable while scrolling and spans the full viewport width; no detached left/right gutters.
- Selecting Feed, Reels, Live, or Blog scrolls to that category; scroll observation updates the active tab.
- Each category may contain feed items, recommendation blocks, and horizontal rails. A category is not restricted to one content format.

## Full-bleed carousel and navigation contract
- Section headings, descriptions, and CTAs remain aligned to the shared page container.
- Carousel viewport/track extends to physical viewport edges using a viewport-width breakout; do not widen the whole page shell.
- Applies to Top Global, nearby, people, Stories, Produk Lokal, and future rails inside content categories.
- Horizontal tracks use native overflow scrolling, touch horizontal panning, and mandatory start snap. Track overflow must not create document/body horizontal scrolling.
- Header and content-tab surfaces use full-bleed width independently of the standard-width page content. Their contents retain the shared page gutter.

## Content data contract
- Feed reads real `public` + `published` rows from `public.user_posts`, newest first, with author identity from `public.user_profiles`. It includes the public post stream, not only content authored by the currently signed-in user.
- Reels reads the same public published post source and selects `content_kind = 'reel'`.
- Media and public avatar assets are resolved from the private `pluits-user-media` bucket through authenticated/authorized signed URLs. Existing RLS and Storage policies remain the access boundary; the frontend must not bypass them.
- Feed cards display the actual author, username, publication date, media, and caption when present. Empty captions remain empty; do not invent captions or engagement counts.
- Top Global, nearby discovery, people suggestions, Stories, Live, Blog, and product cards currently use clearly isolated, visual demo fixtures for UI evaluation. These are not real users, events, recommendations, inventory, broadcasts, or published articles. Replace/remove them when the relevant services are ready.
- Demo fixtures must never be inserted into Supabase or presented as verified/operational records.

## Responsive behavior and measurements
- Shared page gutters, page width, spacing, typography, colors, radii, and icons inherit the existing design-system tokens and shared shell. Do not override the 50px shared header-to-content gap.
- Mobile feature grid: two columns. Bottom navigation: five equal destinations, safe-area aware, fixed to viewport bottom; page reserves bottom space.
- Provisional component-local values pending visual QA: general rail card basis 74vw mobile / clamp(220px,26vw,290px) otherwise; story diameter 54px mobile / 58px default; rail gap 9px mobile / 12px default; tab controls min-height 42px. These are implementation measurements, not approved global tokens.
- Header action icon hit area: 38px default / 34px mobile. SVGs are sourced from the shared local icon registry.
- Existing design tokens remain provisional; this feature does not approve platform-wide values or introduce global tokens.

## Location and privacy
- Global Home and Jelajah remain nationwide even when a user grants location.
- Circle may use location for nearby relevance only after permission is granted.
- Explain the benefit before requesting location. Denial must not block core app usage.
- Do not expose precise location in public content or profile by default.

## Runtime mapping
- Global Home and public Feed/Reels data rendering: `src/features/home/home-page.js`, `home-page.css`.
- Circle Home and Jelajah: `src/features/social/social-pages.js`, `social-pages.css`.
- Route wiring: `src/app/create-app.js`, `src/app/routes.js`, `src/config/paths.js`.
- Shared brand/header/footer and icon glyphs: `src/design-system/page-shell.js`, `page-shell.css`, `tokens.css`, and `icons.js`.
- Data access uses the existing browser Supabase client in `src/lib/supabase/client.js`.

## Validation
Automated route tests and CI must run `npm test` and `npm run build`. Verify public post visibility under guest and signed-in sessions, signed media loading, author/avatar fallback, feed/reel filtering, loading/error/empty states, sticky handoff in both scroll directions, tab jump/active state, full-bleed header/tab/rail edges, no body horizontal overflow, bottom navigation/safe area, desktop/tablet/mobile. Real Android visual UAT, live Story/Live/blog/product services, geolocation permission flow, cart/notifications, and post creation remain NOT IMPLEMENTED / NOT ACCEPTED.
