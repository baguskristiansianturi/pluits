# Social Media — Model Ekosistem

Status: **FOUNDATION / MODULARIZATION IN PROGRESS**. Folder ini menjadi peta kepemilikan dan tata kelola domain Social Media PLUITS.

Social Media memiliki empat modul konten mandiri:
1. [Blog](01-BLOG/README.md)
2. [Reels](02-REELS/README.md)
3. [Stories](03-STORIES/README.md)
4. [Live](04-LIVE/README.md)

## Feed bukan modul konten kelima
Feed adalah permukaan agregasi dan distribusi yang menghubungkan konten dari modul-modul tersebut serta format post lain yang disetujui. Feed memiliki kontrak distribusi, ranking, audience filtering, dan render integration sendiri; ia tidak mengambil alih domain atau lifecycle modul sumber.

## Pohon GitHub dan kontrak integrasi

Baca [Pohon GitHub Social Media dan Kontrak Integrasi](05-POHON-GITHUB-DAN-KONTRAK-INTEGRASI.md) untuk membedakan struktur runtime yang benar-benar ada dari struktur target modular, melihat pemilik halaman/fitur, dan memahami hubungan Social Media dengan Marketplace, Venue, serta domain masa depan seperti Ticketing.

## Aturan pengalaman Social Media
Aturan operasional Social Media mengikuti ritme pengalaman yang sudah ada dan kebutuhan domainnya sendiri. Baca indeks [Aturan Pengalaman Social Media](00-ATURAN-PENGALAMAN/README.md).

Jumlah aturan, dokumen, folder, dan checklist **tidak dibatasi empat atau sepuluh**. Empat jalur dokumentasi yang saat ini tersedia pada setiap modul konten hanyalah pengelompokan awal untuk Design, Development, Project, dan Checklist-Audit; bukan kuota aturan, bukan struktur wajib untuk seluruh ekosistem PLUITS, dan boleh diperluas atau ditata ulang bila kebutuhan modul mengharuskannya.

## Fondasi bersama dan kepemilikan lokal
- Fondasi visual lintas aplikasi: `../../06-PLATFORM-UI-FOUNDATION/` (logo, ikon, typography, token, spacing, breakpoint, layout primitives, komponen bersama, dan SOP).
- Product Design Social Media: `../../02-PRODUCT-DESIGN/01-SOCIAL-MEDIA/`.
- Application Modularization Social Media: `../../03-APPLICATION-MODULARIZATION/01-SOCIAL-MEDIA/`.
- Domain-specific layout, behavior, state, components, and CSS belong to the relevant module; do not create one global Social Media stylesheet that owns all experiences.
- Social Media CSS isolation is mandatory. Reuse approved shared assets/tokens/primitives only; keep module-owned layout and behavior inside explicit boundaries. See rules 16 and 17.

## Aturan perubahan
Perubahan pada Blog tidak boleh merusak Reels, Stories, atau Live. Shared code changes require consumer mapping, regression tests, and explicit review. Cross-module integrations must use documented contracts.

Pembaruan dokumentasi tidak berarti izin untuk mengubah website. Desain, tampilan, struktur halaman, CSS, JavaScript, API, dan perilaku runtime hanya berubah melalui scope implementasi terpisah yang diminta secara eksplisit.


## Kemandirian domain dan audit runtime
Social Media hanya berinteraksi dengan domain luar melalui route/deep-link, API, event, atau public read model yang terdokumentasi. Tidak boleh mengimpor private code/CSS, membaca DOM/state/storage, atau mengambil alih lifecycle sibling domain. Fondasi Platform UI Foundation yang disetujui tetap boleh dikonsumsi sebagai kontrak platform; CSS feature-specific tetap milik modul masing-masing.

Blog harus menjadi modul runtime mandiri di dalam Social Media. Feed/Social Home hanya mengonsumsi preview dan public read model Blog; lifecycle artikel tetap milik Blog. Lihat [Audit Kepemilikan Domain Social Media dan Isolasi Runtime](00-ATURAN-PENGALAMAN/18-AUDIT-KEPEMILIKAN-DOMAIN-DAN-ISOLASI-RUNTIME.md) untuk temuan aktual, gap, dan definition of done.


## Implementasi runtime — 25 November 2026
- Blog sudah memiliki entry route mandiri `/blog/` dan source owner `src/features/social/blog/` (page + stylesheet). Page memiliki filter kategori dan pencarian lokal; stylesheet memakai namespace `.sm-blog-*` dan tidak menarget selector global/sibling.
- Social Home telah dibatasi ke pengalaman sosial: people discovery, Stories, Feed/Reels/Live, composer, dan interaksi menuju Blog. Listing produk/merchant/tempat, shortcut layanan, kalender, dan promosi ekosistem dihapus dari komposisi Home.
- Header Social Home tidak lagi menampilkan favorit/keranjang/notifikasi. Quick search diarahkan ke orang/komunitas dan Blog.
- Konten Blog masih preview statis. Editor, artikel detail, publish, persistence, komentar, dan backend Blog belum aktif.
- Isolasi CSS seluruh Social Media belum selesai: Home masih memiliki selector legacy `.global-*`, stylesheet Social masih perlu audit consumer/root lengkap, dan mobile layout contract masih memuat aturan yang menyentuh Social Media. Browser visual baseline dan regresi lintas route belum terverifikasi.
- PR implementasi: [#138](https://github.com/baguskristiansianturi/pluits/pull/138). Jangan menutup audit sampai semua tahap CSS dan browser verification lulus.
