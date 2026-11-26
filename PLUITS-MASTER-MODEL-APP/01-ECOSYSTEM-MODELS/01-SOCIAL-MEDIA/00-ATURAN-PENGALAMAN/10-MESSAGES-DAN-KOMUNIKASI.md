# Aturan 10 — Messages dan Komunikasi

## Kondisi saat ini
Halaman Messages memiliki kerangka kotak masuk dan empty state. Jangan menganggap layanan percakapan, realtime, atau pengiriman pesan telah tersedia hanya karena route dan halaman tampil.

## Aturan
1. Social Media Messages adalah entry point/consumer Fluids Messaging, bukan owner dari conversation, message, delivery/read state, attachment, presence, atau messaging policy.
2. Pertahankan struktur halaman dan empty state yang ada selama tidak ada scope implementasi UI terpisah dan contract Fluids yang disetujui.
3. Jangan membuat percakapan, pesan, status dibaca, atau indikator online palsu sebagai data produksi.
4. Implementasi pesan harus menetapkan identitas peserta, izin memulai chat, block/report, privasi, retention, delivery state, dan audit keselamatan.
5. Realtime, notifikasi, attachment, read receipt, presence, dan message requests masing-masing memerlukan kontrak yang terdefinisi.
6. Social Media hanya boleh membuka Fluids melalui route/deep-link/API/event contract yang eksplisit; tidak boleh mengimpor private Fluids components, CSS, state, atau database internals.
7. Pastikan pengguna memahami perbedaan antara layanan belum aktif, inbox kosong, loading, offline, dan error.
8. Baca [Fluids Messaging model](../../07-FLUIDS-MESSAGING/README.md) beserta empat jalur Design, Development, Project, dan Checklist-Audit sebelum pekerjaan messaging dimulai.
