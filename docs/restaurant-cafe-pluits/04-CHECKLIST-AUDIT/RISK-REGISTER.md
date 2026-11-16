# Risk Register

| Risk ID | Risk | Priority | Required mitigation / evidence | Status |
|---|---|---:|---|---|
| RSK-001 | Changes damage existing PLUITS UI or navigation | P0 | Isolated routes/styles/assets; regression suite; diff review | OPEN |
| RSK-002 | Cross-restaurant or cross-branch data leakage | P0 | Tenant-scoped authorization and adversarial tests | OPEN |
| RSK-003 | Customer calls accepted outside LIVE Visit | P0 | Server-side state validation and lifecycle tests | OPEN |
| RSK-004 | Duplicate order/payment submission | P0 | Idempotency keys and retry tests | OPEN |
| RSK-005 | Order persisted but not delivered to kitchen | P0 | Transactional outbox/retry and monitoring | OPEN |
| RSK-006 | Cancellation races with kitchen start | P0 | Atomic state transition and concurrency tests | OPEN |
| RSK-007 | Staff assignment attribution overwritten | P0 | Append-only assignment history and audit events | OPEN |
| RSK-008 | Financial totals drift after configuration changes | P0 | Immutable transaction snapshots and reconciliation | OPEN |
| RSK-009 | Realtime disconnect leaves stale state | P1 | Reconnect/resync protocol and offline tests | OPEN |
| RSK-010 | Settlement assumptions exceed provider capability | P0 | Provider/legal review; no unsupported custody/split claims | OPEN |
| RSK-011 | Public branch/preview mistaken for private | P1 | Label visibility clearly; never publish secrets or real customer data | OPEN |
| RSK-012 | Mobile device constraints degrade usability | P1 | Lightweight UI and real-device Android testing | OPEN |
