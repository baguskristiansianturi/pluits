# LAY-GLOBAL-SOCIAL-DISCOVERY-001 — Global Social Discovery and Content Stream

Status: **PROVISIONAL / IMPLEMENTATION PROTOTYPE**
Owner: Product Design + Platform UI Foundation
Consumers: `PAGE-GLOBAL-HOME`, `PAGE-CIRCLE-HOME`, `PAGE-DISCOVER`

## Purpose
Social-first discovery composition with standard-width section headings, viewport-wide horizontal rails, sticky category navigation, content blocks, and persistent mobile navigation.

## Structure
Shared page shell and global header; standard-width section headings and descriptions; full-bleed carousel tracks; sticky content tabs with header-to-tabs ownership handoff; sequential Feed/Reels/Live/Blog sections where blocks and rails may be interleaved; standard-width products/features sections; shared footer; five-destination mobile navigation.

## Full-bleed geometry
Use viewport breakout `width:100vw; margin-inline:calc(50% - 50vw)`. Do not widen the page shell or heading. Tracks use horizontal overflow, touch panning, and `scroll-snap-type:x mandatory`. Prevent document horizontal overflow.

## Provisional measurements (not global tokens)
Mobile card basis 74vw; desktop/tablet card basis `clamp(220px, 26vw, 290px)`; rail gap 9px mobile / 12px default; Story circle 54px mobile / 58px default; tab minimum height 40px; bottom navigation minimum height 62px mobile / 66px default plus safe-area inset. Verify on real viewports before approval.

## Sticky handoff
Header stays sticky until tabs reach its sticky boundary. Release header positioning and pin tabs at viewport top. Restore header sticky ownership when scrolling upward above the boundary. Active tab follows visible content section and can be changed by tapping.

## Dependencies and validation
Existing shared tokens, shared shell, local icon registry, Global Home/Circle/Jelajah routes. No new package, font, icon pack, or global token. Test desktop/tablet/mobile, touch and mouse rail scrolling, first/last items, no page overflow, sticky handoff both directions, keyboard focus, reduced motion, bottom safe area, and empty/data states.
