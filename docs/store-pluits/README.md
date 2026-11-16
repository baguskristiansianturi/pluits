# PLUITS Store

Status: **INITIAL WORKSPACE — PRODUCT DESIGN NOT YET FINALIZED**

PLUITS Store is a proposed new business module for the existing PLUITS platform. It will be designed and developed independently before any integration into the live application.

## Workspace
- [01-DESIGN](01-DESIGN/README.md): business model, product scope, journeys, pages and decisions.
- [02-DEVELOPMENT](02-DEVELOPMENT/README.md): technical architecture, components, data, APIs, security and integration.
- [03-PROJECT](03-PROJECT/README.md): implementation plan, feature register, tests and delivery evidence.
- [04-CHECKLIST-AUDIT](04-CHECKLIST-AUDIT/README.md): design/development/project cross-check, risks and release gates.

## Isolation rule
Work on branch `feature/store-pluits`. Do not merge into `main`, modify production deployment settings, or alter unrelated PLUITS modules until the Store module has passed review, testing, regression checks and explicit integration approval.

## Existing preliminary notes
A previous discussion mentioned a possible storefront/catalog, product detail, cart, checkout and orders, with candidate routes `/store/`, `/store/product/:id/`, `/store/cart/`, and `/store/checkout/`. These are **discussion notes only**, not approved requirements. Canonical URLs and navigation must not change without explicit agreement.

No implementation, test, audit or deployment is claimed by this workspace starter.
