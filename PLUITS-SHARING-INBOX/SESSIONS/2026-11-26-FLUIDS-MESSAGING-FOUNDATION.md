# PLUITS Sharing Session — Fluids Messaging Foundation

- Tanggal: 2026-11-26
- Topik: Fluids Messaging sebagai layanan perpesanan lintas ekosistem PLUITS
- Model/aplikasi terkait: Fluids Messaging, Social Media, Marketplace, Shared Platform Services
- Status: UNDER-REVIEW

## Catatan sharing
Pemilik produk ingin fokus pada perpesanan Fluids di repository PLUITS. Fluids Messaging harus memiliki kemampuan perpesanan yang kuat dengan standar pengalaman aplikasi pesan modern seperti WhatsApp. Pada tahap awal, perpesanan terintegrasi di dalam ekosistem PLUITS Social Media dan Marketplace, tetapi ke depan direncanakan memiliki aplikasi mandiri.

Pemilik meminta aturan pengembangan baru dengan empat jalur dokumentasi seperti yang digunakan Marketplace dan Restaurant & Café: Design, Development, Project, dan Checklist-Audit. Pemilik juga meminta penentuan apakah perpesanan ditempatkan di dalam Social Media atau dibuat terpisah.

## Masalah/kebutuhan yang muncul
- Messages saat ini tidak boleh dianggap sebagai layanan chat penuh hanya karena inbox/route tersedia.
- Domain percakapan harus dapat dipakai lintas aplikasi tanpa menjadi milik private Social Media atau Marketplace.
- Perlu mempertahankan rujukan arsitektur Inbox/WhatsApp-style yang sudah tersimpan, tetapi menyelaraskannya dengan arahan backend PLUITS terkini.

## Ide atau opsi yang dibahas
- Fluids Messaging sebagai modul komunikasi independen dan shared service/product.
- Social Media dan Marketplace menjadi consumer melalui route/deep-link/API/event contract.
- Aplikasi mandiri di masa depan menggunakan identity dan messaging API yang sama, bukan fork.

## Keputusan eksplisit
- Pemilik meminta dibuatkan fondasi dokumentasi Fluids Messaging dan empat jalur pengembangan.
- Rekomendasi penempatan: modul Fluids Messaging berdiri sendiri di bawah Ecosystem Models, serta tercatat sebagai shared communication service. Ini merupakan rekomendasi arsitektur awal dan menunggu review pemilik produk.
- Empat jalur dibuat: 01-DESIGN, 02-DEVELOPMENT, 03-PROJECT, 04-CHECKLIST-AUDIT.
- Tidak ada perubahan source runtime, database, atau deployment pada sesi ini.

## Pertanyaan terbuka / konflik
- Apakah fitur inti pertama adalah direct messaging saja atau direct + group sejak awal.
- Scope prioritas untuk reply, reaction, forward, edit/delete, attachments, voice note, message search, presence, typing, dan push notifications.
- Definisi receipt per penerima/perangkat dan ekspektasi offline delivery.
- Bagaimana memigrasikan/menyelaraskan catatan Inbox historis yang memakai Supabase dengan arahan PLUITS Go API + PostgreSQL terkini.
- Status UAT dua akun historis perlu diverifikasi ulang; jangan menganggap checklist lama telah lulus.

## Hasil penyortiran
- Ecosystem Model: PLUITS-MASTER-MODEL-APP/01-ECOSYSTEM-MODELS/07-FLUIDS-MESSAGING/
- Product Design: PLUITS-MASTER-MODEL-APP/02-PRODUCT-DESIGN/07-FLUIDS-MESSAGING/README.md
- Application Modularization: PLUITS-MASTER-MODEL-APP/03-APPLICATION-MODULARIZATION/07-FLUIDS-MESSAGING/README.md
- Shared Platform Services: PLUITS-MASTER-MODEL-APP/04-SHARED-PLATFORM-SERVICES/README.md
- Social Media consumer boundary: PLUITS-MASTER-MODEL-APP/01-ECOSYSTEM-MODELS/01-SOCIAL-MEDIA/00-ATURAN-PENGALAMAN/10-MESSAGES-DAN-KOMUNIKASI.md

## Tindak lanjut
- Audit actual runtime, backend endpoints/schema/migrations, legacy Inbox architecture, current tests and UAT evidence.
- Resolve open product decisions and approve detailed design.
- UI implementation must complete Platform UI Foundation preflight.
- Keep all runtime/data changes out of scope until approved.

## Status akhir
UNDER-REVIEW
