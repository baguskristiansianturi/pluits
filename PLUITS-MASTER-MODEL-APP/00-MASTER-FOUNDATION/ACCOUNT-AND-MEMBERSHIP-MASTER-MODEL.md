# PLUITS Account & Membership — Master Model

Status: PROPOSED — perlu pembahasan dan persetujuan.

## Prinsip identitas
Satu identitas PLUITS dapat memiliki beberapa peran dan workspace di berbagai aplikasi. Pengguna tidak perlu membuat akun PLUITS baru untuk menjadi pelanggan, pemilik toko, pengelola restoran, penyedia layanan, atau anggota komunitas. Hak akses tetap dipisahkan berdasarkan role, workspace, dan permission.

## Membership levels
1. Regular — dapat berstatus belum terverifikasi atau terverifikasi.
2. Silver.
3. Gold.
4. Platinum.
5. PLUITS Priority.

## Pemisahan status
- Verification status menjelaskan proses verifikasi identitas/kontak/entitas.
- Membership level menjelaskan tingkat keanggotaan dan benefit.
- Keduanya adalah atribut berbeda. Verifikasi Regular tidak otomatis menaikkan membership ke Silver.
- Persyaratan naik level, biaya, masa berlaku, benefit, downgrade, dan pembatalan belum ditetapkan.

## Model otorisasi
Membership tidak boleh menjadi satu-satunya kontrol akses. Setiap aplikasi tetap memeriksa role, permission, ownership, status verifikasi yang relevan, dan kebijakan keamanan transaksi.

## Keputusan terbuka
- Kriteria dan proses upgrade/downgrade tiap level.
- Apakah level diperoleh dari aktivitas, pembayaran, undangan, atau kombinasi.
- Benefit lintas aplikasi dan batas benefit per layanan.
- Jenis verifikasi dan kapan diwajibkan.
- Mekanisme audit, expiry, fraud prevention, dan appeal.
