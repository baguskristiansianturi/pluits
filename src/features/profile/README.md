# Profile

**Status:** Partially implemented; Profile interactions are being extracted from the legacy Account controller in bounded, behavior-preserving modules.

**Runtime owners:** `src/pages/account/` orchestrates the signed-in account route and supplies current session/data dependencies. `src/features/profile/` owns extracted Profile presentation and interaction modules.

## Extracted modules

- `profile-hero.css` — Profile hero presentation.
- `image-framing.js` and `image-framing.css` — image-frame model, normalization and presentation helpers.
- `image-frame-controls.js` — frame input and preview synchronization.
- `image-upload.js` — avatar/cover file validation, Storage upload and profile-row update; Supabase client and page callbacks are injected by Account.
- `profile-tabs.js` — Posts, Reels, Trips and Blog tab interaction; Blog loading is injected and stale responses cannot overwrite a subsequently selected tab.
- `profile-editor.js` — personal username/display-name validation, optimistic profile save/rollback, image-frame persistence and SEO refresh.
- `profile-blog-tab.js` — public Blog route lookup, public published-post query, signed cover URLs and Profile Blog card rendering.

## Ownership contract

- Account remains responsible for route mounting, current user/profile state, Supabase session context and page refresh orchestration.
- Profile owns the extracted tab, image-frame and image-upload interactions.
- Auth/session and data permissions remain governed by existing services and backend policies.
- Do not move additional profile behavior until all consumers and data dependencies are explicit and regression tests cover the owning route.
- These extractions do not claim that the entire Account controller or Profile page is fully modularized.
