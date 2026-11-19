import { routeHref } from '../config/paths.js';
const PREVIEW_GROUPS = [
  { title: 'Halaman publik', routes: [
    ['home','Homepage'],['login','Masuk'],['register','Daftar'],['terms','Ketentuan Layanan'],['privacy','Kebijakan Privasi'],
    ['about','Tentang PLUITS'],['help','Pusat Bantuan'],['faq','FAQ'],['contact','Hubungi Kami'],['guidelines','Pedoman Komunitas'],
    ['marketplaceInfo','Marketplace'],['sellerTerms','Ketentuan Penjual'],['paymentPolicy','Kebijakan Pembayaran'],
    ['refundPolicy','Pembatalan & Pengembalian'],['shippingPolicy','Pengiriman'],['accountDeletion','Penghapusan Akun'],
    ['safety','Keamanan'],['cookies','Cookie'],['privacyChoices','Pilihan Privasi'],['complaints','Pengaduan'],['prohibitedItems','Produk Terlarang']
  ]},
  { title: 'Aplikasi anggota', routes: [
    ['social','Beranda Sosial'],['discover','Jelajah'],['messages','Pesan'],['profile','Profil'],['settings','Pengaturan'],['dashboard','Dashboard']
  ]}
];

export function createPreviewTools(root) {
  if (!root) return () => {};
  const controller = new AbortController();
  const links = PREVIEW_GROUPS.map(group =>
    '<section class="pl-preview-group"><strong>' + group.title + '</strong><div>' +
    group.routes.map(([route,label]) => '<a href="' + routeHref(route) + '" data-preview-route>' + label + '</a>').join('') +
    '</div></section>'
  ).join('');
  root.insertAdjacentHTML('beforeend',
    '<aside class="pl-preview-tools" aria-label="Navigasi lingkungan pengembangan">' +
      '<section class="pl-preview-panel" data-preview-panel hidden>' +
        '<header><div><strong>PLUITS Preview</strong><small>Mode pengujian · data lokal</small></div>' +
          '<button type="button" data-preview-close aria-label="Tutup navigasi preview">×</button></header>' +
        '<div class="pl-preview-links">' + links + '</div>' +
        '<p>Perubahan di lingkungan ini tidak dikirim ke Supabase atau website production.</p>' +
      '</section>' +
      '<button type="button" class="pl-preview-toggle" data-preview-toggle aria-expanded="false">Preview · Navigasi halaman</button>' +
    '</aside>'
  );
  const panel = root.querySelector('[data-preview-panel]');
  const toggle = root.querySelector('[data-preview-toggle]');
  const close = () => { panel.hidden = true; toggle.setAttribute('aria-expanded','false'); };
  toggle?.addEventListener('click', () => {
    const open = panel.hidden;
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded',String(open));
  }, { signal: controller.signal });
  root.querySelector('[data-preview-close]')?.addEventListener('click',close,{signal:controller.signal});
  root.querySelectorAll('[data-preview-route]').forEach(link => link.addEventListener('click',close,{signal:controller.signal}));
  return () => { controller.abort(); root.querySelector('.pl-preview-tools')?.remove(); };
}
