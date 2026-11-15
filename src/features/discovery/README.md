# Discovery feature

## Ownership
This feature owns reusable discovery presentation and interaction modules. Route-level data orchestration remains in the owning page controller.

## Active modules
- `top-ten-cards.js`: Top Ten trending data mapping and card rendering.
- `top-ten-slider.js`: mobile carousel autoplay, user interaction pause/resume, visibility handling and listener/timer cleanup.
- `people-recommendations.js`: people recommendation presentation and ranking helpers.
- `nearby-card.js`: nearby-place card presentation.
- `explore-grid/`: Jelajah media-grid rendering and adaptive preview lifecycle.

## Boundaries
- The Circle page owns the data and mount timing for its Top Ten section; this feature owns only the slider interaction.
- The slider must not query Supabase or mutate account/feed data.
- Rebinding must clean up the previous timer, animation frame, document visibility listener and DOM listeners.
- Keep mobile autoplay bounded to the existing 760px breakpoint; desktop layout and card content are unchanged.
- Do not treat demo cards as persisted users, posts or directory entities.

## Verification
Run `npm test` and `npm run build`. The Circle route and the Top Ten mobile interaction must be checked after changes to this module.
