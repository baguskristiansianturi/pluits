import { routeHref } from '../../config/paths.js';
import '../../design-system/page-shell.css';
import { renderPageHeader, renderPageFooter } from '../../design-system/page-shell.js';
import { renderIcon } from '../../design-system/icons.js';
import './dashboard-page.css';

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));

export function mountDashboardPage({ root, user, onSignOut } = {}) {
  const displayName = String(user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Pengguna').trim();
  const safeName = escapeHtml(displayName);
  const email = escapeHtml(user?.email || 'Email akun tidak tersedia');
  const initial = escapeHtml(displayName.slice(0, 1).toUpperCase() || 'P');

  const headerActions =
    '<div class="dashboard-header-actions"><a class="dashboard-home-link" href="' + routeHref('home') + '">Beranda PLUITS</a>' +
    '<span class="dashboard-header-avatar" aria-hidden="true">' + initial + '</span>' +
    '<button class="dashboard-signout" type="button" data-sign-out>' + renderIcon('logout') + '<span>Keluar</span></button></div>';

  root.innerHTML =
    '<div class="pl-page-shell dashboard-page">' +
      renderPageHeader({ label:'PLUITS Dashboard', brandHref:routeHref('home'), note:'DASHBOARD PENGGUNA', rightContent:headerActions }) +
      '<main class="pl-page-main dashboard-main">' +
        '<section class="dashboard-welcome" aria-labelledby="dashboard-title">' +
          '<div class="dashboard-welcome-copy"><span class="dashboard-eyebrow">DASHBOARD PENGGUNA</span>' +
          '<h1 id="dashboard-title">Selamat datang, ' + safeName + '.</h1>' +
          '<p>Ini adalah ruang utama untuk mengakses akun dan mengikuti aktivitas Anda di PLUITS.</p>' +
          '<span class="dashboard-account-status"><i></i> Akun Anda sedang aktif</span></div>' +
          '<div class="dashboard-welcome-avatar" aria-hidden="true">' + initial + '</div>' +
        '</section>' +
        '<section class="dashboard-overview" aria-labelledby="dashboard-overview-title">' +
          '<div class="dashboard-section-heading"><div><span class="dashboard-eyebrow">RINGKASAN AKUN</span><h2 id="dashboard-overview-title">Akun Anda</h2></div>' +
          '<span class="dashboard-section-note">Informasi sesi saat ini</span></div>' +
          '<article class="dashboard-account-card"><span class="dashboard-account-icon">' + renderIcon('message') + '</span>' +
            '<div class="dashboard-account-copy"><span>Nama pengguna</span><strong>' + safeName + '</strong></div>' +
            '<div class="dashboard-account-copy"><span>Email akun</span><strong>' + email + '</strong></div>' +
            '<span class="dashboard-account-badge">Terautentikasi</span></article>' +
        '</section>' +
        '<section class="dashboard-activity-grid" aria-label="Aktivitas dan pemberitahuan">' +
          '<article class="dashboard-info-card"><div class="dashboard-card-heading"><span class="dashboard-card-icon">' + renderIcon('book') + '</span><span class="dashboard-card-kicker">AKTIVITAS</span></div>' +
            '<h2>Aktivitas Anda</h2><p>Riwayat aktivitas akan ditampilkan di sini setelah sumber aktivitas PLUITS terhubung ke Dashboard.</p>' +
            '<span class="dashboard-empty-state">Belum ada data aktivitas yang ditampilkan.</span></article>' +
          '<article class="dashboard-info-card"><div class="dashboard-card-heading"><span class="dashboard-card-icon">' + renderIcon('message') + '</span><span class="dashboard-card-kicker">PEMBERITAHUAN</span></div>' +
            '<h2>Pemberitahuan</h2><p>Informasi penting dari akun dan ruang PLUITS akan dikumpulkan di bagian ini.</p>' +
            '<span class="dashboard-empty-state">Pusat pemberitahuan belum terhubung.</span></article>' +
        '</section>' +
        '<section class="dashboard-explore"><div><span class="dashboard-eyebrow">LANJUTKAN PERJALANAN</span><h2>Jelajahi PLUITS</h2><p>Kembali ke Beranda untuk mengenal ekosistem PLUITS dan ruang-ruang yang sedang dikembangkan.</p></div>' +
          '<a class="dashboard-explore-link" href="' + routeHref('home') + '">Buka Beranda PLUITS ' + renderIcon('arrow') + '</a></section>' +
      '</main>' +
      renderPageFooter({ copyright:'© 2026 PLUITS. All rights reserved.', attribution:'Dashboard pengguna PLUITS.',
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
