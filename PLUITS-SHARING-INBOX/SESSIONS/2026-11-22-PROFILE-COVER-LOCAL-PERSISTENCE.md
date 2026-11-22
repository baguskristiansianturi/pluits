# Profile Cover — Local Persistence and Visibility Behavior

- Tanggal: 2026-11-22
- Topik: Pengaturan tampilan sampul profil dan pemulihan media setelah reload
- Model/aplikasi terkait: Social Media / Primary Profile
- Status: SORTED / ACCEPTED

## Catatan sharing
Pengaturan frontend seperti layout dan perilaku tampilan tidak seharusnya bergantung pada backend. Saklar sampul mengatur apakah area sampul ditampilkan, bukan menghapus media yang pernah dipilih. Jika pengguna mematikan sampul lalu mengaktifkannya kembali, media terakhir yang dipilih harus muncul kembali. Jika belum pernah ada media, saklar tetap dapat ON atau OFF; ON menampilkan area sampul kosong. Media hanya hilang setelah pengguna memilih tindakan hapus secara eksplisit.

## Masalah/kebutuhan yang muncul
- Status saklar sebelumnya diturunkan dari keberadaan elemen media sehingga profil tanpa gambar otomatis dianggap OFF.
- File yang diterapkan hanya memakai object URL sementara dan hilang setelah reload.
- Menonaktifkan sampul harus berbeda dari menghapus sampul.
- Pengaturan tampilan harus dapat dipulihkan pada perangkat/browser yang sama tanpa menunggu backend.

## Ide atau opsi yang dibahas
- Simpan preferensi ON/OFF di localStorage.
- Simpan file gambar/video sebagai Blob di IndexedDB, bukan sebagai base64 di localStorage.
- Gunakan backend PLUITS kelak untuk penyimpanan akun dan sinkronisasi lintas perangkat.

## Keputusan eksplisit
- Status ON/OFF adalah state tampilan yang terpisah dari pilihan media.
- Default sampul adalah ON jika belum ada preferensi tersimpan, meskipun belum ada media.
- OFF menyembunyikan area sampul dan menambahkan ruang atas 40–50 px sebelum identitas profil.
- ON menampilkan kembali area sampul; jika belum ada media, area tetap kosong.
- Toggle OFF tidak menghapus media terakhir.
- Mengganti media menyimpan pilihan baru dan menjadikannya aktif.
- Tindakan **Hapus sampul** menghapus media tersimpan secara eksplisit, tetapi tidak mengubah status ON/OFF.
- Preferensi dan media disimpan lokal di browser untuk tahap frontend; backend dibutuhkan untuk sinkronisasi akun/perangkat, bukan untuk layout.
- Desain profil, overlap avatar, ukuran slot saat aktif, menu tiga tindakan, dan komposisi yang sudah disetujui tidak boleh dirombak.

## Pertanyaan terbuka / konflik
- Integrasi akun dan sinkronisasi lintas perangkat akan ditangani oleh layanan profile-media PLUITS pada tahap backend.

## Hasil penyortiran
- Ecosystem Model: Tidak ada perubahan.
- Product Design: PLUITS-VISUAL-ASSET-LIBRARIES-001.md — perilaku saklar, slot, pemulihan media, dan penghapusan.
- Application Modularization: Tidak ada perubahan arsitektur backend pada tahap ini; penyimpanan lokal merupakan tanggung jawab frontend.
- Shared Platform Services: Tidak ada perubahan.

## Tindak lanjut
- Implementasikan IndexedDB untuk file sampul dan localStorage untuk status ON/OFF.
- Pastikan media dipulihkan setelah reload, OFF hanya menyembunyikan, dan Hapus sampul menghapus media.
- Jalankan test fitur, build, dan verifikasi deployment.

## Status akhir
ACCEPTED
