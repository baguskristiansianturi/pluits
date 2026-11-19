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
- Use only registered local icons and existing brand assets. No new package, font, external image, remote asset, or runtime dependency.
- Current public landing-page illustrations are CSS compositions and registered icons; they are not presented as real user posts, merchants, products, metrics, or testimonials.

## Content truthfulness
- Do not fabricate people, posts, activity, engagement, business listings, products, reviews, transaction counts, or provider verification.
- Explain product value in customer-facing language, not architecture or technical feature labels.
- Keep Social, Discover, Marketplace, and Services as the four connected ecosystem spaces.
- Do not claim planned merchant operations or vertical integrations are already available.
- Android and iOS download panels must be clearly marked **Coming Soon** and must not link to unavailable app-store listings.

## Footer
The public homepage includes an Android Google Play and iOS App Store availability panel immediately before the shared footer. Both platforms show Coming Soon; the shared footer remains the canonical reusable footer.

## Responsive behavior
Use the shared page shell, container, gutters, tokens and breakpoint contracts. Keep all sections within the viewport on mobile; prevent body horizontal overflow. Preserve accessible navigation, keyboard focus, readable contrast, and reduced-motion behavior.

## Validation
Run `npm test` and `npm run build`. Verify `#/home` for guest and authenticated sessions, primary/header/footer links, mobile and desktop layout, no body horizontal overflow, and that `#/social` still mounts the existing Social experience unchanged. Browser/device visual UAT remains separate from automated build evidence.
