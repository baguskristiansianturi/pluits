# Merchant Operations — Application Modularization

Indeks blueprint teknis untuk modul operasional merchant yang terhubung ke Marketplace.

- [Store](01-STORE/README.md)
- [Restaurant & Café](02-RESTAURANT-CAFE/README.md)

Setiap modul mempertahankan ownership frontend, backend, database, authorization, media, state machine, testing, dan deployment boundary. Integrasi ke Marketplace dilakukan melalui kontrak yang eksplisit, bukan akses bebas ke tabel internal merchant.
