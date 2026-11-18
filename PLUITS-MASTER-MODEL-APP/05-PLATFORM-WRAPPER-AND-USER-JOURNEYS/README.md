# Platform Wrapper & User Journeys

Khusus aplikasi utama PLUITS sebagai pembungkus/portal ekosistem: Global Home, authenticated Dashboard, global navigation, app launcher, account/membership, notifikasi lintas aplikasi, deep links dan journey lintas aplikasi. Homepage wrapper tidak menggantikan homepage internal tiap aplikasi.

## Global Home
- Global Home adalah satu halaman Beranda utama PLUITS pada route `#/home`.
- Beranda memperkenalkan PLUITS sebagai ekosistem digital, menampilkan arah ruang-ruang ekosistem, menjelaskan satu identitas, dan memberikan jalur masuk/pendaftaran.
- Pengunjung dan pengguna yang sudah login melihat komposisi homepage yang sama. Status sesi hanya menyesuaikan kontrol akun dan CTA.
- PLUITS logo from every page always returns to the same `#/home` Beranda.
- The signed-in account avatar/name on Global Home opens the protected User Dashboard at `#/dashboard`.

## User Dashboard
- Successful login membawa pengguna langsung ke Dashboard.
- Dashboard adalah satu-satunya halaman awal setelah login dan pusat akses/pengelolaan pekerjaan lintas aplikasi PLUITS.
- Dashboard menyatukan akses Social Media, Marketplace (Store serta Restaurant & Café), Tickets & Accommodation, Geo Directory, Logistics & Transportation, dan Digital Wallet.
- Dashboard juga menjadi ringkasan pekerjaan, aktivitas terbaru, dan pemberitahuan dari aplikasi yang telah terhubung.
- Main Profile tetap menjadi area terpisah untuk identitas dan pengaturan akun.
- Istilah Workspace hanya dipakai untuk pembahasan teknis internal; tidak menjadi halaman, route, atau label navigasi pengguna.

## Data and release truthfulness
- Ecosystem cards and Android availability must reflect actual release state.
- Dashboard modules without implemented routes and data services must be marked unavailable; do not claim that planned management functions are live.
- Do not fabricate activity, notifications, counts, posts, products, orders, or transactions.

See [Global Home specification](./PAGE-GLOBAL-HOME-PUBLIC.md), [authenticated session behavior](./PAGE-GLOBAL-HOME-AUTHENTICATED.md), and [User Dashboard specification](./PAGE-USER-DASHBOARD.md).
