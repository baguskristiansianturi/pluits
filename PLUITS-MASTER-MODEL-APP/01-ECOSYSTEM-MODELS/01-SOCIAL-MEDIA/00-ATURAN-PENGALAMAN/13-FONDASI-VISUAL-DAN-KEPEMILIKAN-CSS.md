# Aturan 13 — Fondasi Visual dan Kepemilikan CSS

## Fondasi bersama
Gunakan Platform UI Foundation sebagai sumber kebenaran untuk logo, ikon terdaftar, typography, token global yang disetujui, spacing scale, unit, breakpoint, accessibility primitives, dan primitive layout yang memang dinyatakan shared.

Fondasi bersama menyediakan aset dan nilai dasar; ia tidak mengambil alih komposisi halaman Social Media.

## Kepemilikan lokal
1. Social Media memiliki page composition, layout, content width, gutter lokal, rail geometry, card/media dimensions, sticky behavior, responsive composition, warna, surface treatment, animasi, state, dan interaksi khususnya sendiri.
2. Jangan membuat ulang aset atau token global yang sudah tersedia.
3. CSS khusus fitur harus memiliki namespace dan root boundary yang jelas.
4. Jangan membuat satu stylesheet yang mengendalikan semua pengalaman Blog, Reels, Stories, dan Live.
5. Jangan mengimpor stylesheet privat modul lain atau mengubah DOM/state milik modul lain.
6. Perubahan pada shared foundation harus memetakan semua consumer dan diuji regresinya.
7. Perubahan dokumentasi tidak boleh memicu perubahan CSS atau markup.
8. Jangan mengubah desain yang sedang berjalan tanpa scope UI/UX yang eksplisit.
9. CSS import dari JavaScript bukan CSS isolation; file CSS tetap berpartisipasi dalam cascade dokumen.
10. Selector privat Social Media harus berada di bawah root/module namespace yang ditetapkan. Hindari selector generik, selector host, dan selector sibling di stylesheet privat.
11. Parent host tidak boleh menimpa detail layout internal Social Media; CSS Social Media tidak boleh menata parent atau modul di luar boundary.
12. Shared header/footer/navigation hanya boleh dipakai melalui kontrak komponen/slot yang eksplisit.
13. Jika style dibutuhkan lintas modul, audit seluruh consumer dan pindahkan ke Platform UI Foundation melalui perubahan shared yang terpisah.
14. Siapkan dan uji consumer luar sebelum mempersempit/memindahkan selector shared yang saat ini mereka gunakan.
15. Isolasi dilakukan per surface, bukan satu refactor besar. Pertahankan baseline visual dan siapkan rollback untuk setiap tahap.

Detail wajib: [Aturan 16 — Isolasi CSS dan Alur Dependensi](16-ISOLASI-CSS-DAN-ALUR-DEPENDENSI.md) dan [Aturan 17 — Peta Runtime dan Tahap Migrasi Isolasi](17-PETA-RUNTIME-DAN-TAHAP-MIGRASI-ISOLASI.md).
