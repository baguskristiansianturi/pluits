# Social Home — Product Specification

- **ID:** PAGE-SOCIAL-HOME-001
- **Status:** IN-DESIGN / implementation prototype
- **Purpose:** Primary, authenticated, mobile-first social home for a PLUITS user.
- **Product-owner direction:** Social experience is the dominant part of the home (approximately 70% of its content priority). Discovery, local marketplace, services, and platform information follow the social stream.
- **Business separation:** Business-center capabilities remain in the separate Ruang Kerja. Do not merge merchant operations into the consumer home.

## Navigation and route contract
- The authenticated user's Beranda is currently mounted at `#/social`; the visible bottom-navigation label is Beranda.
- Public marketing homepage remains `#/home` for guests. An authenticated visit to the public root is redirected to Social Home.
- Jelajah → `#/discover`.
- Center plus → `#/dashboard` (Ruang Kerja / management hub).
- Pesan → `#/messages`.
- Profil → `#/profile`.
- Legacy `#/circle` resolves to `#/social`.
- The fixed bottom navigation remains reachable throughout the mobile page and respects the device safe area.

## Mobile-first content hierarchy
1. Shared PLUITS header with compact account, search, cart, and notification actions.
2. A single quick-search entry directly below the header. It opens a search overlay/sheet with a search field and category shortcuts; the former horizontal service-filter rail and inline service-search form are removed from the home surface.
3. **Rekomendasi untuk Anda** — discovery berbasis minat dan pengalaman, bukan daftar tempat atau ranking. Minat seperti pantai & alam, seafood, coffee & café, budaya, wellness, dan aktivitas keluarga menjadi pintu masuk menuju pengalaman/modul yang sesuai. Hasil harus mempertimbangkan konteks wilayah pengguna; minat tidak boleh mengarahkan pengguna ke wilayah yang tidak relevan. Klik minat seafood membawa konteks ke Fluid Food saat modul tersebut tersedia. Minat adalah input discovery, bukan listing mitra.
4. **Di sekitar Anda** — discovery berbasis lokasi dari seluruh kategori GeoDirectory, bukan hanya kategori minat. Mulai dari radius 5 km; bila hasil eligible/relevan belum cukup, perluas bertahap (mis. 5–10 km) tanpa membuat hasil palsu. Kartu menampilkan tempat/bisnis bernama secara spesifik, bukan kartu kategori. Hierarki kartu: foto, jarak aktual dalam km, nama tempat, jenis tempat yang spesifik dan area, konteks kredibilitas ulasan/reputasi, lalu deskripsi singkat. Rating dan jumlah ulasan hanya tampil jika bersumber dari data ulasan nyata; jangan mengarang skor, jumlah, kutipan, jarak, atau status verifikasi. Tombol Lihat Semua membuka Jelajah; di Jelajah pengguna dapat memperbesar/mengubah radius dan wilayah. Jangan menampilkan rating, ulasan, jarak, atau listing fiktif sebagai data nyata. UI fixture harus diberi label pratinjau.
5. Social experience remains the dominant product identity: people suggestions, Stories from the user's circle, Feed/Reels/Live/Blog tabs, and vertically scrolling social content. Feed cards remain full-width on mobile.
6. **Produk lokal pilihan** — horizontal product/category preview leading to Marketplace, followed by a clear Marketplace CTA. Marketplace should start from the user's current/selected location and allow the user to change scope to another city or global. Location-aware product data and location selection remain pending Marketplace/service integration.
7. Compact dark **Tentang PLUITS** summary before the persistent app navigation.

## Layout and interaction rules
- Preserve shared page shell, logo, header geometry, tokens, registered icons, and standard content gutters.
- Quick search is one clear entry point; its overlay handles the search field and category shortcuts. Do not restore the old service shortcut filter rail or inline service form to the homepage.
- Rekomendasi untuk Anda menampilkan minat/pengalaman, bukan bisnis, tempat, daftar menu, atau ranking. Setiap minat membuka discovery context yang sesuai; Seafood menyiapkan konteks Fluid Food setelah modul tersebut tersedia. Jangan mengarang personalisasi akun jika preferensi belum tersedia.
- Di sekitar Anda mencakup tempat/bisnis individual dari seluruh kategori GeoDirectory. Jangan menampilkan subkategori sebagai kartu (misalnya Apotek, Klinik & kesehatan, Coffee & café). Tampilkan entitas bernama (misalnya Atlas Beach Club), jenis tempat yang spesifik, area, jarak dalam km, konteks kredibilitas ulasan/reputasi, dan deskripsi singkat. Mulai 5 km dan perluas bertahap bila hasil tidak mencukupi. Semua data harus bersumber dari listing dan layanan aktual; jangan mengarang jarak, rating, jumlah ulasan, kutipan, atau identitas mitra. Lihat Semua menuju Jelajah dengan kontrol radius/wilayah yang lebih luas.
- Fair exposure: ranking organik menyeimbangkan kedekatan, relevansi, kualitas, ketersediaan, trust, dan kesempatan penemuan bagi mitra eligible/baru. Popularitas atau frekuensi posting tidak boleh menjadi satu-satunya penentu; paid placement wajib dipisahkan dan diberi label.
- Social posts remain full-width on mobile; tablet/desktop may retain a readable constrained feed width.
- Tabs navigate to their corresponding content sections and update the active visual state as the user scrolls. They do not pin to the viewport.
- Bottom navigation remains fixed and safe-area aware.
- Keep the authenticated home distinct from the public marketing homepage. The compact dark About summary remains the final content section before persistent app navigation; do not import business-owner marketing sections.

## Data integrity and availability
- Real Feed/Reels content must come only from the first-party PLUITS social API and existing authorization rules.
- People suggestions, Stories, Live, Blog, nearby discovery, and product previews remain clearly marked visual fixtures until their real services/data contracts are connected.
- Never insert visual fixtures into production tables or present fixture people, products, counts, or activity as real.
- Do not fabricate local inventory or claim location detection is active before Marketplace integration is implemented.

## Implementation mapping
- Route/auth redirect: `src/app/create-app.js`, `src/app/routes.js`.
- Social Home and its scoped styles: `src/features/home/home-page.js`, `src/features/home/home-page.css`.
- Mobile welcome hero, location-scope prompt, and service shortcuts are page-local composition; no global tokens or shared shell geometry are changed.
- Marketplace CTA links to the existing Marketplace route. Product preview cards remain labelled illustrative until real location-aware catalogue data is connected.
- This page specification: `src/features/home/PAGE-SOCIAL-HOME-001.md`.
- Shared shell/icons/tokens: `src/design-system/`.
- Ruang Kerja remains `src/features/dashboard/dashboard-page.js`.

## Dependencies, exclusions, and validation
- No database schema, RLS, storage policy, auth provider, design token, shared component, or Marketplace operational workflow changes are part of this home-page implementation.
- Verify guest/authenticated routing, Feed/Reels loading/empty/error states, carousel touch behavior, non-sticky tabs, full-width mobile posts, fixed bottom navigation and safe area, tablet/desktop layouts, keyboard focus, reduced motion, and no horizontal page overflow.
- Automated build/tests do not replace browser/device visual acceptance on a real mobile viewport.

### Interest and GeoDirectory discovery update — 24 November 2026
- Retires the former Top 10 concept completely. Interest cards describe what the user may want to experience; they are not business listings or ranked destinations.
- Nearby is a location-first, all-category GeoDirectory preview. Start with 5 km and expand in stages if eligible results are insufficient. The full Jelajah surface owns user-adjustable radius and wider geographic scope.
- A change of user location updates geographic relevance without erasing saved interests. Interest-based and location-based discovery remain distinct but complementary.
- Fair exposure must balance relevance, proximity, quality, availability, trust and opportunities for eligible/new partners. Popularity and posting frequency must not monopolize organic discovery; paid placements, if ever introduced, must be disclosed and separated.
- Current Home UI uses clearly labelled structural preview cards only. It does not claim live GPS, active GeoDirectory listings, live distance, real ratings/reviews, or a connected Fluid Food route.
- Offscreen sections and images should defer expensive rendering/decoding where supported.\n\n### Named place card refinement — 24 November 2026\n- Di sekitar Anda adalah daftar tempat dan bisnis individual, bukan navigasi kategori. Kartu kategori generik dilarang di bagian ini.\n- Metadata membedakan jenis tempat spesifik (misalnya Beach Club) dari kategori GeoDirectory yang lebih luas.\n- Tampilkan jarak dalam km, deskripsi singkat, dan konteks review/reputasi. Rating serta jumlah ulasan hanya muncul jika ada rekaman ulasan nyata.\n- Frontend saat ini memakai fixture bernama untuk tata letak; jarak dan konteks ulasan pada fixture bukan data live. Integrasi GeoDirectory dan review service tetap menjadi pekerjaan backend/service berikutnya.\n