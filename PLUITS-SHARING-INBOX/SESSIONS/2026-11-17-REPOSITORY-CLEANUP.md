# 2026-11-17 — Repository Cleanup & Modular Work Method

Status: ACCEPTED

## Catatan sharing
Pengguna ingin merapikan repository PLUITS. Pertahankan aplikasi yang sudah berjalan dan ter-deploy melalui GitHub Pages. Pertahankan hanya pusat dokumentasi Master Model App, satu folder Sharing Inbox untuk hasil sesi diskusi, dan seluruh source code/runtime yang sedang digunakan.

Hasil setiap sesi diskusi harus ditampung terlebih dahulu sebagai catatan yang dapat berubah. Catatan tersebut perlu ditinjau, diperbarui, dan disortir sebelum dipindahkan ke dokumentasi model bisnis, Product Design, atau Application Modularization.

Modularisasi juga wajib diterapkan pada coding. Perubahan satu modul tidak boleh mengacak atau merusak modul lain. Perubahan shared components, global styles, services, navigation, atau database harus melewati audit dampak dan dependensi.

## Keputusan yang disepakati
- Source code dan konfigurasi aplikasi live dipertahankan.
- PLUITS Master Model App menjadi pusat dokumentasi rancangan.
- PLUITS Sharing Inbox menjadi satu-satunya tempat penampungan hasil sharing.
- Materi lama yang belum disortir dipindahkan ke LEGACY-TO-SORT agar tidak bercampur dengan rancangan aktif.
- Materi sharing bukan requirement sampai ditinjau dan disetujui.
- Setiap perubahan coding dibatasi pada modul pemiliknya, kecuali dependensi bersama yang memang harus diubah dan telah diaudit.

## Pertanyaan terbuka
- Isi legacy yang masih relevan akan disortir satu per satu ke folder model/design/modularization yang tepat.
- Peta modularisasi source code aktual perlu direkonsiliasi bertahap dengan enam model ekosistem.
