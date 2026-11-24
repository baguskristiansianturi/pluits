# Aturan 14 — Aksesibilitas, Responsivitas, dan Performa

## Aturan lintas pengalaman
1. Pertahankan perilaku responsive yang sudah ada; mobile dan safe-area merupakan bagian dari pengalaman, bukan tambahan belakangan.
2. Gunakan elemen semantik, label yang jelas, status ARIA yang tepat, dan fokus keyboard yang terlihat.
3. Kontrol interaktif harus dapat digunakan tanpa pointer bila relevan.
4. Hormati `prefers-reduced-motion`; animasi tidak boleh menjadi satu-satunya cara menyampaikan status.
5. Pertimbangkan koneksi dan perangkat dengan memori terbatas ketika memuat media.
6. Video preview tidak autoplay dan mengikuti batas preload/playback yang ditentukan kontrak fitur.
7. Horizontal rail harus mempertahankan scroll yang dapat digunakan dengan sentuhan dan tidak mengunci scroll vertikal.
8. Loading, empty, error, permission, offline, dan unavailable state harus dibedakan.
9. Jangan menambahkan dependensi berat atau library ikon eksternal jika fondasi yang ada sudah menyediakan kapabilitasnya.
10. Perubahan performa harus diuji pada viewport mobile dan tidak boleh mengorbankan aksesibilitas.
