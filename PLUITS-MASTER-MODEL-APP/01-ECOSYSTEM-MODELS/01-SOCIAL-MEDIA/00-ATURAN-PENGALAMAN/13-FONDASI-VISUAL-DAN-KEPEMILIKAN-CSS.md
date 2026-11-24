# Aturan 13 — Fondasi Visual dan Kepemilikan CSS

## Fondasi bersama
Gunakan Platform UI Foundation untuk logo, ikon, typography, warna/token, spacing, ukuran, breakpoint, layout primitives, komponen bersama, dan aturan aksesibilitas.

## Kepemilikan lokal
1. Social Media boleh memiliki komposisi visual dan pola interaksi khusus sesuai kebutuhan domainnya.
2. Jangan membuat ulang aset atau token global yang sudah tersedia.
3. CSS khusus fitur harus memiliki namespace dan batas kepemilikan yang jelas.
4. Jangan membuat satu stylesheet global yang mengendalikan semua pengalaman Blog, Reels, Stories, dan Live.
5. Jangan mengimpor stylesheet privat modul lain atau mengubah DOM/state milik modul lain.
6. Perubahan pada shared foundation harus memetakan semua consumer dan diuji regresinya.
7. Perubahan dokumentasi tidak boleh memicu perubahan CSS atau markup.
8. Jangan mengubah desain yang sedang berjalan tanpa scope UI/UX yang eksplisit.
