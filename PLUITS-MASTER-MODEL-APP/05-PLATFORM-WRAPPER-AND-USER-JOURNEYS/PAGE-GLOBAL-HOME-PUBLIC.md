# Public PLUITS Homepage — Marketing Landing Page

Status: **IMPLEMENTATION PROTOTYPE / PRODUCT OWNER DIRECTION APPROVED**
Route: `#/home`
Runtime owner: `src/features/home/business-home-page.js`, `business-home.css`.

## Purpose
The public homepage is PLUITS' customer-facing marketing landing page. It must introduce the platform clearly, communicate practical benefits, and guide visitors toward registration, sign-in, or discovery. It is not a technical product manual, personal feed, user profile, or authenticated Dashboard.

## Audience and message
The page addresses two audiences:
1. Individuals who want to connect with people, share stories, discover communities, and find useful places or activities.
2. Business owners and service providers who want their business to be easier to discover, present their offer, and build customer relationships.

Use benefit-led, approachable marketing copy. Avoid implementation jargon, architecture descriptions, database terms, module ownership language, and claims that planned functionality is already live.

## Page composition
1. Shared PLUITS header with brand, anchors to audience sections, sign-in and registration actions; authenticated visitors see an account/dashboard action.
2. Hero: concise platform promise, primary registration/dashboard CTA, secondary ecosystem CTA, and an original CSS composition showing the four connected spaces.
3. Brand promise strip: connect people, discovery, and opportunity.
4. For individuals: share stories, discover communities, explore places and interests.
5. For business owners: present a business, build customer relationships, and improve local discoverability.
6. Ecosystem discovery: food, local products, places/activities, and professional services. Copy describes the intended value without pretending that every vertical is fully operational.
7. Closing CTA for registration or Dashboard.
8. App availability panel immediately before the shared footer:
   - Android — Google Play — Coming Soon.
   - iOS — App Store — Coming Soon.
   - No fake download links or non-functional buttons.
9. Shared footer with canonical brand/legal/account links and approved footer credit.

## Four connected spaces
Show the ecosystem as a connected composition, not a stack of technical modules:
- Social — share stories and connect.
- Discover — explore people, places and interests.
- Marketplace — find products and local businesses.
- Services — discover professional and local services.

## Session behavior
Guests and authenticated users see the same page composition. Session state only changes the account action and primary CTA. Do not redirect the user away from the public homepage merely because a session exists. The logo always returns to `#/home`. Successful login continues to the existing authenticated destination; this page change does not alter auth flow.

## Boundaries and truthfulness
- Keep the existing Social experience at `#/social` separate and unchanged.
- Keep Dashboard at `#/dashboard` separate and unchanged.
- Do not change route definitions, authentication, Supabase, backend contracts, database schema, global tokens, shared shell, or shared footer renderer for page-local work.
- Do not fabricate people, posts, metrics, merchants, products, testimonials, reviews, transactions, or availability.
- App-store badges are informational and non-interactive until official listings exist.
- Do not claim the Android or iOS applications are released.

## Responsive and accessibility
Use the shared shell, brand renderer, page-footer renderer, icon registry, and design tokens. Keep the 50px navbar-to-content gap. Hero visual and content must adapt to tablet/mobile without horizontal page overflow. Maintain visible focus, accessible names, meaningful headings, and reduced-motion support.

## Acceptance checks
- `#/home` loads one marketing landing page for guest and authenticated sessions.
- Header, hero, audience, discovery, CTA, and footer links resolve to existing routes or in-page anchors.
- Android and iOS both display Coming Soon without linking to nonexistent store listings.
- `#/social` continues to render the existing social feed/discovery page.
- No changes to Dashboard, auth, routing contracts, Supabase, or unrelated feature styles.
- Run `npm test` and `npm run build`; record CI deployment and device UAT separately.


## Experience-led ecosystem entrypoints (homepage update)
- Homepage discovery is organized around the visitor's intent, not a flat list of product names.
- Each experience card is a direct, whole-card link to its owned route: Accommodation → `#/accommodation`; Restaurant & Café → `#/restaurant`; Hangout → `#/hangout-leisure`; Places → `#/discover`; Marketplace → `#/marketplace`.
- A compact quick-path navigation repeats these primary entry points for mobile scanning. Card copy and CTA must make the destination clear.
- Community stories link to the separate Social experience at `#/social`; public marketing homepage remains `#/home`.
- Images use the existing homepage visual registry. This increment does not add data services, provider claims, live listings, availability, or booking functionality.
- Visual composition: editorial hero → quick experience paths → intent-led discovery cards → community stories → business-owner invitation → account CTA and app availability information.
