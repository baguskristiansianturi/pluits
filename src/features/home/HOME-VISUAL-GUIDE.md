# Public Homepage — Visual Asset Guide

Status: Implemented visual registry; photo selection is an editorial draft and may be replaced.

## Single source of truth
- Image registry: `src/features/home/home-visuals.js`
- Page composition: `src/features/home/business-home-page.js`
- Responsive image layout and spacing: `src/features/home/business-home.css`

Change a photo by editing the matching `src` and `alt` fields in `HOME_VISUALS`. Keep the image key stable so page composition does not need to change. Use descriptive alt text, prefer landscape photos, and keep source/provenance links with the entry.

## Image roles and recommended crops
| Key | Page use | Recommended source ratio | Layout |
|---|---|---:|---|
| hero | Main landing-page promise | 4:5 to 1:1 | Large editorial image, desktop two-column / mobile stacked |
| community | User story / Social | 4:3 | Featured large card |
| collaboration | Community | 1:1 | Compact horizontal card |
| discovery | Places and activities | 4:5 | Compact horizontal card |
| business | Business owner offer | 4:3 to 16:9 | Large image with short overlay copy |
| food | Restaurant discovery | 4:3 | Discovery card |
| coffee | Local spaces | 4:3 | Discovery card |

## Composition rules
- Keep the shared 50px navbar-to-content spacing and shared page shell geometry.
- Main message and hero image receive the largest visual weight.
- User benefits use one featured card and two compact horizontal cards; avoid three oversized equal cards.
- Business benefits remain concise and use a single large supporting photograph.
- Discovery cards are smaller than hero and featured content. On mobile they become compact horizontal rows.
- Use `object-fit: cover`; adjust `object-position` on the image key's CSS selector only when the subject crop requires it.
- Keep text outside image pixels wherever possible. Overlay text needs a dark gradient for contrast.
- All non-hero images lazy-load; hero image loads eagerly with high fetch priority.

## Image source and licensing notes
Current photo references are from Unsplash CDN and use the Unsplash License. The license permits broad use, including commercial use, subject to its restrictions. Review the current license before replacing assets or redistributing originals:
- Unsplash: https://unsplash.com/license
- Unsplash photo discovery collections are recorded per image in `home-visuals.js`.
- This public-homepage photo registry is an explicit exception to the former no-remote-image prototype rule. No external image library, script, or runtime package is added.

## Responsive breakpoints
The homepage uses the established PLUITS contracts: desktop at 1024px and above, tablet 768–1023px, mobile 767px and below. Page gutter, logo, navbar, footer, and shell geometry remain owned by the shared design system.


## Device mockup composition
- The Android and iPhone previews overlap naturally; Android remains the foreground device.
- Keep the space behind the devices as a soft, low-contrast teal/blue radial glow. It is atmospheric lighting only, not a panel, card, frame, or separate decorative object.
- Keep the in-screen PLUITS symbol and wordmark visually grouped with a compact gap. The shared site-header lockup remains governed separately by the design-system brand token.
- Preserve compact device proportions and responsive spacing on mobile; do not restore oversized handset heights or a large backdrop.
