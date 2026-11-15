# Jelajah / Explore Grid

This feature owns the visual media-tile renderer and the lifecycle for discovery-grid previews.

## Public entry point

Import only from `src/features/discovery/explore-grid/index.js`:

- `renderDiscoveryMediaTile(media, post, index)`: renders a photo, video, or text fallback tile.
- `mountDiscoveryMediaPreviews(root)`: attaches lazy media loading, image fallback handling, adaptive video autoplay, and returns a cleanup function.

## Boundaries

- `src/pages/search/discovery.js` remains the route/data controller: query, filtering, ranking, and post navigation.
- This feature owns only grid media presentation and preview lifecycle.
- `src/pages/search/discovery.css` owns the page grid geometry; feature-scoped media states use the `.ds-*` namespace.
- No imports from Circle, Stories, Reels, account feed, or other feature internals.
- No database queries, schema changes, or storage writes belong here.

## Media performance contract

- Photos in the first three tiles receive high fetch priority; the first nine load eagerly to reduce initially empty visible rows. Remaining photos are lazy-loaded.
- Video metadata is requested only when a tile approaches the viewport.
- Visible videos are ranked by visibility and may autoplay concurrently up to a device-aware budget. Save-Data / low-memory / low-core devices use one active video; medium devices use two; capable desktop devices may use four.
- All video previews are muted, inline, and looped. Off-screen previews pause; hidden tabs and route changes clean up playback.
- A decoded frame is captured as a bounded-size poster when browser canvas permissions allow. If decoding or autoplay fails, the tile retains a neutral non-white fallback surface rather than a blank white rectangle.
- Browser/device policies may still prevent autoplay. The grid must remain usable with static previews.

## Change safety

Keep future Jelajah-only visual and playback changes inside this folder or the Jelajah page stylesheet. Do not modify shared Circle/Story/Reels styles to tune this feature.
