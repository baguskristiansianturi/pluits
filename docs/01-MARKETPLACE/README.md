# PLUITS Marketplace

Marketplace adalah lapisan discovery, agregasi, dan transaksi yang menghubungkan Store, Restaurant & Café, serta kategori merchant/layanan lain dalam satu pengalaman pelanggan.

## Batas modul

- Marketplace mengelola pengalaman lintas merchant: discovery, pencarian, kategori, listing, konteks merchant, dan pintu masuk transaksi.
- Store mengelola operasi merchant toko.
- Restaurant & Café mengelola operasi merchant restoran/kafe.
- Data operasional merchant tetap menjadi tanggung jawab modul vertikal masing-masing. Marketplace mengonsumsi kontrak publik/marketplace yang disepakati, bukan mengambil alih seluruh domain operasional merchant.

## Peta dokumentasi

- [01-DESIGN](./01-DESIGN/README.md)
- [02-DEVELOPMENT](./02-DEVELOPMENT/README.md)
- [03-PROJECT](./03-PROJECT/README.md)
- [04-CHECKLIST-AUDIT](./04-CHECKLIST-AUDIT/README.md)

## Jejak implementasi yang sudah terdeteksi

- Frontend feature: `src/features/marketplace/`
- Page entry: `src/pages/marketplace/`
- Public homepage integration: `src/pages/marketplace/` dan `src/features/marketplace/` (verifikasi entry aktual sebelum mengubah integrasi)
- Repository contract notes: `src/services/repositories/marketplace/README.md`
- Database migrations: `supabase/migrations/` (gunakan pencarian nama marketplace untuk audit lengkap).

Dokumentasi ini menjadi rumah kanonis perancangan Marketplace. Detail fitur dan keputusan baru harus dicatat di sini, bukan dicampur ke dokumentasi Store atau Restaurant & Café.
