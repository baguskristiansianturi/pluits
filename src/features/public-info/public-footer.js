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

const PAYMENT_GROUPS = [
  { title:'QRIS', logos:[['QRIS','https://upload.wikimedia.org/wikipedia/commons/e/e1/QRIS_logo.svg']] },
  { title:'Transfer Bank', logos:[
    ['BCA','https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg'],
    ['BNI','https://upload.wikimedia.org/wikipedia/commons/f/f0/Bank_Negara_Indonesia_logo_%282004%29.svg'],
    ['BRI','https://upload.wikimedia.org/wikipedia/commons/5/59/BRI_2025.svg'],
    ['Mandiri','https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg']
  ] },
  { title:'Kartu', logos:[
    ['Visa',(import.meta.env?.BASE_URL || '/') + 'assets/payments/visa.svg'],
    ['Mastercard',(import.meta.env?.BASE_URL || '/') + 'assets/payments/mastercard.svg']
  ] },
  { title:'E-Wallet', logos:[
    ['GoPay','https://upload.wikimedia.org/wikipedia/commons/b/b1/GoPay_logo.svg']
  ] }
];

function renderPaymentMethods() {
  const cards = PAYMENT_GROUPS.map((group) => {
    const logos = group.logos.map(([label, src]) =>
      '<img class="pl-footer-payment-logo" src="' + src + '" alt="' + label +
      '" loading="lazy" decoding="async" referrerpolicy="no-referrer">'
    ).join('');
    return '<div class="pl-footer-payment-card"><span class="pl-footer-payment-card-title">' +
      group.title + '</span><div class="pl-footer-payment-logos">' + logos + '</div></div>';
  }).join('');
  return '<section class="pl-footer-payment-methods" aria-label="Metode pembayaran">' +
    '<h2 class="pl-footer-payment-title">Metode Pembayaran</h2>' +
    '<div class="pl-footer-payment-list">' + cards + '</div></section>';
}

export function renderPublicFooter() {
  const footer = renderPageFooter({
    copyright:'© 2026 PLUITS. All rights reserved.',
    attribution:'One connected digital ecosystem.',
    groups:GROUPS
  });
  return footer.replace('<div class="pl-footer-bottom">', renderPaymentMethods() + '<div class="pl-footer-bottom">');
}
