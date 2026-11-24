# Social Home discovery and carousel registry

Status: canonical inventory for Social Home visual components. Geometry consumes the shared PLUITS page gutter and responsive foundation.

| Component ID | Selector | Mobile behavior | Content / ownership |
|---|---|---|---|
| HOME-DISCOVERY-INTEREST-001 | `.global-interest-grid` / `.global-interest-card` | Two-column visual interest grid | Interest and experience prompts; never business listings or ranked places |
| HOME-DISCOVERY-NEARBY-001 | `.global-local-rail` / `.global-local-card--listing` | Horizontal swipe rail, approximately 70vw cards | Named place/business cards with specific type, locality, km distance, review context, and concise description |
| HOME-CAROUSEL-STORIES-001 | `.global-story-rail` | Horizontal swipe rail | `storyRail()` in `home-page.js` |
| HOME-CAROUSEL-PEOPLE-001 | `.global-people-rail` | Horizontal swipe rail | People discovery collection in `mountHomePage()` |
| HOME-CAROUSEL-PRODUCT-001 | `.global-product-demo-rail` | Horizontal swipe rail | Product preview collection in `home-page.js` |
| HOME-CAROUSEL-FEATURE-001 | `.global-feature-rail` | Horizontal swipe rail | Ecosystem/service entry points |
| HOME-SEARCH-ENTRY-001 | `.global-home-search-entry` | Full content width | `quickSearchSheet()` overlay and category links |

## Discovery model

### Recommendations for You — interest-led
- Shows interests/experiences such as beaches, seafood, coffee, culture, family activities and wellness.
- These cards are not places, providers, menus, rankings or popularity charts.
- Selecting an interest hands off its context to Jelajah. Seafood carries the future Fluid Food destination context; Fluid Food is not yet an implemented runtime route/module.
- Personalization must use declared preferences and permitted behavior. Do not claim a user's interests are known when no preference data exists.
- Geographic context still applies: recommend experiences relevant to the user's current/selected region.

### Around You — GeoDirectory-led
- Includes all eligible GeoDirectory categories: food, pharmacies, clinics, dental care, shops, attractions, activities, services and more.
- Starts at a 5 km radius. Expand progressively (for example, 5–10 km) when eligible results are insufficient; never fill gaps with fabricated listings.
- Home is a preview. "Lihat semua" opens Jelajah, where users can change radius continuously and explore other areas.
- Cards represent individual named places/providers, never generic category tiles (for example, show Atlas Beach Club — Beach Club, not a Coffee & Café or Pharmacy category card).\n- Card hierarchy: place image; distance in km; place name; specific venue type and locality; review/reputation context; one short description.\n- Rating and review totals may appear only when sourced from real, eligible review records. Never invent scores, counts, review quotes, or verification badges.\n- Descriptions must be concise and factual, sourced from the canonical place/provider profile.
- If location permission or GeoDirectory data is unavailable, explain the limitation and avoid implying GPS or live proximity.

## Fair exposure

Organic discovery balances proximity, relevance, quality, availability, trust and exposure opportunity. Popularity, follower counts and posting frequency must not monopolize ranking. Eligible/new partners should receive measured exploration opportunities without lowering safety, quality or relevance requirements. Paid placement, if ever introduced, must be clearly labelled and kept separate from organic results.

## Responsive behavior

- Mobile breakpoint follows the shared design-system contract; no new breakpoint/token is introduced.
- Interest cards use a compact two-column grid on mobile and three columns on wider screens.
- Nearby cards remain horizontally scrollable with the shared page gutter and partial next-card affordance.
- No autoplay is used for discovery cards; touch, pointer, keyboard and reduced-motion behavior remain native and predictable.

## Data integrity

Current Home cards are static layout fixtures for named venues and are not live GeoDirectory results. Their distances are illustrative; the review/reputation line demonstrates the intended information slot and does not assert a live rating or review count. Production values must come from GeoDirectory place records, location calculation, and the verified review service. Never render illustrative distance or trust values as production data.
