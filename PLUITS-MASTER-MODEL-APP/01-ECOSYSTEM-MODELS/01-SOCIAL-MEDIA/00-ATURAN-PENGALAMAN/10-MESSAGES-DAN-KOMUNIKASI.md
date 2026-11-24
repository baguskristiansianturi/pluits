# Aturan 10 — Messages dan Komunikasi

## Kondisi saat ini
Halaman Messages memiliki kerangka kotak masuk dan empty state. Jangan menganggap layanan percakapan, realtime, atau pengiriman pesan telah tersedia hanya karena route dan halaman tampil.

## Aturan
1. Pertahankan struktur halaman dan empty state yang ada selama tidak ada permintaan UI terpisah.
2. Jangan membuat percakapan, pesan, status dibaca, atau indikator online palsu sebagai data produksi.
3. Implementasi pesan kelak harus menetapkan identitas peserta, izin memulai chat, blokir, report, privasi, retention, delivery state, dan audit keselamatan.
4. Realtime, notifikasi, attachment, read receipt, dan presence masing-masing memerlukan kontrak yang terdefinisi.
5. Pastikan pengguna memahami perbedaan antara layanan belum aktif, inbox kosong, loading, dan error.
