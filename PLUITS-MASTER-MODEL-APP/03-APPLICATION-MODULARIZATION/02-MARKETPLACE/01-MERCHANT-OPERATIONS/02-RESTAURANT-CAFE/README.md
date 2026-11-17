# Restaurant & Café — Application Modularization

Status: **TECHNICAL BASELINE — NOT IMPLEMENTED**.

Blueprint teknis untuk modul operasional restoran/kafe. Implementasi harus dimulai secara terisolasi dan tidak boleh mengubah homepage PLUITS, Inbox, Profile, Community, navigasi global, CSS global, atau modul lain.

## Technical documents

- [Domain model and state rules](DOMAIN-MODEL.md)
- [Project feature register](03-PROJECT/FEATURE-REGISTER.csv)
- [Risk register](04-CHECKLIST-AUDIT/RISK-REGISTER.md)

## Required boundaries

- Modular monolith first; explicit domain boundaries.
- Tenant and branch scoped authorization for every read/write.
- Visit, Order, Bill, Payment, and Settlement have separate lifecycles.
- LIVE-only customer calls are validated on the backend.
- Kitchen delivery, staff assignment, and financial transitions require idempotency and auditable state changes.
- Integration to Marketplace uses public discovery/catalog and transaction contracts, not unrestricted access to restaurant operations.

Lihat [Restaurant & Café Product Design](../../../../02-PRODUCT-DESIGN/02-MARKETPLACE/01-MERCHANT-OPERATIONS/02-RESTAURANT-CAFE/README.md).
