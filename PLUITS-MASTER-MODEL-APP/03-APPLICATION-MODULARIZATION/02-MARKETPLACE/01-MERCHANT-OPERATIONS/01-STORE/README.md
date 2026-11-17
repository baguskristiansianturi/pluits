# Store — Application Modularization

Status: **EXISTING IMPLEMENTATION FOOTPRINT — AUDIT AND UAT REQUIRED**.

Store adalah sistem operasional merchant toko. Marketplace boleh membaca kontrak katalog publik, ketersediaan, dan status yang memang diekspos; operasi internal Store tetap dimiliki modul ini.

## Technical documents

- [Original Store development baseline](STORE-DEVELOPMENT-BASELINE.md)
- [Architecture baseline](ARCHITECTURE-BASELINE.md)
- [Testing and UAT baseline](TESTING-AND-UAT-BASELINE.md)
- [Project register](03-PROJECT/README.md)
- [Audit findings](04-CHECKLIST-AUDIT/AUDIT-FINDINGS.md)

## Boundary

Frontend feature paths, seller workspace, repository contracts, database migrations, RLS, media, catalog, inventory, and order operations must be reviewed as one Store boundary. Changes to shared auth, global navigation, shared services, or Marketplace customer experience require a separate impact audit.

Lihat [Store Product Design](../../../../02-PRODUCT-DESIGN/02-MARKETPLACE/01-MERCHANT-OPERATIONS/01-STORE/README.md).
