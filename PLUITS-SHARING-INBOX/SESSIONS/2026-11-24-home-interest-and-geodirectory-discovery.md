# PLUITS Home — Interest-led Recommendations and GeoDirectory Discovery

- Tanggal: 2026-11-24
- Topik: Perbedaan Rekomendasi untuk Anda dan Di Sekitar Anda
- Modul terkait: Social Home, GeoDirectory, Fluid Food, Jelajah
- Status: ACCEPTED — product-owner direction; service integrations remain pending

## Catatan dan keputusan
1. "Rekomendasi untuk Anda" menggantikan Top 10 sepenuhnya. Bagian ini berangkat dari minat/pengalaman pengguna, bukan ranking atau daftar tempat. Contoh minat: pantai, seafood, coffee & café, wisata keluarga, budaya, wellness.
2. Memilih minat membuka konteks discovery yang tepat. Minat Seafood mengarah ke pengalaman Fluid Food ketika modul Fluid Food tersedia. Fluid Food menampilkan makanan beserta penyedia/pemilik dan lokasi fisiknya; pengguna dapat memesan delivery/pickup atau mengunjungi tempat.
3. "Di Sekitar Anda" berbeda: pencarian berbasis lokasi untuk semua kategori yang terdaftar di GeoDirectory, bukan hanya kategori minat. Contoh kategori termasuk restoran, apotek, dokter gigi/klinik, toko, wisata, layanan dan lainnya.
4. Pencarian lokal dimulai pada radius 5 km. Jika hasil eligible/relevan tidak cukup, sistem memperluas jangkauan bertahap, misalnya 5–10 km. Home memberi ringkasan; "Lihat Semua" membuka Jelajah dengan radius yang dapat diubah pengguna dan cakupan wilayah lebih luas.
5. Minat tetap melekat pada pengguna saat berpindah kota/negara; konteks lokasi dan kandidat hasil berubah mengikuti lokasi aktif/terpilih dan izin lokasi.
6. Organic discovery harus adil: pertimbangkan jarak, relevansi, kualitas, ketersediaan, trust, dan kesempatan eksposur bagi mitra eligible/baru. Popularitas, jumlah pengikut, atau frekuensi posting tidak boleh menguasai seluruh hasil. Paid placement, jika kelak ada, wajib diberi label dan dipisahkan dari hasil organik.
7. Social Feed tetap identitas dan pengalaman utama PLUITS; discovery dan marketplace tidak mengambil alih prioritas sosial.

## Batas implementasi saat ini
- Home frontend menampilkan minat sebagai visual prompts dan kartu GeoDirectory sebagai structural preview yang diberi label.
- GPS live, provider/location data GeoDirectory, radius expansion service, ranking fairness, Fluid Food route/module, dan real merchant listings belum terhubung.
- Tidak ada data bisnis, jarak, rating, ulasan, transaksi atau engagement palsu yang dimasukkan ke backend.

## Hasil sortir
- Product Design: `src/features/home/PAGE-SOCIAL-HOME-001.md`.
- Runtime inventory: `src/features/home/HOME-CAROUSEL-REGISTRY.md`.
- Runtime: `src/features/home/home-page.js`, `src/features/home/home-page.css`.
- Regression: `tests/features/home-responsive-visuals.test.js`.
