# Design Decision Log

| ID | Decision | Rule / rationale | Status |
|---|---|---|---|
| DEC-001 | Module belongs to PLUITS | Restaurant & Café is a future PLUITS business module, not a separate product. | CONFIRMED |
| DEC-002 | Isolated delivery first | Work on a feature branch; do not alter production/main until approval. | CONFIRMED |
| DEC-003 | Five application surfaces | Customer, management, staff, kitchen/barista, cashier/POS. | BASELINE |
| DEC-004 | Visit differs from Order | A visit can contain multiple orders; payment state does not automatically close a visit. | CONFIRMED |
| DEC-005 | LIVE-only calls | Help and Call Manager can be created only while a verified Visit is LIVE; backend enforcement required. | CONFIRMED |
| DEC-006 | Separate help and manager escalation | Ordinary service request is distinct from complaint/dispute escalation. | CONFIRMED |
| DEC-007 | Auditable service assignment | Claim, handover and manager reassignment preserve actor/time/history. | CONFIRMED |
| DEC-008 | Reservation policy snapshot | Changes to future policy do not rewrite confirmed reservations. | CONFIRMED |
| DEC-009 | Kitchen station autonomy | Parallel preparation, station routing and item-level progress supported. | BASELINE |
| DEC-010 | Financial domains separated | Pricing, promotion, billing/fiscal, payment, settlement, ledger and reconciliation remain distinct. | BASELINE |
| DEC-011 | No production merge before gates | Integration requires tests, audit, regression evidence and explicit approval. | CONFIRMED |

Open decisions to resolve before implementation include final split-bill policy, visit closure rules for mixed/group/partial payments, delivery-provider contracts, tax/service jurisdiction rules, payment/split-settlement provider, and initial stock scope.
