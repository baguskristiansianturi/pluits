# Fluids Messaging — Frontend Shell & Navigation Design

Status: **FRONTEND PROTOTYPE / BACKEND NOT CONNECTED**

## Global messaging shell
When the user enters PLUITS Messages, the global PLUITS navigation is replaced by Fluids Messaging's own five-item bottom navigation. This is a context-specific communication workspace, not a change to global navigation for other PLUITS routes.

### Header
- PLUITS logo/brand at the left.
- Three-dot overflow control at the right.
- Overflow menu opens messaging settings and privacy/security entry points.
- Header stays compact and sticky on mobile.

### Bottom navigation
Exactly five positions, with a professional line icon and small label below each icon:
1. Chat
2. Story
3. + (center create/share action)
4. Kontak
5. Panggilan

The five items must remain in one row on supported mobile widths. Use equal-width columns, consistent icon size, restrained label size, accessible touch targets, and active-state contrast. The central plus is visually distinct but remains aligned within the same navigation row.

## Feature behavior in the frontend-first phase
- Chat: inbox/search surface with honest empty state until conversations are connected.
- Story: story introduction/creation entry; publishing and audience rules are future backend-backed work.
- +: opens a file selection flow for image or document; after selection, user chooses a contact and sees a ready-to-send state. This prototype must not upload or send files.
- Kontak: contact search/list surface; current preview entries must be clearly labeled as placeholders, not real PLUITS contacts.
- Panggilan: call history/entry surface; voice/video calls remain unavailable until signaling and media infrastructure exist.

## Visual direction
Use approved PLUITS brand tokens, professional consistent outline icons, white/light neutral surfaces, subtle dividers, small labels, and deliberate spacing. Avoid emoji icons, mixed icon styles, over-large nav text, and styling leakage into other features.

## Four development lanes for every feature
Each of the five navigation destinations (Chat, Story, +, Kontak, Panggilan) follows all four lanes:
- Design: UX flow, states, privacy/safety, accessibility and acceptance criteria.
- Development: isolated frontend module, API/event contract, state handling and technical ownership.
- Project: scope, dependencies, milestone, status and evidence.
- Checklist-Audit: functional, responsive, accessibility, security/privacy, integration and regression checks.

The four lanes are governance lanes, not a cap on the number of rules or feature requirements.

## Frontend prototype constraints
- Frontend-first only; no messaging backend or realtime is implied.
- No fake conversation, call history, delivered/read receipt, online state, or production contact data.
- File chooser can read the chosen filename in the browser UI, but does not upload or transmit the file.
- A ready-to-send button is a preview affordance only; it must not claim successful sending.
- Do not change global PLUITS bottom navigation on routes outside Messages.
