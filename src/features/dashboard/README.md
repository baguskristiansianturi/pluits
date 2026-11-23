# User Dashboard / Create

Owner: platform-wrapper / features/dashboard  
Status: responsive Create prototype implemented; visual acceptance and operational integrations pending.  
Route: `/pluits/dashboard/`

## Product responsibilities
- Provide one authenticated Create destination using the user's single PLUITS identity.
- On mobile, act as a compact social-first creation launcher rather than a compressed desktop dashboard.
- Present Story, Post, Reel, Live, and Blog as the primary daily social actions in a restrained, full-width navigation list.
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


## Mobile Create: social, Fluid Partner, locations, and classifieds
- The mobile heading uses a time-aware greeting with the signed-in user's first display-name token, followed by: "Apa yang ingin Anda bagikan hari ini?"
- The five social-first actions are Story, Post, Reel, Live, and Blog. Blog opens the existing Blog Studio entry; no publishing success is implied.
- A subtle divider separates social publishing from the business and location tools.
- The business creation area is titled **Fluid Partner** and contains one prominent **+ Buat** card. Pressing it opens a near-full-width floating panel over the existing Create screen; it does not navigate to another route or expand inline.
- The first Fluid Partner layer lists parent categories. Selecting a parent opens a second near-full-width layer above the first, showing its subcategory cards. The parent layer remains visible beneath the child layer, and the child layer has a back action. Unreleased subcategories remain visible with lock icons and are non-interactive.
- Beneath Fluid Partner, **Tambahkan dan klaim lokasi** provides a search field to check Geo Directory before creating a new place. A create/add action leads into the existing Geo Directory module. Authorized places linked to the account should appear as separate location cards beside the add action; never fabricate location ownership or sample places.
- Below locations, **Iklan Baris** has a **+ Buat iklan** action. It opens a floating panel asking what kind of listing the user wants to create, then presents the classifieds/job categories.
- Store and Service labels, partner profiles, claimed places, and owned-location cards must be derived from authorized server records, never guessed or simulated. A Store and its physical place remain distinct records.
- Search, create, claim, persistence, category release, and ownership checks require their dedicated APIs and server-side authorization. The current frontend must clearly indicate where these integrations are still pending.

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


## Mobile Create — clarified visual system
- White is the dominant canvas and card surface.
- Use soft neutral grey consistently for borders, dividers, and the secondary Ruang Bisnis background; avoid green-tinted grey surfaces.
- PLUITS logo teal is an accent only, used sparingly on small icon treatments or selected highlights rather than as a dominant card/background color.
- On phone layouts, Story, Post, Reel, Live, and Blog must appear as five compact icon tiles in one horizontal row. Hide their supporting descriptions at this width so labels remain legible.
- Ruang Bisnis remains a two-column card grid with enough room for its descriptions.
- Desktop Dashboard remains unchanged.


## Mobile Create — social icon tile treatment
- Story, Post, Reel, Live, and Blog remain in one five-column row on phone widths.
- Each action uses a visibly larger, centered social icon inside its own white square tile with a soft grey border.
- The action label sits directly below the tile with a very small gap (approximately 2px); use a compact, readable label size.
- Keep the action surface itself visually light and avoid a second enclosing card, descriptions, arrows, or oversized padding.
- Teal is limited to the icon accent; white remains dominant and grey remains the border/separator color.


## Fluid Partner, location, and classifieds — mobile interaction hierarchy
- Fluid Partner uses a single + Buat tile and a two-layer parent → subcategory flow. The second panel floats above the first; it is not a new route or inline expansion.
- Location tools include a Geo Directory search field, an add/create action, and a future list of account-linked places. Only verified server records may populate owned-place cards.
- Classifieds uses a + Buat iklan tile that opens a panel asking what kind of listing to create, followed by category choices.
- All surfaces are mobile-first, keyboard accessible, and use existing design tokens. Backend search, create, claim, persistence, and authorization remain pending.


## Expanded mobile Ruang Bisnis categories
- Struktur final mobile Ruang Bisnis memiliki tepat dua kartu: PLUITS Partner dan Tempat.
- PLUITS Partner membuka katalog kategori mitra. Kategori Toko & Perdagangan memuat rumpun toko/retail, sedangkan Makanan & Minuman memuat Kafe dan Restoran beserta jenis usaha makanan-minuman lainnya.
- Tempat membuka Geo Directory. Kartu ini tetap terpisah karena tempat fisik dan akun/mitra usaha merupakan entitas yang berbeda.
- Pemilihan atau pembukaan katalog hanya navigasi. Tidak ada akun bisnis yang dibuat, tempat yang diklaim, atau kepemilikan yang dianggap terverifikasi; seluruh alur tersebut tetap memerlukan API dan otorisasi server.


## PLUITS Partner — mobile category catalogue
- The mobile Ruang Bisnis entry list includes exactly two cards: PLUITS Partner and Tempat. There are no separate Toko, Kafe, or Restoran cards.
- Selecting PLUITS Partner expands the catalogue inline on the mobile Create page; it does not claim or create a business account.
- The catalogue uses parent categories with subcategory cards. Current parent groups: Transportasi; Toko & Perdagangan; Akomodasi; Ticketing & Perjalanan; Layanan Profesional; Makanan & Minuman; Properti & Ruang; Iklan Baris & Lowongan; and Mitra Lainnya.
- Every subcategory card displays a lock icon and a short scope description. Locked cards are informational articles, not active buttons.
- The taxonomy is an initial planning catalogue and must be reviewed against existing module boundaries before operational work begins.
- Existing Store and Restaurant & Café modules retain their operational ownership. Partner discovery/listings must link to those modules through contracts instead of cloning their operational systems.
- Unlocking is a future manual admin-controlled release action after the relevant module passes its readiness criteria. The current lock state is presentation-only and is not a security/authorization control.
- Desktop Dashboard / Ruang Kerja is unchanged.
