# Marketplace — Model Ekosistem

Status: **IN-DESIGN**. Marketplace adalah model bisnis kedua dalam ekosistem PLUITS dan menjadi lapisan discovery, agregasi, serta transaksi pelanggan lintas merchant.

Marketplace bukan sistem operasional semua merchant. Ia menghubungkan pengalaman pelanggan dengan modul vertikal yang masing-masing tetap memiliki domain operasional sendiri.

## Merchant verticals

Folder Marketplace langsung menampilkan dua modul merchant yang sudah memiliki baseline:

1. [01 — Store](01-STORE/README.md) — operasional toko/merchant produk, katalog, varian, persediaan, pesanan, dan Seller Center.
2. [02 — Restaurant & Café](02-RESTAURANT-CAFE/README.md) — operasional restoran/kafe, reservasi, kunjungan dine-in, menu, pesanan, kitchen, layanan, dan kasir.

Keduanya adalah vertikal merchant di dalam cakupan Marketplace, bukan model ekosistem yang berdiri sejajar dengan Marketplace.

## Batas tanggung jawab

- **Marketplace:** discovery lintas merchant, kategori, pencarian, listing publik, pengalaman pelanggan, cart, checkout, dan orkestrasi transaksi lintas merchant.
- **Store:** sumber kebenaran operasional untuk toko, katalog produk, varian, stok, Seller Center, dan pemrosesan pesanan toko.
- **Restaurant & Café:** sumber kebenaran operasional untuk restoran, cabang, meja, reservasi, Visit, menu, kitchen, layanan, kasir, dan pesanan restoran.
- Integrasi berjalan melalui kontrak data/API/event yang disepakati. Marketplace tidak mengambil alih tabel atau aturan operasional internal modul merchant.

## Dokumentasi kanonis

- [Product Design Marketplace](../../02-PRODUCT-DESIGN/02-MARKETPLACE/README.md)
- [Application Modularization Marketplace](../../03-APPLICATION-MODULARIZATION/02-MARKETPLACE/README.md)

Model ekosistem lainnya tetap dapat berupa folder dasar sampai perancangannya dimulai. Keberadaan folder tidak berarti fitur sudah dibangun.
