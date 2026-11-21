# PLUITS Backend Module Map

**Target backend:** PLUITS-owned Go API + PostgreSQL, with independently replaceable realtime, media, and communication services.  
**Current production backend:** Supabase (PostgreSQL, Auth, RLS, SQL functions/RPC, Realtime and Storage).  
**Transition status:** custom backend foundation started on `backend/independent-foundation`; Supabase remains the production source of truth. No frontend cutover or production data migration has occurred.

## Platform scope

The backend must support the complete PLUITS ecosystem and its shared identity:
- Identity, accounts, profile, sessions, recovery, verification, membership, roles and permissions.
- Social Media: feed, posts, comments, reactions, follows, stories, reels, saved content, privacy, blocking, reporting and moderation.
- Messaging: conversations, message delivery/read state, attachments, offline delivery, presence and notifications.
- Audio/video communication: signaling, voice/video calls, group sessions and live streaming.
- Media: secure uploads, private/public access, image processing, video transcoding, playback delivery and lifecycle/retention.
- Marketplace: discovery, catalog, cart, checkout, orders, payment records, fulfillment, reviews and dispute/refund workflows.
- Merchant operations: Store and Restaurant & Café as separate operational modules connected to Marketplace.
- GeoDirectory: entities, categories, locations, claims, memberships, sources and verified place/business relationships.
- Trips, tickets, accommodation operations, transport operations, logistics, blog, entitlements and wallet foundations.
- Platform-wide audit, trust/safety, search/discovery, analytics, localization, multi-currency and regional configuration.

The scope is the platform target, not a claim that all capabilities are already implemented or should be released simultaneously. Social Media remains the first product release gate under D-002.

## Backend domains and frontend consumers

| Backend domain | Authoritative backend responsibilities | Frontend consumer |
|---|---|---|
| Identity & Accounts | Auth identity, account/profile records, ownership, privacy and preferences | Auth, Profile, Account Settings |
| Social | Posts, media references, Stories, Reels, follows, likes, comments, saves, blocks and reports | Feed, Posts, Stories, Reels, Profile, Discovery |
| Messaging | Conversation membership, messages, block/request rules, private media, delivery receipts and realtime access | Inbox |
| Notifications & Presence | Notification records, unread state, preferences, presence and authorized events | Notifications, global navigation, Inbox |
| Calls & Live | Signaling, call sessions, room authorization, live sessions and moderation controls | Calls, Live |
| Media Platform | Upload authorization, metadata, processing jobs, renditions, playback and retention | Composer, Feed, Reels, Profile, Marketplace |
| GeoDirectory | Entities, categories, locations, claims, memberships, media and source records | Directory, Discovery, Trips |
| Seller & Store | Stores, members, roles, profile, settings, categories, products, variants, images and inventory | Seller Center, Storefront |
| Restaurant & Café | Merchant-owned menus, tables, sessions, orders and service operations | Restaurant workspace |
| Marketplace | Public catalog eligibility, orders, order items, payment records, order events and atomic lifecycle | Catalog, Product, Cart, Checkout, Orders |
| Trips & Services | Itineraries, itinerary items, tickets, accommodation and service requests | Trip |
| Blog | Blog profiles, posts, categories and published/draft visibility | Blog, Blog Studio |
| Entitlements & Wallet | Entitlements and wallet account/request scaffolding; regulated financial flows require separate controls | Future gated UI |
| Trust, Safety & Audit | Reports, moderation cases, appeals, audit events and policy enforcement | Safety Center, Admin |

## Company-owned shared backend platform

PLUITS is the first product on a reusable internal backend platform intended to support BDM Transport, Bagusin and a future payments product. It is not a public BaaS. Shared platform services include identity, authorization, audit, notifications, media, events/jobs, search, observability and regional settings; product-owned data and permissions remain isolated. See [`backend/docs/INTERNAL-COMPANY-PLATFORM.md`](../../backend/docs/INTERNAL-COMPANY-PLATFORM.md).

## Extended domain contracts

- Global identity, profile contexts and permission-scoped Personal, Professional, Business and platform-operations dashboards.
- Transport vertical: verified operators, drivers and vehicles; service areas, quotes, schedules, dispatch, trip lifecycle, safety and reconciliation.
- Accommodation vertical: verified properties, room/unit inventory, rate plans, availability, reservations, guest privacy, cancellation and settlement.
- Trips remain itinerary/planning objects that reference authoritative bookings; Marketplace aggregates vertical listings and transactions without taking over merchant operations.
- Detailed boundaries, lifecycle rules, security and global data requirements: [`backend/docs/PLATFORM-DOMAIN-CONTRACTS.md`](../../backend/docs/PLATFORM-DOMAIN-CONTRACTS.md). Identity mapping and safe authentication transition: [`backend/docs/IDENTITY-AND-AUTH-BRIDGE.md`](../../backend/docs/IDENTITY-AND-AUTH-BRIDGE.md).

## Technology baseline

- Go standard library HTTP server for the API foundation.
- PostgreSQL as the authoritative relational database.
- Explicit repository/service/domain boundaries; no direct frontend access to database credentials.
- WebSocket for authenticated realtime messaging and presence.
- WebRTC signaling plus an independently deployable media server/SFU for calls and live sessions.
- Object storage with private-by-default access, signed delivery, lifecycle rules and media processing workers.
- Background job processing for email, notifications, media processing, moderation and other asynchronous work.
- Open-source dependencies where practical; third-party hosted services are optional adapters, not the core business logic.

Specific vendors and production hosting are not locked in by this baseline. Free-tier availability is not treated as a production capacity guarantee.

## Repository boundaries

- `backend/`: independent Go API and its own tests/configuration.
- `backend/migrations/`: future additive schema migrations for the new backend only; do not copy/replay Supabase migrations blindly.
- `supabase/migrations/`: historical and current Supabase migration history; preserve it.
- `supabase/functions/`: existing Supabase Edge Function boundary; no production function changes are implied by adopting the custom backend.
- `src/services/`: frontend service adapters only; never put server secrets or backend implementation here.

## Transition and production safety

1. Supabase remains live production until each replacement capability passes parity, security and recovery tests.
2. Do not pause, delete, reset or rewrite the Supabase project as part of backend construction.
3. Do not migrate Auth users by exporting plaintext passwords. Use verified account linking, secure credential reset or another reviewed migration strategy.
4. Preserve user IDs/ownership mappings, privacy rules, role permissions, existing media paths and transaction history.
5. Every data migration needs inventory, reconciliation, repeatable dry-run, backup, rollback and owner acceptance.
6. Do not introduce fake users, sample posts, fake products, orders, reviews, balances or engagement.
7. Do not switch frontend traffic to the new API until the affected capability has passed positive and negative authorization tests.
8. No public deployment is claimed until a host and database are provisioned, secrets are configured securely, health checks pass and external access is verified.

## Current implementation

- `backend/` contains the Go 1.27 HTTP service, PostgreSQL connection pool, liveness/readiness endpoints, baseline API security middleware and explicit migration CLI.
- Migration runner records immutable version/checksum history, serializes runs with a PostgreSQL advisory lock, and commits each migration with its ledger row.
- Initial migration creates only the isolated `pluits` namespace; it does not create account or domain tables before approved contracts and production mapping.
- GitHub Actions provisions disposable PostgreSQL 17 and runs Go race tests, migration integration tests and builds both API and migration commands.
- Detailed database rules: `backend/docs/DATABASE-FOUNDATION-AND-MIGRATION-STRATEGY.md`.
- No identity schema, domain tables, production data copy, public API deployment or frontend integration has been performed yet.

## Definition of ready

Each module must record its owner, tables/migrations, API contract, actor permissions, privacy model, stable errors, transaction/state transitions, realtime side effects, positive/negative tests, operational monitoring, deployment evidence and rollback procedure.

