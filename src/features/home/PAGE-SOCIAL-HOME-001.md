# Social Home — Product Specification

- **ID:** PAGE-SOCIAL-HOME-001
- **Status:** IN-DESIGN / implementation prototype
- **Purpose:** Primary, authenticated, mobile-first social home for a PLUITS user.
- **Product-owner direction:** Social experience is the dominant part of the home (approximately 70% of its content priority). Discovery, local marketplace, services, and platform information follow the social stream.
- **Business separation:** Business-center capabilities remain in the separate Ruang Kerja. Do not merge merchant operations into the consumer home.

## Navigation and route contract
- The authenticated user's Beranda is currently mounted at `#/social`; the visible bottom-navigation label is Beranda.
- Public marketing homepage remains `#/home` for guests. An authenticated visit to the public root is redirected to Social Home.
- Jelajah → `#/discover`.
- Center plus → `#/dashboard` (Ruang Kerja / management hub).
- Pesan → `#/messages`.
- Profil → `#/profile`.
- Legacy `#/circle` resolves to `#/social`.
- The fixed bottom navigation remains reachable throughout the mobile page and respects the device safe area.

## Mobile-first content hierarchy
1. Shared PLUITS header with compact account, search, cart, and notification actions.
2. A single quick-search entry directly below the header. It opens a search overlay/sheet with a search field and category shortcuts; the former horizontal service-filter rail and inline service-search form are removed from the home surface.
3. **Top 10 discovery** — separate horizontal carousels by category (initial visual fixtures: Wisata, Restoran, Seafood, and Kuliner Lokal). The scope label reflects the selected/global region; the current visual prototype uses Bali as the island-level scope for a user around Denpasar. Each carousel shows about 90% of a card on mobile and advances automatically every 2.6 seconds, while remaining manually swipeable. At the end, it loops forward seamlessly rather than reversing. These are design fixtures, not real rankings or verified reviews.
4. **Di sekitar Anda** — local discovery carousel immediately after Top 10 and before the social feed. Cards are taller/larger, approximately 70% of the mobile viewport width, with a large photo, rating/review overlay on the photo, business/place name, category/location, and a short review excerpt below. Fixtures remain illustrative until connected to verified local data.
5. Social experience remains the dominant product identity: people suggestions, Stories from the user's circle, Feed/Reels/Live/Blog tabs, and vertically scrolling social content. Feed cards remain full-width on mobile.
6. **Produk lokal pilihan** — horizontal product/category preview leading to Marketplace, followed by a clear Marketplace CTA. Marketplace should start from the user's current/selected location and allow the user to change scope to another city or global. Location-aware product data and location selection remain pending Marketplace/service integration.
7. Compact dark **Tentang PLUITS** summary before the persistent app navigation.

## Layout and interaction rules
- Preserve shared page shell, logo, header geometry, tokens, registered icons, and standard content gutters.
- Quick search is one clear entry point; its overlay handles the search field and category shortcuts. Do not restore the old service shortcut filter rail or inline service form to the homepage.
- Top 10 carousels use viewport-wide tracks, about 90vw card width on mobile, touch panning, scroll snap, and a forward-only seamless loop. Autoplay interval is approximately 2.6 seconds; manual touch, pointer, wheel, or keyboard interaction temporarily pauses autoplay. Respect reduced-motion preferences.
- Around You uses a viewport-wide horizontal track, about 70vw card width on mobile, larger portrait-ish photo area, readable rating overlay and review excerpt. Keep the next card partially visible.
- Social posts remain full-width on mobile; tablet/desktop may retain a readable constrained feed width.
- Tabs navigate to their corresponding content sections and update the active visual state as the user scrolls. They do not pin to the viewport.
- Bottom navigation remains fixed and safe-area aware.
- Keep the authenticated home distinct from the public marketing homepage. The compact dark About summary remains the final content section before persistent app navigation; do not import business-owner marketing sections.

## Data integrity and availability
- Real Feed/Reels content must come only from the first-party PLUITS social API and existing authorization rules.
- People suggestions, Stories, Live, Blog, nearby discovery, and product previews remain clearly marked visual fixtures until their real services/data contracts are connected.
- Never insert visual fixtures into production tables or present fixture people, products, counts, or activity as real.
- Do not fabricate local inventory or claim location detection is active before Marketplace integration is implemented.

## Implementation mapping
- Route/auth redirect: `src/app/create-app.js`, `src/app/routes.js`.
- Social Home and its scoped styles: `src/features/home/home-page.js`, `src/features/home/home-page.css`.
- Mobile welcome hero, location-scope prompt, and service shortcuts are page-local composition; no global tokens or shared shell geometry are changed.
- Marketplace CTA links to the existing Marketplace route. Product preview cards remain labelled illustrative until real location-aware catalogue data is connected.
- This page specification: `src/features/home/PAGE-SOCIAL-HOME-001.md`.
- Shared shell/icons/tokens: `src/design-system/`.
- Ruang Kerja remains `src/features/dashboard/dashboard-page.js`.

## Dependencies, exclusions, and validation
- No database schema, RLS, storage policy, auth provider, design token, shared component, or Marketplace operational workflow changes are part of this home-page implementation.
- Verify guest/authenticated routing, Feed/Reels loading/empty/error states, carousel touch behavior, non-sticky tabs, full-width mobile posts, fixed bottom navigation and safe area, tablet/desktop layouts, keyboard focus, reduced motion, and no horizontal page overflow.
- Automated build/tests do not replace browser/device visual acceptance on a real mobile viewport.
