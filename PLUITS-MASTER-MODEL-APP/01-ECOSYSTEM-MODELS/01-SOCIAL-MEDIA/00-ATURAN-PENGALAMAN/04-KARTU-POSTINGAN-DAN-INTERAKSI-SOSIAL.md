# Aturan 04 — Kartu Postingan dan Interaksi Sosial

## Kontrak rujukan
Spesifikasi terperinci kartu postingan berada di `src/features/home/SOCIAL-POST-CARD-INTERACTIONS-001.md`. Dokumen ini tidak menggantikannya.

## Aturan yang harus dipertahankan
1. Kartu demo menggunakan satu media per kartu; bukan kolase atau tumpukan foto.
2. Identitas akun, username, waktu relatif, status verifikasi, dan penanda membership memiliki hierarki yang konsisten.
3. Status verifikasi dan membership adalah dua konsep terpisah.
4. Caption mendukung teks, pola @mention, dan #hashtag; tautan eksternal tidak otomatis dijadikan link pada caption prototype.
5. Interaksi demo meliputi reaction, comment/reply, gift, share, dan menu tindakan.
6. Perubahan reaction, komentar, gift, save, hide, dan report pada prototype tidak menulis ke backend.
7. Saldo demo gift bukan wallet sungguhan, transaksi, transfer, atau payout.
8. Video preview pada prototype dimulai oleh pengguna, menggunakan `preload="none"` dan `playsinline`, serta dibatasi 10 detik sesuai kontrak demo.
9. Konten contoh, nama, komentar, hitungan, dan status akun adalah fixture; jangan disajikan sebagai data pengguna nyata.
10. Reload/remount mengembalikan state interaksi demo ke kondisi awal.
11. Bila Feed API menyediakan postingan nyata, render terpisah dari fixture dan jangan menggabungkan engagement demo ke postingan nyata.
12. Perubahan terhadap komposisi kartu atau hierarki interaksi memerlukan revisi kontrak dan acceptance test, bukan perubahan diam-diam.
