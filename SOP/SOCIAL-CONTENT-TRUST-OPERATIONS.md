# SOP — SOCIAL CONTENT & TRUST OPERATIONS
**Status:** SOP internal; mengikuti D-006 dan Business Model Master Bagian 33.

## 1. Klasifikasi kasus
Klasifikasikan sebagai video AI sintetis, kekerasan/ancaman, bullying/pelecehan/ujaran kebencian/doxxing, copyright/duplicate content, impersonation, spam/inbox abuse, music licensing, atau privasi media. Catat sumber sinyal: deteksi otomatis, laporan pengguna, klaim pemegang hak, bukti sumber, atau pemeriksaan manusia.

## 2. Video AI sintetis
Video manusia/kejadian sintetis AI termasuk kategori dilarang. Foto AI-assisted editing/avatar tidak otomatis dilarang. Gunakan beberapa sinyal visual, temporal, audio, dan provenance. Satu prediksi model bukan bukti final; kasus meragukan masuk review. Jangan menyatakan deteksi aktif sebelum sistem dan proses banding diuji.

## 3. Kekerasan dan konteks
Bedakan kekerasan nyata dari komedi, akting, olahraga, edukasi, berita, dan dokumentasi. Tinjau rangkaian adegan, audio, caption, konteks, dan tujuan publikasi. Lindungi korban dan hindari doxxing/persekusi. Kritik, berita, dan kepentingan publik tidak otomatis dilarang.

## 4. Bullying dan diskriminasi
Tindak ancaman, intimidasi, pelecehan berulang, penghinaan terarah, hasutan, dan diskriminasi terhadap orang. Jangan menindak diskusi atau kritik sah hanya karena membahas agama, identitas, atau isu sosial. Terapkan aturan pada posting, caption, komentar, balasan, dan pesan sesuai dasar pemeriksaan yang sah.

## 5. Duplicate video dan copyright
Fingerprint visual/audio/temporal adalah sinyal, bukan bukti tunggal. Periksa kemungkinan rekaman independen atas kejadian yang sama. Klaim pemilik harus menyertakan bukti kepemilikan/kewenangan, tautan sumber, dan konten yang disengketakan. Orang yang tampil tidak otomatis pemilik hak cipta. Takedown yang terbukti disertai notifikasi dan jalur keberatan. Review, kritik, berita, dan kepentingan publik perlu pemeriksaan konteks.

## 6. Musik dan hak wilayah
Simpan bukti lisensi, pemilik hak, wilayah, jenis penggunaan, masa berlaku, atribusi, dan pencabutan. Jika lisensi tidak berlaku, batasi musik pada wilayah terkait. Pisahkan/bisukan track musik tanpa merusak video jika memungkinkan; jika tidak aman, bisukan audio sepenuhnya pada wilayah terdampak.

## 7. Impersonation
Akun tanpa badge tidak otomatis palsu. Prioritaskan laporan dari orang yang identitas/fotonya disalahgunakan, tetapi badge bukan satu-satunya bukti. Jika bukti kuat, nonaktifkan konten yang melanggar terlebih dahulu; periksa pola akun. Pelanggaran berulang dapat berujung suspensi/penghapusan akun.

## 8. Moderation, notifikasi, dan banding
Status yang disarankan: pending_review, published, distribution_limited, removed, appeal_pending, restored, rejected_report. Jika perlu, hentikan distribusi rekomendasi sementara sambil memberi tahu pemilik. Notifikasi memuat kategori, alasan, dampak, dan jalur banding. Kasus berisiko tinggi/ambigu memerlukan human review. Simpan actor, timestamp, evidence reference, policy version, reason, dan appeal outcome.

## 9. Inbox dan online presence
Friend-first messaging harus ditegakkan server-side berdasarkan definisi hubungan yang disetujui. Blokir berlaku lintas inbox, profil, feed, komentar, dan discovery. Status online mengikuti preferensi pengguna; online bukan bukti read receipt. Laporan spam/pelecehan perlu rate limit dan kontrol bukti.

## 10. Help Center dan legal
Artikel bantuan membedakan AVAILABLE, IN DEVELOPMENT, PLANNED, dan DRAFT. Jangan menyebut fitur tersedia sebelum diuji. Privacy Policy mengikuti data inventory dan praktik aktual; Terms/Guidelines harus sesuai aturan yang dapat ditegakkan. Draft diberi label DRAFT / LEGAL REVIEW REQUIRED.

## 11. Belum diputuskan
Penghapusan akun otomatis setelah 12 bulan tidak aktif masih usulan dan tidak boleh dijalankan. Screenshot blocking lintas browser/perangkat tidak dapat dijamin. Definisi final friend, SLA takedown/banding, retensi bukti, dan vendor deteksi masih perlu spesifikasi.


## 12. Current runtime boundary — 15 November 2026
- New user posts currently default to `published` immediately. The implemented moderation queue is report/review based; pre-publication review is NOT IMPLEMENTED. This differs from the longer-term model in which new content enters `pending_review`. Founder must decide whether that difference blocks Social First Release.
- A database trigger now prevents post owners from changing `moderation_status` after creation. Moderator/admin and service-role actions remain allowed. Normal content edits remain available.
- Reports against posts, comments and directory entities can be actioned by a moderator. User-account reports can be submitted and reviewed/dismissed, but cannot be marked actioned because account suspension/enforcement and appeal workflow are not implemented. The UI must state this limitation.
- Do not describe the system as AI-moderated or fully pre-moderated. Human coverage, response SLA, escalation, appeal and retention processes still need operational sign-off.
