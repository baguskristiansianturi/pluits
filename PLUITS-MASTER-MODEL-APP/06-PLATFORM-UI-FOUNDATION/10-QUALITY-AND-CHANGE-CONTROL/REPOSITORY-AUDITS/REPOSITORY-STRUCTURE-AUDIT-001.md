# REPOSITORY STRUCTURE AUDIT 001

Status: **AUDIT RECORDED — initial structure and documentation placement review**  
Audited branch: `main`  
Audited commit: `33129088565504ae9cb618a177c60854871addc6`  
Audit scope: repository root, product documentation, platform UI foundation, frontend runtime ownership, tests, backend migrations, and audit-record placement.

## 1. Audit objective

Establish a predictable repository map so a developer can locate the correct place for every new document, rule, asset, source file, test, and audit record without creating miscellaneous or overlapping folders.

This audit does not authorize a frontend refactor, route change, database change, or visual redesign.

## 2. Current repository ownership map

| Repository path | Canonical responsibility | Keep here |
|---|---|---|
| `AGENTS.md` | Repository-wide engineering instructions and mandatory agent workflow | Cross-cutting rules that must be read before work |
| `PLUITS-MASTER-MODEL-APP/` | Approved product and technical planning documentation | Master models, product design, modularization, platform UI foundation |
| `PLUITS-SHARING-INBOX/` | Raw discussion records awaiting review and sorting | Session notes, unsorted ideas, discussion outcomes not yet approved |
| `src/` | Current frontend runtime | Application code, feature modules, services, design-system implementation |
| `public/` | Static files served/copied by the frontend build | Brand assets, image libraries, manifest and other runtime assets |
| `supabase/` | Backend database and Supabase-owned implementation | Migrations, Edge Functions, backend tests and configuration |
| `tests/` | Automated repository/application verification | Node tests, architecture tests, route tests and regression tests |
| `scripts/` | Repeatable engineering and verification commands | Build/repository validation scripts |
| `.github/workflows/` | CI and deployment automation | Workflow definitions only |

Do not create a second generic documentation root, a miscellaneous assets folder, or a shared-components folder outside the established owners.

## 3. Canonical documentation placement

| Information being created or changed | Required location |
|---|---|
| Platform identity, account, membership, cross-product decision | `PLUITS-MASTER-MODEL-APP/00-MASTER-FOUNDATION/` |
| Ecosystem business/product model | Relevant folder under `01-ECOSYSTEM-MODELS/` |
| Page purpose, user journey, information architecture, page UX | Relevant folder under `02-PRODUCT-DESIGN/` |
| Runtime architecture, module ownership, API/data contracts, backend boundaries, security, deployment and rollback | Relevant folder under `03-APPLICATION-MODULARIZATION/` |
| Cross-platform tokens, responsive rules, brand, typography, icon, component, layout and interaction standards | Relevant numbered folder under `06-PLATFORM-UI-FOUNDATION/` |
| UI implementation-to-standard traceability | `06-PLATFORM-UI-FOUNDATION/11-IMPLEMENTATION-MAPPING/` |
| UI quality gates and shared UI change control | `06-PLATFORM-UI-FOUNDATION/10-QUALITY-AND-CHANGE-CONTROL/` |
| Repository structure audit reports | `06-PLATFORM-UI-FOUNDATION/10-QUALITY-AND-CHANGE-CONTROL/REPOSITORY-AUDITS/` |
| Feature-specific implementation guide | README or focused guide inside the owning `src/features/<feature>/` folder |
| Shared runtime tokens, icons, shell and layout implementation | `src/design-system/` |
| Feature-specific runtime code and scoped styles | Owning `src/features/<feature>/` folder |
| Backend migrations and functions | `supabase/` |
| Automated test code | `tests/` or the owning backend test folder under `supabase/tests/` |

The documentation and runtime have different responsibilities: documentation defines intent, status and rules; runtime code implements them. Do not copy full standards into feature READMEs. Link to the canonical standard and explain only the feature-specific application.

## 4. Findings

### F-001 — Repository already has clear top-level ownership

**Result: PASS**

The root separates master product documentation, raw sharing notes, frontend runtime, public assets, Supabase backend, tests, scripts and CI workflows. Preserve this separation.

### F-002 — Platform UI Foundation already has the correct home for cross-platform UI rules

**Result: PASS**

`PLUITS-MASTER-MODEL-APP/06-PLATFORM-UI-FOUNDATION/` already separates tokens, responsive system, brand assets, typography, icons, components, layout patterns, interaction patterns, SOP, quality/change control, implementation mapping and tooling.

Do not create a parallel `design-system-docs/`, `ui-guidelines/`, `frontend-standards/`, or generic `docs/` directory.

### F-003 — Audit reports lacked a dedicated, discoverable register

**Result: REMEDIATED IN THIS AUDIT**

Repository audit records now have one specific location under the existing quality/change-control owner:

`PLUITS-MASTER-MODEL-APP/06-PLATFORM-UI-FOUNDATION/10-QUALITY-AND-CHANGE-CONTROL/REPOSITORY-AUDITS/`

This location is intentionally nested under quality and change control; it is not a new root-level documentation category.

### F-004 — Frontend runtime README described an outdated first-stage structure

**Result: REMEDIATED IN THIS AUDIT**

The previous `src/README.md` described a `features/workspace/` module and omitted the current Social, Dashboard, and public homepage ownership. It also conflicted with `src/CHANGE-MAP.md`.

The README is now a short entry point to the current runtime map. `src/CHANGE-MAP.md` remains the detailed technical source for route ownership, dependencies, backend contracts, protected surfaces and verification.

### F-005 — Runtime design-system documentation and platform standards need traceable alignment

**Result: FOLLOW-UP REQUIRED**

The canonical platform standards live under `06-PLATFORM-UI-FOUNDATION/`; the implementation lives under `src/design-system/`. The implementation mapping must remain the bridge between them.

The runtime README must not become a competing standards registry. Specific runtime values must be audited against the actual CSS and component consumers before their status is upgraded to Approved.

### F-006 — Some technical documentation may contain historical implementation descriptions

**Result: FOLLOW-UP REQUIRED**

The technology/tooling register contains detailed stack observations and should be revalidated against the current main-branch tree before any technology adoption or migration decision. Do not use a stale path or stack description as authority for code changes.

## 5. Mandatory placement rules from this audit

1. Search the existing repository tree and relevant README before creating a folder.
2. Place a document with the existing owner that matches its subject; do not place it at repository root merely for convenience.
3. Create a new folder only when it represents a stable, recurring category with a clear owner and README/index.
4. Keep raw notes, approved requirements, design standards, runtime code, assets, tests and audit evidence separate.
5. Every new canonical standard must have one authoritative file and a discoverable link from its parent README or registry.
6. Feature READMEs may link to shared standards but must not duplicate or redefine them.
7. When documentation conflicts, identify the authoritative owner, correct stale pointers, and record unresolved conflicts; do not silently invent a third version.
8. Do not move or delete existing files during an audit unless imports, links, workflows, tests, and consumers have been checked and the move is necessary.
9. Record the audited commit SHA and distinguish static repository inspection from tests, browser/device UAT, and deployment evidence.
10. Documentation-only audits must not alter runtime behavior or be reported as a product deployment.

## 6. Required audit workflow for future changes

1. Identify the change category and owning module.
2. Inspect root and parent README files before adding paths.
3. Inspect the current implementation, references, imports, consumers and tests.
4. Compare documentation with the actual main-branch source.
5. Record findings in the relevant owner; use this audit register only for repository-wide structure reviews.
6. Remediate only the approved scope and update the canonical index.
7. Run relevant automated checks when source or build files change.
8. Verify the Git commit and workflow only when the change requires deployment.
9. Report unresolved findings separately from completed remediation.

## 7. Verification and limitations

- Repository tree was inspected recursively at the audited commit; GitHub reported the tree was not truncated.
- Root ownership, master documentation, platform UI foundation, runtime design-system files, feature home guide, route map, package scripts, tests and Supabase migration locations were inspected.
- This is a repository/documentation placement audit, not a full source-code security audit.
- No Android device/browser visual UAT was performed as part of this audit.
- No backend schema, migration, account, user data, route behavior, or UI runtime file was changed by the audit record itself.

## 8. Follow-up queue

- Re-audit the technology/tooling register against current runtime paths and dependency versions before technology migration.
- Complete the UI implementation mapping for all active shared tokens, icons, shell components and layout patterns.
- Review remaining feature and product documents for stale route names or historical module paths when each related area is next changed.
