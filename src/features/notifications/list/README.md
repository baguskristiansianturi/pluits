# Notification List

**Status:** Planned; activity list remains in Account page.

**Target responsibility:** Notification list and read/unread presentation.

**Boundary:** Message unread counts remain separate.

This is tracked architecture scaffolding only. Do not create a new route or duplicate backend model for this folder. Extract when the owning page, consumers and regression tests are mapped.


## Implementation
The runtime module `index.js` now owns list rendering, unread counts, navigation badge painting and realtime/read-state interactions. The Account page supplies dependencies through an adapter.
