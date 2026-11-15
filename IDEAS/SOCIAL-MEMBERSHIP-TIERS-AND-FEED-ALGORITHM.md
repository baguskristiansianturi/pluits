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
