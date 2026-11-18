# Platform Wrapper & User Journeys

Khusus aplikasi utama PLUITS sebagai pembungkus/portal ekosistem: homepage utama, global navigation, app launcher, account/membership, notifikasi lintas aplikasi, deep links dan journey lintas aplikasi. Homepage wrapper tidak menggantikan homepage internal tiap aplikasi.

## Global Home
- Global Home adalah satu halaman Beranda utama PLUITS pada route `#/home`.
- Beranda memperkenalkan PLUITS sebagai ekosistem digital, menampilkan arah ruang-ruang ekosistem, menjelaskan satu identitas, dan memberikan jalur masuk/pendaftaran.
- Pengunjung dan pengguna yang sudah login melihat komposisi homepage yang sama. Status sesi hanya menyesuaikan kontrol akun dan CTA; tidak mengubah Beranda menjadi profil pribadi, feed, atau dashboard.
- Ecosystem cards and Android availability must reflect actual release state. Do not claim planned services are live or invent a Google Play listing.
- PLUITS logo from every page always returns to the same `#/home` Beranda.
- The signed-in account avatar/name on Global Home opens the protected User Dashboard at `#/dashboard`.
- User Dashboard is the personal starting point for account overview, activity and notifications. Main Profile, Circle, and Social Media personal space remain separate product areas.
- Internal development Workspace remains a separate protected route; it is not the user's dashboard and not the homepage.
- See [Global Home specification](./PAGE-GLOBAL-HOME-PUBLIC.md) and [authenticated session behavior](./PAGE-GLOBAL-HOME-AUTHENTICATED.md).
