# User Dashboard / Create

Owner: platform-wrapper / features/dashboard  
Status: responsive Create prototype implemented; visual acceptance and operational integrations pending.  
Route: `/pluits/dashboard/`

## Product responsibilities
- Provide one authenticated Create destination using the user's single PLUITS identity.
- On mobile, act as a compact social-first creation launcher rather than a compressed desktop dashboard.
- Put Story, Post, Reel, and Live first as the primary daily social actions; keep Blog as a prominent publishing entry directly below.
- Hide broader account administration, module navigation, desktop tabs, resize controls, and the desktop social side panel from the initial mobile Create composition. Future tools are added incrementally when ready.
- On desktop, retain the professional Dashboard / Ruang Kerja with module navigation, tabs, work area, and supporting Social PLUITS panel.
- Keep profile, business identity, transactions, settings, and ecosystem modules under their existing ownership; hiding them from the initial mobile Create surface does not delete their routes or data.

## Future workspace direction
Desktop Create may expand over time with document editing, presentations, invoices, personal design tools, personal-use frames/templates for daily and holiday posts, and personal files. These are future roadmap items and are not displayed as active mobile tools now.

## Account boundaries
- PLUITS Auth identity is the single sign-in identity.
- Personal Social Account remains the user's personal identity for social interaction and buyer-side activity.
- Business Account remains a separate business identity associated with the personal account.
- Marketplace remains the customer-facing discovery/transaction layer. Store and Restaurant & Café retain merchant-operation ownership under Marketplace.

## Runtime and truthfulness
The current prototype is presentation-only for creation actions. Story/Post/Reel/Live and Blog entries lead to the existing Social Media / Blog Studio views; they do not claim to publish content. Publishing, draft persistence, account profile updates, business creation, transaction data, notifications, and Inbox require their respective PLUITS-owned services and server-side authorization. No fabricated posts, conversations, orders, revenue, or engagement data are allowed.

## Shared foundation and ownership
- Layout: `LAY-USER-DASHBOARD-001` plus `CREATE-EXPERIENCE-001`.
- Shared shell: `src/design-system/page-shell.js` and `page-shell.css`.
- Tokens: `src/design-system/tokens.css`.
- Icons: existing `src/design-system/icons.js` registry only.
- Runtime ownership: `dashboard-page.js` and `dashboard-page.css`.
- No new global token, icon, font, external UI dependency, route, backend migration, or shared shell change is introduced.

## Validation
Run `npm test` and `npm run build`. Verify mobile 360px/390px/420px, social-first action hierarchy, Blog entry, no desktop management panels or horizontal overflow, visible keyboard focus, and desktop workspace panels/tabs/resizers. Real-device UAT, deployment verification, backend integration, and founder visual acceptance remain separate checks.


## Create header utilities
- Mobile Create header shows three compact utility icons in left-to-right order: Wishlist, Shopping Cart, Notifications. Therefore Notifications is the rightmost icon.
- These are visual navigation affordances only at this stage; no click behavior, unread counts, cart data, saved items, or notification events are fabricated.
- Recently Viewed is a separate future discovery/history concept, not a synonym for Wishlist. It is intentionally not displayed until its scope and placement are approved.
- Future notification aggregation may include comments, comment replies, social interactions, and events from other PLUITS modules. Delivery rules and interaction flows are deferred to the notification service design.
- Desktop workspace header actions remain unchanged.
