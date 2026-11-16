# 01 — DESIGN

## Purpose
Define the business model and complete customer/seller/operator experience for a Store module within PLUITS.

## Known discussion baseline (not yet approved)
Possible customer-facing areas previously discussed:
- Storefront / product catalog
- Product detail
- Cart
- Checkout
- Orders / order history

Candidate route concepts previously mentioned:
- `/store/`
- `/store/product/:id/`
- `/store/cart/`
- `/store/checkout/`

These are placeholders pending the product-model discussion. Do not treat them as final routes or change existing URLs/navigation based on this note.

## Design work required
Define the marketplace/business model; seller onboarding and verification; product categories and attributes; catalog/search/filter/sort; product detail and media; pricing and promotions; stock and availability; cart and checkout; shipping/fulfillment; payment/refund/cancellation; order lifecycle; seller operations; customer support/disputes; reviews; notifications; commissions/fees/settlement; owner/admin oversight; privacy and permissions.

## Design constraints
- Store is a PLUITS module, not a separate standalone product.
- Keep it isolated while being designed and built.
- Preserve existing PLUITS canonical URLs and navigation unless explicitly approved otherwise.
- Record decisions and unresolved questions before implementation.
