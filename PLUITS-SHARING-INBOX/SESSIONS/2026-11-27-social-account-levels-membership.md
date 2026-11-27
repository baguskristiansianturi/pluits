# PLUITS Social — Account Levels, Membership Status, and Exclusive Social Experiences

- Tanggal: 2026-11-27
- Topik: Tingkatan akun sosial, membership berbayar, pengakuan status, privasi, dan lingkungan eksklusif
- Model/aplikasi terkait: Social Media; Master Foundation — Identity & Membership; Shared Platform Services (potential)
- Status: UNDER-REVIEW

## Tujuan dokumen

Menjadi catatan audit dan wadah spesifikasi untuk seluruh tingkatan akun sosial PLUITS. Dokumen ini mengumpulkan gagasan, aturan, hak istimewa, batasan, harga, dan pertanyaan untuk setiap tingkat sebelum ada keputusan final dan sebelum implementasi frontend/backend.

**Dokumen ini bukan instruksi coding.** Tidak ada fitur yang boleh dibangun hanya berdasarkan catatan mentah ini. Gagasan harus ditinjau dan diberi status terlebih dahulu.

## Catatan sharing — gagasan yang disampaikan

Pengguna ingin membedakan tingkatan akun di dalam Social Media PLUITS. Tujuannya bukan hanya verifikasi atau pengaturan akun privat, melainkan menciptakan perbedaan status keanggotaan dan pengalaman sosial yang terasa nyata.

Privasi dasar tetap dapat digunakan oleh akun biasa. Akun biasa yang diprivat dapat membatasi siapa yang melihat feed dan kontennya, sementara profil dasar seperti foto/profil, pengikut, dan bio dapat tetap terlihat sesuai pengaturan yang nantinya ditentukan. Karena itu, privasi dasar tidak boleh menjadi satu-satunya pembeda antara membership.

Pengguna juga membayangkan lingkungan sosial yang lebih eksklusif: anggota pada tingkatan tertentu dapat memiliki ruang atau kesempatan untuk berinteraksi dengan sesama anggota di tingkat tertentu. Contoh yang diberikan: anggota Platinum menyukai postingan akun biasa lalu berkomentar; lencana Platinum tetap terlihat di profil/identitas komentarnya sehingga pengguna lain dapat mengenali status membership tersebut.

Tingkatan membership dipandang sebagai identitas/status sosial di dalam PLUITS, bukan sekadar ornamen lencana. Pengguna ingin anggota pada level tertentu memperoleh power atau keistimewaan lebih, tetapi bentuk hak istimewa tersebut belum dirinci.

## Struktur tingkat akun — baseline untuk diaudit

Pisahkan **status verifikasi identitas** dari **tingkat membership**. Keduanya tidak boleh diasumsikan sebagai satu hal yang sama.

### Status identitas / verifikasi
- Belum terverifikasi: status identitas akun belum diverifikasi.
- Terverifikasi (Verified): identitas akun telah melalui proses verifikasi yang ditentukan PLUITS.
- Aturan verifikasi, bukti yang diperlukan, proses peninjauan, masa berlaku, dan banding: BELUM DIPUTUSKAN.

### Tingkat membership sosial
Urutan nama yang disampaikan pengguna:
1. Regular / akun biasa — baseline akun sosial; dapat memiliki status belum terverifikasi atau terverifikasi (hubungan pastinya perlu ditetapkan).
2. Silver
3. Gold
4. Platinum
5. PLUITS Priority

Catatan: istilah "Fluid Priority" sempat disebut dalam percakapan/dikte, tetapi nama produk PLUITS yang digunakan dalam dokumentasi ini adalah **PLUITS Priority**. Konfirmasi final penamaan tetap terbuka.

## Audit per tingkat

Setiap tingkat wajib memiliki spesifikasi tersendiri. Gunakan bidang audit yang sama agar perbedaan dan kenaikan manfaat dapat dibandingkan secara konsisten.

| Bidang audit | Regular | Silver | Gold | Platinum | PLUITS Priority |
|---|---|---|---|---|---|
| Harga bulanan | Gratis/baseline — perlu konfirmasi | Rp99.000 (gagasan awal) | Rp120.000–150.000 (gagasan awal) | Rp250.000 (gagasan awal) | Rp490.000 (gagasan awal) |
| Lencana/status yang terlihat | Belum ditetapkan | Belum ditetapkan | Belum ditetapkan | Belum ditetapkan | Belum ditetapkan |
| Lingkungan/komunitas eksklusif | Belum ditetapkan | Belum ditetapkan | Belum ditetapkan | Belum ditetapkan | Belum ditetapkan |
| Hak interaksi dan partisipasi | Belum ditetapkan | Belum ditetapkan | Belum ditetapkan | Belum ditetapkan | Belum ditetapkan |
| Privasi dan kontrol audiens | Privasi dasar tetap tersedia (gagasan) | Belum ditetapkan | Belum ditetapkan | Belum ditetapkan | Belum ditetapkan |
| Visibilitas profil dan komentar | Belum ditetapkan | Belum ditetapkan | Belum ditetapkan | Belum ditetapkan | Belum ditetapkan |
| Power/keistimewaan | Baseline | Belum ditetapkan | Belum ditetapkan | Belum ditetapkan | Belum ditetapkan |
| Batasan dan perlindungan penyalahgunaan | Belum ditetapkan | Belum ditetapkan | Belum ditetapkan | Belum ditetapkan | Belum ditetapkan |
| Syarat memperoleh/menjaga status | Belum ditetapkan | Belum ditetapkan | Belum ditetapkan | Belum ditetapkan | Belum ditetapkan |
| Upgrade, downgrade, pembatalan | Belum ditetapkan | Belum ditetapkan | Belum ditetapkan | Belum ditetapkan | Belum ditetapkan |

## Harga — catatan awal, bukan keputusan

| Tingkat | Harga bulanan yang disebutkan | Status |
|---|---:|---|
| Regular | Belum ditetapkan; diasumsikan baseline gratis untuk keperluan diskusi | OPEN |
| Silver | Rp99.000 | PROPOSED |
| Gold | Rp120.000–150.000 | PROPOSED — rentang belum diputuskan |
| Platinum | Rp250.000 | PROPOSED |
| PLUITS Priority | Rp490.000 | PROPOSED |

Mata uang diasumsikan Rupiah (IDR) berdasarkan konteks percakapan. Siklus tagihan, pajak, biaya platform, trial, refund, dan harga tahunan belum dibahas.

## Prinsip dan batasan yang sudah muncul dalam sharing

- Privasi dasar bukan hak eksklusif membership berbayar; akun biasa juga dapat mengatur akun privat.
- Verifikasi identitas dan membership berbayar harus diaudit sebagai dua dimensi berbeda.
- Lencana membership harus tetap terbaca ketika anggota berinteraksi di konten akun lain, termasuk komentar.
- Status membership dimaksudkan untuk memberi identitas sosial dan pengalaman/keistimewaan yang berbeda.
- Gagasan lingkungan eksklusif perlu dirinci per tingkat; jangan menganggap semua tingkat otomatis dapat mengakses ruang yang sama.
- Jangan mengunci atau mengurangi keamanan, perlindungan, atau kontrol privasi dasar akun hanya karena pengguna berada pada tingkat gratis.
- Tidak ada aturan, harga, atau hak istimewa yang boleh ditandai final tanpa persetujuan eksplisit pengguna.

## Pertanyaan terbuka untuk sesi sharing berikutnya

1. Apakah Regular dan Verified merupakan dua status pada tier dasar, atau Verified hanya atribut verifikasi yang dapat melekat pada semua tier?
2. Apakah anggota Silver, Gold, Platinum, dan PLUITS Priority memiliki komunitas/ruang terpisah, atau akses bertingkat ke ruang yang sama?
3. Apakah eksklusivitas didasarkan pada tier yang sama, tier minimum, undangan, atau kombinasi?
4. Apa arti konkret "power lebih" pada tiap tingkat — hak partisipasi, akses, visibilitas, layanan, kontrol, atau hal lain?
5. Apakah membership dapat dibeli siapa saja, atau ada syarat kelayakan/undangan untuk tingkat tertentu?
6. Apakah lencana menunjukkan tier aktif secara real-time dan bagaimana tampilannya pada komentar, profil, feed, live, dan pesan?
7. Apakah harga yang disebut adalah harga final bulanan atau angka perkiraan awal?
8. Apa aturan saat pembayaran gagal, membership berakhir, downgrade, refund, atau akun terkena sanksi?
9. Bagaimana memastikan status berbayar tidak memberi kemampuan untuk mengintimidasi, membungkam, atau mengalahkan hak dasar pengguna lain?

## Status keputusan

- Nama tier dan urutan: RECORDED FROM SHARING; finalisasi masih terbuka.
- Harga: PROPOSED; belum final.
- Privasi dasar tersedia untuk akun biasa: RECORDED PRINCIPLE; detail kontrol belum ditentukan.
- Lencana terlihat dalam interaksi lintas akun: RECORDED EXAMPLE / DIRECTION; aturan UI belum final.
- Ruang sosial eksklusif dan hak istimewa bertingkat: CONCEPT; mekanisme belum ditentukan.
- Implementasi frontend/backend: NOT AUTHORIZED BY THIS NOTE; menunggu spesifikasi selesai dan disetujui.

## Hasil penyortiran

- Master Foundation — Identity & Membership: menunggu audit dan persetujuan.
- Ecosystem Model — Social Media: menunggu audit dan persetujuan.
- Product Design — Social Profile, Feed, Comments, Membership Experiences: menunggu audit dan persetujuan.
- Application Modularization / backend contracts: belum boleh diturunkan sebelum aturan produk disepakati.

## Tindak lanjut

Lanjutkan sesi sharing. Tambahkan setiap aturan ke tingkat yang sesuai dan perbarui tabel audit. Pertahankan status PROPOSED / OPEN / RECORDED sampai pengguna secara eksplisit menyetujui keputusan. Setelah seluruh tingkat diaudit, buat ringkasan perbandingan dan minta/rekam persetujuan sebelum memindahkan spesifikasi ke dokumen kanonis dan memulai implementasi.
