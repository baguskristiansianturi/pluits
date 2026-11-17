# Store Seller Testing & UAT Baseline

Dokumen ini dipindahkan dari root repository ke blueprint modularisasi Store agar catatan pengujian operasional berada di bawah modul pemiliknya. Informasi di bawah adalah catatan historis per 9 November 2026; selalu verifikasi status aktual terhadap kode, database, dan audit terbaru sebelum melakukan UAT.

## Current test flow
1. Open seller center route `#/seller/register`.
2. Create a personal account with an email and password (minimum 8 characters).
3. If email confirmation is enabled in Supabase Auth, confirm the email from the inbox and then sign in.
4. Complete the first-store form. The account creating the store is automatically assigned as its owner in the same database transaction.
5. Use the owner dashboard to create categories, products, variants, price, stock, upload product images, define delivery areas, and edit basic store settings.

## Database reference
- Supabase project: `pluits` (project ref `ytndswhqxayqpftszwfh`), Singapore.
- Migration: `202611070002_pluits_seller_workspace`.
- Tables: profiles, operating_regions, stores, store_members, store_settings, store_operating_hours, store_delivery_zones, product_categories, products, product_variants, product_images, inventory_movements, store_audit_logs.
- Private Storage bucket: `pluits-store-media`, 10 MB max per image, JPEG/PNG/WebP only.
- Image path convention: `<store_uuid>/<product_uuid>/<generated_filename>`.

## Historical testing scope / limitations
- This is a founder-led early testing workspace, not production-ready commerce.
- Seller onboarding was recorded as Bali-only at backend level. Founder decision D-005 requires support for individuals, UMKM, family/home businesses, cooperatives and companies; historical UI/CHECK constraint/create_store RPC notes may no longer reflect current code. Verify before testing.
- Store creation uses the authenticated `create_store` RPC; the database creates the owner membership and default settings atomically.
- Product/category/media write policies use backend permission checks through `private.has_store_permission`. Staff invitation/grant-management UI and real owner/staff negative authorization UAT were not complete in the historical report.
- Backend foundations exist for orders and manual bank-transfer review, but seller-side action handlers and end-to-end order/payment UAT were incomplete in the historical report.
- Store images were recorded as private; storefront delivery/public image URLs were a later step.
- Supabase Auth email confirmation settings may require inbox confirmation before the first sign-in.

## Historical advisor findings
- Security advisor flagged authenticated `SECURITY DEFINER` function `public.create_store`. Revisit RPC design before production and verify current safeguards.
- Performance advisor reported unindexed foreign keys and multiple permissive SELECT policies on stores. Verify current advisor findings before changing indexes or policies.

## UAT readiness update — 9 November 2026
The historical [Social & Store UAT Readiness Audit](../../../../../../PLUITS-SHARING-INBOX/LEGACY-TO-SORT/PLUITS-CORE-REFERENCES/SOCIAL-AND-STORE-UAT-READINESS-AUDIT-2026-11-09.md) contains the source findings. Treat it as historical evidence, not current live status.

Historical blockers included:
- Store onboarding business-type mismatch.
- Store profile query omitted fields used by the profile form.
- Verification-submit and product/order action handlers were incomplete.
- Online-sales activation required an owner-guarded backend path.
- Multi-store selection and Android UAT were incomplete.

## Historical frontend patch — 9 November 2026
- Commit `e1a9d558bf9e3e6906e3b4837dfb9e8b6621b97c`; GitHub Actions run #1043 was recorded SUCCESS.
- The patch connected existing Auth identity to Seller Center, added multi-store selection behavior, loaded additional profile fields, connected verification submission and product/order action paths, and made online-sales status read-only pending a dedicated activation RPC.
- Workflow success did not prove Android interaction, actual store creation, upload, or two-account authorization UAT.

## Store model decision D-005 — 9 November 2026
Store registration was intended to separate operational business type from legal form, with legal form optional unless relevant. A real operational location and accountable owner are required; private/home address details should not be exposed publicly.

Historical URL behavior:
- Store: `#/shop/{store_username}`
- Product: `#/market-product/{variant_id}` (variant-based route; alignment may be needed)
- Seller dashboard: `#/seller`

Historical open items included business-type database constraints, legal-name requirements, verification RPC requirements, branch/location UI, store logo/banner upload, stable product URL, alias redirects, and owner-guarded online-sales activation. Verify each item against current implementation before acting.
