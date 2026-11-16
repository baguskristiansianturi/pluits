# PLUITS Store

Status: **AUDITED DESIGN BASELINE — NOT FINAL / NOT IMPLEMENTED**

PLUITS Store is a multi-seller marketplace module within the existing PLUITS platform. Sellers must operate a real physical store/business premises and pass PLUITS verification before selling. Each approved seller receives an independent management workspace. One marketplace homepage aggregates eligible products from approved stores.

## Workspace
- [01-DESIGN](01-DESIGN/README.md): business model, roles, page inventory, end-to-end flows, catalog, homepage discovery and decisions.
- [02-DEVELOPMENT](02-DEVELOPMENT/README.md): technical architecture, data, APIs, security and integration.
- [03-PROJECT](03-PROJECT/README.md): implementation plan, feature register, tests and delivery evidence.
- [04-CHECKLIST-AUDIT](04-CHECKLIST-AUDIT/README.md): audit findings, risks and release gates.

## Key design documents
- [Product scope & roles](01-DESIGN/PRODUCT-SCOPE-AND-ROLES.md)
- [Page inventory & navigation](01-DESIGN/PAGE-INVENTORY-AND-NAVIGATION.md)
- [End-to-end flows](01-DESIGN/END-TO-END-FLOWS.md)
- [Catalog, variants & inventory](01-DESIGN/CATALOG-AND-INVENTORY-RULES.md)
- [Homepage & discovery rules](01-DESIGN/HOMEPAGE-DISCOVERY-RULES.md)
- [Decision log](01-DESIGN/DECISION-LOG.md)
- [Technical architecture baseline](02-DEVELOPMENT/ARCHITECTURE-BASELINE.md)
- [Audit findings](04-CHECKLIST-AUDIT/AUDIT-FINDINGS.md)

## Isolation rule
All work remains on feature/store-pluits. Do not merge into main, modify production deployment settings, or alter unrelated PLUITS modules until specifications, implementation, testing, security/privacy checks, regression checks and explicit integration approval are complete.

## Honest status
The documents record a discussion-derived design baseline and audit findings. They are not final approved business policy. Open decisions remain. No application implementation, tests, security audit, deployment or production integration is claimed.
