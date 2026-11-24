# Aturan 16 — Isolasi CSS dan Alur Dependensi

Status: **ATURAN WAJIB UNTUK SEMUA PEKERJAAN ISOLASI SOCIAL MEDIA**.

## Tujuan
Social Media harus mempertahankan identitas, layout, ukuran lokal, komposisi, dan perilakunya sendiri di mana pun modul itu dipasang. Halaman induk, Marketplace, Restaurant & Café, atau modul baru tidak boleh tanpa sengaja mengubah tampilan internal Social Media. Sebaliknya, CSS Social Media tidak boleh mengubah tampilan modul di luarnya.

Isolasi bukan sekadar memindahkan file, mengganti nama class, atau menambah satu wrapper. Isolasi adalah batas kepemilikan dan batas efek runtime yang dibuktikan melalui dependency mapping serta regression tests.

## Fondasi yang boleh digunakan bersama
Social Media boleh dan sebaiknya memakai sumber kebenaran bersama untuk:
- Logo dan brand assets.
- Registered icon system dan icon sizing contract.
- Font/typography foundation.
- Global design tokens yang telah disetujui.
- Spacing scale, unit scale, dan breakpoint definitions.
- Accessibility primitives dan reset browser minimum.
- Primitive fungsional yang memang disetujui sebagai shared component.

Pemakaian fondasi bersama tidak memberikan hak kepada modul lain untuk mengubah layout atau komposisi Social Media. Global tokens adalah nilai dasar; Social Media tetap memiliki aturan pemakaian dan komposisi lokal.

## Yang wajib dimiliki dan diisolasi Social Media
1. Page composition, section order, page gutters lokal, content width, rail geometry, card dimensions, media ratios, sticky behavior, and responsive layout.
2. Social Home, Feed, Stories rail, post card, Discover, Profile, Profile tabs, Bubble Connections, Messages, Settings, dan pengalaman sosial lain yang berada di dalam domain Social Media.
3. Module-specific typography treatment, color application, surface treatment, animation, state, interaction, and layout behavior.
4. Social-specific CSS selectors, keyframes, component states, and custom properties.
5. Integrasi antarmodul harus melalui contract yang eksplisit, bukan selector yang menarget markup modul lain.

## Aturan isolasi
1. Setiap Social Media surface harus memiliki root boundary yang eksplisit dan stabil.
2. Selector milik Social Media harus berada di bawah root/module namespace yang ditetapkan; selector generik seperti `header`, `button`, `article`, `section`, `img`, `body`, atau `:root` tidak boleh dipakai dalam stylesheet privat untuk mengatur tampilan aplikasi secara global.
3. Jangan menggunakan nama namespace generik `global-*` untuk komponen privat Social Media. Nama tersebut tidak membuktikan bahwa aturan bersifat global-platform atau aman dipakai lintas modul.
4. CSS import dari JavaScript tetap menjadi CSS global dalam cascade browser kecuali aturan selector dan mekanisme isolasinya memang membatasi jangkauan. Lokasi file dan import path bukan isolasi.
5. Jangan mengandalkan urutan import, specificity yang tinggi, `!important`, atau reset agresif untuk menutupi konflik antar-modul.
6. Jangan membuat ulang token global untuk menghindari konflik. Gunakan token platform sebagai input dan definisikan token lokal Social Media di bawah root-nya.
7. Jangan menambahkan selector Social Media ke stylesheet layout global hanya untuk memperbaiki tampilan satu halaman. Jika sebuah primitive benar-benar shared, dokumentasikan owner, contract, dan seluruh consumer.
8. Parent host tidak boleh menimpa detail internal Social Media melalui selector luar. Social Media juga tidak boleh menata parent/host atau sibling module.
9. Integrasi shared header, footer, app navigation, dan shell harus menggunakan slot/contract yang eksplisit. Jangan menyamakan shell global dengan layout konten privat.
10. Responsive behavior Social Media dimiliki Social Media. Host desktop/mobile boleh menentukan ruang penempatan melalui contract, tetapi tidak boleh menulis ulang komposisi internal modul secara tidak sengaja.
11. Jika suatu style benar-benar dibutuhkan bersama, pindahkan ke Platform UI Foundation setelah audit seluruh consumer dan persetujuan; jangan mengambil aturan privat dari satu modul lalu menjadikannya global tanpa review.
12. CSS khusus Blog, Reels, Stories, dan Live tetap memiliki batas modul masing-masing. Social Home/Feed hanya mengatur integrasi permukaan, bukan detail internal modul sumber.

## Aturan perubahan aman
- Jangan melakukan isolasi satu langkah besar.
- Jangan mengubah markup, class, CSS, import graph, atau layout sekaligus tanpa baseline dan acceptance criteria.
- Sebelum mengubah selector, cari seluruh pemakaian class, stylesheet yang memengaruhi, halaman yang dirender, media query, pseudo-element, keyframes, custom properties, dan event/DOM assumptions.
- Siapkan consumer luar terlebih dahulu bila ada shared selector/contract yang akan dipersempit atau dipindahkan.
- Gunakan tahap kompatibilitas sementara bila dibutuhkan; hapus hanya setelah semua consumer dipindahkan dan diuji.
- Isolasi tidak boleh mengubah tampilan Social Media yang sudah disetujui.
- Isolasi tidak boleh mengubah tampilan Restaurant & Café, Marketplace, Auth, Dashboard, Legal, Public Info, atau modul lain.
- Jika ada dampak yang belum bisa dibuktikan aman, hentikan perubahan pada tahap itu dan dokumentasikan blocker.

## Kriteria selesai
Isolasi baru boleh dinyatakan selesai jika:
- Semua Social Media style memiliki owner dan root boundary yang jelas.
- Tidak ada selector privat Social Media yang memengaruhi elemen di luar boundary.
- Tidak ada stylesheet modul luar yang dapat mengubah layout privat Social Media tanpa contract eksplisit.
- Shared foundations memiliki daftar consumer dan regression coverage.
- Perbandingan screenshot/baseline pada viewport mobile, tablet, dan desktop tidak menunjukkan perubahan desain yang tidak diminta.
- Semua route Social Media dan route non-Social Media lolos regression tests.
- Tidak ada horizontal overflow, sticky/fixed layer conflict, safe-area regression, broken overlay, atau modal stacking regression.
- Hasil build/test dan browser/device review dicatat.
