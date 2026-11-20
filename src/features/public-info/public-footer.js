import { renderPageFooter } from '../../design-system/page-shell.js';

const GROUPS = [
  { title:'PLUITS', items:[
    {label:'Tentang PLUITS',route:'about'},
    {label:'Hubungi Kami',route:'contact'},
    {label:'Masuk',route:'login'},
    {label:'Daftar',route:'register'}
  ]},
  { title:'Bantuan', items:[
    {label:'Pusat Bantuan',route:'help'},
    {label:'Pertanyaan Umum',route:'faq'},
    {label:'Keamanan & Keselamatan',route:'safety'},
    {label:'Penghapusan Akun',route:'accountDeletion'},
    {label:'Pengaduan & Sengketa',route:'complaints'}
  ]},
  { title:'Jelajahi', items:[
    {label:'Beranda',route:'home'},
    {label:'Social',route:'social'},
    {label:'Discover',route:'discover'},
    {label:'Marketplace',route:'marketplaceInfo'}
  ]},
  { title:'Marketplace', items:[
    {label:'Cara Kerja Marketplace',route:'marketplaceInfo'},
    {label:'Ketentuan Penjual',route:'sellerTerms'},
    {label:'Kebijakan Produk',route:'prohibitedItems'},
    {label:'Pembayaran',route:'paymentPolicy'},
    {label:'Pembatalan & Pengembalian Dana',route:'refundPolicy'},
    {label:'Pengiriman',route:'shippingPolicy'}
  ]},
  { title:'Kebijakan', items:[
    {label:'Ketentuan Layanan',route:'terms'},
    {label:'Kebijakan Privasi',route:'privacy'},
    {label:'Pedoman Komunitas',route:'guidelines'},
    {label:'Kebijakan Cookie',route:'cookies'},
    {label:'Pilihan Privasi',route:'privacyChoices'}
  ]}
];

const PAYMENT_CHANNELS = [
  { title:'QRIS', detail:'Pembayaran kode QR', icon:'qr' },
  { title:'Transfer bank', detail:'Virtual Account & bank', icon:'bank' },
  { title:'Kartu', detail:'Debit & kredit', icon:'card' },
  { title:'E-wallet', detail:'Dompet digital', icon:'wallet' },
  { title:'Gerai retail', detail:'Pembayaran tunai', icon:'store' },
  { title:'PayLater', detail:'Cicilan pihak ketiga', icon:'installment' }
];

const PAYMENT_ICONS = {
  qr:'<path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3z"/><path d="M6 6h1v1H6zM17 6h1v1h-1zM6 17h1v1H6zM14 14h3v3h-3zM19 14h2M19 18v3M14 20h2"/>',
  bank:'<path d="m2.5 8 9.5-5 9.5 5zM4 20h16M3 22h18M6 9v9M10 9v9M14 9v9M18 9v9"/>',
  card:'<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M3 9h18M6 15h4"/>',
  wallet:'<rect x="3" y="6" width="18" height="14" rx="2.5"/><path d="M3 8V6a2 2 0 0 1 2-2h13M16 13h5M17 13v.01"/>',
  store:'<path d="M4 10v10h16V10M3 10l2-6h14l2 6a3 3 0 0 1-5 2 3 3 0 0 1-5 0 3 3 0 0 1-5 0 3 3 0 0 1-3-2Z"/><path d="M9 20v-5h6v5"/>',
  installment:'<rect x="4" y="3" width="16" height="18" rx="2.5"/><path d="M8 7h8M8 11h2M14 11h2M8 15h2M14 15h2"/>'
};

function paymentIcon(name) {
  return '<svg class="pl-footer-payment-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + PAYMENT_ICONS[name] + '</svg>';
}

function renderPaymentMethods() {
  const cards = PAYMENT_CHANNELS.map((channel) =>
    '<div class="pl-footer-payment-card">' + paymentIcon(channel.icon) +
    '<span class="pl-footer-payment-copy"><strong>' + channel.title + '</strong><small>' + channel.detail + '</small></span></div>'
  ).join('');
  return '<section class="pl-footer-payment-methods" aria-label="Rencana metode pembayaran">' +
    '<div class="pl-footer-payment-heading"><span class="pl-footer-payment-title">Pilihan metode pembayaran</span>' +
    '<span class="pl-footer-payment-note">Direncanakan untuk PLUITS</span></div>' +
    '<div class="pl-footer-payment-list">' + cards + '</div>' +
    '<p class="pl-footer-payment-disclaimer">Metode dan ketersediaan mengikuti mitra pembayaran serta proses aktivasi. Pembayaran belum aktif.</p>' +
    '</section>';
}

export function renderPublicFooter() {
  const footer = renderPageFooter({
    copyright:'© 2026 PLUITS. All rights reserved.',
    attribution:'One connected digital ecosystem.',
    groups:GROUPS
  });
  return footer.replace('<div class="pl-footer-bottom">', renderPaymentMethods() + '<div class="pl-footer-bottom">');
}
