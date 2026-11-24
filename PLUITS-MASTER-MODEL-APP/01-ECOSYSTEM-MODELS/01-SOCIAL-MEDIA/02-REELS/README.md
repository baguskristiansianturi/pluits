# Reels — Social Media Module

Status: **FOUNDATION CREATED — FEATURE IMPLEMENTATION STATUS MUST BE VERIFIED SEPARATELY**.

Konten video pendek dengan pengalaman konsumsi vertikal, pemutaran, kontrol media, discovery, interaksi, dan aturan distribusi video.

## Batas kepemilikan
Modul Reels memiliki product requirements, user journey, page/route inventory, domain rules, state machine, komponen khusus, interaksi, stylesheet, API/event contract, test suite, dan release gate sendiri. Modul lain tidak boleh mengubah aturan internalnya secara langsung.

## Empat jalur wajib
- [01-DESIGN](01-DESIGN/README.md)
- [02-DEVELOPMENT](02-DEVELOPMENT/README.md)
- [03-PROJECT](03-PROJECT/README.md)
- [04-CHECKLIST-AUDIT](04-CHECKLIST-AUDIT/README.md)

## Aturan pengalaman
Reels memiliki lifecycle media, playback, preloading, mute/audio, caption, progress, gesture, discovery, moderation, dan performance budget sendiri. Jangan menaruh aturan playback ke CSS atau controller Blog, Stories, maupun Live.

## Shared foundation
Gunakan logo, icon library, typography, design tokens, layout primitives, breakpoints, dan shared components dari Platform UI Foundation. Modul ini boleh memiliki komposisi dan perilaku unik, tetapi tidak boleh membuat salinan standar global.

## Integrasi
- Feed mengonsumsi konten modul melalui content reference dan render/deep-link contract yang terdokumentasi.
- Identitas akun, privacy, audience, moderation, notification, dan analytics harus menggunakan kontrak platform yang disepakati; jangan membuat sumber kebenaran akun kedua.
- Integrasi dengan modul lain tidak memberi izin untuk mengimpor CSS atau mengubah state privat modul tersebut.

## Status
Dokumen fondasi ini tidak menyatakan bahwa halaman, API, database, atau fitur produksi telah tersedia. Implementasi harus dicatat di jalur Project dan dibuktikan melalui checklist audit.
