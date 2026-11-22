# Social Media — Application Modularization

Blueprint teknis khusus Social Media: module boundaries, frontend routes/pages/components/state/styles, backend domains/services/rules, database entities and ownership, API and event contracts, auth/roles/permissions, security, observability, testing, deployment boundaries, rollout dan rollback.


## Account settings runtime contract

- Settings categories are rendered as an accessible tablist; every tab exposes its selected state and controls one labelled panel.
- The active category remains visible and keyboard-focusable on desktop and mobile. Arrow keys move between categories; Home and End move to the first and last category.
- Account, privacy, notification, and profile-theme sections report unavailable server capabilities honestly. They must not imply that an unsaved UI-only toggle changed account data.
- Runtime ownership: `src/features/social/social-pages.js` and `src/features/social/social-pages.css`.
