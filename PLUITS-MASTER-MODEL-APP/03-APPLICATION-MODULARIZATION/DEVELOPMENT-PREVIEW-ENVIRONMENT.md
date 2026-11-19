# PLUITS Development Preview Environment

**Status:** Deployed to GitHub Pages preview; automated validation and 27-route browser smoke test passed. Founder visual/product acceptance remains pending.

## Purpose

Provide a full-site browser review environment that is independent of the production Cloudflare deployment and does not require Supabase Auth or production data.

## Environment boundaries

| Environment | Branch / source | Purpose | Backend |
|---|---|---|---|
| Development preview | `development/preview` | Prompt-driven implementation, review and mobile browser UAT | Local demo auth and browser-local fixture data |
| Production | `main` | Approved release | Existing production Supabase project; deployed through Cloudflare |

## Delivery flow

1. Work is implemented directly in the GitHub repository on `development/preview`.
2. GitHub Actions runs `npm test` and `npm run build` for the development branch.
3. A separate Pages workflow builds with `VITE_PLUITS_DEMO_MODE=true` and deploys the preview.
4. The preview is served at the repository GitHub Pages URL. It is not the production URL.
5. After founder review and acceptance, the approved commit is merged into `main`; Cloudflare remains the production deployment path.

GitHub Pages must not deploy from `main`. Cloudflare must not consume the development preview branch.

## Demo-mode contract

- The preview build automatically creates an isolated local demo session.
- The preview must not statically import or initialize the Supabase browser client.
- Feed and Reels use clearly identified in-memory fixture content.
- Profile edits and demo Store drafts persist only in browser localStorage.
- No demo fixture, profile edit, or draft is sent to Supabase or represented as a real published record.
- The same production source paths remain in use; preview behavior is selected by a build-time environment flag.
- Production builds do not enable demo mode unless explicitly configured.

## Latest verification evidence

- **Development branch commit:** `90ae5d82c90e7db585b8e482889b693742b3cf61`
- **GitHub Actions preview deployment:** successful; [run 44555638088](https://github.com/baguskristiansianturi/pluits/actions/runs/44555638088)
- **Automated suite:** 47 passed, 0 failed.
- **Architecture guard:** passed across 23 JavaScript modules.
- **Production-surface guard:** passed across 34 runtime files.
- **Vite build:** passed.
- **Hosted browser smoke test:** all 27 registered routes rendered; preview navigation remained available; local profile edit persisted and appeared on the profile page; no Supabase login was required.

## Acceptance checklist

- [x] All public routes render in the preview.
- [x] All authenticated routes are reachable through the demo session.
- [x] Social Home, Discover, Messages, Profile, Settings and Dashboard render without Supabase.
- [x] Demo profile edits persist in browser storage and appear on Profile.
- [x] Demo Store drafts persist locally and remain unpublished.
- [x] Preview navigator lists all 27 public and member routes.
- [x] Automated tests and production build pass.
- [x] Hosted browser smoke test covers all 27 routes.
- [x] Production deployment is not triggered by preview commits.
- [ ] Founder visual/product acceptance on Android remains pending.

## Known preview limitations

- The Messages route is a functional empty-state surface; it is not connected to a live messaging backend.
- Some product, social publishing, notification, and ecosystem modules remain presentation prototypes or disabled flows until their backend services are implemented.
- Feed/Reels preview uses local fixtures; missing media assets can show the designed fallback state.
- Login and registration screens are available for visual review but do not create or authenticate production accounts in demo mode.

A successful build or deployment is not proof that every product feature is operational. Keep backend feature readiness, browser/device UAT, founder acceptance, and production release as separate statuses.
