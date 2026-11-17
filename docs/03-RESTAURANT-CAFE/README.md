# PLUITS Restaurant & Café

Status: **DESIGN BASELINE — NOT IMPLEMENTED / NOT APPROVED FOR PRODUCTION**

This is a new business module for the existing PLUITS platform. It is being designed and developed in isolation. The live PLUITS application must remain unchanged until this module passes design, implementation, security, regression and acceptance checks.

## Workspace
- [01-DESIGN](01-DESIGN/README.md): product model, architecture, journeys and decisions.
- [02-DEVELOPMENT](02-DEVELOPMENT/README.md): technical contracts, modular boundaries, data and security requirements.
- [03-PROJECT](03-PROJECT/README.md): delivery plan, feature register and evidence.
- [04-CHECKLIST-AUDIT](04-CHECKLIST-AUDIT/README.md): cross-checks, risk register and release gates.

## Non-negotiable integration rule
All work stays on `feature/restaurant-cafe-pluits`. Do not merge to `main`, change production deployment settings, or alter existing PLUITS pages during isolated development. Integration requires a reviewed pull request and explicit release approval.

## Status vocabulary
- **PLANNED**: documented, not built.
- **IN_PROGRESS**: implementation underway.
- **BUILT**: code exists, not necessarily tested.
- **TESTED**: test evidence recorded.
- **AUDITED**: design/technical/security/regression review passed.
- **READY_FOR_INTEGRATION**: all release gates passed.
- **INTEGRATED**: merged after approval.
- **BLOCKED**: dependency or issue prevents progress.

A document being present does not mean the feature is implemented or audited.
