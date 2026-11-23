# PLUITS Partner — Parent Categories, Subcategory Cards, and Lock States

- Tanggal: 2026-11-23
- Topik: Struktur kategori PLUITS Partner dan penanda kesiapan subkategori
- Model/aplikasi terkait: PLUITS Partner, Marketplace, merchant/service directory
- Status: UNDER-REVIEW

## Catatan sharing

PLUITS Partner direncanakan sebagai wadah/direktori untuk menemukan mitra, bisnis, penyedia layanan, dan penawaran di ekosistem PLUITS.

Struktur kategori harus bertingkat:
- Kategori induk mengelompokkan bidang besar.
- Jenis usaha/layanan yang lebih spesifik ditempatkan sebagai subkategori di bawah kategori induk.
- Jangan menjadikan setiap jenis usaha kecil sebagai kategori induk tersendiri jika masih satu rumpun.

Contoh pengelompokan:
- Transportasi → Sewa Mobil, Sewa Motor, Kurir/Pengiriman, transportasi penumpang, transportasi barang, dan jenis terkait.
- Toko dan Perdagangan → Fashion → Butik, toko pakaian, outlet; serta rumpun toko lain seperti elektronik, kecantikan, kebutuhan rumah, kebutuhan harian, otomotif, olahraga, kerajinan, dan lainnya.
- Akomodasi → Hotel, Villa, Homestay, Guest House, Hostel, Apartemen, Resort, Camping/Glamping.
- Ticketing dan Perjalanan → Tiket Pesawat, Kapal, Bus, Kereta, Atraksi, Aktivitas, dan Paket Perjalanan.
- Layanan Profesional → Desain/Kreatif, Teknologi, Pemasaran, Penulisan, Konsultan, Pendidikan, Perawatan, dan jasa personal.
- Makanan dan Minuman → Katering, Bakery, Kedai/Warung, Coffee Shop, penyedia makanan, dan minuman.
- Properti dan Ruang → Jual/Sewa Properti, Ruang Kantor, Co-working Space, Ruang Acara, dan Ruang Komersial.
- Iklan Baris dan Lowongan → Lowongan Kerja, Pencarian Pekerjaan/Kandidat, Properti, Kendaraan, Barang Bekas, Jasa, Bisnis, dan lainnya.

Daftar di atas merupakan rancangan awal untuk disortir dan disempurnakan, bukan taksonomi final. Kategori induk dan subkategori perlu diaudit agar tidak tumpang tindih dengan modul operasional PLUITS yang sudah memiliki domain sendiri, misalnya Store serta Restaurant & Café.

## Masalah/kebutuhan yang muncul

Semua subkategori yang sudah masuk rencana harus tetap terlihat di antarmuka agar cakupan pengembangan tidak terlupakan, meskipun modulnya belum tersedia.

## Ide atau opsi yang dibahas

- Setiap subkategori ditampilkan sebagai kartu.
- Setiap kartu subkategori yang belum siap menampilkan ikon gembok secara jelas.
- Kartu tetap terlihat sebagai bagian dari katalog/roadmap kategori, tetapi statusnya terkunci.
- Status terkunci menjadi penanda bahwa subkategori tersebut belum selesai dibangun atau belum dibuka untuk digunakan.
- Setelah subkategori benar-benar siap, gembok dibuka secara manual melalui pengaturan/status yang dikendalikan PLUITS.
- Status lock/unlock sebaiknya menjadi metadata kesiapan per subkategori, bukan menghapus atau menyembunyikan subkategori.
- Kartu yang masih terkunci tidak boleh memberi kesan bahwa layanan, pemesanan, klaim, transaksi, atau pengelolaan operasionalnya sudah berfungsi.

## Keputusan eksplisit

- PLUITS Partner menggunakan struktur kategori induk → subkategori.
- Subkategori ditampilkan sebagai kartu.
- Setiap subkategori yang belum dibuka harus menampilkan ikon gembok.
- Gembok dibuka secara manual setelah subkategori terkait selesai disiapkan.
- Kategori yang belum siap tetap dicatat dan ditampilkan agar tidak terlupakan.

## Pertanyaan terbuka / konflik

- Nama dan cakupan final kategori induk masih perlu ditinjau.
- Daftar subkategori perlu disaring untuk menghindari duplikasi dan tumpang tindih antar-modul.
- Perlu ditentukan apakah pembukaan gembok dilakukan melalui konfigurasi admin, feature flag, atau pengaturan katalog kategori.
- Perlu ditentukan kriteria "selesai dan siap dibuka" untuk setiap jenis subkategori.

## Hasil penyortiran

- Ecosystem Model: Belum disortir.
- Product Design: Belum disortir.
- Application Modularization: Belum disortir.
- Shared Platform Services: Belum disortir.
- Platform Wrapper: Belum disortir.

## Tindak lanjut

1. Audit struktur Marketplace, Store, Restaurant & Café, Geo Directory, Logistics & Transportation, Tickets & Accommodation, dan modul terkait yang sudah ada.
2. Susun taksonomi kategori induk dan subkategori PLUITS Partner yang tidak tumpang tindih.
3. Rancang kartu subkategori dengan ikon gembok dan state terkunci/terbuka.
4. Tetapkan alur admin untuk membuka gembok hanya setelah modul terkait siap.
5. Implementasikan setelah hasil penyortiran dan acceptance criteria disetujui.

## Status akhir

RAW


## Implementasi awal (2026-11-23)

- Koreksi struktur mobile Ruang Bisnis: hanya ada dua entri tingkat atas, yaitu PLUITS Partner dan Tempat.
- Toko, Kafe, Restoran, dan seluruh jenis usaha/layanan lainnya berada di dalam katalog PLUITS Partner, bukan sebagai kartu terpisah di Ruang Bisnis.
- Memilih PLUITS Partner membuka katalog kategori induk dan kartu subkategori secara inline.
- Katalog awal berisi 9 kategori induk dan 63 kartu subkategori; setiap kartu subkategori menampilkan ikon gembok dan tidak dapat diklik.
- Perubahan runtime berada di `src/features/dashboard/dashboard-page.js` dan `dashboard-page.css`.
- Spesifikasi produk berada di `PLUITS-MASTER-MODEL-APP/02-PRODUCT-DESIGN/02-MARKETPLACE/PLUITS-PARTNER-CATEGORY-CATALOGUE.md`.
- Status kategori masih presentational; admin unlock dan state backend belum dibuat.
- Taxonomy masih perlu audit final dan acceptance founder.


## Koreksi struktur Ruang Bisnis — 2026-11-23

- Disepakati bahwa Ruang Bisnis hanya menampilkan dua entry: **PLUITS Partner** dan **Tempat**.
- PLUITS Partner adalah pintu masuk untuk semua kategori usaha/mitra, termasuk Toko, Kafe, Restoran, dan layanan lainnya.
- Tempat tetap terpisah dan mengarah ke Geo Directory; record tempat fisik tidak disamakan dengan profil partner.
- Implementasi mobile dan dokumentasi produk harus mengikuti struktur dua entry ini. Modul operasional dan halaman Akun Bisnis yang sudah ada tidak dihapus oleh perubahan komposisi Ruang Bisnis.


## Koreksi UX Mobile Create: Fluid Partner, lokasi, dan iklan baris — 2026-11-23

- Nama bagian bisnis diubah menjadi **Fluid Partner**; tidak lagi memakai judul Ruang Bisnis.
- Fluid Partner hanya menampilkan kartu **+ Buat**. Ketika ditekan, panel mengambang hampir selebar layar muncul di atas halaman Create yang tetap terlihat.
- Panel pertama menampilkan kategori induk. Memilih kategori induk memunculkan panel kedua di atas panel pertama untuk menampilkan subkategori. Panel induk tetap menjadi layer di belakang; panel kedua memiliki navigasi kembali. Kategori sub tetap menggunakan kartu bergembok sampai modul siap dirilis.
- Di bawah Fluid Partner ada bagian **Tambahkan dan klaim lokasi** dengan search bar untuk memeriksa Geo Directory sebelum membuat lokasi. Lokasi yang sudah terhubung ke akun akan ditampilkan sebagai kartu-kartu di samping aksi tambah, hanya berdasarkan data server yang sah.
- Di bawah lokasi ada bagian **Iklan Baris** dengan kartu **+ Buat iklan**. Aksi ini membuka panel pertanyaan jenis iklan dan menampilkan daftar kategori.
- Implementasi frontend saat ini merupakan prototype interaksi. Pencarian lokasi belum terhubung ke Geo Directory; pembuatan/klaim lokasi, data lokasi milik pengguna, pembuatan iklan, dan penyimpanan masih memerlukan backend serta otorisasi server. UI tidak boleh menampilkan hasil pencarian atau kepemilikan palsu.


## Koreksi batas kategori — Iklan Baris terpisah dari Fluid Partner — 2026-11-23

- Iklan Baris tidak lagi menjadi kategori induk di dalam Fluid Partner.
- Fluid Partner kini memiliki delapan kategori induk; subkategori Iklan Baris/Lowongan dipindahkan ke daftar pilihan khusus yang muncul dari kartu **+ Buat iklan** di bagian Iklan Baris.
- Pemisahan ini menjaga direktori partner usaha/layanan tetap berbeda dari sistem iklan, lowongan, pencari kerja, dan listing barang/properti.
