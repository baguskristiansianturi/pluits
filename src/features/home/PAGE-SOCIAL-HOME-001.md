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
2. Compact introduction and one unified discovery/search entry point for people, places, products, and services.
3. **Orang yang mungkin Anda kenal** — horizontal profile-suggestion carousel.
4. **Cerita dari circle Anda** — horizontal story carousel, including the user's own add-story entry.
5. Social content tabs in this order: **Feed, Reels, Live, Blog**. Tabs belong only to the social area, scroll with the page, and are not sticky.
6. Sequential, vertically scrollable social content. Feed cards use full-width, Instagram-like media presentation on mobile. Existing published Feed/Reels data integration is retained; Live, Stories, and Blog remain prototype surfaces until their services are connected.
7. **Jelajahi di sekitar Anda** — horizontal local discovery carousel for places, food, activities, and services.
8. **Produk lokal pilihan** — horizontal product/category preview leading to Marketplace. Marketplace should start from the user's current/selected location and allow the user to change scope to another city or global. Location-aware product data and location selection remain pending Marketplace/service integration; current home cards are visibly demo-only.
9. **Layanan PLUITS** — horizontal shortcuts for Transportasi, Kurir, Tiket, Sewa Mobil, Akomodasi, and Kuliner.
10. Compact **Tentang PLUITS** summary before the persistent app navigation.

## Layout and interaction rules
- Preserve shared page shell, logo, header geometry, tokens, registered icons, and standard content gutters.
- Use viewport-wide horizontal carousel tracks while retaining content gutters for section headings and card copy.
- Carousels use horizontal touch panning and scroll snap; users can reach the last item without causing document-level horizontal overflow.
- Social posts are full-width on mobile; desktop/tablet may retain a readable constrained feed width.
- Tabs navigate to their corresponding content sections and update the active visual state as the user scrolls. They do not pin to the viewport.
- Bottom navigation remains fixed and safe-area aware.
- The mobile app home does not add a marketing-site copyright footer; the compact About summary is the final content section before persistent navigation.

## Data integrity and availability
- Real Feed/Reels content must come only from the first-party PLUITS social API and existing authorization rules.
- People suggestions, Stories, Live, Blog, nearby discovery, and product previews remain clearly marked visual fixtures until their real services/data contracts are connected.
- Never insert visual fixtures into production tables or present fixture people, products, counts, or activity as real.
- Do not fabricate local inventory or claim location detection is active before Marketplace integration is implemented.

## Implementation mapping
- Route/auth redirect: `src/app/create-app.js`, `src/app/routes.js`.
- Social Home and its scoped styles: `src/features/home/home-page.js`, `src/features/home/home-page.css`.
- This page specification: `src/features/home/PAGE-SOCIAL-HOME-001.md`.
- Shared shell/icons/tokens: `src/design-system/`.
- Ruang Kerja remains `src/features/dashboard/dashboard-page.js`.

## Dependencies, exclusions, and validation
- No database schema, RLS, storage policy, auth provider, design token, shared component, or Marketplace operational workflow changes are part of this home-page implementation.
- Verify guest/authenticated routing, Feed/Reels loading/empty/error states, carousel touch behavior, non-sticky tabs, full-width mobile posts, fixed bottom navigation and safe area, tablet/desktop layouts, keyboard focus, reduced motion, and no horizontal page overflow.
- Automated build/tests do not replace browser/device visual acceptance on a real mobile viewport.
