import { routeHref } from '../../config/paths.js';
import '../../design-system/page-shell.css';
import { renderPageHeader } from '../../design-system/page-shell.js';
import { renderIcon } from '../../design-system/icons.js';
import './authenticated-home.css';

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));

const spaces = [
  { number:'01', title:'Social & Community', description:'Ruang untuk terhubung, mengikuti komunitas, dan berbagi pengalaman.', status:'Disiapkan bertahap' },
  { number:'02', title:'Local Discovery', description:'Jelajahi orang, tempat, komunitas, dan usaha di sekitar Anda.', status:'Disiapkan bertahap' },
  { number:'03', title:'Marketplace', description:'Temukan produk dan layanan dari penyedia di dalam ekosistem.', status:'Disiapkan bertahap' },
  { number:'04', title:'Everyday Services', description:'Akses berbagai layanan yang mendukung kebutuhan sehari-hari.', status:'Disiapkan bertahap' }
];

export function mountAuthenticatedHomePage({ root, user, onSignOut }) {
  const displayName = String(user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Pengguna').trim();
  const name = escapeHtml(displayName);
  const email = escapeHtml(user?.email || '');
  const initial = escapeHtml(displayName.slice(0, 1).toUpperCase() || 'P');
  const cards = spaces.map((item) =>
    '<article class="global-home-space"><div class="global-home-space-top"><span>' + item.number + '</span><small>' + item.status + '</small></div>' +
    '<h3>' + item.title + '</h3><p>' + item.description + '</p></article>'
  ).join('');

  root.innerHTML =
    '<div class="pl-page-shell authenticated-home-page">' +
      renderPageHeader({
        label:'PLUITS Global Home',
        brandHref:routeHref('home'),
        note:'YOUR CONNECTED ECOSYSTEM',
        rightContent:'<div class="global-home-account"><span class="global-home-avatar">' + initial + '</span><span class="global-home-account-copy"><strong>' + name + '</strong><small>' + email + '</small></span><button class="global-home-signout" type="button" data-sign-out aria-label="Keluar dari akun">' + renderIcon('logout') + '<span>Keluar</span></button></div>'
      }) +
      '<main class="pl-page-main global-home-main">' +
        '<section class="global-home-welcome" aria-labelledby="global-home-title">' +
          '<div class="global-home-welcome-copy"><span class="global-home-eyebrow">GLOBAL HOME · AKUN AKTIF</span>' +
          '<h1 id="global-home-title">Selamat datang, ' + name + '.</h1>' +
          '<p>Ini adalah titik awal Anda menjelajahi PLUITS. Dari sini, berbagai bagian ekosistem akan terhubung dalam satu pengalaman.</p>' +
          '<a class="global-home-account-link" href="#ruang-ekosistem">Jelajahi ekosistem <span aria-hidden="true">→</span></a></div>' +
          '<div class="global-home-mark" aria-hidden="true"><span>p</span><small>ONE IDENTITY</small></div>' +
        '</section>' +
        '<section class="global-home-section" id="ruang-ekosistem" aria-labelledby="global-home-spaces-title">' +
          '<div class="global-home-section-heading"><div><span class="global-home-eyebrow">SATU AKUN · BERAGAM RUANG</span><h2 id="global-home-spaces-title">Jelajahi PLUITS</h2></div><p>Global Home menghubungkan pengalaman lintas ekosistem. Setiap ruang akan tersedia mengikuti tahap kesiapan layanannya.</p></div>' +
          '<div class="global-home-spaces">' + cards + '</div>' +
        '</section>' +
        '<section class="global-home-profile-strip"><div class="global-home-profile-avatar">' + initial + '</div><div><span class="global-home-eyebrow">IDENTITAS PLUITS ANDA</span><h2>' + name + '</h2><p>' + email + '</p></div><span class="global-home-profile-state">Akun aktif</span></section>' +
        '<p class="global-home-footnote">Global Home adalah beranda utama platform. Circle dan ruang sosial pribadi merupakan pengalaman terpisah yang akan dirancang pada tahap Social Media.</p>' +
      '</main>' +
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
      notice.className = 'global-home-signout-error';
      notice.textContent = 'Belum berhasil keluar. Periksa koneksi lalu coba lagi.';
      root.querySelector('.pl-page-header')?.after(notice);
    }
  });
}
