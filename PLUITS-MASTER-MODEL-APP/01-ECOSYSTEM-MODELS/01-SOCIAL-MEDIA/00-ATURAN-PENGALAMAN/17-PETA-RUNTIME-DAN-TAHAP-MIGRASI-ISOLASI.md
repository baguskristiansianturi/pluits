# Aturan 17 — Peta Runtime dan Tahap Migrasi Isolasi

Status: **AUDIT AWAL SELESAI — IMPLEMENTASI ISOLASI BELUM DIMULAI**.

Dokumen ini merekam jalur efek CSS yang teridentifikasi pada repository saat audit. Peta ini adalah baseline awal, bukan jaminan bahwa tidak ada dependency lain; setiap tahap implementasi wajib mengulang pencarian dan pengujian terhadap HEAD terbaru.

## 0. Dokumen platform yang sudah mengatur cascade

Audit juga menemukan bahwa Platform UI Foundation sudah memiliki contract otoritatif: `../../../../06-PLATFORM-UI-FOUNDATION/01-DESIGN-TOKENS/CSS-OWNERSHIP-AND-CASCADE-CONTRACT-001.md`. Aturan Social Media ini merupakan penerapan spesifik domain dan tidak menggantikan atau menyalin ulang kontrak platform tersebut. Semua perubahan tetap harus mematuhi Foundation Governance, CSS Ownership and Cascade Contract, dan UI Foundation Preflight.

Ada pula `../../../../06-PLATFORM-UI-FOUNDATION/07-LAYOUT-PATTERNS/LAY-GLOBAL-SOCIAL-DISCOVERY-001.md` yang berstatus provisional dan mencatat pola Global Social Discovery dengan beberapa consumer Social. Sebelum isolasi, pola ini harus diaudit: tentukan apakah ia benar-benar primitive bersama yang disetujui atau komposisi khusus Social Media yang kebetulan ditempatkan di Foundation. Jangan memindahkan, menghapus, atau memperluas ownership-nya tanpa consumer mapping dan persetujuan sesuai governance.

## 1. Jalur runtime yang ditemukan

### Entry point dan cascade global
- `index.html` memuat `src/main.js`.
- `src/main.js` mengimpor `tokens.css`, `global.css`, `features/home/home-page.css`, `features/marketplace/marketplace-home.css`, Dashboard/Auth/Legal CSS, dan `mobile-layout-contract.css`.
- `create-app.js` mengimpor Home, Social pages, Marketplace, Venue, Dashboard, Auth, Legal, dan Public Info secara statis.
- `home-page.js` mengimpor `page-shell.css` dan `home-page.css`; ia juga mengimpor Social Post Card yang mengimpor `social-post-card.css`.
- `social-pages.js` mengimpor `page-shell.css` dan `social-pages.css`.
- Venue Home dan Venue Provider mengimpor stylesheet masing-masing; Restaurant Ordering diimpor oleh Venue Provider.
- CSS import pada bundel ini masuk ke cascade dokumen. Import melalui file JavaScript tidak menciptakan CSS Modules atau Shadow DOM isolation.

### Social Home dan Feed
- Runtime owner: `src/features/home/home-page.js`.
- Stylesheet utama: `src/features/home/home-page.css` (sekitar 75 KB pada saat audit).
- Kartu postingan: `src/features/home/social-post-card.js` dan `social-post-card.css` (sekitar 26 KB).
- Wrapper Social Home saat ini memakai `.pl-page-shell.pl-page-shell--surface.pl-page-shell--standard-content.home-page.global-home-page`.
- Banyak selector Home menggunakan prefix `.global-*`, termasuk header, section, rail, tab, post, dan komponen overlay. Prefix ini tidak otomatis menjadikannya shared foundation; saat ini stylesheet tersebut dimuat secara global.
- Kartu postingan memakai prefix `.pl-post-*`, yang merupakan awal namespace fitur lebih spesifik, tetapi tetap harus diverifikasi selector demi selector.

### Social pages
- Runtime owner: `src/features/social/social-pages.js`.
- Stylesheet: `src/features/social/social-pages.css` (sekitar 97 KB pada saat audit).
- Wrapper halaman sosial selain Home memakai `.pl-page-shell...` dan `.social-shell`; konten lokal memakai banyak selector `.social-*`.
- Profile cover controls berada di `profile-cover-controls.js` dan bergantung pada markup serta selector profil terkait.
- Selector `.social-*` memberi namespace awal, tetapi stylesheet tetap berada di cascade global dan dapat memiliki dependency pada shared shell, global icon, serta responsive contract.

## 2. Shared foundations dan dampak lintas modul

### `src/design-system/tokens.css`
- Mendefinisikan custom properties di `:root`: spacing, brand logo size, shell geometry, content widths, breakpoints, colors, radii, shadows, dan font.
- Token ini adalah sumber nilai bersama. Jangan memindahkan atau mengubah nilainya sebagai efek samping isolasi Social Media.
- Beberapa token ditandai provisional/pending review; jangan menganggapnya final atau membuat salinan global baru.

### `src/styles/global.css`
- Berisi reset dan aturan global untuk `html`, `body`, button, input, anchor, focus, `.ui-icon`, brand, app root, dan aturan radius card berbasis class.
- Ini memang lintas aplikasi. Setiap perubahan perlu regression coverage seluruh route, bukan hanya Social Media.

### `src/design-system/page-shell.css`
- Mengatur `.pl-page-shell`, header/footer, `.pl-page-main`, shared content spacing, payment footer, dan app bottom navigation.
- Selector `.pl-page-shell > .pl-page-main` berlaku pada seluruh page shell yang memakai contract tersebut. Ada pengecualian khusus `.pl-page-shell.home-page > .pl-page-main`.
- Social Home dan Social pages memakai shell ini; halaman publik/merchant lain juga memakai beberapa primitive shell. Mengubah shell sebelum menyiapkan consumer luar berisiko mengubah banyak halaman.
- Navigasi Social Home saat ini memakai markup `.global-bottom-nav`; shared helper menghasilkan `.global-bottom-nav.pl-global-bottom-nav`. Kedua varian perlu dipetakan terpisah sebelum penyatuan atau pemisahan.

### `src/design-system/mobile-layout-contract.css`
- Memuat aturan mobile pada `:root` untuk page gutter.
- Mengatur rail dengan nama `.global-*`, content tabs, Feed/Blog/Live content breakout, post list/card, dan profile carousel/panels.
- Beberapa selector secara langsung menarget class Social Media, sedangkan selector `.global-*` berpotensi memiliki consumer di luar Social Media.
- File ini adalah dependency lintas modul dan salah satu blocker utama untuk isolasi aman. Jangan memindahkan atau mempersempit selector sebelum semua consumer-nya ditemukan dan halaman luar disiapkan.

### Restaurant & Café sebagai contoh batas modul
- Stylesheet `venue-home-page.css`, `venue-provider-page.css`, dan `restaurant-ordering.css` memakai namespace lokal seperti `.vn-*`, `.vpp-*`, dan `.ro-*`.
- Modul tersebut tetap menggunakan fondasi bersama seperti tokens, icon primitive, dan page shell sesuai contract.
- Pola yang dituju: fondasi bersama tetap dipakai, sementara layout dan perilaku merchant tetap dimiliki stylesheet modulnya. Ini referensi boundary, bukan instruksi untuk menyalin desain atau struktur Restaurant & Café ke Social Media.

## 3. Risiko yang wajib ditangani sebelum isolasi

1. Selector `.global-*` di Home Social Media belum membedakan shared foundation dengan komponen privat Social Home.
2. CSS Home diimpor langsung dari `main.js`, sehingga tidak hanya dimuat ketika route Social Home sedang aktif.
3. `mobile-layout-contract.css` mencampur aturan lintas aplikasi, rail, Feed, dan profile.
4. Shared page shell mengatur geometri yang dipakai lebih dari satu jenis halaman.
5. Global reset dan class-based card radius dapat mengubah tampilan komponen baru yang kebetulan memakai nama class serupa.
6. Route mounting menambahkan bottom navigation pada beberapa halaman, sedangkan Venue pages memiliki struktur dan footer sendiri; perubahan shell/navigation perlu menguji kedua pola.
7. Social Home, Discover, Profile, Messages, dan Settings menggunakan kombinasi shell dan stylesheet berbeda. Jangan mengasumsikan satu root wrapper saat ini sudah mencakup semua route.
8. CSS media query, sticky/fixed layers, viewport breakout, safe area, modal/overlay z-index, keyframes, dan selector `:has()` harus diperiksa sebagai bagian dari efek runtime.

## 4. Urutan migrasi wajib

### Tahap 0 — Freeze dan baseline
- Jangan ubah CSS/markup/import.
- Catat baseline screenshot pada Social Home, Discover, Profile, Messages, Settings, Marketplace, Venue Home, The Garden Table, Restaurant Ordering, Auth, Dashboard, Legal, dan Public Info.
- Jalankan test/build yang ada dan simpan hasilnya.
- Inventaris selector, class usage, CSS imports, custom properties, media queries, keyframes, z-index, sticky/fixed elements, overlays, dan route owners.

### Tahap 1 — Siapkan fondasi luar dan contract bersama
- Tetapkan apa yang benar-benar global: logo, registered icons, typography, approved tokens, spacing scale, breakpoints, accessibility/reset, dan layout primitives.
- Audit seluruh consumer dari setiap shared selector/primitive.
- Siapkan dan validasi consumer non-Social terlebih dahulu jika kontrak shared shell, navigation, content width, atau gutter perlu berubah.
- Pertahankan perilaku dan visual Restaurant & Café, Marketplace, Auth, Dashboard, Legal, dan Public Info.
- Jangan memindahkan aturan lokal Social Media ke Platform UI Foundation hanya karena file tersebut sekarang diimpor dari entry point.

### Tahap 2 — Tetapkan root boundary Social Media
- Definisikan root yang konsisten untuk Social Home, Discover, Profile, Messages, Settings, dan seluruh sub-surface.
- Tetapkan kontrak eksplisit untuk shared header/footer/navigation bila dipakai.
- Petakan portal/modal/overlay yang berada di luar root DOM dan tentukan boundary aman sebelum mengubah selector.
- Tetapkan namespace per submodule; jangan menyamakan Feed, Reels, Blog, Stories, atau Live sebagai satu kepemilikan CSS privat.

### Tahap 3 — Migrasi CSS bertahap
- Migrasikan satu surface pada satu waktu dengan baseline screenshot dan regression tests.
- Awali dari selector yang jelas privat dan tidak memiliki consumer luar.
- Pindahkan selector `.global-*` yang sebenarnya milik Social Home ke namespace Social Home setelah seluruh pemakaian ditemukan.
- Pisahkan aturan responsive Social Media dari contract mobile lintas aplikasi; pertahankan primitive yang benar-benar shared.
- Hindari perubahan visual; lakukan visual diff setelah setiap surface.
- Jangan menghapus compatibility rules sebelum consumer lama sudah berpindah dan seluruh tes lolos.

### Tahap 4 — Verifikasi lintas konteks
- Uji Social Media pada viewport mobile, tablet, desktop dan host/container berbeda.
- Uji semua route non-Social untuk memastikan tidak ada perubahan layout, font, icon, spacing, navigation, card, footer, modal, atau overflow.
- Uji interaksi sticky filter, rail horizontal, post overlays, profile cover menu, Bubble Connections, Settings tabs, bottom nav, safe area, keyboard, reduced motion, dan page cleanup.
- Uji route masuk/keluar berulang untuk mendeteksi listener, style, atau state yang tertinggal.

### Tahap 5 — Tutup migrasi
- Hapus selector/import compatibility hanya setelah audit membuktikan tidak ada consumer.
- Perbarui module ownership map, CSS dependency map, test coverage, dan rollback instructions.
- Catat hasil build/test/browser UAT dan perubahan file.
- Isolasi dinyatakan selesai hanya setelah seluruh acceptance criteria Aturan 16 dipenuhi.

## 5. Keputusan audit saat ini
**Belum aman melakukan isolasi CSS runtime dalam satu perubahan.** Audit menemukan ketergantungan nyata pada global entrypoint, shared shell, global tokens/reset, dan mobile layout contract. Langkah aman saat ini adalah mengunci aturan dan dependency map ini, lalu menyiapkan consumer luar sebelum migrasi selector Social Media. Tidak ada CSS atau website yang diubah dalam audit ini.
