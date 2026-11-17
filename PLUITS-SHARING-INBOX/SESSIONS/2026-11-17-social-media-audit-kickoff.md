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



### Sharing lanjutan — alasan konsep Circle dan pengalaman Global vs Circle

Pengguna menjelaskan bahwa Circle sengaja dirancang sebagai pengalaman campuran Social Media dan penemuan kebutuhan di sekitar pengguna. PLUITS memiliki direktori, Marketplace/toko, layanan, dan jenis entitas lain. Menurut arah yang dijelaskan, semua itu tidak seharusnya hanya dipisahkan menjadi kategori-kategori terisolasi; sebagian kontennya perlu hadir secara alami di antara pengalaman sosial pada Circle.

#### 1. Dua konteks pengalaman: Global Home dan Circle

**Global Home**
- Ketika pengguna membuka homepage PLUITS, sebelum masuk ke Circle personalnya, pengguna melihat pengalaman dalam cakupan global/platform.
- Untuk tahap ekspansi saat ini, cakupan global yang dimaksud masih Indonesia karena PLUITS belum berekspansi ke negara lain.
- Bagian trending pada cakupan ini mengambil tren dalam wilayah luas, bukan hanya dari lokasi terdekat pengguna.
- Pengguna menyebut contoh cakupan Indonesia dan contoh tren Bali untuk menjelaskan perbedaan cakupan luas dengan area lokal.

**Circle**
- Circle adalah pengalaman pengguna yang sudah login dan terhubung dengan jaringan pertemanannya, sekaligus pengalaman lokal berdasarkan lokasi pengguna saat itu.
- Circle bukan hanya feed dari teman. Di dalamnya juga ada penemuan tempat, toko, produk, dan layanan yang relevan dengan area pengguna.
- Pengguna dapat tetap memiliki teman yang berada di kota lain atau negara lain. Perpindahan lokasi pengguna tidak mengubah jaringan pertemanannya.
- Lokasi pengguna memengaruhi konten lokal yang ditampilkan. Contoh: saat pengguna berada di Kuta, rekomendasi lokal mengikuti Kuta; ketika berpindah ke Ubud, bagian lokal berubah mengikuti Ubud.
- Tombol/logo PLUITS yang berada di berbagai halaman berfungsi mengembalikan pengguna ke Global Home.
- Item navigasi Circle berfungsi mengembalikan pengguna ke Circle personalnya.

#### 2. Cakupan tren luas dan rekomendasi terdekat adalah dua hal berbeda

- **Top 10 Trending** pada Circle dimaksudkan sebagai tren dalam cakupan geografis yang lebih luas daripada lingkungan terdekat pengguna. Contoh yang diberikan: tren di Bali dapat berasal dari Lovina dan wilayah Bali lainnya meskipun pengguna sedang berada di Kuta.
- **Terdekat di sekitar pengguna** menggunakan lokasi pengguna untuk menampilkan entitas direktori yang berada di sekitar area aktual pengguna. Contoh saat berada di Kuta: klub, mal, restoran, tempat wisata, toko, dan entitas lokal lainnya.
- Dengan demikian, Top 10 Trending bukan daftar tempat yang paling dekat dengan pengguna. Bagian terdekat bukan pula daftar tren seluruh wilayah.
- Cakupan administratif atau radius yang persis untuk kedua bagian tersebut belum ditetapkan.

#### 3. Penggunaan lokasi perangkat

- PLUITS menggunakan lokasi perangkat untuk menyesuaikan pengalaman eksplorasi lokal di dalam aplikasi.
- Pengguna diberi pilihan apakah ingin mengaktifkan izin deteksi lokasi.
- Pengguna yang ingin menggunakan pengalaman berbasis lokasi perlu memberikan izin pendeteksian lokasi pada perangkat.
- Jika izin lokasi tidak diaktifkan, perilaku alternatif/fallback yang akan ditampilkan belum dijelaskan dan masih perlu dibahas.
- Tidak ada keputusan mengenai interval pembaruan lokasi, akurasi yang disimpan, retensi, atau mekanisme teknis pendeteksian.

#### 4. Direktori dan Marketplace sebagai bagian dari pengalaman lokal

- Direktori PLUITS menjadi sumber entitas yang dapat ditampilkan dalam tren dan rekomendasi lokal.
- Entitas lokal dapat berupa tempat wisata, klub, mal, restoran, toko, dan jenis tempat/layanan lain yang tersedia di direktori.
- Marketplace tetap dapat digunakan untuk pemesanan online, tetapi keberadaan fisik penjual/toko diprioritaskan dalam konsep yang dijelaskan.
- Alasan prioritas toko fisik: entitas toko dapat memiliki lokasi yang tercatat di direktori, direkomendasikan kepada pengguna di sekitarnya, dan dikunjungi langsung oleh pengguna. Pengguna tidak harus selalu bertransaksi online.
- Pengalaman Marketplace juga mengikuti area pengguna sebagai cakupan awal. Contoh: pengguna di Bali melihat Marketplace dengan konteks Bali.
- Pengguna dapat mengubah pengaturan cakupan menjadi global jika ingin melihat Marketplace secara global.
- Detail bagaimana lokasi toko diverifikasi, bagaimana toko tanpa lokasi fisik diperlakukan, serta bagaimana pilihan area/global bekerja belum ditentukan.

#### 5. Susunan konten Circle yang dijelaskan pengguna

Urutan gambaran yang disampaikan:
1. Top 10 Trending dari direktori pada cakupan wilayah yang lebih luas, bukan hanya area terdekat.
2. Rekomendasi tempat/entitas terdekat dari lokasi pengguna, yang dapat mencakup tempat wisata, klub, mal, restoran, toko, dan entitas direktori lainnya.
3. Story dari akun-akun yang sudah menjadi teman pengguna.
4. Orang yang Mungkin Anda Kenal.
5. Feed Post yang terutama berasal dari teman, dengan sisipan rekomendasi algoritmik berdasarkan minat pengguna. Konten rekomendasi dapat berasal dari institusi, berita, olahraga, atau kategori lain.
6. Kartu-kartu produk Marketplace yang relevan dengan lokasi pengguna.

Urutan tersebut dicatat sebagai gambaran yang sedang dibagikan pengguna, bukan desain final. Rincian, variasi, dan posisi akhir tiap bagian masih terbuka untuk audit lanjutan.

#### 6. Rekomendasi orang dan feed

- Rekomendasi Orang yang Mungkin Anda Kenal dapat mempertimbangkan nomor telepon/kontak, orang yang sering dilihat, kesamaan, atau sinyal lain.
- Pengguna meminta agar sistem nantinya menganalisis kebutuhan ini dan menentukan teknologi yang tepat setelah kebutuhan dan sinyalnya dipahami.
- Feed terutama menampilkan postingan dari teman pengguna.
- Sesekali feed juga menyisipkan postingan rekomendasi berdasarkan minat pengguna, yang bisa berasal dari institusi, berita, olahraga, dan jenis konten lainnya.
- Sumber sinyal, batas penggunaan data kontak/perilaku, ranking, kontrol rekomendasi, frekuensi sisipan, dan mekanisme personalisasi belum diputuskan.
- Teknologi untuk rekomendasi tidak dipilih dalam sesi ini; kebutuhan harus dianalisis terlebih dahulu.

#### 7. Makna Circle yang perlu dipertahankan dalam audit

Circle memiliki dua makna yang saling berjalan:
- **Social circle:** jaringan pertemanan pengguna, yang tetap sama meskipun teman berada di lokasi geografis yang berbeda.
- **Location-aware circle experience:** penemuan tren, tempat, toko, produk, dan layanan yang disesuaikan dengan lokasi pengguna saat itu.

Karena itu, istilah Circle tidak boleh ditafsirkan hanya sebagai daftar teman atau feed yang seluruh isinya berasal dari teman. Ia merupakan pengalaman utama yang menggabungkan jejaring sosial dan penemuan lokal PLUITS.

#### Pertanyaan terbuka yang muncul dari sharing ini

- Apakah Global Home menampilkan trending nasional Indonesia secara keseluruhan, atau ada cakupan/region yang dapat dipilih?
- Apakah Top 10 Trending di Circle selalu mengikuti region besar tempat pengguna berada (misalnya Bali), dan bagaimana region itu ditentukan?
- Apa batas antara cakupan tren luas, area lokal, dan "terdekat": provinsi/kota/kabupaten/kecamatan/radius?
- Apa yang ditampilkan ketika izin lokasi ditolak atau lokasi tidak tersedia? Apakah pengguna dapat memilih area secara manual?
- Apakah perubahan lokasi langsung memperbarui rekomendasi lokal, dan bagaimana mencegah perubahan lokasi yang terlalu sering atau tidak akurat?
- Bagaimana penjual Marketplace yang tidak memiliki toko fisik diperlakukan dalam direktori dan rekomendasi lokal?
- Bagaimana pengguna mengubah cakupan Marketplace dari area saat ini ke global dan kembali lagi?
- Bagaimana kontak telepon, pola melihat profil, kesamaan, dan sinyal lain digunakan secara transparan serta dengan kontrol privasi yang memadai?
- Bagaimana feed menyeimbangkan postingan teman dengan konten rekomendasi institusi, berita, olahraga, dan minat lainnya?
- Apakah kartu produk Marketplace di bagian bawah Circle selalu mengikuti lokasi, minat, atau kombinasi keduanya?



### Klarifikasi — zona Top 10 Trending vs radius Terdekat

Pengguna memperjelas bahwa Top 10 Trending dan bagian Terdekat menggunakan dua cakupan geografis yang berbeda:

- **Top 10 Trending menggunakan zona wilayah yang lebih luas.** Contoh yang diberikan: ketika konteks pengguna berada di Bali, zona Top 10 adalah seluruh Bali. Konten yang sedang tren dapat berasal dari bagian Bali mana pun, misalnya Lovina, walaupun pengguna sedang berada di Kuta. Tujuannya menunjukkan apa yang sedang tren di wilayah Bali secara keseluruhan, bukan hanya yang dekat dengan posisi pengguna.
- **Terdekat di Sekitar Anda menggunakan radius dari posisi pengguna saat ini.** Tujuannya menampilkan tempat, toko, restoran, layanan, atau entitas lain yang cukup dekat dan realistis untuk dikunjungi langsung. Pengguna memberi contoh radius 5 kilometer.
- Angka 5 kilometer dicatat sebagai contoh radius yang disampaikan pengguna, belum sebagai keputusan final atau batas yang sudah dikunci.
- Dengan demikian, Top 10 Trending menjawab pertanyaan "apa yang sedang tren di zona/wilayah saya?", sedangkan Terdekat menjawab "apa yang ada di sekitar posisi saya dan dapat saya kunjungi?"

Contoh saat pengguna berada di Kuta:
- Top 10 Trending dapat menampilkan tempat/produk yang sedang tren di seluruh Bali, termasuk Lovina.
- Terdekat menampilkan entitas dalam radius contoh 5 km dari posisi pengguna di Kuta.

**Koreksi atas pertanyaan terbuka sebelumnya:** cakupan Top 10 pada konteks Bali telah diperjelas sebagai satu zona Bali, bukan radius di sekitar pengguna. Hal yang masih terbuka adalah bagaimana zona wilayah ditetapkan untuk daerah lain dan apakah radius Terdekat selalu 5 km atau dapat berubah sesuai kebutuhan/kategori.


### Klarifikasi — radius Terdekat yang melebar adaptif dan kontribusi GeoDirectory

Pengguna memperjelas bahwa radius contoh 5 km bukan batas pencarian yang kaku. Sistem Terdekat perlu memperluas cakupan secara bertahap apabila hasil di radius awal belum memadai.

#### 1. Perluasan radius pencarian

- Pencarian Terdekat dimulai dari radius awal; 5 km adalah contoh radius awal yang disampaikan pengguna.
- Jika di radius awal belum ditemukan tempat/entitas yang relevan, radius pencarian diperluas secara bertahap.
- Perluasan tetap berlanjut apabila radius berikutnya, misalnya 10 km, juga belum menghasilkan tempat/entitas yang memadai.
- Perluasan memiliki batas maksimum pada wilayah/zona geografis pengguna. Dalam contoh yang dibahas, jika pengguna berada di Kuta, pencarian dapat melebar ke seluruh Bali sebagai batas akhirnya.
- Sistem tidak otomatis melanjutkan pencarian ke luar Bali ketika batas zona Bali sudah tercapai.
- Jika sampai seluruh zona Bali tidak ditemukan entitas yang menarik/relevan, atau belum ada lokasi yang ditambahkan ke GeoDirectory, hasil pencarian berhenti pada batas zona tersebut. Maknanya: belum tersedia lokasi yang cocok/menarik dalam direktori di zona itu, bukan alasan untuk mencari ke zona lain.

Contoh alur yang disampaikan:
1. Pengguna berada di Kuta; pencarian dimulai dari radius contoh 5 km.
2. Jika belum ada hasil yang memadai, radius diperluas, misalnya menjadi 10 km.
3. Jika masih belum ada hasil, radius terus diperluas secara bertahap.
4. Perluasan berlanjut sampai cakupan maksimum satu Bali.
5. Jika seluruh Bali tetap tidak memiliki hasil yang relevan/tersedia, pencarian berhenti dan tidak menyeberang ke luar Bali.

Angka radius awal, besaran setiap kenaikan, definisi hasil yang dianggap cukup/memadai, dan aturan teknis batas zona belum ditetapkan. Bali merupakan contoh wilayah yang dijelaskan, bukan keputusan bahwa semua wilayah lain harus memakai batas yang sama.

#### 2. Kontribusi pengguna terhadap GeoDirectory

Pengguna membocorkan arah bahwa GeoDirectory nantinya dapat berkembang melalui kontribusi akun pengguna:
- Setiap akun dapat berkontribusi menambahkan tempat/lokasi ke GeoDirectory.
- Akun lain dapat berkontribusi memperbaiki informasi tempat apabila ada data yang salah atau kurang tepat.
- Dengan demikian, data direktori tidak hanya bergantung pada input internal PLUITS; pengguna juga menjadi sumber kontribusi dan koreksi.

Detail formulir penambahan, jenis data yang wajib disertakan, moderasi, verifikasi, reputasi kontributor, persetujuan koreksi, dan penanganan konflik data belum dibahas.

#### 3. Klaim kepemilikan/pengelolaan tempat

- Pengguna menjelaskan bahwa untuk setiap tempat akan ada pihak/orang yang paling berhak mengklaim tempat tersebut.
- Konsep klaim tempat mengambil referensi dari TripAdvisor.
- Proses dan aturan klaim belum dibuat dan belum diputuskan.
- Kriteria pihak yang berhak, bukti yang diperlukan, proses verifikasi, perselisihan klaim, serta hak yang diperoleh setelah klaim masih menjadi pekerjaan perancangan berikutnya.

Catatan penting: kemampuan pengguna untuk menambahkan atau mengoreksi data direktori berbeda dari hak untuk mengklaim tempat. Kontribusi data tidak otomatis berarti akun tersebut adalah pemilik atau pihak yang berhak mengelola tempat.

#### Hal yang masih terbuka

- Berapa radius awal dan berapa besar kenaikan radius pada setiap tahap?
- Apa kriteria bahwa hasil pada suatu radius sudah cukup, atau pencarian harus diperluas?
- Bagaimana batas zona maksimum ditetapkan untuk setiap wilayah selain contoh Bali?
- Bagaimana pengalaman pengguna ketika pencarian telah mencapai batas wilayah tetapi tidak ada hasil yang relevan?
- Apakah pengguna dapat mengatur radius sendiri, atau sistem sepenuhnya mengelolanya?
- Bagaimana kontribusi penambahan tempat, koreksi data, moderasi, dan verifikasi dijalankan?
- Bagaimana menentukan pihak yang paling berhak mengklaim suatu tempat?
- Apa persyaratan, bukti, proses pemeriksaan, dan mekanisme sengketa klaim tempat?




### Arahan lanjutan — fondasi awal pembangunan Social Media, teknologi, ikon, versi, dan preview

Pengguna menyampaikan bahwa hasil pemahaman Social Media sampai tahap ini dianggap cukup sebagai fondasi dasar awal untuk mulai menyusun dan membangun pengalaman Social Media secara bertahap. Fondasi ini bukan berarti seluruh detail fitur sudah final; detail kebutuhan tetap dapat diperjelas dan ditambahkan per bagian selama pengembangan.

#### 1. Dari fondasi produk menjadi halaman dan perjalanan pengguna

- Hasil pemahaman konsep Social Media harus diterjemahkan menjadi inventaris halaman dan alur pengguna yang saling terhubung.
- Perjalanan dimulai dari akses akun, termasuk halaman pendaftaran, login, lupa email/informasi akun, pemulihan akses/password, dan proses terkait sampai akun berhasil digunakan.
- Setelah masuk, perjalanan mencakup pengalaman Circle/Global Home dan fitur sosial.
- Alur pembuatan konten harus mencakup proses lengkap sampai berhasil dipublikasikan, termasuk membuat Post, Reel, dan Story.
- Daftar halaman tidak hanya berupa nama halaman. Setiap halaman perlu dijelaskan tujuan, akses masuk/keluar, aksi, navigasi, validasi, kondisi loading/kosong/gagal/berhasil, dan hubungan dengan halaman lain.
- Contoh halaman di atas merupakan titik awal yang disebut pengguna; inventaris lengkap harus diturunkan dari kebutuhan dan alur Social Media yang sudah dibahas serta hasil audit lanjutan.

#### 2. Penurunan dan pencatatan teknologi

- Setelah kebutuhan produk, halaman, alur, data, integrasi, keamanan, dan kebutuhan operasional dipahami, tim perlu menentukan teknologi yang sesuai untuk membangun tiap bagian.
- Hasil keputusan teknologi harus dimasukkan satu per satu ke dokumentasi teknis/frontend/backend yang tepat di Master Model, bukan hanya tersimpan dalam percakapan.
- Teknologi dipilih berdasarkan kebutuhan nyata setiap fitur; jangan menganggap semua fitur harus memakai teknologi yang sama atau memilih teknologi hanya karena populer.
- Kandidat teknologi, keputusan final, alasan, konsekuensi, dan status penerapan harus dibedakan dan dicatat agar teknologi yang baru dipertimbangkan tidak disalahartikan sebagai teknologi yang sudah dipakai.
- Perubahan teknologi tidak boleh otomatis mengharuskan penulisan ulang seluruh aplikasi yang sudah berjalan; dampak dan migrasi harus diaudit.

#### 3. Ikon dan aset antarmuka harus tersedia secara lokal

- Pengguna menginginkan ikon-ikon PLUITS tersedia di dalam repository/aplikasi agar tidak perlu mengambil atau merender ikon dari website luar ketika aplikasi berjalan.
- Tujuannya menjaga aplikasi lebih ringan, mengurangi ketergantungan jaringan pihak ketiga, dan mencegah ikon hilang jika layanan eksternal bermasalah.
- Sebelum menambahkan ikon, inventaris ikon yang sudah tersedia harus diperiksa agar tidak membuat duplikasi.
- Ikon yang belum tersedia perlu disiapkan sebagai aset lokal (misalnya SVG), didaftarkan pada sistem ikon resmi PLUITS, dan dipetakan ke komponen/halaman yang menggunakannya.
- Pemilihan makna dan bentuk ikon harus mengikuti review/approval pemilik produk serta aturan Icon Library yang sudah ada.
- Catatan audit repository saat sesi ini: runtime sudah memiliki src/design-system/icons/index.js sebagai facade dan registry ikon umum, sosial, serta aplikasi; renderer memakai inline SVG lokal dan dokumentasinya melarang hotlink SVG atau remote icon font untuk UI produksi.
- Catatan runtime di atas adalah kondisi yang ditemukan saat audit, bukan bukti bahwa seluruh ikon yang dibutuhkan Social Media sudah tersedia atau disetujui.

#### 4. Pembangunan bertahap dan pengelolaan versi aplikasi

- Aplikasi PLUITS yang saat ini sudah online dan dapat menerima pendaftaran harus tetap berjalan selama pekerjaan versi berikutnya berlangsung.
- Pekerjaan audit dan pembangunan fitur baru dilakukan secara bertahap, tidak dengan mengganti aplikasi produksi sekaligus.
- Pengguna memberi contoh penamaan hasil bertahap sebagai versi 2, versi 3, dan seterusnya.
- Setiap tahap/versi menambahkan kemampuan yang sudah direncanakan dan ditempatkan pada bagian modul yang tepat.
- Hasil pengembangan baru hanya dipindahkan/digabungkan ke aplikasi utama setelah selesai diuji dan dinyatakan siap.
- Versi yang sedang dikembangkan harus terpisah dari versi produksi sehingga pekerjaan baru tidak merusak pengalaman pengguna yang sudah ada.
- Skema penamaan versi, ukuran setiap rilis, aturan kompatibilitas, dan kebijakan rollback masih perlu dirancang.

#### 5. Tempat pengujian/preview yang dapat dibuka melalui browser

- Pengguna membutuhkan tempat pengujian yang dapat dibuka melalui sebuah link di browser, termasuk dari ponsel, untuk melihat dan mencoba tampilan serta alur fitur yang sedang dikembangkan.
- Preview harus memungkinkan pemeriksaan tampilan halaman dan interaksi sebelum hasilnya dipindahkan ke aplikasi utama.
- Preview/pengujian harus dipisahkan dari situs produksi yang sudah online.
- Pengujian tidak boleh menggunakan atau merusak data nyata pengguna produksi. Kebutuhan isolasi data/backend, akun uji, dan media uji harus dirancang.
- Akses preview perlu mempertimbangkan privasi dan tidak boleh mengekspos proyek atau data pengujian privat secara tidak sengaja.
- Status setiap tahap perlu dibedakan: sedang dikembangkan, build berhasil, tersedia untuk preview, sudah diuji, diterima, siap dirilis, dan sudah dirilis.
- Link preview harus menunjuk ke build/versi/commit yang jelas agar hasil pengujian dapat ditelusuri.

#### 6. Temuan audit terhadap pipeline repository saat ini

Pemeriksaan dilakukan terhadap file workflow deploy di branch main:

- Push ke branch main menjalankan proses build dan deployment ke GitHub Pages.
- Pull request menuju main menjalankan validasi, test, build, dan mengunggah artifact.
- Pull request tidak melakukan deployment ke GitHub Pages.
- Dengan demikian, repository saat ini sudah memisahkan validasi PR dari deployment produksi, tetapi belum menyediakan link preview browser otomatis untuk setiap PR.
- Situs GitHub Pages yang sekarang tetap menjadi deployment produksi; jangan menggunakan deployment Pages yang sama untuk preview apabila hal itu berisiko mengganti situs produksi.
- Mekanisme hosting preview terpisah, akses terbatas, dan hubungan dengan workflow CI/CD masih perlu dirancang sebelum implementasi.

#### 7. Prinsip alur kerja yang disampaikan

1. Pertahankan aplikasi produksi yang sekarang tetap online.
2. Gunakan fondasi Social Media untuk menyusun inventaris halaman dan end-to-end user journeys.
3. Turunkan kebutuhan frontend, backend, data, teknologi, aset, dan ikon per fitur.
4. Tempatkan setiap hasil pada dokumentasi/modul yang tepat di dalam Master Model.
5. Kerjakan perubahan pada jalur pengembangan terpisah dari produksi.
6. Bangun dan sediakan preview yang bisa dibuka melalui browser untuk pemeriksaan pengguna.
7. Jalankan test dan audit; catat hasil serta kekurangan.
8. Setelah diterima, rilis secara bertahap ke aplikasi utama dengan versi dan bukti deployment yang jelas.

#### Hal yang masih terbuka

- Apakah preview harus dilindungi login/password atau mekanisme akses terbatas lain?
- Hosting preview mana yang cocok, aman, mudah dibuka lewat ponsel, dan tidak mengganggu GitHub Pages produksi?
- Apakah preview awal menggunakan data tiruan, backend uji terpisah, atau kombinasi keduanya?
- Bagaimana format penamaan versi (misalnya versi besar/kecil atau milestone rilis)?
- Apakah satu preview selalu mewakili satu Pull Request/fitur atau satu milestone gabungan?
- Kriteria penerimaan/UAT apa yang harus dipenuhi sebelum fitur masuk produksi?
- Bagaimana strategi migrasi dari implementasi yang sekarang ke peningkatan Social Media tanpa merusak halaman, autentikasi, data, dan modul yang sudah ada?

Catatan status: arahan ini dicatat sebagai kebutuhan dan arah kerja yang disampaikan pengguna. Belum ada perubahan kode, perubahan workflow, penyediaan hosting preview, atau pemindahan catatan RAW ke Master Model yang dilakukan melalui sesi ini.




### Klarifikasi lanjutan — pembangunan ulang fondasi frontend PLUITS

Pengguna menegaskan bahwa pekerjaan versi baru bukan sekadar menambahkan fitur Social Media ke struktur website yang sekarang. Fondasi website/frontend generasi baru juga harus disiapkan dan ditata ulang dari awal agar seluruh halaman dan modul dibangun di atas struktur yang konsisten.

#### Masalah pada aplikasi saat ini

- Struktur internal website yang sudah online dinilai masih acak-acakan dan belum cukup stabil.
- Ukuran elemen, layout, dan tampilan antarbagiannya belum konsisten.
- Perubahan kecil pada satu bagian sering menyebabkan bagian atau desain lain ikut rusak.
- Pengguna tidak ingin pola kerja seperti ini diteruskan ke versi berikutnya.

#### Arah yang diminta untuk versi baru

- Siapkan fondasi frontend PLUITS yang terstruktur sebelum membangun halaman dan fitur satu per satu.
- Bangun ulang struktur tampilan dan komponen di atas fondasi tersebut, bukan terus menambal struktur lama yang tidak stabil.
- Standarkan sistem ukuran, spacing, layout, tipografi, warna, breakpoint/responsivitas, komponen, ikon, dan aturan styling agar konsisten di seluruh aplikasi.
- Komponen dan modul perlu memiliki batas tanggung jawab yang jelas. Perubahan pada satu komponen/fitur sebisa mungkin tidak memengaruhi tampilan modul lain.
- Hindari ketergantungan CSS global yang tidak terkendali; gunakan pola styling dan kontrak komponen yang menjaga isolasi.
- Sediakan standar penggunaan komponen bersama agar halaman tidak membuat ulang elemen yang seharusnya konsisten.
- Siapkan pengujian untuk mencegah regresi tampilan dan fungsi ketika ada penambahan atau perubahan fitur.
- Fondasi harus mendukung pembangunan bertahap, sehingga fitur baru dapat ditambahkan tanpa merombak atau merusak desain yang sudah stabil.

#### Hubungan dengan aplikasi produksi dan versi baru

- Website PLUITS yang sekarang sudah online tetap dipertahankan dan tidak boleh terganggu selama pembangunan ulang.
- Fondasi frontend baru dikembangkan di jalur/lingkungan terpisah, lalu halaman dan modul baru dibangun di atasnya.
- Peralihan dari aplikasi saat ini ke versi baru dilakukan bertahap setelah hasil pengembangan diuji dan diterima.
- Keputusan tentang apakah backend, autentikasi, database, dan data yang sudah ada akan dipertahankan, diadaptasi, atau dimigrasikan harus diaudit terpisah; permintaan pembangunan ulang fondasi frontend tidak otomatis berarti seluruh backend/data harus dibuang atau dibuat ulang.

#### Prinsip arsitektur yang perlu diwujudkan

1. Satu sumber standar desain untuk token dan aturan visual lintas halaman.
2. Komponen dasar yang reusable dan konsisten, dengan API/kontrak yang jelas.
3. Batas CSS dan state yang terisolasi agar perubahan lokal tidak menimbulkan efek samping global.
4. Layout responsif yang mempunyai aturan ukuran dan breakpoint yang konsisten.
5. Modul/fitur yang dapat dikembangkan dan diuji secara independen.
6. Pengujian fungsional dan visual/regression untuk area yang terdampak perubahan.
7. Dokumentasi fondasi UI dan implementasi harus saling terhubung sehingga pengembang mengetahui standar yang wajib diikuti.

Catatan: poin arsitektur di atas merupakan arah teknis yang perlu dianalisis dan dirinci sebelum diputuskan implementasinya. Belum ada kode atau struktur runtime yang diubah pada sesi ini.



### Penegasan arah — flowchart dan frontend generasi baru, database tetap dipakai

Pengguna menegaskan bahwa pekerjaan berikutnya adalah menyusun flowchart dan struktur aplikasi yang baru dari awal. Tujuannya bukan memperbaiki, menambal, atau menggabungkan struktur frontend lama dengan struktur baru.

#### 1. Pemisahan frontend lama dan frontend baru

- PLUITS generasi baru akan memiliki flowchart, inventaris halaman, susunan navigasi, struktur komponen, dan arsitektur frontend yang dirancang kembali dari awal.
- Struktur frontend lama tidak dijadikan fondasi yang harus dipertahankan dan tidak akan dicampur ke dalam struktur frontend baru.
- Website lama tetap berjalan selama proses pembangunan dan pengujian versi baru.
- Setelah versi baru selesai, diuji, dan diterima, frontend/struktur lama akan digantikan dan tidak digabungkan ke dalam struktur baru.
- Pembangunan baru harus dimulai dari kebutuhan produk dan alur yang sudah diaudit, bukan menyalin susunan halaman lama secara otomatis.

#### 2. Database yang sudah ada tetap dipertahankan

- Pengguna secara eksplisit meminta agar versi baru tetap menggunakan database PLUITS yang sama.
- Alasan yang disampaikan: sudah ada satu akun pengguna yang mendaftar pada sistem saat ini dan data akun tersebut harus tetap dapat digunakan.
- Karena itu, rancangan frontend baru harus memperhitungkan kompatibilitas dengan database yang sudah ada dan mempertahankan akun/data terdaftar tersebut.
- Penggunaan database yang sama tidak berarti frontend lama harus dipertahankan atau digabungkan.
- Skema database, autentikasi, kontrak API, struktur tabel, kebijakan akses, dan kebutuhan adaptasi/migrasi harus diaudit sebelum koneksi frontend baru dibuat. Jangan menghapus, mereset, atau merusak data yang sudah ada.
- Belum diputuskan apakah seluruh layanan backend saat ini akan digunakan tanpa perubahan; yang sudah dinyatakan secara eksplisit untuk dipertahankan adalah database yang sama.

#### 3. Flowchart baru dan inventaris halaman sebagai dasar pembangunan

Sebelum halaman dibuat, perlu disusun alur baru yang menggambarkan:
- pintu masuk pengguna dan alur akun;
- navigasi Global Home, Circle, dan area utama Social Media;
- hubungan antarhalaman dan perpindahan antarfitur;
- proses pengguna dari awal sampai selesai untuk setiap aktivitas;
- kondisi normal maupun kondisi khusus seperti loading, kosong, gagal, validasi, berhasil, akses ditolak, dan pemulihan;
- titik integrasi dengan database serta layanan PLUITS lain jika memang diperlukan.

Inventaris halaman disusun berdasarkan kebutuhan dan perjalanan pengguna, bukan hanya menyalin halaman yang ada saat ini. Setiap halaman/flow kemudian ditempatkan pada dokumentasi dan folder yang memang menjadi tanggung jawabnya.

#### 4. Empat jalur kerja dokumentasi Social Media

Empat jalur kerja sementara yang telah digunakan untuk menata pekerjaan model tetap menjadi acuan awal:
1. `01-DESIGN` — aturan produk, pengalaman pengguna, spesifikasi visual, susunan halaman, komposisi layar, komponen dari sisi desain, dan user flow.
2. `02-DEVELOPMENT` — spesifikasi implementasi, arsitektur frontend/backend, kontrak komponen dan data, integrasi, keamanan teknis, serta pengujian teknis.
3. `03-PROJECT` — ruang lingkup, tahapan, prioritas, dependensi, milestone, versi, status pekerjaan, dan rencana rilis.
4. `04-CHECKLIST-AUDIT` — checklist kelengkapan, validasi hasil, uji fungsi, uji responsivitas, pemeriksaan visual/regression, dan kriteria penerimaan.

Nama dan pembagian jalur masih dapat dikembangkan apabila audit menunjukkan kebutuhan pemisahan tambahan. Tidak perlu memaksakan seluruh jalur memiliki susunan subfolder yang identik. Yang wajib dijaga adalah setiap dokumen memiliki satu tempat utama yang jelas, tidak diduplikasi atau dicampur ke folder yang tidak sesuai tanggung jawabnya.

#### 5. Aturan produk Social Media perlu dirinci menjadi rulebook yang lebih lengkap

Pengguna menjelaskan bahwa aturan Social Media dapat dan perlu ditambah sesuai kebutuhan. Contoh yang diberikan adalah aturan pengalaman seperti Instagram, termasuk ukuran/rasio media Post dan bagian-bagian yang harus ada pada sebuah Post.

Arah pencatatannya:
- Buat aturan produk/desain khusus untuk setiap jenis pengalaman dan konten Social Media, bukan hanya satu aturan umum untuk seluruh fitur.
- Untuk Post, audit dan tentukan format media, rasio/dimensi yang didukung, area media, informasi pemilik konten, caption, waktu, menu tindakan, Like, komentar, share, dan komponen lain yang memang dibutuhkan.
- Buat aturan terpisah untuk Story, Reel, profil, feed, komentar, interaksi, composer/pembuatan konten, dan pengalaman sosial lain sesuai hasil inventaris fitur.
- Catat perilaku dan komposisi layar untuk berbagai kondisi, bukan hanya tampilan ideal.
- Ukuran, rasio, jumlah media, batas karakter, dan aturan numerik lainnya harus ditentukan melalui spesifikasi dan keputusan produk; contoh pengguna tentang ukuran Post merupakan kebutuhan untuk membuat aturan rinci, bukan angka final yang sudah ditetapkan.
- Aturan pengalaman inti boleh merujuk pada pola interaksi Instagram yang diminta pengguna, dengan identitas visual dan aset PLUITS sendiri serta tanpa mengambil aset berhak cipta/proprietary secara tidak sah.

#### 6. Menurunkan kebutuhan komponen dari aturan dan halaman

- Setelah rulebook dan inventaris halaman disusun, identifikasi komponen yang dibutuhkan setiap layar dan alur.
- Setiap komponen harus memiliki nama, tujuan, tanggung jawab, properti/masukan, keluaran/aksi, kondisi tampilan, aturan responsif, dan batas penggunaannya.
- Bedakan komponen fondasi yang dipakai lintas ekosistem PLUITS dari komponen khusus Social Media.
- Komponen umum (misalnya tombol, field, dialog, avatar dasar, sistem spacing, dan pola layout umum) ditempatkan dalam gudang/fondasi UI bersama jika memang dapat digunakan lintas modul.
- Komponen yang hanya memiliki makna atau perilaku khusus Social Media ditempatkan pada pustaka/ruang komponen Social Media, tetapi tetap mengikuti standar fondasi UI bersama.
- Halaman dibangun dengan merangkai komponen yang sudah ditentukan dan didokumentasikan, bukan membuat versi tombol, kartu, jarak, atau pola yang berbeda-beda tanpa aturan.
- Perubahan komponen bersama harus melalui pemeriksaan dampak karena dapat digunakan oleh banyak halaman dan ekosistem.

#### 7. Makna dan tata kelola “gudang” UI

Analogi gudang yang dijelaskan pengguna mengarah pada tempat penyimpanan terpusat dan teratur untuk material yang dapat dipakai kembali, seperti standar visual, ikon, aset, pola layout, komponen, dan dokumentasinya.

- Gudang/fondasi UI lintas PLUITS berada pada tanggung jawab `06-PLATFORM-UI-FOUNDATION/` dalam Master Model.
- Gudang tersebut menjadi sumber standar bersama, bukan tempat mencampur seluruh halaman dan logika fitur.
- Materi yang disimpan dapat mencakup design tokens, ukuran dan spacing, tipografi, warna, breakpoint, aturan responsif, logo/brand assets, ikon SVG lokal, komponen umum, pola layout, pola interaksi, dokumentasi penggunaan, dan aturan perubahan/kualitas.
- Komponen khusus Social Media tetap dikelompokkan dalam domain Social Media; komponen khusus Marketplace tetap dalam domain Marketplace, dan seterusnya. Komponen tersebut boleh menggunakan standar dan komponen dasar dari gudang bersama.
- Setiap aset/komponen perlu memiliki identitas, kategori, dokumentasi, status (misalnya draft/review/approved/deprecated), serta aturan penggunaan agar tidak ada duplikasi atau versi yang tidak jelas.
- Tidak mengambil ikon atau aset eksternal secara otomatis; inventaris dan sumber aset harus dikelola sesuai aturan PLUITS.
- Gudang ini berbeda dari Sharing Inbox: Sharing Inbox menampung catatan mentah dan bahan diskusi, sedangkan gudang UI menyimpan standar/aset/komponen yang telah ditata untuk digunakan. Materi Sharing Inbox belum otomatis menjadi aset atau aturan resmi gudang.

#### 8. Urutan persiapan yang diturunkan dari arahan ini

1. Audit database dan sistem akun yang sudah ada agar akun terdaftar tetap aman dan dapat digunakan.
2. Susun ulang peta ekosistem, ruang lingkup Social Media, flowchart, dan perjalanan pengguna.
3. Buat inventaris halaman lengkap dan tempatkan setiap spesifikasi pada jalur dokumentasi yang sesuai.
4. Susun rulebook Social Media per jenis halaman, konten, dan interaksi.
5. Turunkan inventaris komponen dari rulebook dan halaman.
6. Audit gudang UI yang ada; tentukan standar/aset/komponen yang dapat dipakai, diperbaiki, ditambah, atau perlu dibangun ulang.
7. Dokumentasikan komponen bersama di Platform UI Foundation dan komponen khusus di domain masing-masing.
8. Audit kontrak database/backend dan kebutuhan frontend baru sebelum memilih atau mengunci teknologi.
9. Susun rencana versi, lingkungan pengembangan/preview terpisah, pengujian, penerimaan, dan penggantian frontend lama.
10. Implementasikan setelah struktur dan kebutuhan cukup jelas serta telah ditinjau sesuai proses persetujuan.

Urutan ini merupakan rencana persiapan yang diturunkan dari arahan pengguna; belum merupakan persetujuan untuk langsung mengubah kode, database, workflow, atau deployment.

#### Keputusan eksplisit dari klarifikasi ini

- Flowchart dan struktur frontend PLUITS generasi baru dibuat dari awal.
- Frontend lama tidak ditambal dan tidak dicampur dengan struktur baru; setelah versi baru diterima, frontend lama akan digantikan.
- Database yang sama tetap digunakan agar akun pengguna yang sudah terdaftar tetap dipertahankan.
- Inventaris halaman, aturan Social Media, dan komponen harus disusun serta ditempatkan pada jalur/folder yang sesuai.
- Empat jalur kerja sementara tetap menjadi acuan: Design, Development, Project, dan Checklist-Audit; pembagian dapat ditambah bila diperlukan.
- Gudang UI adalah tempat teratur untuk standar/aset/komponen reusable, terpisah dari Sharing Inbox dan tidak menjadi tempat mencampur logika seluruh modul.

#### Hal yang masih terbuka

- Bagaimana struktur flowchart baru dan urutan halaman lengkap Social Media setelah seluruh perjalanan pengguna dipetakan?
- Apakah autentikasi dan API yang sekarang dapat dipakai langsung oleh frontend baru, atau memerlukan penyesuaian?
- Apa kondisi dan struktur database saat ini, termasuk bagaimana akun terdaftar dipertahankan tanpa perubahan data yang merusak?
- Apa ukuran/rasio/dimensi final untuk Post, Story, Reel, avatar, dan media lainnya?
- Apa batas jumlah foto/video, durasi, ukuran file, batas karakter caption, dan aturan validasi tiap format?
- Bagaimana struktur folder aktual untuk pustaka komponen umum dan komponen khusus Social Media agar tidak tumpang tindih?
- Bagaimana proses review dan persetujuan sebelum komponen/aturan masuk status approved di gudang UI?
- Kapan dan dengan kriteria apa frontend lama dinonaktifkan/dihapus setelah versi baru diterima?



### Penegasan universal — aturan perubahan, peta lokasi kode, dampak, dan SOP untuk seluruh PLUITS

Pengguna menegaskan bahwa aturan rinci tidak boleh berhenti pada spesifikasi desain atau daftar komponen. Setiap aturan dan komponen harus dilengkapi petunjuk perubahan yang dapat diikuti oleh assistant maupun staf developer PLUITS pada masa mendatang.

Tujuannya adalah agar setiap perintah perubahan dapat ditelusuri ke lokasi yang benar, dilakukan pada bagian yang memang bertanggung jawab, dan tidak menyebabkan kerusakan pada halaman, komponen, atau layanan lain.

#### 1. Aturan harus memiliki petunjuk perubahan yang dapat ditelusuri

Setiap aturan, elemen UI, komponen, dan perilaku fitur perlu menjelaskan:
- Apa nama elemen/fitur dan apa tanggung jawabnya.
- Di halaman, alur, dan modul mana elemen tersebut digunakan.
- Di mana sumber standar/resmi untuk elemen tersebut disimpan.
- Di mana implementasi komponen berada dalam repository ketika implementasi sudah dibuat.
- Di mana CSS/styling yang mengatur tampilan elemen tersebut berada.
- Apakah ukuran/warna/jarak berasal dari design token bersama atau aturan lokal komponen.
- Bagian lain apa yang bergantung pada komponen, token, aset, atau perilaku tersebut.
- File, folder, selector, token, registry, atau kontrak mana yang boleh diubah untuk jenis perubahan tertentu.
- Bagian mana yang tidak boleh diubah secara langsung karena dimiliki oleh komponen atau modul lain.
- Apa dampak yang mungkin terjadi jika perubahan dilakukan, termasuk halaman dan fitur lain yang dapat ikut terpengaruh.
- Pengujian dan pemeriksaan apa yang wajib dijalankan setelah perubahan.
- Bagaimana memastikan hasil perubahan sesuai aturan dan tidak menyebabkan regresi.

Lokasi file aktual tidak boleh ditebak atau dibuat-buat dalam dokumentasi. Setelah struktur implementasi baru ditentukan, setiap petunjuk harus menunjuk ke path, simbol, token, atau registry yang benar dan diperiksa kembali ketika kode berubah.

#### 2. Contoh alur perintah perubahan yang diharapkan

Contoh perintah pemilik produk: **“Tolong ubah ikon Love pada Post.”**

Developer harus dapat menelusuri urutannya:
1. Identifikasi bahwa ikon tersebut adalah bagian dari komponen aksi/interaksi pada kartu Post Social Media.
2. Buka aturan Post dan spesifikasi komponen aksi Post untuk memahami fungsi, ukuran, posisi, keadaan normal/aktif, dan perilakunya.
3. Ikuti referensi ke komponen implementasi dan sumber ikon resmi PLUITS yang benar.
4. Periksa apakah ikon memakai aset SVG lokal atau pemetaan dalam Icon Registry; jangan mengganti aset pada halaman lain secara sembarangan.
5. Periksa semua penggunaan komponen/ikon tersebut dan tentukan apakah perubahan hanya berlaku pada Post atau merupakan perubahan ikon bersama.
6. Ubah sumber yang memang menjadi pemilik ikon/komponen; jangan menimpa CSS global atau komponen yang tidak terkait.
7. Jalankan pemeriksaan visual dan fungsional pada Post, termasuk kondisi belum disukai/sudah disukai serta ukuran layar yang relevan.
8. Periksa halaman lain yang menggunakan sumber bersama tersebut sebelum menyatakan perubahan selesai.

Contoh kedua: **“Tolong ubah ukuran tombol.”**
- Tentukan tombol dan konteks penggunaannya terlebih dahulu.
- Jika ukuran berasal dari token/komponen tombol bersama, perubahan dilakukan melalui sumber standar tersebut dan dampak terhadap seluruh pengguna komponen diperiksa.
- Jika ukuran memang merupakan variasi lokal yang disetujui, perubahan dilakukan pada styling komponen pemiliknya.
- Jangan membuat override CSS baru di halaman secara spontan apabila aturan mengharuskan penggunaan token atau variasi resmi.
- Uji semua varian dan halaman terdampak sebelum perubahan diterima.

Contoh ini menggambarkan sistem penelusuran perubahan yang diminta; path dan nama file implementasi final baru dapat dicatat setelah struktur frontend baru dirancang dan dibangun.

#### 3. Setiap komponen memerlukan Change Map / peta perubahan

Peta perubahan perlu menjadi bagian dari dokumentasi komponen/aturan. Sekurang-kurangnya memuat:
- **Component identity:** nama, ID/rujukan, domain pemilik, dan versi.
- **Product/design rule:** aturan yang mengendalikan tampilan dan perilaku.
- **Implementation location:** path file, ekspor komponen, registry, atau simbol sumber.
- **Style ownership:** lokasi CSS/module stylesheet, token, dan aturan styling yang berlaku.
- **Asset ownership:** lokasi ikon, gambar, font, atau aset lokal terkait.
- **Consumers/dependencies:** halaman, fitur, komponen, dan layanan lain yang menggunakan sumber tersebut.
- **Allowed changes:** jenis perubahan yang boleh dilakukan dan tempat perubahan yang benar.
- **Protected boundaries:** bagian yang tidak boleh disentuh oleh perubahan ini.
- **Impact assessment:** kemungkinan dampak lokal dan lintas modul.
- **Required checks:** test fungsi, visual, responsif, aksesibilitas, dan pemeriksaan regresi yang relevan.
- **Change history:** alasan, tanggal, versi, perubahan yang dilakukan, pemeriksa, dan hasil validasi.

Peta perubahan harus tetap diperbarui ketika komponen dipindahkan, diganti, dipecah, digabungkan, atau ketika dependensinya berubah. Dokumentasi yang menunjuk ke lokasi lama harus diperbaiki agar tidak menyesatkan staf.

#### 4. Aturan kepemilikan dan batas perubahan

- Setiap komponen, aturan, aset, token, dan layanan harus mempunyai satu sumber resmi yang jelas (*single source of truth*) dan domain pemilik.
- Komponen bersama dimiliki oleh Platform UI Foundation atau layanan bersama sesuai tanggung jawabnya; komponen khusus tetap dimiliki oleh ekosistem/fitur terkait.
- Halaman menggunakan komponen melalui kontrak yang ditentukan, bukan mengubah isi internal komponen milik domain lain.
- Perubahan pada token atau komponen bersama wajib mengidentifikasi seluruh pengguna/consumer dan menilai dampak sebelum dilakukan.
- Perubahan lokal tidak boleh diam-diam mengubah standar global.
- Perubahan pada komponen global tidak boleh dilakukan hanya untuk memenuhi kebutuhan satu halaman jika kebutuhan itu seharusnya berupa variasi lokal yang terkontrol.
- Jika satu perubahan membutuhkan modifikasi lintas domain, dokumentasikan dependensi dan koordinasikan seluruh pemilik bagian yang terdampak.
- Tidak boleh ada aturan “jangan diubah” tanpa alasan dan jalur perubahan resmi. Jika bagian dilindungi, dokumentasikan siapa/apa yang berwenang mengubahnya, kapan pengecualian dapat diberikan, dan pemeriksaan yang diperlukan.

#### 5. SOP penerimaan setiap perintah perubahan

Setiap perintah perubahan dari pemilik produk atau staf harus mengikuti alur yang konsisten:
1. Catat permintaan dan identifikasi hasil yang diinginkan.
2. Temukan aturan, halaman, komponen, dan sumber implementasi yang menjadi pemiliknya.
3. Periksa dependensi dan semua pengguna komponen/sumber yang akan diubah.
4. Baca batas perubahan, larangan, serta persyaratan kompatibilitas.
5. Susun penilaian dampak dan daftar file/area yang akan disentuh.
6. Lakukan perubahan sekecil dan sespesifik mungkin pada sumber yang benar.
7. Jalankan test dan audit sesuai Change Map.
8. Periksa area lain yang berpotensi terdampak; jangan hanya memeriksa halaman yang diminta.
9. Catat hasil, file/simbol yang berubah, test, risiko, dan keputusan penerimaan.
10. Perbarui dokumentasi, peta perubahan, dan riwayat jika perubahan mengubah aturan atau struktur.

Jika lokasi pemilik, kontrak, atau dampak belum jelas, staf wajib melakukan audit/menanyakan klarifikasi sebelum mengubah kode. Dilarang menebak lokasi CSS atau menambahkan override global hanya agar perubahan tampak cepat selesai.

#### 6. Berlaku untuk seluruh layanan dan bagian PLUITS

Pengguna menegaskan bahwa ketentuan ini tidak hanya berlaku untuk Social Media atau komponen UI. Aturan perubahan dan petunjuk penelusuran harus diterapkan pada seluruh layanan, seluruh ekosistem, serta seluruh bagian PLUITS.

Cakupan yang dimaksud termasuk, tetapi tidak terbatas pada:
- Global Home, Social Media, Circle, Feed, Post, Story, Reel, profil, komentar, interaksi, dan Inbox/messenger jika ditetapkan;
- Marketplace beserta Store dan Restaurant & Café;
- Tickets & Accommodation;
- Geo/Local & Global Guide Directory;
- Logistics & Transportation;
- Digital Wallet;
- shared platform services, akun, membership, role/permission, notifikasi, dan layanan bersama;
- frontend, backend, database, API, integrasi eksternal, aset, konfigurasi, infrastruktur, pengujian, deployment, dan dokumentasi.

Untuk perubahan backend/database/API, peta perubahan juga harus menjelaskan tabel atau entitas yang terlibat, relasi, kontrak, kebijakan akses, consumer, migrasi/rollback, dan risiko terhadap data. Untuk perubahan infrastruktur/deployment, dokumentasikan layanan yang terdampak, konfigurasi, dependensi, prosedur validasi, serta pemulihan.

#### 7. Standar kerja untuk staf developer PLUITS

Dokumentasi harus dapat digunakan sebagai panduan operasional oleh staf developer baru maupun tim yang sudah bekerja:
- Developer tidak perlu menebak folder atau file yang benar.
- Developer dapat membaca aturan, mengikuti referensi lokasi, memahami batas perubahan, dan mengetahui dampak sebelum menyentuh kode.
- Developer mengetahui bagian yang boleh diubah, bagian yang harus dilindungi, dan siapa/apa pemiliknya.
- Developer dapat mengetahui test apa yang wajib dilakukan dan apa bukti bahwa perubahan aman.
- Developer tidak menganggap satu file CSS atau komponen boleh diubah bebas hanya karena perubahan visual diminta.
- Standar yang sama berlaku meskipun pekerjaan dilakukan oleh staf berbeda, assistant, atau tim pengembang pada masa mendatang.

#### Keputusan eksplisit dari klarifikasi ini

- Setiap aturan harus memiliki petunjuk penelusuran perubahan yang menjelaskan lokasi sumber, styling/CSS, aset, dependensi, batas perubahan, dan dampak.
- Setiap komponen/aturan perlu memiliki Change Map yang menghubungkan dokumentasi produk/desain dengan lokasi implementasi aktual.
- Setiap perintah perubahan harus diawali dengan identifikasi sumber pemilik dan pemeriksaan dampak, bukan langsung mengedit file yang terlihat berkaitan.
- Perubahan harus dibatasi pada sumber yang benar, diikuti test dan pemeriksaan regresi, serta pembaruan dokumentasi jika diperlukan.
- Aturan perubahan rinci ini berlaku untuk seluruh layanan dan bagian PLUITS, bukan hanya Social Media.
- Dokumentasi harus menjadi pedoman kerja yang dapat diikuti staf developer PLUITS pada masa mendatang.

#### Hal yang masih perlu dirancang

- Format baku Change Map dan apakah diletakkan di setiap komponen, di katalog pusat, atau keduanya dengan satu sumber resmi.
- Sistem identitas/ID untuk halaman, komponen, token, aset, API, tabel, dan layanan agar saling dapat dirujuk.
- Cara otomatis memeriksa apakah referensi path, simbol, consumer, dan dependensi dalam dokumentasi masih valid setelah perubahan kode.
- Mekanisme ownership/review untuk perubahan lintas ekosistem dan komponen bersama.
- Matriks dampak serta level risiko perubahan (lokal, shared, lintas modul, data/API, dan infrastruktur).
- Standar bukti pengujian dan persetujuan sebelum perubahan dapat dirilis.
- Cara menjaga SOP tetap sinkron dengan implementasi ketika struktur kode berkembang.



### Penegasan lanjutan — urutan fondasi desain dan perpustakaan layout PLUITS

Pengguna menetapkan urutan kerja utama ketika merancang atau membangun halaman, fitur, dan layanan PLUITS. Pengguna juga meminta perpustakaan layout yang berisi banyak pola komposisi siap pakai dan dapat dipanggil kembali dengan nama atau ID tertentu.

#### 1. Urutan standar sebelum membuat halaman/fitur

Urutan prioritas yang disampaikan pengguna:

1. **Ukuran dan dimensi terlebih dahulu**
   - Ukuran dasar dan skala; lebar, tinggi, batas minimum/maksimum.
   - Rasio media dan ukuran gambar/video.
   - Spacing, padding, gap, ukuran elemen, grid, container, breakpoint, dan aturan responsif.
   - Ukuran untuk perangkat/viewport yang relevan.
2. **Ikon**
   - Inventaris ikon resmi, nama/ID, kategori, ukuran, posisi, alignment, dan varian.
   - Sumber aset SVG lokal/Icon Registry serta aturan pemetaan ikon pada fitur.
3. **Warna**
   - Palet dan design tokens; warna teks, latar, border, ikon, status, dan interaksi.
   - Kontras, konteks penggunaan, tema, dan varian yang didukung.
4. **Perilaku**
   - Aksi/interaksi, trigger, hasil, navigasi, feedback, validasi, animasi, dan aksesibilitas.
   - State normal, aktif, nonaktif, focus/hover bila relevan, loading, error, empty, success, dan disabled.
   - Perilaku responsif serta input sentuh/keyboard sesuai konteks.
5. **Layout**
   - Komposisi halaman dan penempatan bagian.
   - Pola susunan komponen dan struktur area halaman.
   - Pemilihan pola dari perpustakaan layout yang sudah disiapkan.
   - Variasi layout sesuai jenis halaman dan kebutuhan ekosistem.

Urutan prioritas desain yang diminta pengguna adalah **ukuran/dimensi → ikon → warna → perilaku → layout**. Detail penerapan dapat disesuaikan dengan jenis artefak, tetapi standar fondasi yang relevan tidak boleh diabaikan. Layout harus menggunakan ukuran, aset, warna, dan perilaku yang sudah memiliki aturan; bukan membuat nilai acak sendiri di tiap halaman.

#### 2. Ukuran dan dimensi menjadi fondasi pertama

- Sebelum merancang detail visual halaman, tetapkan sistem ukuran yang konsisten.
- Sistem ukuran meliputi skala komponen, rasio media, spacing, container, grid, breakpoint, dan responsivitas, bukan hanya lebar/tinggi halaman.
- Ukuran dibedakan menurut konteks: perangkat/viewport, tipe media, jenis komponen, dan jenis halaman.
- Nilai resmi memiliki ID/nama token atau referensi, dokumentasi penggunaan, dan pemilik.
- Jika ukuran berasal dari token bersama, halaman/komponen wajib menggunakan token tersebut, bukan membuat nilai tandingan sembarangan.
- Ukuran khusus hanya dibuat sebagai varian terdokumentasi dengan alasan, cakupan, dan dampak jelas.
- Angka final belum ditetapkan; seluruh ukuran perlu diinventarisasi, dianalisis, lalu ditetapkan dalam rulebook dan fondasi UI.

#### 3. Inventaris ikon sebagai perpustakaan resmi

- PLUITS memerlukan katalog ikon lengkap dan terorganisasi untuk seluruh ekosistem.
- Setiap ikon memiliki identitas/nama, kategori, sumber aset, ukuran/varian, makna, konteks penggunaan, dan status.
- Ikon resmi dikelola sebagai aset lokal/registry PLUITS; hindari salinan aset yang tidak terlacak.
- Katalog mencakup ikon umum lintas platform serta ikon khusus per ekosistem/fitur.
- Halaman/komponen merujuk pada ikon katalog, sehingga perintah seperti mengubah ikon Love pada Post dapat dilacak ke sumber yang benar.
- Inventaris final ikon belum disusun; kebutuhan ikon diturunkan dari inventaris halaman dan komponen.

#### 4. Sistem warna sebagai fondasi yang terkontrol

- Warna disusun dalam palet/token resmi, bukan ditetapkan berbeda-beda oleh tiap halaman.
- Dokumentasi menyebut peran warna (text, surface, border, primary action, status, feedback) dan konteks penggunaannya.
- Variasi warna per tema/ekosistem memiliki batas jelas agar identitas PLUITS konsisten tanpa memaksakan semua layanan memiliki tampilan identik.
- Perubahan token warna bersama memerlukan pemeriksaan seluruh consumer.
- Nilai warna dan tema final masih perlu ditentukan.

#### 5. Perilaku komponen dan halaman

- Perilaku harus menjadi aturan eksplisit, bukan interpretasi masing-masing developer.
- Dokumentasikan trigger, aksi, hasil, transisi state, validasi, feedback, error handling, loading, empty state, akses, dan batas penggunaan.
- Interaksi dengan tanggung jawab sama dapat memakai pola/kontrak bersama.
- Perilaku khusus ekosistem tetap dimiliki dan didokumentasikan dalam domainnya.
- Perubahan perilaku harus dilacak ke aturan dan implementasi pemilik serta menjalani uji fungsional/regresi yang relevan.

#### 6. Perpustakaan Layout PLUITS

Pengguna secara eksplisit meminta perpustakaan layout dengan banyak pilihan pola dan gaya komposisi. Tujuannya agar saat membuat halaman, pengguna dapat memerintahkan assistant/developer menggunakan layout tertentu berdasarkan nama atau ID, misalnya **“gunakan Layout ABCD.”**

Perpustakaan ini harus:
- Menyediakan layout reusable dengan jenis dan gaya komposisi beragam.
- Memiliki katalog yang dapat dicari berdasarkan ID, nama, kategori, tujuan, dan konteks.
- Memiliki preview/contoh visual agar pengguna dan developer memahami komposisinya.
- Menjelaskan struktur area/slot dan jenis komponen yang boleh ditempatkan di setiap area.
- Menjelaskan ukuran/container/grid/spacing, breakpoint, dan perilaku responsif.
- Menjelaskan kecocokan penggunaan, kondisi yang tidak sesuai, dan keterbatasannya.
- Menjelaskan variasi resmi serta bagian yang boleh/tidak boleh disesuaikan.
- Memiliki dokumentasi implementasi, styling, consumer, Change Map, dan test.
- Menyediakan pola lintas platform dan pola khusus ekosistem bila kebutuhan memang berbeda.
- Memungkinkan layout digunakan kembali tanpa menyalin struktur dan CSS secara bebas.

#### 7. Kategori awal perpustakaan layout untuk diaudit

Kategori berikut merupakan usulan pengelompokan awal, bukan daftar layout final atau keputusan bahwa semua contoh wajib dibuat:
- **Application Shell:** kerangka aplikasi, header, navigasi bawah, sidebar, area konten.
- **Social Feed:** feed, kartu Post, Story, Reels, profil sosial, discovery.
- **Directory/Discovery:** daftar entitas, peta + daftar, nearby, kategori, hasil pencarian.
- **Marketplace:** katalog/grid/list produk, detail produk, keranjang, checkout.
- **Merchant Operations:** dashboard operasional, menu/produk, pesanan, meja, manajemen merchant.
- **Content/Editorial:** artikel, detail konten, galeri, halaman informasi.
- **Forms & Account:** login, registrasi, pemulihan akun, pengaturan, form bertahap.
- **Dashboard & Management:** ringkasan, tabel data, detail record, filter, panel administrasi.
- **Booking & Journey:** pencarian, jadwal/paket, pemesanan, pembayaran, tiket/voucher, riwayat.
- **Communication:** inbox, daftar/detail percakapan, notifikasi, pusat pesan.
- **Wallet & Transaction:** saldo, aktivitas, detail transaksi, alur pembayaran.

Kategori dapat ditambah atau dipecah berdasarkan kebutuhan seluruh ekosistem PLUITS.

#### 8. Identitas dan dokumentasi setiap Layout

Setiap layout memiliki katalog/lembar spesifikasi yang sekurang-kurangnya memuat:
- Layout ID unik dan stabil (contoh ilustratif: `LAY-SOC-FEED-001` atau alias `ABCD`);
- nama, kategori, versi, status, dan pemilik;
- tujuan, deskripsi, preview, dan contoh halaman;
- struktur area/slot dan urutan komposisi;
- ukuran/container/grid/spacing/breakpoint;
- aturan ikon, warna, dan perilaku yang digunakan;
- komponen yang boleh ditempatkan pada tiap slot;
- aturan responsif dan variasi resmi;
- batas penggunaan dan larangan perubahan;
- lokasi implementasi dan CSS aktual setelah dibuat;
- consumer/dependensi, Change Map, dan test visual/fungsional/regresi;
- riwayat perubahan dan kompatibilitas versi.

Nama ABCD hanya contoh alias. Sistem penamaan/ID final perlu dirancang agar tidak bentrok dan mudah dipahami tim.

#### 9. Pemisahan fondasi, komponen, layout, dan halaman

- **Design Foundation** menyimpan standar ukuran, token, ikon, warna, dan aturan dasar lintas ekosistem.
- **Component Library** menyimpan komponen reusable dengan fungsi dan kontrak jelas.
- **Layout Library** menyimpan pola komposisi yang merangkai komponen ke struktur halaman.
- **Page/Feature Specification** menjelaskan halaman/fitur, memilih layout yang sesuai, dan menentukan konten serta komponen yang ditempatkan.
- Halaman tidak boleh menduplikasi layout/komponen yang tersedia tanpa alasan dan persetujuan terdokumentasi.
- Layout khusus ekosistem boleh disimpan di domain ekosistem; standar dan layout bersama berada di Platform UI Foundation. Keduanya saling merujuk dengan jelas.

#### 10. Alur penggunaan perpustakaan saat menerima perintah

Contoh: **“Buat halaman profil menggunakan Layout ABCD.”**

1. Cari Layout ID/alias ABCD pada katalog.
2. Periksa preview, versi, status, tujuan, dan kecocokannya.
3. Baca spesifikasi ukuran, grid, breakpoint, slot, dan batas penggunaan.
4. Ambil komponen resmi untuk slot terkait.
5. Gunakan token ukuran, ikon, dan warna yang telah ditetapkan.
6. Terapkan perilaku sesuai spesifikasi halaman/fitur.
7. Hubungkan halaman dengan layout tanpa menggandakan atau mengubah sumber layout secara langsung.
8. Periksa penyesuaian lokal yang diperbolehkan.
9. Jalankan test responsif, visual, fungsional, dan regresi sesuai Change Map.
10. Catat Layout ID dan versi yang digunakan pada spesifikasi halaman.

Jika layout yang diminta belum ada atau tidak cocok, developer tidak boleh diam-diam mengubah layout lain hingga kehilangan identitasnya. Ajukan layout baru atau varian resmi, dokumentasikan alasan, dan ikuti proses review.

#### Keputusan eksplisit dari klarifikasi ini

- Urutan fondasi desain adalah ukuran/dimensi → ikon → warna → perilaku → layout.
- PLUITS harus menyiapkan sistem ukuran/dimensi resmi sebelum membuat halaman dan komponen secara luas.
- PLUITS harus memiliki katalog/perpustakaan ikon resmi yang dapat ditelusuri.
- PLUITS harus memiliki sistem warna/token terkontrol.
- Perilaku komponen dan halaman harus memiliki aturan eksplisit.
- PLUITS harus memiliki perpustakaan layout dengan banyak jenis dan gaya komposisi yang dapat dipanggil melalui nama/ID, misalnya “gunakan Layout ABCD”.
- Layout, komponen, fondasi desain, dan spesifikasi halaman adalah tanggung jawab berbeda yang saling merujuk.
- Aturan dan Change Map berlaku untuk layout juga: sumber, styling, batas perubahan, consumer, dampak, dan test harus diketahui.

#### Hal yang masih perlu dirancang

- Skala ukuran/dimensi final, rasio media, spacing scale, grid, container, dan breakpoint.
- Daftar ikon lengkap serta sistem ID/kategori/varian.
- Palet warna, semantic tokens, tema, dan aturan kontras.
- Format spesifikasi perilaku dan state.
- Kategori, sistem penamaan/ID, versi, dan katalog visual Layout Library.
- Jumlah layout awal per ekosistem dan prioritas pembuatannya.
- Mekanisme preview/interaktif untuk meninjau layout sebelum digunakan.
- Lokasi folder implementasi final untuk layout dan hubungan dokumentasinya dengan gudang UI.



### Penegasan lanjutan — urutan proyek pengujian awal fondasi PLUITS

Pengguna menetapkan urutan halaman/area yang akan dibuat pertama kali setelah fondasi desain dan perpustakaan UI disiapkan. Halaman-halaman ini menjadi proyek awal untuk menguji apakah fondasi yang dibangun benar-benar dapat digunakan sebelum pengembangan Social Media diperluas.

#### Urutan pengembangan/pengujian awal

1. **Halaman Pendaftaran**
   - Dibuat pertama karena pengguna menilai alur pendaftaran sebagai halaman yang paling kompleks untuk pengujian awal.
   - Menjadi pengujian terhadap fondasi ukuran/dimensi, komponen form, ikon, warna, perilaku, layout, dan responsivitas.
   - Kebutuhan yang perlu diaudit dalam spesifikasi halaman antara lain alur input, validasi, state, feedback, verifikasi akun, keamanan, serta kondisi berhasil/gagal.
   - Daftar field, metode pendaftaran, langkah verifikasi, dan aturan keamanan final belum ditetapkan melalui klarifikasi ini.

2. **Beranda (Global Home)**
   - Dibangun setelah halaman pendaftaran.
   - Menguji application shell, navigasi, komposisi halaman utama, dan penyajian konteks platform lintas ekosistem.
   - Dalam konteks pembahasan sebelumnya, Beranda dibedakan dari Circle yang merupakan ruang personal pengguna setelah login.
   - Detail konten, section, dan perilaku final Beranda tetap mengikuti audit/spesifikasi tersendiri.

3. **Profil Utama**
   - Dibangun setelah Beranda.
   - Pengguna menegaskan bahwa yang dimaksud adalah **Profil Utama PLUITS**, bukan profil Social Media.
   - Profil Utama merupakan halaman/area tingkat platform atau akun PLUITS; batas informasi, pengaturan, identitas akun, dan fungsinya perlu dirinci tersendiri.
   - Jangan menyamakan atau menggabungkan spesifikasi Profil Utama dengan profil sosial pengguna.

4. **Social Media**
   - Dikembangkan setelah tiga area awal di atas.
   - Mencakup pengalaman sosial seperti Circle, Feed, Post, Story, Reels, dan profil sosial, sesuai inventaris halaman serta audit kebutuhan Social Media.
   - Profil sosial tetap merupakan halaman berbeda dari Profil Utama.

#### Tujuan pengujian bertahap

- Menguji fondasi UI menggunakan kasus nyata dengan kompleksitas yang meningkat.
- Menemukan kekurangan pada sistem ukuran, komponen, ikon, warna, perilaku, layout, dan Change Map sebelum banyak halaman bergantung padanya.
- Memastikan halaman dapat dibangun dengan menggunakan katalog dan layout yang sudah disiapkan, bukan melalui CSS/komponen ad hoc.
- Memvalidasi bahwa perubahan satu komponen tidak merusak halaman lain.
- Menjadi dasar evaluasi sebelum pola dan fondasi tersebut dipakai lebih luas di seluruh ekosistem PLUITS.

#### Keputusan eksplisit dari klarifikasi ini

- Setelah fondasi UI dan perpustakaan disiapkan, urutan proyek pengujian awal adalah: **Pendaftaran → Beranda → Profil Utama → Social Media**.
- Halaman Pendaftaran menjadi halaman pertama karena dianggap paling kompleks dan menjadi pengujian awal yang penting.
- Beranda dibuat setelah Pendaftaran.
- Profil Utama dibuat setelah Beranda dan harus dibedakan dari profil Social Media.
- Social Media dikembangkan setelah ketiga area awal tersebut.
- Urutan ini merupakan urutan awal pembuatan/pengujian, bukan pernyataan bahwa seluruh detail fitur dan desainnya sudah final.

#### Hal yang masih perlu dirancang

- Inventaris lengkap alur pendaftaran dan semua state/variasi verifikasinya.
- Batas tanggung jawab Beranda Global Home, Circle, dan application shell.
- Definisi, isi, pengaturan, dan alur Profil Utama.
- Relasi antara Profil Utama, identitas akun, membership, roles/permissions, dan profil sosial.
- Kriteria penerimaan serta test plan untuk setiap tahap sebelum lanjut ke tahap berikutnya.


## Status akhir

RAW


### Penegasan lanjutan — membangun ulang frontend dan waktu menyiapkan lingkungan pengujian online

Pengguna mengubah arah pemeliharaan frontend PLUITS yang saat ini dipublikasikan melalui GitHub Pages. Karena jumlah pengguna masih sangat sedikit (dalam penjelasan disebut baru dua pengguna, lalu ditegaskan bahwa penggunaan praktis saat ini masih oleh pemilik sendiri), pengguna tidak lagi menganggap frontend lama perlu dipertahankan sebagai aplikasi yang harus terus berjalan selama pembangunan ulang.

#### 1. Frontend lama tidak perlu dipertahankan

- Pengguna mengarahkan agar website/frontend yang saat ini berada di GitHub Pages langsung dirombak dan dibersihkan, lalu dibangun ulang menggunakan struktur modular baru.
- Arah ini menggantikan rencana sebelumnya yang mengharuskan website lama tetap berjalan selama frontend baru dikembangkan secara terpisah.
- Tujuannya adalah memulai dari struktur yang sudah dirancang dan dimodularisasi, bukan terus menambal atau mempertahankan susunan frontend lama yang dianggap tidak lagi diperlukan.
- Ini adalah arahan untuk mengganti frontend/runtime website lama. Arahan ini **tidak berarti menghapus database, akun, atau data pengguna**.
- Database dan data akun yang telah ada tetap harus dijaga. Sebelum perubahan yang menyentuh integrasi backend, autentikasi, API, atau skema database, perlu audit kompatibilitas dan perlindungan data. Tidak boleh melakukan reset atau penghapusan data pengguna sebagai bagian dari pembersihan frontend.
- Belum ada perintah teknis terpisah untuk menjalankan penghapusan atau deployment pada sesi sharing ini.

#### 2. Urutan pembangunan dan pengujian bertahap

Pengguna menegaskan bahwa pembangunan dilakukan bertahap, dan setiap tahap harus diuji sampai layak sebelum berpindah ke tahap berikutnya.

1. **Fondasi dan struktur modular baru** — menyiapkan susunan frontend serta standar modularisasi yang telah dibahas.
2. **Formulir/halaman Pendaftaran** — menjadi halaman pertama yang dibangun dan diuji. Pengujian tidak hanya menilai tampilan UI, tetapi juga kecocokan ukuran dan komponen, perilaku, validasi, fungsi alur, serta integrasi dan kualitas backend yang mendukungnya.
3. **Beranda (Global Home)** — dikerjakan setelah tahap Pendaftaran dinilai baik.
4. **Profil Utama** — tahap ini merujuk pada Profil Utama PLUITS sebagaimana urutan yang telah dibahas sebelumnya. Penyebutan “ID” pada transkripsi voice note sebelumnya adalah kesalahan transkripsi, bukan istilah atau nama bagian yang dimaksud pengguna.
5. **Social Media** — dikembangkan setelah tahap-tahap sebelumnya. Fitur dan pengalaman Social Media perlu diselesaikan serta diuji sebagai satu bagian penting sebelum aplikasi dinilai cukup siap untuk membuka akses kepada pengguna lain.

- Setiap tahap perlu melalui pemeriksaan UI/UX, responsivitas, fungsi, integrasi backend, dan pengujian terkait.
- Tahap berikutnya tidak dimulai hanya karena halaman sebelumnya sudah terlihat selesai; fungsi dan integrasinya juga harus dinilai baik.
- Kriteria penerimaan rinci, daftar test, dan batas “selesai” setiap tahap masih perlu dirancang.
- Urutan ini memperbarui dan memperjelas rencana pengujian awal sebelumnya: Pendaftaran → Beranda → Profil Utama → Social Media.

#### 3. Lingkungan pengujian online disiapkan pada tahap yang lebih matang

- Pengguna tidak meminta agar tempat pengujian online permanen dibuat sekarang, pada awal pembangunan ulang.
- Setelah aplikasi baru sudah cukup berkembang dan Social Media telah selesai dibangun serta diuji, barulah disiapkan satu tempat/lingkungan pengujian yang dapat diakses secara online.
- Lingkungan pengujian tersebut dimaksudkan untuk tetap tersedia dan digunakan kembali saat ada perubahan atau pengembangan versi berikutnya, misalnya versi 2.
- Lingkungan pengujian harus dibedakan dari aplikasi yang digunakan pengguna umum. Data dan akses pengujian perlu dikendalikan agar data privat atau data uji tidak terbuka kepada publik.
- Cara penyediaan hosting/preview, hubungan dengan production, backend dan database pengujian, kontrol akses, serta proses promosi versi belum diputuskan.
- Pernyataan bahwa lingkungan pengujian akan dibiarkan online dicatat sebagai kebutuhan jangka panjang; bukan persetujuan untuk langsung mengubah workflow, hosting, atau deployment saat ini.

#### Keputusan/arah eksplisit yang dicatat

- Frontend lama di GitHub Pages tidak perlu lagi dipertahankan sebagai basis pengembangan; arahnya adalah dibersihkan/diganti dengan frontend baru yang modular.
- Pembangunan dimulai dari struktur/fondasi modular baru, lalu Pendaftaran, Beranda, area profil tingkat akun, dan Social Media.
- UI, fungsi, dan integrasi backend pada setiap tahap harus diuji dan dinilai baik sebelum melanjutkan.
- Database serta data akun yang sudah ada tetap harus dijaga; pembersihan frontend tidak boleh menjadi alasan menghapus data.
- Lingkungan pengujian online tersendiri baru disiapkan setelah aplikasi berkembang hingga Social Media selesai dan cukup siap diuji untuk akses pengguna lain.
- Lingkungan pengujian online itu diharapkan tetap tersedia untuk menguji perubahan dan versi selanjutnya, termasuk versi 2.
- Catatan ini adalah arah produk/proyek dalam Sharing Inbox. Belum ada perubahan kode, database, konfigurasi hosting, GitHub Actions, atau deployment yang dilakukan.

#### Hal yang masih perlu dipastikan

- Jumlah akun/pengguna aktif yang tepat dan akun mana yang wajib dipertahankan.
- Rincian cakupan, isi, fungsi, dan alur Profil Utama yang perlu diaudit sebelum dibuat.
- Apakah penggantian frontend lama dilakukan langsung pada branch/URL produksi setelah fondasi siap, atau ada tahap cutover tertentu.
- Bagaimana menjaga akun dan data lama tetap kompatibel dengan frontend, autentikasi, API, dan skema baru.
- Kapan tepatnya aplikasi dianggap cukup siap untuk membuka akses pengguna lain.
- Apakah lingkungan pengujian online akan menggunakan backend/database terpisah, data sintetis, atau mekanisme lain; bagaimana aksesnya dilindungi.
- Bagaimana alur versi, misalnya versi produksi saat ini dan versi 2 yang diuji pada lingkungan online sebelum dirilis.


### Audit teknis awal — kickoff pembangunan ulang frontend dan Pendaftaran Akun

**Waktu audit:** 17 November 2026  
**Status:** temuan audit awal; belum menjadi persetujuan perubahan database atau konfigurasi produksi.

#### 1. Arah kerja yang baru dikonfirmasi

- Pengguna mengonfirmasi bahwa pekerjaan yang dimulai adalah pembangunan ulang **frontend PLUITS**, bukan pembuatan cron job.
- Tahap pertama adalah Pendaftaran Akun.
- Pembangunan frontend baru diarahkan menggunakan struktur modular baru; frontend lama tidak dipakai sebagai fondasi implementasi baru.
- Pembersihan/penggantian frontend tidak memberi izin untuk menghapus database, akun, profil, media, atau data PLUITS yang sudah ada.
- Urutan tahap tetap: Pendaftaran → Beranda Global Home → Profil Utama → Social Media.
- Setiap tahap perlu diuji pada UI/UX, responsivitas, perilaku, fungsi, dan integrasi backend sebelum lanjut.

#### 2. Kondisi repository dan deployment yang diperiksa

- Repository: `baguskristiansianturi/pluits`; branch utama: `main`; repository berstatus public.
- Branch kerja baru `rebuild/frontend-v2` dibuat dari `main` untuk memisahkan pekerjaan pembangunan ulang dari branch produksi.
- Commit dasar branch kerja saat dibuat: `6da502fa0cbf889e86839d80c1b9f10943e59c57`.
- Belum ada perubahan source code atau deployment pada saat catatan ini dibuat.
- Workflow `.github/workflows/deploy.yml` menjalankan validasi, test, dan build pada Pull Request, lalu mengunggah artifact; workflow hanya melakukan deployment GitHub Pages pada push ke `main`.
- Workflow saat ini belum menyediakan URL browser-preview tersendiri untuk Pull Request.
- Runtime lama menggunakan Vite 8 dan JavaScript, dengan struktur `src/` yang telah berisi banyak fitur lama, beberapa lapisan styling, dan modul akun/social yang saling terhubung. File `src/style.css` berukuran sekitar 286 KB.
- Controller akun saat ini mengimpor `mountAuthPage` dari `src/features/auth/auth.js`. File `src/features/auth/register.js` juga berisi implementasi pendaftaran terpisah; pemakaian/ketergantungannya harus ditelusuri sebelum file lama dihapus.
- Karena frontend akan dibangun ulang, source lama tidak boleh dihapus satu per satu tanpa pemeriksaan route, import, aset, test, workflow, dan kontrak backend. Penggantian dilakukan sebagai satu perpindahan yang terencana.

#### 3. Kondisi Supabase production yang diperiksa secara read-only

- Project Supabase `pluits`, ref `ytndswhqxayqpftszwfh`, berstatus `ACTIVE_HEALTHY`, region Singapore (`ap-southeast-1`), PostgreSQL 17.
- Live migration history menunjukkan 120 migration yang telah diterapkan.
- Database memiliki 72 tabel pada schema `public`; seluruh 72 tabel yang diperiksa memiliki Row Level Security (RLS) aktif.
- Query agregat Auth menemukan **3 akun**, terdiri dari **2 akun dengan email terkonfirmasi dan 1 akun belum terkonfirmasi**.
- Tabel `public.profiles` memiliki 3 baris dan `public.user_profiles` memiliki 3 baris. Kedua tabel adalah bagian dari struktur data aktif; jangan menganggap salah satunya aman dihapus tanpa audit relasi dan consumer.
- Terdapat tiga trigger pada `auth.users`:
  1. `on_auth_user_created_pluits` membuat baris `public.profiles` melalui fungsi private.
  2. `on_auth_user_created_user_profile` membuat baris `public.user_profiles` melalui fungsi private.
  3. `on_auth_user_created_wallet` membuat akun wallet awal melalui fungsi trigger.
- Konsekuensi untuk frontend baru: pendaftaran harus menggunakan Supabase Auth dan metadata yang sesuai; frontend tidak boleh membuat ulang baris profil atau wallet secara manual setelah signup karena trigger database sudah menanganinya.
- Seluruh pemeriksaan di atas bersifat baca-saja. Tidak ada akun, profil, tabel, migration, trigger, atau data yang diubah.

#### 4. Kontrak Pendaftaran Akun yang terlihat pada implementasi sekarang

Implementasi aktif saat ini menggunakan:
- Nama tampilan (`full_name`).
- Alamat email.
- Password.
- Persetujuan Ketentuan Layanan dan Kebijakan Privasi.
- Konfirmasi email setelah signup, termasuk opsi mengirim ulang email.
- `supabase.auth.signUp` dengan `full_name` pada user metadata dan redirect ke base URL aplikasi.
- Password minimum saat ini 8 karakter.
- Pembuatan profil dilakukan oleh trigger database, bukan oleh komponen frontend.

Kontrak ini dicatat sebagai baseline implementasi yang sudah ada, bukan keputusan bahwa seluruh field, copy, visual, dan aturan pendaftaran versi baru telah final. Perubahan field atau verifikasi harus diperiksa terhadap konfigurasi Auth dan kebutuhan akun sebelum diimplementasikan.

#### 5. Temuan keamanan dan kesiapan email

- Supabase Security Advisor saat audit menampilkan peringatan bahwa **Leaked Password Protection belum aktif**. Ini perlu ditinjau sebagai bagian dari kesiapan keamanan pendaftaran.
- Dokumentasi backend repository menyatakan bahwa pengiriman email publik memerlukan custom SMTP. Status konfigurasi SMTP live belum dapat diverifikasi melalui pemeriksaan ini; pengiriman email nyata harus diuji sebelum pendaftaran umum dinyatakan siap.
- Security Advisor juga menampilkan temuan pada fungsi `SECURITY DEFINER` yang dapat dipanggil role authenticated. Temuan tersebut mencakup berbagai layanan platform dan harus diaudit per fungsi; tidak boleh diperbaiki secara massal sebagai bagian dari pekerjaan UI pendaftaran.
- Tidak ada perubahan konfigurasi Auth, SMTP, password policy, function privilege, RLS, atau database yang dilakukan.

#### 6. Status fondasi UI sebelum halaman dibangun

- Struktur dokumentasi Platform UI Foundation sudah tersedia.
- README UI Foundation menyatakan nilai standar belum sepenuhnya disetujui.
- Governance menyebut exact sizing, spacing, breakpoints, typography, color, icon, dan component specifications masih menunggu audit/persetujuan.
- Karena itu, halaman Pendaftaran baru perlu menggunakan nilai yang ditetapkan secara eksplisit untuk tahap ini dan menandainya sebagai draft/prototype sampai ditinjau dan disetujui pemilik produk.
- Urutan fondasi desain yang sudah disampaikan pengguna tetap: ukuran/dimensi → ikon → warna → perilaku → layout.
- Halaman Pendaftaran menjadi kasus pertama untuk menguji fondasi, bukan alasan untuk membuat token global tanpa dokumentasi atau persetujuan.

#### Keputusan/arah eksplisit

- Pembangunan ulang frontend dimulai dari Pendaftaran Akun.
- Pekerjaan frontend baru dikerjakan pada branch `rebuild/frontend-v2`, terpisah dari `main`.
- Semua akun dan data Supabase yang ada harus dipertahankan; audit menemukan 3 akun Auth, sehingga ketiganya diperlakukan sebagai data yang harus dilindungi.
- Database production tidak di-reset dan tidak dirombak sebagai bagian dari penggantian frontend.
- Integrasi signup harus menghormati trigger Auth yang telah membuat profil dan wallet.
- Tidak ada perubahan kode aplikasi, schema, migration, konfigurasi Auth, SMTP, workflow, atau deployment pada tahap audit awal ini.

#### Hal yang masih perlu dipastikan sebelum penerimaan Pendaftaran

- Apakah field awal versi baru tetap nama tampilan, email, password, dan persetujuan legal, dengan verifikasi email sebagai langkah berikutnya.
- Apakah nomor telepon diperlukan saat pendaftaran atau cukup dilengkapi setelah akun dibuat.
- Copy, aturan password, dan pengalaman verifikasi email yang akan menjadi standar final.
- Konfigurasi email provider/SMTP dan URL redirect Auth yang benar-benar aktif.
- Cara melakukan browser UI test dari perangkat pengguna dan kapan perubahan pertama dipromosikan ke GitHub Pages.
- Kriteria penerimaan UI, fungsi, keamanan, dan integrasi backend untuk menyatakan tahap Pendaftaran selesai.


### Instruksi eksplisit pemilik produk — penggantian frontend dan ruang kerja setelah login

**Waktu:** 17 November 2026  
**Status:** RAW — instruksi eksplisit untuk implementasi awal; belum menjadi persetujuan final atas seluruh desain produk.

#### Arahan yang dikonfirmasi

- Pengguna meminta frontend lama dibersihkan sepenuhnya dan diganti dengan frontend baru yang dibangun dari fondasi modular yang rapi.
- Penggantian mencakup runtime frontend lama, komponen, halaman, stylesheet, test frontend lama, dan pemeriksaan teknis yang hanya relevan untuk implementasi lama.
- Dokumentasi Master Model, Sharing Inbox, Supabase project, schema, migration, Auth users, profiles, wallet records, media, messages, dan seluruh data yang sudah ada wajib dipertahankan.
- Pengguna meminta perubahan baru langsung dipersiapkan untuk deploy setelah test dan validasi berhasil.
- Setelah frontend baru terpasang, pengguna akan login menggunakan akun PLUITS yang sudah terdaftar. Tidak perlu membuat ulang akun.
- Setelah login, halaman pertama adalah **Ruang Kerja Pengembangan PLUITS** sebagai tempat melihat tahapan pembangunan dan cara kerja bersama.
- Ruang kerja ini merupakan halaman sementara untuk memulai pembahasan. Ia bukan Global Home, bukan Profil Utama, dan belum merupakan fitur kolaborasi/chat internal.
- Pembahasan kebutuhan tetap dilakukan melalui percakapan kerja. Hasilnya dicatat ke Sharing Inbox sebagai bahan mentah; setelah ditinjau dan disetujui, barulah disortir ke Master Model yang sesuai.
- Tahapan tetap: Pendaftaran Akun → Global Home → Profil Utama → Social Media. Setiap tahap harus diuji dan diterima sebelum pindah ke tahap berikutnya.

#### Pengujian kepatuhan alur kerja AI

Implementasi baru harus sekaligus menjadi pengujian bahwa AI/developer mengikuti aturan repository:
- membaca AGENTS.md dan dokumen Master Model yang relevan;
- memeriksa struktur/path aktual sebelum mengubah file;
- mengidentifikasi pemilik modul dan batas dependensi;
- tidak mengarang path, kontrak backend, atau status fitur;
- tidak mengubah modul yang tidak diminta;
- menjalankan architecture checks, unit tests, dan production build;
- memverifikasi workflow, commit, dan status deployment;
- mencatat bukti perubahan dan pekerjaan UAT yang masih tersisa.

#### Batas keamanan dan kesiapan

- Frontend baru tetap memakai Supabase project PLUITS yang sama agar akun lama dapat login.
- Signup harus memakai Supabase Auth dan menghormati trigger database yang telah membuat profile serta wallet. Frontend tidak boleh membuat record duplikat.
- Browser hanya boleh memakai publishable key; service-role/secret key tidak boleh masuk ke bundle.
- Database, Auth configuration, SMTP, RLS, triggers, functions, migrations, dan data production tidak diubah dalam pekerjaan penggantian frontend.
- Pendaftaran publik belum boleh dinyatakan siap sebelum SMTP, redirect email, dokumen legal, dan pencatatan consent ditinjau. Halaman dapat disiapkan untuk pengujian, sementara login akun lama menjadi jalur uji utama.
- Situs tetap noindex selama tahap internal ini.

#### Status implementasi yang direncanakan

- Branch kerja: rebuild/frontend-v2, setelah diselaraskan ke commit terbaru main.
- Scope runtime: halaman Pendaftaran, Login, pemulihan password, dan Ruang Kerja internal setelah autentikasi.
- UI dimensions, icon registry, colors, behavior, dan layouts dimasukkan sebagai provisional bootstrap values, bukan standar final.
- Tidak ada perubahan database atau data pengguna.
- Setelah pull request lolos CI, perubahan dapat dipromosikan ke main agar GitHub Pages deploy versi frontend baru.


### Change Map dan batas penerimaan tahap pertama

- Runtime V2 memiliki Change Map di src/CHANGE-MAP.md untuk mengikat pemilik file, sumber kebenaran, konsumen, kontrak Supabase, protected surfaces, dan test wajib.
- Pendaftaran publik sengaja dinonaktifkan secara default melalui build flag VITE_PUBLIC_SIGNUP_ENABLED. Login dengan akun yang sudah ada tetap menjadi jalur UAT utama.
- Login tidak memaksakan minlength password 8 karakter di browser agar akun lama dengan kebijakan password terdahulu tidak terblokir; aturan minimum 8 karakter tetap berlaku untuk signup/reset baru.
- Backend security/migration tests yang tidak bergantung pada frontend lama dipertahankan atau ditulis ulang; test UI lama yang hanya memeriksa halaman yang dihapus tidak dibawa ke runtime baru.
- Pull Request #43 telah menjalankan pipeline PR pada commit cfb00e20217f979cc97dbb4b26dfe94e8b4b5556 dengan hasil sukses untuk install, npm test, Vite build, verifikasi output, dan upload Pages artifact. Deploy dilewati karena PR tidak mengubah main.
- Status akun nyata, email delivery, dan browser UAT masih menunggu pengujian pengguna setelah deploy.
