# CREATE-EXPERIENCE-001 — Social-First Mobile Create and Desktop Workspace

Status: **APPROVED / FRONTEND IMPLEMENTATION IN PROGRESS**
Owner: Product Design + Platform Wrapper
Consumers: Authenticated Create entry at `/pluits/dashboard/`

## Purpose
Provide one Create destination with two intentional responsive experiences. Mobile is a compact daily social publishing launcher. Desktop is a professional Dashboard / Ruang Kerja that can grow into a broader productivity environment. Mobile must not be a compressed desktop dashboard.

## Mobile information architecture
1. Page identity: **Create**.
2. Primary social actions, placed first and given the strongest visual priority:
   - Story
   - Post
   - Artikel (Blog)
   - Live
4. Other productivity tools and ecosystem modules are not displayed in the initial mobile experience. Add them incrementally only when their modules are ready and approved.

The initial mobile screen must remain simple, complete for its current scope, visually polished, touch-friendly, and free from desktop management panels, tabs, resize controls, and broad module navigation.

## Desktop information architecture
Desktop Create remains the professional **Dashboard / Ruang Kerja**. It may use a broader workspace composition, module navigation, tabs, work area, and supporting social panel. Future approved tools may include document editing, presentations, invoices, personal design tools, reusable personal frames/templates for daily and holiday posts, and personal files/workspace. These future modules are roadmap items, not a commitment to display or activate them now.

## Identity and behavior
- One PLUITS account and identity across mobile and desktop.
- Responsive composition may differ; route, authentication, permissions, and data ownership remain shared.
- Mobile Story/Post/Artikel/Live controls are entry points only. They must not imply live publishing while composer and backend services are unavailable.
- Existing modules, data, routes, and backend contracts must not be deleted to simplify the mobile presentation.

## Visual foundation
Use existing PLUITS design tokens, page shell, and local icon registry. Do not add an external icon package, new global tokens, or unapproved assets. Use clear icon silhouettes, concise labels, subtle surfaces, restrained borders, consistent spacing, visible focus, and responsive touch targets.

## Implementation mapping
- `src/features/dashboard/dashboard-page.js`: mobile Create entry-point structure and routing into existing social/blog dashboard views.
- `src/features/dashboard/dashboard-page.css`: mobile-only social-first composition; desktop workspace remains intact.
- `src/features/dashboard/README.md`: module responsibilities and responsive behavior.
- `src/CHANGE-MAP.md`: route and implementation mapping.

## Dependencies and consumers
Uses existing `src/design-system/tokens.css`, `page-shell.js`, `page-shell.css`, and `icons.js`. Does not change shared tokens, icons, routes, auth, backend, database, or sibling features.

## Validation
- Mobile: verify 360px, 390px, 420px widths; four social actions in the first row; no desktop module sidebar/tabs/resizers/social side panel; no horizontal overflow.
- Desktop: verify Dashboard work area, module navigation, tabs, resizers, and social panel remain available.
- Keyboard: all visible actions focusable with visible focus.
- Reduced-motion and safe-area behavior must remain consistent with the shared foundation.
- Run `npm test` and `npm run build`; verify GitHub Pages deployment.


## Mobile Create refresh — social + business hub
The mobile greeting is time-aware and personal: "Selamat pagi/siang/sore/malam, [nama depan]" followed by "Apa yang ingin Anda bagikan hari ini?" The primary social actions are Story, Post, Artikel (Blog), and Live. A subtle horizontal divider closes this publishing area.

Below the divider, show a separate **Ruang Bisnis** section with four entry concepts:
1. **Buat Toko** → after a Store exists, the label/action becomes **Kelola Toko**.
2. **Buat Layanan** → after a Service exists, it becomes **Kelola Layanan**.
3. **Klaim Tempat** → once a Geo Directory place is claimed/verified for the account, it becomes **Kelola Tempat**.
4. **Tambahkan Bisnis** → the extensible route for other business categories and industries.

A physical Store location should be associated with its Geo Directory place record where one exists. Store and Place remain separate domain records with a relationship; do not assume every Store automatically owns or claims a Place. If a user requests an industry/category without an available module, provide a future request-to-Plugins workflow for evaluation. Approved requests may be scheduled for a new module. Category catalog, plugin review, provisioning, and the entity-state-driven create/manage transitions require backend contracts and are not implemented by this visual update.

No sample ownership state may be fabricated. "Kelola" labels must only appear when verified account/business/place records authorize them. Desktop Create remains unchanged.


## Mobile visual refinement — professional navigation
The mobile Create visual language uses a restrained editorial composition, not a grid of oversized launcher cards:
- Greeting and supporting question establish a clear typographic hierarchy.
- Story, Post, Artikel, and Live are full-width navigation rows with compact monochrome icons, concise supporting descriptions, subtle separators, and a directional affordance.
- A thin divider clearly separates social publishing from business management.
- Ruang Bisnis uses a matching full-width list. Each row has a compact icon, business name, short explanation, trailing action label, and directional affordance.
- Use the existing PLUITS design tokens and icon registry. Do not add new global tokens, icon packages, gradients, decorative illustrations, or oversized rounded cards.
- The business rows remain informational until the relevant creation, claim, and management flows are connected to authorized backend records.
- Desktop composition remains unchanged.


## Mobile compact grid composition
- Arrange Story, Post, Artikel, and Live in a balanced two-column grid to reduce vertical page length.
- Arrange the four Ruang Bisnis entries in a matching two-column grid, with their action labels below the description.
- Use compact, restrained bordered surfaces, small monochrome icons, and clear text hierarchy; avoid oversized playful tiles.
- Preserve two columns on narrow devices with reduced internal spacing and readable wrapping.
- Desktop Create remains unchanged.
