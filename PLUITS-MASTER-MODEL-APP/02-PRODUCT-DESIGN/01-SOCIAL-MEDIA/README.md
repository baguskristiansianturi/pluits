# Social Media — Product Design

Ruang desain khusus Social Media. Isi dengan product brief, persona, kebutuhan pengguna, information architecture, sitemap, user journey, alur per skenario, page inventory, wireframe, UI/UX, visual references, component inventory, responsive states, accessibility, serta acceptance criteria desain.

Status rancangan: PROPOSED → IN-DESIGN → REVIEW → APPROVED.

## Profile content tabs — approved interaction and content contract
- The profile content navigation contains five tabs in this order: Feed, Reels, Trips, Blog, Toko / Layanan.
- Feed is a 3×3 grid icon only; do not render the word “Feed” beside it.
- Reels, Trips, Blog, and Toko / Layanan each show their registered icon and visible label.
- Remove Live from the profile tab navigation.
- Tabs are mutually exclusive, keyboard-focusable buttons with tablist/tabpanel semantics and synchronized `aria-selected`, `aria-controls`, and hidden panel states.
- Toko / Layanan is a featured showcase, not the merchant's full catalogue. Only items explicitly selected as featured by the owner may appear.
- A featured item is an entry point to the owner's store/service homepage. The complete catalogue is browsed on that homepage, not embedded in the profile.
- Do not fabricate featured products, services, store URLs, prices, or item records. Until owner-selection data and destination contracts are connected, show a truthful empty state.
- This UI change does not create a store backend, catalogue, or featured-item persistence contract.
- Runtime mapping: `src/features/social/social-pages.js`, `src/features/social/social-pages.css`, and `src/design-system/icons.js`.

## Bubble Connections prototype
- `PROFILE-BUBBLE-CONNECTIONS-DEMO-001.md` defines the temporary visual demo on the authenticated profile. It is visible to all account tiers for evaluation and does not create real relationship data or settings.
- Keep the current float, press/rebound, drag, and opt-in device-tilt behavior; future refinements must preserve those interactions.

## Curated visual asset libraries
- `PLUITS-VISUAL-ASSET-LIBRARIES-001.md` is the canonical specification for the two dedicated collections:
  - **PLUITS Fluvara** — profile-cover stills, video, and original fluid-motion assets.
  - **Social Reaction Characters** — animated human/character expressions for comments and approved social interactions.
- Actual static asset folders are under `public/assets/library/`. Their README files define the storage boundaries and provenance rules.
- The folders currently contain governance notes only; no production artwork or animation files have been approved or added.
- Do not merge reaction-character assets into Fluvara. They serve different product surfaces.
- Fluvara is the approved working product name; trademark availability and legal clearance remain pending.
