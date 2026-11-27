# PLUITS Social — Membership Access, Exclusive Content, Friend Discovery, and Visitor Intelligence

- Tanggal: 2026-11-27
- Topik: Hak akses feed lintas-tier, hiburan eksklusif, pencarian teman, jejak kunjungan, analitik aktivitas, dan mode samaran
- Model terkait: Social Media; Master Foundation — Identity & Membership; GeoDirectory / Places; potential licensed entertainment service
- Status: UNDER-REVIEW

**Status dokumen:** Catatan gagasan mentah dan usulan untuk diaudit. Bukan spesifikasi final dan bukan instruksi coding. Tidak ada implementasi yang diotorisasi.

## 1. Relasi sosial: follower dan pertemanan

**RECORDED**
- Semua tingkat akun boleh mengikuti akun dari tingkat mana pun; semua tingkat boleh menjadi follower akun tingkat mana pun.
- Jumlah follower tetap menjadi bagian dari dinamika sosial; membership tidak membatasi siapa boleh mengikuti siapa.
- Pertemanan berdasarkan permintaan dan persetujuan; penerima bebas menerima atau menolak.
- Membership tidak memberi hak memaksa follow atau pertemanan.

**OPEN:** Bedakan follow satu arah, friend/mutual connection, akun privat, blokir, mute, pembatasan interaksi, dan anti-spam.

## 2. Visibilitas postingan di feed berdasarkan tier

**RECORDED:** Pemilik postingan dari tier lebih tinggi mungkin dapat membatasi tier yang lebih rendah agar tidak melihat postingan di feed/beranda, bahkan jika mereka berteman. Akses ditentukan oleh izin pemilik konten.

**PROPOSED — belum disetujui:** Setiap postingan dapat memiliki audiens seperti publik, follower, teman, tier minimum, atau daftar khusus. Feed, pencarian, direct link, notifikasi, preview, repost, dan cache media harus sama-sama menghormati aturan akses. Relasi pertemanan tidak otomatis mengalahkan batas audiens.

**OPEN:** Apakah pemilik memilih tier minimum, tier tertentu, beberapa tier, atau individu? Apakah pembatasan berlaku di profil, komentar, mention, share, dan tautan langsung? Apa yang terjadi jika tier berubah atau akses dicabut?

## 3. Hiburan / katalog film-video khusus membership

**RECORDED:** Pengguna mempertimbangkan katalog film/video sebagai fasilitas dalam paket membership PLUITS. Anggota membayar membership PLUITS, bukan langganan layanan streaming eksternal secara terpisah. Bukan bermaksud membuat salinan Netflix, melainkan menjadikan hiburan sebagai salah satu benefit melalui kerja sama dengan pemilik film/distributor.

**FEASIBILITY REVIEW:** Hak tayang memerlukan lisensi/kontrak, wilayah, masa tayang, model monetisasi, dan persetujuan pemilik hak. Membership tidak otomatis memberi hak distribusi. Audit biaya lisensi, bandwidth/CDN, DRM, perangkat, subtitle, rating usia, parental controls, dan pembatasan wilayah. Jangan menjanjikan benefit sebelum hak tayang dan kemitraan tersedia.

**OPEN:** Tier mana yang mendapat katalog? Apakah termasuk harga atau add-on? Film, serial, video kreator, live, atau campuran? Bagaimana pembagian pendapatan dan perlindungan hak cipta?

## 4. Friend Discovery — pencarian teman berbasis kecocokan

**RECORDED:** Algoritma terinspirasi pola matching seperti Tinder, tetapi bukan untuk mencari jodoh/pasangan. Tujuan utamanya menemukan teman yang cocok untuk berkenalan. Pertemuan dapat dihubungkan dengan tempat yang terdaftar di PLUITS; pengguna juga boleh memasukkan tempat pilihannya sendiri.

**OPEN:** Sinyal kecocokan (minat, aktivitas, bahasa, komunitas, jarak); kontrol keterlihatan; persetujuan sebelum chat/pertemuan; report, block, anti-spam, dan keselamatan. Rekomendasi Place/GeoDirectory menjadi opsi, bukan paksaan. Tempat terdaftar perlu dibedakan dari lokasi bebas. Hindari inferensi atribut sensitif.

## 5. Gold — jejak kunjungan profil

**RECORDED:** Mulai Gold, anggota mendapat ikon jejak kaki/visitor indicator dan notifikasi bahwa seseorang baru mengunjungi profilnya, misalnya "beberapa menit yang lalu", bukan jam yang sangat presisi. Daftar kunjungan berlaku harian/bergulir dan diperbarui; durasi reset tepatnya belum ditentukan. Silver tidak memiliki fitur melihat siapa pengunjung profilnya. Gold melihat profil Silver tidak perlu mode samaran karena Silver tidak punya visitor feature.

**OPEN:** Definisi kunjungan (sekadar buka profil atau durasi minimum); kunjungan berulang; bot; blokir; periode retensi 24 jam vs reset harian zona waktu; opt-out; dan apakah hanya pemilik profil yang dapat melihat daftar.

## 6. Platinum dan Priority — mode samaran

**RECORDED / perlu klarifikasi:** Platinum dapat mengaktifkan mode samaran saat melihat profil Gold sehingga Gold tidak menerima notifikasi/indikator kunjungan. Priority memiliki mode samaran lebih tinggi: Priority dapat melihat Platinum tanpa terdeteksi. Contoh yang diberikan: Gold tidak dapat melihat kunjungan Platinum yang menggunakan mode samaran; Platinum tidak dapat melihat kunjungan Priority yang menggunakan mode samaran.

**Matriks interpretasi awal — PROPOSED, bukan final**

| Pengunjung | Profil yang dikunjungi | Perilaku yang dibayangkan |
|---|---|---|
| Gold | Silver | Silver tidak punya visitor feature; tidak ada pemberitahuan |
| Platinum | Gold | Dapat memilih samaran; Gold tidak melihat identitas kunjungan saat aktif |
| Priority | Platinum | Dapat memilih samaran; Platinum tidak melihat identitas kunjungan saat aktif |
| Priority | Gold / Silver / Regular | OPEN |
| Gold | Platinum / Priority | OPEN |
| Regular / Silver | Gold / Platinum / Priority | OPEN |

Mode samaran harus berupa pilihan yang jelas. Jangan menjanjikan anonimitas mutlak: like, komentar, follow, pesan, RSVP, dan interaksi lain dapat mengungkap identitas. Mode ini hanya berlaku pada sinyal kunjungan profil yang didefinisikan; tidak boleh melewati blokir, membuka konten privat, atau menghilangkan perlindungan keselamatan. Data untuk keamanan/anti-penyalahgunaan perlu dijelaskan.

## 7. Priority — analitik aktivitas pengunjung

**RECORDED:** Pengguna membayangkan Priority dapat melihat insight lebih rinci: konten/foto mana yang dilihat, apakah pengunjung scrolling atau berhenti pada konten/video, berapa kali video diputar ulang, dan apakah ada percobaan screenshot.

**FEASIBILITY REVIEW / privasi:**
- Analitik agregat (views, durasi tonton, completion, replay, interaksi) lebih realistis daripada identifikasi aktivitas per individu.
- Pelacakan individu yang sangat rinci menimbulkan risiko privasi dan penyalahgunaan. Perlu transparansi, tujuan terbatas, minimisasi data, retensi, kontrol pengguna, dan tinjauan hukum.
- Web/browser umumnya tidak menyediakan sinyal screenshot universal yang andal; kemampuan OS berbeda-beda. Jangan menjanjikan deteksi screenshot sebelum validasi per platform.
- Bedakan screenshot yang benar-benar terdeteksi dari dugaan percobaan screenshot; sistem mungkin tidak mengetahui niat atau percobaan gagal.
- Jangan mengumpulkan isi layar, aktivitas di luar PLUITS, keylogging, atau data perangkat yang tidak diperlukan.
- Pertimbangkan apakah Priority mendapat insight agregat atau data individu yang secara eksplisit disetujui/ditampilkan.

**OPEN:** Agregat atau per akun? Insight tingkat postingan atau pengunjung? Retensi? Opt-out? Pencegahan stalking/intimidasi? Fitur apa yang benar-benar didukung Android, iOS, dan web?

## 8. Ringkasan awal per tier

| Area | Regular | Silver | Gold | Platinum | PLUITS Priority |
|---|---|---|---|---|---|
| Follow lintas-tier | Diizinkan (gagasan) | Diizinkan | Diizinkan | Diizinkan | Diizinkan |
| Friend request lintas-tier | Persetujuan penerima | Sama | Sama | Sama | Sama |
| Batas audiens postingan | OPEN | OPEN | OPEN | OPEN | OPEN |
| Hiburan membership | Tidak menurut contoh awal; belum final | OPEN | OPEN | OPEN | OPEN |
| Friend Discovery | OPEN | OPEN | OPEN | OPEN | OPEN |
| Visitor identity | Tidak ditentukan | Tidak ada feature menurut arah awal | Visitor indicator | Visitor + stealth | Analitik lebih rinci + stealth |
| Analitik engagement | OPEN | OPEN | Kunjungan sederhana | OPEN | Insight lebih rinci (konsep) |
| Screenshot detection | Tidak ditentukan | Tidak ditentukan | Tidak ditentukan | Tidak ditentukan | Konsep; feasibility belum terbukti |

## 9. Prinsip audit lintas fitur

- Membership menentukan benefit, bukan menghapus hak dasar, keselamatan, atau privasi pengguna lain.
- Kontrol audiens harus ditegakkan pada semua jalur akses, bukan hanya menyembunyikan kartu feed.
- Follow dan pertemanan lintas-tier tetap tunduk pada persetujuan dan kontrol akun.
- Visitor analytics harus transparan, proporsional, aman, dan punya retensi jelas.
- Mode samaran tidak boleh menjadi bypass blokir, batas konten, atau proteksi keselamatan.
- Streaming hanya boleh ditawarkan setelah lisensi diperoleh.
- Friend Discovery berorientasi pada pertemanan, consent, dan keselamatan.
- Fitur yang tidak dapat dijamin secara teknis tidak boleh dijual sebagai benefit pasti.

## 10. Pertanyaan prioritas / tindak lanjut

1. Aturan persis siapa dapat melihat postingan tier lain?
2. Benefit hiburan apa untuk tiap tier?
3. Matriks visitor dan mode samaran untuk semua pasangan tier?
4. Priority mendapat analitik individu atau agregat?
5. Apa batas privasi yang tidak boleh ditembus tier mana pun?

Semua gagasan tetap UNDER-REVIEW. Jangan pindahkan ke spesifikasi kanonis atau implementasikan sebelum pengguna menyetujui aturan dan acceptance criteria.
