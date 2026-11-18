# PAGE-USER-DASHBOARD — User Dashboard

Status: IMPLEMENTED — authenticated control-center foundation; ecosystem module integrations pending.  
Page ID: `PAGE-USER-DASHBOARD` · Layout: `LAY-USER-DASHBOARD-001` · Owner: Platform Wrapper & User Journeys  
Route: `#/dashboard` (authenticated users only)

## Purpose
Dashboard is the single post-login starting point and central control area for a PLUITS user. Users access their PLUITS applications here, manage work across those applications, review activity, and receive notifications.

## Entry and navigation
- Successful login routes directly to `#/dashboard`.
- An authenticated visit to Login, Registration, or Forgot Password routes to Dashboard.
- Signed-in account avatar/name in Global Home links to `#/dashboard`.
- Guest attempts to open `#/dashboard` redirect to Login.
- The PLUITS logo on every page returns to Global Home at `#/home`.
- Workspace is an internal development term only; it is not a separate deployed page, route, or user-facing navigation label.
- Main Profile remains a separate area for identity and account settings.
- Signing out uses the existing Supabase Auth service.

## Application access
The Dashboard provides one place to access the PLUITS ecosystem:
1. Social Media.
2. Marketplace, which contains merchant-operating modules Store and Restaurant & Café.
3. Tickets & Accommodation.
4. Geo Directory.
5. Logistics & Transportation.
6. Digital Wallet.

Only modules with implemented routes and permission checks may become active links. Planned or unavailable modules must show a truthful development state and must not imply that management operations are already functional.

## Work and activity overview
The Dashboard is the cross-application overview for:
- User work and tasks.
- Social Media content and interaction activity.
- Store and Restaurant & Café management activity through Marketplace.
- Recent activity across connected PLUITS applications.
- Account and application notifications.

Each panel must consume its real owning module/service. Do not invent posts, tasks, products, orders, revenue, unread counts, notifications, or other metrics. Until data sources are connected, show explicit empty or unavailable states.

## Data and security
- Read the authenticated user identity from the existing Supabase session.
- Escape all user-provided text before rendering.
- Application cards must respect membership, role and permission boundaries when module access is implemented.
- This frontend increment does not add Supabase schema, RLS, RPC, migrations or data writes.

## Visual and responsive contract
- Reuse `LAY-SHARED-PAGE-SHELL-001`, existing tokens, brand and icon registry.
- Reuse the canonical navbar-to-content gap of 50px; do not define a Dashboard-specific replacement.
- Desktop/tablet: application launcher and work overview use responsive card grids.
- Mobile: stacked content, readable account values and touch-sized controls.
- Feature styles remain scoped under `.dashboard-*`.

## Runtime ownership
- `src/features/dashboard/dashboard-page.js`
- `src/features/dashboard/dashboard-page.css`
- `src/config/paths.js`
- `src/app/routes.js`
- `src/app/create-app.js`
- `src/features/home/home-page.js` (avatar destination)
- `src/features/auth/auth-page.js` (login completion copy)
- `src/design-system/layouts.js`
- `tests/routes.test.js`
- `src/CHANGE-MAP.md`

## Validation
Run `npm test` and `npm run build`. Test direct route protection, login success destination, authenticated redirects, avatar navigation, logo navigation, sign-out, module availability labels, and mobile/desktop layouts. Real Android/desktop visual acceptance remains pending.
