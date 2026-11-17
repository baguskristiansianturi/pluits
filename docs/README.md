# PLUITS Documentation Hub

Pusat dokumentasi resmi PLUITS. Gunakan folder ini sebagai titik awal agar dokumentasi setiap bagian mudah ditemukan dari branch `main`.

## Struktur

| Folder | Cakupan |
|---|---|
| [00-PLUITS-CORE](./pluits/) | Arsitektur inti, engineering, design system, keamanan, navigasi, dan standar lintas modul. |
| [01-MARKETPLACE](./01-MARKETPLACE/) | Lapisan discovery, agregasi merchant, katalog lintas kategori, dan transaksi marketplace. |
| [02-STORE](./02-STORE/) | Operasional merchant toko: katalog, produk, inventaris, dan alur Store. |
| [03-RESTAURANT-CAFE](./03-RESTAURANT-CAFE/) | Operasional merchant restoran/kafe: menu, meja, pemesanan, dine-in, dan layanan pelanggan. |

## Batas arsitektur penting

- **Marketplace** adalah lapisan platform/agregator yang menghubungkan berbagai kategori merchant.
- **Store** adalah modul operasional vertikal untuk merchant toko.
- **Restaurant & Café** adalah modul operasional vertikal untuk merchant restoran dan kafe.
- Marketplace bukan pengganti atau nama lain dari Store maupun Restaurant & Café.
- Dokumen inti lintas modul tetap berada di `docs/pluits/`; jangan menggandakannya ke folder vertikal.

## Aturan pemeliharaan

1. Perbarui dokumentasi kanonis di folder ini pada branch `main` melalui perubahan yang ditinjau.
2. Branch fitur boleh menyimpan dokumentasi kerja selama pengembangan, tetapi setelah integrasi, sinkronkan hasil final ke folder kanonis ini.
3. Jangan menghapus dokumen sumber di branch fitur sebagai bagian dari pemindahan ini.
4. Perubahan dokumentasi tidak boleh mengubah implementasi aplikasi kecuali ada tugas implementasi terpisah.
