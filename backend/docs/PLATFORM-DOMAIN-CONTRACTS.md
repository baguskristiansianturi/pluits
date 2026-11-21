# PLUITS Platform Backend — Domain Contracts and Global Expansion

**Status:** target architecture and implementation contract. This document does not mark future modules as implemented or approve unresolved membership rules.

## 1. Product boundary

PLUITS is one global platform identity with multiple independently permissioned contexts. The backend is organized around business domains, not a single giant controller or a vendor-specific database API.

The platform target includes:
- Personal, Professional and Business identity contexts.
- Social, creator publishing, messaging, calls, Live and media.
- GeoDirectory and verified place/business relationships.
- Marketplace discovery, commerce and merchant workspaces.
- Store and Restaurant & Café operations.
- Transport providers, vehicles, drivers, routes, quotes and bookings.
- Accommodation properties, room inventory, rates and reservations.
- Trips, tickets, activities, service bookings and itineraries.
- Blog, notifications, search, dashboards, trust/safety, audit and regional configuration.

Marketplace is the discovery and transaction aggregation layer. Store, Restaurant & Café, Transport and Accommodation are operational verticals. A listing in Marketplace must resolve to its authoritative merchant/provider/property record; marketplace copies must not become a second source of truth.

## 2. Identity, profiles and access contexts

### 2.1 One login, multiple contexts

The existing PLUITS account architecture defines one human login with Personal, Professional and Business contexts. Keep these concepts separate:
- Identity: the authenticated human or service principal.
- Profile: public-facing Personal or Professional identity.
- Business entity: a store, restaurant, transport operator, accommodation operator, company or organization.
- Workspace: a scoped operational context selected by the user.
- Membership: a person's relationship to a workspace.
- Role and permission: the allowed actions on specific resources.
- Verification: evidence and review status for a person, professional, business, driver, vehicle or property.
- Membership level/entitlement: a separate commercial policy. The current membership master model remains PROPOSED; do not hard-code tier benefits or use tier as authorization.

A user may own multiple businesses and participate in other businesses as staff. Switching context must not change the underlying login or grant access to another workspace.

### 2.2 Profile data boundaries

Personal profile: username, display name, avatar, biography, optional public location, language, privacy, contact preferences and social identity.

Professional profile: owner identity, profession/category, skills, experience, portfolio, service area, availability, inquiry settings and verification claims.

Business profile: legal/private business details, public brand identity, locations, opening hours, categories, contacts, operating status and verification status. Legal documents, private addresses, bank data and identity documents must never leak through public profile endpoints.

Do not destructively convert a Personal profile into a Professional or Business record. Link additional contexts to the same identity and preserve ownership history.

## 3. Workspace dashboards

Dashboards are permission-scoped read models, not privileged front-end pages.

### Personal dashboard
- Profile and privacy controls.
- Saved items, itinerary, bookings, orders, tickets and reservations.
- Messages, notifications, reviews and account security.
- Wallet/payment history only when a compliant financial capability is enabled.

### Professional dashboard
- Profile completeness and portfolio.
- Service inquiries, quotes, bookings and schedule.
- Availability, service area, customer conversations and verified reviews.
- Performance insights with privacy-safe aggregation.

### Business dashboard
- Workspace switcher and member access.
- Store/catalog/inventory, restaurant operations, transport operations or accommodation operations according to enabled modules.
- Orders, reservations, service requests, fulfillment, customer support and verified reviews.
- Revenue/settlement summaries only from reconciled transaction records.
- Staff activity, verification cases, audit history and operational alerts.

### Platform operations dashboard
- Separate privileged administrative application and APIs.
- Role-scoped queues for moderation, safety, business verification, disputes, fraud review, support and platform health.
- Dual control for sensitive financial, identity and security operations where appropriate.
- Every privileged action has actor, reason, target, timestamp and immutable audit reference.

Dashboard endpoints must derive the caller's allowed workspaces server-side. Never accept a client-supplied workspace ID as proof of membership. Avoid one giant dashboard response: use bounded, independently cacheable domain summaries with freshness timestamps and pagination.

## 4. Transport operations

Transport is an operational vertical, not merely a listing category. It must support multiple countries, currencies, languages, time zones, vehicle classes and local regulatory requirements.

### Core records
- Transport provider/operator and verified business identity.
- Service area, pickup/drop-off zones, route definitions and service types.
- Vehicle, class/capacity, equipment, accessibility and luggage constraints.
- Driver identity, licenses, required permits, employment/partner status and verification expiry.
- Vehicle documents, inspection/insurance evidence and expiry reminders.
- Pricing rules, quote versions, surcharges, taxes and currency.
- Driver/vehicle availability, schedules, capacity and blackout windows.
- Booking, passenger/guest details, pickup instructions, trip state and assigned resources.
- Dispatch/assignment history, trip events, location updates (when explicitly enabled), incident and support records.
- Cancellation, refund, provider payout and reconciliation records.

### Booking lifecycle
A transport booking should have explicit states such as draft, quoted, pending_confirmation, confirmed, assigned, driver_en_route, arrived, in_progress, completed, cancelled, no_show, disputed and refunded. The final state set must be owned by the transport domain and versioned; do not overload payment status as booking status.

A quote is immutable once accepted. Repricing creates a new quote version with a reason and customer acceptance. Booking confirmation must atomically reserve the relevant capacity/vehicle slot and prevent double allocation. Dispatch changes must be auditable.

### Safety and privacy
- Verify provider, driver and vehicle independently; a verified provider does not automatically verify every driver or vehicle.
- Only collect passenger identity/contact data required for the journey and legal obligations.
- Share live location only for an active trip and with explicit, purpose-bound access.
- Restrict precise location history, retention and staff access; never expose driver home/private details.
- Provide incident reporting, emergency contact procedures, dispute evidence and controlled access to trip records.
- Use idempotency keys for booking creation, confirmation, cancellation and payment-related commands.

## 5. Accommodation operations

Accommodation is a separate operational vertical with inventory and reservation rules distinct from transport.

### Core records
- Property/operator and verified business identity.
- Property locations, facilities, policies, accessibility and regulatory details.
- Room/unit types, occupancy, bed configuration and inventory units.
- Rate plans, currency, taxes, fees, deposits, meal plans and cancellation rules.
- Availability calendar, minimum/maximum stay, closed-to-arrival/departure and blackout dates.
- Reservation, guest party, special requests, check-in/out, extensions and incident records.
- Payment intents/records, refunds, commissions, provider settlements and reconciliation.
- Verified-stay review eligibility and moderation/dispute links.

### Reservation integrity
- Availability is calculated from inventory and confirmed/held reservations, not a static listing counter.
- Use database transactions and exclusion/locking rules to prevent overlapping reservations or overselling the same unit.
- Temporary holds must expire deterministically and release inventory.
- Store the accepted rate-plan and cancellation-policy snapshots on each reservation so later edits do not rewrite historical customer commitments.
- Support time-zone-aware local check-in/check-out, date boundaries and property-specific rules.
- Reservation state and payment state are separate state machines.
- Changes, cancellation, no-show, refund and extension flows must be auditable and idempotent.

### Guest privacy
Guest identity documents, access codes, private contact information and payment data are highly restricted. Public property pages expose only approved public information. Staff access is limited by property membership and role. Retention and deletion follow legal, safety and dispute requirements.

## 6. Trips, tickets and activities

A trip itinerary is a planning object and is not itself a confirmed booking. It may reference directory places, transport bookings, accommodation reservations, activities and tickets without owning their inventory.

Each bookable service owns its own quote, capacity, payment, cancellation and fulfillment lifecycle. Trip views aggregate authorized references and must not duplicate authoritative booking state.

## 7. Marketplace and merchant boundaries

Marketplace:
- Search, discovery, ranking, catalog presentation and cross-vertical checkout orchestration.
- References canonical provider/store/property/service records.
- Owns marketplace order orchestration and transaction references, not each merchant's internal operations.

Vertical operations:
- Store owns products, variants, stock and store fulfillment.
- Restaurant & Café owns menus, tables, dine-in sessions, kitchen/service flow and restaurant-specific orders.
- Transport owns vehicles, drivers, dispatch and trips.
- Accommodation owns properties, room inventory, rates and reservations.

A provider can appear in GeoDirectory and Marketplace while its operational records remain in its vertical. Claiming a directory listing must not automatically grant store, property or transport operator access.

## 8. Shared platform services

- Identity and session verification.
- Authorization policy evaluation and workspace membership.
- Audit log and security event pipeline.
- Notification preferences, templates, delivery and retry.
- Search indexing and discovery.
- Media metadata, private object storage, signed upload/download and processing jobs.
- Realtime messaging/presence and WebRTC signaling; media SFU is a separately operated component.
- Background jobs, transactional outbox and idempotent consumers.
- Localization, country/region settings, ISO currency, tax and timezone support.
- Observability: structured logs, metrics, traces, correlation IDs and alerting.
- Data export, account deletion workflows, retention and legal holds.

## 9. Security baseline

- Deny by default; authorize every read and write against the target resource and current membership.
- Enforce ownership, tenant/workspace boundaries and row-level access in the service layer; database constraints/RLS are defense in depth.
- Keep credentials, signing keys and provider secrets out of Git and browser code.
- Use short-lived access credentials, refresh-token rotation/reuse detection and session revocation when the identity service is implemented.
- Hash passwords with a modern memory-hard password hashing scheme if PLUITS owns password authentication; never store or log plaintext passwords.
- Require step-up authentication for high-risk actions; MFA support is a target for privileged accounts.
- Validate input, constrain payload sizes, use parameterized SQL, enforce rate limits at the edge and service layer, and apply abuse controls.
- Use TLS in transit, encrypted backups/storage, key rotation and tested restore procedures.
- Protect against IDOR, CSRF where cookie auth is used, SSRF, injection, replay, brute force, credential stuffing and enumeration.
- Record security-relevant events without logging passwords, access tokens, payment credentials, private message bodies or identity documents.
- Run dependency scanning, static analysis, secret scanning, fuzz/property tests and authorization regression tests in CI.
- Security is layered; no single middleware or RLS policy makes a system invulnerable.

## 10. Global and scalable data rules

- Use UUID/ULID identifiers that do not encode personal information.
- Store timestamps as UTC instants; store local timezone identifiers separately for business schedules.
- Use ISO 3166 country codes, ISO 4217 currency codes, E.164 phone numbers and BCP 47 language tags.
- Use exact decimal/numeric values for money; never floating point. Store currency with every monetary amount.
- Address and geospatial models must support international formats; do not assume Indonesian provinces or postal codes globally.
- Use cursor pagination, bounded query sizes, explicit indexes and query timeouts.
- Keep transactional relational data in PostgreSQL; use object storage for media and large files, search infrastructure for search, and specialized realtime/SFU services for calls and Live.
- Partition/archive only after measured access patterns and operational tooling exist; premature sharding increases failure modes.
- Design APIs and events for idempotency, versioning and backward compatibility.

## 11. Delivery order

1. Backend platform hardening, CI, configuration, observability and migration safety.
2. Identity bridge and authorization model mapped to the existing Supabase Auth/profile/workspace records.
3. Profile/context, sessions, security settings and workspace dashboard APIs.
4. Social and messaging domain parity.
5. Media pipeline, Reels, calls and Live infrastructure.
6. GeoDirectory and Marketplace parity.
7. Store and Restaurant & Café operations.
8. Transport provider, fleet, driver, quote, dispatch and booking.
9. Accommodation property, inventory, rate and reservation.
10. Trips, tickets, notifications, analytics and regional expansion.

The order can evolve with approved product priorities, but no domain is marked production-ready without API contracts, migrations, authorization tests, operational monitoring, backup/restore evidence and a rollback plan.

## 12. Explicit non-goals at this stage

- No production Supabase changes, data exports or account cutover.
- No fake accounts, listings, reservations, vehicles, reviews, balances or activity.
- No paid infrastructure provisioning without explicit approval.
- No claim of unlimited physical capacity or absolute security.
- No enforcement of proposed membership tiers or unapproved commercial entitlements.
