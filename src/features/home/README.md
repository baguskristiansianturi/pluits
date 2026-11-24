# PLUITS Home Experiences

Owner: `features/home`.

## Route ownership
- Public marketing homepage: `#/home`, mounted by `business-home-page.js` and styled by `business-home.css`.
- Social discovery/home stream: `#/social`, mounted by `home-page.js` and styled by `home-page.css`.
- These are intentionally distinct experiences. Do not duplicate routes or mount both pages on the same route.
- The public homepage remains the same for guests and signed-in users. Session state changes only the account action and primary CTA.
- The Social experience retains its own feed/discovery composition and must not be restyled or behaviorally changed as part of public homepage work.

## Public homepage purpose
Introduce PLUITS as a connected digital ecosystem through benefit-led marketing copy and service-relevant visuals. The page speaks to both individual users and business owners, explains what they can discover and how they can participate, then guides visitors to register, sign in, or explore.

## Runtime ownership
- `business-home-page.js`: single `mountBusinessHomePage({ root, user })` entry point and public landing-page composition.
- `business-home.css`: feature-scoped visual treatment.
- `src/app/create-app.js`: maps the existing `home` route to the public homepage and keeps `social` as the Social experience.
- Shared brand, page shell, footer, icons and tokens: `src/design-system/`.

## Shared resources and boundaries
- Use the official `public/assets/brand/pluits-logo.svg` via the shared brand conventions.
- Use the existing `renderBrand()`, `renderPageFooter()`, `renderIcon()`, shared tokens, and page-shell contract.
- Keep the 50px shared navbar-to-content gap. Do not change global tokens, shared footer renderer, route table, auth flow, Supabase, database, or other feature modules for page-local presentation.
- Use only registered local icons and existing brand assets. Public-homepage photography is now managed by the dedicated `home-visuals.js` registry; Unsplash CDN photos are an explicit approved exception. No new package, font, external script, or runtime dependency is added.
- Public landing-page photos are editorial stock imagery managed through `home-visuals.js`; they are illustrative, not PLUITS user posts, verified merchants, real products, metrics, or testimonials. See `HOME-VISUAL-GUIDE.md` for image replacement, crop, and spacing guidance.

## Content truthfulness
- Do not fabricate people, posts, activity, engagement, business listings, products, reviews, transaction counts, or provider verification.
- Explain product value in customer-facing language, not architecture or technical feature labels.
- Keep Social, Discover, Marketplace, and Services as the four connected ecosystem spaces.
- Do not claim planned merchant operations or vertical integrations are already available.
- The public homepage may show the planned payment-channel families and third-party payment-gateway direction only with a clear notice that payments are not yet active or integrated. Follow the shared [PLUITS Payments discovery baseline](../../../PLUITS-MASTER-MODEL-APP/04-SHARED-PLATFORM-SERVICES/PLUITS-PAYMENTS-AND-PAYMENT-METHODS.md).
- Android and iOS download panels must be clearly marked **Coming Soon** and must not link to unavailable app-store listings.

## Footer
The public homepage includes an Android Google Play and iOS App Store availability panel immediately before the shared footer. Both platforms show Coming Soon. The homepage and public information pages share the footer configuration in `src/features/public-info/public-footer.js`, rendered through the canonical shared footer renderer. The footer includes the approved public navigation groups and planned payment-method labels.

## Responsive behavior
Use the shared page shell, container, gutters, tokens and breakpoint contracts. Keep all sections within the viewport on mobile; prevent body horizontal overflow. Preserve accessible navigation, keyboard focus, readable contrast, and reduced-motion behavior.

## Validation
Run `npm test` and `npm run build`. Verify `#/home` for guest and authenticated sessions, primary/header/footer links, mobile and desktop layout, no body horizontal overflow, and that `#/social` still mounts the existing Social experience unchanged. Browser/device visual UAT remains separate from automated build evidence.

## Development workspace access
- Never expose a development-workspace or demo-session entry in the public homepage navigation or other visitor-facing UI.
- The current `?pluits-demo=1` query switch is a frontend simulation convenience, not secure owner authentication. Anyone who knows or discovers the switch can invoke it; it grants no production role and must never expose real user, merchant, or customer data.
- Replace the simulation switch with a genuinely private owner/developer access mechanism before connecting privileged development workflows or production data. Supabase availability must not be a prerequisite for local frontend development.


## Social Home mobile composition update — 23 November 2026
- The authenticated Social Home now starts with a compact location-scope prompt, welcome/search hero, and horizontally scrollable service shortcuts before the social discovery area.
- The social sequence remains people suggestions → Circle Stories → non-sticky Feed/Reels/Live/Blog tabs → vertically scrolling full-width post stream.
- Local discovery and product preview remain below the social stream. Product previews are explicitly illustrative; the Marketplace CTA links to the existing Marketplace route.
- Location detection, location-aware catalogue filtering, people suggestions, Stories, Live, Blog, and nearby inventory are not claimed as connected until their PLUITS services/data contracts exist.
- The page uses existing shared shell and icon registry; no global token, route, authentication, backend, database, or merchant-operation changes were made.
- Validation: architecture checks and Vite production build passed on commit cb1d6dd1402841a24b50420163af929f6e95f6aa. Pages deploy was blocked by duplicate/missing github-pages artifact metadata during a workflow rerun; a fresh push is required for a clean artifact/deploy run. Android UAT remains pending.


## Responsive UI and demo-content QA — 23 November 2026
- Social Home responsive rules explicitly cover narrow phones (<=359px), mobile (<=767px), tablet (768–1023px), and desktop (>=1024px); carousels keep horizontal scrolling and inset first-card gutters while normal content remains inside the viewport.
- Feed and Reels have image-backed demo posts whenever the API is unavailable or returns no public posts. Live, Blog, Stories, nearby discovery, and local product cards also use illustrative photography. Product cards include sample prices and discounts to exercise the card hierarchy.
- Every illustrative post/product/category/live element is marked DEMO or otherwise labelled as a preview. These samples are not real user content, inventory, prices, transactions, or engagement metrics.
- Regression coverage: `tests/features/home-responsive-visuals.test.js` checks responsive breakpoint contracts, horizontal rail behavior, complete demo fallbacks, and people-distance options.
- Automated architecture checks and production build pass on commit 99c63b65babaee52cb2b8c34a3e7af7531dffdf2. Browser-based visual checks at 320, 360, 390, 430, 768, 1024, and 1440 CSS pixels and Android device acceptance are not available through the current repository toolchain; do not treat CSS contract tests as proof of pixel-perfect rendering.


## Unified User Home search and local-first discovery — 23 November 2026
- Replaced the decorative welcome/hero panel with one compact service-search shell beneath the full-width quick-service strip. The search shell has a single immediate/scheduled mode and service-specific fields for passenger transport, motorcycle, courier, food delivery, flight tickets, attractions, car rental, and accommodation.
- Immediate transport/motorcycle/courier/food requests expose origin/destination or recipient address and a direct search action. Scheduled/ticketing/accommodation/rental contexts expose relevant date, return-date, and guest/passenger fields. Courier remains a separate service from passenger transport.
- Search submits the selected service, mode, and entered fields as URL query parameters to the existing Discover route. This is a frontend handoff only; provider availability, geolocation, booking, inventory, and transactions are not implemented by this UI change.
- The initial marketplace/discovery context is Denpasar, Bali as a visual default, not a verified device location or live geolocation. Users can use the existing Discover route to change exploration scope.
- Home sequence below search: nearby local places carousel → people suggestions → Circle Stories → non-sticky Feed/Reels/Live/Blog tabs and full-width social stream → local product carousel → all eight Fluid Partner parent categories → calendar/activity block → about/footer.
- Local discovery cards and product cards are visual catalogue content for layout evaluation; no claim of real-time business inventory, merchant verification, prices, or distance-based ranking is made.
- No backend, database, authentication, shared design tokens, global header/footer, or service-module workflows were changed.

## PLUITS Social Home visual refinement — 23 November 2026
- Search uses the service quick-navigation strip directly beneath the navbar as the single service selector; duplicate service chips inside the search panel are removed.
- Feature-local colors use the PLUITS brand token (logo teal), white, soft grey, and navy. No generic blue action palette is introduced.
- Mobile Beranda and Jelajah inherit the same 10px page gutter from `--pl-page-gutter` through the shared `.pl-page-shell` frame. The main content does not add a second local gutter. Horizontal carousels start at the shared content edge and extend through the trailing gutter to the physical right edge so the next card can remain partially visible. Feed/Reels/Live/Blog media retain their intentional full-bleed presentation.
- Feed post media remains full viewport width on mobile and uses a consistent 4:5 display frame with cover cropping. CSS cropping affects presentation only; it does not rewrite or downsample uploaded source files. Original media storage/processing remains the responsibility of the upload pipeline.
- Browser-based visual acceptance is still required on Android; build checks do not establish pixel-perfect device rendering.


## Beranda pengguna — penyelarasan geometri 24 November 2026
- Semua teks, heading, dan konten standar pada mobile memakai gutter kiri/kanan 10px.
- Semua carousel dimulai pada inset 10px di kiri dan area scroll melewati gutter kanan sampai tepi viewport; lebar card tidak dipaksa mengecil agar seluruh card muat.
- Card pada Beranda memakai token radius bersama `--pl-radius-card: 10px`. Avatar, story ring, dan elemen pill mempertahankan bentuk khususnya.
- Feed/Reels/Live/Blog tetap menggunakan media full-bleed; teks dan metadata tetap memiliki inset 10px.
- Aturan hanya berlaku pada Social Home mobile (<=767px); layout tablet dan desktop tidak diubah.
- Pengujian regresi memeriksa gutter, bleed carousel, radius card, dan kontrak full-bleed feed.

## Social Home carousel and content geometry — canonical contract

The shared page frame in `src/design-system/page-shell.css` owns the page background (`.pl-page-shell--surface`), standard content width (`.pl-page-shell--standard-content`), and horizontal page gutter (`--pl-page-gutter`). Social Home and Discover consume that same frame; neither feature may add a second main-content gutter or redefine its background. `home-page.css`, marker `SOCIAL-HOME-GEOMETRY-004`, owns only Social Home's carousel/card composition. Each horizontal rail begins at the shared content edge and its scrollport extends through the trailing gutter to the viewport edge. The track retains its own card widths, scroll snapping and final-card reachability; a partial next card is intentional. Feed/Reels/Live/Blog remain full-width content surfaces, while their headings and text metadata retain the 10px inset.

### Reusable carousel inventory

The component IDs, selectors, viewport card sizing, gaps and content sources are registered in `HOME-CAROUSEL-REGISTRY.md`. Keep card data in the existing feature-owned data source and render through the registered component; do not create page-specific duplicate card markup or invent replacement datasets. Changes to geometry must update the registry and responsive regression tests in the same change.

### Validation boundary

Automated tests and production deployment verify source contracts and build output. They do not replace Android visual acceptance at 320/360/390/430px and tablet/desktop checks.
