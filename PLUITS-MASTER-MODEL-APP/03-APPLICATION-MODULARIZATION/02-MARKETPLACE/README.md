# Marketplace — Application Modularization

Blueprint teknis Marketplace sebagai customer-facing discovery, public catalog, cart, checkout, order orchestration, dan customer order experience.

## Merchant Operations

- [Store](01-MERCHANT-OPERATIONS/01-STORE/README.md)
- [Restaurant & Café](01-MERCHANT-OPERATIONS/02-RESTAURANT-CAFE/README.md)

Marketplace mengonsumsi kontrak integrasi yang disepakati. Data dan proses operasional merchant tetap dimiliki modul vertikal masing-masing.

## Project and quality control

- [Marketplace project register](03-PROJECT/README.md)
- [Marketplace checklist and audit](04-CHECKLIST-AUDIT/README.md)

## Existing implementation surfaces to audit

- `src/features/marketplace/`
- `src/pages/marketplace/`
- `src/services/repositories/marketplace/`
- `src/features/store/`
- `src/features/seller/`
- `supabase/migrations/`

Keberadaan source path tidak otomatis membuktikan seluruh feature siap digunakan. Audit aktual, authorization, RLS, regression, dan UAT tetap menjadi release gates.
