# PLUITS Icon Inventory and Usage Audit 001

**Status:** OBSERVED BASELINE / AUDIT IN PROGRESS  
**Runtime source inspected:** `src/design-system/icons.js`  
**Audit scope:** Current Frontend V2 tree on the default branch, central registry, and primary runtime surfaces inspected on 22 November 2026. This is not yet a claim that every icon consumer in every content page has been exhaustively traced.

## 1. Purpose

This record makes the current icon system discoverable and separates three independent concerns:

1. **Icon identity/artwork** — the canonical SVG path and semantic name, owned centrally.
2. **Presentation configuration** — rendered size, color, alignment, spacing and placement, owned by the component/feature/page that uses the icon, within design-token rules.
3. **Behavior** — click action, navigation, state and accessibility label, owned by the interactive component or feature.

Changing an icon's central artwork must not change the consumers' size, color, placement, hit area, label, action, or state. Consumers refer to a stable semantic icon name. A shape update is made once in the central registry.

## 2. Current runtime source

| Concern | Observed implementation |
|---|---|
| Icon artwork registry | `src/design-system/icons.js` |
| Renderer | `renderIcon(name, className = '')` |
| Registry export | `ICON_REGISTRY` |
| SVG strategy | Local inline SVG strings; no per-icon network request |
| Wrapper | `.ui-icon` |
| Default wrapper size | 20 × 20 CSS px in `src/styles/global.css` |
| Default color | SVG uses `currentColor`; consumer controls inherited color |
| Local presentation | Feature/page CSS may size/color/align the `.ui-icon` wrapper without editing SVG artwork |
| Unknown name behavior | Currently returns an empty string |
| Registry status | All generated entries currently report `PROVISIONAL` |
| Runtime import boundary | Features import `renderIcon` from `src/design-system/icons.js` |

The central renderer currently accepts an optional CSS class, not a size or behavior option. This is consistent with the required separation: artwork is central; usage presentation and behavior remain with the consumer.

## 3. Current icon catalogue

The runtime registry contains 28 semantic names. These are observed entries, not a blanket approval that every meaning or artwork is final.

| Semantic name | Registry ID |
|---|---|
| `plus` | `ICO-PLU-PLUS` |
| `eye` | `ICO-PLU-EYE` |
| `eyeOff` | `ICO-PLU-EYE-OFF` |
| `arrow` | `ICO-PLU-ARROW` |
| `book` | `ICO-PLU-BOOK` |
| `message` | `ICO-PLU-MESSAGE` |
| `check` | `ICO-PLU-CHECK` |
| `logout` | `ICO-PLU-LOGOUT` |
| `lock` | `ICO-PLU-LOCK` |
| `mail` | `ICO-PLU-MAIL` |
| `heart` | `ICO-PLU-HEART` |
| `bell` | `ICO-PLU-BELL` |
| `cart` | `ICO-PLU-CART` |
| `search` | `ICO-PLU-SEARCH` |
| `user` | `ICO-PLU-USER` |
| `image` | `ICO-PLU-IMAGE` |
| `play` | `ICO-PLU-PLAY` |
| `mapPin` | `ICO-PLU-MAP-PIN` |
| `settings` | `ICO-PLU-SETTINGS` |
| `moreVertical` | `ICO-PLU-MORE-VERTICAL` |
| `store` | `ICO-PLU-STORE` |
| `grid` | `ICO-PLU-GRID` |
| `film` | `ICO-PLU-FILM` |
| `map` | `ICO-PLU-MAP` |
| `fileText` | `ICO-PLU-FILE-TEXT` |
| `briefcase` | `ICO-PLU-BRIEFCASE` |
| `sparkles` | `ICO-PLU-SPARKLES` |
| `menu` | `ICO-PLU-MENU` |

**Important:** the runtime registry currently marks all 27 entries `PROVISIONAL`. The product/design approval status must be reconciled explicitly; do not silently promote the entire catalogue to Approved.

## 4. Confirmed runtime consumers inspected

The following are confirmed from the source files inspected in this audit. This is a starting consumer map, not yet an exhaustive page-by-page usage census.

| Runtime file | Confirmed use |
|---|---|
| `src/features/home/home-page.js` | Bottom navigation, account/header actions, post actions, feed empty state, feature links. Uses `book`, `eye`, `message`, `user`, `heart`, `search`, `cart`, `bell`, `image`. The center create control also uses a literal text plus rather than the registered `plus` icon. |
| `src/features/social/social-pages.js` | Bottom navigation, empty states, profile business tabs/cards, profile tabs, profile quick settings and sign-out. Uses `book`, `eye`, `message`, `user`, `store`, `briefcase`, `image`, `mapPin`, `mail`, `lock`, `grid`, `film`, `map`, `fileText`, `logout`. The profile gear is currently raw inline SVG, not the registered `settings` icon. The center create control is a literal text plus. |
| `src/features/dashboard/dashboard-page.js` | Empty states, business options, notifications, Inbox, sign-out and module navigation. Uses `book`, `message`, `mail`, `logout`, plus data-driven module icon names. |
| `src/features/auth/auth-page.js` | Password visibility, validation, submit action, pending and security notices. Uses `eye`, `eyeOff`, `check`, `arrow`, `mail`, `lock`. |
| `src/features/marketplace/marketplace-home-page.js` | Wishlist action uses `heart`; marketplace brand markup currently writes its own logo image markup. |
| `src/features/home/business-home-page.js` | Imports the central icon renderer, but also contains separate inline SVG artwork for app-store badges and a static app-navigation mockup. These need classification as brand/platform marks or illustrative mockup artwork, not automatic conversion into generic UI icons. |
| `src/design-system/page-shell.js` | Shared bottom navigation uses central icons; this renderer is a shared consumer. |

## 5. Confirmed gaps and inconsistencies

### 5.1 Profile gear bypasses the central registry

In `src/features/social/social-pages.js`, the profile settings link contains its own inline SVG. The central registry already contains a `settings` entry, but the profile does not call `renderIcon('settings')`.

This creates two sources for the same semantic control. The existing profile artwork must be reviewed against the registry artwork before consolidation. Do not silently replace one shape with another. Once the canonical artwork is decided, all profile settings controls must call the same semantic registry entry.

### 5.2 Icon presentation is local, but some declarations are duplicated

The global `.ui-icon` wrapper is 20 × 20px by default. Feature styles intentionally adjust the wrapper for local contexts (for example profile tabs, navigation, settings shortcuts and cover controls). This is the correct ownership direction when only presentation changes.

However, `src/features/social/social-pages.css` contains repeated selectors for some icon consumers, including multiple `.social-profile-gear .ui-icon` and cover-menu icon rules. Some declarations occur in separate responsive or later refinement blocks. These must be consolidated only after cascade and viewport behavior are verified; do not append another override.

Also, the current profile gear uses raw SVG and therefore does not receive the `.ui-icon` wrapper rules. Its inline width/height currently control its artwork size. That is a separate implementation path and must be removed through a behavior-preserving migration after artwork reconciliation.

### 5.3 Some repeated symbols bypass the registry

The create/plus control in Home and Social navigation uses a literal text `+`, even though `plus` exists in the registry. The app navigation mockup in the business homepage contains hand-authored SVGs. Each occurrence must be classified: production UI icon, brand mark, app-store mark, or illustrative/demo-only artwork.

### 5.4 Documentation does not fully match runtime

- The runtime tree currently contains `src/design-system/icons.js`; older inventory notes refer to legacy paths such as `src/components/common/icons.js`, `src/design-system/icons/registry.js`, `icons/social-registry.js`, and `icons/app-registry.js` that are not present in the current tree.
- The Icon Library README describes earlier profile tab mappings (`play`, `mapPin`, `book`) while the current profile tabs use `grid`, `film`, `map`, and `fileText`; Store and Services use `store` and `briefcase`.
- The older asset warehouse count of 12 general + 36 social + 12 app icons does not describe the current runtime registry of 27 names. It must be marked historical or reconciled, not used as the current inventory.

## 6. Required contract going forward

### Central identity contract
- Every reusable UI icon has one stable semantic name and one canonical artwork source in the design-system registry.
- Pages/features must reference the semantic name; they must not copy SVG path data into page markup.
- A central artwork update changes the shape everywhere the semantic name is consumed.
- A central artwork update must not modify consumer-specific dimensions, color, placement, spacing, hit target, accessibility label, action, state, or responsive behavior.
- If two meanings genuinely require different artwork, register separate semantic names. Do not overload one name with unrelated meanings.

### Consumer presentation contract
- The consuming component owns local presentation configuration: size, inherited color, alignment, spacing and placement.
- Prefer existing design tokens and named component variants. A page may use a different icon size without creating a new icon artwork or changing the global artwork source.
- Icon-only interactive controls must retain an accessible name on the control and an adequate touch target. Artwork dimensions and hit-area dimensions are separate properties.
- CSS that sizes an icon must target the icon wrapper/component, not copied SVG internals.

### Behavior contract
- The feature/component owns what happens on activation, including navigation, menus, state changes and permissions.
- The icon registry must not own click behavior or page routing.
- Replacing artwork must not alter event handlers or behavior.

### New icon workflow
1. Search this runtime registry and all existing local SVG assets.
2. Check semantic meaning and consumers; do not add a duplicate under a different spelling.
3. If missing, record the use case and candidate artwork for product-owner review.
4. Add the approved artwork once to the central registry and document provenance/license.
5. Add or update tests for registry presence, stable rendering, unknown-name handling and consumer presentation independence.
6. Update the consumer map and change history.

## 7. Next audit/implementation sequence

1. Complete the repository-wide scan of all JS/HTML/SVG/CSS for inline icon artwork, literal symbol substitutes, icon fonts and external icon sources.
2. Build a complete semantic-name → artwork → renderer → consumer → CSS presentation map.
3. Reconcile all registry/documentation path and status conflicts.
4. Review the profile gear's existing SVG against the registered `settings` artwork; make one canonical choice without changing its current size or action.
5. Migrate confirmed production UI icon bypasses to the central registry, one controlled slice at a time.
6. Consolidate repeated presentation selectors only after preserving the measured desktop/mobile output.
7. Add automated checks preventing unregistered inline UI icons and duplicate icon artwork from reappearing.
8. Run `npm test`, `npm run build`, and viewport/regression checks on all known consumers.

**No icon artwork, visual size, page layout, behavior, or runtime file was changed as part of this audit record.** This document records observed facts and the safe implementation order; it does not mark the icon library approved or complete.
