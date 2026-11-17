# Store — Development

Ruang arsitektur teknis, database, API, permission, integrasi, pengujian, dan batas implementasi Store.

## Prinsip teknis
- Store menjadi sumber kebenaran operasional merchant toko.
- Marketplace membaca kontrak katalog publik, ketersediaan, dan status yang diekspos.
- Inventory harus konsisten antara Marketplace dan POS.
- Tenant isolation dan backend authorization wajib.
- Perubahan Store tidak boleh merusak modul PLUITS lain.

## Dokumen kanonis
- [Store Application Modularization](../../../../03-APPLICATION-MODULARIZATION/02-MARKETPLACE/01-MERCHANT-OPERATIONS/01-STORE/README.md)
- [Store Architecture Baseline](../../../../03-APPLICATION-MODULARIZATION/02-MARKETPLACE/01-MERCHANT-OPERATIONS/01-STORE/ARCHITECTURE-BASELINE.md)
