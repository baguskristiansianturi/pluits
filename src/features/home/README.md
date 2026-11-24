# Public Home Experience

Owner: `features/home`.

## Route ownership
- Public marketing homepage: `/home` (public root), mounted by `business-home-page.js` and styled by `business-home.css`.
- Social Home is not owned by this folder. Its runtime, Feed cards, CSS, product specification and carousel registry are owned by `src/features/social/`.

## Public homepage purpose
Introduce PLUITS as a connected digital ecosystem through benefit-led marketing copy and service-relevant visuals. The page guides visitors to register, sign in, or explore.

## Runtime ownership
- `business-home-page.js`: public landing-page composition.
- `business-home.css`: public landing-page visual treatment.
- `home-visuals.js`: approved public-homepage editorial imagery.
- `src/app/create-app.js`: maps the public `home` route to this feature and `social` to the independent Social Media domain.

## Shared resources and boundaries
- Use approved brand assets, shared page-shell, icons and tokens from `src/design-system/`.
- Do not import Social Media CSS or runtime modules into this feature.
- Do not place Social Home, Feed, Blog, Reels, Stories or Live implementation in this folder.
- Do not alter global tokens, auth, backend, database, or sibling feature modules for public-homepage presentation.

## Content truthfulness
- Do not fabricate people, posts, activity, engagement, business listings, products, reviews, transaction counts, or provider verification.
- Do not claim planned merchant operations or vertical integrations are already available.
- Download panels and payment-channel families must retain their documented Coming Soon / not-yet-integrated disclosures.

## Validation
Run `npm test` and `npm run build`. Verify the public root and `/home` experience separately from Social Home.
