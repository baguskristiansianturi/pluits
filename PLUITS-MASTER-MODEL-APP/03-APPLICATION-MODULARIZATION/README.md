# Application Modularization

Area spesifikasi implementasi per aplikasi: module boundaries, frontend, backend, database, API/event contracts, auth, roles, permissions, RLS, security, testing, deployment dan rollback.

## Batas dengan Platform UI Foundation
- `../06-PLATFORM-UI-FOUNDATION/` adalah sumber standar visual dan UI lintas aplikasi serta SOP penggunaan komponen/aset.
- Folder ini menentukan kepemilikan source code, batas modul, arsitektur teknis, kontrak integrasi, keamanan, testing teknis, deployment, dan rollback.
- Pemetaan antara spesifikasi UI dan file runtime dicatat di `06-PLATFORM-UI-FOUNDATION/11-IMPLEMENTATION-MAPPING/`, sedangkan keputusan arsitektur dan kepemilikan teknis tetap dicatat di sini.

Jangan campur spesifikasi visual/wireframe dengan arsitektur teknis. Jangan mengubah shared runtime tanpa audit konsumen dan dampak.

## Fluids Messaging
Arsitektur teknis Fluids Messaging mengikuti jalur model [Fluids Messaging](../01-ECOSYSTEM-MODELS/07-FLUIDS-MESSAGING/README.md). Source ownership target, backend Go/PostgreSQL, authorization, realtime, media, integration contracts, tests, deployment, dan rollback harus ditetapkan serta diverifikasi di dokumen modularisasi khusus sebelum implementasi runtime.
