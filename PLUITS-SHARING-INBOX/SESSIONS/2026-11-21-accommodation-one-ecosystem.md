# Session: Accommodation as One Unified Ecosystem

- Tanggal: 2026-11-21
- Topik: Konsep satu ekosistem Accommodation, filosofi desain PLUITS, pengalaman dua sisi, dan prinsip bisnis yang adil
- Model/aplikasi terkait: Accommodation; Marketplace & Discovery; Identity, Accounts & Membership; Shared Platform Services; Platform Wrapper
- Status: RAW

## Catatan sharing

Pengguna ingin membahas dan menyepakati konsep Accommodation terlebih dahulu sebelum mulai merancang atau membuat halaman dan implementasi. Pengguna tidak ingin Accommodation dipecah menjadi banyak aplikasi atau cabang berdasarkan kelas properti.

Accommodation harus menjadi satu homepage dan satu ekosistem yang melayani seluruh jenis akomodasi, termasuk resort mewah, hotel berbagai kelas (termasuk hotel bintang dua), penginapan, villa, homestay, guesthouse, serta model properti seperti Airbnb. Semua berada dalam satu sistem, bukan aplikasi terpisah untuk masing-masing kelas.

Pengguna ingin konsep desain yang sesuai dengan karakter PLUITS: elegan, mudah digunakan, modern, dapat disinkronkan dengan tampilan platform secara keseluruhan, tetapi tidak menghilangkan karakter elegan maupun kemewahan properti. Satu sistem desain harus mampu menampilkan properti dengan karakter dan kelas berbeda tanpa membuat akomodasi sederhana tampak murahan atau properti mewah kehilangan identitasnya.

Pengguna menegaskan bahwa PLUITS bukan aplikasi biasa. Ambisinya adalah membangun platform modern yang menyatukan banyak kebutuhan dan pengalaman dalam satu ekosistem. Pengembangan boleh berlangsung perlahan; kualitas, detail, dan pengalaman pengguna harus lebih diutamakan daripada kecepatan merilis fitur.

Pengguna menggunakan analogi membangun kolam dan mengumpulkan ikan: platform harus terlebih dahulu menciptakan tempat yang berguna, nyaman, dan dipercaya, sehingga pelanggan dan penyedia berkumpul serta memperoleh manfaat. PLUITS tidak boleh hanya mengejar pendapatan dari hotel atau penyedia.

PLUITS harus bekerja untuk dua pihak:
- Pengguna/pelanggan: membantu mereka merasa nyaman, menemukan apa yang dicari, memahami informasi, membandingkan pilihan, dan memperoleh pengalaman yang dapat dipercaya.
- Penyedia: menyediakan platform, teknologi, alat pengelolaan, visibilitas, dan peluang untuk dipertemukan dengan pelanggan yang relevan.

Pengguna menekankan aturan yang nyata dan adil. Platform harus mempertemukan permintaan dan penawaran dengan aturan yang dapat dipahami dan dipertanggungjawabkan, bukan sekadar mengejar keuntungan sepihak.


### Push sebagai sistem promosi lintas-ekosistem PLUITS

Pengguna menegaskan bahwa Push tidak boleh diperlakukan sebagai slot iklan permanen yang selalu menguasai bagian paling atas homepage Accommodation. Penempatan seperti itu dapat mengganggu pengalaman eksplorasi dan menggeser hasil Nearby/Local yang seharusnya relevan bagi pengguna.

Push merupakan sistem promosi internal PLUITS yang mengikuti konteks perjalanan pengguna di seluruh ekosistem:
- Ketika pengguna menjelajahi Accommodation, promosi yang relevan dengan akomodasi dapat ditampilkan.
- Ketika pengguna menjelajahi Restaurant & Café, promosi yang relevan dengan restoran/kafe dapat ditampilkan.
- Ketika pengguna menjelajahi kategori atau layanan lain, Push mengikuti konteks tersebut.
- Push juga dapat hadir secara kontekstual di sela-sela Feed saat pengguna scrolling, dengan mempertimbangkan minat yang terdeteksi dan frekuensi agar tidak mengganggu.

Dengan demikian PLUITS tidak harus bergantung terutama pada jaringan iklan eksternal seperti Google Ads. PLUITS dapat membangun ekosistem periklanan dan promosi internal yang menghubungkan pengelola/penyedia dengan pengguna di dalam platform.

Prinsip distribusi yang disampaikan:
- Nearby/local discovery dan hasil organik tetap memiliki ruang yang adil; promosi berbayar tidak boleh secara otomatis menggusur hasil lokal yang relevan.
- Push ditampilkan mengikuti konteks halaman, kategori yang sedang dijelajahi, lokasi, serta minat pengguna yang terdeteksi.
- Daily Push Allocation dan kredit Push tambahan yang dibahas sebelumnya perlu dirancang sebagai bagian dari sistem Push lintas-ekosistem, bukan hanya fitur promosi Accommodation.
- Ketika pengguna telah menyelesaikan transaksi untuk kebutuhan/produk/layanan tertentu di PLUITS, sistem harus menghentikan atau menyesuaikan promosi yang mengejar kebutuhan yang sama. Contohnya, setelah pengguna berhasil memesan akomodasi, iklan yang terus mengejar pengguna untuk memesan akomodasi serupa tidak lagi relevan.
- Penggunaan sinyal minat dan riwayat transaksi harus memperhatikan privasi, transparansi, kontrol pengguna, serta batas frekuensi promosi.

Pengguna menyatakan bahwa teknologi algoritma Push lintas-ekosistem tersebut merupakan kemampuan jangka panjang. Untuk tahap sekarang, fokusnya adalah menyiapkan frontend yang memudahkan pengguna mengeksplorasi Accommodation dan kategori terkait. Struktur frontend perlu memberi ruang bagi integrasi Push di masa depan tanpa mengunci desain pada penempatan iklan tertentu.

### Konteks Push dan Fluid Priority

Push merupakan salah satu kemampuan promosi yang dapat terhubung dengan akun/keanggotaan penyedia, termasuk pembahasan Gold, Platinum, dan Fluid Priority. Namun, tier akun, harga, kuota, hak, dan ketentuan komersial belum ditetapkan dalam sesi ini. Jangan menjadikan asumsi tier atau target pendapatan sebagai batas awal dalam merancang kemampuan produk. Rancang kebutuhan pengalaman dan kapabilitas platform terlebih dahulu; model akun dan monetisasi dibahas setelahnya.

## Masalah/kebutuhan yang muncul

- Accommodation perlu satu ekosistem dan satu homepage untuk seluruh kelas/jenis akomodasi.
- Jangan membuat aplikasi terpisah untuk luxury resort, hotel, penginapan, villa, homestay, atau model Airbnb.
- Sistem desain harus konsisten dengan PLUITS dan tetap mampu menampilkan karakter unik setiap properti.
- Pengalaman pengguna dan penyedia sama-sama penting; kepentingan keduanya harus menjadi dasar keputusan produk.
- Kecepatan pengembangan bukan prioritas tertinggi; kualitas detail, kepercayaan, dan pengalaman menjadi prioritas.
- Monetisasi harus berasal dari nilai yang benar-benar diberikan, dengan ketentuan yang transparan dan adil.
- Perlu aturan untuk menjaga integritas informasi properti, harga, ketersediaan, ulasan, peringkat, transaksi, pembatalan, dan penyelesaian sengketa.

## Ide atau opsi yang dibahas

### Satu ekosistem Accommodation
Satu homepage dan satu sistem lintas jenis properti. Perbedaan kelas properti ditangani melalui data, atribut, fasilitas, layanan, konten, harga, kebijakan, dan presentasi yang adaptif; bukan dengan membuat aplikasi atau cabang produk berbeda.

### Arah desain awal untuk ditinjau
- Elegant foundation: tipografi, grid, spacing, komposisi, dan interaksi yang konsisten.
- Adaptive content: bagian dan informasi menyesuaikan jenis serta karakter properti.
- Editorial photography: foto properti dan pengalaman menjadi elemen utama.
- Progressive detail: informasi utama mudah ditemukan; detail lanjutan tersedia tanpa membebani tampilan awal.
- Responsive experience: pengalaman mobile dan desktop dirancang dengan kualitas yang setara.

Ini adalah arah diskusi, belum menjadi keputusan design system final. Seluruh rancangan wajib mengikuti Platform UI Foundation yang sudah ada dan diaudit terlebih dahulu.

### Prinsip nilai dua sisi
Pengguna memperoleh discovery yang relevan, informasi jujur, harga dan kebijakan yang jelas, proses pemesanan aman, serta bantuan saat masalah.
Penyedia memperoleh profil profesional, kesempatan ditemukan pelanggan relevan, alat pengelolaan operasional, kendali wajar atas properti, serta biaya layanan yang transparan.
PLUITS menyediakan infrastruktur, discovery, koneksi permintaan-penawaran, transaksi, kepercayaan, dan penyelesaian masalah.

### Prinsip keadilan yang diusulkan
- Membership berbayar tidak boleh menyamarkan iklan sebagai kualitas organik atau memalsukan kualitas properti.
- Harga akhir, pajak, biaya layanan, dan kebijakan pembatalan ditampilkan transparan.
- Ketersediaan kamar harus sinkron dan akurat.
- Ulasan dan badge verifikasi harus memiliki dasar yang jelas.
- Penyedia memiliki kendali wajar atas data operasional, tanpa hak menghapus fakta/ulasan sah secara sewenang-wenang.
- Pelanggan memiliki mekanisme perlindungan, bantuan, komplain, pembatalan, dan penyelesaian masalah.
- Ranking organik, promosi berbayar, membership, dan kualitas/kepercayaan harus dibedakan secara eksplisit.

Prinsip tersebut merupakan opsi yang perlu ditinjau dan disepakati, bukan seluruhnya requirement final.

## Keputusan eksplisit

- Pembahasan Accommodation dilakukan melalui sharing dan penyepakatan konsep terlebih dahulu, sebelum desain halaman dan implementasi.
- Accommodation dirancang sebagai satu homepage dan satu ekosistem untuk seluruh jenis dan kelas akomodasi, bukan aplikasi/cabang terpisah berdasarkan kelas properti.
- Desain harus elegan, mudah digunakan, konsisten dengan PLUITS, dan tetap memberi ruang bagi karakter serta kemewahan properti.
- Pengembangan boleh bertahap dan lambat; kualitas, detail, serta pengalaman pengguna dan penyedia lebih penting daripada kecepatan rilis.
- PLUITS harus menciptakan manfaat untuk pelanggan dan penyedia, dengan aturan yang nyata dan adil; tidak hanya mengejar pendapatan dari penyedia.
- Catatan ini berstatus RAW dan belum menjadi spesifikasi final atau persetujuan implementasi runtime.

## Pertanyaan terbuka / konflik

- Taksonomi jenis akomodasi dan atribut minimum apa yang berlaku lintas kelas?
- Bagaimana membedakan hotel, resort, villa, homestay, guesthouse, serviced apartment, dan listing sewa jangka pendek tanpa memecah aplikasi?
- Bagaimana desain adaptif mempertahankan konsistensi sekaligus identitas visual setiap properti?
- Apa struktur homepage Accommodation, discovery, detail properti, kamar/unit, dan reservasi?
- Bagaimana mengelola ketersediaan, tarif, inventori, pajak, deposit, pembatalan, dan sinkronisasi kalender?
- Bagaimana aturan verifikasi properti dan standar bukti tempat fisik/izin yang relevan?
- Bagaimana membedakan ranking organik, iklan/promosi berbayar, membership, dan kualitas layanan?
- Bagaimana model komisi/biaya dan perlindungan kedua pihak?
- Bagaimana ulasan terverifikasi, moderasi, dispute, refund, dan perlindungan konsumen?
- Bagaimana Accommodation terhubung dengan Restaurant & Café, Spa, fasilitas, dan organisasi pengelola pada satu properti?
- Bagaimana pengalaman penyedia untuk properti kecil tetap sederhana, sementara properti besar dapat mengelola operasi kompleks?

## Hasil penyortiran

- Ecosystem Model: satu model Accommodation lintas kelas; perlu relasi ke properti fisik, organisasi, unit akomodasi, unit bisnis terkait, fasilitas, dan layanan.
- Product Design: satu homepage/ekosistem; pengalaman discovery, detail properti, kamar/unit, reservasi, dan pengelolaan penyedia perlu dirancang.
- Application Modularization: perlu kontrak modular yang mendukung skala penyedia berbeda tanpa aplikasi terpisah.
- Shared Platform Services: identitas, membership, lokasi/properti, search/discovery, inventory, pricing, booking, payment, reviews, trust & safety, notifications, dan dispute perlu dievaluasi sebagai layanan lintas modul.
- Platform UI Foundation: audit dan gunakan standar yang sudah ada sebelum menetapkan pola visual Accommodation.

## Tindak lanjut

1. Audit Platform UI Foundation, model Accommodation yang sudah ada (jika ada), serta dokumentasi terkait di Master Model App.
2. Lanjutkan sharing untuk menentukan karakter homepage dan prinsip desain Accommodation sebelum membuat wireframe final.
3. Susun peta jenis akomodasi, entitas, atribut, dan relasi yang dapat digunakan oleh seluruh kelas properti.
4. Rancang perjalanan pelanggan dan penyedia secara seimbang.
5. Definisikan prinsip kepercayaan, verifikasi, ranking, promosi, biaya, transaksi, pembatalan, dan dispute.
6. Setelah konsep disepakati, susun Product Design dan Application Modularization secara terpisah sebelum implementasi.

## Status akhir

RAW
