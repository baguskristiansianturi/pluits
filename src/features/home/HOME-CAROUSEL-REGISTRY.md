# Social Home carousel registry

Status: canonical inventory for Social Home mobile rails. Geometry owner: `src/features/home/home-page.css` / `SOCIAL-HOME-GEOMETRY-004`. Shared gutter token: `--pl-page-gutter` (10px mobile).

| Component ID | Selector | Card width on mobile | Gap | Content source |
|---|---|---:|---:|---|
| HOME-CAROUSEL-TOP10-001 | `.global-top-ten-rail` | 90vw mobile | 9px | `topTenCategories` fixtures in `home-page.js`; 2.6s autoplay, forward loop |
| HOME-CAROUSEL-STORIES-001 | `.global-story-rail` | 62px item | 12px | `storyRail()` in `home-page.js` |
| HOME-CAROUSEL-PEOPLE-001 | `.global-people-rail` | 37vw, min 126px, max 170px | 9px | `discovery` people collection in `mountHomePage()` |
| HOME-CAROUSEL-LOCAL-001 | `.global-local-rail` | 70vw mobile | 9px | nearby visual fixtures in `mountHomePage()`; image, rating overlay and review excerpt |
| HOME-CAROUSEL-PRODUCT-001 | `.global-product-demo-rail` | 142px | 9px | product preview collection in `home-page.js` |
| HOME-CAROUSEL-FEATURE-001 | `.global-feature-rail` | 138px | 9px | feature category collection in `home-page.js` |
| HOME-SEARCH-ENTRY-001 | `.global-home-search-entry` | full content width | n/a | `quickSearchSheet()` overlay and category links |

## Shared behavior

- Mobile breakpoint: up to 767 CSS px; the same 10px content gutter applies from 320px through 767px.
- Leading edge: first card begins exactly at the content gutter.
- Trailing edge: the scrollport reaches the physical viewport edge; keep 10px track end padding so the final card can be fully scrolled into view.
- Overflow: horizontal auto-scroll, horizontal overscroll containment, touch panning, hidden scrollbar, mandatory start snapping.
- Card widths are not compressed to fit the visible viewport; a partial next card is an intentional affordance.
- Desktop/tablet geometry is owned by existing desktop/tablet rules and is not changed by this mobile contract.

## Data reuse and change control

The source paths above are the current owners of the sample collections. Treat those collections as the canonical fixtures for this UI, not as production inventory or real users. Future data-model extraction must move each collection once into a shared typed registry and update all consumers to import it; do not duplicate arrays per page. Any new carousel requires a new stable component ID, source owner, responsive dimensions, and a regression test before use.

## Top 10 autoplay and local discovery behavior
- Top 10 category rails use a 90vw mobile card width so the next card remains visible as a swipe cue.
- Each rail is a separate category list. The initial visual prototype demonstrates Wisata, Restoran, Seafood, and Kuliner Lokal; it does not assert real ranking order or actual review data.
- Autoplay advances approximately every 2.6 seconds. User interaction pauses it temporarily. The final card transitions forward to the first card without a visible reverse sweep. Respect `prefers-reduced-motion`.
- Around You uses approximately 70vw mobile cards. Each card contains a photo, rating/review overlay, place name, category/location and a short review excerpt. Current values are fixtures only.
