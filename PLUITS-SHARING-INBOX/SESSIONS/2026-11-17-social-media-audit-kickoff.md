# Sesi Sharing — Audit Awal Social Media PLUITS

- Tanggal: 2026-11-17
- Topik: Memulai audit kebutuhan Social Media sebelum dimasukkan ke model aplikasi PLUITS
- Model/aplikasi terkait: PLUITS — Social Media Ecosystem Model
- Status: RAW

## Catatan sharing

Pengguna menetapkan bahwa audit PLUITS dimulai dari Social Media.

Seluruh pembahasan dan hasil audit Social Media harus ditampung terlebih dahulu di `PLUITS-SHARING-INBOX`. Materi ini belum boleh langsung dimasukkan sebagai spesifikasi final ke dalam model aplikasi atau dijadikan dasar perubahan kode.

Pendekatan audit yang disepakati adalah memahami kebutuhan produk dan sistem terlebih dahulu. Teknologi dipilih belakangan berdasarkan kebutuhan yang ditemukan. Contoh yang disampaikan: apabila Social Media memiliki messenger, kebutuhan real-time dan kemampuan pendukungnya harus dianalisis sebelum menentukan teknologi.

### Sharing lanjutan — posisi Social Media dalam pengalaman PLUITS

Pengguna menjelaskan bahwa Social Media merupakan pengalaman utama pengguna ketika menggunakan PLUITS. Kebutuhan ekosistem lain seperti GeoDirectory (menemukan hal-hal di sekitar), pemesanan tiket, akomodasi, Marketplace, dan layanan lain berada di belakang atau terhubung dengan pengalaman utama tersebut.

Untuk tahap sharing saat ini, fokus pembahasan adalah Social Media sebagai pengalaman sosial pengguna, di luar kebutuhan transaksional atau layanan ekosistem lainnya. Pembahasan integrasi layanan tersebut belum menjadi fokus audit fitur saat ini.

### Referensi pengalaman dan perilaku produk yang disampaikan

#### 1. Facebook — People You May Know

- Setiap akun mendapatkan rekomendasi orang yang mungkin dikenal, mengadopsi konsep *People You May Know* dari Facebook.
- Desain tampilan belum ditentukan.
- Logika rekomendasi, sumber sinyal/data, aturan ranking, dan pengaturan pengguna belum ditentukan.

#### 2. Instagram — feed, postingan, profil, dan alur publikasi

Pengguna ingin mengadopsi pengalaman Instagram dengan tingkat kemiripan yang sangat dekat, terutama untuk pengalaman mobile.

Bagian yang disebutkan:
- Feed dan kartu postingan mengikuti pola tampilan Instagram.
- Struktur dan pengalaman profil pengguna mengikuti Instagram.
- Alur membuat postingan, menambahkan konten, menulis caption, dan memublikasikan postingan mengikuti Instagram.
- Penyajian nama pengguna dan informasi akun mengikuti pola Instagram.
- Ikon tindakan seperti Like, Komentar, dan Share dapat diganti dengan ikon khas PLUITS.
- Fitur PLUITS dapat ditambahkan sesuai kebutuhan, tetapi pola pengalaman inti yang dirujuk tetap seperti Instagram.

Desain final, detail komponen, dan daftar penambahan khas PLUITS belum ditentukan. Ini merupakan arahan referensi pengalaman yang disampaikan pengguna, bukan desain layar final.

#### 3. Tinder — menemukan orang di sekitar untuk pertemanan sosial

- Mengadopsi konsep menemukan orang di sekitar yang belum dikenal secara langsung.
- Tujuannya adalah memperluas pertemanan sosial media, bukan dating, pencarian pasangan, atau mekanisme match untuk hubungan romantis.
- Interaksi pertemanan harus memperhatikan pilihan dan persetujuan masing-masing akun untuk menerima atau tidak menerima permintaan/koneksi.
- Detail alur permintaan pertemanan, visibilitas, jarak pencarian, dan kontrol privasi belum ditentukan.

#### 4. Badoo — notifikasi ketika teman berada di kota yang sama

- Pengguna mengambil referensi perilaku dari Badoo: dua akun yang sudah menjadi teman di Social Media, walaupun sebelumnya tidak saling mengenal secara langsung, dapat menerima notifikasi ketika mereka berada atau berkunjung ke kota yang sama.
- Contoh: seorang pengguna dari Jakarta dan seorang pengguna dari Bandung yang sudah berteman di PLUITS sama-sama datang ke Bali.
- Notifikasi dapat memberi tahu bahwa teman mereka juga berada di kota tersebut atau bahwa mereka baru saja berada di lokasi/kota yang sama.
- Informasi lokasi yang ditampilkan tidak boleh terlalu spesifik hingga menyebut toko, restoran, gedung, atau tempat usaha tertentu. Tingkat lokasi yang dimaksud dalam contoh pengguna adalah tingkat kota, misalnya Bali/kota terkait, bukan titik tempat yang presisi.
- Persetujuan pengguna, status aktif/nonaktif, waktu pemicu, retensi lokasi, dan aturan privasi untuk perilaku ini masih perlu diaudit. Belum ada keputusan bahwa fitur ini harus selalu aktif atau berjalan real-time.

## Masalah/kebutuhan yang muncul

- Kebutuhan Social Media belum boleh diasumsikan lengkap atau final.
- Fitur, proses bisnis, aktor, aturan, data, integrasi, dan kebutuhan operasional harus diaudit sebelum keputusan teknis dibuat.
- Teknologi tidak boleh dipaksakan hanya karena populer atau sudah digunakan pada modul lain.
- Hasil diskusi perlu dibedakan secara tegas antara fakta/kebutuhan yang disampaikan, usulan, pertanyaan terbuka, dan keputusan eksplisit.
- Pengalaman sosial utama harus dibedakan dari kebutuhan transaksi/layanan ekosistem lain yang terhubung di belakang PLUITS.
- Fitur penemuan orang dan notifikasi berbasis lokasi membutuhkan perhatian khusus terhadap persetujuan, privasi, dan tingkat ketelitian lokasi.

## Ide atau opsi yang dibahas

Kerangka audit awal yang dapat disesuaikan selama diskusi:

1. Tujuan produk, visi, dan nilai utama Social Media.
2. Pengguna, aktor, peran, dan hak akses.
3. Kebutuhan serta fitur yang ingin disediakan.
4. Aturan bisnis dan kondisi setiap fitur.
5. Alur pengguna dan alur operasional.
6. Kebutuhan data, relasi, dan kepemilikan data.
7. Integrasi dengan ekosistem PLUITS lain.
8. Kebutuhan real-time, notifikasi, dan otomatisasi.
9. Keamanan, privasi, moderasi, dan pelaporan.
10. Performa, skalabilitas, ketersediaan, dan pemulihan.
11. Kebutuhan teknis dan kandidat teknologi.
12. Pengujian, pemantauan, dan pemeliharaan.

Daftar di atas adalah agenda audit, bukan daftar fitur yang telah disetujui.

Messenger dan kebutuhan real-time hanya digunakan sebagai contoh bahwa kebutuhan teknis harus diturunkan dari fungsi yang benar-benar diperlukan. Belum ada keputusan bahwa messenger harus memiliki seluruh kemampuan yang disebutkan dalam contoh sebelumnya.

## Keputusan eksplisit

- Audit pertama yang dikerjakan adalah Social Media.
- Catatan sesi dan hasil pembahasan dimasukkan ke Sharing Inbox terlebih dahulu.
- Isi Sharing Inbox berstatus bahan diskusi dan tidak otomatis menjadi keputusan final.
- Model aplikasi/master model hanya diperbarui setelah hasil audit ditinjau dan disetujui.
- Penentuan teknologi dilakukan setelah kebutuhan produk, alur, data, integrasi, dan kebutuhan nonfungsional dipahami.
- Social Media dimaksudkan sebagai pengalaman utama pengguna PLUITS; ekosistem lain seperti GeoDirectory, tiket, akomodasi, dan Marketplace berada di belakang atau terhubung dengannya.
- Referensi pengalaman yang disampaikan: Facebook People You May Know; Instagram untuk feed, postingan, profil, dan alur publikasi; Tinder untuk penemuan orang sekitar dengan tujuan pertemanan non-dating; Badoo untuk notifikasi keberadaan teman pada tingkat kota.
- Tidak ada perubahan kode atau implementasi fitur yang disetujui melalui sesi ini.

## Pertanyaan terbuka / konflik

- Apa tujuan utama Social Media PLUITS dan nilai pembeda yang ingin dibangun?
- Siapa kelompok pengguna yang menjadi sasaran awal?
- Pengalaman utama apa yang harus menjadi inti produk?
- Apa saja kemampuan yang wajib tersedia pada tahap awal, dan apa yang dapat ditunda?
- Bagaimana hubungan Social Media dengan Marketplace, Tickets & Accommodation, Geo/Local & Global Guide Directory, Logistics & Transportation, dan Digital Wallet?
- Apakah komunikasi pribadi/messenger menjadi bagian dari Social Media, layanan bersama platform, atau perlu batas layanan tersendiri? Belum diputuskan.
- Untuk People You May Know, data atau sinyal apa yang boleh digunakan dan bagaimana pengguna mengontrol rekomendasi?
- Untuk penemuan orang sekitar, apakah visibilitas harus opt-in, bagaimana permintaan pertemanan bekerja, dan bagaimana pengguna mengatur siapa yang dapat menemukan mereka?
- Apa definisi "di sekitar": radius, wilayah administratif, atau pengaturan lain?
- Untuk notifikasi teman berada di kota yang sama, apakah notifikasi hanya berlaku bagi teman yang sama-sama mengaktifkan izin lokasi? Bagaimana frekuensi, waktu, dan pilihan untuk menonaktifkannya?
- Apakah nama kota yang ditampilkan selalu mengikuti wilayah administratif tertentu, dan bagaimana menangani lokasi yang ambigu seperti "Bali" yang dapat berarti pulau atau provinsi?
- Bagaimana kebijakan identitas, privasi, keamanan, moderasi konten, dan perlindungan pengguna?
- Kebutuhan real-time mana yang benar-benar diperlukan setelah fitur dan alurnya ditetapkan?

## Hasil penyortiran

- Ecosystem Model: Belum disortir; menunggu audit dan persetujuan.
- Product Design: Belum disortir; menunggu audit dan persetujuan.
- Application Modularization: Belum disortir; menunggu audit dan persetujuan.
- Shared Platform Services: Belum disortir; menunggu audit dan persetujuan.
- Platform Wrapper: Belum disortir; menunggu audit dan persetujuan.

## Tindak lanjut

Lanjutkan sharing dan audit Social Media dengan menggali pengalaman sosial inti, kebutuhan pengguna, serta perilaku fitur satu per satu. Catat setiap jawaban, kebutuhan, usulan, keputusan eksplisit, dan pertanyaan yang masih terbuka pada sesi Sharing Inbox. Jangan mengisi kekosongan dengan asumsi.


### Audit baseline — Circle PLUITS yang sudah terdeploy

**Status catatan:** temuan dari implementasi yang sudah ada; bukan keputusan desain/produk baru dan bukan persetujuan untuk mengubah kode.

Rute `#/circle` saat ini diarahkan ke halaman Circle pengguna yang sudah login. Halaman tersebut dirender oleh alur `feedPage()` pada `src/pages/account/index.js`.

#### Kerangka navigasi yang terlihat pada implementasi

- Header desktop menampilkan identitas PLUITS, navigasi Circle, Reels, Jelajah, dan Inbox, kolom pencarian/lokasi, akses konten tersimpan, serta profil.
- Navigasi bawah mobile menampilkan Circle, Jelajah, Buat, Inbox, dan Profil.
- Circle menjadi pintu masuk utama untuk aktivitas sosial akun yang sudah login.

#### Susunan konten Circle saat ini

Urutan komposisi halaman dari implementasi saat ini:

1. **Top 10 Trending** — konten/tempat yang sedang ramai berdasarkan postingan yang terhubung dengan entitas direktori lokal.
2. **Tempat di sekitar pengguna** — bagian GeoDirectory/nearby.
3. **Orang yang Mungkin Anda Kenal** — rekomendasi akun, dengan kartu horizontal dan tindakan mengikuti.
4. **Cerita dari circle** — Story dari akun yang sudah diikuti dan memiliki Story publik yang masih aktif; ditampilkan sebagai deretan avatar/story melingkar yang dapat digeser horizontal.
5. **Navigasi jenis konten** — tab Semua, Reel, Live, dan Blog, ditambah akses Buka Reels dan tombol muat ulang.
6. **Feed Post** — daftar kartu postingan.
7. **Konten ekosistem lain setelah feed** — Produk Lokal, Temukan Lebih Banyak, Kumpulan jasa/layanan, pintasan Akomodasi/Tiket/Transportasi/Jasa, serta materi ajakan bergabung dan unduh aplikasi.

#### Perilaku feed dan kartu Post yang sudah ada

- Feed mengambil Post publik yang berstatus diterbitkan.
- Post dari akun yang diblokir, akun yang disembunyikan, atau Post yang disembunyikan pengguna tidak dimasukkan ke daftar yang ditampilkan.
- Urutan rekomendasi saat ini mempertimbangkan akun yang diikuti, kecocokan minat/topik, kebaruan postingan, serta jumlah Like dan komentar. Ini adalah perilaku kode saat ini, bukan aturan ranking final yang sudah disetujui.
- Kartu Post saat ini memuat identitas/username pemilik, waktu publikasi, menu tindakan, media foto/video atau galeri, area tindakan interaksi, caption, jumlah suka, dan jumlah komentar.
- Story pada avatar Post juga dapat ditandai dengan ring ketika pemilik Post memiliki Story aktif.

#### Catatan pemisahan ruang lingkup

Implementasi Circle saat ini mencampurkan pengalaman Social Media dengan bagian GeoDirectory, Marketplace, dan layanan PLUITS lainnya. Hal ini dicatat sebagai kondisi aplikasi yang sudah ada, bukan kesimpulan bahwa semua bagian tersebut harus tetap berada di Home Circle.

Untuk audit pengalaman Instagram berikutnya, perlu dibedakan:
- bagian yang memang menjadi inti pengalaman sosial (misalnya Story, rekomendasi orang, tab konten, dan feed Post);
- bagian ekosistem lain yang saat ini tampil di Circle (misalnya nearby, produk lokal, jasa, tiket, dan akomodasi).

Belum ada keputusan untuk menghapus, memindahkan, mempertahankan, atau mengubah posisi bagian mana pun. Pembahasan visual dan perilaku detail tetap dilanjutkan bersama pengguna.


## Status akhir

RAW
