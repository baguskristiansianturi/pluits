# Marketplace — Development

Ruang untuk arsitektur frontend/backend, kontrak repository, API, integrasi vertikal, event, data model Marketplace, dan strategi pengujian.

## Batas teknis
- Isolasi kode Marketplace di feature boundary miliknya.
- Integrasi ke Store dan Restaurant & Café melalui kontrak yang jelas.
- Jangan mengakses tabel/domain internal vertikal secara serampangan.
- Perubahan Marketplace tidak boleh merusak homepage PLUITS, Inbox, Profile, Community, navigasi, CSS global, atau modul lain.

## Implementasi yang perlu diaudit
- `src/features/marketplace/`
- `src/pages/marketplace/`
- `src/services/repositories/marketplace/`
- `supabase/migrations/`

## Dokumen kanonis
- [Marketplace Application Modularization](../../../03-APPLICATION-MODULARIZATION/02-MARKETPLACE/README.md)
- [Marketplace Project Register](../../../03-APPLICATION-MODULARIZATION/02-MARKETPLACE/03-PROJECT/README.md)
- [Marketplace Audit](../../../03-APPLICATION-MODULARIZATION/02-MARKETPLACE/04-CHECKLIST-AUDIT/README.md)

Status arsitektur dan kontrak backend harus dicatat setelah audit kode serta migrasi dilakukan.
