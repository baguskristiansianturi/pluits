# Fluids Messaging — Application Modularization

Status: **TARGET ARCHITECTURE / IMPLEMENTATION AUDIT REQUIRED**

## Module identity
Fluids Messaging is an independent PLUITS-owned communication domain and future standalone app. Its first integration surfaces may be embedded in Social Media and Marketplace, but its ownership is not nested inside either ecosystem.

## Target frontend ownership
- Feature root: src/features/fluids-messaging/ (target; confirm actual repository code before creating/moving files).
- Route and app lifecycle: src/app/.
- API adapters/orchestration: src/services/.
- Low-level transport/client helpers: src/lib/ where consistent with existing repo conventions.
- Tokens/icons/shared primitives: src/design-system/.
- Global reset/base only: src/styles/; all Fluids feature styles must be scoped to its root.
- Do not add Fluids private styles to Social Media, Marketplace, or global styles.

## Backend ownership
- PLUITS-owned Go API under backend/ owns messaging endpoints, domain logic, authorization, persistence, event publication, and media authorization.
- PostgreSQL is the authoritative data store. Use additive, immutable-after-application migrations.
- PLUITS first-party Identity is the identity source. No parallel auth/user store.
- Messaging data ownership includes conversation, participant/member state, message, per-recipient receipt, message request, conversation settings, and references to media objects.
- Notification delivery is a shared service; Fluids owns messaging event semantics and unread/read state, while notifications owns delivery channels/preferences.
- Media object storage is private by default; access is authorized through the PLUITS backend.

## Integration contracts
- Social Media: opens Inbox or a conversation using a stable route/deep-link/API/event contract. It owns social feed/profile/follow behavior, not chat internals.
- Marketplace: may create a contextual conversation reference for customer/merchant communication. Marketplace/merchant domains retain order, payment, product, reservation, and fulfillment ownership.
- Store and Restaurant & Café: connect via authorized merchant identity/context. Fluids cannot change order status or merchant records.
- Standalone app: reuse the same identity and messaging API, with independent shell, route, app manifest/release configuration, and UI composition. Do not fork messaging business logic.

## Required architecture decisions before coding
1. Conversation and participant model, direct-conversation uniqueness, group roles, membership transitions.
2. Message schema and lifecycle, idempotency, ordering, pagination, retention, and deletion semantics.
3. Per-recipient/per-device delivery and read receipt definitions; distinguish server persistence from actual device delivery.
4. API endpoints, stable error contract, authorization matrix, rate limits, abuse controls, audit events.
5. Realtime protocol: authenticated connection, conversation-scoped authorization, persist-before-publish, replay/reconnect, event versioning, idempotent client processing.
6. Offline queue and conflict/retry strategy; local cache privacy and account isolation.
7. Media upload/download lifecycle, private access, scanning/processing, signed delivery, and cleanup.
8. Privacy and safety: message requests, block/report, group invitation controls, presence/read-receipt preferences, user data export/deletion and retention.
9. Monitoring, operational runbooks, deployment, rollback, and incident response.

## Historical implementation reconciliation
The legacy Inbox architecture document describes a prior Supabase-based direct-message/voice-note design, including direct chat, read/delivery indicators, private voice-note media, local text outbox and two-account UAT scenarios. Preserve this as historical evidence only. The active PLUITS repository directive dated 22 November 2026 requires first-party Go API + PostgreSQL and disallows hosted-backend SDKs and provider-bound runtime. Before any migration, audit current source, applied schema, live data, existing user conversations/media, and UAT evidence. Never reset or rewrite live messaging data.

## Isolation and release
- No import from Social Media/Marketplace private features, CSS, state, DOM, storage, or database internals.
- Cross-module changes require dependency/consumer map, regression tests, and explicit scope.
- Do not claim standalone-ready until app shell/deep links, auth, push/notification strategy, installability, security, operations, and release gates pass.
- Do not claim messaging is active, realtime is working, or two-account UAT passed without current runtime evidence.
