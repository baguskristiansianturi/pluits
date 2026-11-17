# Restaurant & Café — Development

Ruang arsitektur frontend/backend, domain model, API, state machine, database, keamanan, dan integrasi Restaurant & Café.

## Prinsip teknis
- Modular monolith dengan batas domain eksplisit.
- Isolasi tenant dan branch pada semua operasi.
- Visit, Order, Bill, Payment, dan Settlement memiliki lifecycle berbeda.
- Panggilan LIVE-only divalidasi oleh backend.
- Kitchen delivery, staff assignment, dan financial transitions harus idempotent serta dapat diaudit.
- Integrasi Marketplace menggunakan kontrak discovery/katalog/transaksi, bukan akses bebas ke operasi internal restoran.

## Dokumen kanonis
- [Restaurant & Café Application Modularization](../../../../03-APPLICATION-MODULARIZATION/02-MARKETPLACE/01-MERCHANT-OPERATIONS/02-RESTAURANT-CAFE/README.md)
- [Domain Model](../../../../03-APPLICATION-MODULARIZATION/02-MARKETPLACE/01-MERCHANT-OPERATIONS/02-RESTAURANT-CAFE/DOMAIN-MODEL.md)
