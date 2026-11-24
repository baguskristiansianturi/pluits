# Aturan 02 — Home, Navigasi, dan Kerangka Pengalaman

## Permukaan yang sudah teridentifikasi
- Social Home berada pada route `social`.
- Navigasi bawah menyediakan Beranda, Jelajah, tombol aksi tengah/Ruang Kerja, Pesan, dan Profil.
- Halaman Discover, Messages, Profile, dan Settings dimount sebagai pengalaman Social Media.
- Route dan label aktual harus mengikuti `src/config/paths.js` dan implementasi `src/app/create-app.js`.

## Aturan
1. Jangan mengubah urutan, label, ikon, posisi, ukuran, atau gaya navigasi sebagai bagian dari pekerjaan dokumentasi.
2. Navigasi harus memakai route helper yang terdaftar; jangan menanam URL aplikasi secara sembarang.
3. Tombol tengah saat ini mengarah ke Ruang Kerja/Dashboard; jangan mengasumsikan tombol itu sudah menjadi composer publikasi.
4. Pertahankan perilaku autentikasi dan redirect yang sudah diterapkan.
5. Halaman yang belum memiliki layanan backend harus menyampaikan status kosong atau belum tersedia secara jujur.
6. Jangan membuat halaman baru atau mengubah alur navigasi tanpa scope implementasi tersendiri.
7. Saat mengubah route di masa depan, audit deep link, navigasi bawah, autentikasi, tombol kembali, dan konsumen lintas halaman.
