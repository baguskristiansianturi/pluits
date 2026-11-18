# LAY-GLOBAL-SOCIAL-DISCOVERY-001 — Global Social Discovery and Content Stream

Status: **PROVISIONAL / IMPLEMENTATION PROTOTYPE**
Owner: Product Design + Platform UI Foundation
Consumers: `PAGE-GLOBAL-HOME`, `PAGE-CIRCLE-HOME`, `PAGE-DISCOVER`

## Purpose
Social-first discovery composition with a standard-width content container, full-viewport header and category tabs, viewport-wide horizontal rails, sticky navigation ownership handoff, and persistent mobile navigation.

## Structure
Shared page shell; full-bleed global header; standard-width section headings/descriptions; full-bleed demo/data carousels; full-bleed sticky content tabs; sequential Feed/Reels/Live/Blog sections; standard-width feature grid; full-bleed product rail; shared footer; five-destination mobile navigation.

## Full-bleed geometry
- Header and content-tab surfaces break out of the page-shell gutters using `width:calc(100% + 2 * var(--pl-page-gutter))` and symmetric negative margins. Their inner content keeps `var(--pl-page-gutter)` padding.
- Carousel tracks use viewport breakout `width:100vw; margin-inline:calc(50% - 50vw)`. Do not widen the page shell or section headings.
- Rails use horizontal overflow, touch panning, and `scroll-snap-type:x mandatory`. The final item must be reachable; rail overflow must not create document horizontal scrolling.
- Full-bleed applies to Top Global, nearby, people, Stories, Produk Lokal, and future rails inside content categories.

## Icon header
- Favorit is icon-only beside the brand.
- Right actions are icon-only: account, search, cart, notifications. Accessible labels and title attributes carry the action name.
- Use the shared `renderIcon()` registry; do not substitute text labels or Unicode glyphs for header icons.
- Current registry additions for this pattern: heart, bell, cart, search, user, image, play, mapPin, sparkles. They remain provisional local SVG assets.

## Content presentation and data
- Feed source: `public.user_posts`, filtered to public and published rows, newest first; author display data comes from `public.user_profiles`.
- Reels uses the same authorized public stream and filters `content_kind = 'reel'`.
- User media and avatar paths are resolved with signed URLs from the private `pluits-user-media` bucket. Existing RLS and Storage policies remain authoritative.
- Top Global, nearby, people, Stories, Live, Blog, and product rails currently use isolated visual demo fixtures. They exist solely for visual/interaction QA, must be distinguishable from live data in code and documentation, and must never be inserted as production records.
- Data-driven cards must retain loading, error, and empty states. Do not invent captions, authors, engagement counts, or publication metadata for real posts.

## Provisional measurements (not global tokens)
Mobile discovery card basis 74vw; desktop/tablet basis `clamp(220px, 26vw, 290px)`; rail gap 9px mobile / 12px default; Story diameter 54px mobile / 58px default; tab controls 42px minimum height; header icon hit area 34px mobile / 38px default; bottom navigation minimum height 62px mobile / 66px default plus safe-area inset. Verify on real viewports before approval.

## Sticky handoff
Header stays sticky until tabs reach its sticky boundary. Release header positioning and pin tabs at viewport top. Restore header sticky ownership when scrolling upward above the boundary. Active tab follows visible content section and can be changed by tapping.

## Dependencies and validation
Existing shared tokens, shared shell, local icon registry, Supabase browser client, Global Home/Circle/Jelajah routes. No new package, font, icon pack, global token, or schema change. Test desktop/tablet/mobile, guest/authenticated public feed, signed media loading, card fallbacks, touch and mouse rail scrolling, first/last items, no page overflow, sticky handoff both directions, keyboard focus, reduced motion, bottom safe area, and loading/error/empty/data states.
