# Reels

Owner: Social Media / Reels. The current runtime owns short-video classification, visibility-based autoplay, pause-on-exit, and media rendering in `reel-media.js`. The dedicated `/reels/` viewer is mounted by `reels-page.js` and owns its own page stylesheet.

Feed delegates video classification and media markup to this module. Feed continues to own the surrounding post card and cross-format aggregation. Reels authoring, upload/transcoding, publication lifecycle, ranking, server-backed viewer state, and persistence are not active yet. The current viewer consumes the Social feed's existing short-video content references.
