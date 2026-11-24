# Stories — Checklist & Audit

## Product and UX
- [ ] User journeys, routes, page inventory, and acceptance criteria reviewed.
- [ ] Loading, empty, error, permission, offline, and edge states covered.
- [ ] Responsive behavior checked on narrow mobile and desktop.
- [ ] Keyboard, screen-reader labels, focus, contrast, and reduced-motion needs checked.
- [ ] Module-specific interactions follow this module's own documented rules.

## Architecture and isolation
- [ ] Module owns its domain rules, state, components, and CSS.
- [ ] No accidental dependency on another module's private CSS, DOM, or state.
- [ ] Shared foundation usage is documented; no duplicate global tokens/assets.
- [ ] Route, API, event, and content-reference contracts are versioned/documented.
- [ ] Account ownership, authorization, and audience filtering are enforced server-side.

## Safety, privacy, and operations
- [ ] Privacy, audience, retention/expiry, reporting, moderation, and abuse cases reviewed.
- [ ] Media upload/delivery and access control reviewed where applicable.
- [ ] Rate limits, observability, incident handling, and rollback considered.
- [ ] No UI-only simulation is represented as a production transaction or state.

## Release evidence
- [ ] Unit/component tests pass.
- [ ] Integration and regression tests pass.
- [ ] Performance budget and accessibility checks pass.
- [ ] PR, commit, build, deployment, and post-deploy smoke test are recorded.
- [ ] Cross-module consumers and regression impact have been reviewed.
