# 04 — CHECKLIST & AUDIT

## Cross-check method
For every Feature ID, verify:
1. DESIGN: user journey, page/form, business rules, edge cases and acceptance criteria exist.
2. DEVELOPMENT: component/API/data model/state machine/permissions/security/realtime/error behavior are specified.
3. PROJECT: implementation paths and commit are recorded; tests have reproducible evidence.
4. AUDIT: design-to-code parity, tenant isolation, authorization, privacy, regression and operational readiness are checked.

## P0 release gates
- Tenant isolation and backend RBAC.
- Reservation/walk-in/table allocation conflict safety.
- Visit/order/payment/table lifecycle correctness.
- LIVE-only help and manager calls enforced server-side.
- Order idempotency and reliable kitchen delivery.
- Atomic cancellation versus production start.
- Staff attendance verification and assignment/handover audit history.
- Financial calculation snapshots, refund authorization and reconciliation.
- Realtime reconnect/resync and offline handling.
- No regressions in existing PLUITS pages/modules.

## Test classes
Happy path; validation and boundary; role/permission; cross-tenant access; concurrent requests; duplicate/retry; offline/reconnect; provider timeout/failure; partial payment/refund; historical snapshot; mobile viewport/performance; accessibility; regression.

## Audit outcome values
PASS; FAIL; NEEDS_EVIDENCE; NOT_TESTED; NOT_APPLICABLE. A missing test is not a pass.

## Current audit statement
This is an initial conceptual cross-check baseline only. No code audit, security audit, production regression test or deployment verification has yet been performed.
