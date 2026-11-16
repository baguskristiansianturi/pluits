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
