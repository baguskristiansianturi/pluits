# 06 — Component Library

Owns reusable interface components shared across PLUITS pages and ecosystems.

## Register scope

- Buttons, links, icon buttons, and action groups.
- Inputs, selectors, forms, and validation messages.
- Cards, lists, menus, tabs, badges, and tooltips.
- Dialogs, drawers, popovers, alerts, and toasts.
- Headers, navigation, footers, and shared application shell components.
- Loading, empty, error, success, disabled, selected, focused, and pressed states.

## Required specification per component

Record purpose, anatomy, variants, size tokens, states, responsive behavior, accessibility/keyboard behavior, content constraints, usage examples, and runtime implementation mapping.

## Rules

- Prefer one reusable component with documented variants over multiple near-duplicates.
- Components consume approved tokens and approved icons.
- Do not introduce page-specific CSS that changes a shared component globally.
- A shared component change requires a consumer inventory, impact analysis, and regression checks.


## NAV-001 — Shared Navbar/Header Boundary

The shared page header is the canonical navbar/header boundary. It always renders a soft bottom divider through the shared page-shell stylesheet. The divider is mandatory and automatic for every `renderPageHeader()` consumer; page authors must not add or remove it locally.

See [NAV-001-SHARED-NAVBAR.md](./NAV-001-SHARED-NAVBAR.md) for tokens, implementation, consumer impact, responsive behavior, and change procedure.
