# Fluids Messaging — Model Komunikasi PLUITS

Status: **IN-DESIGN / DOCUMENTATION FOUNDATION**. Dokumen ini menetapkan arah produk dan batas modul; bukan bukti bahwa fitur chat, realtime, panggilan, atau backend telah diimplementasikan.

## Tujuan
Fluids Messaging adalah produk komunikasi PLUITS yang menyediakan pengalaman perpesanan modern dengan standar usability setara aplikasi pesan matang seperti WhatsApp, tanpa menyalin identitas visual atau mengklaim fitur yang belum tersedia.

Fluids saat ini terintegrasi sebagai layanan komunikasi lintas ekosistem PLUITS Social Media dan Marketplace. Fluids dirancang agar kelak dapat menjadi aplikasi mandiri dengan identitas, route, runtime, dan release lifecycle sendiri.

## Keputusan arsitektur awal
- Fluids Messaging adalah **modul komunikasi independen**, bukan subfolder atau private feature milik Social Media.
- Social Media, Marketplace, Store, Restaurant & Café, dan aplikasi PLUITS lain menjadi consumer melalui kontrak integrasi.
- Fluids memiliki ownership atas conversation, participant, message, delivery/read state, conversation settings, serta messaging policy.
- PLUITS Identity tetap menjadi sumber kebenaran akun dan identitas. Fluids tidak membuat akun/auth provider paralel.
- Runtime backend tetap PLUITS-owned Go API + PostgreSQL; realtime menggunakan kontrak PLUITS-owned WebSocket. Tidak menambahkan hosted-backend SDK atau vendor-bound runtime.
- UI Fluids memakai Platform UI Foundation yang disetujui, tetapi layout, state, CSS, dan feature behavior Fluids memiliki namespace serta ownership sendiri.
- Future standalone app tidak boleh membutuhkan import private code atau CSS dari Social Media/Marketplace.

## Empat jalur pengembangan wajib
1. [01-DESIGN](01-DESIGN/README.md) — product rules, conversation types, messaging flows, privacy/safety, UX.
2. [02-DEVELOPMENT](02-DEVELOPMENT/README.md) — architecture, data/API contracts, authorization, realtime, media, frontend boundaries.
3. [03-PROJECT](03-PROJECT/README.md) — scope, staged roadmap, feature register, decision log, progress/evidence.
4. [04-CHECKLIST-AUDIT](04-CHECKLIST-AUDIT/README.md) — security, privacy, functional, responsive, regression, release and UAT gates.

## Target experience (design scope, not current implementation)
- Inbox/conversation list with unread state, search, pinned/archived/muted conversations.
- Direct messages and group conversations with membership and role rules.
- Message composition, reply/quote, reactions, edit/delete policy, forwarding with attribution, and clear timestamps.
- Message delivery states with truthful distinction between queued/sent/delivered/read; never fabricate status.
- Secure media/attachments and voice messages with upload limits, scanning/processing, and private access controls.
- Block, report, message requests, privacy controls, notification preferences, and account safety.
- Realtime updates and offline/reconnect behavior with idempotent retry.
- Voice/video calls are a separately gated future capability requiring signaling, media infrastructure, abuse controls, and release evidence.

## Scope boundaries
- Social Media owns social feed, posts, follow graph, profile presentation, and entry points; it may launch a Fluids conversation via an explicit contract.
- Marketplace owns discovery and customer transactions. Merchant chat/order context may link to a conversation but does not transfer order, payment, or merchant data ownership to Fluids.
- Store and Restaurant & Café remain authoritative for merchant operations. Fluids does not become an order-management system.
- Notification service owns platform notification delivery/preferences; Fluids emits authorized events and owns messaging unread/read semantics.
- Shared UI changes require consumer audit. Fluids styles must not leak into sibling modules.

## Current status
The Social Media Messages page currently has an inbox skeleton/empty state. This document does not upgrade it to an active messaging service. Implementation begins only after design scope, backend contracts, authorization, data migration strategy, and UI Foundation preflight are accepted.
