import { routeHref } from '../../config/paths.js';
import '../../design-system/page-shell.css';
import { renderPageHeader, renderPageFooter } from '../../design-system/page-shell.js';
import { renderIcon } from '../../design-system/icons.js';
import './dashboard-page.css';

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));

const modules = [
  { title:'Social Media', description:'Kelola konten, percakapan, komunitas, dan aktivitas sosial Anda.', detail:'Ruang sosial PLUITS', icon:'message' },
  { title:'Marketplace', description:'Kelola aktivitas merchant melalui Store serta Restaurant & Café.', detail:'Store · Restaurant & Café', icon:'book' },
  { title:'Tickets & Accommodation', description:'Akses layanan tiket, perjalanan, dan akomodasi dalam satu ekosistem.', detail:'Perjalanan dan akomodasi', icon:'book' },
  { title:'Geo Directory', description:'Kelola informasi tempat, lokasi, dan direktori usaha.', detail:'Tempat dan direktori', icon:'message' },
  { title:'Logistics & Transportation', description:'Akses kebutuhan pengiriman, logistik, dan transportasi.', detail:'Logistik dan transportasi', icon:'message' },
  { title:'Digital Wallet', description:'Akses layanan dompet digital dan transaksi PLUITS.', detail:'Dompet dan pembayaran', icon:'book' }
];

export function mountDashboardPage({ root, user, onSignOut } = {}) {
  const displayName = String(user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Pengguna').trim();
  const safeName = escapeHtml(displayName);
  const email = escapeHtml(user?.email || 'Email akun tidak tersedia');
  const initial = escapeHtml(displayName.slice(0, 1).toUpperCase() || 'P');

  const moduleCards = modules.map((module) =>
    '<article class="dashboard-module-card" aria-label="' + module.title + ', belum tersedia">' +
      '<div class="dashboard-module-icon">' + renderIcon(module.icon) + '</div>' +
      '<div class="dashboard-module-copy"><span class="dashboard-module-status">TAHAP PENGEMBANGAN</span>' +
      '<h3>' + module.title + '</h3><p>' + module.description + '</p><small>' + module.detail + '</small></div>' +
    '</article>'
  ).join('');

  const headerActions =
    '<div class="dashboard-header-actions"><div class="dashboard-header-user"><span class="dashboard-header-avatar" aria-hidden="true">' + initial + '</span>' +
    '<span class="dashboard-header-name">' + safeName + '</span></div>' +
    '<button class="dashboard-signout" type="button" data-sign-out>' + renderIcon('logout') + '<span>Keluar</span></button></div>';

  root.innerHTML =
    '<div class="pl-page-shell dashboard-page">' +
      renderPageHeader({ label:'PLUITS Dashboard', brandHref:routeHref('home'), note:'DASHBOARD PENGGUNA', rightContent:headerActions }) +
      '<main class="pl-page-main dashboard-main">' +
        '<section class="dashboard-welcome" aria-labelledby="dashboard-title">' +
          '<div class="dashboard-welcome-copy"><span class="dashboard-eyebrow">DASHBOARD PENGGUNA</span>' +
          '<h1 id="dashboard-title">Selamat datang, ' + safeName + '.</h1>' +
          '<p>Satu tempat untuk mengakses aplikasi, mengelola pekerjaan, dan mengikuti seluruh aktivitas Anda di PLUITS.</p>' +
          '<span class="dashboard-account-email">' + email + '</span></div>' +
          '<div class="dashboard-welcome-mark" aria-hidden="true">' + renderIcon('check') + '</div>' +
        '</section>' +
        '<section class="dashboard-modules" aria-labelledby="dashboard-modules-title">' +
          '<div class="dashboard-section-heading"><div><span class="dashboard-eyebrow">EKOSISTEM PLUITS</span><h2 id="dashboard-modules-title">Aplikasi & layanan</h2></div>' +
          '<p>Semua ruang pengelolaan akan terhubung melalui satu akun PLUITS.</p></div>' +
          '<div class="dashboard-module-grid">' + moduleCards + '</div>' +
        '</section>' +
        '<section class="dashboard-work" aria-labelledby="dashboard-work-title">' +
          '<div class="dashboard-section-heading"><div><span class="dashboard-eyebrow">PUSAT PENGELOLAAN</span><h2 id="dashboard-work-title">Pekerjaan & aktivitas</h2></div>' +
          '<p>Ringkasan aktivitas lintas aplikasi dalam satu tempat.</p></div>' +
          '<div class="dashboard-work-grid">' +
            '<article class="dashboard-work-card"><div class="dashboard-work-card-top">' + renderIcon('book') + '<span>PEKERJAAN SAYA</span></div>' +
              '<h3>Kelola pekerjaan</h3><p>Konten, pengelolaan toko, dan pekerjaan dari layanan PLUITS akan ditampilkan di sini.</p>' +
              '<span class="dashboard-empty-state">Belum ada pekerjaan yang terhubung.</span></article>' +
            '<article class="dashboard-work-card"><div class="dashboard-work-card-top">' + renderIcon('message') + '<span>AKTIVITAS TERBARU</span></div>' +
              '<h3>Aktivitas Anda</h3><p>Perubahan dan aktivitas dari Social Media, Marketplace, serta layanan lain akan tercatat di bagian ini.</p>' +
              '<span class="dashboard-empty-state">Belum ada aktivitas yang tercatat.</span></article>' +
            '<article class="dashboard-work-card"><div class="dashboard-work-card-top">' + renderIcon('mail') + '<span>PEMBERITAHUAN</span></div>' +
              '<h3>Informasi penting</h3><p>Pemberitahuan akun dan pembaruan dari aplikasi PLUITS akan dikumpulkan di sini.</p>' +
              '<span class="dashboard-empty-state">Pusat pemberitahuan belum terhubung.</span></article>' +
          '</div>' +
        '</section>' +
      '</main>' +
      renderPageFooter({ copyright:'© 2026 PLUITS. All rights reserved.', attribution:'Satu akun untuk seluruh ekosistem PLUITS.',
        groups:[{title:'Navigasi',items:[{label:'Beranda PLUITS',route:'home'},{label:'Dashboard',route:'dashboard'}]},
          {title:'Informasi',items:[{label:'Ketentuan Layanan',route:'terms'},{label:'Kebijakan Privasi',route:'privacy'}]}] }) +
    '</div>';

  const signOut = root.querySelector('[data-sign-out]');
  signOut?.addEventListener('click', async () => {
    signOut.disabled = true;
    signOut.innerHTML = 'Keluar…';
    try {
      await onSignOut?.();
    } catch {
      signOut.disabled = false;
      signOut.innerHTML = renderIcon('logout') + '<span>Keluar</span>';
      const notice = document.createElement('p');
      notice.className = 'dashboard-signout-error';
      notice.textContent = 'Belum berhasil keluar. Periksa koneksi lalu coba lagi.';
      root.querySelector('.pl-page-header')?.after(notice);
    }
  });
}
