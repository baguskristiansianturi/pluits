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

## Addendum — 2026-11-27: Personal account identity, badge hierarchy, and profile labels

This addendum narrows the current discussion back to personal-account levels and profile identity. Broader future ideas such as local radio live are separate long-term concepts, not part of the tier-level discussion itself.

### A. Separate personal accounts from business accounts

- The levels discussed in this session apply to personal user accounts.
- Business accounts are a separate product/account model and must be discussed independently.
- Business accounts will need operational modules that help merchants transact and sell through PLUITS.
- Those modules require ongoing maintenance and operating costs. PLUITS needs a fair, sustainable commercial model balancing merchant value and platform operating costs.
- Possible business monetization approaches remain open: transaction commission percentage, paid modules/features, or a staged/hybrid model.
- The user emphasized fairness and sequencing: first provide merchants with useful tools and help them gain value/revenue; then consider reasonable required module charges or limitations. No fee model or mandatory module has been approved.
- Do not mix business-module charges or business account entitlements into personal membership tiers.

### B. Personal badge and profile-label behavior

- In feed, comments, and compact post contexts, a recognizable icon/badge may be sufficient.
- On the profile page, show the icon together with an explicit text label/name for verification or membership status. A visitor should not have to guess what an unfamiliar symbol means.
- Exact icon artwork, shape, color, and typography are not decided. The user wants to determine whether to use icons, text, or both by context and how to source/design the icon set.

### C. Verification indicator semantics

- An unverified personal account should display a yellow exclamation-mark indicator as a caution cue.
- This indicator must not imply that the account owner is dangerous, fraudulent, or guilty of misconduct. It only tells other users that the account identity has not been verified and encourages appropriate caution.
- The user referenced online fraud risks, such as an unknown account initiating chats and later asking to borrow money, as the reason for making verification status legible.
- A verified account displays the verification checkmark.
- Verification is an identity-status signal, not a guarantee that the person is trustworthy or every interaction is safe.

### D. Verification inheritance in paid personal tiers

- To enter Silver or any higher membership tier, the account is expected to already be verified.
- Therefore, Silver and higher tiers should not display a separate Verified checkmark in addition to their tier badge; the tier itself is understood to imply that the verification prerequisite has been met.
- The exact status hierarchy and edge cases (expired verification, suspended membership, verification revocation, or account restrictions) still need definition.
- The existing tier name "Gold" is corrected as a naming preference to **"Golden"**. This is a preference recorded for the next naming review, not yet a complete final naming system.
- "Silver" may eventually use a fuller label such as "Silver Member"; this is an example only and remains undecided.
- Existing "Platinum" and "PLUITS Priority" labels remain in the working list. The user's spoken "Fluids Priority" is interpreted in this PLUITS context as PLUITS Priority, but final naming still needs confirmation.

### E. Working matrix for visual identity (not final artwork)

| Account status / level | Compact contexts (feed/comments) | Profile page |
|---|---|---|
| Unverified Regular | Yellow exclamation indicator | Indicator + explanatory text such as "Belum Terverifikasi" (wording to be reviewed) |
| Verified baseline account | Verification checkmark | Checkmark + "Verified" / "Terverifikasi" label (language to decide) |
| Silver | Silver membership icon; no separate verification check | Silver icon + explicit Silver label |
| Golden (preferred correction from Gold) | Golden membership icon; no separate verification check | Golden icon + explicit Golden label |
| Platinum | Platinum membership icon; no separate verification check | Platinum icon + explicit Platinum label |
| PLUITS Priority | Priority membership icon; no separate verification check | Priority icon + explicit PLUITS Priority label |

The icon family should be visually consistent and recognizable at small sizes, but each level should have a distinct silhouette or treatment. Do not finalize artwork or color values before comparing options in profile and compact feed/comment contexts.

### F. Open design questions

1. What exact icon shape and visual metaphor should represent each tier?
2. Should the label use "Silver", "Silver Member", or another name? Should "Golden" be used as the tier name or as part of a longer label?
3. How should the yellow unverified indicator be explained without stigmatizing the account owner?
4. What is the best visual balance between icon-only compact display and icon-plus-text profile display?
5. How should membership and verification appear if a membership expires or verification is revoked?
6. How should the system display an account that is verified but remains on the free/Regular level?

Status remains UNDER-REVIEW. This addendum records user direction and preferences; it does not authorize UI implementation.
