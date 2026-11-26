# Fluids Messaging — 01 DESIGN

Status: **IN-DESIGN**

## Purpose
Define product behavior and user experience before runtime changes. Product Design canonical details belong in ../../../02-PRODUCT-DESIGN/07-FLUIDS-MESSAGING/; this folder is the design work lane and decision entry point.

## Required design rules
1. Establish audience, use cases, conversation eligibility, message request flow, and user journey before styling.
2. Define direct and group conversation lifecycle: create, invite, accept/decline where required, leave, remove member, close/archive.
3. Define message lifecycle and semantics: compose, send, retry, delivered/read, reply, reaction, edit/delete, forward, and report. Each state must be truthful and testable.
4. Design privacy and safety from the start: block, report, message requests, group invite permissions, visibility/presence controls, and user consent.
5. Keep Social Media and Marketplace as entry-point consumers. Do not copy their private page layout or CSS into Fluids.
6. Mobile-first responsive design, accessible controls, keyboard support, clear empty/loading/error/offline states, and approved Platform UI Foundation assets are mandatory.
7. Do not invent product decisions silently. Record unresolved choices and request owner decision before implementing behavior.

## Design deliverables
- Information architecture and screen inventory.
- User flows and state diagrams.
- Conversation/message behavior matrix.
- Privacy, safety, notification, retention, and attachment rules.
- Approved mobile/desktop interaction and responsive specs.
- Acceptance criteria and out-of-scope list.

## Historical reference and reconciliation
The legacy PLUITS Inbox WhatsApp-style architecture and two-account UAT records in PLUITS-SHARING-INBOX/LEGACY-TO-SORT/PLUITS-CORE-REFERENCES/ describe a prior direct-message/voice-note design. They are historical reference, not automatic active requirements. Earlier notes describe Supabase; the current repository directive requires PLUITS-owned Go API + PostgreSQL. Retain useful user-facing behaviors for review, but do not restore prohibited hosted-backend SDKs or assume historical UAT passed.
