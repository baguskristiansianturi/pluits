# PAGE-USER-DASHBOARD — User Dashboard

Status: IMPLEMENTED — first authenticated Dashboard foundation; product data integrations pending.  
Page ID: `PAGE-USER-DASHBOARD` · Layout: `LAY-USER-DASHBOARD-001` · Owner: Platform Wrapper & User Journeys  
Route: `#/dashboard` (authenticated users only)

## Purpose
Provide the signed-in PLUITS user with a personal starting point for account overview, activity, notifications and access into the wider PLUITS ecosystem. Use the standard name **Dashboard**. Do not call it WordPress.

## Entry and navigation
- Signed-in account avatar/name in Global Home links to `#/dashboard`.
- Guest attempts to open `#/dashboard` redirect to Login.
- The PLUITS logo on Dashboard always returns to Global Home at `#/home`.
- Dashboard is not Global Home, Main Profile, Circle/Social, or internal development Workspace.
- Signing out uses the existing Supabase Auth service.

## Current composition
1. Welcome — greeting derived from authenticated user metadata/email.
2. Account overview — display name and email from the current authenticated session.
3. Activity — explicit empty state until an approved activity source is connected.
4. Notifications — explicit empty state until the notification source is connected.
5. Explore PLUITS — return link to Global Home.

## Data and truthfulness
- Read only the authenticated session values already supplied by the app.
- Escape all user-provided text before rendering.
- Do not fabricate activity, notifications, friends, posts, metrics, transactions or profile fields.
- This UI increment does not add Supabase schema, RLS, RPC, migrations or data writes.
- Profile editing and preferences belong to the separate Main Profile feature when implemented.

## Visual and responsive contract
- Reuse `LAY-SHARED-PAGE-SHELL-001`, existing tokens, brand and icon registry.
- Reuse canonical 50px navbar-to-content gap; do not define a Dashboard-specific replacement.
- Desktop/tablet: account overview followed by two-column activity and notifications.
- Mobile: stacked content, readable account values and touch-sized actions.
- Feature styles remain scoped under `.dashboard-*`.

## Runtime ownership
- `src/features/dashboard/dashboard-page.js`
- `src/features/dashboard/dashboard-page.css`
- `src/config/paths.js`
- `src/app/routes.js`
- `src/app/create-app.js`
- `src/features/home/home-page.js` (avatar destination only)
- `src/design-system/layouts.js`
- `tests/routes.test.js`
- `src/CHANGE-MAP.md`

## Validation
Run `npm test` and `npm run build`. Test direct route protection, avatar navigation, logo navigation, sign-out, and mobile/desktop layouts. Real Android/desktop visual acceptance remains pending.
