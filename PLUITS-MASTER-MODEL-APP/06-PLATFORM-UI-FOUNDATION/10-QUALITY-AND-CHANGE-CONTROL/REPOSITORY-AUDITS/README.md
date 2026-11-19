# Repository Audit Records

This directory stores completed and in-progress audits of repository structure, documentation placement, and governance.

## What belongs here

- Dated or numbered repository-structure audit reports.
- Findings about misplaced, duplicated, stale, or undiscoverable documentation.
- Agreed remediation plans and verification evidence.

## What does not belong here

- Product requirements or raw discussion notes — use `PLUITS-SHARING-INBOX/`.
- Ecosystem business models — use `01-ECOSYSTEM-MODELS/`.
- Page UX and visual specifications — use `02-PRODUCT-DESIGN/`.
- UI tokens, components, assets, and interaction standards — use the corresponding folders in `06-PLATFORM-UI-FOUNDATION/`.
- Runtime source code — use the owning `src/` module.
- Database migrations and backend tests — use `supabase/`.
- Automated application tests — use `tests/`.
- One-off implementation notes — update the owning module README or canonical specification instead of creating loose files.

## Naming and maintenance

- Use `REPOSITORY-STRUCTURE-AUDIT-NNN.md` for repository-wide structure audits.
- Keep each report focused on one audit scope and record the audited commit SHA.
- Update this index when a report is added.
- Do not create a new folder for a single file unless it establishes a recurring, clearly owned document category.
- Preserve historical reports; record follow-up status rather than silently rewriting audit history.
 
## Audit register

- [REPOSITORY-STRUCTURE-AUDIT-001](./REPOSITORY-STRUCTURE-AUDIT-001.md) — initial repository structure, documentation ownership, and discovery-path audit.
