# Global Home, Circle Home, and Discovery — Product/UI Specification

Status: **IMPLEMENTATION PROTOTYPE / CONTENT SERVICES NOT CONNECTED**
IDs: `PAGE-GLOBAL-HOME`, `PAGE-CIRCLE-HOME`, `PAGE-DISCOVER`.

## Product boundaries
1. Global Home is the PLUITS platform homepage for guests and signed-in users. The PLUITS brand always returns here. Its scope is nationwide discovery, not a user's personal Circle.
2. Jelajah is a nationwide discovery destination, independent of the user's Circle and current location.
3. Circle Home is the personalized home. Its content is selected from Circle relationships, interests, and location-aware relevance. It remains usable without location permission; only location-based relevance is reduced.
4. Dashboard remains the authenticated control center and is not replaced by either homepage.

## Global Home information architecture
1. Global header: PLUITS brand, Favorit, notifications, cart, search, and session actions.
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
- The sticky tab bar remains reachable while scrolling.
- Selecting Feed, Reels, Live, or Blog scrolls to that category; scroll observation updates the active tab.
- Each category may contain feed items, recommendation blocks, and horizontal rails. A category is not restricted to one content format.

## Full-bleed carousel contract
- Section headings, descriptions, and CTAs remain aligned to the shared page container.
- Carousel viewport/track extends to physical viewport edges using a viewport-width breakout; do not widen the whole page shell.
- Horizontal tracks use native overflow scrolling, touch horizontal panning, and mandatory start snap.
- Track overflow must not create document/body horizontal scrolling.
- Apply to Top Global, nearby, people, Stories, and future rails in every content category.

## Responsive behavior and measurements
- Shared page gutters, page width, spacing, typography, colors, radii, and icons inherit the existing design-system tokens and shared shell. Do not override the 50px shared header-to-content gap.
- Mobile feature grid: two columns. Bottom navigation: five equal destinations, safe-area aware, fixed to viewport bottom; page reserves bottom space.
- Provisional component-local values pending visual QA: general rail card basis 74vw mobile / clamp(220px,26vw,290px) otherwise; story diameter 54px mobile / 58px default; rail gap 9px mobile / 12px default; tab controls min-height 40px. These are implementation measurements, not approved global tokens.
- Existing design tokens remain provisional; this feature does not approve platform-wide values or introduce global tokens.

## Location and privacy
- Global Home and Jelajah remain nationwide even when a user grants location.
- Circle may use location for nearby relevance only after permission is granted.
- Explain the benefit before requesting location. Denial must not block core app usage.
- Do not expose precise location in public content or profile by default.

## Runtime mapping
- Global Home: `src/features/home/home-page.js`, `home-page.css`.
- Circle Home and Jelajah: `src/features/social/social-pages.js`, `social-pages.css`.
- Route wiring: `src/app/create-app.js`, `src/app/routes.js`, `src/config/paths.js`.
- Shared resources: `src/design-system/page-shell.js`, `page-shell.css`, `tokens.css`, and `icons.js`.

## Data truthfulness and dependencies
No real feed, users, stories, live broadcasts, products, or nearby businesses are fabricated. Initial rails use explicit empty/provisional states until Social, Geo Directory, Marketplace, and notification/cart services are integrated. The create sheet is a disabled capability preview. Bottom navigation routes to Circle, Jelajah, Dashboard entry points.

## Validation
Automated route tests are updated. CI must run `npm test` and `npm run build`. Verify sticky handoff in both scroll directions, tab jump/active state, full-bleed edge alignment, no body horizontal overflow, bottom navigation/safe area, desktop/tablet/mobile, and guest/authenticated states. Real content services, geolocation permission flow, cart/notifications, post creation, and Android visual UAT remain NOT IMPLEMENTED.
