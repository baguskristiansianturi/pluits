# PLUITS-VISUAL-ASSET-LIBRARIES-001

Status: **APPROVED AS PRODUCT DIRECTION — asset production and legal clearance pending**.
Owner: Product Owner / Social Media Product Design.
Scope: profile-cover media library and animated social-reaction assets.

## 1. Purpose

Establish dedicated, governed asset libraries for distinctive PLUITS visual experiences. The libraries are separate from user-uploaded media and from ordinary UI icons or illustrations.

The initial scope contains two asset families:
1. **PLUITS Fluvara** — the curated profile-cover collection for still images, short looping videos, and original fluid-motion visual assets.
2. **Social Reaction Characters** — animated human/character expressions intended for use in comments and other approved social interactions.

These are asset-library specifications. They do not by themselves implement a profile editor, comment composer, entitlement system, media delivery service, or runtime animation player.

## 2. PLUITS Fluvara

### Name and positioning
- Working product name: **PLUITS Fluvara**.
- User-facing location: **Pengaturan Profil → Edit Sampul → Pustaka Sampul → Fluvara**.
- Positioning: a curated visual collection that lets a member express their profile identity through still imagery, video, and original fluid-motion artwork.
- The name is approved as the PLUITS working product name. Trademark availability, confusingly similar marks, and relevant registration classes must be checked before any claim of registered or exclusive trademark rights.

### Initial collection types
- **Foto** — still-image covers.
- **Video** — member-provided or properly licensed short video covers.
- **Fluvara** — original PLUITS fluid-motion cover assets.

### Initial art-direction labels
These are proposed collection labels, not yet finalized production categories:
- Fluid Glass
- Liquid Flow
- Pearl Motion
- Aurora Flow

Do not create placeholder artwork and present it as finished library content. Add only original PLUITS assets or assets with documented licenses that explicitly permit the intended distribution and use.

## 3. Social Reaction Characters

A separate library is reserved for animated human/character reactions used in comments and potentially other social interaction surfaces.

Potential expression families include laughter, joy, surprise, affection, sadness, confusion, and encouragement. This list is exploratory; final expression names, character style, animation formats, and interaction placements require design review.

This library must not be merged into Fluvara: Fluvara is for profile-cover identity, while Social Reaction Characters are expressive interaction assets.

## 4. Asset ownership, licensing, and provenance

For every asset, maintain a record containing:
- Stable asset ID and display name.
- Asset family and category.
- Creator/author and creation date.
- Source file and delivered file formats.
- Copyright owner and evidence of ownership or assignment.
- License terms, permitted uses, restrictions, attribution, and expiry where applicable.
- Whether it is original PLUITS work, commissioned work, user-uploaded content, or third-party licensed content.
- Variants, preview, accessibility description, and technical metadata.
- Review and publication status.

Do not label a third-party licensed asset as PLUITS-owned. Commissioned assets require a written agreement that clearly addresses copyright ownership or the required license grant. User uploads remain subject to the platform's user-content terms and must not be silently added to the official curated library.

The Fluvara name is a working product name, not proof of trademark registration. Conduct a proper trademark search and obtain legal review before asserting exclusivity.

## 5. Storage and source-of-truth boundaries

- Canonical product requirements and approval history live in this document.
- The actual static asset directories are under `public/assets/library/`.
- The runtime asset catalogue/manifest must be introduced only when the asset schema and delivery mechanism are designed and approved.
- Do not put user-uploaded files in the curated static asset directories. User media belongs in the user-content storage architecture.
- Do not add empty, misleading, or fabricated production asset entries.

## 6. Runtime integration — future work

### Profile covers
The profile editor should eventually provide a preview-first selection flow, with the ability to inspect how a cover appears on the profile before saving. Still image, video, and Fluvara motion assets must have clear previews and licensing/entitlement metadata.

### Comment reactions
The comment composer should eventually expose a curated reaction picker backed by Social Reaction Characters. It must remain separate from emoji reactions and ordinary static stickers unless a later product decision combines them.

### Performance and accessibility
Motion must be optimized for mobile and low-memory devices, respect reduced-motion preferences, avoid unnecessary continuous work when off-screen, and provide meaningful accessible labels or static alternatives.

No specific frame rate, duration, dimensions, codec, file size, or animation technology is approved in this document. Those values must be established through asset and device testing before production.

## 7. Status and acceptance criteria

- [x] Product direction and two distinct asset families recorded.
- [x] Dedicated source folders reserved.
- [ ] Fluvara trademark search and legal review.
- [ ] Original/licensed asset production and provenance records.
- [ ] Asset schema and catalogue/manifest approval.
- [x] Profile-cover picker and preview UX specification.
- [ ] Social reaction picker and comment integration specification.
- [ ] Mobile performance, accessibility, and reduced-motion validation.
- [ ] Entitlement and licensing rules for free/premium assets.

## 8. Change control

Any new asset family, change to ownership/licensing rules, or use outside the approved surfaces must update this document and the relevant asset registry before implementation.


## 2.1 Profile-cover controls and selection experience

The profile hero exposes a compact three-dot cover menu in its upper-right corner. The menu contains exactly three controls:
- **Activate cover:** a small, accessible switch. Its off state is neutral grey and its on state is green. The switch controls visibility independently of media selection. ON with no selected media keeps an empty cover area; OFF hides the cover area entirely and gives the profile identity 40–50 px of top breathing space. Turning it ON restores the cover area without requiring a new media selection.
- **Edit cover:** opens the cover editor only while the cover switch is on. This control is visibly disabled and cannot be activated while the cover is off. The editor accepts a member-selected image or video and shows a preview before applying it. The current frontend accepts JPG, PNG, WebP, and GIF images up to 10 MB, plus MP4/WebM videos up to 10 seconds. GIF is treated as animated image media and previews in the same cover crop frame. Applied media is stored locally in IndexedDB and restored after reload; the ON/OFF preference is stored in localStorage. These are device/browser-local settings, not account synchronization.
- **Cover library:** opens the curated PLUITS library, intended for approved animated cover assets. Until approved animations and provenance records exist, the library displays a clear not-yet-published state rather than fabricated artwork.

The cover editor is preview-first. Applying a selected file stores it in browser IndexedDB so it survives reloads on the same browser/device. The ON/OFF preference is stored separately in localStorage. Turning the switch OFF never deletes the selected file. The editor exposes an explicit **Hapus sampul** action; only that action deletes the saved local media. Browser-local storage does not synchronize between devices and may be cleared by the user/browser. Permanent account persistence, cross-device synchronization, media delivery, licensing metadata, and entitlement checks require the future PLUITS-owned profile-media service.

The cover menu and editor must remain in the Social Profile feature module, reuse the existing icon registry and design tokens, work with keyboard/touch input, and preserve the cover slot's established dimensions across desktop and mobile breakpoints. Cover animations must be cropped/scaled inside that same slot and must never change its dimensions or the profile identity overlap.


### Profile-cover editor presentation refinement — 22 November 2026
- The editor is a centered, taller dialog with generous internal spacing and a responsive scroll limit; it must not collapse into a short, cramped card.
- Use a translucent glass surface and a softly blurred/dimmed active page behind it. The editor panel is not an opaque white card.
- The upload area clearly lists supported formats and limits: JPG/PNG/WebP/GIF up to 10 MB; MP4/WebM up to 10 seconds.
- The media picker and Save/Cancel actions use refined transparent/outline treatments with clear hover, pressed, focus, and disabled states rather than heavy filled button backgrounds.
- Keep the native file input activation path intact for Android/mobile reliability. GIF uses the existing image preview/crop path and retains animation when applied as an image.
- Runtime mapping: `src/features/social/profile-cover-controls.js`, `src/features/social/social-pages.css`; regression coverage: `tests/features/profile-cover-controls.test.js`.


### Android native picker and modal backdrop refinement — 22 November 2026
- Keep the actual `input[type=file]` visibly rendered and touchable. Do not hide it behind an opacity overlay or depend on synthetic `.click()` / `showPicker()` activation.
- Associate the visible explanatory label with the file input through an explicit `for` / `id` pair. The native input remains independently tappable.
- Style the browser file-selector button without hiding the browser-provided file control.
- The modal scrim uses a restrained dark tint and a low blur radius so the active page remains recognizable behind the editor.
- Runtime: `src/features/social/profile-cover-controls.js`, `src/features/social/social-pages.css`; regression: `tests/features/profile-cover-controls.test.js`.
