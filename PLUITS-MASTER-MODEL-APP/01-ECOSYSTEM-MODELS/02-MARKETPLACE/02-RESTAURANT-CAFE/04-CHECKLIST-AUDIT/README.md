# Restaurant & Café — Checklist & Audit

Ruang audit desain, implementasi, tenant isolation, keamanan, privasi, transaksi, operasional, regresi, dan kesiapan rilis.

## Gerbang pemeriksaan minimum
- [ ] Tenant/branch scoping dan backend RBAC.
- [ ] Reservation, walk-in, dan table allocation conflict safety.
- [ ] Lifecycle Visit, Order, Payment, dan Table konsisten.
- [ ] Panggilan Bantuan dan Call Manager hanya selama Visit LIVE.
- [ ] Order idempotency dan reliable kitchen delivery.
- [ ] Staff assignment, attendance, dan handover memiliki audit trail.
- [ ] Refund, reconciliation, dan financial snapshots tervalidasi.
- [ ] Realtime reconnect/resync dan offline handling diuji.
- [ ] Tidak ada regresi pada modul PLUITS yang sudah berjalan.

## Dokumen kanonis
- [Restaurant & Café Risk Register](../../../../03-APPLICATION-MODULARIZATION/02-MARKETPLACE/01-MERCHANT-OPERATIONS/02-RESTAURANT-CAFE/04-CHECKLIST-AUDIT/RISK-REGISTER.md)
- [Restaurant & Café Audit Index](../../../../03-APPLICATION-MODULARIZATION/02-MARKETPLACE/01-MERCHANT-OPERATIONS/02-RESTAURANT-CAFE/04-CHECKLIST-AUDIT/README.md)
