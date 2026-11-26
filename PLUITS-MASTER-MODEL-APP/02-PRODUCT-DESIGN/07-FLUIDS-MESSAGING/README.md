# Fluids Messaging — Product Design

Status: **IN-DESIGN / OWNER REVIEW REQUIRED**

This is the canonical product-design entry for Fluids Messaging. It complements the ecosystem model's four work lanes and the technical architecture in Application Modularization.

## Product direction
Fluids is the PLUITS communication experience: integrated with PLUITS Social Media and Marketplace at first, but designed for future independent app delivery. The target is a reliable, feature-rich, mobile-first messaging product with interaction quality comparable to mature messaging applications such as WhatsApp, while retaining PLUITS's own identity and visual system.

## Experience principles
- Messaging is a primary communication product, not a small social-media subfeature.
- Conversation list and chat should feel fast, clear, and dependable on Android/mobile and desktop.
- Never present queued, sent, delivered, read, online, or played states unless the corresponding event is confirmed and defined.
- Keep direct and group conversations, message requests, attachments, voice notes, search, and conversation management behind explicit staged acceptance criteria.
- Privacy, user control, accessibility, and trust/safety are product requirements, not later polish.
- Integrations preserve context through authorized references/deep links without exposing merchant/order private data.

## Design areas to specify
1. Inbox and conversation list.
2. Direct chat and group chat.
3. Composer, text, reply, reaction, edit/delete, forwarding.
4. Media/attachment and voice-note experience.
5. Delivery/read receipts, presence, typing, and notification behavior.
6. Search, archive, mute, pin, unread, and conversation settings.
7. Message requests, block, report, privacy, retention, and safety.
8. Social Media and Marketplace entry points.
9. Standalone Fluids app navigation, identity, deep links, and install experience.

## Existing historical reference
A WhatsApp-style Inbox architecture and two-account UAT plan exist under PLUITS-SHARING-INBOX/LEGACY-TO-SORT/PLUITS-CORE-REFERENCES/. They are historical reference material, not automatically active requirements. The earlier notes describe a Supabase implementation, while the current repository engineering directive requires PLUITS-owned Go API + PostgreSQL and forbids hosted-backend SDK/provider-bound runtime. Audit and reconcile useful behavior/data contracts without restoring prohibited infrastructure or assuming legacy UAT passed.

## Acceptance
Each design area must have approved flows, state definitions, edge cases, accessibility/responsive specs, privacy/safety rules, and testable acceptance criteria before runtime implementation.
