# Social Feed Media & Typography Standard

Status: frontend standard  
Scope: PLUITS Social Feed post cards and regular feed media. Reels remain a separate immersive format.

## Media sizing

Normalize every uploaded feed photo to a supported display ratio; never stretch an image.

| Feed media | Ratio | Reference export at 1080 px wide |
| --- | ---: | ---: |
| Portrait (default) | 4:5 | 1080 × 1350 |
| Square | 1:1 | 1080 × 1080 |
| Landscape | 1.91:1 | 1080 × 566 |
| Optional tallest portrait in native Instagram app | 3:4 | 1080 × 1440 |

The feed UI uses a consistent container for each orientation and `object-fit: cover` for crop-to-fill. Keep the source image intact for full-image viewing. Carousel items must use one ratio per carousel, determined by the first item or the user's chosen crop.

Reels are excluded from these feed-photo rules: use a separate 9:16 immersive viewport, with full-screen behavior and Reel-specific controls.

Instagram's photo-resolution help describes a supported width up to 1080 px and a supported ratio range; 4:5 remains the practical interoperable portrait target, while 3:4 is supported in the native app. These are display/export references, not fixed CSS pixel sizes on every device.

## Feed typography

Instagram does not publish a universal CSS font-size specification for its app UI; physical text size varies with device density and accessibility settings. PLUITS therefore adopts a readable mobile-first scale inspired by the familiar feed hierarchy:

| Element | PLUITS size | Line height / note |
| --- | ---: | --- |
| Author display name | 15 px | medium/semibold |
| Username / post metadata | 13 px | subdued, still readable |
| Main caption | 16 px | 1.5 |
| Comment body | 14 px | 1.45 |
| Comment author | 13 px | semibold |
| Caption expand / feed actions | 14 px | touch-friendly |
| Secondary metadata | 12 px minimum | small labels only |

Tiny decorative marks, tier indicators, and compact icon badges may be smaller; meaningful content and action labels should not be reduced to 9–11 px. Respect browser zoom and system text scaling where possible.

## Implementation boundaries

- Changes remain inside `src/features/social/feed/social-post-card.css`.
- Do not change global typography, shared app navigation, Marketplace, Blog, or Reels styles.
- Keep feed-specific selectors namespaced under `.pl-post-`.
- After changes, check narrow mobile width, landscape/portrait/square crops, caption expansion, comments, and Reel isolation.
