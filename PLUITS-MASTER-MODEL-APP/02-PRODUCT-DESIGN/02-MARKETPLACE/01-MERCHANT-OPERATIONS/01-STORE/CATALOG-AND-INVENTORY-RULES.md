# Product Catalog, Variants & Inventory Rules

Status: **Core design baseline; detailed category taxonomy and policies remain OPEN**.

## 1. Product hierarchy
- Merchant owns store; store may contain branches.
- Product is the shared catalog parent.
- Variant/SKU is the sellable configuration (e.g. black / size M).
- Inventory is held by branch/location and references a sellable SKU.
- Order line stores immutable product, variant, price, tax, discount and seller snapshots.
- Serial-numbered units and batch/lot quantities require specialized tracking records.

## 2. Product types
1. Simple: one sellable SKU (book, mug).
2. Variant matrix: combinations of option dimensions (shirt color × size).
3. Configurable: selected technical options (computer memory/storage).
4. Measured/weighted: decimal quantity and unit (kg, meter, liter) with precision and minimum increments.
5. Serialized: individually tracked unit (IMEI/serial).
6. Batch/lot: quantity tracked by lot, expiry or production date.
7. Bundle/kit: composition of component SKUs and stock deduction policy.

Category can prescribe type, attributes, validation, legal restrictions and filters. The system must not force irrelevant fields onto all products.

## 3. Attribute model
Attributes should be typed and scoped:
- text, number, boolean, date, enum, multi-select, measurement with unit.
- Product-level attributes: brand, material, model, country of origin.
- Variant-level attributes: color, size, storage capacity, flavor.
- Operational attributes: expiry, lot, serial, condition, warranty.
- Package attributes: weight, dimensions, fragile/hazardous handling where applicable.
- Category definitions support required/optional, allowed values, unit, validation, display/filter behavior and localization.

## 4. Variant matrix
- Seller chooses option dimensions and values; system previews valid combinations before generating SKUs.
- Seller can disable combinations not sold.
- Each active combination may have unique SKU, barcode, price override, media, weight and branch inventory.
- Base price inheritance is allowed, with explicit variant overrides.
- Prevent accidental combinatorial explosion; require confirmation and support selective combination generation.
- Variant identity must remain stable if display label changes.
- Never use a product parent SKU as a substitute for variant-level stock identity when variants are independently sold.

## 5. SKU and barcode
- SKU uniqueness is scoped to merchant (policy may strengthen to store).
- Barcode uniqueness rules account for legitimate shared manufacturer GTINs; do not assume all barcode values are globally unique per seller.
- Support seller-defined SKU and optional generated SKU.
- Barcode scan resolves to the exact sellable item and branch stock context.
- Record who changed identifiers and when.

## 6. Inventory states and movements
Recommended quantities per SKU/location:
- on_hand
- reserved
- committed/allocated
- damaged/quarantined
- available_to_sell (derived under explicit formula)
- incoming (not sellable until received/accepted)

Every change is an immutable stock movement: receive, sale, reservation, release, return-restock, damage, adjustment, transfer-out, transfer-in, count correction. Each movement stores actor, source, reason, timestamp and reference.
Physical stock count produces a variance workflow; it must not silently overwrite movement history.

## 7. Concurrency and channels
- Marketplace and POS must use the same authoritative inventory service.
- Reserve stock atomically during checkout with expiry; payment success commits, failure/timeout releases.
- Use transaction locking/conditional updates and idempotency to prevent oversell and duplicate decrement.
- Multi-branch stock is separate; transfers require dispatch and receipt events.
- Offline POS is not assumed for initial release. If later enabled, define offline limits, conflict handling and reconciliation first.

## 8. Product lifecycle
DRAFT → IN_REVIEW (if moderation required) → PUBLISHED → PAUSED / OUT_OF_STOCK / REJECTED / ARCHIVED.
Publication also requires active seller/store, category eligibility, required attributes, valid price/media and fulfillment eligibility.
Out-of-stock products may remain discoverable only if clearly labeled and policy permits; they cannot be purchased.

## 9. Pricing and order snapshots
- Price is server-authoritative and currency-scoped.
- Variant price overrides parent price only under explicit rule.
- Promotion funding, stacking, tax and fee order are separately defined.
- At checkout, create immutable line snapshots including selected variant labels, SKU, unit price, discount allocation, tax, seller/store/branch and fulfillment terms.
- Later catalog edits must not rewrite historical order or receipt data.

## 10. Bulk operations and media
- Import/export templates include category, attribute keys, variants, SKU, price, stock location and validation feedback.
- Preview and error report before bulk publish/update.
- Bulk actions must be permissioned and auditable.
- Product media supports parent and variant images, ordering, alt text, moderation and safe file validation.
