# Fluids Messaging — 02 DEVELOPMENT

Status: **ARCHITECTURE BASELINE / IMPLEMENTATION NOT YET VERIFIED**

## Technical ownership
- Frontend feature owner: src/features/fluids-messaging/ (target; verify actual runtime tree before implementation).
- Routes/bootstrap: owned by src/app/; route integration must be minimal and reviewed.
- API orchestration: src/services/ adapter only; no page DOM rendering and no secrets.
- Backend domain: PLUITS Go API under backend/, with Fluids-owned domain/service/repository boundaries and additive PostgreSQL migrations.
- Shared identity: PLUITS first-party Identity API. No separate user account store or external auth fallback.
- Shared UI: consume approved src/design-system/ assets/tokens; feature CSS must be namespaced to Fluids root.

## Required development rules
1. Inspect current routes, source ownership, API contracts, migrations, tests, and workflow before touching code. This path is a target, not proof that folders exist.
2. Keep feature internals private. Social Media/Marketplace may call public service contracts or deep links; they must not import Fluids feature components, styles, state, or database internals.
3. Use PLUITS-owned Go API + PostgreSQL. Migrations are additive, ordered, checksummed, and immutable after application; never rewrite production data or applied migrations.
4. Enforce authorization server-side for every conversation/message/media action. Check membership, message-request policy, block state, role, and ownership on each relevant operation.
5. Realtime events must be authenticated, conversation-scoped, validated, replay-safe, and authorized. Persist before broadcasting; use stable message IDs, idempotency keys, ordering strategy, reconnect sync, and retry handling.
6. Private attachments require authorized upload, metadata, size/type limits, processing/scanning, private storage, signed/authorized delivery, and retention/deletion policy.
7. Services must not import feature UI. Features must not import sibling feature internals. Shared components/global CSS/auth/database changes require impact audit.
8. Do not add fake conversations, messages, read receipts, presence, or notification counts to production.
9. Voice/video is not part of initial messaging release unless separately approved with signaling/media infrastructure and security review.

## Required technical artifacts
Domain model, API contract, permission matrix, event schema, migration plan, error contract, observability plan, test plan, deployment/rollback plan, and dependency map.

## Legacy code and data audit gate
The prior Inbox design document describes Supabase tables, RPCs, Realtime, private voice-note storage, and local text outbox. Current PLUITS engineering instructions supersede that vendor-bound implementation direction. Before any runtime change, inspect actual main-branch source, backend migrations, any live database/data/media, current APIs and tests. Do not delete, rewrite, or migrate existing messages/media until inventory, backup, reconciliation, rollback, and owner acceptance are documented. Historical two-account UAT checklist is not current pass evidence.
