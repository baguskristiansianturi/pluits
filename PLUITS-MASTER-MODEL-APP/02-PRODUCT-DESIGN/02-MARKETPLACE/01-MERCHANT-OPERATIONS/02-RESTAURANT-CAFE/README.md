# Restaurant & Café — Product Design

Status: **DESIGN BASELINE — NOT IMPLEMENTED / NOT APPROVED FOR PRODUCTION**.

Folder ini memuat baseline desain produk Restaurant & Café yang sebelumnya tertahan di legacy inbox. Rancangan memisahkan lima permukaan aplikasi: customer, management, staff/service, kitchen/barista, dan cashier/POS.

## Dokumen desain

- [Design decision log](DECISION-LOG.md)

## Prinsip penting

- Restaurant & Café adalah modul operasional merchant, sedangkan Marketplace menangani discovery dan transaksi pelanggan lintas merchant.
- Visit berbeda dari Order dan Payment; satu Visit dapat memiliki beberapa Order.
- Panggilan Bantuan dan Call Manager hanya dapat dibuat selama Visit berstatus LIVE, dengan validasi backend.
- Rancangan belum merupakan implementasi. Setiap halaman dan form masih memerlukan acceptance criteria dan spesifikasi rinci.

Lihat juga [Application Modularization Restaurant & Café](../../../../03-APPLICATION-MODULARIZATION/02-MARKETPLACE/01-MERCHANT-OPERATIONS/02-RESTAURANT-CAFE/README.md).
