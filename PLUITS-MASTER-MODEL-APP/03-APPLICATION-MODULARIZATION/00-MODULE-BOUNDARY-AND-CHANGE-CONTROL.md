# Module Boundary & Change Control

Status: APPROVED WORKING RULE

Dokumen ini mengatur cara perubahan source code PLUITS agar satu pekerjaan tidak merusak aplikasi atau modul lain. Ini adalah aturan kerja untuk repository saat ini; bukan klaim bahwa seluruh source code sudah sepenuhnya terpisah.

## 1. Tetapkan pemilik sebelum mengubah kode
Untuk setiap permintaan, identifikasi:
- Aplikasi/model bisnis yang diminta.
- Route dan page controller yang memiliki pengalaman tersebut.
- Feature module yang memiliki perilaku domain.
- Komponen dan stylesheet yang dipakai.
- Service/API/RPC dan tabel database yang terlibat.
- Tes yang melindungi perilaku tersebut.

Buat daftar file yang memang perlu disentuh sebelum melakukan perubahan.

## 2. Batas perubahan
- Ubah hanya file yang dimiliki modul target.
- Jangan mengubah halaman, navigasi, komponen, atau CSS modul saudara sebagai efek samping.
- Jangan memindahkan file atau mengganti pola arsitektur di luar scope hanya untuk merapikan kode.
- Jangan membuat ulang komponen jika komponen bersama yang sesuai sudah tersedia.
- Perubahan shared component, global CSS, router, authentication, shared service, atau database contract wajib disertai audit semua consumer dan alasan perubahan.
- Jika batas kepemilikan belum jelas, lakukan audit dan dokumentasikan sebelum refactor.

## 3. Prinsip pemisahan source code saat ini
Ikuti pemilik dan kontrak yang sudah ada di repository:
- `src/pages/`: komposisi halaman dan pemilik route.
- `src/features/`: perilaku dan UI domain/fitur.
- `src/components/`: komponen yang benar-benar dipakai bersama.
- `src/services/`: integrasi backend dan repository data.
- `src/styles/` dan `styles/`: aturan gaya bersama; jangan menambah selector global untuk kebutuhan satu fitur.
- `supabase/migrations/`: perubahan database yang harus aman, berurutan, dan tidak menghapus migrasi yang sudah diterapkan.
- `tests/` dan `scripts/`: pengujian serta pemeriksaan batas modul.

Folder target atau README placeholder tidak membuktikan bahwa sebuah modul sudah aktif. Verifikasi route, import, runtime, database, dan test.

## 4. Kontrak integrasi antar aplikasi
- Marketplace memiliki discovery, katalog publik, cart, checkout, dan koordinasi transaksi pelanggan.
- Store memiliki data dan proses operasional toko.
- Restaurant & Café memiliki data dan proses operasional restoran/kafe.
- Aplikasi lain memiliki domain masing-masing.
- Integrasi dilakukan melalui kontrak API/event/service yang jelas; satu aplikasi tidak boleh mengakses atau mengambil alih tabel internal aplikasi lain tanpa kontrak dan izin yang disetujui.

## 5. Prosedur setiap perubahan
1. Catat requirement yang sudah disetujui; jangan mengimplementasikan catatan mentah dari Sharing Inbox.
2. Audit owner, dependency, route, import, style, API, database, dan consumer.
3. Tentukan file dalam scope dan file yang tidak boleh disentuh.
4. Implementasikan perubahan terkecil yang menyelesaikan kebutuhan.
5. Tambahkan atau perbarui unit, contract, integration, dan regression tests yang relevan.
6. Jalankan `npm test` dan `npm run build`.
7. Periksa diff untuk memastikan tidak ada perubahan di luar scope.
8. Deploy melalui workflow resmi dan verifikasi hasilnya.
9. Laporkan commit, test/build, workflow/deploy, dan status UAT secara terpisah.

## 6. Larangan keselamatan
- Jangan menghapus data pengguna, tabel produksi, atau migration yang sudah diterapkan.
- Jangan mengubah permission/RLS/Auth/payment tanpa scope eksplisit dan rencana rollback.
- Jangan memasukkan data demo, transaksi palsu, saldo palsu, review palsu, atau verifikasi palsu.
- Jangan menyatakan selesai hanya karena build atau deployment berhasil; bedakan IMPLEMENTED, DEPLOYED, TESTED, dan ACCEPTED.
