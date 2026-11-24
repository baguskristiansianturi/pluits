# Aturan 15 — Perubahan, Pengujian, dan Bukti

## Sebelum perubahan
1. Audit aturan ekosistem, Product Design, Application Modularization, Platform UI Foundation, kode, aset, dan test yang relevan.
2. Pastikan permintaan secara eksplisit mengizinkan perubahan dokumentasi, UI, runtime, atau backend.
3. Tetapkan file dan modul yang boleh berubah; jangan menyentuh area di luar scope.
4. Catat kondisi awal agar perubahan yang tidak diminta dapat dicegah.

## Saat perubahan
1. Perubahan aturan/dokumen harus berada di folder dokumentasi yang tepat.
2. Perubahan kode harus memiliki scope implementasi tersendiri dan tidak boleh diselipkan ke PR dokumentasi.
3. Pertahankan keputusan produk yang sudah disetujui dan catat konflik sebelum mengubahnya.
4. Jangan menyamakan file/directory yang dibuat dengan fitur yang telah selesai.

## Sesudah perubahan
1. Periksa daftar file berubah dan pastikan hanya file yang diizinkan yang berubah.
2. Untuk dokumentasi saja, validasi link relatif, struktur folder, konsistensi istilah, dan tidak ada klaim implementasi palsu.
3. Untuk kode, jalankan test/build yang relevan dan catat hasil sebenarnya.
4. Verifikasi merge commit, status workflow, dan deployment secara terpisah.
5. Catat PR, commit, hasil test, status deploy, dan keterbatasan yang belum diuji.
6. Jangan menyatakan website berubah atau ter-deploy ketika hanya dokumentasi yang diperbarui.
