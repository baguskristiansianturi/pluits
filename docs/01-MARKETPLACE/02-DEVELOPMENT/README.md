# Marketplace — Development

Ruang untuk arsitektur frontend/backend, kontrak repository, API, integrasi vertikal, event, data model marketplace, dan strategi pengujian.

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

Status arsitektur dan kontrak backend harus dicatat setelah audit kode serta migrasi dilakukan.
