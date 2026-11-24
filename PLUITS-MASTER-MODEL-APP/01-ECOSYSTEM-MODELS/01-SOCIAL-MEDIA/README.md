# Social Media — Model Ekosistem

Status: **FOUNDATION / MODULARIZATION IN PROGRESS**. Folder ini menjadi peta kepemilikan dan tata kelola domain Social Media PLUITS.

Social Media memiliki empat modul konten mandiri:
1. [Blog](01-BLOG/README.md)
2. [Reels](02-REELS/README.md)
3. [Stories](03-STORIES/README.md)
4. [Live](04-LIVE/README.md)

## Feed bukan modul konten kelima
Feed adalah permukaan agregasi dan distribusi yang menghubungkan konten dari empat modul tersebut serta format post lain yang disetujui. Feed memiliki kontrak distribusi, ranking, audience filtering, dan render integration sendiri; ia tidak mengambil alih domain atau lifecycle modul sumber.

## Empat jalur wajib untuk setiap modul
- `01-DESIGN`: kebutuhan produk, user journey, page inventory, UX, visual behavior, dan acceptance criteria.
- `02-DEVELOPMENT`: domain, frontend/backend boundary, data, API/event contracts, security, state, testing, dan integration.
- `03-PROJECT`: scope, feature register, milestone, delivery, status, dependency, dan bukti implementasi.
- `04-CHECKLIST-AUDIT`: audit, risiko, test matrix, privacy/security, accessibility, performance, dan release gates.

Setiap modul wajib mengisi jalur yang sama. Keberadaan folder/dokumen **bukan bukti bahwa fitur telah diimplementasikan atau disetujui produksi**.

## Fondasi bersama dan kepemilikan lokal
- Fondasi visual lintas aplikasi: `../../06-PLATFORM-UI-FOUNDATION/` (logo, ikon, typography, token, spacing, breakpoint, layout primitives, komponen bersama, dan SOP).
- Product Design Social Media: `../../02-PRODUCT-DESIGN/01-SOCIAL-MEDIA/`.
- Application Modularization Social Media: `../../03-APPLICATION-MODULARIZATION/01-SOCIAL-MEDIA/`.
- Domain-specific layout, behavior, state, components, and CSS belong to the relevant module; do not create one global Social Media stylesheet that owns all four experiences.

## Aturan perubahan
Perubahan pada Blog tidak boleh merusak Reels, Stories, atau Live. Shared code changes require consumer mapping, regression tests, and explicit review. Cross-module integrations must use documented contracts.
