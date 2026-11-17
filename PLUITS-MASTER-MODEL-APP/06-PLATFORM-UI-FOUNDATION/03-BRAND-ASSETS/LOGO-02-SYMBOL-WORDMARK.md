# LOGO-02 — Symbol + Wordmark

Status: **Approved usage variant; spacing refinement recorded 2026-11-18.**

## Identity

- **ID:** LOGO-02
- **Name:** PLUITS Symbol + Wordmark
- **Purpose:** Horizontal brand lockup for contexts where the PLUITS name should accompany the symbol.
- **Runtime renderer:** `renderBrand()` in `src/design-system/page-shell.js`.
- **Symbol source:** `public/assets/brand/pluits-logo.svg`.
- **Wordmark source:** The canonical text node rendered by `renderBrand()`; do not replace it with a second image or manually typed page-local text.

## Visual contract

| Property | Standard |
|---|---|
| Symbol rendered size | 34 × 34 CSS px |
| Symbol-to-wordmark gap | **4 CSS px** |
| Wordmark desktop font size | 19 CSS px |
| Wordmark mobile font size | 17 CSS px at the existing max-width 600px rule |
| Wordmark weight | 800 |
| Wordmark letter spacing | 0.11em |
| Wordmark color | `var(--pl-color-ink)` |
| Alignment | Vertically centered, horizontal inline-flex lockup |
| Symbol color/gradient | Preserve canonical SVG unchanged |

The 4px gap replaces the previous 10px gap because the earlier spacing made the symbol and name feel disconnected. The new gap keeps a visible separation while making the two parts read as one lockup.

## Source of truth

- Symbol size: `--pl-brand-logo-size` in `src/design-system/tokens.css`.
- Lockup gap: `--pl-brand-lockup-gap` in `src/design-system/tokens.css`.
- Wordmark typography and color: `.pluits-brand` in `src/styles/global.css`.
- Runtime markup: `renderBrand()` in `src/design-system/page-shell.js`.

Do not set these values inside individual pages or feature styles.

## Usage guidance

- Select LOGO-02 when the page/header needs both the symbol and PLUITS name.
- Use the separately registered symbol-only variant when the context explicitly calls for the mark alone.
- Keep the symbol and wordmark as one accessible brand link.
- Preserve the SVG aspect ratio and original gradient.
- Do not change symbol size, wordmark font size, weight, letter spacing, or color when adjusting only the lockup gap.

## Change impact

Changing `--pl-brand-lockup-gap` affects every page that renders LOGO-02 through the shared `renderBrand()` component. It does not affect symbol-only usage. Check all shared-header consumers and their desktop/mobile alignment after a change.

Changing `--pl-brand-logo-size` affects the rendered symbol wherever the shared brand renderer is used. Changing wordmark typography or color affects all LOGO-02 consumers.

## Change procedure

1. Identify whether the request concerns spacing, symbol dimensions, typography, color, or source artwork.
2. Change only the corresponding canonical token/style property.
3. Do not bundle unrelated logo changes into a spacing adjustment.
4. Update this specification and the Brand Assets README whenever the contract changes.
5. Check shared-header consumers at desktop, tablet, and mobile widths.
6. Record regression results and commit/deployment status.

## Change record

- **2026-11-18:** Reduced symbol-to-wordmark gap from 10px to 4px via the new global token `--pl-brand-lockup-gap`. Kept the 34px symbol, wordmark typography, and color unchanged.
