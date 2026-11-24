# Aturan Pengalaman Social Media PLUITS

Status: **DOKUMENTASI ATURAN BERDASARKAN IMPLEMENTASI DAN KEPUTUSAN PRODUK YANG SUDAH ADA**.

Folder ini merekam ritme, perilaku, batas, dan kontrak pengalaman Social Media PLUITS. Ini bukan spesifikasi desain ulang dan bukan pernyataan bahwa seluruh fitur telah selesai.

## Prinsip struktur

- Jumlah aturan tidak dibatasi empat, sepuluh, atau angka tertentu. Tambahkan dokumen/aturan baru ketika kebutuhan Social Media membutuhkannya.
- Struktur dokumentasi harus mengikuti domain, perilaku, dan siklus kerja Social Media; jangan memaksakan pola dokumentasi ekosistem lain.
- Aturan yang sudah disetujui dan perilaku website yang sedang berjalan harus dipertahankan. Perubahan desain atau perilaku hanya dilakukan melalui permintaan dan persetujuan perubahan tersendiri.
- Catat kondisi aktual, status prototype, status backend, dan pekerjaan yang belum tersedia secara terpisah.
- Aturan isolasi CSS dan runtime adalah bagian wajib tata kelola Social Media, meskipun istilah "isolasi" sebelumnya belum dicantumkan.
- Aturan ini menjadi panduan untuk pekerjaan berikutnya, bukan izin untuk mengubah website secara otomatis.

## Indeks aturan

1. [Batas ekosistem dan prinsip perubahan](01-BATAS-EKOSISTEM-DAN-PRINSIP-PERUBAHAN.md)
2. [Home, navigasi, dan kerangka pengalaman](02-HOME-NAVIGASI-DAN-KERANGKA-PENGALAMAN.md)
3. [Feed, distribusi, dan filter konten](03-FEED-DISTRIBUSI-DAN-FILTER-KONTEN.md)
4. [Kartu postingan dan interaksi sosial](04-KARTU-POSTINGAN-DAN-INTERAKSI-SOSIAL.md)
5. [Stories rail dan batas fitur Story](05-STORIES-RAIL-DAN-BATAS-FITUR-STORY.md)
6. [Profil, identitas, dan sampul](06-PROFIL-IDENTITAS-DAN-SAMPUL.md)
7. [Tab profil dan showcase bisnis](07-TAB-PROFIL-DAN-SHOWCASE-BISNIS.md)
8. [Bubble Connections](08-BUBBLE-CONNECTIONS.md)
9. [Discover dan rekomendasi pengguna](09-DISCOVER-DAN-REKOMENDASI-PENGGUNA.md)
10. [Messages dan komunikasi](10-MESSAGES-DAN-KOMUNIKASI.md)
11. [Settings, privasi, dan kejujuran status akun](11-SETTINGS-PRIVASI-DAN-STATUS-AKUN.md)
12. [API, data, dan batas prototipe](12-API-DATA-DAN-BATAS-PROTOTIPE.md)
13. [Fondasi visual dan kepemilikan CSS](13-FONDASI-VISUAL-DAN-KEPEMILIKAN-CSS.md)
14. [Aksesibilitas, responsivitas, dan performa](14-AKSESIBILITAS-RESPONSIVITAS-DAN-PERFORMA.md)
15. [Prosedur perubahan, pengujian, dan bukti](15-PERUBAHAN-PENGUJIAN-DAN-BUKTI.md)
16. [Isolasi CSS dan alur dependensi](16-ISOLASI-CSS-DAN-ALUR-DEPENDENSI.md)
17. [Peta runtime dan tahap migrasi isolasi](17-PETA-RUNTIME-DAN-TAHAP-MIGRASI-ISOLASI.md)

## Hubungan dengan modul konten

Blog, Reels, Stories, dan Live tetap menjadi modul konten mandiri. Aturan pengalaman Social Media ini mengatur permukaan aplikasi dan integrasinya; aturan internal lifecycle dan fitur tiap modul tetap dimiliki modul masing-masing.

Feed merupakan permukaan agregasi/distribusi, bukan pemilik lifecycle privat Blog, Reels, Stories, atau Live.

## Sumber kebenaran

Aturan ini disusun dengan memeriksa:
- Product Design Social Media: `../../02-PRODUCT-DESIGN/01-SOCIAL-MEDIA/README.md`
- Application Modularization Social Media: `../../03-APPLICATION-MODULARIZATION/01-SOCIAL-MEDIA/README.md`
- Implementasi Home: `src/features/home/home-page.js` dan `src/features/home/home-page.css`
- Implementasi halaman sosial: `src/features/social/social-pages.js` dan `src/features/social/social-pages.css`
- Kontrak kartu postingan: `src/features/home/SOCIAL-POST-CARD-INTERACTIONS-001.md`
- Integrasi route dan app: `src/config/paths.js` dan `src/app/create-app.js`

Jalur dan isi sumber tersebut harus diverifikasi ulang saat ada perubahan. Jangan menganggap dokumen ini menggantikan kode atau kontrak teknis yang lebih baru.

18. [Audit kepemilikan domain dan isolasi runtime](18-AUDIT-KEPEMILIKAN-DOMAIN-DAN-ISOLASI-RUNTIME.md)

Aturan 18 adalah snapshot audit teknis dan definition of done. Status audit statis, browser baseline, migrasi runtime, serta implementasi Blog wajib dilaporkan terpisah.
