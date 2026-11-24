# Pohon GitHub Social Media PLUITS dan Kontrak Integrasi

Status: **PETA ARSITEKTUR + RENCANA MIGRASI TERKENDALI**  
Cakupan: kepemilikan domain Social Media, struktur repository, titik integrasi, dan batas modul.

Dokumen ini menjawab dua hal yang berbeda dan harus selalu dibedakan:

1. **Pohon runtime saat ini**: file yang benar-benar ada dan dipakai aplikasi pada branch `main`.
2. **Pohon target modular**: struktur kepemilikan yang akan dicapai bertahap. Pohon target bukan klaim bahwa file sudah dipindahkan atau semua fiturnya sudah selesai.

Tidak ada perubahan tampilan atau runtime yang diotorisasi oleh dokumen ini.

---

## 1. Prinsip arsitektur yang menjadi keputusan

PLUITS adalah satu ekosistem terintegrasi yang terdiri dari modul-modul mandiri.

- Platform UI Foundation menyediakan aset dan kontrak bersama: logo, ikon terdaftar, typography, token yang berlaku, spacing, breakpoint, accessibility primitives, dan komponen/layout primitive yang memang disetujui untuk dipakai lintas modul.
- Setiap domain/fitur memiliki pemilik, struktur, aturan, halaman, perilaku, state, API contract, CSS, test, dan dokumentasi sendiri.
- Integrasi terjadi melalui route/composition contract, API/service contract, event atau data contract yang terdokumentasi. Integrasi **tidak** berarti modul boleh mengambil alih file, state, stylesheet, atau lifecycle privat modul lain.
- Feed adalah permukaan agregasi/distribusi. Feed membaca dan menampilkan konten yang dipublikasikan oleh modul sumber; Feed bukan pemilik lifecycle Blog, Reels, Stories, atau Live.
- Blog, Reels, Stories, dan Live adalah empat modul konten mandiri di dalam domain Social Media.
- Tiket, jika kelak dibangun, adalah domain/fitur sibling tersendiri di luar Social Media. Social Media dapat menautkan atau menampilkan discovery/ticket preview melalui kontrak integrasi, tetapi tidak memiliki mesin tiket, inventori, harga, pemesanan, pembayaran, atau lifecycle tiket.
- Modul baru tidak harus mengikuti jumlah folder, jumlah aturan, atau pola halaman modul lain. Struktur ditentukan oleh kebutuhan domainnya sendiri.

## 2. Pohon runtime yang benar-benar ada di `main`

Peta ini diverifikasi dari repository pada commit audit `3f348a8b006ecce80d6996ff4968d4895cc2ead4`.

```text
pluits/
├── src/
│   ├── main.js
│   │   ├── design-system/tokens.css
│   │   ├── styles/global.css
│   │   ├── features/home/home-page.css
│   │   ├── features/marketplace/marketplace-home.css
│   │   ├── features/dashboard/dashboard-page.css
│   │   ├── features/auth/auth-page.css
│   │   ├── features/legal/policy-page.css
│   │   └── design-system/mobile-layout-contract.css
│   │
│   ├── app/
│   │   └── create-app.js                 # composition root / route mounting
│   ├── config/
│   │   └── paths.js                      # canonical route registry
│   ├── design-system/
│   │   ├── tokens.css
│   │   ├── icons.js
│   │   ├── layouts.js
│   │   ├── page-shell.js
│   │   ├── page-shell.css
│   │   └── mobile-layout-contract.css
│   │
│   └── features/
│       ├── home/
│       │   ├── business-home-page.js     # public PLUITS homepage (bukan Social Media)
│       │   ├── business-home.css
│       │   ├── home-page.js              # Social Home / Feed experience saat ini
│       │   ├── home-page.css
│       │   ├── social-post-card.js       # renderer + interaction Feed/Reels saat ini
│       │   └── social-post-card.css
│       │
│       ├── social/
│       │   ├── social-pages.js           # Discover, Messages, Profile, Settings, dll.
│       │   ├── social-pages.css
│       │   └── profile-cover-controls.js
│       │
│       ├── marketplace/
│       │   ├── marketplace-home-page.js
│       │   └── marketplace-home.css
│       │
│       └── venue/                        # domain merchant/venue terpisah
│
├── tests/
│   ├── routes.test.js
│   └── features/                         # feature regression tests
│
└── PLUITS-MASTER-MODEL-APP/
    └── 01-ECOSYSTEM-MODELS/
        └── 01-SOCIAL-MEDIA/
            ├── 00-ATURAN-PENGALAMAN/
            ├── 01-BLOG/
            ├── 02-REELS/
            ├── 03-STORIES/
            └── 04-LIVE/
```

### Catatan kondisi aktual

- Social Home masih berada di `src/features/home/`, karena secara historis halaman itu memakai nama Global Home. Ini adalah lokasi runtime saat ini, **bukan** keputusan bahwa Social Media harus menjadi bagian dari domain public Home.
- Halaman Discover, Messages, Profile, dan Settings masih digabung dalam `src/features/social/social-pages.js` dan stylesheet-nya.
- Post Card masih dimiliki folder `features/home`.
- CSS feature masih diimpor ke cascade dokumen yang sama. Nama class/prefix saat ini belum menjamin isolasi CSS.
- `mobile-layout-contract.css` berisi aturan yang menyentuh beberapa permukaan Social dan perlu dipetakan per selector serta consumer sebelum dipindah atau dipersempit.
- Struktur dokumentasi Blog/Reels/Stories/Live sudah tersedia; hal tersebut **tidak** berarti seluruh implementasi runtime masing-masing modul sudah tersedia.

## 3. Pohon target modular Social Media

Pohon ini adalah tujuan pengorganisasian kode setelah setiap perpindahan aman, teruji, dan disetujui. Nama/folder dapat disempurnakan lewat audit tanpa mengubah kepemilikan domain.

```text
src/
├── app/
│   ├── create-app.js                     # composition root saja
│   └── routes.js
│
├── design-system/                        # fondasi lintas PLUITS
│   ├── tokens.css
│   ├── icons.js
│   ├── page-shell.js
│   └── ...
│
└── features/
    ├── social-media/                     # domain owner: Social Media
    │   ├── README.md                     # domain boundary + module registry
    │   ├── integration/
    │   │   ├── social-media-contracts.js # kontrak publik lintas modul
    │   │   ├── content-registry.js       # registrasi format yang dapat diagregasi
    │   │   └── events.js                 # event names/payload contracts
    │   │
    │   ├── experience/                   # halaman komposisi Social Media
    │   │   ├── home/                     # Social Home + navigation composition
    │   │   ├── discover/                 # social discovery surface
    │   │   ├── profile/                  # public profile composition
    │   │   ├── connections/              # Bubble Connections / social graph UI
    │   │   ├── messages/                 # bila tetap menjadi bagian domain Social
    │   │   └── settings/                 # social/account preference UI
    │   │
    │   ├── feed/                         # aggregator/distribution surface
    │   │   ├── api/
    │   │   ├── components/
    │   │   ├── state/
    │   │   ├── adapters/                 # Blog/Reels/Stories/Live public read models
    │   │   ├── styles/
    │   │   └── tests/
    │   │
    │   ├── blog/                         # content module owner
    │   │   ├── pages/
    │   │   ├── components/
    │   │   ├── state/
    │   │   ├── api/
    │   │   ├── styles/
    │   │   ├── tests/
    │   │   └── README.md
    │   │
    │   ├── reels/                        # content module owner
    │   │   ├── pages/
    │   │   ├── components/
    │   │   ├── state/
    │   │   ├── api/
    │   │   ├── styles/
    │   │   ├── tests/
    │   │   └── README.md
    │   │
    │   ├── stories/                      # content module owner
    │   │   ├── pages/
    │   │   ├── components/
    │   │   ├── state/
    │   │   ├── api/
    │   │   ├── styles/
    │   │   ├── tests/
    │   │   └── README.md
    │   │
    │   └── live/                         # content module owner
    │       ├── pages/
    │       ├── components/
    │       ├── state/
    │       ├── api/
    │       ├── styles/
    │       ├── tests/
    │       └── README.md
    │
    ├── marketplace/                     # sibling domain; not inside Social Media
    ├── tickets/                          # future sibling domain; not inside Social Media
    ├── venue/                            # sibling merchant/venue domain
    └── ...
```

### Yang tidak boleh dilakukan

- Jangan membuat `social-media.css` raksasa yang menjadi pemilik semua halaman dan semua format konten.
- Jangan memindahkan semua aturan Blog/Reels/Stories/Live ke Feed hanya karena semuanya tampil di Feed.
- Jangan membuat Ticketing sebagai subfolder Social Media.
- Jangan membuat Social Media mengambil alih token, logo, icon registry, atau komponen platform yang sudah dimiliki Platform UI Foundation.
- Jangan membuat Marketplace, Venue, atau domain sibling mengimpor CSS/state privat Social Media.
- Jangan melakukan pemindahan folder massal sebelum seluruh import, route, consumer, data/API, test, dan CSS dependency dipetakan.

## 4. Peta halaman dan pemilik perilaku

| Permukaan/halaman | Pemilik | Peran |
|---|---|---|
| Social Home | Social Media / Experience | Komposisi beranda, navigasi sosial, rail, tab, dan entry point |
| Feed | Social Media / Feed | Agregasi dan distribusi konten yang layak tampil |
| Blog | Social Media / Blog | Editor, draft, publikasi, artikel, detail, komentar dan lifecycle Blog |
| Reels | Social Media / Reels | Pembuatan, media video, pemutaran, detail, dan lifecycle Reels |
| Stories | Social Media / Stories | Pembuatan, audience, urutan, masa tayang, viewer dan lifecycle Story |
| Live | Social Media / Live | Persiapan, sesi live, audience, interaksi, berakhir, dan replay sesuai kebijakan |
| Discover | Social Media / Experience + discovery contract | Penemuan orang dan konten sosial; discovery tempat/produk dapat diintegrasikan melalui domain terkait |
| Profile | Social Media / Profile | Identitas publik, preferensi privasi, dan komposisi profil |
| Connections | Social Media / Connections | Follow/friend/circle dan aturan relasi sosial |
| Messages | Domain komunikasi sesuai keputusan produk | Percakapan dan status pesan; tidak boleh menjadi state internal Feed |
| Marketplace | Marketplace | Katalog, seller discovery, listing, cart, dan transaksi marketplace |
| Ticketing (future) | Ticketing | Jadwal, event, inventory, seat/slot, ticket order, payment, barcode, redemption, refund |
| Venue / Restaurant & Café | Venue / Merchant Operations | Operasional merchant, menu, order, meja, sesi dine-in dan layanan merchant |

Satu halaman dapat menampilkan data dari beberapa domain. Hal itu tidak mengubah pemilik data, aturan, atau lifecycle sumber.

## 5. Kontrak integrasi antarmodul

### A. Platform → semua modul

Platform menyediakan aset dan primitive yang sudah terdaftar. Platform tidak mengambil alih komposisi halaman atau aturan bisnis Social Media.

### B. Modul konten → Feed

Setiap modul konten menerbitkan read model/event publik yang memenuhi kontrak minimum, misalnya:

- `content_id` dan `content_type` yang stabil;
- `author_id` dan referensi profil;
- status publikasi dan audience/visibility yang sudah diotorisasi;
- waktu publikasi;
- metadata tampilan yang diperlukan Feed;
- media reference yang aman dan dapat diotorisasi;
- URL/deep-link ke halaman detail milik modul sumber.

Feed boleh mengatur urutan agregasi, filter, distribusi, dan tampilan ringkas. Feed tidak boleh mengubah draft, audience policy, expiry, playback lifecycle, atau aturan publikasi milik modul sumber.

### C. Social Media ↔ Marketplace / Venue / GeoDirectory / Ticketing

Integrasi dilakukan melalui ID referensi, URL/deep-link, read model, atau API contract yang terdokumentasi. Social Media boleh menampilkan kartu/preview yang berasal dari domain lain, tetapi aksi transaksi harus diarahkan ke domain pemiliknya. Domain pemilik tetap memvalidasi harga, ketersediaan, otorisasi, pembayaran, dan status transaksi.

Contoh: postingan Blog boleh menyematkan event/tiket. Data tiket dan proses pembeliannya tetap milik Ticketing.

### D. Route dan composition root

`src/app/create-app.js` adalah composition root. Tugasnya mendaftarkan route dan me-mount/unmount entry point fitur. File ini tidak boleh menyimpan aturan bisnis internal Blog, Reels, Stories, Live, atau Ticketing.

### E. CSS dan runtime boundary

- Setiap experience/module memiliki root boundary yang eksplisit dan selector CSS lokal yang dibatasi ke root tersebut.
- CSS module tidak boleh memakai selector global generik untuk mengatur elemen di luar root.
- Token/primitive platform hanya dikonsumsi; modul tidak mendefinisikan ulang nilai platform.
- Host page tidak boleh mengubah geometri internal modul melalui selector keturunan yang tidak disepakati.
- Modul tidak boleh mengubah body/html, sibling module, atau komponen host tanpa kontrak platform yang eksplisit.
- Import CSS lewat JavaScript tidak sama dengan isolasi CSS.
- Isolasi tidak boleh mengandalkan urutan import, specificity escalation, atau `!important`.
- Portal/dialog/global overlay memerlukan kontrak mount point, z-index/layer, focus, scroll lock, dan cleanup tersendiri.

## 6. Urutan migrasi dari runtime saat ini

1. **Inventory lengkap** — semua import, route, markup root, class, selector, custom property, media query, keyframe, z-index, sticky/fixed, overlay/portal, event listener, timer, observer, dan cleanup.
2. **Baseline visual** — screenshot dan computed-style evidence Social Home, Discover, Profile, Messages, Settings, Marketplace, Venue Home, Restaurant, Auth, Dashboard, Legal dan Public Info pada mobile/tablet/desktop.
3. **Siapkan consumer eksternal** — pastikan shell, bottom navigation, mobile layout contract, Marketplace, Venue, Auth dan halaman lain tetap memakai primitive platform yang benar tanpa bergantung pada selector privat Social.
4. **Tentukan root boundaries dan kontrak shared** — pisahkan shared primitive yang benar-benar lintas domain dari komposisi Social yang saat ini mungkin ditempatkan di file foundation.
5. **Migrasi satu permukaan sekali jalan** — mulai dari permukaan dengan consumer paling terpetakan; pertahankan output visual dan perilaku; jalankan test/build/regresi setiap slice.
6. **Pindahkan ownership folder secara bertahap** — setelah route/import/API/test dan CSS boundary aman, pindahkan Social Home/Post Card dari `features/home` ke domain Social Media; pisahkan page modules dari file gabungan berdasarkan halaman/fitur.
7. **Hapus kompatibilitas lama** — hanya setelah seluruh consumer pindah dan bukti regresi lengkap.
8. **Audit akhir** — validasi route langsung, guest/auth, responsive, keyboard, overlay, scroll, no overflow, build, tests, dan browser/device UAT.

### Gate keselamatan

Jangan lanjut ke pemindahan CSS atau file runtime jika:
- baseline visual belum tersedia untuk permukaan terdampak;
- selector/consumer belum diketahui;
- aturan shared belum memiliki owner/kontrak;
- tidak tersedia rollback yang jelas;
- test/build atau browser check untuk slice tersebut gagal.

Status audit sebelumnya: **audit awal selesai; isolasi runtime belum dimulai**. Status tersebut tidak boleh diubah menjadi selesai hanya karena dokumen/pohon ini dibuat.

## 7. Definition of done untuk Social Media modular

Social Media baru dinyatakan modular dan terisolasi setelah:

- seluruh halaman/fitur memiliki owner dan entry point yang jelas;
- Blog, Reels, Stories, Live dapat dikembangkan dan diuji secara independen;
- Feed hanya mengonsumsi kontrak publik modul sumber;
- halaman dapat ditempatkan di shell/host berbeda tanpa host merusak komposisi internalnya;
- CSS/JS/state modul tidak memengaruhi sibling atau domain lain;
- shared resources hanya berasal dari Platform UI Foundation;
- semua integrasi memiliki kontrak dan test;
- semua route dan state utama lulus regresi;
- visual UAT dicatat berdasarkan bukti, bukan asumsi;
- pohon GitHub, Change Map, dokumentasi Product Design, modularization, dan runtime saling konsisten.

---

## 8. Dokumen dan runtime terkait

- [Aturan Pengalaman Social Media](00-ATURAN-PENGALAMAN/README.md)
- [Blog](01-BLOG/README.md)
- [Reels](02-REELS/README.md)
- [Stories](03-STORIES/README.md)
- [Live](04-LIVE/README.md)
- [Isolasi CSS dan alur dependensi](00-ATURAN-PENGALAMAN/16-ISOLASI-CSS-DAN-ALUR-DEPENDENSI.md)
- [Peta runtime dan tahap migrasi isolasi](00-ATURAN-PENGALAMAN/17-PETA-RUNTIME-DAN-TAHAP-MIGRASI-ISOLASI.md)
- Runtime route composition: `src/app/create-app.js`
- Route registry: `src/config/paths.js`
- Existing Social Home: `src/features/home/home-page.js`
- Existing Social pages: `src/features/social/social-pages.js`
- Existing Feed/Post Card: `src/features/home/social-post-card.js`
- Platform CSS contract: `PLUITS-MASTER-MODEL-APP/06-PLATFORM-UI-FOUNDATION/01-DESIGN-TOKENS/CSS-OWNERSHIP-AND-CASCADE-CONTRACT-001.md`
