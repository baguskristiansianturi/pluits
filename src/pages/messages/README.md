# Inbox Page Module

## Ownership

- Canonical route: `#/inbox` (the app's route resolver also supports the deployed path form).
- Page entry: `src/pages/messages/index.js`.
- Page styles: `src/pages/messages/messages.css`.
- Message settings: `src/pages/messages/settings.js` and `settings.css`.
- Conversation sidebar: `src/features/inbox/inbox-sidebar.js`.
- Message UI helpers: `src/features/inbox/message-ui.js`.
- Route selection and page mounting: `src/app/router.js`.
- Navigation destination: `ROUTES.inbox` in `src/components/social/navigation-routes.js`.

## Responsibilities

`pages/messages/` owns the route-level Inbox workspace and its page-specific composition/styles. `features/inbox/` owns reusable conversation UI and domain sections. The router only resolves the URL, imports the page entry, renders it, and binds its interactions; navigation only links to the canonical route.

## Change boundaries

- Keep desktop and mobile on the same canonical Inbox URL; use responsive CSS for layout changes.
- Keep Inbox styles scoped to Inbox selectors. Do not edit homepage/global styles to change Inbox.
- Keep the conversation-list markup in the feature that renders it; tests must inspect that module rather than assume markup is inline in the page entry.
- Preserve existing exports `messagesPage()` and `bindMessagesPage()` unless all callers and tests are updated together.
- Do not create a second Inbox page under `inbox-personal/` or `inbox-toko/`; those folders are reserved roadmap areas, not active routes.
