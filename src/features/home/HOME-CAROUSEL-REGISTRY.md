# Social Home carousel registry

Status: canonical inventory for Social Home mobile rails. Geometry owner: `src/features/home/home-page.css` / `SOCIAL-HOME-GEOMETRY-004`. Shared gutter token: `--pl-page-gutter` (10px mobile).

| Component ID | Selector | Card width on mobile | Gap | Content source |
|---|---|---:|---:|---|
| HOME-CAROUSEL-DEMO-001 | `.global-demo-rail` | 72vw | 9px | `demoCards.global` / `demoCards.nearby` in `home-page.js` |
| HOME-CAROUSEL-STORIES-001 | `.global-story-rail` | 62px item | 12px | `storyRail()` in `home-page.js` |
| HOME-CAROUSEL-PEOPLE-001 | `.global-people-rail` | 37vw, min 126px, max 170px | 9px | `discovery` people collection in `mountHomePage()` |
| HOME-CAROUSEL-LOCAL-001 | `.global-local-rail` | 42vw, bounded by existing card clamp | 9px | nearby collection in `mountHomePage()` |
| HOME-CAROUSEL-PRODUCT-001 | `.global-product-demo-rail` | 142px | 9px | product preview collection in `home-page.js` |
| HOME-CAROUSEL-FEATURE-001 | `.global-feature-rail` | 138px | 9px | feature category collection in `home-page.js` |
| HOME-CAROUSEL-SERVICE-001 | `.global-service-rail` | existing shortcut card width | 8px | service shortcut collection in `home-page.js` |

## Shared behavior

- Mobile breakpoint: up to 767 CSS px; the same 10px content gutter applies from 320px through 767px.
- Leading edge: first card begins exactly at the content gutter.
- Trailing edge: the scrollport reaches the physical viewport edge; keep 10px track end padding so the final card can be fully scrolled into view.
- Overflow: horizontal auto-scroll, horizontal overscroll containment, touch panning, hidden scrollbar, mandatory start snapping.
- Card widths are not compressed to fit the visible viewport; a partial next card is an intentional affordance.
- Desktop/tablet geometry is owned by existing desktop/tablet rules and is not changed by this mobile contract.

## Data reuse and change control

The source paths above are the current owners of the sample collections. Treat those collections as the canonical fixtures for this UI, not as production inventory or real users. Future data-model extraction must move each collection once into a shared typed registry and update all consumers to import it; do not duplicate arrays per page. Any new carousel requires a new stable component ID, source owner, responsive dimensions, and a regression test before use.
