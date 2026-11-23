import { routeHref } from '../../config/paths.js';
import '../../design-system/page-shell.css';
import { renderPageHeader } from '../../design-system/page-shell.js';
import { renderIcon } from '../../design-system/icons.js';
import './dashboard-page.css';

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
const LAYOUT_KEY = 'pluits-dashboard-layout-v1';
const TABS = Object.freeze([
  { id:'dashboard', label:'Dashboard', closable:false },
  { id:'profile', label:'Profil Sosial' },
  { id:'business', label:'Akun Bisnis' },
  { id:'transactions', label:'Transaksi' },
  { id:'settings', label:'Pengaturan' },
  { id:'social', label:'Social Media' },
  { id:'blog', label:'Blog Studio' }
]);
const MODULE_GROUPS = [
  { label:'UTAMA', items:[{ id:'dashboard', label:'Dashboard', icon:'book' }] },
  { label:'AKUN', items:[
    { id:'profile', label:'Profil Sosial', icon:'eye' },
    { id:'business', label:'Akun Bisnis', icon:'book' },
    { id:'transactions', label:'Transaksi', icon:'arrow' },
    { id:'settings', label:'Pengaturan', icon:'lock' }
  ] },
  { label:'EKOSISTEM PLUITS', items:[
    { id:'social', label:'Social Media', icon:'message', status:'Tampilan awal' },
    { id:'marketplace', label:'Marketplace', icon:'book', status:'Belum tersedia' },
    { id:'tickets', label:'Tickets & Accommodation', icon:'book', status:'Belum tersedia' },
    { id:'geo', label:'Geo Directory', icon:'eye', status:'Belum tersedia' },
    { id:'logistics', label:'Logistics & Transportation', icon:'arrow', status:'Belum tersedia' },
    { id:'wallet', label:'Digital Wallet', icon:'lock', status:'Belum tersedia' }
  ] }
];
const BLOG_TEMPLATES = ['AURELIA','STAVERO','BREWNOX','ROVANTA','LUNELLE'];

function readLayout() {
  try {
    const value = JSON.parse(localStorage.getItem(LAYOUT_KEY) || '{}');
    return {
      leftWidth: Math.min(340, Math.max(190, Number(value.leftWidth) || 238)),
      rightWidth: Math.min(440, Math.max(250, Number(value.rightWidth) || 318)),
      leftOpen: value.leftOpen !== false,
      rightOpen: value.rightOpen !== false
    };
  } catch {
    return { leftWidth:238, rightWidth:318, leftOpen:true, rightOpen:true };
  }
}

function renderEmpty(title, description, icon = 'book') {
  return '<div class="dashboard-empty"><span class="dashboard-empty-icon">' + renderIcon(icon) + '</span><strong>' + title + '</strong><p>' + description + '</p></div>';
}

function renderTabContent(tab, context) {
  const { name, email, initial, selectedBusinessType, selectedTemplate, transactionMode, transactionStatus, settingsSection } = context;
  if (tab === 'profile') {
    return '<section class="dashboard-view" aria-labelledby="view-title">' +
      '<div class="dashboard-view-heading"><div><span class="dashboard-kicker">IDENTITAS PERSONAL</span><h1 id="view-title">Profil Sosial</h1><p>Identitas yang digunakan untuk berinteraksi, membuat konten, dan bertransaksi di PLUITS.</p></div><span class="dashboard-profile-avatar">' + initial + '</span></div>' +
      '<div class="dashboard-panel dashboard-profile-card"><div class="dashboard-profile-identity"><span class="dashboard-profile-avatar dashboard-profile-avatar--large">' + initial + '</span><div><strong>' + name + '</strong><span>' + email + '</span><small>Profil akun PLUITS</small></div></div>' +
      '<div class="dashboard-field-grid"><label>Nama tampilan<input type="text" value="' + name + '" disabled></label><label>Email akun<input type="email" value="' + email + '" disabled></label><label>Username<input type="text" placeholder="Username belum tersedia" disabled></label><label>Bio<input type="text" placeholder="Tambahkan deskripsi singkat" disabled></label></div>' +
      '<div class="dashboard-inline-note">Pengaturan profil akan dihubungkan ke layanan profil PLUITS. Informasi di atas hanya menampilkan identitas akun yang tersedia saat ini.</div></div>' +
      '<div class="dashboard-panel"><div class="dashboard-panel-heading"><div><h2>Konten profil</h2><p>Permukaan publikasi yang terhubung dengan identitas personal.</p></div></div><div class="dashboard-feature-grid">' +
      '<article><span>FEED</span><strong>Postingan</strong><p>Konten dan interaksi personal.</p></article><article><span>REELS</span><strong>Video pendek</strong><p>Video yang dipublikasikan melalui akun sosial.</p></article><article><span>STORY</span><strong>Story</strong><p>Konten sementara dan momen harian.</p></article><article><span>BLOG</span><strong>Personal Blog</strong><p>Artikel dengan template yang disediakan PLUITS.</p></article>' +
      '</div></div></section>';
  }
  if (tab === 'business') {
    return '<section class="dashboard-view" aria-labelledby="view-title"><div class="dashboard-view-heading"><div><span class="dashboard-kicker">IDENTITAS USAHA</span><h1 id="view-title">Akun Bisnis</h1><p>Buat identitas bisnis yang terhubung dengan akun personal PLUITS Anda.</p></div></div>' +
      '<div class="dashboard-panel"><div class="dashboard-panel-heading"><div><h2>Buat akun bisnis</h2><p>Pilih jenis akun sesuai aktivitas usaha. Satu akun bisnis hanya memiliki satu jenis.</p></div><span class="dashboard-status-pill">Rancangan awal</span></div>' +
      '<div class="dashboard-business-options">' +
      '<button type="button" class="dashboard-business-option' + (selectedBusinessType === 'store' ? ' is-selected' : '') + '" data-business-type="store" aria-pressed="' + (selectedBusinessType === 'store') + '"><span class="dashboard-option-symbol">' + renderIcon('book') + '</span><strong>Store</strong><p>Untuk usaha yang menjual produk fisik atau digital.</p><span>Pilih Store</span></button>' +
      '<button type="button" class="dashboard-business-option' + (selectedBusinessType === 'service' ? ' is-selected' : '') + '" data-business-type="service" aria-pressed="' + (selectedBusinessType === 'service') + '"><span class="dashboard-option-symbol">' + renderIcon('message') + '</span><strong>Service</strong><p>Untuk penyedia jasa, layanan, dan keahlian profesional.</p><span>Pilih Service</span></button>' +
      '</div>' +
      '<div class="dashboard-business-next"><span>' + (selectedBusinessType ? 'Pilihan sementara: ' + (selectedBusinessType === 'store' ? 'Store' : 'Service') : 'Pilih jenis akun bisnis untuk melihat langkah berikutnya.') + '</span><button type="button" disabled>Pengaturan pembuatan belum tersedia</button></div><div class="dashboard-inline-note">Pembuatan akun bisnis menunggu API PLUITS dan pemeriksaan hak akses. Tidak ada data simulasi yang disimpan.</div>' +
      '</div></section>';
  }
  if (tab === 'transactions') {
    return '<section class="dashboard-view" aria-labelledby="view-title"><div class="dashboard-view-heading"><div><span class="dashboard-kicker">PUSAT TRANSAKSI</span><h1 id="view-title">Transaksi</h1><p>Pantau aktivitas pembelian maupun penjualan dari satu akun PLUITS.</p></div></div>' +
      '<div class="dashboard-panel"><div class="dashboard-transaction-switch" role="tablist" aria-label="Jenis transaksi"><button type="button" data-transaction-mode="purchase" class="' + (transactionMode === 'purchase' ? 'is-active' : '') + '" role="tab" aria-selected="' + (transactionMode === 'purchase') + '">Pembelian</button><button type="button" data-transaction-mode="sales" class="' + (transactionMode === 'sales' ? 'is-active' : '') + '" role="tab" aria-selected="' + (transactionMode === 'sales') + '">Penjualan</button></div>' +
      '<div class="dashboard-order-filters">' + [{id:'all',label:'Semua'},{id:'waiting',label:'Menunggu pembayaran'},{id:'processing',label:'Diproses'},{id:'shipping',label:'Dikirim'},{id:'completed',label:'Selesai'},{id:'cancelled',label:'Dibatalkan'}].map((item) => '<button type="button" data-transaction-status="' + item.id + '" class="' + (transactionStatus === item.id ? 'is-current' : '') + '">' + item.label + '</button>').join('') + '</div>' +
      renderEmpty(transactionMode === 'purchase' ? 'Belum ada pembelian' : 'Belum ada penjualan', transactionMode === 'purchase' ? 'Pesanan yang Anda lakukan di PLUITS akan tercatat dan dapat dipantau dari sini.' : 'Pesanan dari pelanggan pada akun bisnis Anda akan tercatat dan dapat dikelola dari sini.','arrow') +
      '</div><div class="dashboard-inline-note">Status pembayaran, konfirmasi pesanan, pengiriman, dan penyelesaian transaksi akan menggunakan data transaksi sebenarnya. Belum ada data contoh yang ditampilkan.</div></section>';
  }
  if (tab === 'settings') {
    const sections = [
      { id:'account', label:'Akun & keamanan', title:'Akun & keamanan', desc:'Informasi login, keamanan akun, dan pengelolaan sesi.' },
      { id:'privacy', label:'Privasi', title:'Privasi', desc:'Kontrol visibilitas profil, interaksi, dan preferensi privasi.' },
      { id:'addresses', label:'Alamat', title:'Alamat', desc:'Alamat pribadi dan alamat tujuan untuk kebutuhan transaksi.' },
      { id:'bank', label:'Rekening', title:'Rekening', desc:'Informasi rekening untuk kebutuhan pembayaran dan pencairan.' },
      { id:'notifications', label:'Notifikasi', title:'Preferensi notifikasi', desc:'Pengaturan pemberitahuan lintas modul PLUITS.' }
    ];
    const active = sections.find((item) => item.id === settingsSection) || sections[0];
    return '<section class="dashboard-view" aria-labelledby="view-title"><div class="dashboard-view-heading"><div><span class="dashboard-kicker">PREFERENSI PENGGUNA</span><h1 id="view-title">Pengaturan</h1><p>Kelola preferensi akun personal dan pengaturan lintas PLUITS.</p></div></div>' +
      '<div class="dashboard-settings-layout"><nav class="dashboard-settings-nav" aria-label="Kategori pengaturan">' + sections.map((item) => '<button type="button" data-settings-section="' + item.id + '" class="' + (item.id === active.id ? 'is-active' : '') + '">' + item.label + '</button>').join('') + '</nav>' +
      '<div class="dashboard-panel dashboard-settings-content"><span class="dashboard-kicker">PENGATURAN AKUN</span><h2>' + active.title + '</h2><p>' + active.desc + '</p>' +
      (active.id === 'account' ? '<div class="dashboard-field-grid"><label>Email akun<input type="email" value="' + email + '" disabled></label><label>Kata sandi<input type="password" value="••••••••••" disabled></label></div>' : '') +
      (active.id === 'addresses' ? '<div class="dashboard-field-grid"><label>Alamat utama<input placeholder="Belum ada alamat tersimpan" disabled></label><label>Nomor telepon<input placeholder="Belum tersedia" disabled></label></div>' : '') +
      (active.id === 'bank' ? '<div class="dashboard-field-grid"><label>Nama pemilik rekening<input placeholder="Belum ada rekening tersimpan" disabled></label><label>Nomor rekening<input placeholder="Belum tersedia" disabled></label></div>' : '') +
      '<div class="dashboard-inline-note">Pengaturan ini merupakan kerangka antarmuka. Penyimpanan dan perubahan data belum diaktifkan.</div></div></div></section>';
  }
  if (tab === 'social' || tab === 'blog') {
    return '<section class="dashboard-view" aria-labelledby="view-title"><div class="dashboard-view-heading"><div><span class="dashboard-kicker">PENERBITAN & INTERAKSI</span><h1 id="view-title">' + (tab === 'blog' ? 'Blog Studio' : 'Social Media') + '</h1><p>Kelola format konten sosial dari satu identitas personal PLUITS.</p></div></div>' +
      '<div class="dashboard-panel"><div class="dashboard-panel-heading"><div><h2>Jenis konten</h2><p>Setiap format memiliki alur pembuatan dan pengelolaan tersendiri.</p></div><button type="button" class="dashboard-text-action" data-open-tab="blog">Buka Blog Studio</button></div><div class="dashboard-content-types">' +
      '<article><span>01</span><strong>Feed</strong><p>Postingan foto, video, dan teks.</p></article><article><span>02</span><strong>Story</strong><p>Konten sementara.</p></article><article><span>03</span><strong>Reels</strong><p>Video pendek vertikal.</p></article><article><span>04</span><strong>Live</strong><p>Siaran langsung dan interaksi real-time.</p></article><article><span>05</span><strong>Blog</strong><p>Artikel dan publikasi editorial.</p></article>' +
      '</div></div><div class="dashboard-panel"><div class="dashboard-panel-heading"><div><h2>Template Personal Blog</h2><p>Pilih rancangan tampilan blog yang disediakan PLUITS.</p></div><span class="dashboard-status-pill">5 template</span></div><div class="dashboard-template-grid">' + BLOG_TEMPLATES.map((template) => '<button type="button" data-blog-template="' + template + '" class="dashboard-template' + (selectedTemplate === template ? ' is-selected' : '') + '" aria-pressed="' + (selectedTemplate === template) + '"><span class="dashboard-template-preview"><i></i><i></i><i></i></span><strong>' + template + '</strong><small>' + (selectedTemplate === template ? 'Dipilih untuk pratinjau' : 'Lihat pilihan') + '</small></button>').join('') + '</div><div class="dashboard-inline-note">Pemilihan template hanya pratinjau. Artikel, template aktif, dan publikasi tidak diubah dari dashboard ini.</div></div></section>';
  }
  const unavailableModule = MODULE_GROUPS[2].items.find((item) => item.id === tab);
  if (unavailableModule) {
    return '<section class="dashboard-view" aria-labelledby="view-title"><div class="dashboard-view-heading"><div><span class="dashboard-kicker">EKOSISTEM PLUITS</span><h1 id="view-title">' + unavailableModule.label + '</h1><p>Modul ini akan dibuka dari satu dashboard ketika halaman pengelolaannya siap.</p></div></div><div class="dashboard-panel">' + renderEmpty('Modul belum tersedia','Struktur navigasi sudah disiapkan. Pengelolaan operasional belum diaktifkan dan tidak ada data contoh yang ditampilkan.',unavailableModule.icon) + '</div></section>';
  }
  const ecosystem = MODULE_GROUPS[2].items;
  return '<section class="dashboard-view dashboard-overview" aria-labelledby="view-title"><div class="dashboard-view-heading"><div><span class="dashboard-kicker">PUSAT KENDALI PLUITS</span><h1 id="view-title">Selamat datang, ' + name + '.</h1><p>Satu akun untuk mengelola identitas, pekerjaan, transaksi, dan aktivitas sosial Anda.</p></div><span class="dashboard-overview-avatar">' + initial + '</span></div>' +
    '<div class="dashboard-overview-grid"><section class="dashboard-panel dashboard-project-panel"><div class="dashboard-panel-heading"><div><span class="dashboard-kicker">AKTIVITAS PROFESIONAL</span><h2>Proyek aktif</h2><p>Ruang untuk pekerjaan dan proyek yang sedang Anda kelola.</p></div><span class="dashboard-status-pill">Pusat pekerjaan</span></div>' + renderEmpty('Belum ada proyek aktif','Proyek dan pekerjaan dari modul yang terhubung akan tampil di sini.','book') + '</section>' +
    '<section class="dashboard-panel dashboard-account-panel"><div class="dashboard-panel-heading"><div><span class="dashboard-kicker">AKUN ANDA</span><h2>Pengaturan utama</h2><p>Kelola akun personal dan bisnis.</p></div></div><div class="dashboard-shortcuts"><button type="button" data-open-tab="profile">' + renderIcon('eye') + '<span><strong>Profil Sosial</strong><small>Identitas personal</small></span></button><button type="button" data-open-tab="business">' + renderIcon('book') + '<span><strong>Akun Bisnis</strong><small>Store atau Service</small></span></button><button type="button" data-open-tab="transactions">' + renderIcon('arrow') + '<span><strong>Transaksi</strong><small>Pembelian dan penjualan</small></span></button><button type="button" data-open-tab="settings">' + renderIcon('lock') + '<span><strong>Pengaturan</strong><small>Privasi, alamat, rekening</small></span></button></div></section></div>' +
    '<section class="dashboard-panel dashboard-applications"><div class="dashboard-panel-heading"><div><span class="dashboard-kicker">EKOSISTEM PLUITS</span><h2>Modul aplikasi</h2><p>Pilih modul untuk membuka ruang pengelolaannya.</p></div></div><div class="dashboard-application-list">' + ecosystem.map((item) => '<button type="button" data-open-tab="' + item.id + '" class="dashboard-application-item"><span class="dashboard-application-icon">' + renderIcon(item.icon) + '</span><span><strong>' + item.label + '</strong><small>' + item.status + '</small></span><span class="dashboard-application-arrow">›</span></button>').join('') + '</div></section></section>';
}

function renderMobileCreate(displayName) {
  const hour = new Date().getHours();
  const greeting = hour < 11 ? 'Selamat pagi' : hour < 15 ? 'Selamat siang' : hour < 18 ? 'Selamat sore' : 'Selamat malam';
  const firstName = escapeHtml(String(displayName || 'Pengguna').trim().split(/\s+/)[0]);
  const actions = [
    { id:'story', label:'Story', icon:'plus', description:'Bagikan momen yang sedang berlangsung' },
    { id:'post', label:'Post', icon:'image', description:'Bagikan foto, video, atau cerita' },
    { id:'blog', label:'Artikel', icon:'fileText', description:'Tulis dan publikasikan artikel' },
    { id:'live', label:'Live', icon:'play', description:'Mulai siaran langsung' }
  ];
  const businessEntries = [
    { label:'Toko', action:'Buat Toko', icon:'store', description:'Kelola produk dan penjualan' },
    { label:'Layanan', action:'Buat Layanan', icon:'briefcase', description:'Tawarkan jasa dan keahlian profesional' },
    { label:'Tempat', action:'Klaim Tempat', icon:'mapPin', description:'Kelola kehadiran bisnis di direktori' },
    { label:'Bisnis lainnya', action:'Tambahkan Bisnis', icon:'grid', description:'Ajukan kategori bisnis lain ke PLUITS' }
  ];
  return '<section class="dashboard-mobile-create" aria-labelledby="mobile-create-title">' +
    '<div class="dashboard-mobile-create-heading"><span class="dashboard-kicker">CREATE</span><h1 id="mobile-create-title">' + greeting + ', ' + firstName + '</h1><p>Apa yang ingin Anda bagikan hari ini?</p></div>' +
    '<section class="dashboard-mobile-social" aria-label="Buat konten sosial">' +
      '<div class="dashboard-mobile-create-list">' +
        actions.map((item) => '<button type="button" class="dashboard-mobile-create-action" data-create-action="' + item.id + '" aria-label="' + (item.id === 'blog' ? 'Tulis artikel untuk Blog' : 'Buat ' + item.label) + '">' +
          '<span class="dashboard-mobile-create-icon">' + renderIcon(item.icon) + '</span><span class="dashboard-mobile-create-copy"><strong>' + item.label + '</strong><small>' + item.description + '</small></span></button>').join('') +
      '</div>' +
    '</section>' +
    '<div class="dashboard-mobile-create-divider" role="separator"></div>' +
    '<section class="dashboard-mobile-business" aria-labelledby="mobile-business-title">' +
      '<div class="dashboard-mobile-business-heading"><div><span class="dashboard-kicker">BUSINESS</span><h2 id="mobile-business-title">Ruang Bisnis</h2><p>Mulai dan kelola aktivitas bisnis Anda di PLUITS.</p></div></div>' +
      '<div class="dashboard-mobile-business-list">' +
        businessEntries.map((item) => '<article class="dashboard-mobile-business-entry"><span class="dashboard-mobile-business-icon">' + renderIcon(item.icon) + '</span><span class="dashboard-mobile-business-copy"><strong>' + item.label + '</strong><small>' + item.description + '</small><em>' + item.action + '</em></span></article>').join('') +
      '</div>' +
    '</section>' +
  '</section>';
}
function renderSocialPanel(view) {
  const story = '<section class="dashboard-social-section"><div class="dashboard-social-heading"><strong>Story</strong><span>Lingkaran sosial</span></div>' + renderEmpty('Belum ada Story','Story dari koneksi Anda akan muncul di sini.','eye') + '</section>';
  const feed = '<section class="dashboard-social-section"><div class="dashboard-social-heading"><strong>Aktivitas sosial</strong><span>Feed</span></div>' + renderEmpty('Belum ada aktivitas','Postingan dan pembaruan dari koneksi Anda akan tampil di sini.','message') + '</section>';
  const inbox = '<section class="dashboard-social-section"><div class="dashboard-social-heading"><strong>Inbox</strong><span>Pesan pribadi</span></div>' + renderEmpty('Inbox belum terhubung','Percakapan lintas aktivitas PLUITS akan dapat diakses dari panel ini.','mail') + '</section>';
  if (view === 'stories') return story + feed + inbox;
  if (view === 'inbox') return inbox + story + feed;
  return feed + story + inbox;
}

export function mountDashboardPage({ root, user, onSignOut } = {}) {
  if (!root) return;
  root.__dashboardAbort?.abort();
  const controller = new AbortController();
  root.__dashboardAbort = controller;
  const signal = controller.signal;
  const displayName = String(user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Pengguna').trim();
  const name = escapeHtml(displayName);
  const email = escapeHtml(user?.email || 'Email akun tidak tersedia');
  const initial = escapeHtml(displayName.slice(0, 1).toUpperCase() || 'P');
  const layout = readLayout();
  const state = {
    tabs:[{ id:'dashboard', label:'Dashboard', closable:false }],
    activeTab:'dashboard',
    leftOpen:layout.leftOpen,
    rightOpen:layout.rightOpen,
    leftWidth:layout.leftWidth,
    rightWidth:layout.rightWidth,
    socialView:'feed',
    notificationsOpen:false,
    selectedBusinessType:'',
    selectedTemplate:'AURELIA',
    transactionMode:'purchase',
    transactionStatus:'all',
    settingsSection:'account'
  };

  const saveLayout = () => {
    try {
      localStorage.setItem(LAYOUT_KEY, JSON.stringify({ leftWidth:state.leftWidth, rightWidth:state.rightWidth, leftOpen:state.leftOpen, rightOpen:state.rightOpen }));
    } catch { /* Layout preferences remain usable for this session. */ }
  };
  const openTab = (id) => {
    const module = MODULE_GROUPS.flatMap((group) => group.items).find((item) => item.id === id);
    const definition = TABS.find((item) => item.id === id);
    const tab = definition || (module ? { id, label:module.label, closable:true } : null);
    if (!tab) return;
    if (!state.tabs.some((item) => item.id === id)) state.tabs.push(tab);
    state.activeTab = id;
    state.notificationsOpen = false;
    render();
  };
  const closeTab = (id) => {
    if (id === 'dashboard') return;
    state.tabs = state.tabs.filter((tab) => tab.id !== id);
    if (state.activeTab === id) state.activeTab = state.tabs[state.tabs.length - 1]?.id || 'dashboard';
    render();
  };

  function render() {
    const headerActions =
      '<div class="dashboard-header-actions">' +
        '<button type="button" class="dashboard-header-action dashboard-desktop-notification" data-notifications aria-expanded="' + state.notificationsOpen + '">' + renderIcon('mail') + '<span>Notifikasi</span></button>' +
        '<button type="button" class="dashboard-header-action dashboard-desktop-inbox" data-open-inbox>' + renderIcon('message') + '<span>Inbox</span></button>' +
        '<nav class="dashboard-mobile-utility-nav" aria-label="Akses cepat akun">' +
          '<span class="dashboard-mobile-utility-item" role="img" aria-label="Wishlist" title="Wishlist">' + renderIcon('heart') + '</span>' +
          '<span class="dashboard-mobile-utility-item" role="img" aria-label="Keranjang belanja" title="Keranjang belanja">' + renderIcon('cart') + '</span>' +
          '<span class="dashboard-mobile-utility-item" role="img" aria-label="Notifikasi" title="Notifikasi">' + renderIcon('bell') + '</span>' +
        '</nav>' +
        '<span class="dashboard-header-user"><span class="dashboard-header-avatar">' + initial + '</span><span class="dashboard-header-name">' + name + '</span></span>' +
        '<button class="dashboard-signout" type="button" data-sign-out>' + renderIcon('logout') + '<span>Keluar</span></button>' +
      '</div>';
    const tabMarkup = state.tabs.map((tab) => '<div class="dashboard-tab' + (tab.id === state.activeTab ? ' is-active' : '') + '">' +
      '<button type="button" class="dashboard-tab-select" data-select-tab="' + tab.id + '" aria-current="' + (tab.id === state.activeTab ? 'page' : 'false') + '">' + escapeHtml(tab.label) + '</button>' +
      (tab.closable !== false ? '<button type="button" class="dashboard-tab-close" data-close-tab="' + tab.id + '" aria-label="Tutup ' + escapeHtml(tab.label) + '">×</button>' : '') + '</div>').join('');
    const moduleMarkup = MODULE_GROUPS.map((group) => '<section class="dashboard-module-group"><h2>' + group.label + '</h2><div>' + group.items.map((item) =>
      '<button type="button" data-open-tab="' + item.id + '" class="dashboard-module-link' + (state.activeTab === item.id ? ' is-active' : '') + '">' +
      '<span class="dashboard-module-link-icon">' + renderIcon(item.icon) + '</span><span class="dashboard-module-link-label">' + item.label + '</span>' +
      (item.status ? '<small>' + item.status + '</small>' : '') + '</button>'
    ).join('') + '</div></section>').join('');
    const center = renderTabContent(state.activeTab, { name, email, initial, selectedBusinessType:state.selectedBusinessType, selectedTemplate:state.selectedTemplate, transactionMode:state.transactionMode, transactionStatus:state.transactionStatus, settingsSection:state.settingsSection });
    root.innerHTML =
      '<div class="pl-page-shell dashboard-page">' +
        renderPageHeader({ label:'PLUITS Dashboard', brandHref:routeHref('home'), note:'PUSAT KENDALI PENGGUNA', rightContent:headerActions, variant:'workspace' }) +
        '<main class="pl-page-main dashboard-main">' +
          '<div class="dashboard-toolbar"><div class="dashboard-toolbar-title"><span class="dashboard-kicker">RUANG KERJA PERSONAL</span><strong><span class="dashboard-desktop-title">Dashboard</span><span class="dashboard-mobile-title">Create</span></strong></div>' +
            '<div class="dashboard-toolbar-controls"><button type="button" data-toggle-left aria-expanded="' + state.leftOpen + '">' + (state.leftOpen ? 'Sembunyikan modul' : 'Tampilkan modul') + '</button><button type="button" data-toggle-right aria-expanded="' + state.rightOpen + '">' + (state.rightOpen ? 'Sembunyikan sosial' : 'Tampilkan sosial') + '</button></div></div>' +
          '<div class="dashboard-tabs" role="tablist" aria-label="Halaman yang sedang terbuka">' + tabMarkup + '</div>' +
          renderMobileCreate(displayName) +
          '<div class="dashboard-layout' + (state.leftOpen ? '' : ' is-left-hidden') + (state.rightOpen ? '' : ' is-right-hidden') + '" style="--dashboard-left-width:' + state.leftWidth + 'px;--dashboard-right-width:' + state.rightWidth + 'px">' +
            '<aside class="dashboard-sidebar" aria-label="Daftar modul"><div class="dashboard-sidebar-heading"><strong>Modul PLUITS</strong><span>Semua akses dalam satu akun</span></div>' + moduleMarkup + '<div class="dashboard-sidebar-footer"><span class="dashboard-sidebar-avatar">' + initial + '</span><span><strong>' + name + '</strong><small>Akun personal</small></span></div></aside>' +
            '<div class="dashboard-resizer dashboard-resizer--left" data-resize="left" role="separator" aria-label="Ubah lebar daftar modul" aria-orientation="vertical" tabindex="0"></div>' +
            '<section class="dashboard-center" aria-label="Area pekerjaan"><div class="dashboard-center-scroll" id="dashboard-center-content">' + center + '</div></section>' +
            '<div class="dashboard-resizer dashboard-resizer--right" data-resize="right" role="separator" aria-label="Ubah lebar panel sosial" aria-orientation="vertical" tabindex="0"></div>' +
            '<aside class="dashboard-social-panel" aria-label="Aktivitas sosial"><div class="dashboard-social-panel-header"><div><strong>Social PLUITS</strong><span>Tetap terhubung saat bekerja</span></div><button type="button" data-social-focus aria-label="Buka Inbox">' + renderIcon('message') + '</button></div>' +
              '<div class="dashboard-social-tabs"><button type="button" data-social-view="feed" class="' + (state.socialView === 'feed' ? 'is-active' : '') + '">Feed</button><button type="button" data-social-view="stories" class="' + (state.socialView === 'stories' ? 'is-active' : '') + '">Story</button><button type="button" data-social-view="inbox" class="' + (state.socialView === 'inbox' ? 'is-active' : '') + '">Inbox</button></div>' +
              '<div class="dashboard-social-scroll">' + renderSocialPanel(state.socialView) + '</div></aside>' +
          '</div>' +
          (state.notificationsOpen ? '<div class="dashboard-notification-popover" role="status"><div><strong>Notifikasi PLUITS</strong><button type="button" data-close-notifications aria-label="Tutup notifikasi">×</button></div>' + renderEmpty('Belum ada notifikasi','Pemberitahuan dari seluruh modul akan dikumpulkan di sini.','mail') + '</div>' : '') +
        '</main>' +
      '</div>';
  }

  root.addEventListener('click', async (event) => {
    const target = event.target.closest('button');
    if (!target || !root.contains(target)) return;
    if (target.matches('[data-create-action]')) {
      openTab(target.dataset.createAction === 'blog' ? 'blog' : 'social');
      return;
    }
    if (target.matches('[data-open-tab]')) { openTab(target.dataset.openTab); return; }
    if (target.matches('[data-select-tab]')) { state.activeTab = target.dataset.selectTab; state.notificationsOpen = false; render(); return; }
    if (target.matches('[data-close-tab]')) { closeTab(target.dataset.closeTab); return; }
    if (target.matches('[data-toggle-left]')) { state.leftOpen = !state.leftOpen; saveLayout(); render(); return; }
    if (target.matches('[data-toggle-right]')) { state.rightOpen = !state.rightOpen; saveLayout(); render(); return; }
    if (target.matches('[data-open-inbox],[data-social-focus]')) { state.socialView = 'inbox'; state.rightOpen = true; saveLayout(); render(); return; }
    if (target.matches('[data-notifications]')) { state.notificationsOpen = !state.notificationsOpen; render(); return; }
    if (target.matches('[data-close-notifications]')) { state.notificationsOpen = false; render(); return; }
    if (target.matches('[data-social-view]')) { state.socialView = target.dataset.socialView; render(); return; }
    if (target.matches('[data-business-type]')) { state.selectedBusinessType = target.dataset.businessType; render(); return; }
    if (target.matches('[data-transaction-mode]')) { state.transactionMode = target.dataset.transactionMode; state.transactionStatus = 'all'; render(); return; }
    if (target.matches('[data-transaction-status]')) { state.transactionStatus = target.dataset.transactionStatus; render(); return; }
    if (target.matches('[data-settings-section]')) { state.settingsSection = target.dataset.settingsSection; render(); return; }
    if (target.matches('[data-blog-template]')) { state.selectedTemplate = target.dataset.blogTemplate; render(); return; }
    if (target.matches('[data-sign-out]')) {
      target.disabled = true;
      target.textContent = 'Keluar…';
      try { await onSignOut?.(); }
      catch {
        target.disabled = false;
        target.textContent = 'Keluar';
        const notice = document.createElement('p');
        notice.className = 'dashboard-signout-error';
        notice.textContent = 'Belum berhasil keluar. Periksa koneksi lalu coba lagi.';
        root.querySelector('.pl-page-header')?.after(notice);
      }
    }
  }, { signal });

  root.addEventListener('pointerdown', (event) => {
    const handle = event.target.closest('[data-resize]');
    if (!handle) return;
    event.preventDefault();
    const direction = handle.dataset.resize;
    const layoutElement = root.querySelector('.dashboard-layout');
    const rect = layoutElement.getBoundingClientRect();
    const move = (moveEvent) => {
      if (direction === 'left') state.leftWidth = Math.min(340, Math.max(190, moveEvent.clientX - rect.left));
      else state.rightWidth = Math.min(440, Math.max(250, rect.right - moveEvent.clientX));
      layoutElement.style.setProperty(direction === 'left' ? '--dashboard-left-width' : '--dashboard-right-width', (direction === 'left' ? state.leftWidth : state.rightWidth) + 'px');
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      saveLayout();
    };
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('pointermove', move, { signal });
    document.addEventListener('pointerup', up, { once:true, signal });
  }, { signal });

  root.addEventListener('keydown', (event) => {
    const handle = event.target.closest('[data-resize]');
    if (!handle || !['ArrowLeft','ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const direction = handle.dataset.resize;
    if (direction === 'left') state.leftWidth = Math.min(340, Math.max(190, state.leftWidth + (event.key === 'ArrowRight' ? 16 : -16)));
    else state.rightWidth = Math.min(440, Math.max(250, state.rightWidth + (event.key === 'ArrowLeft' ? 16 : -16)));
    const layoutElement = root.querySelector('.dashboard-layout');
    layoutElement.style.setProperty(direction === 'left' ? '--dashboard-left-width' : '--dashboard-right-width', (direction === 'left' ? state.leftWidth : state.rightWidth) + 'px');
    saveLayout();
  }, { signal });

  render();
}
