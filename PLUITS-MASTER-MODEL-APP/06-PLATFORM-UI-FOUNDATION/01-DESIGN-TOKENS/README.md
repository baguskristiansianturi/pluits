# 01 — Design Tokens

Owns the canonical visual values used by the entire application.

## Register scope

- Semantic color roles and themes.
- Spacing scale and layout gaps.
- Sizing and dimension scales.
- Border widths, radii, and shadows/elevation.
- Layering/z-index conventions.
- Motion duration/easing and opacity, where required.
- Naming conventions and token aliases.

## Rules

- Components and pages consume semantic tokens; they do not scatter arbitrary values.
- A token has one canonical name, definition, purpose, and status.
- Avoid duplicate tokens that represent the same design decision.
- Document theme behavior and contrast requirements.
- A global token change requires consumer impact analysis.

## Not yet approved

No final palette, spacing scale, radius scale, or shadow scale is declared by this setup. Audit the current runtime and proposed visual direction, present the values for review, then mark approved values explicitly.
