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


## Status akhir

RAW
