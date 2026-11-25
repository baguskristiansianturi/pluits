# 05 — Icon Library

**Owner:** PLUITS Platform UI Foundation  
**Runtime registry:** `src/design-system/icons.js`  
**Current status:** Registry exists; catalogue and consumer mapping are under audit. Do not assume every runtime entry is approved.

This library owns the canonical semantic identity and artwork of reusable PLUITS UI icons. The consuming component/feature owns presentation configuration and interaction behavior.

## 1. The central rule

**One semantic icon name → one central artwork source → many consumers with independent configurations.**

For example, every page calls `renderIcon('settings')`. A page may render that same icon at 16px, 20px or 24px according to its component contract. If the central SVG artwork for `settings` changes, every consumer receives the new artwork automatically; each consumer keeps its own size, color, alignment, spacing, hit area, label, action, state and responsive behavior.

A shape replacement is not permission to change any of those other properties.

## 2. Ownership boundaries

| Property | Owner |
|---|---|
| Semantic icon name and meaning | Icon Library / product decision |
| SVG artwork and canonical source | Central icon registry |
| Default wrapper behavior | Design-system icon renderer |
| Size, color, alignment and spacing | Consuming component/feature, using design tokens and named variants |
| Position in a page | Page/feature layout |
| Click action, navigation, state and permissions | Interactive component/feature |
| Accessible name | Interactive control that contains the icon |

Do not store page-specific size or click behavior inside the artwork registry. Do not copy SVG path data into page markup when a reusable icon already exists.

If two controls have genuinely different meanings and need different artwork, give them distinct semantic names. Do not silently change the meaning of an existing name.

## 3. Current runtime implementation

- Registry and renderer: `src/design-system/icons.js`.
- Renderer API: `renderIcon(name, className = '')`.
- SVG artwork is stored as local inline SVG strings.
- Rendered wrapper: `.ui-icon`.
- Global default wrapper size: 20 × 20px in `src/styles/global.css`.
- SVG artwork uses `currentColor`; the consuming control supplies color.
- Feature CSS can size the wrapper locally without modifying the central SVG.
- Unknown names currently return an empty string.
- The current runtime registry contains 28 names and marks all generated entries `PROVISIONAL`.

See [ICON-INVENTORY-AND-USAGE-AUDIT-001.md](./ICON-INVENTORY-AND-USAGE-AUDIT-001.md) for the observed catalogue, confirmed consumers, bypasses, documentation discrepancies and next audit steps.

## 4. Mandatory selection and reuse process

1. Search the runtime registry and this library before creating or sourcing an icon.
2. Confirm the semantic meaning and inspect the actual artwork.
3. Reuse the existing registered name when its meaning matches.
4. Configure size/color/placement at the consuming component, not by editing the SVG artwork.
5. Keep behavior in the owning interactive component.
6. If the required meaning or artwork is absent, record the gap and submit candidate artwork/source/license for product-owner review.
7. Add an approved asset once to the central registry and update its consumer map and tests.

Do not silently add external icon packages, CDN icons, remote SVGs or unreviewed assets.

## 5. Required registry fields

Each entry must ultimately record:

- Stable ID and semantic name.
- Intended meaning and prohibited/ambiguous meanings.
- Canonical artwork source and preview.
- Source/provider, URL, author and license/redistribution terms where applicable.
- ViewBox, stroke/fill characteristics and accessibility treatment.
- Status: Proposed, Under Review, Approved, Deprecated or Retired.
- Runtime registry mapping.
- Known consumers.
- Change history.

## 6. Approval and change control

Icon meaning and artwork require product-owner review. Existing runtime presence does not itself mean Approved.

Before changing a central icon:
- list every consumer of its semantic name;
- record the artwork-only change;
- preserve all consumer presentation and behavior contracts;
- run registry and consumer regression tests;
- update the audit/consumer map.

When artwork is replaced centrally, consumers must not require page-by-page edits. If a consumer changes size or behavior, that is a separate change owned and documented by that consumer.

## 7. Current profile icon note

The profile tabs currently call the central registry for `grid`, `film`, `map`, `fileText`, `store` and `briefcase`. The profile settings gear still contains a separate inline SVG even though the registry has a `settings` entry. Its artwork must be reconciled before migration; do not silently substitute a different shape.

