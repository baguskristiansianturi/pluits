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

The profile hero exposes a three-dot cover menu in its upper-right corner. The menu is scoped to cover presentation and contains:
- **Without cover:** hide the cover region and reflow the identity row so no empty cover-sized gap remains; avatar and identity return to the compact no-cover composition.
- **Add or change cover:** accept a member-selected image and show a preview before applying it. The initial browser-only UI accepts JPG, PNG, and WebP files up to 10 MB; final server-side limits and media processing remain subject to the media-service design.
- **Edit cover text:** edit the short text overlay independently from the cover image.
- **Cover library:** open the curated PLUITS collection with separate Foto, Video, and Fluvara categories. The picker must not show fabricated artwork. Until approved assets and provenance records exist, each category displays a clear not-yet-published state.

The cover editor is preview-first. Applying changes in the current frontend-only stage updates the in-page presentation for the current session; it does not claim permanent account persistence or upload media to a server. Permanent save, media storage, licensing metadata, and entitlement checks require the future profile-media service.

The cover menu and editor must remain in the Social Profile feature module, reuse the existing icon registry and design tokens, work with keyboard/touch input, and preserve the profile's responsive layout. Selecting “Without cover” must remove the cover row's vertical space and reset overlap offsets at desktop and mobile breakpoints.
