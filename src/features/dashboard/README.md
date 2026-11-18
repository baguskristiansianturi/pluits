# User Dashboard

Owner: features/dashboard  
Status: authenticated product entry point; module integrations are being developed.  
Route: `#/dashboard`

The Dashboard is the user's main control center after login. It is where users access PLUITS applications, manage work across those applications, review recent activity, and receive notifications.

## Product responsibilities
- Provide one authenticated starting point after successful login.
- Provide access to Social Media, Marketplace (including Store and Restaurant & Café), Tickets & Accommodation, Geo Directory, Logistics & Transportation, and Digital Wallet.
- Bring cross-application work, activity, and notifications together as their data services become available.
- Display only real account/session information and real module data. Do not fabricate counts, work items, posts, store records, orders, or notifications.
- Clearly mark modules that are not yet available; do not render unavailable modules as working links.

## Boundaries
- Global Home remains the public-facing landing page at `#/home`.
- The PLUITS logo always returns to Global Home.
- The signed-in account avatar opens Dashboard.
- Main Profile owns identity and account settings; it is not replaced by Dashboard.
- Workspace is an internal development term, not a public product page or user-facing navigation item.
- Marketplace is the platform container for Store and Restaurant & Café; these are merchant-operating modules, not separate top-level ecosystem models.

## Runtime and truthfulness
The current frontend has no integrated work/activity/notification sources or operational module routes. Empty states and development statuses are intentional until their respective services and modules are implemented. This page change does not add Supabase tables, RLS policies, RPCs, or fabricated demo records.

## Validation
Run `npm test` and `npm run build`. Verify direct guest access redirects to Login, login success opens Dashboard, the PLUITS logo returns to Global Home, and the signed-in avatar opens Dashboard. Real-device visual acceptance remains a separate check.
