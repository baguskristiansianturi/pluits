# PLUITS Account Technical Foundation

**Status:** PROPOSED — technical requirements are to be derived from agreed product rules.  
**Scope:** Frontend, backend, data, APIs, security, algorithms, observability, and testing for the account system.

## Purpose

This document is the bridge between account product rules and implementation. It records how the agreed behavior must be realized technically so implementation does not depend on memory or assumptions.

No technology, schema, API contract, algorithm, or architecture in this document is final until explicitly reviewed and agreed. Technical feasibility and platform limitations must be validated before a capability is promised.

## Required technical specification for each capability

For every agreed account capability, record:

1. **Product rule:** user-facing purpose, eligibility, and expected behavior.
2. **Entitlement:** membership levels allowed to use it; cumulative inheritance; exceptions.
3. **Frontend:** entry points, screens, states, loading/empty/error states, accessibility, and client-side behavior.
4. **Backend:** authoritative enforcement, business logic, service boundaries, and failure behavior.
5. **Data model:** required entities, fields, relationships, lifecycle, retention, and migration considerations.
6. **API contract:** operations, inputs, outputs, authorization, validation, and error responses.
7. **Security and privacy:** authentication, authorization, least privilege, data isolation, abuse prevention, and privacy guarantees.
8. **Algorithm:** inputs, eligibility gates, ranking or calculation rules, tie-breaking, limits, and explainability where relevant.
9. **Events and notifications:** emitted events, recipients, deduplication, delivery, and user controls.
10. **Testing:** unit, integration, permission-matrix, security, regression, and device/browser scenarios.
11. **Operations:** logging, monitoring, rate limits, performance, and recovery.
12. **Open risks:** feasibility questions, third-party/platform dependencies, and unresolved decisions.

## Architecture principles to evaluate

- The backend must enforce permissions; hiding a frontend control is not sufficient authorization.
- Membership entitlements should have a clear, consistent source of truth and be checked consistently across frontend and backend.
- Privacy and block restrictions must be enforced before content or activity data is exposed.
- Shared profile layout should be driven by common profile data plus a small membership identity presentation, not five separate profile implementations.
- Keep modules separated by responsibility so changes to one capability do not unintentionally break others.
- Avoid collecting or retaining data that is not necessary for an agreed product capability.
- Document platform limitations honestly; do not promise detection or background behavior that devices and operating systems cannot reliably provide.

## Technology choices

The concrete stack, schema, RLS policies, API shapes, service boundaries, event architecture, and algorithms remain open until the product rules and constraints are understood. Record alternatives, trade-offs, and the reason for a decision before implementation.

## Build sequencing

Do not infer build order from the order of sections in this folder. Once the account rules and technical dependencies are sufficiently mapped, create a dependency-based implementation sequence and test plan.
