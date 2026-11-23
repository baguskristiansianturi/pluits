# User Dashboard / Create

Owner: platform-wrapper / features/dashboard  
Status: responsive Create prototype implemented; visual acceptance and operational integrations pending.  
Route: `/pluits/dashboard/`

## Product responsibilities
- Provide one authenticated Create destination using the user's single PLUITS identity.
- On mobile, act as a compact social-first creation launcher rather than a compressed desktop dashboard.
- Present Story, Post, Artikel (Blog), and Live as the primary daily social actions in a restrained, full-width navigation list.
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
The current prototype is presentation-only for creation actions. Story/Post/Live and Artikel (Blog) entries lead to the existing Social Media / Blog Studio views; they do not claim to publish content. Publishing, draft persistence, account profile updates, business creation, transaction data, notifications, and Inbox require their respective PLUITS-owned services and server-side authorization. No fabricated posts, conversations, orders, revenue, or engagement data are allowed.

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


## Mobile Create: social and business entry points
- The mobile heading uses a time-aware greeting (morning, afternoon, evening, or night) with the signed-in user's first display-name token, followed by: "Apa yang ingin Anda bagikan hari ini?"
- The four social-first actions are Story, Post, Artikel (Blog), and Live. They appear as full-width navigation rows with compact monochrome icons, supporting descriptions, restrained separators, and a directional affordance. Artikel opens the existing Blog Studio entry; no publishing success is implied.
- A subtle divider separates social publishing from a dedicated "Ruang Bisnis" section.
- The business section contains four entry concepts: Buat Toko, Buat Layanan, Klaim Tempat, and Tambahkan Bisnis.
- Store and Service labels are state-driven in the future: after creation, "Buat Toko"/"Buat Layanan" must become "Kelola Toko"/"Kelola Layanan". A claimed Geo Directory place becomes "Kelola Tempat". These labels must be derived from authorized server records, never guessed or simulated.
- A Store with a physical address should link to its corresponding Geo Directory place record when available; the store and place are related but distinct records. Do not create duplicate place listings automatically.
- "Tambahkan Bisnis" is the extensible entry for industries/categories not yet represented. If no suitable module exists, the user can submit a category request to Plugins for evaluation; accepted requests may lead to a new PLUITS module. The request/review/provisioning flow is future work.
- The four business cards are currently informational presentation only. Creation, claiming, management, category requests, and ownership checks require their dedicated flows, APIs, and server-side authorization.


## Professional mobile visual refinement
- Mobile Create uses a restrained editorial hierarchy rather than a grid of large action cards.
- Social actions are full-width navigation rows with compact monochrome icons, clear labels, concise supporting copy, and subtle separators.
- Business entry points use a separate, similarly structured list with the action label at the trailing edge.
- Existing PLUITS typography, color, spacing, and border tokens remain the source of truth; no new global tokens or icon assets are introduced.
- Desktop Dashboard / Ruang Kerja and its panels, tabs, and navigation are unchanged.


## Mobile Create compact layout
- Social creation actions and business entry points use a balanced two-column grid on mobile to reduce excessive vertical scrolling.
- Compact bordered surfaces retain the professional, restrained visual language; icons remain secondary to labels and descriptions.
- Very narrow devices receive tighter spacing while retaining the two-column layout.
- Desktop dashboard remains unchanged.


## Mobile Create surface and background hierarchy
- Use a clean white canvas as the primary mobile Create background.
- Use restrained translucent neutral/canvas surfaces only to distinguish secondary areas, especially the Ruang Bisnis section; keep the social publishing area visually open.
- Keep the entry cards as the foreground surfaces with subtle borders and minimal shadow, avoiding heavy panels, strong gradients, or stacked opaque boxes.
- Use a soft fading divider to separate social publishing from business entry points.
- Scope all background treatment to the mobile Create view; desktop Dashboard and other mobile views remain unchanged.
