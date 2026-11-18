# PAGE-USER-DASHBOARD — User Dashboard

Status: PROTOTYPE IMPLEMENTED — product-owner visual review pending; operational integrations are not implemented.  
Page ID: \`PAGE-USER-DASHBOARD\` · Layout: \`LAY-USER-DASHBOARD-001\` · Owner: Platform Wrapper & User Journeys  
Route: \`#/dashboard\` (authenticated users only)

## Purpose
Dashboard is the single authenticated control center for a PLUITS user. It is a continuous environment for managing the personal identity, business identities, work, transactions, social activity, and settings connected to one PLUITS account. Users must not need to sign out or authenticate again when moving between eligible modules.

## Entry and navigation
- Successful login routes directly to Dashboard.
- An authenticated visit to Login, Registration, or Forgot Password routes to Dashboard.
- Signed-in account avatar/name on Global Home opens the protected Dashboard at \`#/dashboard\`.
- Guest access to Dashboard redirects to Login.
- The PLUITS logo always returns to Global Home at \`#/home\`.
- Workspace is an internal engineering term only; it is not a separate user-facing page or route.
- Open pages appear as tabs across the top. Users can switch between open tabs and close tabs other than the Dashboard root tab.
- Opening a module from the left navigation creates or activates its tab. The same module must not be duplicated as multiple tabs in the initial implementation.
- Global notifications and Inbox entry points remain available from the Dashboard header.

## Desktop composition
The desktop Dashboard uses three primary areas:
1. Left — Module Navigation: grouped links to Dashboard, account controls, and PLUITS ecosystem modules.
2. Center — Active Work Area: the currently selected page, account setting, transaction view, or module management surface.
3. Right — Social PLUITS: a persistent compact social panel for Feed, Story, and Inbox access while work continues.

The left and right panels are resizable by dragging their separators. Keyboard arrow keys provide an accessible resize alternative. Both panels can be hidden and restored independently. Panel widths and visibility are presentation preferences and may be saved locally; they are not account or business data.

The center area uses the remaining available width. The top page tabs preserve the user's open-page context while switching between areas.

## Tablet and mobile composition
- Tablet prioritizes module navigation and the active work area; the right social panel is hidden to protect usable content width.
- Mobile is a management-first experience. The social side panel is omitted; module navigation becomes a horizontally scrollable navigator and the active management view occupies the available width.
- Mobile and desktop retain the same canonical route and authenticated identity.
- Use existing responsive tokens and breakpoints; do not introduce a competing breakpoint scale.

## Account model and Dashboard responsibilities
- One PLUITS authentication identity is the user's primary identity across the platform.
- Personal Social Account is the identity used for personal profile, social publication, interaction, and customer-side transactions.
- Business Account is a separate business identity connected to the personal PLUITS account; it does not require a second login.
- Each individual Business Account is one type: Store or Service. The Dashboard must not combine both types into one business identity.
- The number of Business Accounts a personal account may create remains an open product decision; the initial interface must not impose an undocumented account limit.
- Personal profile and account preferences are managed from Dashboard. The public-facing social profile remains a Social Media surface when its owning route is available.
- Account Settings are grouped into account/security, privacy, addresses, bank accounts, and notification preferences.

## Social Media entry
The Dashboard provides an entry to the personal Social Media area. The planned content formats include Feed, Story, Reels, Live, and Personal Blog.
Personal Blog uses the existing five approved product-design template names: AURELIA, STAVERO, BREWNOX, ROVANTA, and LUNELLE. The Dashboard's initial template chooser is a visual preview only; it does not publish content or modify a live blog.

The right Social PLUITS panel is a compact, persistent companion surface. Its initial sections provide Feed, Story, and Inbox entry points. The panel does not replace the full Social Media experience.

## Business Account
The Business Account area provides a starting point to choose one type for an individual business identity:
- Store — product-selling business.
- Service — service or professional provider.

The initial interface is a prototype only. It must not create a business identity, grant permissions, or claim successful setup until a reviewed backend contract and authorized service exist.

Marketplace remains the customer-facing discovery and transaction layer. Store and Restaurant & Café remain merchant-operating modules under Marketplace. Do not reclassify these modules because of the Dashboard navigation.

## Transaction Center
Transactions are available to a personal account in both roles:
- Purchase — the user as buyer.
- Sales — the user as seller through a Business Account.

The planned order lifecycle includes payment waiting, processing/confirmation, shipment, completion, and cancellation. The initial interface shows empty states only. No demo orders, shipment locations, payment statuses, or transaction metrics may be fabricated.

## Module availability and truthfulness
The initial navigation includes Social Media, Marketplace, Tickets & Accommodation, Geo Directory, Logistics & Transportation, and Digital Wallet. A module without its own implemented route, service, and permission checks must display an honest unavailable state and must not imply operational functionality.

The right panel, notifications, and Inbox also show explicit empty/unavailable states until their owning data services are connected. Do not invent Story content, posts, conversations, unread counts, notifications, projects, tasks, products, orders, revenue, or engagement.

## Data and security
- Read the authenticated identity from the existing Supabase session.
- Escape user-provided text before rendering.
- Business ownership, roles, membership, and permissions must be enforced by backend authorization when operational integrations are added.
- Frontend visibility is not an authorization boundary.
- This prototype changes frontend composition only. It adds no Supabase schema, RLS, RPC, migration, account record, transaction record, or production data write.
- Local layout preferences store only panel widths and visibility, not profile or business data.

## Visual and responsive contract
- Reuse \`LAY-SHARED-PAGE-SHELL-001\`, \`LAY-USER-DASHBOARD-001\`, existing design tokens, brand, and registered icon library.
- Reuse the canonical navbar-to-content gap of 50px; do not define a Dashboard-specific replacement.
- Do not introduce new icons, fonts, external UI dependencies, or global design tokens in this prototype.
- Feature styles remain scoped under \`.dashboard-*\`.
- The existing runtime token and typography values remain provisional; this page prototype does not approve them platform-wide.

## Runtime ownership
- \`src/features/dashboard/dashboard-page.js\`
- \`src/features/dashboard/dashboard-page.css\`
- \`src/design-system/layouts.js\` (layout registry only)
- \`tests/routes.test.js\`
- \`src/CHANGE-MAP.md\`

No route, auth guard, shared page shell, global CSS, Supabase service, migration, or database contract is changed.

## Validation and release status
Run \`npm test\` and \`npm run build\`. Verify drag resizing, keyboard resizing, independent panel visibility, tab switching/closing, profile/business/settings/transaction/social views, notification and Inbox entry points, and desktop/tablet/mobile composition.
Automated checks and production build must pass before merge. Real Android and desktop browser UAT, live Pages deployment verification, backend integrations, and product-owner visual acceptance remain separate gates.
