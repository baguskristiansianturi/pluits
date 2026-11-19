# 10 — Quality and Change Control

Owns the UI quality gates and safe-change procedure for the whole application.

## Responsive quality gate

- No unintended horizontal page overflow.
- No clipped, overlapping, or unreachable controls.
- Text remains readable and wraps/truncates according to approved rules.
- Images and media preserve approved crop/aspect behavior.
- Navigation and primary actions remain usable at every supported viewport.
- Layout transitions are checked immediately below, at, and above breakpoints.

## Visual and component quality gate

- Only approved tokens, fonts, brand assets, and icons are used.
- Shared components use registered variants and states.
- Spacing, alignment, radius, borders, and elevation follow the foundation.
- Empty, loading, error, disabled, focus, and success states are covered where relevant.
- Accessibility, keyboard operation, contrast, and touch usability are checked.

## Change-impact gate

Before merge/deployment, record:

- Changed files and owning module.
- Shared components/tokens/assets affected.
- Known routes and consumers inspected.
- Responsive viewports and interaction states tested.
- Regression checks and results.
- Approved exceptions and follow-up work.

## Release rule

Do not mark a UI change complete when a required viewport, shared consumer, or critical state remains untested. Record limitations transparently and do not claim a successful deployment without workflow evidence.


## Shared header divider regression check

When changing the shared divider tokens or page-header chrome, verify all consumers of `renderPageHeader()` at desktop, tablet, and mobile widths. Confirm that the line remains subtle, spans the shared header container, does not alter the header's defined height, and does not introduce duplicate borders in page-level CSS. Check the footer top boundary remains visually matched.


## Repository structure audit records

Repository-wide documentation placement and structure audits are maintained in [`REPOSITORY-AUDITS/`](./REPOSITORY-AUDITS/). Keep audit reports here rather than creating a generic audit folder at the repository root.
