# Blog — Social Media Module

Status: **FOUNDATION CREATED — FEATURE IMPLEMENTATION STATUS MUST BE VERIFIED SEPARATELY**.

Artikel dan tulisan panjang dengan struktur editorial, halaman baca, metadata, kategori/tag, draft, publikasi, revisi, dan arsip.

## Batas kepemilikan
Modul Blog memiliki product requirements, user journey, page/route inventory, domain rules, state machine, komponen khusus, interaksi, stylesheet, API/event contract, test suite, dan release gate sendiri. Modul lain tidak boleh mengubah aturan internalnya secara langsung.

## Empat jalur wajib
- [01-DESIGN](01-DESIGN/README.md)
- [02-DEVELOPMENT](02-DEVELOPMENT/README.md)
- [03-PROJECT](03-PROJECT/README.md)
- [04-CHECKLIST-AUDIT](04-CHECKLIST-AUDIT/README.md)

## Aturan pengalaman
Blog mengutamakan keterbacaan, struktur editorial, navigasi artikel, metadata, aksesibilitas, serta lifecycle draft–review–publish–update–archive. Jangan memaksakan pola kartu Feed atau perilaku Reels, Stories, maupun Live.

## Shared foundation
Gunakan logo, icon library, typography, design tokens, layout primitives, breakpoints, dan shared components dari Platform UI Foundation. Modul ini boleh memiliki komposisi dan perilaku unik, tetapi tidak boleh membuat salinan standar global.

## Integrasi
- Feed mengonsumsi konten modul melalui content reference dan render/deep-link contract yang terdokumentasi.
- Identitas akun, privacy, audience, moderation, notification, dan analytics harus menggunakan kontrak platform yang disepakati; jangan membuat sumber kebenaran akun kedua.
- Integrasi dengan modul lain tidak memberi izin untuk mengimpor CSS atau mengubah state privat modul tersebut.

## Status
Dokumen fondasi ini tidak menyatakan bahwa halaman, API, database, atau fitur produksi telah tersedia. Implementasi harus dicatat di jalur Project dan dibuktikan melalui checklist audit.


## Kemandirian modul dan kontrak interaksi
Blog adalah modul runtime mandiri di dalam domain Social Media, bukan sekadar tipe kartu atau tab Feed. Blog memiliki route/page, editor, draft, preview/review, publish/update/archive lifecycle, state, komponen, CSS, API/data contract, test, dan release gate sendiri sesuai tahap implementasi yang disetujui.

Feed/Social Home hanya boleh:
- membaca public read model artikel yang sudah lolos audience/visibility authorization;
- menampilkan preview melalui adapter/renderer contract;
- membuka deep-link menuju halaman detail Blog;
- mengirim interaksi sosial melalui API/event contract yang disetujui.

Feed dan domain luar tidak boleh mengubah draft, konten editorial, revision history, audience policy, status publikasi, atau stylesheet Blog. Blog tidak boleh mengimpor private CSS/DOM/state sibling modules. Integrasi ke Marketplace, Venue, Ticketing, GeoDirectory, atau layanan lain hanya berupa link/embed/read model/API/event contract; proses bisnis dan lifecycle tetap dimiliki domain sumber.

## Status runtime yang diaudit
Pada snapshot audit 25 November 2026 (commit `3acb3a30ec04fba846de0201046ffec0d13b231e`), belum ditemukan route/page/editor/state/API Blog runtime yang mandiri. Contoh Blog masih dirender sebagai demo presentation dari Social Home. Karena itu, status Blog runtime tetap **NOT IMPLEMENTED AS AN INDEPENDENT MODULE** sampai route, lifecycle, CSS boundary, tests, dan integrasi read model benar-benar tersedia.
