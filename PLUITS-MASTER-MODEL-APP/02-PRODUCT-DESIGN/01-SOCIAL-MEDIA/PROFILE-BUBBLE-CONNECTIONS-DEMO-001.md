# PROFILE-BUBBLE-CONNECTIONS-DEMO-001

Status: PROTOTYPE — visual/interaction demo only; not an account relationship feature.
Owner: Product Owner / Social Media Product Design.
Consumers: authenticated profile page.
Access: temporarily visible to all account tiers, including Free, during prototype evaluation.

## Purpose
Demonstrate the proposed PLUITS floating social-bubble visual: differently sized soft circles representing example relationship categories, floating within a bounded area, gently colliding and deforming before returning to their round shape.

## Placement and composition
- Render inside the existing authenticated profile, above the identity card, visually bridging the cover and identity area.
- The cover is a temporary visual placeholder, not a persisted user cover and not the final Living Cover implementation.
- Bubbles represent demo categories only: Pasangan, Keluarga, Sahabat, and Circle.
- The prototype uses original vector portrait illustrations so face deformation can be evaluated before real profile photos are connected.
- Bubble Connections is intended as a selectable profile-cover theme, not a mandatory profile layout. Multiple cover themes may be offered later.
- Proposed commercial entitlement: Gold membership includes this theme at no additional charge for the one-year Gold membership period. This is a product rule for later entitlement/billing implementation, not an active access gate in this demo.
- Do not imply that any real account is connected. The demo note must remain visible.
- No account invitations, relationship management, persistence, profile routing, or settings are implemented.

## Interaction and motion
- Each bubble has a distinct size and simulated mass.
- Bubbles drift gently inside a clipped, bounded field.
- Collision response uses low-restitution momentum transfer and partial overlap correction so the surfaces feel soft and briefly meld at contact. A thin translucent edge and subtle shared contact glow avoid a hard outlined-ball appearance. Directional squash/stretch is applied to the complete bubble element, so the portrait artwork deforms together with the bubble before elastic recovery.
- Users can drag bubbles with pointer/touch input.
- Optional device-orientation input is activated only after an explicit user tap; if unsupported or denied, autonomous motion and dragging remain available.
- Tapping a bubble announces its demo category in an accessible live status region.
- Pause animation when the document is hidden; stop animation during teardown.
- Respect prefers-reduced-motion by presenting a static, usable composition.
- Keep the implementation dependency-free and scoped to the profile feature.

## Responsive and accessibility
- Field height and bubble sizes adapt to narrow screens.
- Bubbles are semantic buttons with descriptive accessible names and visible focus.
- Status updates use aria-live.
- The interaction must not prevent vertical page scrolling outside a bubble drag.

## Runtime mapping
- `src/features/social/social-pages.js`: demo markup, lightweight motion simulation, pointer interaction, optional device-orientation input, lifecycle cleanup.
- `src/features/social/social-pages.css`: isolated cover, field, bubble, collision deformation, responsive and reduced-motion styling.
- Existing design-system spacing, color, radius, and typography tokens are reused. No new global tokens or third-party runtime dependencies.

## Validation and limitations
- The Gold one-year inclusion rule is documented as a proposed entitlement only; the current demo remains visible to all tiers while being evaluated.
- Prototype only; no production relationship data or real connected profiles.
- Device-orientation behavior depends on browser support and user permission.
- Validate desktop and mobile widths, touch dragging, keyboard focus, reduced-motion, hidden-tab pause, and route teardown.
- Revisit performance and collision tuning on low-memory Android devices before production approval.
