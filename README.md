# PLUITS

PLUITS is being rebuilt on a clean, modular frontend foundation while preserving the existing Supabase backend and user data.

## Current delivery

Frontend V2 bootstrap — Stage 01: Account Registration and Login.

The deployed first stage contains:
- Registration with display name, email, password, and terms acknowledgement.
- Existing-account email/password login.
- Signup confirmation pending state and resend request.
- Password recovery and reset.
- An authenticated internal workspace after login.

The workspace is a temporary development workbench. It is not yet the final Global Home, Primary Profile, or Social Media application.

## Architecture

- src/app/ — bootstrap, route resolution, auth guard.
- src/config/ — non-secret runtime and asset configuration.
- src/design-system/ — provisional dimensions, icons, colors, behaviors, and layout registry.
- src/features/ — isolated feature screens and page-owned styles.
- src/services/ — business/service logic without DOM rendering.
- src/lib/ — shared SDK clients.
- src/styles/ — minimal global styles.
- supabase/ — existing migrations and backend assets, preserved.
- PLUITS-MASTER-MODEL-APP/ — canonical product and technical documentation.
- PLUITS-SHARING-INBOX/ — raw discussion records pending review.

## Important boundaries

- Frontend replacement does not authorize database reset, migration deletion, user deletion, or data cleanup.
- Signup uses Supabase Auth. Existing database triggers create profile and wallet records; the frontend must not insert duplicates.
- Browser code uses only the Supabase publishable key.
- User metadata is display data, not an authorization source.
- Legal pages and durable consent logging are not final; public registration must remain closed until those requirements are completed.
- The initial UI token and layout values are provisional and must be reviewed before being treated as platform-wide standards.

## Engineering workflow

1. Read AGENTS.md and the relevant Master Model documents.
2. Inspect the actual repository paths, imports, tests, workflows, and backend contracts.
3. Identify module owner, change scope, dependencies, and protected boundaries.
4. Implement only the approved scope.
5. Run npm test and npm run build.
6. Verify GitHub Actions and deployment evidence.
7. Record changed paths, commit SHA, test results, and remaining UAT.

## Local commands

- npm ci
- npm test
- npm run build
- npm run dev
