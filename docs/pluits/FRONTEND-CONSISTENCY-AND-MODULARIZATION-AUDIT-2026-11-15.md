# PLUITS Frontend Consistency & Modularization Audit

**Audit date:** 15 November 2026  
**Repository:** `baguskristiansianturi/pluits`  
**Method:** source tree, route controller, stylesheet and icon registry inspection. This is a source audit, not a browser-based visual QA or a Lighthouse run.

## Findings
- The application has route-level dynamic imports in `src/app/router.js`, but experience shells and page controllers still have mixed ownership.
- The public homepage's controller/styles are deferred from non-home routes after the recent lazy-load change.
- The design system now has shared geometry tokens, opt-in layout primitives and canonical icon registries.
- Importing the layout stylesheet does not restyle existing pages; legacy page adoption is still pending.
- The social account controller and CSS remain large legacy files, and several business areas still use one controller for multiple routes.
- SVG assets are local and no remote icon library is required. The general, social and app registries have overlapping semantic names and some different artwork.
- No local font files are present. Inter appears in CSS stacks but is not bundled in the repository; system UI fallbacks are therefore the dependable local option.

## Measured stylesheet/controller debt
| File | Source size | Notes |
|---|---:|---|
| `src/style.css` | 285,949 bytes | Global baseline plus legacy public/commerce styles; 864 font-size declarations and 1,366 spacing/layout declarations |
| `src/pages/account/user-account.css` | 201,957 bytes | Account/social styles; 585 font-size declarations and 1,124 spacing/layout declarations |
| `src/pages/account/circle-experience.css` | 67,219 bytes | Circle-specific styles; 106 font-size declarations and 293 spacing/layout declarations |
| `src/pages/messages/messages.css` | 29,038 bytes | Inbox styles; 78 font-size declarations and 141 spacing/layout declarations |
| `styles/home-layout.css` | 27,323 bytes | Legacy public-home layout; now route-loaded with public home |
| `src/pages/blog-studio/index.js` | 65,230 bytes | Blog Studio controller and composition |
| `src/pages/account/index.js` | 168,370 bytes | Account/social route controller |
| `src/pages/marketplace/index.js` | 25,227 bytes | Several commerce route views in one controller |
| `src/pages/trip/index.js` | 15,457 bytes | Multiple trip sections in one controller |

Font-size and spacing counts are declarations, not unique values or rendered DOM measurements. They demonstrate the scale of legacy inconsistency, not a claim that every declaration is visually wrong.

## Normalization target
Use `src/design-system/tokens/foundation.css` and `src/design-system/layouts/foundation.css` as the canonical target. New and edited sections must use:
- 12/16px mobile gutter;
- 1200px content, 720px reading, 1440px workspace containers;
- 4px spacing scale;
- semantic type roles 11/12/14/15/18/24/28px;
- icon size roles 16/18/20/22/24/28px and 44px hit targets;
- dynamic viewport and safe-area tokens.

Page order and visual composition can differ. Geometry, type scale, component states and spacing tokens must remain consistent.

## Migration plan and exit criteria
1. **Design system:** tokens, page layouts, icon/asset registry, typography roles and tests.
2. **Shared shell/components:** extract shell and primitive ownership without changing page behavior.
3. **Public/help/legal/auth:** adopt page/container/reading patterns and remove duplicate global selectors.
4. **Social account:** decompose controller and CSS by feed/profile/Circle/Reels/composer/settings/activity.
5. **Inbox:** separate sidebar, contact rail, thread, chat panel, composer and settings.
6. **Marketplace/Seller/Trip/Directory:** split route-specific features and styles under owning domains.
7. **Blog/Admin/Misc:** split section composition and shared reading/admin layouts.
8. **Runtime/assets:** inspect route chunks, eager imports, media/image loading, listeners, subscriptions and cache.
9. **QA:** viewport smoke tests and real Android visual/performance test.

A phase is complete only when the owner map is updated, consumers are tested, CSS selectors are scoped, the build and tests pass, and route-specific mobile/tablet/desktop evidence exists. Do not mark all pages normalized until each route family has migrated and been checked.


## 15 November 2026 — Account CSS mechanical split

- `user-account.css` is now an import-only aggregator for eight ordered slices under `src/pages/account/styles/`.
- The split was generated at top-level section boundaries and verified by concatenating the slices back to the exact original CSS text before commit.
- No selector, declaration, token, media query, value or rule order was intentionally changed.
- This reduces the single-file editing surface but does **not** complete semantic CSS ownership. The next phase must map selectors and migrate feature-specific rules into their canonical owners with regression coverage.


## 15 November 2026 — Page CSS boundary audit

- Audited all CSS files under `src/pages/` after the Account stylesheet split. Page selectors are namespaced with `.pl-*`, `.ua-*`, `.pluits-*` or `#pl-*`.
- Extended the automated CSS boundary checker to include `src/pages/`.
- Three exact Inbox viewport selectors are allowlisted because they lock `html`, `body` and `#app` only while `.pl-msg` is mounted. The exception is documented next to the CSS block and in the engineering contract.
- The legacy global files `src/style.css`, `src/styles/*` and top-level `styles/home-layout.css` are still not covered by the page/component guard. Their selector-to-owner audit and staged migration remain outstanding.


## 15 November 2026 — Profile tab controller extraction

- Extracted Profile Posts/Reels/Trips/Blog tab interaction into `src/features/profile/profile-tabs.js`; the Account page now supplies data/rendering dependencies through a small adapter.
- Added stale-response protection so a slow Blog request cannot overwrite a tab the user has already switched away from.
- Added a focused architecture regression test. This is a bounded controller extraction; it does not claim the remaining Account controller is decomposed.


## 15 November 2026 — Profile image-frame controls extraction

- Moved the Profile image-frame preview/input synchronization binder to `src/features/profile/image-frame-controls.js`.
- The Account controller now passes the current frame and the existing frame read/render functions explicitly; the frame model and persistence remain unchanged.
- Added a focused architecture regression test.


## 15 November 2026 — Global CSS legacy selector guard

- Mapped the six app-wide stylesheet sources currently imported by the application: `src/style.css`, four files under `src/styles/`, and `styles/home-layout.css`.
- Captured the existing 1,324 unique unscoped selectors in `scripts/global-style-legacy-selectors.txt` as a reviewed legacy baseline. This is a compatibility freeze, not an endorsement that these selectors are correctly owned.
- Extended the CSS boundary verifier so new unscoped selectors in these global files fail CI unless the baseline is explicitly reviewed and updated. Scoped `.pl-*` / `.ua-*` / design-system roots remain allowed.
- Existing global CSS is not mechanically moved: selector ownership and route consumers still need a verified migration. This guard prevents further cascade growth while that audit continues.


## 15 November 2026 — Profile image upload extraction

- Moved avatar and cover upload event handling into `src/features/profile/image-upload.js`.
- Kept the existing 8 MB size limit, JPG/PNG/WebP allowlist, storage bucket, profile-row update and refresh behavior. Supabase, notification and page-refresh dependencies are passed explicitly from Account.
- Added a focused architecture regression test; storage authorization and RLS contracts are unchanged.


## 15 November 2026 — Profile editor extraction

- Moved personal username/display-name validation and profile-save orchestration to `src/features/profile/profile-editor.js`.
- Account now injects current profile accessors, Supabase client, image-frame persistence helpers, notifications and SEO updates. Existing optimistic update/rollback, unique-username handling and frame persistence remain in the feature.
- Added direct unit tests for identity validation and updated production-surface assertions to follow the new owner.


## 15 November 2026 — Profile Blog tab renderer extraction

- Moved public Blog route lookup, public published-post retrieval, signed cover URL creation and card markup to `src/features/profile/profile-blog-tab.js`.
- The Account page supplies the active profile/user, Supabase client, media bucket and formatting helpers; Profile tabs continue to load Blog content lazily.
- Updated the Profile Blog regression test to assert feature ownership while retaining the Account adapter contract.


## 15 November 2026 — Profile page composition extraction

- Moved the signed-in Profile view, edit form and preview composition plus their existing post/follower/store reads into `src/features/profile/profile-page.js`.
- Account now provides the active profile/session, signed-URL helper, post hydration, avatar/frame renderers and shared menu/post renderers through explicit dependencies.
- Reels eligibility is returned through an explicit callback to preserve the existing Account state contract.
- Updated route-surface and Profile tab tests to validate the feature owner rather than the legacy Account controller.


## 15 November 2026 — Public Profile renderer extraction

- Moved public-profile lookup, relationship state, visibility-gated post reads, follow counts, Reels eligibility and public Profile markup to `src/features/profile/public-profile-page.js`.
- Account remains the route/session adapter and injects the current user, Supabase client, signed media/post hydration helpers and owner-profile fallback.
- Preserved the existing private-profile visibility condition and accepted-follower access path; the feature test checks both personal and public Profile tab markup.


## 15 November 2026 — Posts comment thread extraction

- Moved post-comment retrieval, nested reply rendering, comment likes and comment/reply submission into `src/features/posts/comments.js`.
- The Account page now provides the current user, Supabase client, notification and rendering helpers. Existing comment tables, parent-comment relationships and database authorization policies are unchanged.
- Added a focused architecture regression test. Signed-out comment-like attempts now receive a clear sign-in notice rather than dereferencing a missing user.


## 15 November 2026 — Posts like interaction extraction

- Moved post like toggling, optimistic count updates/rollback and double-tap media animation into `src/features/posts/like-interactions.js`.
- The Account page injects the card, post ID, current user, Supabase client, notification and icon helpers. Like persistence and RLS remain unchanged.
- Added a focused architecture regression test.


## 15 November 2026 — Relationship and recommendation action extraction

- Moved follower/following list rendering and follow, accept, remove and cancel actions into `src/features/relationships/index.js`.
- Moved people-recommendation follow buttons into `src/features/discovery/people-recommendation-actions.js`.
- Account now acts as an adapter for the current user, Supabase client, route remounting and shared UI helpers; existing follow states and backend contracts remain unchanged.
- Added focused architecture regression tests for both feature owners.
