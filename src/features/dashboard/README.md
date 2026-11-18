# User Dashboard Feature

Owner: `features/dashboard` · Page: `PAGE-USER-DASHBOARD` · Layout: `LAY-USER-DASHBOARD-001` · Route: `#/dashboard`

## Purpose
The signed-in user's personal starting point in PLUITS. It is named Dashboard, not WordPress. It is separate from the public-facing Global Home, Main Profile, Circle/Social, and the internal development Workspace.

## Entry and access
- The account avatar/name in the signed-in Global Home header links here.
- The PLUITS logo on this page always links back to Global Home at `#/home`.
- `#/dashboard` requires a valid authenticated session; guests are redirected to Login.
- Signing out uses the existing Auth service and returns the user to the guest flow.

## Current page sections
- Welcome: personalized with the authenticated account display name.
- Account overview: displays the authenticated user's name and email from the current Supabase session only.
- Activity and notifications: honest empty states until their respective data sources are connected; do not invent records or counters.
- Explore PLUITS: link back to the public-facing Global Home.

## Boundaries
- Do not turn Global Home into Dashboard.
- Do not reuse or rename the internal Workspace as the user Dashboard.
- Main Profile remains the place for profile identity/settings when that separate feature is implemented.
- Circle/Social remains a separate social experience.
- No database schema, RLS, profile update, notifications, or activity data is created by this UI foundation.

## Design and implementation
- Entry point: `dashboard-page.js`.
- Scoped styles: `dashboard-page.css`.
- Shared page shell, tokens, brand and icons are reused from `src/design-system/`.
- No new global tokens, fonts, images, packages, or backend contracts.
- Shared navbar-to-content spacing remains the canonical 50px rule.

## Validation
Run `npm test` and `npm run build`. Verify the profile avatar opens `#/dashboard`, direct guest access redirects to Login, signed-in users can open Dashboard, the PLUITS logo returns to `#/home`, and sign-out clears the session. Real-device visual UAT remains a separate acceptance step.
