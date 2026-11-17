# 02 — Responsive System

Owns the single responsive rule set for all PLUITS pages.

## Register scope

- Supported viewport classes and breakpoint definitions.
- Container widths, page gutters, and safe areas.
- Grid columns, gaps, and layout transitions.
- Responsive navigation and shell behavior.
- Touch target and input usability requirements.
- Image/media sizing, cropping, and aspect-ratio rules.
- Overflow, wrapping, and content-density rules.
- Responsive testing viewport matrix.

## Rules

- Responsive behavior is defined centrally and reused by all pages.
- Pages may change composition across viewports, but may not invent competing breakpoint systems.
- Use fluid sizing where appropriate and define max-width constraints where needed.
- Prevent unintended horizontal overflow, clipped controls, unreadable text, and inaccessible touch targets.
- Test narrow phones, common phones, tablets, laptops, and wide desktops, including widths around each breakpoint.

## Not yet approved

The baseline viewport examples used during discussion are test targets only. Exact breakpoint values, container widths, gutters, and grid rules must be audited and approved before they become mandatory tokens.
