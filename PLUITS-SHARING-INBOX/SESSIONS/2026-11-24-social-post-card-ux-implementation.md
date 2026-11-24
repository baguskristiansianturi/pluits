# Social Post Card — Founder UX Session

Date: 24 November 2026
Topic: PLUITS Social Feed post-card interaction prototype
Status: Founder-requested prototype scope implemented for review; backend/schema decisions remain open.

## Founder direction captured

- Use a clean, Instagram-like single-media presentation: one photo or one video per card, no stacked images.
- Build four sample post cards with distinct account names and content.
- Include visible sample comments, likes/reactions, comment likes, nested replies, gift activity, and share interactions so the visual and interaction flow can be tested.
- Provide short video previews capped at 10 seconds.
- Use relative timestamp examples: Baru saja, 1 jam lalu, 1 hari lalu, and 3 hari lalu.
- Use a vertical three-dot post menu at the upper-right.
- Show verified accounts with a normal check marker and unverified accounts with a clear caution marker.
- Preview small avatar-edge membership markers for Premium, Silver, Gold, Platinum, and PLUITS Priority.
- Keep the gift interaction as a distinctive PLUITS action.
- Do not make external links part of post captions; allow mention and hashtag patterns.

## Scope and safety boundary

This is a frontend-only UX fixture. The four accounts, posts, media examples, verification/membership states, comments, reaction totals, gift counts, and demo coin balance are fictional sample data. The interaction state is in-memory and resets on reload/remount.

No real user data, production social records, wallet transactions, creator payouts, verification records, membership entitlements, schema changes, or backend endpoints are created or modified. Demo stream is explicitly labelled and remains separate from any real first-party feed content.

The membership and wallet business models remain unfinalized. This session approves a visual/interaction prototype for testing, not the final database or monetization contract.
