# Social Account Rules

**Status:** PROPOSED — catatan hasil diskusi founder, belum menjadi spesifikasi implementasi.  
**Ruang lingkup:** aturan akun untuk penggunaan media sosial PLUITS. Tidak mencakup aturan toko, bisnis, layanan, transaksi, atau keuangan.

## 1. Level akun

Urutan membership yang sedang digunakan dalam pemetaan:

1. Regular — gratis.
2. Silver Member.
3. Gold Member.
4. Platinum Member.
5. Golden PLUITS Priority.

Hak bersifat **kumulatif**: setiap level memperoleh seluruh hak level di bawahnya, ditambah hak yang mulai tersedia pada levelnya. Harga dan periode tagihan tidak ditetapkan dalam dokumen ini.

## 2. Prinsip privasi dan akses

- Semua level dapat menemukan akun dan melihat konten yang dipublikasikan untuk umum, sesuai pengaturan pemilik konten.
- Pengaturan privat, audiens, dan izin pemilik tetap berlaku untuk semua level, termasuk Golden PLUITS Priority.
- Membership tidak memberi hak untuk membuka profil, feed, atau konten privat tanpa izin.
- Membership tidak boleh melewati pemblokiran atau kontrol keselamatan.
- Pengelolaan daftar akun yang diblokir sendiri merupakan fungsi dasar seluruh level.
- People You May Know tersedia untuk semua level.

## 3. Pemetaan fitur sosial

| Fitur | Mulai tersedia | Level yang memperoleh |
|---|---|---|
| People You May Know | Regular | Semua level |
| Nearby / Close Connections Homepage (nama kerja) | Gold | Gold, Platinum, Golden PLUITS Priority |
| PLUITS Crossed Paths | Gold | Gold, Platinum, Golden PLUITS Priority |
| Block Transparency — mengetahui akun yang memblokir kita | Gold — usulan dalam diskusi | Gold, Platinum, Golden PLUITS Priority |
| Profile Visitor Tracking — identitas pengunjung profil | Platinum | Platinum, Golden PLUITS Priority |
| Advanced Visitor Activity — rincian aktivitas pengunjung | Golden PLUITS Priority | Golden PLUITS Priority |
| Incognito Browsing — menyamarkan identitas saat mengunjungi profil | Golden PLUITS Priority | Golden PLUITS Priority |

## 4. Definisi kemampuan

### 4.1 People You May Know
Fitur rekomendasi akun yang mungkin dikenal pengguna. Tersedia untuk semua level.

### 4.2 Nearby / Close Connections Homepage
Beranda atau ruang discovery untuk menemukan orang terdekat atau koneksi yang relevan. Mulai Gold dan diwariskan ke Platinum serta Golden PLUITS Priority. Detail sumber kedekatan, kriteria rekomendasi, dan kontrol lokasi masih perlu dirancang.

### 4.3 PLUITS Crossed Paths
Fitur untuk memberi tahu pengguna ketika ia berpapasan dengan koneksi sosial yang memenuhi syarat. Mulai Gold dan diwariskan ke level lebih tinggi. Bukan fitur match dan tidak membuka lokasi presisi. Aturan opt-in, relasi yang memenuhi syarat, dan batas informasi lokasi perlu dirancang secara aman.

### 4.4 Block Transparency
Gold dan level lebih tinggi dapat mengetahui akun mana yang memblokir mereka. Fitur ini hanya menyampaikan fakta pemblokiran; PLUITS tidak menyimpulkan atau mengungkap alasan orang tersebut memblokir. Daftar akun yang diblokir oleh pengguna sendiri tetap tersedia bagi semua level sebagai kontrol privasi dasar.

### 4.5 Profile Visitor Tracking — Platinum
Platinum dan Golden PLUITS Priority dapat mengetahui identitas akun yang mengunjungi profil serta informasi kunjungan dasar. Platinum tidak memperoleh rincian perilaku pengunjung seperti daftar video yang ditonton, durasi per video, jumlah pemutaran, atau aktivitas membaca konten.

Cakupan tepat pengunjung yang terlihat oleh Platinum (misalnya semua level atau hanya Platinum ke atas), masa retensi, dan aturan ketika pengunjung memakai mode samaran masih perlu dipastikan.

### 4.6 Advanced Visitor Activity — Golden PLUITS Priority
Golden PLUITS Priority memperoleh rincian aktivitas pengunjung yang dapat dicatat di dalam PLUITS, misalnya:
- Video atau konten yang dibuka.
- Durasi menonton yang tercatat.
- Jumlah pemutaran atau pemutaran ulang.
- Aktivitas membuka/membaca deskripsi profil.
- Artikel atau tulisan yang dibuka/dibaca.

Data harus menggambarkan event yang benar-benar dapat diukur. Durasi halaman terbuka tidak otomatis membuktikan seseorang membaca. Informasi screenshot atau download hanya dapat ditampilkan jika perangkat dan platform benar-benar mengizinkan deteksi; jangan menyajikannya sebagai fakta jika tidak terdeteksi atau tidak didukung.

### 4.7 Incognito Browsing — Golden PLUITS Priority
Golden PLUITS Priority dapat mengaktifkan mode samaran saat mengunjungi profil. Identitas kunjungan tidak ditampilkan kepada pemilik profil, termasuk pemilik akun Platinum atau Golden PLUITS Priority lainnya. Mode samaran tidak membuka konten privat, tidak melewati block, dan tidak mengubah izin akses konten.

## 5. Aturan kumulatif

- Gold memperoleh seluruh hak Regular dan Silver, ditambah fitur yang mulai di Gold.
- Platinum memperoleh seluruh hak Regular, Silver, dan Gold, ditambah fitur yang mulai di Platinum.
- Golden PLUITS Priority memperoleh seluruh hak Regular, Silver, Gold, dan Platinum, ditambah fitur eksklusif Golden Priority.

## 6. Batas ruang lingkup

Dokumen ini hanya memetakan penggunaan sosial. Aturan khusus layanan pelanggan prioritas untuk urusan toko/usaha, modul bisnis, operasional layanan, transaksi, pembayaran, penarikan dana, dan batas penggunaan sumber daya akan dicatat terpisah dalam aturan Business Account.

## 7. Hal yang masih perlu diputuskan

1. Kriteria dan tampilan Nearby / Close Connections Homepage.
2. Kriteria relasi, opt-in, dan batas lokasi untuk Crossed Paths.
3. Cakupan level pengunjung yang terlihat oleh Platinum.
4. Pilihan privasi pengunjung untuk Profile Visitor Tracking selain Incognito Golden Priority.
5. Detail event, retensi, kontrol pengguna, dan batas teknis Advanced Visitor Activity.
6. Apakah dan bagaimana Block Transparency memberi tahu pengguna yang diblokir tanpa membuka celah pelecehan atau penghindaran block.

## 8. Status implementasi

- Dokumen ini adalah catatan konsep untuk menjaga kesinambungan diskusi dan menjadi bahan pemetaan produk, halaman, UX/UI, serta kebutuhan sistem.
- Belum merupakan permission matrix final atau spesifikasi teknis.
- Tidak mengubah schema, RLS, API, algoritma produksi, frontend, roadmap aktif, atau deployment.
- Setiap fitur dan aturan tetap dapat diperbaiki melalui keputusan founder.
