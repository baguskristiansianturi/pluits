# Create PLUITS — Mobile Social-First and Desktop Workspace

- Tanggal: 2026-11-23
- Topik: Penyederhanaan Create pada mobile dan pemisahan pengalaman desktop
- Model/aplikasi terkait: Social Media, Platform Wrapper, Ruang Kerja
- Status: ACCEPTED

## Catatan sharing
Pengguna menilai tampilan Create di mobile sebelumnya terlalu kompleks. Pengalaman mobile harus sederhana, lengkap, rapi, dan mengutamakan aktivitas sosial harian. Create di desktop tetap menjadi Dashboard/Ruang Kerja profesional yang dapat berkembang untuk mendukung pekerjaan.

## Masalah/kebutuhan yang muncul
- Mobile tidak boleh menjadi dashboard desktop yang diperkecil.
- Aktivitas sosial harus berada paling atas karena sering digunakan setiap hari.
- Akses sosial mencakup Story, Post, Reel, Live, dan Blog.
- Fitur produktivitas profesional di masa depan mencakup pengolah dokumen seperti Word, presentasi, invoice, desain gambar, bingkai/template konten pribadi, dan file kerja.
- Modul yang belum menjadi prioritas harus ditambahkan bertahap, bukan memenuhi tampilan awal.

## Ide atau opsi yang dibahas
- Mobile: judul Create, empat akses cepat Story/Post/Reel/Live, lalu Blog sebagai pintu publikasi artikel. Fitur lain tidak ditampilkan pada tahap awal.
- Desktop: Dashboard/Ruang Kerja profesional dengan navigasi dan area kerja yang lebih luas.
- Satu akun dan identitas PLUITS digunakan lintas pengalaman; layout responsif boleh berbeda.

## Keputusan eksplisit
- Create mobile memakai komposisi social-first yang ringkas.
- Story, Post, Reel, Live menjadi empat akses cepat utama.
- Blog tetap disertakan sebagai akses pembuatan/pengelolaan artikel.
- Fitur produktivitas lain dan modul tambahan disembunyikan dari pengalaman mobile awal dan ditambahkan bertahap ketika siap.
- Desktop Create tetap merupakan Dashboard/Ruang Kerja profesional.
- Tidak menghapus backend, data, route, atau modul lain yang sudah ada hanya untuk menyederhanakan tampilan mobile.
- Implementasi saat ini hanya mengubah presentasi frontend; ketersediaan composer/publikasi tetap mengikuti kesiapan layanan backend.

## Pertanyaan terbuka / konflik
- Alur composer Story/Post/Reel/Live dan Blog akan diselesaikan sesuai kesiapan layanan masing-masing.
- Daftar modul produktivitas desktop akan diperluas bertahap melalui keputusan produk berikutnya.

## Hasil penyortiran
- Product Design: `PLUITS-MASTER-MODEL-APP/02-PRODUCT-DESIGN/01-SOCIAL-MEDIA/CREATE-EXPERIENCE-001.md`
- Runtime: `src/features/dashboard/dashboard-page.js`, `src/features/dashboard/dashboard-page.css`
- Runtime mapping: `src/CHANGE-MAP.md`
- Dashboard module guidance: `src/features/dashboard/README.md`

## Tindak lanjut
- Uji tampilan mobile pada lebar 360px, 390px, 420px dan desktop.
- Pastikan desktop workspace lama tidak rusak.
- Lanjutkan composer hanya setelah alur dan layanan backend siap.

## Status akhir
ACCEPTED
