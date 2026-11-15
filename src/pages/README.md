# PLUITS Page Modules

This directory is the single home for every route-level page in PLUITS. Do not create parallel page roots elsewhere. A route page owns composition and route-specific presentation; reusable domain behavior belongs in `src/features/`, shared UI in `src/components/`, and data access in `src/services/`.

## Page module contract

Each page family lives in its own directory (or a clearly named existing directory) and follows these boundaries:

- `index.js`: page composition/render entry point and exported bind/mount functions.
- `*.css`: styles scoped to that page root; never change unrelated page roots.
- `components/` or feature modules: page-specific sections when they have independent behavior.
- `README.md`: purpose, route ownership, dependencies, and current decomposition status for complex page families.

Do not mechanically create empty files or move modules just to satisfy a folder pattern. Preserve public exports and import paths during refactors. Shared behavior must be extracted only when at least two pages use it or it is a distinct domain feature.

## Current route-page inventory

| Page family | Current owner | Route(s) / aliases |
|---|---|---|
| Public home | `home/index.js` + `features/public-home/` | `/`, `/home`, `/feed`, `/beranda`, `/guest` |
| Account, profile, social feed, create, auth, settings | `account/index.js` + `features/profile/`, `features/posts/`, `features/auth/` | `/account/*`, `/@username`, `/profile/*`, `/create`, `/circle`, `/login`, `/register` |
| Inbox and message settings | `messages/index.js`, `messages/settings.js`, `features/inbox/` | `/inbox`, `/inbox/settings`, `/message`, `/messages` |
| Marketplace, store, product, cart, checkout, orders | `marketplace/index.js` + `features/store/`, `features/cart/`, `features/orders/` | `/marketplace`, `/shop/*`, `/market-product/*`, `/market-cart`, `/market-checkout`, `/market-orders`, `/market-order/*` |
| Seller center | `seller/index.js` + `features/seller/` | `/seller` |
| Places directory and place detail/claim | `directory/index.js` + `features/directory/` | `/places`, `/place/*` |
| Trip and itinerary | `trip/index.js` + `features/trips/` | `/trip`, `/trip/itinerary/*` |
| Discovery search | `search/discovery.js` | `/search` |
| Blog and public articles | `blog/index.js`, `blog-studio/index.js` | `/blog`, `/guides`, `/article/*`, `/@username/blog/*`, `/account/blog`, `/blog-studio` |
| Help and legal | `help/index.js` | `/help`, `/faq`, `/terms`, `/privacy`, `/guidelines` |
| Public information pages | `misc/index.js` | `/promo`, `/about`, `/contact`, `/reviews`, `/recent` |
| Admin moderation | `admin/moderation.js` | `/admin/moderation` |

The route aliases above resolve to canonical pages; they are not duplicate page implementations. The authoritative runtime route handling remains in `src/app/router.js`, while page composition metadata is in `page-layout-registry.js`.

## Dependency direction

`pages → features → components/design-system`

`pages/features → services → lib/platform`

- Pages may compose features and call their public exports.
- Features own domain behavior and scoped UI, not route selection.
- Components are reusable presentation and do not fetch domain data.
- Services own data access and must not render HTML or query page DOM.
- Keep page CSS scoped to its page root. Global styles belong only in `src/styles/`.

## Safe refactor checklist

1. Identify the exact route and current page entry point before editing.
2. Trace imports, CSS, event bindings, and route aliases.
3. Keep the canonical URL and existing exported API stable unless a route migration is explicitly required.
4. Extract one cohesive responsibility at a time; do not rewrite unrelated pages.
5. Add or update tests for the page entry point, navigation target, and critical interactions.
6. Run `npm test` and `npm run build` before merging/deploying.
