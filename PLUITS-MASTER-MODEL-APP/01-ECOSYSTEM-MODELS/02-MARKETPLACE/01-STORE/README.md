# Store — Merchant Module

Status: **DESIGN BASELINE + EXISTING IMPLEMENTATION FOOTPRINT**. Store adalah modul operasional merchant toko yang terhubung ke Marketplace.

## Empat jalur wajib Store
1. [01-DESIGN](01-DESIGN/README.md) — model bisnis toko, seller eligibility, katalog, halaman, dan alur pengguna.
2. [02-DEVELOPMENT](02-DEVELOPMENT/README.md) — arsitektur teknis, database, API, permission, integrasi, dan pengujian.
3. [03-PROJECT](03-PROJECT/README.md) — roadmap, scope, feature register, progres, dan bukti implementasi.
4. [04-CHECKLIST-AUDIT](04-CHECKLIST-AUDIT/README.md) — pemeriksaan desain, keamanan, tenant isolation, UAT, dan release gates.

## Cakupan
- Pendaftaran dan verifikasi toko fisik
- Seller Center dan multi-store ownership
- Profil storefront dan lokasi/cabang
- Kategori, produk, varian/SKU, media, harga, dan persediaan
- Ketersediaan, area layanan, pesanan, pembayaran, dan fulfillment
- Staff permissions, audit, laporan, dan pengaturan

## Dokumentasi arsitektur
- [Product Design Store](../../../02-PRODUCT-DESIGN/02-MARKETPLACE/01-MERCHANT-OPERATIONS/01-STORE/README.md)
- [Application Modularization Store](../../../03-APPLICATION-MODULARIZATION/02-MARKETPLACE/01-MERCHANT-OPERATIONS/01-STORE/README.md)

Catatan: source dan migrasi Store memiliki jejak implementasi di repository. Status setiap fitur tetap harus dibuktikan melalui audit kode, backend, keamanan, dan UAT; dokumen ini tidak menyatakan Store production-ready.
