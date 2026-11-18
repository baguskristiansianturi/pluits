# Sesi Sharing — Dashboard Pengguna PLUITS

- Tanggal: 18 November 2026
- Topik: Layout dan fondasi Dashboard Pengguna PLUITS
- Model/aplikasi terkait: Platform Wrapper & User Journeys; Platform UI Foundation
- Status: UNDER-REVIEW

## Catatan sharing
Pengguna membayangkan Dashboard desktop sebagai lingkungan kerja profesional dengan tiga area utama: daftar modul di sebelah kiri, pekerjaan/proyek aktif di tengah, dan aktivitas Social PLUITS di sebelah kanan. Lebar panel kiri dan kanan tidak selalu tetap; pengguna dapat menarik batas panel menggunakan kursor untuk mengubah ukuran. Panel kiri dan kanan dapat disembunyikan dan ditampilkan kembali. Tersedia kontrol panel di area atas.

Tab di bagian atas mewakili halaman yang sedang terbuka. Pengguna dapat mengetuk tab untuk kembali ke halaman yang masih terbuka dan berpindah di antara pekerjaan tanpa kehilangan konteks. Notifikasi dikendalikan dari satu pusat. Inbox dan aktivitas sosial tetap dapat diakses saat pengguna bekerja.

Satu akun PLUITS dipakai untuk mengelola aktivitas personal dan bisnis tanpa logout. Akun personal/social digunakan untuk berinteraksi, memublikasikan konten, dan melakukan transaksi. Pengguna dapat mempunyai identitas bisnis yang terhubung ke akun personal. Setiap akun bisnis hanya memilih satu jenis: Store atau Service. Jumlah akun bisnis yang boleh dimiliki satu akun personal belum diputuskan.

Social Media mencakup Feed, Story, Live, Reels, dan Blog. Untuk Blog, PLUITS menyediakan template yang sudah disiapkan dan pengguna memilih template yang ingin dipakai. Template Personal Blog yang telah ditetapkan pada keputusan produk adalah AURELIA, STAVERO, BREWNOX, ROVANTA, dan LUNELLE.

Dashboard menjadi tempat pengaturan profil sosial, pembuatan/pengelolaan akun bisnis, pengaturan personal seperti privasi, alamat, dan rekening, serta pusat transaksi. Pusat transaksi harus dapat digunakan pengguna sebagai pembeli maupun penjual, dengan status seperti menunggu pembayaran, diproses/dikonfirmasi, dikirim, dan selesai.

Pada mobile, fokus utama adalah pengelolaan modul. Panel sosial samping yang dirancang untuk desktop tidak perlu dipaksakan ke tampilan mobile.

Pengguna meminta versi awal dibuat terlebih dahulu agar dapat dilihat dan diuji, lalu bagian yang kurang baik dapat diperbaiki, yang belum diperlukan dapat dihapus, dan susunan dapat disesuaikan berdasarkan evaluasi.

## Masalah/kebutuhan yang muncul
- Pengguna membutuhkan satu lingkungan kerja yang tidak memutus aktivitas sosial ketika berpindah modul.
- Navigasi, halaman aktif, dan aktivitas sosial harus tetap terhubung dalam satu sesi akun.
- Dashboard perlu membedakan identitas personal dan identitas bisnis.
- Transaksi harus memiliki sudut pandang pembeli dan penjual.
- Desktop membutuhkan panel yang fleksibel; mobile membutuhkan pengalaman pengelolaan yang lebih ringkas.

## Ide atau opsi yang dibahas
- Layout tiga panel desktop dengan resize drag dan hide/show independen.
- Tab halaman terbuka di atas area kerja.
- Panel sosial kanan dengan Feed, Story, dan Inbox.
- Pusat notifikasi global dan pintu masuk Inbox di header.
- Dashboard menyediakan Profil Sosial, Akun Bisnis, Transaksi, Pengaturan, dan pintu masuk Social Media/Blog Studio.
- Business Account menyediakan pilihan jenis Store atau Service.
- Mobile menyembunyikan panel sosial samping dan mengubah navigasi modul menjadi navigator horizontal.

## Keputusan eksplisit
- Buat versi awal Dashboard berdasarkan komposisi tiga panel desktop dan perilaku tab/panel yang dibahas agar dapat ditinjau secara visual.
- Jadikan Dashboard pusat kendali pengguna setelah login; jangan membuat halaman Workspace terpisah atau menampilkan istilah teknis Workspace sebagai produk.
- Satu identitas autentikasi PLUITS digunakan lintas aktivitas personal dan bisnis.
- Setiap identitas bisnis individual hanya memilih satu jenis, Store atau Service.
- Pusat transaksi harus dirancang untuk Purchase dan Sales.
- Mobile diprioritaskan untuk pengelolaan modul, tanpa memaksakan panel sosial desktop.
- Implementasi awal adalah prototype antarmuka untuk review; bukan persetujuan bahwa seluruh fitur operasional sudah siap atau aktif.
- Bagian prototype boleh diperbaiki, disederhanakan, atau dihapus setelah evaluasi visual dan penggunaan.

## Pertanyaan terbuka / konflik
- Berapa banyak Business Account yang dapat dimiliki satu akun personal?
- Bagaimana relasi dan pemilihan identitas personal/bisnis pada aktivitas publik dan transaksi?
- Layanan backend mana yang menjadi sumber data resmi untuk profil, Business Account, transaksi, notifikasi, Inbox, dan panel sosial?
- Bagaimana aturan status transaksi dan otorisasi pembeli/penjual pada semua jenis merchant?
- Apakah panel sosial desktop menampilkan Feed, Story, dan Inbox bersamaan atau melalui sub-tab? Prototype awal menggunakan sub-tab agar ruang panel tetap terjaga.

## Hasil penyortiran
- Ecosystem Model: tidak mengubah model Store/Service atau Marketplace.
- Product Design: PLUITS-MASTER-MODEL-APP/05-PLATFORM-WRAPPER-AND-USER-JOURNEYS/PAGE-USER-DASHBOARD.md diperbarui sebagai spesifikasi prototype under review.
- Application Modularization: runtime ownership dan batas integrasi dicatat pada src/CHANGE-MAP.md; tidak ada perubahan route, Auth, database, RLS, atau migration.
- Shared Platform Services: belum ada kontrak layanan baru yang disetujui.
- Platform Wrapper: LAY-USER-DASHBOARD-001 diperbarui pada src/design-system/layouts.js.

## Tindak lanjut
- Review visual desktop, tablet, dan mobile.
- Perbaiki komposisi dan interaksi setelah masukan pemilik produk.
- Tentukan model jumlah Business Account dan identitas aktif sebelum backend dibuat.
- Rancang kontrak data/otorisasi untuk profil, bisnis, transaksi, notifikasi, Inbox, dan aktivitas sosial pada pekerjaan terpisah.
- Jalankan test, production build, CI, dan verifikasi deployment.

## Status akhir
UNDER-REVIEW — prototype awal dibuat untuk evaluasi; belum final/accepted.
