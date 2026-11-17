# PLUITS MASTER MODEL APP

Pusat dokumentasi resmi untuk merancang dan memodularisasi seluruh ekosistem PLUITS. Folder ini bukan tempat source code runtime.

## Struktur kerja
- `00-MASTER-FOUNDATION/` — fondasi platform, identitas, akun, membership, dan keputusan lintas aplikasi.
- `01-ECOSYSTEM-MODELS/` — enam model sesuai urutan master.
- `02-PRODUCT-DESIGN/` — kebutuhan pengguna, halaman, alur, UI/UX, wireframe, visual, dan komponen setiap aplikasi.
- `03-APPLICATION-MODULARIZATION/` — batas modul dan blueprint frontend, backend, database, API, keamanan, serta testing.
- `04-SHARED-PLATFORM-SERVICES/` — layanan lintas aplikasi.
- `05-PLATFORM-WRAPPER-AND-USER-JOURNEYS/` — homepage utama PLUITS, app launcher, navigasi global, dan perjalanan lintas aplikasi.

## Alur kerja wajib
1. Semua hasil diskusi masuk terlebih dahulu ke `PLUITS-SHARING-INBOX/` di root repository.
2. Catatan sharing ditinjau dan disortir; ide mentah tidak otomatis menjadi requirement.
3. Keputusan yang disetujui dipindahkan ke model bisnis, Product Design, atau Application Modularization yang sesuai.
4. Implementasi dilakukan pada source module yang memiliki tanggung jawab atas fitur tersebut.
5. Perubahan lintas modul hanya dilakukan bila memang diperlukan, setelah audit dependensi dan dampak.

## Batas model
Marketplace adalah wadah discovery dan transaksi pelanggan. Store serta Restaurant & Café adalah sistem operasional merchant yang terhubung ke Marketplace; bukan Marketplace itu sendiri.
