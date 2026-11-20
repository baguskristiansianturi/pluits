# Accommodation Discovery Homepage — Product Design 001

- **ID:** PD-ACCOM-001
- **Status:** IN-DESIGN — exploratory frontend validation; not final approval
- **Owner:** Marketplace Discovery / Accommodation
- **Runtime target:** `src/features/accommodation/`
- **Last updated:** 2026-11-21

## Purpose

Provide one discoverable entry point for every accommodation class: hotels, resorts, villas, guesthouses, homestays, inns, serviced apartments, and short-stay properties. Property class changes the available information and presentation details, not the application or discovery system.

The first frontend increment validates the homepage exploration experience. It is not a booking engine, provider management workspace, or final visual specification.

## User needs

- Find accommodation quickly using destination, stay dates, guest count, accommodation type, and budget.
- Discover relevant places around the current or selected area without being displaced by unrelated paid promotion.
- Explore different property classes in one consistent experience.
- Compare basic property information before opening a property profile.
- Use the page comfortably on mobile and desktop.

## Page hierarchy

1. Shared PLUITS header / brand shell.
2. Accommodation context navigation.
3. Quick Search and filter controls at the top of the page.
4. Local / nearby accommodation discovery, based on the selected or available location context.
5. Accommodation type exploration.
6. Relevant recommendations and curated discovery collections.
7. Additional discovery content as the inventory grows.
8. Shared public footer.

The homepage must not reserve a permanently dominant top slot for paid Push. Push is a future cross-ecosystem contextual promotion capability; any placement must follow user browsing context and must not silently replace local/organic discovery. The initial frontend validation does not implement Push delivery or ad ranking.

## Quick Search contract

Initial UI controls:
- Destination / area text input.
- Check-in and check-out dates.
- Guest count.
- Accommodation type.
- Budget range.
- Search action and clear/reset behavior.

The first increment uses frontend-only sample fixtures and deterministic filtering. It must not imply live availability, confirmed prices, real reviews, or verified provider status.

## Discovery behavior

- The default local discovery section is visibly distinguished from broader recommendations.
- A manually selected destination takes precedence over the default local context.
- Local results remain discoverable even when future paid promotion exists.
- Property cards show the property name, property type, area, descriptive highlights, and indicative demo price where relevant.
- Do not fabricate ratings, reviews, badges, availability, or trust claims.

## Responsive behavior

Compose within the existing shared PLUITS page shell and existing runtime token system. Mobile is a first-class layout: search controls stack cleanly, horizontal rails remain within the viewport, cards remain legible, and actions have practical touch targets. Do not create new global breakpoints or tokens in this page.

## Interaction states for the first increment

- Empty destination / default local discovery.
- Destination entered and submitted.
- Date and guest values selected.
- Accommodation type and budget filters changed.
- Matching results and no-results state.
- Save/favorite toggle on property cards.
- Clear filters / restore discovery state.

## Explicit exclusions

- No live geolocation permission prompt or exact location access.
- No backend search, inventory, rates, booking, payment, or provider dashboard.
- No Push campaigns, ad tracking, bidding, credits, frequency caps, or Priority entitlements.
- No final property-detail information architecture.
- No fake production records or fabricated customer reviews.

## Validation criteria

- Search and filters produce predictable sample results.
- Local discovery remains a separate, visible section.
- All accommodation classes use one shared discovery system.
- No fixed promotional block dominates the top of the page.
- No horizontal overflow at mobile, tablet, and desktop widths.
- Existing public homepage, Marketplace, Hangout & Leisure, auth, and social routes remain unaffected.
- Product owner reviews the live preview before the page is considered accepted.
