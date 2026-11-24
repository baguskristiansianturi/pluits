# SOCIAL-POST-CARD-INTERACTIONS-001 — Interactive Social Post Card

Status: **IN-DESIGN / FRONTEND INTERACTION PROTOTYPE**
Owner: features/home
Component ID: SOCIAL-POST-CARD-001
Consumer: Social Home #/social — Feed and Reels preview
Implementation: social-post-card.js, social-post-card.css

## Purpose

Provide a PLUITS-owned post-card experience that preserves familiar social interaction patterns while using the PLUITS design foundation. This increment is an interactive UI/UX fixture for founder review, not a production social transaction system.

## Card composition

- One media item per card: one photo or one video. Do not stack images or use a collage layout.
- Photo/video is the visual focus and retains the existing Social Home media frame.
- Account header contains avatar, display name, username, relative timestamp, account verification marker, membership marker, and a vertical three-dot menu at the upper-right.
- Caption supports plain text, @mention, and #hashtag styling. External URL links are not rendered as post links in this prototype.
- Social proof displays sample reaction, comment, and gift counts only inside the clearly marked demo fixture.
- Interaction row contains Reaction, Comment, Gift, and Share.

## Account trust and membership presentation

Verification and membership are separate concepts.

- Verified: small blue circle with the registered check icon.
- Unverified: small amber outlined exclamation marker with accessible label and caution tooltip. It means only “not verified”; it does not assert that the account is fake or malicious.
- Membership badge: a small, high-contrast marker attached to the avatar edge. Prototype examples cover Premium, Silver, Gold, Platinum, and PLUITS Priority.
- Account identity treatment is consistent wherever the profile appears: post header, top-level comment, and nested reply all reuse the same profile avatar and membership tier marker. The tier badge keeps the same lower-right avatar attachment position; only its tier symbol/color differs.
- Verification state travels with the account profile into comments and replies. Verified accounts show the check marker; accounts not verified by the system show a small caution exclamation marker. This is a system verification status, not a claim that the person, photo, or video is fake or unsafe. The warning is a neutral prompt to exercise care and the platform's community-safety measure.
- The badge is intentionally compact and must not obscure the avatar or compete with the display name.
- Membership levels, eligibility, entitlement, badge artwork, and backend fields are not finalized. This presentation must later map to the approved account/membership schema without assuming that verification automatically grants a tier.

## Media overlay and interaction hierarchy

- Preserve the established PLUITS post card header, single-media frame, account badges, and card geometry. This refinement only moves the existing interaction controls onto the media surface and refines comment alignment.
- Like/reaction, comment, gift-send, and share controls sit in a vertical right-side rail over the media. White icon/count treatment uses translucent dark backing, soft shadow, and focus/active contrast for varied image/video backgrounds.
- Received gifts are shown as a compact clickable overlay at the lower-left of the media; tapping it opens the gift panel upward over the media. The gift count is not duplicated in the clean engagement summary below the media.
- The summary below media shows only reaction/like count and comment count.
- Top-level comments and their profile avatars align left. Replies from other users align right with their profile/avatar on the right. Replies authored by the post owner align left with their profile/avatar on the left. All comment/reply profiles carry the account's membership level and verification marker just like the post header. Bubble backgrounds and corner treatment distinguish the two directions while retaining readable contrast.
- Comment-love icons use the registered heart icon with a refined active state; do not introduce an external icon library.

## Interaction states in the demo

### Reaction
- Tap the primary action to toggle Like.
- Open the reaction picker to choose Like, Love, Haha, Wow, Sad, or Angry.
- Selecting the same reaction again removes it.
- The chosen reaction and displayed count update in memory.

### Comments and replies
- Seeded sample comments and nested replies are visible initially.
- The visitor can add a top-level comment, like/unlike a comment, open its vertical options menu, and add a reply.
- New comments/replies appear immediately in the current page session.

### Virtual Gift
- Open Gift, select a sample gift (Tulip, Rose, Bouquet, Diamond), and send it.
- The demo wallet starts with 500 test coins. A gift deducts its sample coin value and increments that post's sample gift count.
- Insufficient demo balance produces feedback.
- This is not a real wallet, purchase, transfer, creator payout, or platform revenue event.

### Share and post menu
- Share opens a panel with “Bagikan ke Circle” and “Salin tautan demo”. Copy uses the browser clipboard when available; fallback feedback exposes the demo URL.
- The vertical menu exposes demo Save, Hide, and Report actions with visible feedback.
- None of these actions writes to a backend.

## Video behavior

- Video preview is user-initiated; no autoplay.
- Use preload="none" and playsinline for mobile data/memory awareness.
- Playback is capped at 10 seconds per preview. The control stops at the cap; the original remote sample file may be longer.
- This cap is a demo playback rule, not a media upload/transcoding specification.

## Demo-data and persistence boundary

- Four Feed cards use different sample account names, photos/videos, timestamps, and seeded comments/replies.
- Two of the four posts are short-video previews; Reels reuses those video fixtures.
- Sample names, reactions, counts, comments, verification states, and membership markers are fictional presentation data.
- The feed labels the section as UI/UX testing and marks each card as a demo.
- Interaction state exists only in memory. Reloading or remounting resets likes, comments/replies, gift balance, saves, and menu state.
- If the live first-party feed returns real posts, those posts remain separately rendered with only the data currently supplied by the API; the demo stream is appended as a labelled test fixture. Never merge sample engagement into real posts.

## Foundation and accessibility

- Reuses existing PLUITS tokens and registered icons (heart, message, sparkles, arrow, moreVertical, check).
- No new icon package, global token, backend adapter, database field, or external script.
- Buttons are semantic buttons with labels; comment inputs are labelled; status feedback uses a live region.
- Respect reduced-motion settings. Keep the existing fixed bottom navigation and safe-area behavior.
- Feature styles are scoped under .pl-post-* and remain in the Home feature.

## Acceptance checks

- Four distinct cards render; each shows one media item only.
- Relative times include “Baru saja”, “1 jam lalu”, “1 hari lalu”, and “3 hari lalu”.
- Verified and unverified states are visually and accessibly distinct.
- Premium/Silver/Gold/Platinum/Priority markers are visible but discreet.
- Reaction selection/toggle, comment submission, comment like, reply, gift selection/send, share, vertical menu, save/hide/report all provide feedback.
- Video preview cannot play beyond 10 seconds in the demo.
- Refresh resets all demo interaction state.
- No fixture is written to production data or represented as real engagement.
- npm test and npm run build pass. Browser/device UAT remains pending until performed on Android.

## Current status

Implemented as an interactive frontend prototype on the feature branch. Backend wallet, verified identity, membership entitlement, media storage, and social interaction APIs remain outside this increment.
