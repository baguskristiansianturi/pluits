# 03 — PROJECT

## Delivery status
Current stage: **DESIGN BASELINE RECORDED**.
Implementation status: NOT STARTED.
Automated/manual test evidence: NOT RECORDED.
Security/regression audit: NOT PERFORMED.
Production integration: NOT AUTHORIZED.

## Delivery phases
1. Design completion: expand every page, form, journey, rule and acceptance criterion.
2. Technical specification: finalize domain model, API, authorization, state machines, data migration and integration contracts.
3. Isolated frontend build: customer, management, staff, kitchen and cashier surfaces with fixture/mock data.
4. Backend build: tenant-safe domains, persistence, validation, events, audit and integrations.
5. End-to-end testing: normal, edge, concurrency, permission, offline/reconnect and failure paths.
6. Audit and hardening: security, privacy, accessibility, performance, mobile and PLUITS regression.
7. Preview acceptance: testable deployment separated from production, with honest disclosure of preview limitations.
8. Integration: reviewed PR into main only after explicit approval.
9. Release: staged deployment, monitoring and rollback plan.

## Evidence required per feature
Feature ID; design reference; implementation paths; commit SHA; test cases/results; screenshots or recording where useful; known defects; audit outcome; deployment environment and URL (only after verified).

## Working rules
Never mark a feature complete because a screen merely renders. Record backend behavior and failure states. Never claim deploy success without checking the deployed artifact. Keep changes focused and avoid unrelated PLUITS files.
