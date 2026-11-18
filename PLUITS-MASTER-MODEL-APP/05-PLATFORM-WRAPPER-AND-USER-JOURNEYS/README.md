# Platform Wrapper & User Journeys

Khusus aplikasi utama PLUITS sebagai pembungkus/portal ekosistem: Global Home, authenticated Dashboard, global navigation, app launcher, account/membership, notifikasi lintas aplikasi, deep links dan journey lintas aplikasi. Homepage wrapper tidak menggantikan homepage internal tiap aplikasi.

## Global Home
- Global Home adalah satu halaman Beranda utama PLUITS pada route \`#/home\`.
- Beranda memperkenalkan PLUITS sebagai ekosistem digital, menampilkan arah ruang-ruang ekosistem, menjelaskan satu identitas, dan memberikan jalur masuk/pendaftaran.
- Pengunjung dan pengguna yang sudah login melihat komposisi homepage yang sama. Status sesi hanya menyesuaikan kontrol akun dan CTA.
- PLUITS logo from every page always returns to the same \`#/home\` Beranda.
- The signed-in account avatar/name on Global Home opens the protected User Dashboard at \`#/dashboard\`.

## User Dashboard
- Successful login membawa pengguna langsung ke Dashboard; Dashboard adalah satu-satunya pusat kendali setelah login.
- Dashboard memakai layout desktop tiga area: navigasi modul di kiri, halaman/pekerjaan aktif di tengah, dan panel Social PLUITS di kanan.
- Panel kiri dan kanan dapat diubah lebarnya dengan drag serta disembunyikan/dimunculkan secara independen. Tab halaman di bagian atas mempertahankan halaman yang sedang terbuka.
- Panel sosial menyediakan pintu masuk Feed, Story, dan Inbox. Notifikasi terpusat dari header Dashboard.
- Mobile memprioritaskan navigasi dan pengelolaan modul; panel sosial desktop tidak ditampilkan.
- Dashboard mengelola identitas personal/social profile, pengaturan akun, Business Account, dan transaksi.
- Satu PLUITS Auth identity dipakai lintas aktivitas personal dan bisnis. Business Account adalah identitas terpisah yang terhubung ke akun personal; tiap akun bisnis hanya satu jenis, Store atau Service. Jumlah akun bisnis per akun personal masih menjadi keputusan produk terbuka.
- Social Media menyediakan format Feed, Story, Reels, Live, dan Personal Blog. Personal Blog memakai template yang sudah ditetapkan pada keputusan produk.
- Transaksi memiliki sudut pandang Purchase dan Sales. Status pembayaran, pemrosesan, pengiriman, penyelesaian, dan pembatalan harus bersumber dari transaksi nyata.
- Istilah Workspace hanya dipakai untuk pembahasan teknis internal; tidak menjadi halaman, route, atau label navigasi pengguna.

## Data and release truthfulness
- Ecosystem cards and Android availability must reflect actual release state.
- Dashboard modules without implemented routes, data services, and permission checks must be marked unavailable; do not claim that planned management functions are live.
- The current flexible Dashboard is a presentation prototype. Profile editing, business creation, transactions, social panel data, Inbox, and notification integrations are not activated by this increment.
- Do not fabricate activity, notifications, counts, posts, Story, conversations, products, orders, shipment states, or transactions.

See [Global Home specification](./PAGE-GLOBAL-HOME-PUBLIC.md), [authenticated session behavior](./PAGE-GLOBAL-HOME-AUTHENTICATED.md), and [User Dashboard specification](./PAGE-USER-DASHBOARD.md).
