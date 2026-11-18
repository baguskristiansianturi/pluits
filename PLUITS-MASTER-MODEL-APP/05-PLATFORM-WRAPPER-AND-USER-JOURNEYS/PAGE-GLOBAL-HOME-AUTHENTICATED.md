# Global Home — Authenticated Session Behavior

Status: SPECIFICATION FOR THE SAME GLOBAL HOME PAGE — NOT A SEPARATE PAGE  
Reference: `PAGE-GLOBAL-HOME` · Layout: `LAY-GLOBAL-HOME-001` · Route: `#/home`

## Purpose
Define how the existing PLUITS Beranda responds when a Supabase session is active. This document does not define another homepage, another page layout, or a dashboard.

## Required behavior
- Authenticated `#/home` renders the same public-facing PLUITS platform landing page as a guest sees.
- Keep the same hero, platform introduction, ecosystem overview, identity explainer, Android information, closing CTA, page shell, spacing, and footer.
- The header may replace guest login/registration actions with a compact account identity and sign-out control.
- The account avatar/name is a link to the separate protected User Dashboard at `#/dashboard`.
- Primary calls to action may change wording or point to the ecosystem section because the user is already signed in.
- Do not replace the landing page with a personalized greeting, account/email panel, profile summary, dashboard cards, feed, or activity stream.
- User Dashboard, Main Profile, Circle, and Social Media personal space are separate product areas. Dashboard is opened by the signed-in account avatar; it is not embedded in or substituted for Global Home.
- The internal development Workspace remains a separate protected route and is not the user's dashboard or Beranda.

## Data and security constraints
- Read the active session only to determine whether account controls should be shown and to display the account name in the header.
- Escape all user-provided display values before rendering.
- Sign-out uses the existing Auth service. No Supabase schema, RLS, migration, or database change is part of this behavior.
- Do not fabricate feed items, friends, notifications, recommendations, counts, transactions, products, providers, or profile attributes.

## Runtime ownership
- Single composition: `src/features/home/home-page.js`.
- Single stylesheet: `src/features/home/home-page.css`.
- Session supplied by `src/app/create-app.js`.
- Route policy: `src/app/routes.js`.
- Shared brand: `src/design-system/page-shell.js`.
- Layout registry: `src/design-system/layouts.js`.
- Regression coverage: `tests/routes.test.js`.

## Validation
Run `npm test` and `npm run build`; verify the same landing sections appear for guest and authenticated sessions on `#/home`. Verify only header account controls and CTA behavior change. Test sign-in, sign-out, brand navigation, and desktop/tablet/mobile layouts. Visual UAT remains pending until inspected on real devices.
