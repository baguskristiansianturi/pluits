# Fluids Messaging — 03 PROJECT

Status: **FOUNDATION PLANNED**

## Project controls
This folder tracks the Fluids Messaging work independently from Social Media and Marketplace. Shared dependencies are tracked explicitly; they do not transfer module ownership.

## Required project records
1. Scope and non-goals.
2. Feature register with owner, status, dependencies, acceptance criteria, and evidence.
3. Milestones and release sequence.
4. Decision log and open questions.
5. Change log and current implementation status.
6. Deployment, rollback, and UAT evidence.

## Suggested staged roadmap
- **Stage 0 — Discovery & boundaries:** audit current Messages route, runtime tree, backend messaging contracts, identity, notifications, media, and social/marketplace entry points.
- **Stage 1 — Product & security design:** approve flows, data model, permissions, privacy, safety, and retention.
- **Stage 2 — Core direct messaging:** conversation requests, text messages, persistence, reliable delivery state, inbox/unread and basic realtime.
- **Stage 3 — Mature chat essentials:** groups, reply, reactions, attachments/voice notes, search, mute/archive/pin, and notification preferences.
- **Stage 4 — Integrations:** Social Media and Marketplace entry points via stable contracts; merchant/order context only through authorized references.
- **Stage 5 — Standalone readiness:** independent app shell/route, app metadata, deep links, PWA/mobile install, release and operational readiness.
- **Stage 6 — Voice/video:** separate approval and infrastructure gate; not implied by prior stages.

Do not mark a stage IMPLEMENTED, DEPLOYED, TESTED, or ACCEPTED without the corresponding evidence.
