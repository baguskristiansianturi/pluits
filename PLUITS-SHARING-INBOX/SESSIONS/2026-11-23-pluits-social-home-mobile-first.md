# PLUITS Social Home — Mobile-First Social and Local Discovery

- Tanggal: 2026-11-23
- Topik: Beranda Pengguna PLUITS, mobile-first
- Model/aplikasi terkait: Social Media, Marketplace, Geo Directory
- Status: ACCEPTED — arah komposisi prototype; integrasi data bertahap

## Catatan sharing
Pengguna meminta Beranda Pengguna ringkas dan jelas di mobile, dengan banyak carousel. Area sosial menjadi dominan (sekitar 70% prioritas konten). Urutan: orang yang mungkin dikenal, Story dari circle, tab Feed/Reels/Live/Blog, lalu kartu sosial full-width yang digulir vertikal. Tab hanya berlaku untuk area sosial dan tidak sticky. Setelah area sosial: discovery lokal, ringkasan produk lokal menuju Marketplace, layanan PLUITS, ringkasan Tentang PLUITS, dan navigasi bawah yang tetap tersedia. Marketplace diminta memulai discovery dari lokasi pengguna, dengan pilihan kota lain atau global.

## Keputusan eksplisit
- Urutan sosial: orang yang mungkin dikenal → Story → Feed/Reels/Live/Blog.
- Tab tidak sticky; konten sosial tersusun vertikal dan full-width pada mobile.
- Discovery lokal, produk lokal, layanan, dan About berada setelah area sosial.
- Marketplace diarahkan memakai lokasi pengguna sebagai cakupan awal dan memberi opsi kota/global.
- Navigasi bawah fixed dan safe-area aware.
- Fixture visual tetap ditandai demo sampai layanan data tersedia.

## Pertanyaan terbuka
- Integrasi lokasi/Geo Directory dan feed produk Marketplace belum tersedia pada halaman ini.
- Stories, Live, Blog, people suggestions, dan nearby masih memerlukan API/data contract.
- Uji visual pada perangkat Android pengguna masih diperlukan.

## Hasil penyortiran
- Product Design: `src/features/home/PAGE-SOCIAL-HOME-001.md`.
- Runtime: `src/features/home/home-page.js` dan `home-page.css`.
- Tidak ada perubahan backend, database, RLS, atau auth pada tahap ini.

## Tindak lanjut
Jalankan test/build, verifikasi deployment GitHub Pages, lalu lakukan UAT browser/device.

## Status akhir
ACCEPTED — struktur prototype; integrasi data dan penerimaan visual masih pending.


## 2026-11-23 — mobile layout correction
- Removed the accidental duplicated/nested `global-social-area` wrapper and duplicate People You May Know section.
- Moved the nearby-discovery section after the social feed, matching the approved page hierarchy.
- People You May Know uses a viewport-wide carousel track with a 5px initial card inset.
- Feed cards now break out of the constrained mobile content container; the list and card width are explicitly full-bleed.
- Quick-service search rail is compact and transparent; individual controls retain white fill, border, restrained radius, and touch height.
- Spacing from the quick-service rail to the location/search hero area is 30px.
- Added responsive regression assertions for wrapper count, card width, rail inset, compact controls, and spacing.
