# PLUITS Social — External Streaming Partnership and Membership Entitlements

- **Tanggal:** 2026-11-27
- **Status:** UNDER-REVIEW
- **Jenis catatan:** Gagasan model kemitraan dan integrasi; belum menjadi komitmen bisnis atau spesifikasi teknis final.
- **Ruang lingkup:** Integrasi membership PLUITS dengan layanan streaming pihak ketiga, identitas pengguna, hak akses perangkat, kualitas streaming, dan kemungkinan membangun alternatif sendiri.

## 1. Arah utama: integrasi mitra, bukan membuat klon Netflix

### Gagasan pengguna
PLUITS tidak harus membuat layanan streaming film kedua atau menyalin katalog dan aplikasi Netflix. Pilihan awal yang ingin dieksplorasi adalah bekerja sama dengan penyedia streaming yang sudah memiliki katalog dan infrastruktur, lalu mengintegrasikan status membership PLUITS dengan sistem mitra.

Contoh yang disebut pengguna adalah pola login melalui layanan identitas lain seperti Facebook, Google, atau Twitch. Dalam gambaran PLUITS, layanan mitra dapat mengenali akun PLUITS dan mengetahui tier membership pengguna, kemudian menerapkan hak akses yang telah disepakati.

Tujuan model:
- PLUITS menawarkan nilai membership tambahan melalui kemitraan.
- Mitra streaming tetap menyediakan layanan, konten, aplikasi, dan infrastrukturnya.
- PLUITS menjadi sumber identitas dan/atau status membership yang dapat diverifikasi.
- Hak akses dapat dibedakan menurut tier, perangkat, resolusi, dan batas pemakaian apabila disetujui oleh mitra.
- Kemitraan bukan asumsi bahwa Netflix atau penyedia lain pasti bersedia. Kesediaan, kelayakan teknis, model komersial, dan kontrak perlu dibuktikan.

## 2. Gambaran pengalaman pengguna

1. Pengguna memiliki akun PLUITS dan membership aktif.
2. Pengguna membuka layanan mitra dan menghubungkan atau masuk menggunakan identitas PLUITS, jika mitra menyediakan metode tersebut.
3. Sistem mitra memverifikasi identitas dan status membership melalui integrasi resmi.
4. Sistem mitra menerapkan entitlement/hak akses yang telah disepakati dalam kontrak.
5. Pengguna menikmati layanan sesuai tier dan ketentuan mitra.

Contoh ilustratif yang disampaikan pengguna:
- Silver mungkin hanya memperoleh akses melalui ponsel dan batas resolusi tertentu.
- Platinum mungkin memperoleh akses pada TV, PC, dan ponsel.
- Tier lain dapat memiliki kombinasi perangkat, kualitas, atau batas lain.

**Contoh Silver dan Platinum di atas bukan matriks hak akses final.** Semua batasan harus dinegosiasikan dan divalidasi bersama penyedia streaming.

## 3. Catatan teknis penting: login tidak otomatis memberikan hak membership

Login federasi/SSO dan pengakuan entitlement merupakan dua hal yang berbeda:
- SSO/OIDC/OAuth dapat membantu mitra mengenali atau menghubungkan identitas akun PLUITS.
- Agar mitra mengetahui tier Silver/Gold/Platinum/Priority, diperlukan mekanisme resmi untuk menyampaikan dan memverifikasi entitlement, misalnya token klaim yang ditandatangani atau API entitlement dengan masa berlaku dan pencabutan akses.
- Mitra harus secara eksplisit membangun integrasi dan menyetujui arti setiap tier.
- Sekadar menambahkan tombol “Login dengan PLUITS” tidak otomatis membuat mitra mengubah batas perangkat, resolusi, katalog, atau biaya langganannya.

## 4. Ruang lingkup negosiasi kemitraan

Sebelum benefit diumumkan, PLUITS perlu mengetahui:
- Apakah mitra menerima identitas federasi atau login PLUITS.
- Apakah mitra bersedia menerima PLUITS sebagai sumber status membership.
- Apakah benefit berupa akses yang disubsidi PLUITS, bundling, diskon, paket khusus, atau pembagian pendapatan.
- Hak perangkat: ponsel, PC, TV, tablet, dan jumlah perangkat aktif.
- Batas resolusi/kualitas video, jumlah stream serentak, dan pembatasan lokasi/rumah tangga.
- Katalog, wilayah, masa berlaku, batas usia, dan hak tayang.
- Siapa yang menagih pengguna, menangani pembatalan, refund, dukungan pelanggan, dan sengketa.
- Cara sinkronisasi status membership: upgrade, downgrade, kedaluwarsa, gagal bayar, pembatalan, dan pencabutan.
- Keamanan, privasi, minimisasi data, dan persetujuan pengguna.
- Biaya lisensi/kemitraan, biaya teknis, dukungan, pajak, dan proyeksi margin.

## 5. Alternatif jika kemitraan tidak tercapai

Pengguna menyampaikan bahwa PLUITS dapat mempertimbangkan membangun sistem atau pasar sendiri apabila penyedia besar tidak bersedia bekerja sama.

Catatan kehati-hatian:
- Ini adalah opsi strategis jangka panjang, bukan keputusan untuk langsung membangun klon Netflix.
- Membangun layanan sendiri membutuhkan hak distribusi/tayang konten, hubungan dengan studio/distributor, katalog, aplikasi pemutar, streaming delivery/CDN, DRM bila diwajibkan, moderasi dan klasifikasi usia, subtitle, dukungan perangkat, serta biaya operasional.
- PLUITS harus membandingkan biaya dan risiko membangun sendiri dengan kemitraan, agregator, atau kerja sama dengan beberapa penyedia.
- Tidak boleh mengasumsikan akses ke film hanya karena pengguna memiliki membership PLUITS.

## 6. Prinsip produk

1. Utamakan kemitraan dan integrasi resmi sebelum membangun layanan streaming sendiri.
2. PLUITS dapat berperan sebagai penyedia identitas dan membership entitlement, sedangkan mitra tetap mengendalikan layanan streaming dan hak kontennya.
3. Perbedaan benefit tier dapat mencakup perangkat, resolusi, atau batas pemakaian hanya jika mitra menyetujui secara tertulis dan sistem mampu menegakkannya.
4. Jangan mengumumkan benefit streaming sebagai fasilitas aktif sebelum ada perjanjian, hak, integrasi, dan perhitungan biaya.
5. Jika kemitraan tidak tercapai, evaluasi alternatif secara rasional berdasarkan pasar, hak konten, modal, dan kemampuan operasional.

## 7. Status keputusan dan pertanyaan terbuka

- **Sudah menjadi arah eksplorasi:** tidak perlu membuat klon Netflix sebagai langkah pertama; eksplorasi integrasi dengan penyedia yang sudah ada.
- **Belum diputuskan:** mitra tertentu, termasuk Netflix; skema login; skema entitlement; benefit per tier; batas perangkat/resolusi; model pembayaran; dan biaya.
- **Belum disetujui:** membangun layanan streaming PLUITS sendiri.
- **Tindak lanjut:** riset kelayakan teknis dan bisnis, identifikasi calon mitra, estimasi biaya, skema komersial, serta desain entitlement lintas tier.
- Dokumen ini adalah catatan sharing UNDER-REVIEW, bukan instruksi implementasi.
