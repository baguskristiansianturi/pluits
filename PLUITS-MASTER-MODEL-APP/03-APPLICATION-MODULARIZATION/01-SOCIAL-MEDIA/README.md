# Social Media — Application Modularization

Blueprint teknis khusus Social Media: module boundaries, frontend routes/pages/components/state/styles, backend domains/services/rules, database entities and ownership, API and event contracts, auth/roles/permissions, security, observability, testing, deployment boundaries, rollout dan rollback.


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
