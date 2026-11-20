# Session: Unified Discovery, Physical Venue Quality, Accommodation & Account Tiers

- Tanggal: 2026-11-21
- Topik: Multi-entry discovery, physical-place identity, accommodation as a multi-business property, account tiers, and staged monetization
- Model/aplikasi terkait: PLUITS platform; Marketplace & Discovery; Restaurant & Café; Accommodation; Social Media; location/place identity layer; Identity, Accounts & Membership
- Status: RAW

## Catatan sharing

Pengguna menjelaskan bahwa PLUITS harus menyediakan banyak "jendela" atau pintu penemuan yang mengarah pada entitas dan data yang sama.

Contoh pintu penemuan:
- Direktori tempat/lokasi: pengguna mencari tempat fisik dan diarahkan ke identitas tempat serta alamatnya.
- Toko/store: pengguna menemukan toko dan produk yang dijual.
- Produk: pengguna mencari produk tertentu.
- Hangout & Leisure / Restaurant: pengguna menemukan seluruh restoran, termasuk restoran yang berada di hotel, resort, mal, klub, atau properti lain.
- Food/menu discovery: pengguna mencari makanan tertentu, misalnya pasta, lalu menemukan restoran mana pun yang benar-benar menyajikannya, tanpa membatasi hasil berdasarkan skala atau konteks properti.
- Spa discovery: semua spa yang relevan dapat ditemukan dari satu pencarian, baik spa independen maupun spa yang menjadi bagian hotel/resort.
- Pintu penemuan lain dapat ditambahkan sesuai jenis layanan/pengalaman.

Satu restoran dapat ditemukan melalui beberapa pintu, tetapi identitas restoran dan relasinya tidak boleh diduplikasi. Contoh: restoran hotel muncul dari pencarian Restaurant, pencarian Pasta, dan halaman Accommodation milik hotel tersebut.

Pengguna menekankan standar kualitas: restoran yang dimasukkan sebagai restoran fisik harus memiliki lokasi fisik yang dapat dikunjungi dan pelanggan dapat datang untuk makan. Model dapur rumahan/kos-kosan yang hanya menerima pesanan tanpa tempat kunjungan tidak boleh dicampur sebagai restoran fisik dalam direktori. Perlu klasifikasi usaha yang tepat agar kualitas direktori jangka panjang terjaga.

Akomodasi menjadi fokus pekerjaan berikutnya setelah rancangan Restaurant & Café dan Social Media yang telah dibahas. Target awal adalah membangun satu contoh properti akomodasi dan menguji sinkronisasi datanya dengan unit-unit yang dimiliki/dioperasikan di properti tersebut. Contoh properti dapat memiliki restoran fasilitas sendiri, sekalipun restorannya kecil; syarat restoran fisik tetap berlaku.

Pengguna menginginkan satu hotel/resort dapat memiliki beberapa "gurita bisnis" atau unit operasional dalam satu properti/lokasi, misalnya Accommodation, Restaurant & Café, Spa, dan layanan/fasilitas lain. Unit usaha harus dapat dikelola dan ditemukan secara mandiri sesuai konteks, sekaligus tetap terhubung dengan properti induk.

Pengguna menyampaikan urutan prioritas pembangunan bertahap: Restaurant, Social Media, Accommodation, lalu modul lain. Sistem harus disusun dari awal agar dapat berkembang perlahan sesuai kesiapan operasional dan modal, tanpa mengunci arsitektur atau memaksa seluruh modul dibangun sekaligus.

## Masalah/kebutuhan yang muncul

- Banyak pintu penemuan harus mengarah ke satu sumber identitas dan data, bukan membuat salinan entitas.
- Perlu membedakan identitas lokasi/properti fisik, organisasi pengelola, unit usaha, produk/menu, layanan, fasilitas, dan pengalaman.
- Pencarian harus bisa lintas konteks: misalnya Pasta dapat menemukan menu/restoran independen, restoran hotel, resort, mal, atau klub.
- Kualitas kategori Restaurant fisik perlu dijaga; dapur tanpa lokasi kunjungan tidak boleh diklasifikasikan sebagai restoran fisik.
- Satu properti akomodasi dapat memiliki beberapa unit usaha yang tersinkron dan dikelola secara terkoordinasi.
- Akun personal dan akun bisnis memiliki manfaat serta hak yang berbeda.
- Membership bisnis yang lebih tinggi perlu mendukung kebutuhan pengelolaan multi-unit; membership personal lebih berfokus pada privasi dan fitur personal.
- Nama "GeoDirectory" hanya istilah kerja sementara untuk menjelaskan konsep direktori lokasi. Pengguna tidak ingin menjadikannya nama produk/modul PLUITS karena istilah tersebut telah digunakan sebagai nama sistem pihak lain.
- Perlu strategi implementasi dan monetisasi bertahap agar pengembangan bisa berjalan sambil menunggu modal dari hasil bisnis.

## Ide atau opsi yang dibahas

### Model discovery multi-entry
Satu entitas dapat memiliki beberapa relasi pencarian dan tampil di beberapa konteks. Pintu discovery tidak menjadi pemilik data; ia adalah cara menampilkan/memfilter entitas berdasarkan kategori, atribut, relasi, produk, layanan, dan lokasi.

### Dimensi pencarian yang mungkin
- Jenis entitas/usaha: Restaurant, Spa, Accommodation, Store, dan lainnya.
- Produk/menu/layanan: Pasta, Sushi, massage, room stay, dan lainnya.
- Konteks properti: independent, hotel, resort, mall, club, dan lainnya.
- Skala/kapasitas usaha.
- Tipe pengalaman/suasana.
- Lokasi geografis dan jarak.

Dimensi ini adalah rancangan awal untuk ditinjau; bukan daftar final atau taksonomi yang sudah disahkan.

### Struktur properti dan unit usaha
Satu properti fisik menjadi induk relasi bagi unit-unit yang berada di dalamnya. Unit usaha memiliki identitas dan operasional sendiri bila memang relevan, tetapi terhubung ke properti dan organisasi pengelolanya. Fasilitas yang bukan unit usaha mandiri perlu dibedakan dari unit usaha.

### Membership dan akun
Tingkatan yang disebut pengguna:
- Silver
- Gold
- Platinum
- Fluid Priority

Fluid Priority perlu dibedakan untuk:
- Personal: manfaat pada privasi dan fitur yang digunakan individu.
- Business: manfaat pada modul bisnis dan pengelolaan beberapa unit usaha dalam satu properti/organisasi.

Detail hak, batas, harga, dan eligibility setiap tier belum ditetapkan dalam sesi ini. Fluid Priority Business dipandang penting bagi hotel/properti yang mengelola beberapa unit atau bisnis terkait.

### Penamaan lapisan direktori tempat
Gunakan istilah "GeoDirectory" hanya sebagai istilah kerja sementara. Nama kanonis PLUITS belum diputuskan. Konsep yang dimaksud adalah lapisan identitas tempat fisik, alamat/lokasi, dan hubungan antara properti dengan unit-unit di dalam/terkait dengannya.

## Keputusan eksplisit

- Fokus pembahasan dan perancangan berikutnya bergeser ke Accommodation.
- Uji awal Accommodation harus memakai satu properti contoh dan menguji hubungan/sinkronisasi dengan unit usaha di dalamnya, termasuk restoran fasilitas properti.
- Restoran yang ditampilkan sebagai restoran fisik harus memiliki tempat yang dapat dikunjungi pelanggan untuk makan; model dapur rumahan tanpa tempat kunjungan tidak boleh dicampur ke kategori restoran fisik.
- Istilah "GeoDirectory" bukan nama final produk/modul PLUITS; hanya istilah kerja sementara.
- Urutan prioritas produk yang disampaikan: Restaurant, Social Media, Accommodation, kemudian modul lain.
- Dokumentasi sesi ini adalah catatan sharing mentah untuk ditinjau, bukan pengganti spesifikasi final atau otorisasi implementasi runtime.

## Pertanyaan terbuka / konflik

- Apa nama final lapisan identitas tempat/lokasi milik PLUITS?
- Kapan sesuatu dimodelkan sebagai properti fisik, sub-lokasi, unit usaha, fasilitas, atau layanan?
- Bagaimana mengelola restoran di hotel yang terbuka untuk umum versus restoran yang hanya melayani tamu hotel?
- Bagaimana memverifikasi lokasi fisik dan kelayakan sebuah usaha agar standar kualitas direktori terjaga?
- Apakah produk/menu menjadi entitas katalog tersendiri yang dapat dicari lintas merchant, dan bagaimana ketersediaan serta validitasnya disinkronkan?
- Apa definisi, hak akses, benefit, harga, dan syarat Silver, Gold, Platinum, serta Fluid Priority Personal/Business?
- Apakah Fluid Priority Business melekat pada organisasi, properti, atau kombinasi organisasi dan properti?
- Bagaimana struktur relasi untuk satu organisasi yang mengelola beberapa properti dan satu properti yang memiliki banyak unit usaha?
- Bagaimana strategi sinkronisasi dan sumber kebenaran data lintas modul agar perubahan profil/properti/unit tidak menghasilkan duplikasi atau konflik?
- Bagaimana modul Accommodation, Restaurant, dan Social Media saling terhubung tanpa membuat ketergantungan yang menghambat implementasi bertahap?

## Hasil penyortiran

- Ecosystem Model: perlu ditinjau untuk model multi-entry discovery, place/property identity, organization & business units, dan account/membership.
- Product Design: Accommodation menjadi fokus berikutnya; rancang pengalaman properti, halaman unit usaha, serta discovery dari berbagai pintu.
- Application Modularization: perlu blueprint untuk entitas kanonis, relasi, API/kontrak sinkronisasi, ownership data, permissions, dan integration tests.
- Shared Platform Services: identitas akun, organisasi, membership, lokasi, katalog/produk/menu, search/indexing, dan relasi lintas modul perlu dievaluasi sebagai layanan bersama.
- Platform Wrapper: banyak pintu discovery harus konsisten mengarah ke detail entitas kanonis.

## Tindak lanjut

1. Audit dokumentasi Master Model App yang sekarang dan lokasi spesifikasi Restaurant & Café serta Social Media; jangan menyalin atau mengganti dokumen yang sudah ada sebelum audit.
2. Sortir catatan ini menjadi keputusan kanonis yang disetujui dan pertanyaan yang masih terbuka.
3. Rancang model Accommodation dengan satu properti contoh yang memiliki setidaknya satu restoran fisik sebagai unit/fasilitas.
4. Definisikan skenario uji sinkronisasi: properti induk, organisasi pengelola, unit akomodasi, restoran, menu, lokasi/alamat, status operasional, dan discovery dari beberapa pintu.
5. Audit desain akun personal/bisnis dan tier membership yang sudah ada sebelum membuat spesifikasi baru.

## Status akhir

RAW
