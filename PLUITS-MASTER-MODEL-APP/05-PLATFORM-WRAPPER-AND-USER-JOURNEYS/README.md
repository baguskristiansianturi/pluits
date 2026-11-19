# Platform Wrapper & User Journeys

Khusus aplikasi utama PLUITS sebagai pembungkus/portal ekosistem: public marketing homepage, Social experience, authenticated Dashboard, global navigation, app launcher, account/membership, notifikasi lintas aplikasi, deep links dan journey lintas aplikasi.

## Public homepage
- Public marketing homepage is the root landing page at `#/home`.
- It introduces PLUITS to guests and signed-in users through benefit-led marketing copy, visuals for the four connected ecosystem spaces, and clear paths to register, sign in, or discover.
- It speaks to individual users and business owners without presenting technical implementation copy.
- Android Google Play and iOS App Store availability are shown in the footer area as Coming Soon; no download links are active.
- Guest and signed-in users see the same composition; only account controls and CTA wording change.
- See [Public PLUITS Homepage](./PAGE-GLOBAL-HOME-PUBLIC.md).

## Social experience
- The Social feed/discovery experience is separately mounted at `#/social`.
- It retains its own Feed, Reels, Live and Blog presentation, discovery rails, and current implementation state.
- Do not conflate this experience with the public marketing homepage.
- See [Global Home, Circle Home, and Discovery specification](./PAGE-GLOBAL-HOME-AUTHENTICATED.md) where applicable.

## User Dashboard
- Successful login carries the user to Dashboard; Dashboard is the single post-login control center.
- Dashboard layout and module behavior remain independently owned by the dashboard feature.
- The public homepage must not render a profile summary or dashboard workspace.
- See [User Dashboard specification](./PAGE-USER-DASHBOARD.md).

## Data and release truthfulness
- Ecosystem and Android/iOS availability must reflect actual release state.
- Dashboard modules without implemented routes, data services, and permission checks must be marked unavailable; do not claim planned management functions are live.
- Do not fabricate activity, notifications, counts, posts, stories, conversations, products, orders, shipment states, or transactions.
