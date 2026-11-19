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

export function renderPublicFooter() {
  return renderPageFooter({
    copyright:'© 2026 PLUITS. All rights reserved.',
    attribution:'One connected digital ecosystem.',
    groups:GROUPS
  }).replace('<div class="pl-footer-bottom">', '<div class="pl-footer-payment-methods"><span class="pl-footer-payment-title">Metode Pembayaran</span><div class="pl-footer-payment-list"><span>QRIS</span><span>Visa</span><span>Mastercard</span><span>JCB</span><span>American Express</span><span>GoPay</span><span>ShopeePay</span><span>QRIS via OVO, DANA &amp; LinkAja</span><span>Virtual Account</span><span>Mandiri Bill Payment</span><span>Alfamart</span><span>Indomaret</span><span>Alfamidi</span><span>Akulaku</span><span>Kredivo</span></div></div><div class="pl-footer-bottom">');
}
