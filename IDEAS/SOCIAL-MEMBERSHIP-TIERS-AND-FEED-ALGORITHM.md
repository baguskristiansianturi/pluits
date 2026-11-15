# PLUITS — Social Membership Tiers & Feed Environment

**Status:** PROPOSED / WORKING CONCEPT — founder discussion in progress  
**Versi:** 0.1  
**Tanggal awal:** 15 November 2026  
**Kategori:** Social product concept, visibility rules, feed algorithm  
**Terkait:** `IDEA-010` in `IDEAS/IDEA-BACKLOG.md`

> Dokumen ini adalah ruang kerja konsep, bukan keputusan produk final, spesifikasi teknis siap implementasi, atau klaim fitur yang sudah tersedia. Setiap sesi sharing dapat menambah, mengurangi, memindahkan, atau mengganti susunan gagasan. Keputusan final baru dipindahkan ke dokumen otoritatif setelah persetujuan founder.

## 1. Ringkasan konsep

PLUITS mengeksplorasi model media sosial yang menghubungkan kehidupan sosial offline dengan ruang online, sambil memberi individu kendali lebih besar atas lingkungan sosial digitalnya.

Setiap orang boleh memiliki kebutuhan sosial yang berbeda. Ada yang nyaman dengan ruang terbuka dan beragam; ada yang ingin feed lebih terkurasi; ada pula yang hanya ingin berinteraksi dalam lingkungan yang lebih terbatas. Perbedaan kebutuhan ini tidak boleh diterjemahkan sebagai perbedaan martabat manusia.

Gagasan utamanya bukan sekadar akun premium yang memperoleh fitur tambahan. Gagasan utamanya adalah **dua kendali yang terpisah**:

1. **Saya ingin melihat lingkungan sosial seperti apa?**
2. **Saya mengizinkan kelompok akun seperti apa melihat konten saya?**

Keduanya dipilih oleh masing-masing pengguna dan tidak otomatis mengikuti pilihan orang lain.

## 2. Cerita masalah manusia

Sebagian orang mungkin tidak menolak media sosial. Mereka mungkin justru enggan bergabung karena pengalaman sosial digital terasa terlalu terbuka: orang yang tidak dikenal dapat mengirim permintaan pertemanan, menghubungi, berkomentar, atau memperlakukan mereka seolah sudah memiliki kedekatan.

Bagi sebagian individu, masalahnya bukan sekadar tombol privasi. Mereka ingin memilih lingkungan sosial yang terasa sesuai dengan kebutuhan, aktivitas, dan batas pribadi mereka.

Di sisi lain, banyak orang tetap menginginkan ruang publik yang terbuka untuk berbagi cerita, menemukan orang, membaca tulisan, mengikuti kegiatan, serta menjelajahi toko dan layanan.

PLUITS ingin mengeksplorasi apakah pilihan lingkungan sosial berbasis level keanggotaan dapat mempertemukan dua kebutuhan tersebut tanpa menutup ruang publik bagi masyarakat luas.

**Hipotesis yang perlu diuji:** kontrol atas lingkungan sosial dapat mengurangi rasa tidak nyaman dan membuat lebih banyak tipe individu bersedia berpartisipasi secara online.

## 3. Analogi lingkungan

Bayangkan tiga lingkungan:
- Warung yang terbuka dan mudah diakses masyarakat umum.
- Restoran dengan pengalaman dan karakter lingkungan tersendiri.
- Restoran di dalam resort dengan akses dan aturan lingkungan yang lebih terkendali.

Analogi ini menjelaskan bahwa tempat dapat memiliki aturan akses dan pengalaman berbeda. Analogi ini **bukan** pernyataan bahwa pengunjung suatu tempat lebih tinggi martabatnya daripada pengunjung tempat lain.

Di PLUITS, level akun berpotensi menjadi salah satu cara untuk mengatur lingkungan digital tersebut. Pengguna tetap manusia dengan hak dan martabat yang sama.

## 4. Dua sumbu kendali utama

### 4.1 Feed Preference — lingkungan yang ingin saya lihat

Pengguna memilih kelompok level akun yang kontennya ingin dimasukkan ke feed pribadinya.

Contoh:
- Pengguna A memilih melihat semua level.
- Pengguna B memilih hanya Gold dan Platinum.
- Pengguna C memilih hanya Platinum.

Pilihan ini adalah preferensi kurasi feed. Menyembunyikan suatu level dari feed **tidak otomatis** berarti profil atau konten publik level tersebut dilarang dibuka melalui pencarian atau tautan langsung. Aturan discovery dan direct access perlu didefinisikan terpisah.

### 4.2 Audience Eligibility — siapa yang boleh melihat saya

Pemilik akun atau konten memilih level akun yang memenuhi syarat untuk melihat postingan atau ruang profil tertentu.

Contoh:
- Platinum A mengizinkan semua level melihat kontennya.
- Platinum B mengizinkan hanya Gold dan Platinum.
- Platinum C mengizinkan hanya Platinum.

Pilihan pemilik tidak mengubah preferensi feed orang lain. Jika seorang pengguna tidak termasuk audiens yang diizinkan, sistem tidak boleh mengirim konten privat itu kepadanya hanya karena ia mengikuti pemilik akun atau memiliki level tinggi.

### 4.3 Matriks contoh dua arah

| Pemilik akun | Preferensi feed pribadi | Audiens yang diizinkan melihat konten |
|---|---|---|
| Platinum A | Gold + Platinum | Semua level |
| Platinum B | Semua level | Platinum saja |
| Platinum C | Platinum saja | Gold + Platinum |
| Gold A | Regular/Silver + Gold | Regular/Silver + Gold |
| Regular/Silver A | Semua konten yang memang dapat diakses | Audiens sesuai izin konten |

Nama dan urutan level masih sementara. Tabel ini hanya menggambarkan dua sumbu pengaturan, bukan aturan final setiap tier.

## 5. Model level akun — nama sementara

| Level sementara | Arah pengalaman yang sedang dieksplorasi |
|---|---|
| Regular / Silver | Akses dasar untuk bergabung, menjelajahi ruang publik, membaca blog, menemukan toko, dan menggunakan fitur sosial dasar. |
| Gold | Kemampuan sosial dan pengaturan lingkungan tambahan. |
| Platinum | Kendali lebih luas atas feed preference, audience eligibility, dan batas interaksi. |
| Black Gold / level berikutnya | Nama dan manfaat belum ditentukan. Jangan menciptakan tier hanya untuk memperpanjang daftar. |

**Penting:** nama, jumlah tier, harga, manfaat, dan hak akses final belum diputuskan. Dokumen ini tidak menetapkan model bisnis atau tarif keanggotaan.

## 6. Level bukan identitas atau status sosial

Level keanggotaan harus dipisahkan dari:
- Jenis akun: personal, bisnis, organisasi, atau media.
- Verifikasi identitas dan keaslian akun.
- Status publik figur atau tokoh publik.
- Relasi sosial: mengikuti, berteman, menjadi anggota komunitas, atau memblokir.
- Kekayaan, pekerjaan, jabatan, pendidikan, atau nilai seseorang.

Artis dapat memilih level dasar dan tetap menjadi figur publik. Pejabat dapat memilih lingkungan yang lebih terbatas. Orang yang tidak dikenal publik dapat memilih Platinum. Tidak ada satu pilihan yang otomatis menunjukkan siapa seseorang atau seberapa penting dirinya.

Jika label level ditampilkan di profil, fungsinya harus transparan sebagai label keanggotaan/fitur, bukan lencana verifikasi atau bukti kualitas pribadi. Apakah label wajib terlihat masih menjadi pertanyaan terbuka.

## 7. Alur algoritma konseptual

Feed bukan sekadar mengambil semua postingan lalu mengurutkannya. Sistem perlu menentukan kelayakan akses sebelum ranking.

### Tahap 1 — Candidate discovery
Mengumpulkan kandidat konten dari relasi sosial, akun yang diikuti, komunitas, serta sumber discovery yang memang diizinkan.

### Tahap 2 — Access & safety gate
Memeriksa:
- Status akun dan konten.
- Audience eligibility dari pemilik.
- Hubungan follow/friend/circle bila diwajibkan.
- Pengaturan per-post atau per-ruang.
- Block, mute, report restriction, dan aturan keselamatan.
- Hak akses media dan lampiran.

Kandidat yang tidak lolos tidak boleh diteruskan ke tahap ranking atau bocor melalui metadata, preview, pencarian, notifikasi, maupun URL media.

### Tahap 3 — Feed preference filter
Dari kandidat yang sudah sah diakses, terapkan pilihan level yang ingin dilihat pengguna.

### Tahap 4 — Relevance & ranking
Urutkan kandidat yang tersisa berdasarkan konteks feed yang relevan: hubungan, minat yang dinyatakan, kategori konten, kebaruan, kualitas interaksi, feedback negatif, integritas, dan keselamatan. Bobot serta objective ranking belum ditetapkan.

### Tahap 5 — Render & action permission
Tampilkan konten yang memenuhi syarat. Izin melihat tidak otomatis berarti izin berkomentar, membagikan, mengikuti, mengirim DM, atau meminta pertemanan. Setiap tindakan harus mempunyai pemeriksaan izin yang sesuai.

### Rumus konseptual

`EligibleToView = AccountActive ∧ ContentAvailable ∧ AudienceAllowsViewer ∧ RelationshipAllowsViewer ∧ SafetyAllowsViewer`

`EligibleForFeed = EligibleToView ∧ ViewerFeedPreferenceAllowsAuthorTier`

Kondisi relationship dapat bernilai tidak diperlukan untuk konten publik. Aturan pastinya bergantung pada jenis konten dan keputusan produk. Rumus ini adalah model berpikir, bukan SQL atau kontrak backend final.

## 8. Perbedaan empat izin yang tidak boleh dicampur

1. **Discover:** apakah akun/konten boleh ditemukan melalui pencarian atau Jelajah?
2. **View:** apakah konten boleh dibuka dan dilihat?
3. **Interact:** apakah pengguna boleh memberi reaksi, komentar, membagikan, atau menyimpan?
4. **Connect:** apakah pengguna boleh mengikuti, meminta pertemanan, atau mengirim pesan?

Seseorang dapat diizinkan melihat konten tetapi tidak diizinkan berkomentar. Seseorang dapat menemukan profil publik tetapi tidak otomatis dapat mengirim permintaan pertemanan. Pemilik akun perlu mengatur hal ini secara jelas dan terpisah.

## 9. Contoh skenario

### Skenario A — Pengguna Platinum ingin feed terkurasi
Pemilik Platinum memilih hanya melihat konten Gold dan Platinum. Konten Silver/Regular tidak dimasukkan ke feed pribadinya. Namun, ia tetap dapat membuka konten publik dari level lain melalui jalur discovery jika aturan discovery mengizinkan.

### Skenario B — Pengguna Platinum membuka konten untuk semua
Pemilik Platinum mengizinkan semua level melihat postingannya. Pengguna Silver/Regular dapat melihatnya selama syarat lain terpenuhi. Ini tidak otomatis memberi mereka hak komentar atau DM.

### Skenario C — Pejabat atau individu dengan kebutuhan privasi tinggi
Ia memilih audiens Gold saja untuk ruang tertentu. Akun di luar audiens tersebut tidak mendapat akses ke konten yang dibatasi. Apakah pengguna di luar audiens melihat placeholder atau tidak melihat jejak konten sama sekali masih perlu diputuskan.

### Skenario D — Figur publik
Seorang artis memilih akun dasar dan membuka konten untuk publik. Status publiknya berasal dari identitas/peran dan verifikasi yang sesuai, bukan dari level berbayar. Figur publik lain dapat memilih Platinum untuk memisahkan ruang publik dan ruang pribadi.

## 10. Risiko, batas, dan perlindungan

- Jangan menggunakan bahasa yang menyebut pekerjaan, pendapatan, atau kelompok masyarakat sebagai kelas bawah/atas dalam UI resmi.
- Jangan menyamakan level dengan verifikasi, keamanan, reputasi, atau kekayaan.
- Level tidak boleh melewati block, consent, aturan keselamatan, atau kewajiban hukum.
- Tier yang cocok bukan alasan untuk membuka konten privat tanpa izin pemilik.
- Backend harus menegakkan authorization; menyembunyikan kartu di frontend bukan perlindungan.
- Uji kebocoran melalui feed, profil, pencarian, komentar, notifikasi, share preview, API, dan Storage.
- Pertimbangkan dampak sosial, diskriminasi, penyalahgunaan, serta kemungkinan pengguna salah memahami label tier.

## 11. Pertanyaan desain yang masih terbuka

1. Apa nama final dan berapa jumlah level?
2. Apakah label level terlihat oleh semua orang, hanya koneksi, atau dapat disembunyikan?
3. Apakah konten di luar feed preference tetap dapat ditemukan lewat Jelajah atau tautan langsung?
4. Untuk audiens yang tidak memenuhi syarat, apakah konten benar-benar tidak terlihat atau boleh ada placeholder?
5. Apakah aturan level berlaku di seluruh profil, per tab, per postingan, atau ketiganya?
6. Bagaimana matriks izin untuk komentar, reaksi, share, DM, follow, dan friend request?
7. Bagaimana akun bisnis, organisasi, media, dan figur publik menggunakan sistem ini?
8. Apa yang terjadi ketika seseorang upgrade/downgrade level setelah memiliki relasi atau konten dengan audiens tertentu?
9. Bagaimana sistem menangani konten yang dibagikan ulang, kutipan, mention, tag, dan notifikasi?
10. Bagaimana mengukur apakah model ini benar-benar meningkatkan kenyamanan tanpa memperburuk eksklusi sosial?

## 12. Urutan eksplorasi menuju spesifikasi teknis

1. Selesaikan filosofi dan bahasa produk.
2. Tetapkan taxonomy level sementara dan hak yang benar-benar berbeda.
3. Buat permission matrix: viewer tier × author tier × relationship × content audience × action.
4. Buat user journey untuk pemilik dan pengunjung.
5. Prototipe UI pengaturan feed dan audience.
6. Uji pemahaman dengan kelompok pengguna yang beragam.
7. Rancang threat model, data ownership, backend authorization, RLS, Storage, dan negative tests.
8. Setelah founder menyetujui konsep, sinkronkan keputusan ke Business Model Master dan Decision Log.
9. Turunkan ke spesifikasi teknis dan roadmap sesuai prioritas Social Media P0.

## 13. Status saat ini

- **Konsep dua arah:** PROPOSED.
- **Nama/urutan tier:** OPEN.
- **Matriks akses final:** NOT DEFINED.
- **Ranking/feed algorithm final:** NOT DEFINED.
- **Backend/RLS/Storage contract:** NOT SPECIFIED.
- **Frontend implementation:** NOT APPROVED.
- **Production change:** NONE AUTHORIZED.

Dokumen ini akan berkembang melalui diskusi founder. Bagian yang belum matang boleh dipindahkan, dihapus, atau ditulis ulang pada versi berikutnya; histori perubahan dan keputusan yang sudah disetujui tetap dipertahankan melalui mekanisme repository.


## 14. Membership feature differentiation — tambahan diskusi founder

Selain kendali lingkungan sosial, setiap level sedang dieksplorasi untuk memiliki kemampuan produk yang berbeda. Ini adalah sumbu kedua dan tidak boleh dicampur dengan audience visibility/feed preference.

### 14.1 Matriks fitur awal (PROPOSED)

| Kemampuan | Regular / Silver | Gold | Platinum |
|---|---|---|---|
| Feed sosial dan discovery publik dasar | Ya | Ya | Ya |
| Membaca blog dan menjelajahi toko/katalog | Ya | Ya | Ya |
| Preferensi lingkungan sosial | Dasar | Lebih luas | Lebih luas |
| Riwayat pengunjung profil | Belum diusulkan | Diusulkan | Diusulkan |
| People Nearby | Belum diusulkan | Belum diusulkan | Diusulkan |
| Global People Discovery | Belum diusulkan | Belum diusulkan | Diusulkan |
| Social matching | Belum diusulkan | Belum diusulkan | Diusulkan |
| Dating dan mutual matching | Belum diusulkan | Belum diusulkan | Diusulkan |

Tabel ini hanya menangkap contoh awal founder. Ia tidak menyatakan bahwa fitur telah tersedia atau bahwa semua fitur premium sudah final. Level di atas Platinum dan nama final Regular/Silver/Gold/Platinum masih terbuka.

### 14.2 Gold — Profile Visitor History

Gagasan: pemilik profil Gold dapat melihat daftar akun yang mengunjungi profilnya, serupa pola fitur profile-view history pada platform sosial lain.

Batas produk yang perlu dirancang:
- Definisikan kunjungan profil sebagai event terpisah dari view foto, post, story, atau konten lain. Jangan menyimpulkan semua aktivitas konten dari satu kunjungan.
- Jelaskan kepada pengguna sebelum fitur aktif bahwa kunjungan profil dapat terlihat oleh pemilik profil.
- Tentukan apakah visitor dapat memilih opt-out/anonymous mode, dan bagaimana pilihan itu memengaruhi visibilitasnya. Jangan menjadikan fitur sebagai pelacakan tersembunyi.
- Tentukan retensi riwayat, kontrol hapus, pagination, dan batas waktu.
- Hindari membuka data perilaku yang tidak relevan atau sensitif kepada pemilik profil.
- Pastikan akses ke visitor history hanya bagi pemilik yang berhak dan tidak bocor lewat API, cache, notifikasi, atau analytics.

### 14.3 Platinum — People Discovery

Gagasan: Platinum mendapat modul penemuan orang yang dapat digunakan untuk menemukan koneksi sosial di sekitar area atau secara global.

**People Nearby**
- Discovery berdasarkan area perkiraan, bukan koordinat presisi atau alamat real-time.
- Hanya aktif jika pengguna memilih ikut serta.
- Pengguna dapat pause/hide, mengatur visibilitas, dan memblokir akun.
- Jangan tampilkan jarak presisi yang memungkinkan triangulasi lokasi.
- Pertimbangkan risiko stalking, keselamatan, usia, dan penyalahgunaan lokasi.

**Global People Discovery**
- Menemukan orang lintas kota/negara berdasarkan preferensi yang dinyatakan pengguna, seperti bahasa, minat, lokasi umum, dan tujuan koneksi.
- Berikan kontrol untuk tidak direkomendasikan atau membatasi siapa yang dapat menemukan profil.
- Ranking harus relevan dan aman; jangan menjual atau mengekspos atribut sensitif.

### 14.4 Platinum — Social Matching dan Dating

Gagasan: Platinum dapat memilih tujuan koneksi yang berbeda:
- Pertemanan/sosial.
- Minat dan komunitas.
- Relasi profesional (perlu evaluasi apakah modul terpisah).
- Dating.

Social matching tidak otomatis berarti dating. Mode dating harus opt-in secara eksplisit, mempunyai profil/preferensi terpisah jika diperlukan, dan memakai mutual consent sebelum membuka percakapan atau mengungkap informasi lebih lanjut.

Persyaratan keselamatan yang harus diteliti sebelum desain/implementasi:
- Dating hanya untuk pengguna dewasa (18+), dengan age assurance yang proporsional.
- Jangan mengungkap lokasi presisi; People Nearby menggunakan area perkiraan dan kontrol visibilitas.
- Block, report, unmatch, mute, dan safety guidance harus mudah ditemukan.
- Batasi spam, harassment, impersonation, romance scams, dan pengumpulan data.
- Jangan menganggap level Platinum sebagai verifikasi identitas atau jaminan keamanan.
- Tetapkan aturan foto/profil, consent, moderasi, retensi data, dan mekanisme banding.

### 14.5 Pertanyaan terbuka fitur

1. Apakah Profile Visitor History menampilkan semua kunjungan atau hanya pengguna yang mengaktifkan visibilitas kunjungan?
2. Apakah pengguna Gold dapat menyembunyikan kunjungannya ketika membuka profil orang lain?
3. Apakah People Nearby dan Global People Discovery berada dalam satu modul People atau dua tab terpisah?
4. Apakah Social Matching dan Dating merupakan dua mode di satu produk atau produk/ruang terpisah?
5. Apakah fitur discovery hanya untuk Platinum atau ada versi terbatas pada Gold?
6. Bagaimana interaksi dari discovery mengikuti audience eligibility dan feed preference?
7. Apa manfaat fitur lain untuk setiap tier, dan apakah ada level di atas Platinum?
8. Apakah label Gold/Platinum terlihat di profil, dan apakah ia hanya label membership, bukan verifikasi?

### 14.6 Batas keputusan

Penambahan ini memperluas IDEA-010 sebagai konsep PROPOSED. Belum ada persetujuan untuk implementasi, perubahan schema/RLS, pengumpulan lokasi, visitor tracking, dating, atau perubahan roadmap. Semua modul memerlukan discovery, threat model, privacy review, dan acceptance criteria tersendiri sebelum dibangun.


## 15. Ruang publik, pilihan lingkungan, dan sinyal keanggotaan — tambahan diskusi founder

### 15.1 Ruang publik tetap dapat dijelajahi

Gagasan founder memperjelas bahwa level keanggotaan tidak dimaksudkan untuk menutup akses eksplorasi publik bagi pengguna Regular. Pengguna yang belum berlangganan atau belum memverifikasi akun tetap dapat menjelajahi ruang publik PLUITS, termasuk feed publik, toko, restoran, restoran mewah, resort, dan berbagai jenis tempat atau layanan yang tersedia secara publik.

Dengan demikian, **menjelajahi ruang publik** harus dibedakan dari **memasuki ruang interaksi yang memiliki aturan keanggotaan tertentu**. Pengguna tidak harus menjadi Gold atau Platinum hanya untuk mengetahui, melihat, atau menemukan keberadaan suatu tempat maupun konten publik. Batas yang sah tetap mengikuti pengaturan pemilik, hukum, keselamatan, dan aturan akses konten.

### 15.2 Analogi warung, restoran, dan resort

Analogi founder menggambarkan pilihan lingkungan berkumpul:
- Warung: lingkungan yang sederhana dan terjangkau, tempat banyak orang dapat berkumpul.
- Restoran: lingkungan dengan pengalaman, layanan, dan karakter yang berbeda.
- Restoran di dalam resort: lingkungan dengan pengalaman dan tata kelola akses yang lebih khusus.

Analogi ini menjelaskan perbedaan pengalaman, sumber daya, aturan, dan kenyamanan lingkungan—bukan kasta manusia. Kemampuan ekonomi seseorang dapat memengaruhi tempat yang biasa ia pilih, tetapi tidak menentukan martabat, karakter, atau kualitas pribadinya. Orang dengan kemampuan ekonomi tinggi pun dapat menyukai warung; orang dari latar belakang apa pun dapat memilih lingkungan sosial yang paling sesuai baginya.

Bahasa UI dan komunikasi PLUITS perlu menghindari penyebutan pengguna sebagai kelas rendah/tinggi atau mengasosiasikan tier dengan nilai manusia. Lebih baik menjelaskan tier sebagai pilihan membership dan pengalaman/fitur lingkungan.

### 15.3 Label tier dan sinyal komitmen

Founder mengusulkan agar level membership dapat terlihat di ruang sosial publik, sehingga pengguna lain memahami jenis keanggotaan yang dipilih seseorang. Langganan berbayar dipandang sebagai sinyal bahwa pengguna bersedia berkomitmen membayar untuk keanggotaan dan fitur tertentu, yang mungkin membantu membentuk ekspektasi keseriusan dalam interaksi.

Namun, pembayaran hanya membuktikan status langganan yang aktif—bukan identitas asli, integritas, reputasi, niat baik, atau jaminan keamanan. Pengguna berbayar tetap dapat melakukan penyalahgunaan; pengguna gratis/tidak terverifikasi juga tidak boleh diasumsikan bermasalah. Karena itu:
- Label harus secara jelas berarti **membership**, bukan verified, trusted, safe, atau kredensial pribadi.
- Verifikasi identitas, reputasi/perilaku, moderasi, dan status membership harus menjadi konsep yang terpisah.
- Jangan memberi pengguna premium kekebalan dari report, block, moderasi, atau penegakan aturan.
- Jangan menyimpulkan bahwa pembayaran akan menghilangkan perilaku buruk; hipotesis bahwa hambatan berlangganan mengurangi sebagian penyalahgunaan perlu diuji dengan data dan riset.
- Pertimbangkan risiko eksklusi, tekanan sosial, penyamaran status, serta kesalahpahaman pengguna terhadap label yang terlihat.

### 15.4 Regular sebagai titik masuk

Arah pengalaman awal yang diusulkan:
- Pengguna baru memulai dari Regular.
- Akun Regular dapat belum diverifikasi dan tetap dapat menjelajahi konten/tempat publik sesuai aturan yang berlaku.
- Pengguna dapat memilih upgrade ke tier berbayar, misalnya Silver (nama dan posisinya belum final), jika menginginkan fitur atau lingkungan tambahan.
- Belum ada keputusan bahwa verifikasi harus menjadi syarat untuk menjelajahi ruang publik atau bahwa pembayaran menggantikan verifikasi.

### 15.5 Kualitas lingkungan bukan semata-mata harga membership

Founder mengangkat kebutuhan sebagian pengguna untuk menghindari interaksi yang dirasa mengganggu atau tidak nyaman. Ini perlu diterjemahkan ke mekanisme produk yang konkret: kontrol siapa yang dapat menghubungi, komentar dan permintaan koneksi; block/mute/report; moderasi; reputasi perilaku yang adil; anti-spam; serta pengaturan audience dan discovery.

PLUITS tidak boleh menyimpulkan bahwa orang dari lingkungan ekonomi tertentu adalah sumber gangguan. Yang perlu dikelola adalah perilaku dan risiko yang teramati, bukan latar belakang sosial atau kemampuan membayar. Membership dapat menjadi satu pembeda fitur/lingkungan, tetapi bukan pengganti sistem keselamatan.

### 15.6 Pertanyaan terbuka tambahan

1. Apakah semua label membership ditampilkan secara publik secara default, atau pengguna dapat menyembunyikannya?
2. Apakah Regular dan Silver merupakan dua level berbeda atau dua istilah untuk tahap yang sama? Penamaan belum diputuskan.
3. Apa tepatnya yang dibatasi oleh membership: fitur, ruang interaksi, kemampuan mengatur audiens, atau akses ke komunitas tertentu?
4. Bagaimana menjelaskan bahwa ruang publik dapat dijelajahi semua orang, sementara interaksi tertentu dapat memiliki aturan tersendiri?
5. Bagaimana mengukur apakah membership mengurangi spam/penyalahgunaan tanpa menghambat pengguna baru yang baik?
6. Mekanisme apa yang melindungi pengguna dari perilaku buruk tanpa mengklasifikasikan orang berdasarkan kelas ekonomi?


## 16. Validasi sosial lintas level dan kendali distribusi postingan — tambahan diskusi founder

### 16.1 Validasi sosial tidak harus berasal dari tier yang sama

Founder menekankan bahwa pengguna premium tetap dapat menginginkan apresiasi dari seluruh masyarakat. Like, komentar, share, dan bentuk respons sosial lain dapat memiliki nilai personal, menjadi tanda bahwa pencapaian diketahui orang lain, atau membantu membangun kepercayaan terhadap seorang kreator/public figure.

Karena itu, membership tier tidak boleh otomatis membatasi siapa yang boleh menyukai atau mengomentari postingan. Pengguna Regular/Silver dapat berinteraksi dengan konten Gold/Platinum apabila pemilik konten mengizinkan dan permission interaksi terkait terpenuhi.

Membership berbayar juga tidak boleh diperlakukan sebagai bukti bahwa klaim kesuksesan seseorang benar. Status langganan hanya menunjukkan status membership; kredibilitas klaim tetap memerlukan konteks, rekam jejak, bukti yang relevan, dan penilaian pengguna.

### 16.2 Pisahkan empat pengaturan distribusi dan akses

Konsep berkembang dari dua sumbu awal menjadi pengaturan yang lebih terperinci. Untuk setiap postingan atau ruang konten, pertimbangkan pengaturan yang terpisah:

1. **Feed distribution:** kelompok level mana yang dapat menerima postingan dalam feed mereka.
2. **Recommendation eligibility:** kelompok level mana yang boleh menerima rekomendasi postingan di luar relasi follow/pertemanan.
3. **View access / audience:** siapa yang boleh membuka dan melihat konten, termasuk melalui profil, pencarian, atau tautan langsung sesuai aturan konten.
4. **Interaction permissions:** siapa yang boleh like, comment, share, save, atau melakukan tindakan lain.

Pengaturan tersebut tidak boleh digabung menjadi satu tombol “visibility”. Contohnya, pemilik dapat mengizinkan pengguna Silver melihat dan menyukai postingan, tetapi tidak memasukkan postingan itu ke rekomendasi umum untuk seluruh pengguna Silver.

### 16.3 Contoh pilihan distribusi yang sedang dieksplorasi

- **Followers/friends only:** postingan tampil di feed relasi yang memenuhi syarat; tidak otomatis direkomendasikan ke orang di luar relasi tersebut.
- **Same-tier recommendation:** postingan dapat direkomendasikan kepada pengguna dengan tier yang sama, jika mereka juga memenuhi aturan akses dan relevansi.
- **Selected tiers:** pemilik memilih tier tertentu yang dapat menerima distribusi feed atau rekomendasi.
- **Broad public distribution:** postingan dapat menjangkau lintas tier, termasuk Regular/Silver, untuk memperoleh apresiasi dan interaksi yang lebih luas.
- **Restricted audience with exceptions:** postingan dibatasi untuk tier tertentu, tetapi pemilik dapat memberikan akses khusus kepada teman/sahabat tertentu dari tier lain.

Contoh ini adalah pilihan konseptual, bukan daftar setting final. Sistem harus menjelaskan perbedaan distribusi, rekomendasi, dan izin membuka konten dengan bahasa yang mudah dipahami.

### 16.4 Pengecualian untuk teman atau sahabat lintas tier

Pemilik Gold/Platinum mungkin membatasi konten tertentu hanya untuk Gold/Platinum, tetapi tetap ingin beberapa teman dekat dari Regular/Silver dapat melihatnya.

Karena itu, rancangan perlu mempertimbangkan explicit audience exceptions atau daftar orang yang diizinkan secara khusus. Pengecualian ini:
- Diberikan secara sadar oleh pemilik konten.
- Tidak otomatis berlaku untuk semua orang dalam tier yang sama dengan orang yang diberi akses.
- Tidak melewati block, status akun, safety restrictions, atau aturan hukum.
- Tidak otomatis memberi hak untuk membagikan ulang atau melakukan tindakan lain; setiap permission tetap diperiksa terpisah.
- Harus tetap berlaku konsisten pada feed, profil, pencarian, notifikasi, API, cache, dan media storage agar konten tidak bocor.

### 16.5 Contoh skenario lintas level

**Skenario A — Public figure ingin apresiasi luas**  
Seorang public figure Gold/Platinum membuka postingan pencapaiannya untuk semua tier dan mengizinkan like/comment/share lintas level. Konten dapat memperoleh respons dari masyarakat luas, sesuai aturan distribusi yang dipilih.

**Skenario B — Pengguna premium ingin feed lebih terkurasi**  
Ia memilih agar feed pribadinya tidak menampilkan postingan dari Silver, atau hanya menampilkan postingan Silver dari akun yang ia ikuti. Ini adalah preferensi feed miliknya; bukan larangan bagi pengguna Silver untuk melihat atau menyukai postingannya yang memang dibuka untuk mereka.

**Skenario C — Postingan untuk relasi dan rekomendasi tier yang sama**  
Pemilik memilih postingan hanya tampil di feed teman/follower yang memenuhi syarat, dan rekomendasi di luar relasi hanya ditujukan kepada tier yang sama. Pengaturan ini tidak otomatis mengubah izin interaksi dari audiens lain yang memang sudah diizinkan membuka postingan.

**Skenario D — Teman dekat lintas tier**  
Pemilik Platinum membatasi audiens umum pada Platinum, tetapi memberi akses kepada dua teman Silver yang dipilihnya. Hanya akun yang secara eksplisit diberi izin yang mendapat pengecualian.

**Skenario E — Ingin dilihat oleh tier tertentu, tetapi tetap menerima apresiasi luas**  
Pemilik mengatur distribusi rekomendasi hanya kepada Gold/Platinum, tetapi mengizinkan semua tier yang dapat membuka postingan untuk memberi like atau komentar. Ini menegaskan bahwa distribusi dan interaksi merupakan dua keputusan yang berbeda.

### 16.6 Pertanyaan desain tambahan

1. Apakah pengaturan feed distribution dan recommendation eligibility tersedia per postingan, per jenis konten, atau sebagai default profil dengan override per postingan?
2. Apakah pemilik dapat memilih followers-only untuk feed tetapi tetap mengaktifkan rekomendasi kepada tier tertentu?
3. Bagaimana orang yang tidak masuk target distribusi dapat menemukan konten publik melalui pencarian atau tautan langsung?
4. Apakah like/comment/share lintas tier dapat diatur terpisah satu per satu?
5. Bagaimana pemilik memberi, meninjau, dan mencabut akses khusus untuk teman lintas tier?
6. Bagaimana mencegah jumlah like atau komentar dari tier tertentu diperlakukan sebagai bukti otomatis atas kebenaran klaim atau kualitas seseorang?

### 16.7 Batas keputusan

Semua pengaturan distribusi lintas tier, interaksi lintas tier, rekomendasi same-tier, dan pengecualian teman masih PROPOSED. Belum ada permission matrix final, desain UI, schema, RLS, ranking contract, atau persetujuan implementasi.


## 17. Verifikasi, kemampuan profesional, dan ruang kerja bisnis — tambahan diskusi founder

### 17.1 Pendaftaran dan eksplorasi publik

Alur awal yang diusulkan:
1. Seseorang mendaftar dan memperoleh akun PLUITS dasar.
2. Ia dapat menjelajahi ruang publik dan konten yang memang terbuka untuknya.
3. Ia tidak diwajibkan berlangganan premium atau menyelesaikan verifikasi identitas hanya untuk menjadi penjelajah/pembaca.
4. Ketika ingin melakukan tindakan yang membawa tanggung jawab lebih besar—misalnya menerbitkan blog, membuka toko, atau menawarkan layanan—PLUITS meminta verifikasi dan persyaratan yang relevan untuk tindakan tersebut.

Dengan demikian, **akses untuk menjelajahi ruang publik dipisahkan dari kelayakan untuk menerbitkan, berdagang, atau menjalankan aktivitas profesional**.

### 17.2 Verifikasi sebagai gerbang kelayakan, bukan paket premium

Founder memberi contoh alur:
- Membaca dan menjelajahi ruang publik: dapat dilakukan oleh akun dasar sesuai aturan akses.
- Membuat/menerbitkan blog: meminta verifikasi akun sebelum fitur publikasi digunakan.
- Membuat toko: meminta verifikasi identitas dan informasi tambahan yang diperlukan.
- Mengelola rekening atau menerima pembayaran: memerlukan kecocokan identitas pemilik dengan data rekening dan pemeriksaan sesuai persyaratan penyedia pembayaran serta hukum yang berlaku.

Arah pentingnya: kemampuan membuat blog, toko, atau layanan tidak otomatis harus dijual sebagai manfaat premium. Verifikasi dapat menjadi syarat dasar untuk mengaktifkan tanggung jawab penerbit/pelaku usaha. Syarat spesifik, jenis dokumen, dan proses verifikasi masih perlu dirancang per jenis aktivitas.

Kecocokan identitas dan rekening adalah contoh kontrol untuk mengurangi penyalahgunaan, akun/toko ganda yang tidak bertanggung jawab, dan risiko transaksi. Namun, jangan menjanjikan bahwa satu identitas hanya boleh memiliki satu toko sebelum aturan legal, kebutuhan usaha yang sah, beneficial ownership, dan model multi-brand diteliti. Sistem perlu membedakan pemilik terverifikasi, entitas usaha, outlet/toko, dan akun operasional.

### 17.3 Pisahkan tiga konsep: membership, verification, dan workspace

Agar pengguna tidak bingung, rancangan PLUITS perlu membedakan:

1. **Membership tier:** paket/level keanggotaan yang mengatur pengalaman sosial dan kemampuan tambahan sesuai manfaat tier.
2. **Verification & eligibility:** pemeriksaan identitas atau kelayakan yang diperlukan untuk tindakan tertentu, seperti publikasi, perdagangan, layanan, atau pembayaran. Verifikasi bukan bukti bahwa semua konten atau klaim pengguna benar.
3. **Professional/business workspace:** ruang kerja untuk mengelola publikasi, toko, layanan, data operasional, dan tim. Workspace dapat memiliki owner dan staf dengan izin yang berbeda.

Ketiganya dapat terhubung di satu akun PLUITS, tetapi tidak boleh dianggap sebagai hal yang sama. Pengguna premium yang tidak berjualan tetap dapat menikmati membership dan kemampuan workspace yang termasuk dalam paketnya, tanpa harus menjadi penjual atau penyedia layanan.

### 17.4 Satu identitas sosial, banyak konteks aktivitas

Visi founder adalah agar seseorang tidak perlu berpindah-pindah aplikasi atau akun untuk bersosial, menulis, mengelola usaha, dan bekerja. Akun PLUITS dapat menjadi pintu masuk ke beberapa konteks:
- Identitas sosial personal.
- Blog dan publikasi.
- Toko dan katalog produk.
- Layanan/profesional.
- Workspace organisasi atau bisnis.
- Dashboard aktivitas dan operasional.

Pengguna hanya mengaktifkan konteks yang dibutuhkan. Memiliki akun sosial tidak berarti otomatis menjadi bisnis; memiliki toko tidak berarti semua aktivitas personal harus ditampilkan sebagai aktivitas toko.

### 17.5 Workspace bisnis dan delegasi staf

Contoh founder: sebuah bisnis transportasi mengelola ketersediaan kendaraan melalui dashboard PLUITS. Operator yang bertugas memperbarui kendaraan tersedia/tidak tersedia; owner atau manager dapat melihat data terbaru di workspace bisnis tanpa menunggu laporan manual.

Owner dapat mengundang staf dan memberi akses sesuai tanggung jawab, misalnya:
- **Owner:** pengaturan bisnis, pengelolaan staf, dan kontrol seluruh permission.
- **Manager:** melihat dan mengelola bagian operasional sesuai delegasi.
- **Content/blog staff:** menulis atau menyiapkan artikel tanpa otomatis memperoleh akses keuangan atau pengaturan bisnis.
- **Product staff:** membuat dan memperbarui data produk/katalog.
- **Transport operator:** memperbarui ketersediaan armada atau penugasan operasional yang diizinkan.
- **Finance staff:** akses ke data transaksi/keuangan sesuai kewenangan khusus, jika kelak disetujui.

Prinsipnya adalah least privilege: staf hanya memperoleh izin yang dibutuhkan untuk pekerjaannya. Izin melihat, membuat, mengubah, menerbitkan, menghapus, mengelola uang, dan mengundang staf harus dibedakan. Aktivitas penting perlu mempunyai jejak audit: siapa melakukan apa, pada workspace mana, dan kapan.

### 17.6 Alur kerja konten dan katalog

Contoh alur produk:
1. Staf menyiapkan aset gambar menggunakan alat desain yang dipilihnya, misalnya Canva atau Photoshop.
2. Staf memasukkan aset ke PLUITS.
3. Staf membuat copy/deskripsi dan mengisi data produk.
4. Perubahan disimpan sebagai draft atau menunggu review jika owner mengaktifkan approval.
5. Owner/manager dapat melihat hasil pekerjaan dan statusnya di workspace.
6. Produk diterbitkan hanya oleh peran yang memiliki izin publish.

Alur serupa dapat diterapkan untuk blog, layanan, katalog, dan data operasional. Integrasi langsung dengan aplikasi desain eksternal belum diasumsikan; unggah aset yang dibuat di aplikasi tersebut adalah contoh workflow, bukan komitmen integrasi API.

### 17.7 Satu ruang digital untuk kehidupan sosial dan pekerjaan

Visi jangka panjang founder adalah pengalaman seperti seseorang duduk di kafe dengan satu desktop/ruang digital: ia dapat bersosial, membaca dan menulis, menyusun rencana, mengelola pekerjaan, memperbarui operasional usaha, serta memantau tim dari satu ekosistem.

PLUITS dengan demikian dieksplorasi bukan hanya sebagai media sosial, tetapi sebagai platform yang menghubungkan:
- Kehidupan sosial dan identitas personal.
- Publikasi dan komunikasi.
- Aktivitas profesional dan bisnis.
- Kolaborasi tim dan operasional.
- Alur kerja dan pemantauan hasil.

Ini adalah visi produk jangka panjang, bukan izin untuk memperluas scope implementasi saat ini secara otomatis.

### 17.8 Pertanyaan desain dan risiko tambahan

1. Aktivitas apa yang memerlukan verifikasi personal, verifikasi entitas bisnis, atau pemeriksaan pembayaran?
2. Bagaimana membedakan individu, pemilik manfaat usaha, badan usaha, brand, toko, dan outlet?
3. Apakah satu identitas dapat mengelola beberapa toko/brand secara sah melalui satu atau beberapa entitas?
4. Apa manfaat workspace yang termasuk dalam setiap membership tier, dan fitur apa yang tetap tersedia gratis setelah verifikasi?
5. Apakah workspace bisnis merupakan fitur akun personal, entitas bisnis terpisah, atau konteks yang dapat dipilih dari satu identitas login?
6. Bagaimana undangan staf, pemulihan akses owner, pergantian staf, approval, audit log, dan konflik kepemilikan ditangani?
7. Bagaimana membatasi akses staf ke data pelanggan, keuangan, rekening, dan data sensitif?
8. Bagaimana menjaga agar konten personal tidak tercampur atau terpublikasi sebagai konten bisnis tanpa sengaja?
9. Apa yang perlu dibangun sendiri dan apa yang sebaiknya diintegrasikan dengan alat eksternal?
10. Bagaimana visi workspace ini diprioritaskan tanpa mengganggu penyelesaian Social Media P0?

### 17.9 Batas keputusan

Semua alur verifikasi, eligibility blog/toko/layanan, persyaratan rekening, model multi-store, workspace, staff roles, approval, audit log, integrasi desain, dan desktop workspace masih PROPOSED. Belum ada keputusan harga, tier benefit matrix, legal/KYC policy, schema, RLS, API, atau persetujuan implementasi.


## 18. Membership sebagai pendapatan awal dan keterkaitan dengan commerce — tambahan diskusi founder

### 18.1 Keanggotaan sebagai sumber pendapatan awal

Founder mengemukakan hipotesis bahwa PLUITS dapat mulai memperoleh pendapatan dari membership sebelum ekosistem toko, restoran, layanan, dan transaksi lain berkembang penuh. Pendapatan membership berpotensi menjadi modal awal untuk membangun dan mengembangkan layanan PLUITS berikutnya.

Ini menempatkan membership bukan hanya sebagai fitur sosial, tetapi juga sebagai salah satu kemungkinan fondasi model pendapatan awal. Namun, kelayakan komersialnya belum terbukti: manfaat setiap tier, kesediaan membayar, biaya operasional, tingkat konversi, retensi, dan kecukupan pendapatan harus diuji sebelum proyeksi finansial dibuat.

### 18.2 Tiga jalur nilai yang saling terhubung

Gagasan founder mengarah pada ekosistem yang menghubungkan:
1. **Membership dan pengalaman sosial:** pengguna bergabung untuk bersosialisasi, membangun koneksi, memilih lingkungan digital, dan memperoleh fitur/benefit sesuai keanggotaan.
2. **Commerce dan katalog:** toko, produk, restoran, tempat, serta berbagai penawaran yang dapat ditemukan dan dijelajahi pengguna.
3. **Layanan dan aktivitas profesional:** penyedia jasa, profesional, bisnis lokal, serta layanan lain yang dapat ditemukan, dipahami, dihubungi, atau dipesan melalui PLUITS.

Ketiganya saling melengkapi, tetapi tidak boleh dipaksa menjadi satu jenis feed atau satu perjalanan pengguna. Pengguna yang datang untuk bersosialisasi tidak harus berjualan; pemilik bisnis yang datang untuk mengembangkan usahanya tetap dapat menggunakan fitur sosial; pembeli dapat menjelajahi penawaran tanpa diwajibkan berlangganan premium.

### 18.3 Dua kebutuhan pengguna yang berbeda

Founder membedakan motivasi orang yang masuk ke PLUITS. Sebagian datang terutama untuk kebutuhan sosial: berbagi cerita, melihat konten, dan berinteraksi. Sebagian lain telah memiliki bisnis, profesi, atau aktivitas ekonomi di dunia nyata dan mencari platform yang dapat mendukung kebutuhan tersebut secara lebih profesional.

PLUITS perlu melayani keduanya tanpa menganggap pengguna sosial sebagai pengguna yang kurang bernilai, atau menganggap pemilik bisnis otomatis lebih penting. Perbedaan utamanya adalah kebutuhan dan konteks penggunaan, bukan martabat manusia.

### 18.4 Label membership sebagai sinyal komitmen berbayar

Founder mengusulkan agar label tier yang terlihat dapat menjadi sinyal bahwa pemilik akun memilih dan membayar tingkat membership tertentu. Contoh harga Rp1.900.000 per bulan disebut sebagai ilustrasi dalam diskusi, bukan harga final, penawaran resmi, atau keputusan tarif.

Hipotesis yang ingin diuji: bagi sebagian pengguna profesional atau pemilik bisnis, label membership yang jelas dapat menjadi bentuk diferensiasi dan sinyal komitmen terhadap pengalaman/layanan PLUITS, sehingga jumlah follower bukan satu-satunya penanda identitas digital.

Batas wajib:
- Label hanya menyatakan jenis dan status membership yang benar-benar aktif.
- Label bukan verifikasi identitas, bukti kekayaan, kredibilitas, reputasi, integritas, kesuksesan, atau jaminan perilaku.
- Jangan merendahkan akun gratis atau menjadikan harga sebagai ukuran nilai manusia.
- Pengguna tetap dapat memperoleh pengakuan sosial dari interaksi lintas tier; membership tidak menggantikan kualitas hubungan dan kontribusi.
- Transparansi harga, pembatalan, masa aktif, manfaat, dan konsekuensi downgrade harus jelas.

### 18.5 Pertanyaan validasi bisnis

1. Apakah calon pengguna benar-benar bersedia membayar untuk benefit sosial, kurasi lingkungan, identitas membership, dan workspace?
2. Manfaat konkret apa yang cukup bernilai untuk setiap tier, khususnya bagi profesional dan pemilik bisnis?
3. Apakah harga ilustratif Rp1.900.000/bulan sesuai dengan nilai yang diterima, atau hanya contoh positioning?
4. Bagaimana menjaga agar pengguna Regular tetap dapat menjelajahi konten, toko, restoran, dan layanan publik?
5. Bagaimana membership, transaksi commerce, komisi layanan, dan promosi berbayar dibedakan sebagai sumber pendapatan?
6. Berapa biaya pelayanan, moderasi, pembayaran, dukungan pelanggan, dan infrastruktur untuk setiap tingkat membership?
7. Apakah membership dapat menjadi modal awal tanpa menciptakan ketergantungan pada janji eksklusivitas atau status sosial?

### 18.6 Batas keputusan

Pendapatan membership sebagai sumber awal, keterkaitan dengan toko/restoran/layanan, label membership sebagai sinyal komitmen, dan harga Rp1.900.000/bulan tetap HIPOTESIS/PROPOSAL diskusi. Belum ada harga, proyeksi pendapatan, paket benefit, strategi pemasaran, komisi, atau model transaksi yang disetujui. Tidak ada perubahan implementasi maupun roadmap aktif.


## 19. Struktur kategori membership dan harga — usulan founder terbaru

Founder mengusulkan dua kategori utama akun membership:

- **Regular — Free:** akun dasar tanpa biaya membership.
- **Premium — Paid:** kategori berbayar dengan empat level yang diusulkan.

| Kategori | Level | Harga usulan per bulan |
|---|---|---:|
| Free | Regular | Gratis |
| Premium | Silver Member | Rp450.000 |
| Premium | Gold Member | Rp700.000 |
| Premium | Platinum Member | Rp1.200.000 |
| Premium | Golden | Rp1.900.000 |

Urutan level premium yang diusulkan: Silver Member → Gold Member → Platinum Member → Golden. Dengan struktur ini, Golden berada di atas Platinum. Nama “Golden” menggantikan asumsi sebelumnya bahwa Platinum adalah level tertinggi; istilah dan positioning tetap perlu divalidasi.

### Batas dan pertanyaan yang belum diputuskan

1. Apakah angka di atas merupakan harga bulanan final, atau masih angka awal untuk diuji?
2. Apakah semua harga mencakup pajak/biaya pembayaran atau ditampilkan sebelum biaya tambahan?
3. Apa perbedaan manfaat yang terukur antara Silver, Gold, Platinum, dan Golden?
4. Apakah upgrade/downgrade berlaku langsung atau pada periode tagihan berikutnya?
5. Apakah tersedia periode tahunan, masa percobaan, pembatalan, dan pengembalian dana?
6. Apakah Regular tetap memiliki akses penuh untuk menjelajahi ruang publik, membaca konten publik, dan menemukan toko/restoran/layanan?
7. Fitur mana yang dibatasi oleh membership, dan aktivitas mana yang cukup memerlukan verifikasi tanpa harus premium?

Harga dan nama level di atas merupakan usulan founder, bukan tarif publik yang sudah disahkan. Belum ada implementasi billing, benefit matrix final, atau perubahan roadmap.
