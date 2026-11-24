# Audit Kepemilikan Domain Social Media dan Isolasi Runtime

Status: **STATIC AUDIT COMPLETED — PARTIAL RUNTIME OWNERSHIP MIGRATION IMPLEMENTED — FULL CSS ISOLATION AND BROWSER BASELINE OPEN**  
Audit source: branch `main`, commit `3acb3a30ec04fba846de0201046ffec0d13b231e` (25 November 2026).  
Scope: ownership boundaries, route/composition, JavaScript imports, CSS cascade, cross-domain dependencies, Blog runtime ownership, and available regression evidence.

Dokumen ini mencatat kondisi kode yang ditemukan, bukan mengklaim target modular sudah diterapkan. Kode yang ada tetap menjadi baseline dan tidak boleh dihapus atau diganti massal sebelum setiap perpindahan memiliki bukti kompatibilitas.

## 1. Keputusan kepemilikan yang dikunci

Social Media adalah domain mandiri di dalam satu aplikasi PLUITS. Di dalamnya:

- Blog, Reels, Stories, dan Live adalah modul konten mandiri. Masing-masing memiliki route/page, komponen, stylesheet, state, lifecycle, API/data contract, test, dan dokumentasi sendiri.
- Feed adalah aggregator/distribution surface. Feed membaca public read model dari modul konten dan mengarahkan pengguna ke pengalaman sumber; Feed bukan pemilik draft, editor, publish lifecycle, media processing, expiry, playback, atau live-session lifecycle modul sumber.
- Social Home, Discover, Profile, Connections, dan pengalaman sosial lain adalah experience surfaces milik domain Social Media. Batas kepemilikan Messages tetap mengikuti keputusan domain komunikasi yang berlaku; integrasi UI tidak memberi Social Home kepemilikan atas mesin pesan.
- Public marketing homepage `home` bukan Social Home. Pemisahan route dan ownership keduanya harus dipertahankan.
- Marketplace, Venue/Restaurant & Café, Ticketing, GeoDirectory, Transportation, dan domain lain adalah sibling domains. Social Media tidak boleh mengimpor private code, stylesheet, DOM, state, database schema, atau lifecycle milik mereka.

## 2. Aturan interaksi keluar/masuk

Hubungan Social Media dengan domain luar dibatasi pada interaksi melalui kontrak publik yang eksplisit, misalnya:

- navigation/deep-link ke halaman pemilik;
- menerima identity/profile reference yang diotorisasi;
- menampilkan preview/read model publik yang disediakan pemilik data;
- mengirim/menangani event atau API request yang terdokumentasi;
- membuka aksi milik domain sumber, lalu menyerahkan validasi dan lifecycle kepada domain tersebut.

Contoh: Blog dapat menyematkan tautan atau preview tiket. Data inventori, harga, order, pembayaran, refund, dan redemption tetap milik Ticketing. Social Media hanya mengirimkan pengguna ke kontrak interaksi Ticketing.

Tidak diperbolehkan:
- import file privat sibling domain;
- mengakses DOM sibling melalui selector atau traversal;
- membaca/menulis state internal atau storage key privat sibling;
- mengakses tabel/database domain lain secara langsung;
- bergantung pada urutan import, global mutable state, atau CSS sibling;
- membuat transaksi atau lifecycle domain lain di dalam Social Media.

Setiap integrasi harus memiliki owner, versi/kompatibilitas payload, otorisasi, error/timeout behavior, dan fallback ketika domain tujuan tidak tersedia. Integrasi yang gagal tidak boleh merusak halaman atau state internal Social Media.

## 3. Aturan CSS dan fondasi bersama

CSS privat Social Media hanya boleh menata markup di dalam root boundary milik Social Media atau modul sumbernya. Blog, Reels, Stories, Live, Feed, Profile, dan experience surfaces harus mempunyai owner/root boundary masing-masing.

Diperbolehkan memakai Platform UI Foundation yang disetujui: brand assets, icon registry, typography, design tokens, spacing scale, breakpoint definitions, accessibility primitives, reset minimum, serta shared component/layout primitive yang tercatat owner dan consumer-nya.

Tidak diperbolehkan:
- stylesheet Social Media menarget `body`, `:root`, elemen generik, host shell, atau sibling module untuk mengatur tampilan privat;
- stylesheet domain lain menarget root/descendant internal Social Media;
- Social Media mengimpor CSS privat Marketplace, Venue, Auth, Dashboard, atau domain lain;
- shared mobile layout contract menjadi tempat menaruh detail layout privat Social Media;
- menggunakan selector `.global-*` sebagai alasan bahwa sebuah komponen aman dipakai lintas domain.

Kontrak platform hanya boleh mengatur primitive/platform shell yang memang dimiliki platform. Gutter atau slot host boleh menjadi input melalui contract, tetapi page composition, ukuran komponen lokal, card geometry, rail, typography treatment, sticky behavior, animation, dan responsive composition tetap dimiliki modul Social Media.

## 4. Temuan runtime aktual pada commit audit

### 4.1 Bootstrap dan CSS import graph

`src/main.js` mengimpor secara eager:
- `design-system/tokens.css`
- `styles/global.css`
- `features/home/home-page.css`
- `features/marketplace/marketplace-home.css`
- `features/dashboard/dashboard-page.css`
- `features/auth/auth-page.css`
- `features/legal/policy-page.css`
- `design-system/mobile-layout-contract.css`

Implikasi: stylesheet feature dimuat ke document cascade bersama, bukan hanya ketika route feature aktif. `home-page.js`, `social-pages.js`, dan `social-post-card.js` juga mengimpor stylesheet masing-masing. Duplikasi/eager loading dan jangkauan cascade harus dibereskan berdasarkan consumer map, bukan dengan mengubah urutan import.

### 4.2 Route dan composition root

`src/app/create-app.js` menjadi composition root dan saat ini memasang:
- `home` → public marketing page (`mountBusinessHomePage`);
- `social` → Social Home dari `features/home/home-page.js`;
- `discover`, `profile`, `messages`, `settings` → `features/social/social-pages.js`;
- Marketplace, Venue, Restaurant, Auth, Dashboard, Legal, dan Public Info sebagai sibling surfaces.

Composition root boleh mendaftarkan route, entry point, dan lifecycle mount/unmount. Ia tidak boleh menyimpan aturan internal Blog/Reels/Stories/Live atau sibling domain.

### 4.3 Social Home dan Blog

`src/features/home/home-page.js` saat ini mencampur komposisi Social Home dengan rail, story fixtures, discovery previews, tab konten, Feed/demo post rendering, serta demo Blog/Live presentation. Fungsi `demoContent()` menghasilkan `global-blog-demo-grid` dan contoh artikel. Ini bukan modul Blog runtime mandiri.

Tidak ditemukan runtime Blog tersendiri dalam pohon `src/features` pada commit audit. Folder dokumentasi Blog sudah ada, tetapi route/page/editor/state/API/persistence/revision/publish/archive lifecycle Blog belum boleh dianggap tersedia hanya karena dokumennya ada.

Tindakan target:
- Blog menjadi modul runtime mandiri di bawah domain Social Media.
- Blog memiliki daftar halaman/route sendiri (mis. daftar/arsip, detail artikel, editor/draft, preview/review/publish sesuai scope yang disetujui), komponen dan stylesheet sendiri, state/lifecycle sendiri, serta API contract dan tests sendiri.
- Social Home/Feed hanya memakai Blog public read model dan preview card melalui adapter/contract; klik membawa pengguna ke route Blog. Feed tidak boleh mengedit atau mengubah lifecycle artikel.
- Demo fixtures yang sekarang ada harus dipertahankan sebagai baseline sampai pengganti yang teruji tersedia, lalu dipindah/diganti secara bertahap.

### 4.4 CSS yang teridentifikasi

| File | Temuan | Dampak/batas |
|---|---|---|
| `src/features/home/home-page.css` | Sekitar 960 baris; dominan selector `.global-*`; ditemukan `body.global-search-open` | Bukan boundary privat yang memadai; selector body harus diganti dengan state lokal/overlay contract |
| `src/features/social/social-pages.css` | Sekitar 2.315 baris; menggabungkan Discover, Profile, Settings, dan beberapa surface; juga memiliki selector `.global-bottom-nav` | Banyak owner/surface tercampur; bottom nav adalah platform shell contract, bukan detail privat Social |
| `src/features/home/social-post-card.css` | Sekitar 231 baris; selector `.pl-post-*` bercampur dengan alias `.global-post-*` | Post card perlu dimiliki Feed/post component yang eksplisit, bukan namespace global |
| `src/design-system/mobile-layout-contract.css` | Memilih selector `.global-*` dan `.social-profile-*`; termasuk Feed/Reels/Blog/Live panels | Contract lintas aplikasi memuat detail feature-specific; perlu dipindahkan setelah seluruh consumer dan visual baseline dipetakan |
| `src/design-system/page-shell.css` | Memiliki `.pl-page-shell`, header/footer/nav, dan standard content frame | Shared platform contract; pertahankan hanya primitive/shell yang disetujui |
| `src/styles/global.css` | Reset global, element selectors, button/link base, dan card-radius selector berbasis class | Perlu consumer audit; base accessibility/reset dapat tetap shared, tetapi visual detail feature tidak boleh bergantung pada selector generik |
| `src/design-system/tokens.css` | Token berada di `:root` | Ini sumber token platform yang memang shared; jangan menaruh token privat Social Media di sini |

Jumlah baris/selector di atas adalah snapshot audit, bukan API atau batas permanen. Perubahan file harus mengulang inventarisasi pada commit yang sedang dikerjakan.

### 4.5 JavaScript dependency map

- `home-page.js` mengimpor route helpers, page-shell CSS/renderer, icon registry, runtime API base URL, home CSS, dan post-card renderer/interaction controller.
- `social-pages.js` mengimpor route helpers, page-shell CSS/renderer, icon registry, runtime API base URL, social-pages CSS, serta profile-cover controls.
- `social-post-card.js` mengimpor icon registry, route helper, dan post-card CSS.
- `create-app.js` mengimpor semua page mount functions dan shared bottom navigation; ini composition dependency, bukan izin bagi feature untuk mengakses internals sibling.

Semua event listener, timer, observer, portal/dialog, object URL, storage, scroll lock, dan cleanup perlu dipetakan per mount/unmount sebelum pemindahan. Static import scan saja tidak membuktikan lifecycle aman.

## 5. Bukti pengujian yang tersedia dan gap

Tests yang ditemukan meliputi route tests, Social Home responsive/CSS contract tests, composer tests, profile cover controls tests, Settings accessibility tests, dan deployment/build checks. Package scripts menyediakan `npm test` (architecture + production verification + Node tests) serta `npm run build`.

Gap yang belum dapat dinyatakan lulus:
- belum ada bukti screenshot baseline yang dapat dibandingkan untuk seluruh route Social dan sibling domain pada mobile/tablet/desktop;
- belum ada bukti browser regression lintas route setelah CSS isolation;
- belum ada verifikasi runtime bahwa CSS host/sibling tidak dapat mengubah internal Social Media;
- belum ada Blog runtime mandiri;
- belum ada pengujian fault containment pada integrasi lintas domain.

Dokumen dan automated source tests bukan pengganti browser visual UAT. Jangan menyatakan isolasi selesai hanya karena build atau unit tests lulus.

## 6. Urutan penyelesaian wajib

1. **Freeze baseline:** tidak mengubah markup/CSS/import sampai baseline route dan viewport tercatat.
2. **Lengkapi consumer map:** semua selector, custom properties, media query, keyframes, z-index, sticky/fixed, overlay/portal, event listener, timer, observer, storage, import dan cleanup.
3. **Siapkan platform/sibling consumers:** pastikan shell, navigation, Marketplace, Venue, Auth, Dashboard, Legal, Public Info tetap berfungsi tanpa selector privat Social.
4. **Tetapkan root boundaries:** Social Home, Feed, Blog, Reels, Stories, Live, Discover, Profile, Connections, dan surface sosial lainnya; kontrak portal/overlay harus eksplisit.
5. **Migrasi satu surface sekali jalan:** mulai dari selector privat yang tidak punya consumer luar; lakukan visual diff dan regression setiap slice.
6. **Pisahkan Blog runtime:** bangun route/page/editor/read model/lifecycle secara modular tanpa menghapus demo baseline sebelum parity dan tests tercapai.
7. **Pindahkan feature-specific responsive rules:** keluar dari shared mobile contract setelah semua consumer teridentifikasi dan baseline dipertahankan.
8. **Verifikasi integrasi:** hanya API/event/read model/deep-link contracts; simulasi domain tujuan tidak tersedia/timeouts dan pastikan Social Media tetap stabil.
9. **Release gate:** npm tests, production build, browser route tests, screenshot comparison mobile/tablet/desktop, accessibility/overflow/overlay/cleanup checks, sibling-domain regression, rollback notes, dan owner sign-off.

## 7. Definition of Done

Audit dan isolasi runtime Social Media hanya dinyatakan selesai bila:
- seluruh route dan file memiliki owner yang jelas;
- Blog, Reels, Stories, Live adalah modul runtime terpisah di bawah Social Media;
- Feed hanya mengonsumsi public content contracts;
- Social Media tidak memiliki import/selector/state/database coupling ke sibling internals;
- CSS setiap surface dibatasi root boundary-nya;
- CSS sibling/host tidak dapat menata internal Social Media kecuali primitive/slot platform yang disetujui;
- shared foundation memiliki consumer registry dan regression coverage;
- baseline dan hasil screenshot comparison tersedia untuk mobile, tablet, desktop;
- automated tests/build dan browser regressions lulus;
- interaksi lintas domain teruji dengan fallback/fault containment;
- semua perubahan, commit, tests, deployment state, dan UAT dicatat.

**Kesimpulan snapshot:** audit statis dependency/ownership telah menemukan titik coupling utama. Runtime isolation belum dimulai, browser baseline belum dibuktikan, dan Blog belum menjadi runtime module mandiri. Status keseluruhan tetap **IN PROGRESS**.
undefined

## Pembaruan runtime — 25 November 2026 (PR #138)

Peta historis di atas mencatat kondisi sebelum pemindahan pertama. Pada branch implementasi PR #138, kepemilikan runtime telah dipindahkan sebagai berikut:

```text
src/features/
├── home/                         # public marketing homepage only
└── social/
    ├── home/                     # Social Home page, CSS, spec, carousel registry
    ├── feed/                     # post-card renderer, interaction handlers, CSS
    ├── blog/                     # independent /blog/ route, page, CSS, README
    ├── social-pages.js           # Discover, Messages, Profile, Settings (current combined surface)
    └── social-pages.css
```

- `create-app.js` now mounts Social Home from `features/social/home/home-page.js`.
- Feed post-card code and CSS are owned by `features/social/feed/`.
- Blog has a public route `/blog/`, its own page module, category filtering, local search, and `.sm-blog-page` stylesheet namespace.
- Social Home no longer renders Marketplace product previews, venue/merchant cards, service/transport/ticketing promotions, calendar blocks, or platform marketing sections. Its header/search now target Social Media experiences.
- Social Home CSS is no longer imported directly by `main.js`; it is imported by the Social Home module.
- Social-specific mobile geometry has been moved out of `design-system/mobile-layout-contract.css` into Social Home and Social Profile stylesheets. The shared contract retains platform gutter and Marketplace shell geometry only.

This is an implemented ownership slice, not completion of all isolation. Remaining gaps: `social-pages.js` is still a combined runtime surface; Reels, Stories and Live do not yet have fully independent runtime modules/lifecycles; Social Home retains legacy `.global-*` selectors and unused styles from removed cross-domain sections; complete selector/consumer mapping and browser visual regression are still required. Blog content is preview-only; backend publishing, persistence, article detail and comments are not active.
