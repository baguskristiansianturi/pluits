# PLUITS Account Documentation

**Status:** Living working documentation — founder discussion and decisions are recorded here.  
**Scope:** The PLUITS account system, membership levels, account settings, profile identity, permissions, product behavior, and eventual technical implementation.

## Purpose

Folder `account/` is the central source of truth for designing and building PLUITS account capabilities. It must explain both **what the product must do** and, once agreed, **how the system should implement it**. Frontend, backend, database, APIs, security policies, algorithms, and tests must derive from the applicable agreed documents here rather than assumptions.

These documents are working documents. During discussion, revise the relevant section directly when a better proposal or founder decision emerges. Do not preserve an earlier proposal merely because it was written first. Clearly mark confirmed decisions, proposals, open questions, constraints, and technical feasibility that still needs validation.

## Working principles

1. Keep account-wide foundations and social-account rules here. Business, store, service-provider, transaction, and financial entitlements may be documented separately when their scope is opened.
2. Membership rights are cumulative unless a specific agreed rule says otherwise.
3. The same basic profile layout, content structure, and feed experience apply to every membership level. Membership recognition is a visual identity treatment only; capability differences belong in account permissions/settings and the relevant feature behavior.
4. Never infer final menu names, feature allocation, algorithms, database design, or implementation details from an early sketch. They remain editable until agreed.
5. Keep product behavior and technical implementation connected: every agreed capability should eventually have its permission rules, data needs, frontend behavior, backend enforcement, algorithm (if applicable), and test cases documented.
6. Do not change production code, schema, RLS, APIs, active roadmap, or deployment merely because a concept is discussed. Implementation requires explicit founder direction and the applicable change-control process.

## Documents

- [Social Account Rules](social-account-rules.md) — account levels, cumulative entitlements, social capabilities, privacy and access rules.
- [Profile Identity](profile-identity.md) — the single shared profile layout and the small visual membership identifiers that distinguish account levels.
- [Account Settings and Navigation](account-settings-and-navigation.md) — what account settings manage, proposed menu groupings, permissions and controls; menu structure remains changeable.
- [Technical Foundation](technical-foundation.md) — how agreed account behavior is translated into frontend, backend, database, APIs, security, algorithms and tests.
- [Decision Log](decision-log.md) — dated record of founder-confirmed decisions and unresolved items.

## Change and implementation sequence

The order of documents or topics is not the implementation order. First complete and reconcile the account model and its rules. Then map dependencies and technical requirements. Only after the account foundation is sufficiently agreed should the build sequence be prioritized. UI layout details such as exact arrangement, colors, and final visual styling can be decided at the appropriate design stage without changing the product rules.
