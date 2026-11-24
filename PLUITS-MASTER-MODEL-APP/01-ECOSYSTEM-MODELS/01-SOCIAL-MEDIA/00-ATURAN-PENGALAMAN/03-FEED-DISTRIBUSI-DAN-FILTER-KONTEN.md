# Aturan 03 — Feed, Distribusi, dan Filter Konten

## Peran Feed
Feed adalah permukaan agregasi/distribusi konten. Feed boleh menampilkan konten dari sumber berbeda melalui kontrak konten dan render yang eksplisit, tetapi tidak memiliki state machine internal modul sumber.

## Perilaku Home yang teridentifikasi
- Home menampilkan area pengantar, rail Stories, area discovery/rekomendasi, filter konten, dan stream postingan.
- Filter Home saat ini mencakup Semua, Reel, Blog, dan Live.
- Filter mengatur visibilitas konten yang telah dirender; filter bukan bukti bahwa seluruh tipe konten telah memiliki backend.
- Tombol muat lebih banyak menampilkan batch kartu demo yang disembunyikan dan kemudian dapat mengarahkan pengguna ke Discover.
- Feed API saat ini merupakan slice text-post; detail kontraknya dicatat pada aturan API/data dan Application Modularization.

## Aturan
1. Pertahankan struktur dan tampilan Feed yang ada kecuali ada permintaan desain terpisah.
2. Feed tidak boleh mengambil alih editorial Blog, playback Reels, expiry Stories, atau lifecycle sesi Live.
3. Setiap sumber konten harus membawa referensi, identitas pemilik, visibilitas, jenis konten, dan tujuan deep link sesuai kontrak yang disepakati.
4. Terapkan audience/privacy filtering sebelum konten dikirim atau ditampilkan; jangan mengandalkan filter visual sebagai kontrol akses.
5. Data demo harus tetap diberi label dan tidak boleh dicampur sebagai engagement nyata.
6. Perubahan ranking, urutan, rekomendasi, pagination, refresh, atau filter harus memiliki aturan dan acceptance criteria tersendiri.
7. Jangan menyatakan tab atau filter sebagai fitur produksi bila konten yang ditampilkan masih fixture.
