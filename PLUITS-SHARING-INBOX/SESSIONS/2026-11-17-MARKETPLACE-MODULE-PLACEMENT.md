# 2026-11-17 — Marketplace Module Placement Correction

Status: **SORTED / ACCEPTED**

## Catatan sharing

Pengguna mengoreksi hasil cleanup repository: ketika folder Marketplace dibuka, modul Store dan Restaurant & Café yang sudah pernah dibuat harus terlihat dan ditempatkan di bawah Marketplace. Folder model ekosistem lain boleh tetap kosong/dasar karena memang belum dirancang atau dibuat.

Masalah yang ditemukan: dokumen Store dan Restaurant & Café masih tertinggal di `PLUITS-SHARING-INBOX/LEGACY-TO-SORT/`, sedangkan folder kanonis Marketplace hanya memiliki README placeholder.

## Keputusan

- Marketplace menjadi induk/index untuk merchant vertical yang terhubung dengannya.
- Store dan Restaurant & Café harus terlihat langsung di bawah `01-ECOSYSTEM-MODELS/02-MARKETPLACE/01-MERCHANT-OPERATIONS/`.
- Detail product design ditempatkan di `02-PRODUCT-DESIGN/02-MARKETPLACE/01-MERCHANT-OPERATIONS/`.
- Detail technical architecture, project, testing, dan audit ditempatkan di `03-APPLICATION-MODULARIZATION/02-MARKETPLACE/01-MERCHANT-OPERATIONS/`.
- Marketplace customer-facing design dan technical blueprint tetap dipisahkan dari merchant operations.
- Store dan Restaurant & Café tidak digabung menjadi satu modul operasional.

## Status dan batas perubahan

- Store: dokumentasi desain/teknis dan catatan implementasi yang tersedia dipindahkan ke lokasi kanonis. Status fitur tetap mengikuti bukti audit/UAT.
- Restaurant & Café: baseline desain dan teknis dipindahkan; modul belum diimplementasikan.
- Model ekosistem lainnya tetap menjadi folder dasar.
- Perubahan ini hanya merapikan dokumentasi dan indeks repository. Source runtime, konfigurasi aplikasi, database/migrations, dan deployment settings tidak diubah.
