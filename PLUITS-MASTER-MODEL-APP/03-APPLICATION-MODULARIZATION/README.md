## Governance kepemilikan modul dan tim

Gunakan [Modular Ownership, Team Boundaries, and Change Governance](00-MODULAR-OWNERSHIP-AND-TEAM-BOUNDARIES.md) sebagai aturan kanonis untuk pembagian domain, jalur frontend/backend, onboarding staff, penggunaan GitHub, integrasi, versioning, dan fault containment. Pohon target di dokumen tersebut tidak boleh dianggap sebagai lokasi runtime yang sudah diterapkan; setiap domain tetap wajib mencatat kondisi aktual dan migrasinya.

# Application Modularization

Area spesifikasi implementasi per aplikasi: module boundaries, frontend, backend, database, API/event contracts, auth, roles, permissions, RLS, security, testing, deployment dan rollback.

## Batas dengan Platform UI Foundation
- `../06-PLATFORM-UI-FOUNDATION/` adalah sumber standar visual dan UI lintas aplikasi serta SOP penggunaan komponen/aset.
- Folder ini menentukan kepemilikan source code, batas modul, arsitektur teknis, kontrak integrasi, keamanan, testing teknis, deployment, dan rollback.
- Pemetaan antara spesifikasi UI dan file runtime dicatat di `06-PLATFORM-UI-FOUNDATION/11-IMPLEMENTATION-MAPPING/`, sedangkan keputusan arsitektur dan kepemilikan teknis tetap dicatat di sini.

Jangan campur spesifikasi visual/wireframe dengan arsitektur teknis. Jangan mengubah shared runtime tanpa audit konsumen dan dampak.
