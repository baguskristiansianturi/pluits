# Fluids Messaging — 04 CHECKLIST-AUDIT

Status: **RELEASE GATES**

## Mandatory audit checklist
### Governance and boundaries
- [ ] Approved design scope and unresolved decisions recorded.
- [ ] Fluids has a named source/runtime owner and explicit module root.
- [ ] Social Media, Marketplace, Store, and Restaurant & Café integrations use documented contracts.
- [ ] No private sibling imports, CSS leakage, DOM/state/storage coupling, or unreviewed shared changes.

### Product and functional quality
- [ ] Direct/group conversation flows and message request policy tested.
- [ ] Loading, empty, error, offline, reconnect, retry, and duplicate-send states are truthful.
- [ ] Delivery/read state reflects server-confirmed events only.
- [ ] Message ordering, pagination, search, unread, archive/mute/pin behavior meets acceptance criteria.
- [ ] Attachment/voice-note constraints and failure cases tested.

### Security, privacy, and safety
- [ ] Positive and negative authorization tests for every conversation/message/media operation.
- [ ] Block/report, invite permissions, privacy, retention, and deletion behavior verified.
- [ ] No unauthorized conversation enumeration or private media access.
- [ ] Rate limits, abuse controls, audit events, and sensitive-data handling reviewed.
- [ ] No secrets, personal data, or test records exposed.

### Technical and release
- [ ] Additive migrations validated; applied migrations unchanged.
- [ ] API contract, realtime events, idempotency, reconnect sync, and error semantics tested.
- [ ] `npm test` and `npm run build` pass; relevant Go tests/race tests and migration integration tests pass.
- [ ] Consumer regression checks cover Social Media and Marketplace entry points.
- [ ] Workflow/deployment evidence, rollback steps, and mobile browser UAT recorded.
- [ ] Statuses reported separately: IMPLEMENTED / DEPLOYED / TESTED / ACCEPTED.

A passing build alone is not acceptance. Any unchecked security or data-integrity gate blocks release.
