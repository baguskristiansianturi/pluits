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
   - Reel
   - Live
3. Blog remains a first-class social publishing entry directly below the four quick actions.
4. Other productivity tools and ecosystem modules are not displayed in the initial mobile experience. Add them incrementally only when their modules are ready and approved.

The initial mobile screen must remain simple, complete for its current scope, visually polished, touch-friendly, and free from desktop management panels, tabs, resize controls, and broad module navigation.

## Desktop information architecture
Desktop Create remains the professional **Dashboard / Ruang Kerja**. It may use a broader workspace composition, module navigation, tabs, work area, and supporting social panel. Future approved tools may include document editing, presentations, invoices, personal design tools, reusable personal frames/templates for daily and holiday posts, and personal files/workspace. These future modules are roadmap items, not a commitment to display or activate them now.

## Identity and behavior
- One PLUITS account and identity across mobile and desktop.
- Responsive composition may differ; route, authentication, permissions, and data ownership remain shared.
- Mobile Story/Post/Reel/Live and Blog controls are entry points only. They must not imply live publishing while composer and backend services are unavailable.
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
- Mobile: verify 360px, 390px, 420px widths; four social actions in the first row; Blog entry below; no desktop module sidebar/tabs/resizers/social side panel; no horizontal overflow.
- Desktop: verify Dashboard work area, module navigation, tabs, resizers, and social panel remain available.
- Keyboard: all visible actions focusable with visible focus.
- Reduced-motion and safe-area behavior must remain consistent with the shared foundation.
- Run `npm test` and `npm run build`; verify GitHub Pages deployment.
