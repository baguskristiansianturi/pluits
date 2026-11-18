# User Dashboard

Owner: platform-wrapper / features/dashboard  
Status: flexible dashboard prototype implemented; visual acceptance and operational integrations pending.  
Route: \`#/dashboard\`

## Product responsibilities
- Provide the single authenticated control center after login.
- Keep one PLUITS identity active across personal social activity, account settings, transactions, and eligible business identities.
- Provide top tabs for pages opened during the current dashboard session.
- Provide desktop module navigation, active work area, and persistent Social PLUITS side panel.
- Allow desktop users to resize and independently hide/show the left module panel and right social panel.
- Provide personal social profile management entry, Business Account setup entry (Store or Service), transaction center (Purchase/Sales), and account settings entry.
- Provide access to Social Media formats: Feed, Story, Reels, Live, and Personal Blog. The five Personal Blog template names follow the existing product decision.
- Keep notifications and Inbox entry points centralized.
- On mobile, prioritize module navigation and management content; omit the desktop social side panel.

## Account boundaries
- PLUITS Auth identity is the single sign-in identity.
- Personal Social Account is the user's personal identity for social interaction and buyer-side activity.
- Business Account is a separate business identity associated with the personal account; each individual business account is one type: Store or Service.
- The allowed number of business identities per personal account remains an open product decision. The prototype does not enforce an undocumented limit.
- Profile and account preferences are managed in Dashboard. The public-facing profile remains owned by the Social Media surface.
- Marketplace remains the customer-facing discovery/transaction layer. Store and Restaurant & Café retain merchant-operation ownership under Marketplace.

## Boundaries
- Global Home remains the public-facing landing page at \`#/home\`.
- The PLUITS logo always returns to Global Home.
- Dashboard is the only protected post-login destination.
- Workspace is an internal engineering term, not a public product page or user-facing navigation item.
- Dashboard navigation does not replace module-owned routes, services, data, or permissions.

## Runtime and truthfulness
The current prototype is presentation-only. Existing Auth session identity is displayed, but profile updates, business creation, transaction data, notifications, Inbox, and social activity are not connected by this increment. Modules without implemented routes and permission checks show honest unavailable states. No fabricated posts, Story, conversations, projects, tasks, orders, shipment states, revenue, unread counts, or notifications are allowed.

## Shared foundation and ownership
- Layout: \`LAY-USER-DASHBOARD-001\`.
- Shared shell: \`src/design-system/page-shell.js\` and \`page-shell.css\`.
- Tokens: \`src/design-system/tokens.css\`.
- Icons: existing \`src/design-system/icons.js\` registry only.
- Runtime ownership: \`dashboard-page.js\` and \`dashboard-page.css\`.
- No new global token, icon, font, external UI dependency, route, Supabase migration, or shared shell change is introduced.

## Validation
Run \`npm test\` and \`npm run build\`. Verify desktop resizing and panel visibility, keyboard resize, tabs, account views, social panel, notification and Inbox entry points, and tablet/mobile composition. Real-device UAT, deployment verification, backend integration, and founder visual acceptance remain separate checks.
