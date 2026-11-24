## Domain ownership and team lanes

Social Media is one owned domain with distinct frontend and backend responsibility lanes. Blog, Reels, Stories, Live, Feed, and Social experience each retain their own internal responsibility boundaries. Future contributors must use the platform-wide [module ownership and team governance](../00-MODULAR-OWNERSHIP-AND-TEAM-BOUNDARIES.md), together with the [Social Media GitHub tree and integration map](../../01-ECOSYSTEM-MODELS/01-SOCIAL-MEDIA/05-POHON-GITHUB-DAN-KONTRAK-INTEGRASI.md). The current runtime paths remain authoritative until a separately reviewed migration changes them.

# Social Media — Application Modularization

Blueprint teknis khusus Social Media: module boundaries, frontend routes/pages/components/state/styles, backend domains/services/rules, database entities and ownership, API and event contracts, auth/roles/permissions, security, observability, testing, deployment boundaries, rollout dan rollback.

## CSS isolation and runtime ownership

- Social Media private layout, components, state, responsive behavior, and CSS must be isolated behind explicit module/root boundaries.
- Shared logo, registered icons, approved global tokens, typography, spacing scale, breakpoints, and approved primitives are consumed from Platform UI Foundation; Social Media must not redefine those global sources.
- Shared foundations must not absorb Social Media-specific page composition or layout rules.
- CSS imported by JavaScript still participates in the document-wide cascade; file/folder placement is not isolation.
- Before narrowing or moving a shared selector, trace all consumers and prepare non-Social Media consumers first.
- The current dependency audit and staged migration requirements are recorded in [Rule 17](../../01-ECOSYSTEM-MODELS/01-SOCIAL-MEDIA/00-ATURAN-PENGALAMAN/17-PETA-RUNTIME-DAN-TAHAP-MIGRASI-ISOLASI.md) and [Rule 16](../../01-ECOSYSTEM-MODELS/01-SOCIAL-MEDIA/00-ATURAN-PENGALAMAN/16-ISOLASI-CSS-DAN-ALUR-DEPENDENSI.md).
- Runtime isolation is not yet implemented; do not claim the current stylesheets are fully isolated.

## Account settings runtime contract

- Settings categories are rendered as an accessible tablist; every tab exposes its selected state and controls one labelled panel.
- The active category remains visible and keyboard-focusable on desktop and mobile. Arrow keys move between categories; Home and End move to the first and last category.
- Account, privacy, notification, and profile-theme sections report unavailable server capabilities honestly. They must not imply that an unsaved UI-only toggle changed account data.
- Runtime ownership: `src/features/social/social-pages.js` and `src/features/social/social-pages.css`.

## Social Feed API — first implementation slice

- PostgreSQL migration `000008_social_posts.sql` owns the `pluits.social_posts` table.
- Authenticated members can publish text-only Feed posts with public or private visibility.
- Public Feed excludes inactive accounts and profiles marked private; private posts are available only through the authenticated owner's endpoint.
- Routes: `GET /v1/social/feed`, `GET /v1/social/posts/me`, `POST /v1/social/posts`.
- Creation is rate-limited per account and captions are validated (1–5,000 Unicode characters).
- Media, Reels, Stories, Blog, comments, reactions, follower-only audience, moderation, and realtime are explicitly out of scope until their own contracts and implementations exist.
- Runtime implementation: `backend/internal/httpapi/social.go`, registered by `backend/cmd/api/main.go`.

## Authenticated Profile Feed — first integration slice

- Profile Feed reads only the signed-in owner's posts from `GET /v1/social/posts/me`.
- The access token is passed from the active first-party session and sent as a Bearer token; no client-side identity or ownership filter is trusted.
- Public and private posts are rendered with an explicit visibility label. Caption text is HTML-escaped.
- The request is aborted when the profile page is unmounted.
- This slice is text-post only because the current Go API contract is text-only. Media grid, reactions, comments, follower counts and public-profile routing remain unavailable until their own APIs and contracts are implemented.
- Runtime owners: `src/app/create-app.js`, `src/features/social/social-pages.js`, `src/features/social/social-pages.css`.
- Validation: `tests/features/social-composer.test.js` covers the authenticated endpoint, token forwarding, visibility labeling and request cleanup.

## Module boundaries — Blog, Reels, Stories, Live
Four independent Social Media modules have their own technical contracts and implementation ownership:
- Blog: `../../01-ECOSYSTEM-MODELS/01-SOCIAL-MEDIA/01-BLOG/02-DEVELOPMENT/`
- Reels: `../../01-ECOSYSTEM-MODELS/01-SOCIAL-MEDIA/02-REELS/02-DEVELOPMENT/`
- Stories: `../../01-ECOSYSTEM-MODELS/01-SOCIAL-MEDIA/03-STORIES/02-DEVELOPMENT/`
- Live: `../../01-ECOSYSTEM-MODELS/01-SOCIAL-MEDIA/04-LIVE/02-DEVELOPMENT/`

Feed is an aggregation/distribution surface. It consumes documented content references and render/deep-link contracts; it must not own or duplicate each module's private state machine, CSS, media lifecycle, or domain rules. Shared assets/tokens/layout primitives are owned by Platform UI Foundation. Module-private styles remain within their respective module boundaries.

The existing first-slice text-only Feed API and its explicit out-of-scope list remain valid; this modularization does not claim Blog, Reels, Stories, or Live production functionality exists.

## Aturan pengalaman dan batas runtime
Aturan lintas permukaan Social Media dirangkum pada [Aturan Pengalaman Social Media](../../01-ECOSYSTEM-MODELS/01-SOCIAL-MEDIA/00-ATURAN-PENGALAMAN/README.md). Gunakan dokumen itu bersama kontrak teknis di halaman ini. Jangan menyamakan prototype dengan backend produksi, dan jangan mengubah runtime sebagai bagian dari pembaruan dokumentasi.
