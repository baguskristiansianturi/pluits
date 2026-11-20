# PLUITS Push & Priority — Technical Direction 001

- **ID:** SPS-PUSH-001
- **Status:** PROPOSED — technical direction under analysis; not an approved architecture
- **Scope:** Cross-ecosystem promotion capability and future Priority integration
- **Last updated:** 2026-11-21

## Purpose

Record the product direction for a first-party PLUITS promotion ecosystem. Push is intended to connect relevant providers and campaigns with users across PLUITS, rather than being a fixed advertisement slot belonging to one vertical or depending primarily on an external ad network.

This document preserves the direction for future technical analysis. It does not approve a final algorithm, data model, campaign API, pricing model, credit ledger, or implementation plan.

## Product direction

Push is contextual and cross-ecosystem:
- Accommodation promotion may appear while a user explores accommodation.
- Restaurant & Café promotion may appear while a user explores restaurants, cafes, or food discovery.
- Other verticals may supply relevant campaigns when the user explores their category.
- Contextual promotions may also appear at measured intervals within the social Feed.
- Promotion eligibility and placement follow the user's current discovery context, relevant location, and permitted interest signals.

Push is not a permanent top-of-page placement. In particular, paid campaigns must not automatically displace Nearby / Local discovery or make an unrelated destination dominate a location-specific search.

## Fairness and relevance principles

1. **Organic discovery remains distinct.** Organic relevance, location, quality/trust signals, membership, and paid promotion must not be conflated.
2. **Local relevance is protected.** Nearby results remain eligible and discoverable in their appropriate local context; paid budget must not erase local relevance.
3. **Contextual placement.** Campaigns are eligible only where their vertical, location, content, and user intent are relevant.
4. **Clear promotion identity.** Paid or promoted content must be recognizable as such and not presented as an organic quality signal.
5. **Frequency and experience controls.** Future delivery must prevent excessive repetition and interruption across pages and Feed.
6. **Post-transaction relevance.** When a relevant transaction is successfully completed, campaigns pursuing the same immediate intent should be suppressed or adapted. Exact suppression windows and exceptions remain to be researched.
7. **Privacy and user agency.** Interest signals, personalization, retention, consent, user controls, and sensitive-data exclusions require dedicated privacy/security review before implementation.
8. **Provider fairness.** A provider's paid campaign may increase eligible exposure but must not fabricate ratings, availability, quality, verification, or customer trust.

## Future capability areas to investigate

These are conceptual areas for analysis, not finalized services or database tables:
- Campaign and creative management for eligible provider accounts.
- Vertical, placement, location, and context eligibility.
- Contextual relevance and permitted interest-signal processing.
- Local/organic discovery separation and fairness constraints.
- Daily allocation / fair opportunity mechanisms discussed for providers.
- Optional additional Push credits and auditable credit consumption.
- Delivery frequency, deduplication, and cross-surface suppression.
- Transaction-success events and post-conversion suppression.
- Impression, click, conversion, and campaign reporting with privacy safeguards.
- Abuse prevention, advertiser/provider verification, review, and moderation.
- Integration with account, membership, and future Priority entitlements.

## Priority relationship

Push is a potential capability associated with eligible business/provider accounts and future Priority benefits. Priority membership and Push credits/campaign spend are separate concepts until a product and commercial model is approved. Do not infer account eligibility, prices, daily quotas, credit packages, or entitlements from this direction document.

## Future technical questions

- Which component owns campaign records and provider authorization?
- Which events can be used for context and conversion, and under what consent and retention rules?
- How should location relevance interact with organic ranking and promoted inventory?
- How are daily allocation, rotation, fairness, and credit consumption measured and audited?
- What is the appropriate frequency cap across all verticals and Feed?
- What transaction states count as successful conversion, and how are refunds/cancellations handled?
- How can users inspect, dismiss, limit, or opt out of personalized promotion?
- What abuse, fraud, content review, and provider-quality controls are required?
- Which parts belong to shared platform services versus vertical-specific campaign configuration?

## Implementation boundary

- No Push algorithm or delivery service is implemented by this document.
- No tracking SDK, advertising cookie, campaign database, credit ledger, or billing integration is authorized.
- No membership tier or pricing change is authorized.
- The Accommodation frontend should avoid hard-coded ad slots and keep page composition extensible for future contextual placements.
- Any implementation proposal must include privacy/security review, data ownership, event contracts, permission model, auditability, test strategy, rollout, and rollback.

## Change control

Promote this direction to an approved technical architecture only after the open questions are analyzed and the product owner explicitly approves the resulting contracts and boundaries.
