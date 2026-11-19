# PLUITS Development Preview Environment

**Status:** Implemented in the `development/preview` branch; automated validation and hosted browser acceptance are pending.

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

## Acceptance checklist

- [ ] All public routes render in the preview.
- [ ] All authenticated routes are reachable through the demo session.
- [ ] Home, Feed, Reels, Stories, Discover, Messages, Profile, Settings and Dashboard render without Supabase.
- [ ] Profile edits persist after refresh in the same browser.
- [ ] Demo Store drafts persist locally and remain unpublished.
- [ ] Logout and demo-session re-entry behave predictably.
- [ ] No Supabase request is required for preview bootstrap or navigation.
- [ ] Automated tests and production build pass.
- [ ] Android browser review covers all routes, navigation, forms, overflow and responsive states.
- [ ] Production deployment is not triggered by preview commits.

A successful build or deployment is not proof of full route coverage or founder acceptance. Record actual browser/device UAT separately.
