# PAGE-GLOBAL-HOME-AUTHENTICATED — Authenticated Global Home

Status: IMPLEMENTED — provisional composition; founder visual UAT pending.  
Page ID: `PAGE-GLOBAL-HOME-AUTHENTICATED` · Layout: `LAY-GLOBAL-HOME-AUTH-001` · Owner: Platform Wrapper & User Journeys  
Route: `#/home`, selected when an active Supabase session exists.

## Purpose
Serve as the main PLUITS platform entry point for the currently authenticated account. It welcomes the active user and introduces the cross-ecosystem areas without pretending that unfinished products, feeds, transactions, or activity data are already live.

Global Home is not Circle and is not the Social Media personal space. It is also not the Main Profile; those are separate product areas in the accepted build sequence.

## Content architecture
1. Personalized welcome using the account display name, with email as a secondary identifier.
2. Cross-ecosystem overview: Social & Community, Local Discovery, Marketplace, and Everyday Services.
3. Account identity summary with an authenticated state.
4. Clear note that Circle/social personal space is a separate experience and will be designed in the Social Media stage.

## Truthfulness and data constraints
- Do not fabricate feed items, friends, communities, notifications, recommendations, counts, transactions, products, providers, or profile attributes.
- Ecosystem cards are informational until the relevant product modules are released.
- Display name falls back to the email prefix; email is read from the active Supabase session.
- User metadata is used only for display, never for authorization.
- Sign-out uses the existing Auth service. No Supabase schema, RLS, migration, or database change is part of this page.

## Navigation and session behavior
- Guest `#/home` renders `PAGE-GLOBAL-HOME-PUBLIC`.
- Authenticated `#/home` renders this page at the exact same route.
- The shared PLUITS brand always points to `#/home`; the active session determines which homepage is shown.
- Successful login navigates to `#/home`.
- Authenticated users visiting guest-only login/register/forgot routes return to `#/home`.
- The internal development workspace remains a separate protected route and is not the authenticated Global Home.
- Sign-out changes the active session; the auth-state listener then renders the public homepage.

## Runtime ownership
- Composition: `src/features/home/authenticated-home.js`.
- Scoped styles: `src/features/home/authenticated-home.css`.
- Session-based selection: `src/app/create-app.js`.
- Route policy: `src/app/routes.js`.
- Shared brand: `src/design-system/page-shell.js`.
- Layout registry: `src/design-system/layouts.js`.
- CSS entry: `src/main.js`.
- Regression coverage: `tests/routes.test.js`.

## Responsive and shared design rules
- Consume the existing shared page shell, brand asset, tokens, typography, and icon registry.
- The shared shell exclusively owns navbar-to-content spacing, page gutters, and vertical rhythm.
- Desktop uses a four-column ecosystem overview; tablet uses two columns; mobile stacks to one column.
- No new global spacing, color, typography, or breakpoint tokens are introduced.
- Feature styles remain scoped under `.authenticated-home-page` and `.global-home-*`.

## Validation
Run `npm test` and `npm run build`; verify guest and authenticated sessions on `#/home`, sign-in, sign-out, brand navigation from every shared shell, and desktop/tablet/mobile layouts. Visual UAT remains pending until inspected on real devices.
