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
- Do not imply that any real account is connected. The demo note must remain visible.
- No account invitations, relationship management, persistence, profile routing, or settings are implemented.

## Interaction and motion
- Each bubble has a distinct size and simulated mass.
- Bubbles drift gently inside a clipped, bounded field.
- Collision response separates overlapping circles, transfers momentum, and applies a brief directional squash/stretch before elastic recovery.
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
- Prototype only; no production relationship data or real connected profiles.
- Device-orientation behavior depends on browser support and user permission.
- Validate desktop and mobile widths, touch dragging, keyboard focus, reduced-motion, hidden-tab pause, and route teardown.
- Revisit performance and collision tuning on low-memory Android devices before production approval.
