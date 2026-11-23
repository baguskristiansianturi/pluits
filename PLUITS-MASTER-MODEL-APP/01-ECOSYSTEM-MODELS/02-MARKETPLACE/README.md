# Marketplace — Model Ekosistem

Status: **IN-DESIGN**. Marketplace adalah lapisan discovery, agregasi, dan transaksi pelanggan lintas merchant dalam ekosistem PLUITS.

Marketplace bukan sistem operasional semua merchant. Ia menghubungkan pelanggan dengan vertikal merchant yang masing-masing tetap memiliki domain operasional sendiri.

## Empat jalur wajib Marketplace

Setiap modul PLUITS memakai empat jalur dokumentasi dan pengendalian yang sama. Folder-folder ini adalah pintu masuk kanonis; dokumen rinci Product Design dan Application Modularization tetap dipisahkan sesuai arsitektur Master Model App.

1. [01-DESIGN](01-DESIGN/README.md) — model produk, aturan bisnis, pengalaman pelanggan, information architecture, dan discovery.
2. [02-DEVELOPMENT](02-DEVELOPMENT/README.md) — arsitektur frontend/backend, database, API, keamanan, dan integrasi.
3. [03-PROJECT](03-PROJECT/README.md) — scope, roadmap, feature register, progres, dan bukti delivery.
4. [04-CHECKLIST-AUDIT](04-CHECKLIST-AUDIT/README.md) — checklist, audit, risiko, pengujian, dan release gates.

## Merchant verticals

Folder Marketplace langsung menampilkan dua modul merchant yang telah memiliki baseline:

- [01 — Store](01-STORE/README.md) — operasional toko/merchant produk, katalog, varian, persediaan, pesanan, dan Seller Center.
- [02 — Restaurant & Café](02-RESTAURANT-CAFE/README.md) — operasional restoran/kafe, reservasi, kunjungan dine-in, menu, pesanan, kitchen, layanan, dan kasir.

Keduanya adalah vertikal merchant di dalam Marketplace, bukan model ekosistem yang berdiri sejajar dengan Marketplace.

## Batas tanggung jawab

- **Marketplace:** discovery lintas merchant, kategori, pencarian, listing publik, pengalaman pelanggan, cart, checkout, dan orkestrasi transaksi lintas merchant.
- **Store:** sumber kebenaran operasional untuk toko, katalog produk, varian, stok, Seller Center, dan pemrosesan pesanan toko.
- **Restaurant & Café:** sumber kebenaran operasional untuk restoran, cabang, meja, reservasi, Visit, menu, kitchen, layanan, kasir, dan pesanan restoran.
- Integrasi berjalan melalui kontrak data/API/event yang disepakati. Marketplace tidak mengambil alih tabel atau aturan operasional internal modul merchant.

## Dokumentasi arsitektur
- [Product Design Marketplace](../../02-PRODUCT-DESIGN/02-MARKETPLACE/README.md)
- [Application Modularization Marketplace](../../03-APPLICATION-MODULARIZATION/02-MARKETPLACE/README.md)

Folder model ekosistem lain boleh tetap menjadi dasar sampai sharing dan perancangannya dilakukan. Folder kosong bukan bukti bahwa modul telah dibuat.


## PLUITS Partner discovery catalogue

PLUITS Partner is the partner discovery/category-catalogue surface associated with Marketplace. It organizes providers through parent categories and subcategories; it does not replace merchant or service operations. The category catalogue and locked-card behavior are specified in [PLUITS Partner Product Design](../../../02-PRODUCT-DESIGN/02-MARKETPLACE/PLUITS-PARTNER-CATEGORY-CATALOGUE.md).

The existing Store and Restaurant & Café verticals remain the operational source of truth. Partner listings must reference their verified records and contracts instead of creating parallel operational modules.
