# PLUITS Partner — Category Catalogue and Locked Subcategory States

Status: **INITIAL PRODUCT DESIGN — taxonomy review and operational contracts pending**

## Purpose

PLUITS Partner is the partner-facing discovery and category catalogue surface within the PLUITS ecosystem. It helps users discover businesses, providers, services, accommodation, transport, tickets, and classified opportunities. It is not a replacement for the operational systems owned by Store, Restaurant & Café, Logistics & Transportation, Tickets & Accommodation, Geo Directory, or other domain modules.

## Information architecture

The catalogue follows this hierarchy:

1. PLUITS Partner
2. Parent category
3. Subcategory
4. Partner listing/profile (future; backed by the owning module and verified records)

Do not promote every specific business type to a parent category. Keep related types grouped under a stable parent. Deeper classifications may be added beneath a subcategory when they represent meaningful distinctions, such as Toko & Perdagangan → Fashion → Butik / Toko Pakaian / Outlet.

## Initial parent categories and subcategories

| Parent category | Subcategories (initial catalogue) |
|---|---|
| Transportasi | Sewa Mobil; Sewa Motor; Kurir & Pengiriman; Transportasi Penumpang; Transportasi Barang; Transportasi Umum |
| Toko & Perdagangan | Fashion (butik, toko pakaian, outlet); Elektronik & Gadget; Kecantikan; Rumah & Perlengkapan; Kebutuhan Harian; Otomotif; Olahraga; Kerajinan & Suvenir; Toko Lainnya |
| Akomodasi | Hotel; Villa; Homestay; Guest House; Hostel; Apartemen; Resort; Camping & Glamping |
| Ticketing & Perjalanan | Tiket Pesawat; Tiket Kapal; Tiket Bus; Tiket Kereta; Tiket Atraksi; Tiket Aktivitas; Paket Perjalanan |
| Layanan Profesional | Desain & Kreatif; Teknologi; Pemasaran; Penulisan; Konsultan; Pendidikan & Pelatihan; Perawatan & Pemeliharaan; Jasa Personal |
| Makanan & Minuman | Katering; Bakery & Pastry; Kedai & Warung; Coffee Shop; Produsen Makanan; Penyedia Minuman |
| Properti & Ruang | Jual Properti; Sewa Properti; Ruang Kantor; Co-working Space; Ruang Acara; Ruang Komersial |
| Iklan Baris & Lowongan | Lowongan Kerja; Pencari Kerja; Iklan Properti; Iklan Kendaraan; Barang Bekas; Penawaran Jasa; Bisnis & Peluang Kemitraan; Iklan Lainnya |
| Mitra Lainnya | Event Organizer; Penyedia Tenaga Kerja; Kesehatan & Kebugaran; Komunitas & Organisasi; Bidang Lainnya |

This is an initial working taxonomy, not a claim that every vertical is implemented or approved for launch. The catalogue should be refined through module audit and founder review.

## Classification rules

- A parent category represents a broad service or commercial domain.
- A subcategory represents a distinct service/product family under that domain.
- Deeper labels are reserved for useful specializations, not duplicated as peer parent categories.
- One partner may appear in multiple categories only when supported by verified profile data and explicit provider declarations.
- Transport providers, car/motorcycle rental, courier, and freight are distinct service types even though they share the Transportasi parent.
- Ticketing and accommodation remain separate from vehicle/transport provision because their inventory, booking, and fulfillment models differ.
- Fashion subtypes such as boutique, clothing shop, and outlet belong under Toko & Perdagangan → Fashion.
- Classifieds and job listings require their own future listing, candidate/company, application, moderation, and trust flows; they must not be represented as active job services before those flows exist.

## Existing module boundaries and duplication control

- Store remains the operational owner for merchant stores, product catalogues, variants, inventory, Seller Center, and store orders. Toko & Perdagangan is the discovery taxonomy, not a second Store module.
- Restaurant & Café remains the operational owner for restaurant/café branches, tables, reservations, visits, menus, kitchen, service, cashier, and restaurant orders. Makanan & Minuman is a discovery taxonomy and must route supported merchant listings to the existing module rather than duplicating restaurant operations.
- Geo Directory owns place records, location discovery, claim, and verification. A store and its physical place are related but distinct records.
- Logistics & Transportation owns its transport/courier operational contracts. PLUITS Partner only classifies/discovers providers.
- Tickets & Accommodation owns ticket and accommodation inventory/booking contracts. PLUITS Partner does not own inventory or booking state.
- Marketplace remains the customer discovery, aggregation, and transaction layer across merchant verticals. PLUITS Partner must not become a competing checkout or merchant operations system.

## Locked subcategory card behavior

- Render each parent category as a titled group.
- Render every planned subcategory as an individual card.
- Every not-yet-released card shows a visible lock icon and an accessible locked label.
- Locked cards are non-interactive informational cards; they must not trigger navigation, booking, claims, messaging, or transactions.
- Keep locked categories visible so the roadmap remains discoverable and is not forgotten.
- Unlocking is a deliberate manual release by an authorized PLUITS administrator after the corresponding module is built, audited, tested, and approved.
- Lock/unlock state should eventually be controlled by server-backed category configuration/feature release metadata. A frontend-only flag is not a security boundary.
- The current dashboard prototype uses a presentation-only lock state. No admin unlock control or backend category state is implemented.

## Mobile Create entry point

- Ruang Bisnis contains Toko, Kafe, Restoran, Tempat, and one PLUITS Partner entry.
- PLUITS Partner expands the category catalogue inline on mobile.
- The desktop workspace and other module entry points remain unchanged.

## Release readiness checklist

- [ ] Taxonomy reviewed against all existing ecosystem models and operational modules.
- [ ] Parent/subcategory ownership and IDs approved.
- [ ] Listing/profile contracts and provider verification rules defined.
- [ ] Search, filter, location, and category landing behavior designed.
- [ ] Locked cards are accessible and clearly non-interactive.
- [ ] Manual release permissions and audit trail defined.
- [ ] Each unlocked category has a real destination and an operationally supported user journey.
