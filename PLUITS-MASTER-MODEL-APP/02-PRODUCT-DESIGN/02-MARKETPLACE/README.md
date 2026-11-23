# Marketplace — Product Design

Desain pengalaman pelanggan Marketplace: homepage discovery lintas merchant, kategori, pencarian/filter, listing dan profil publik merchant, katalog publik, detail produk/menu, cart, checkout, pembayaran, status pesanan, riwayat, serta state loading/empty/error/unavailable.

Marketplace harus menampilkan **Store** dan **Restaurant & Café** sebagai dua vertikal merchant yang berbeda. Desain operasional pemilik/staf tidak dicampur ke halaman pelanggan Marketplace; masing-masing berada di folder Merchant Operations.

## Shared payment experience

- [PLUITS Payments — payment methods and transaction trust](../../04-SHARED-PLATFORM-SERVICES/PLUITS-PAYMENTS-AND-PAYMENT-METHODS.md) defines the shared payment-channel discovery baseline and trust boundaries. Marketplace checkout must follow this shared policy; it must not promise escrow, split settlement, or provider capabilities that have not been confirmed.

## Homepage and discovery

- [Marketplace homepage, search, and discovery rules](HOMEPAGE-DISCOVERY-RULES.md)

## Merchant Operations — Product Design

- [Store](01-MERCHANT-OPERATIONS/01-STORE/README.md)
- [Restaurant & Café](01-MERCHANT-OPERATIONS/02-RESTAURANT-CAFE/README.md)

## Batas desain

- Homepage Marketplace adalah discovery layer, bukan Seller Center atau dashboard restoran.
- Profil publik, katalog, ketersediaan, dan status transaksi mengikuti kontrak modul merchant.
- Alur checkout pelanggan tidak mengambil alih pengelolaan stok toko atau operasi restoran/kitchen.
- Setiap modul memiliki sitemap, page inventory, flows, states, dan acceptance criteria sendiri.


## PLUITS Partner

- [PLUITS Partner category catalogue and locked subcategory states](PLUITS-PARTNER-CATEGORY-CATALOGUE.md)
