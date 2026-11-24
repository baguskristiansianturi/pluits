# Social Media Runtime

Social Media is an independently owned product domain inside PLUITS. Its pages, components, state, behavior and feature CSS live under this directory. Sibling domains may be opened only through documented user-initiated interactions or public integration contracts.

## Runtime ownership
- `home/`: Social Home composition, its page CSS, product specification and active carousel inventory.
- `feed/`: Feed post-card rendering, demo fixtures and social post interactions. Feed aggregates approved content; it does not own Blog/Reels/Stories/Live publishing lifecycles.
- `blog/`: standalone Blog route and Blog-owned page/CSS. Current articles are frontend preview fixtures only.
- `social-pages.js` / `social-pages.css`: current Discover, Messages, Profile and Settings surfaces. Their further page-level decomposition and CSS isolation remain tracked work.

## Platform contracts
Only approved shared primitives may be imported from `src/design-system/`: brand/page shell, icon registry, tokens, accessibility primitives and documented layout contracts. Do not import sibling feature CSS or private runtime modules. Keep feature selectors inside each page/module root; no sibling DOM, state, storage or lifecycle access.

## Validation and status
Run `npm test` and `npm run build`. Browser visual regression across mobile/tablet/desktop remains a separate release gate. See the canonical Social Media model and runtime audit under `PLUITS-MASTER-MODEL-APP/01-ECOSYSTEM-MODELS/01-SOCIAL-MEDIA/`.
