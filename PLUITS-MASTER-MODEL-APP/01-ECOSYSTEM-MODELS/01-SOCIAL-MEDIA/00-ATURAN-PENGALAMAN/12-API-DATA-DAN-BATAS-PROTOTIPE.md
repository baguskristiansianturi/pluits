# Aturan 12 — API, Data, dan Batas Prototipe

## Social Feed API — slice yang sudah didokumentasikan
- PostgreSQL migration `000008_social_posts.sql` memiliki tabel `pluits.social_posts`.
- Anggota terautentikasi dapat membuat postingan teks dengan visibilitas public atau private.
- Endpoint: `GET /v1/social/feed`, `GET /v1/social/posts/me`, `POST /v1/social/posts`.
- Pembuatan posting dibatasi per akun dan caption divalidasi 1–5.000 karakter Unicode.
- Feed publik mengecualikan akun tidak aktif dan profil privat.
- Postingan privat hanya tersedia melalui endpoint pemilik terautentikasi.
- Profil Feed membaca postingan milik pengguna yang sedang login dari endpoint `/v1/social/posts/me`, menggunakan Bearer token dari sesi first-party.

## Di luar slice saat ini
Media, Reels, Stories, Blog, komentar, reaction, audience follower-only, moderation, dan realtime tidak termasuk implementasi API slice tersebut sampai kontrak dan implementasinya dibuat.

## Aturan
1. Verifikasi kode, migrasi, route, dan test sebelum menyatakan endpoint atau tabel tersedia.
2. Identitas pemilik dan authorization harus diverifikasi server-side.
3. Jangan mempercayai filter ownership dari client.
4. Escape konten pengguna saat dirender dan validasi input di server.
5. Abort request ketika halaman dilepas bila relevan; tangani error dan loading secara eksplisit.
6. Jangan mencampur data demo, data cache, dan data backend tanpa pemisahan sumber yang jelas.
7. Prototype gift wallet, komentar, reaction, save/hide/report, dan interaksi lokal bukan transaksi atau persistence produksi.
8. Setiap perluasan API memerlukan kontrak schema, auth, privacy, rate limit, error semantics, migration, tests, dan rollout plan.
