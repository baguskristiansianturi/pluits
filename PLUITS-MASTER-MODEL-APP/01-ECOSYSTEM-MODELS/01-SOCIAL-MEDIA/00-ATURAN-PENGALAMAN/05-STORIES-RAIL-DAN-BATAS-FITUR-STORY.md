# Aturan 05 — Stories Rail dan Batas Fitur Story

## Kondisi saat ini
Home memiliki rail Stories dengan item Cerita Anda dan beberapa akun contoh. Rail yang terlihat merupakan preview/fixture UI; keberadaannya tidak membuktikan upload, viewer, reply, atau expiry Story telah aktif.

## Aturan
1. Pertahankan posisi dan komposisi rail yang sedang berjalan; dokumentasi ini bukan instruksi redesign.
2. Akun contoh dan avatar contoh tidak boleh dianggap sebagai Story aktif dari pengguna sungguhan.
3. Jangan mengklaim tombol tambah Story atau viewer sudah berfungsi jika belum ada alur dan backend yang terverifikasi.
4. Modul Stories memiliki aturan frame, urutan, durasi, progress, audience, privacy, reply/reaction, viewer state, dan expiry sendiri.
5. Expiry dan audience harus ditegakkan backend; CSS atau jam perangkat bukan otoritas keamanan.
6. Feed hanya mengonsumsi referensi dan preview Story melalui kontrak integrasi yang disepakati.
7. Status kosong, loading, error, dan izin media/lokasi harus ditangani sesuai kebutuhan fitur saat benar-benar diimplementasikan.
