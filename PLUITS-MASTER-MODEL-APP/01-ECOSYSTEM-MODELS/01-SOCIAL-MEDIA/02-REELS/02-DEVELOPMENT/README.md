# Reels — Technical Development

## Domain boundary
Konten video pendek dengan pengalaman konsumsi vertikal, pemutaran, kontrol media, discovery, interaksi, dan aturan distribusi video.

## Spesifikasi wajib
- Domain entities, ownership, lifecycle/state machine, invariants, and data retention.
- Frontend route/page/component ownership, local state, CSS boundary, and public interfaces.
- Backend services, persistence, API schemas, event contracts, idempotency, and error semantics.
- AuthN/AuthZ, account ownership, audience/privacy enforcement, moderation, abuse prevention, and audit trail.
- Media storage/processing and delivery constraints where applicable.
- Observability, analytics events, feature flags, migrations, rollback, and operational runbooks.

## Frontend/CSS boundary
- Place module-specific styles beside or under this module's frontend implementation; namespace selectors to this module.
- Do not import another module's private stylesheet or reach into its DOM/state.
- Shared icons, tokens, layout primitives, and generic components come from Platform UI Foundation.
- Cross-module navigation/rendering uses documented route and content contracts.

## Implementation status
Do not claim an API, schema, worker, media pipeline, or runtime page exists until the code and tests are located and verified.
