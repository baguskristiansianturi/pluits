# Marketplace Homepage, Search & Discovery Rules

Status: **Proposed discovery policy; weights and commercial placement remain OPEN**.

## 1. Homepage purpose
One marketplace-wide storefront aggregates eligible products from approved physical stores. Each seller also has a distinct store profile/catalog. A product can be discovered through homepage shelves, categories, search, recommendations and its store catalog without creating duplicate product records.

## 2. Homepage sections
1. Marketplace header: search, delivery location, account, wishlist, cart.
2. Category navigation and all-category entry.
3. Campaign/banner placements.
4. Popular categories.
5. Trending products.
6. Best sellers.
7. Personalized recommendations.
8. Popular and nearby verified stores.
9. New arrivals.
10. Nearby available products.
11. Active offers.
12. Explore-more feed with pagination/infinite loading.
13. Help, policy and marketplace footer.

Shelves are configurable by country/market, locale and eligible inventory. Hide empty/low-confidence shelves rather than fabricate content.

## 3. Discovery eligibility gate
A product is eligible only if:
- Seller/store is approved and active.
- Product is published and category permitted.
- Price/currency is valid.
- At least one valid variant and fulfillment option exists.
- Stock/availability policy permits display.
- Product is not blocked, recalled or under moderation hold.
- Store location/fulfillment can serve the selected market where applicable.

Eligibility is checked again at product detail and checkout; homepage cache is never authority for price or stock.

## 4. Shelf definitions
- Trending: recent growth in valid views, searches, wishlists, cart additions and purchases; normalize by exposure and filter bot/owner activity.
- Best sellers: net units or orders over a stated window, with cancellation/refund treatment documented.
- Most viewed: deduplicated valid product views, not raw refresh count.
- Popular stores: combine verified status, fulfilled orders, service quality, ratings with minimum sample, response/dispatch reliability and policy health.
- New arrivals: publication time, with seller/product quality gate.
- Recommended: consent-aware interests, category affinity and prior interactions; guest fallback to broad/local relevance.
- Nearby: distance only when user provides/permits location, plus actual serviceability and stock.
- Offers: valid promotion window, clear reference price and seller/platform funding disclosure where relevant.

## 5. Anti-manipulation and fairness
- Deduplicate repeated views and filter bot traffic.
- Exclude owner/staff self-activity from customer popularity metrics.
- Detect abnormal review, order, refund and click patterns.
- Apply minimum data thresholds and confidence indicators.
- Paid placement, if introduced, must be labeled and separated from organic ranking.
- New/low-volume stores need fair discovery opportunities without falsely claiming popularity.
- Ranking changes and campaign overrides are auditable.

## 6. Search and filters
- Search product name, brand, model, category and approved public attributes.
- Search store name/location.
- Filters derive from category attribute schema (e.g. size/color for fashion; RAM/storage for electronics).
- Sort options can include relevance, newest, price, rating and sales where meaningful.
- Handle spelling variants, synonyms and localized terms.
- Search must not expose private seller documents, customer data or internal moderation notes.

## 7. Personalization and location privacy
- Guest mode uses general marketplace signals and voluntarily selected delivery region.
- Signed-in personalization respects consent and privacy settings.
- Precise location is optional; do not require it for basic browsing.
- Do not imply a product is nearby or deliverable until serviceability is checked.
- Country-specific catalog, currency and language must be explicit.

## 8. Customer-facing visual and content rules

### Homepage sequence
- The first discovery shelf after the hero is Food: image-led choices with a direct invitation to explore all Food.
- Follow Food with products available around the selected area.
- Follow nearby discovery with personal picks based on interests and interaction signals; do not describe internal ranking or algorithm mechanics to customers.
- Keep services in their own section, separate from nearby products.
- Place campaign offers between discovery shelves where they support the browsing journey; do not let promotions overwhelm product discovery.
- Continue with categories and the broader catalogue.

### Product catalogue cards
- Product cards are product-first. Do not show store name, seller address, or store distance on catalogue cards.
- Seller identity, public store profile, address, and fulfillment details belong on the provider profile or the appropriate product/checkout detail surface.
- The product image owns the entire image frame. No opaque white inset panel, inner mat, or nested white image background may cover the photo.
- Use a real image element with a defined frame and cover behavior; preserve the full card image surface and overlay only small purposeful labels/actions.
- Fashion and Beauty use taller editorial photography and restrained copy (Zalora-led visual direction).
- Electronics and general merchandise use practical, square image framing and concise product information (balanced Zalora/Shopee direction).
- Food cards prioritize appetizing food photography, clear product name, and price. Do not insert internal system terms or operational/algorithm language.

### Customer-facing language
- Write headings and actions as natural invitations based on what a customer wants to do.
- Food CTA should clearly invite exploration, e.g. “Jelajahi semua Food”.
- Recommendations should use customer language about relevant choices, not internal concepts such as ranking, signals, proximity weighting, or algorithms.
- Do not expose internal implementation, kitchen, ranking, or algorithm terminology in customer-facing copy.

### CSS ownership and isolation
- Marketplace homepage styles live in `src/features/marketplace/marketplace-home.css` and are scoped under `.mp-home`.
- The stylesheet is organized by owned sections: foundation/header, hero, Food, product shelves/cards, categories, offers/recommendations, services, directory/footer, modal, responsive rules.
- Change a rule in its owning section. Do not append override blocks or duplicate selectors at the end of the stylesheet.
- Keep Store and Restaurant & Café operational styles out of the Marketplace homepage stylesheet.
