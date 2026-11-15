# PLUITS Inbox — Arsitektur dan Perilaku Chat

**Tanggal audit:** 15 November 2026  
**Ruang lingkup:** Direct message satu-lawan-satu, tampilan mobile-first, status pesan, voice note, penghapusan pesan, dan sinkronisasi realtime.  
**Backend:** Supabase project `ytndswhqxayqpftszwfh` — Singapore.  
**Status:** Implementasi tahap inti masuk ke `main`; build/deploy dan UAT dua akun tetap menjadi gerbang rilis.

## 1. Prinsip pengalaman pengguna

Inbox mengikuti pola interaksi aplikasi pesan modern seperti WhatsApp, dengan identitas visual PLUITS sendiri.

### Daftar percakapan
- Satu daftar percakapan yang diurutkan berdasarkan aktivitas terbaru.
- Filter Semua dan Belum dibaca; pesan yang disembunyikan atau dihapus tidak dihitung sebagai unread.
- Pencarian akun untuk memulai percakapan baru.
- Preview pesan terakhir dan penanda pesan belum dibaca.
- Tombol percakapan baru membuka pencarian.
- Desktop menggunakan dua panel: daftar percakapan dan isi chat.
- Android/mobile menggunakan tampilan penuh: daftar chat berubah menjadi layar percakapan; navigasi bawah disembunyikan saat chat terbuka.

### Layar percakapan
- Header menampilkan identitas kontak dan status online dari Presence.
- Bubble pesan masuk dan keluar dibedakan.
- Waktu pesan menggunakan jam lokal.
- Enter mengirim pesan; Shift+Enter membuat baris baru.
- Pesan dapat disalin, dihapus untuk diri sendiri, atau dihapus untuk semua jika masih dalam batas waktu.
- Perubahan pesan dan receipt disinkronkan melalui Supabase Realtime.

## 2. Status pesan dan centang

| Status | Makna PLUITS | Tampilan |
|---|---|---|
| Menunggu | Pesan masih berada di antrean lokal dan belum dikonfirmasi server | Ikon jam |
| Terkirim | Baris pesan sudah tersimpan di server | Satu centang abu-abu |
| Diterima | Perangkat penerima membuka Inbox / menerima event pesan | Dua centang abu-abu |
| Dibaca | Penerima membuka percakapan yang berisi pesan | Dua centang biru |
| Diputar | Voice note selesai diputar oleh penerima | Ikon mikrofon biru tambahan |

Receipt disimpan per penerima, bukan hanya menebak status dari timestamp percakapan. Untuk direct message, satu penerima memiliki satu receipt per pesan. Ini juga menjadi fondasi untuk mendukung percakapan grup nanti.

**Batasan saat ini:** status delivered ditandai ketika aplikasi penerima memuat Inbox atau menerima event realtime saat Inbox aktif. Belum ada background push delivery atau receipt terpisah untuk setiap perangkat tertaut. Jadi status delivered belum identik dengan jaminan push delivery seperti aplikasi native WhatsApp.

## 3. Voice note

### Alur rekam
1. Pengguna menekan tombol mikrofon dan memberikan izin mikrofon.
2. Browser merekam menggunakan MediaRecorder.
3. Pengguna dapat menjeda dan melanjutkan rekaman.
4. Pengguna dapat menyelesaikan atau membatalkan rekaman.
5. Sebelum dikirim, tersedia pratinjau untuk didengarkan.
6. Pengguna memilih kirim atau hapus rekaman.
7. Setelah upload dan insert berhasil, pesan muncul di percakapan.

### Alur pemutaran
- Audio memakai URL bertanda tangan (signed URL) dari bucket privat.
- Pemutar menyediakan kontrol browser dan pilihan kecepatan 1×, 1,5×, dan 2×.
- Ketika audio diterima selesai diputar, PLUITS mengirim receipt `played_at`.
- Ikon mikrofon biru pada pesan keluar menunjukkan penerima telah menyelesaikan pemutaran.

### Batas teknis
- Maksimum 3 menit per rekaman.
- Maksimum 10 MB per file.
- Voice note memerlukan koneksi internet; antrean offline saat ini hanya untuk teks.
- MIME yang didukung bergantung pada MediaRecorder di browser/perangkat: WebM, MP4, OGG, MPEG, WAV, atau 3GPP.
- Jika browser tidak mendukung mikrofon atau pengguna menolak izin, UI menampilkan pesan yang jelas dan chat tetap dapat dipakai untuk teks.

## 4. Penghapusan pesan

### Hapus untuk saya
- Membuat catatan tersembunyi khusus pengguna saat ini.
- Tidak menghapus pesan dari percakapan penerima.
- Tersedia tindakan Urungkan selama 5 detik.
- Setelah batas undo lewat, pesan tetap tersembunyi untuk pengguna tersebut.

### Hapus untuk semua
- Hanya pengirim yang dapat meminta penghapusan.
- Pilihan hanya muncul selama 48 jam sejak pesan dikirim.
- Server memeriksa ulang kepemilikan, status pesan, dan batas waktu; UI bukan satu-satunya pengaman.
- Pesan diganti placeholder “Pesan ini dihapus”.
- Untuk voice note, Storage policy menolak pembacaan media setelah pesan dihapus; frontend juga mencoba menghapus objek audio.

Penghapusan tidak dapat menarik kembali konten yang sudah dilihat, disalin, direkam layar, atau disimpan di luar aplikasi.

## 5. Struktur data

| Tabel | Tanggung jawab |
|---|---|
| `user_conversations` | Identitas dan urutan percakapan |
| `user_conversation_members` | Anggota dan `last_read_at` |
| `user_messages` | Isi pesan teks/voice dan metadata media |
| `user_message_receipts` | `delivered_at`, `read_at`, `played_at` per penerima |
| `user_message_hidden` | Pesan yang disembunyikan untuk satu pengguna |

### RPC inti
- `mark_conversation_delivered`
- `mark_conversation_read`
- `mark_message_played`
- `hide_message_for_me`
- `undo_hide_message_for_me`
- `delete_message_for_everyone`

Public RPC menggunakan wrapper invoker; operasi yang perlu melewati RLS berada di schema `private`, memeriksa `auth.uid()`, dan hanya memberi izin execute kepada role authenticated. RLS tetap menjadi batas akses data.

### Realtime
- Message INSERT/UPDATE memperbarui thread aktif atau preview daftar chat.
- Receipt INSERT/UPDATE memperbarui centang dan indikator voice note.
- Presence dipakai hanya untuk status online/offline, bukan untuk menyimpan riwayat pesan.
- Satu lifecycle Presence global dimiliki aplikasi; Inbox tidak membuat channel Presence duplikat.

### Media
- Bucket `pluits-message-media` bersifat privat.
- File disimpan dengan pola path conversation/user/random-file.
- Akses membaca memerlukan keanggotaan percakapan dan pesan belum dihapus.
- Browser memakai signed URL berumur pendek; tidak ada URL bucket publik.

## 6. Offline dan idempotensi

- Pesan teks dapat disimpan di antrean lokal per akun.
- Setiap pesan membawa `client_message_id` untuk mencegah duplikasi saat retry.
- Pesan antrean menampilkan status menunggu, bukan centang terkirim.
- Voice note tetap online-only karena upload audio dan penyimpanan blob offline belum menjadi bagian dari antrean.

## 7. Fitur yang belum boleh dianggap tersedia

Tahap ini belum mengimplementasikan:
- End-to-end encryption seperti WhatsApp.
- Chat grup dan receipt per anggota grup.
- Background push delivery dan sinkronisasi receipt per perangkat tertaut.
- Indikator sedang mengetik.
- Reply, forward, reaction, edit pesan, pin pesan, dan pencarian isi percakapan.
- Lampiran foto, video, dokumen, lokasi, dan kontak.
- Panggilan suara/video.
- Pengaturan privasi read receipts.
- Transkripsi voice note.

Fitur-fitur ini harus dibangun sebagai tahap terpisah; jangan menampilkan tombol yang belum mempunyai backend dan alur kerja nyata.

## 8. Gerbang pengujian dua akun

Uji dengan dua akun berbeda pada dua sesi browser/perangkat yang terpisah. Jangan login kedua akun dalam satu profil browser yang sama.

1. Akun A memulai chat dengan B.
2. A mengirim teks; B menerima tanpa refresh manual.
3. A melihat satu centang saat tersimpan.
4. B membuka Inbox; A melihat dua centang abu-abu.
5. B membuka percakapan; A melihat dua centang biru.
6. A mengirim voice note, menjeda, melanjutkan, mempratinjau, lalu mengirim.
7. B memutar voice note sampai selesai; A melihat ikon mikrofon biru.
8. A menghapus pesan untuk dirinya; B tetap melihat pesan.
9. A mencoba Urungkan dalam 5 detik; pesan kembali.
10. A menghapus pesan baru untuk semua; kedua akun melihat placeholder.
11. Uji pesan lebih dari 48 jam; opsi hapus untuk semua tidak muncul.
12. Uji pesan teks offline dan retry; hanya satu pesan tersimpan.
13. Uji Storage/RLS: akun di luar percakapan tidak dapat membaca pesan atau voice note.
14. Uji Android Chrome: keyboard, safe area, scroll chat, audio, dan tombol composer.

**Catatan rilis:** build dan deployment GitHub Pages harus sukses, tetapi itu tidak menggantikan UAT dua akun. Jangan menyebut Inbox siap launch penuh sebelum skenario di atas benar-benar lulus.
