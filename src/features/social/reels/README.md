# Reels

Owner: Social Media / Reels. The current runtime owns short-video eligibility, visibility-based autoplay, pause-on-exit, media rendering, and the dedicated Reels viewer.

## Eligibility contract

A Reel candidate must be a video post with explicit vertical orientation metadata and a duration greater than zero and no more than 60 seconds. After media metadata loads, the runtime verifies that the actual media dimensions are portrait (videoHeight > videoWidth). Landscape, square, missing-dimension, and longer videos do not autoplay and do not remain in the Reels viewer. They remain ordinary video content in the mixed Social feed, with their poster and native playback controls.

The source poster is the idle/loading fallback; a missing or failed video source must not turn the viewer into a black interactive card. Autoplay is muted, starts only after at least 65% visibility, pauses when the item leaves that threshold, and is disabled for reduced-motion preferences.

## Viewer interface

The viewer uses the shared PLUITS page-header renderer and canonical brand asset, with the wordmark hidden for the requested symbol-only compact presentation. Header actions are Search, Notifications, and Menu. The header surface uses a soft top-to-bottom fade rather than full transparency. Notification content is intentionally a neutral placeholder until notification categories and rules are approved. The menu drawer is a first visual structure and can be revised after its information architecture is decided.

The right-side action rail provides profile, like, comment, share, and more actions. Account-dependent actions route guests to login; sharing uses the native share sheet when supported and falls back to copying the Reel URL. No engagement count or backend persistence is fabricated.

## Ownership and current status

Feed delegates video classification and media markup to this module. Feed continues to own the surrounding post card and cross-format aggregation. Reels authoring, upload/transcoding, publication lifecycle, ranking, server-backed viewer state, notification delivery, and persistence are not active yet. The current viewer consumes the Social feed's existing short-video content references. Manual browser/device UAT is required to verify the actual media dimensions and visual behavior.
