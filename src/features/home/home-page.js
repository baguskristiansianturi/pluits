import { assetUrl } from '../../config/runtime.js';
import { routeHref } from '../../config/paths.js';
import '../../design-system/page-shell.css';
import { renderPageHeader, renderPageFooter } from '../../design-system/page-shell.js';
import { renderIcon } from '../../design-system/icons.js';
import './home-page.css';

const ecosystem = [
  { number:'01', title:'Social & Community', description:'Berbagi cerita, foto, tulisan, dan membangun koneksi dengan orang-orang serta komunitas.', tags:['Cerita','Tulisan','Komunitas'] },
  { number:'02', title:'Local Discovery', description:'Menemukan tempat, usaha, komunitas, dan berbagai hal menarik di sekitar kita.', tags:['Tempat','Usaha lokal','Direktori'] },
  { number:'03', title:'Marketplace', description:'Mengenal produk dan layanan dari berbagai penyedia dalam satu ruang penemuan.', tags:['Produk','Layanan','Merchant'] },
  { number:'04', title:'Everyday Services', description:'Membuka jalan menuju kebutuhan perjalanan, transportasi, dan layanan sehari-hari.', tags:['Perjalanan','Transportasi','Akomodasi'] }
];

export function mountHomePage({ root, user = null, onSignOut }) {
  if (user) {
  const displayName = String(user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Pengguna').trim();
  const name = escapeHtml(displayName);
  const email = escapeHtml(user?.email || '');
  const initial = escapeHtml(displayName.slice(0, 1).toUpperCase() || 'P');
  const cards = spaces.map((item) =>
    '<article class="global-home-space"><div class="global-home-space-top"><span>' + item.number + '</span><small>' + item.status + '</small></div>' +
    '<h3>' + item.title + '</h3><p>' + item.description + '</p></article>'
  ).join('');

  root.innerHTML =
    '<div class="pl-page-shell home-page home-page--authenticated">' +
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
          '<div class="global-home-mark" aria-hidden="true"><img src="' + assetUrl('assets/brand/pluits-logo.svg') + '" alt=""><small>ONE IDENTITY</small></div>' +
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
    return;
  }
  const cards = ecosystem.map((item) =>
    '<article class="home-ecosystem-card"><div class="home-ecosystem-card-top"><span class="home-card-number">' + item.number + '</span><span class="home-card-status">Dikembangkan bertahap</span></div>' +
    '<h3>' + item.title + '</h3><p>' + item.description + '</p><ul class="home-card-tags">' +
    item.tags.map((tag) => '<li>' + tag + '</li>').join('') + '</ul></article>'
  ).join('');

  root.innerHTML =
    '<div class="pl-page-shell home-page">' +
      renderPageHeader({ label:'PLUITS homepage', brandHref:routeHref('home'), note:'ONE CONNECTED DIGITAL ECOSYSTEM',
        rightContent:'<div class="home-header-actions"><a class="home-header-login" href="' + routeHref('login') + '">Masuk</a><a class="home-button home-button--small" href="' + routeHref('register') + '">Daftar</a></div>' }) +
      '<main class="pl-page-main home-main">' +
        '<section class="home-hero" aria-labelledby="home-title"><div class="home-hero-copy">' +
          '<span class="home-eyebrow"><span class="home-eyebrow-dot"></span> SATU IDENTITAS · BANYAK KEMUNGKINAN</span>' +
          '<h1 id="home-title">Terhubung dengan lebih banyak hal, <span>di satu tempat.</span></h1>' +
          '<p>PLUITS adalah ekosistem digital yang dirancang untuk menghubungkan orang, komunitas, tempat, usaha, dan layanan dalam satu pengalaman yang terus berkembang.</p>' +
          '<div class="home-hero-actions"><a class="home-button" href="' + routeHref('register') + '">Kenali cara bergabung <span aria-hidden="true">→</span></a><a class="home-text-link" href="#ekosistem">Jelajahi PLUITS</a></div>' +
          '<div class="home-hero-footnote">Mulai dari satu akun. Jelajahi berbagai kemungkinan.</div></div>' +
          '<div class="home-hero-visual" aria-label="Gambaran area dalam ekosistem PLUITS"><div class="home-visual-orbit home-visual-orbit--one"></div><div class="home-visual-orbit home-visual-orbit--two"></div>' +
            '<div class="home-visual-core"><img src="' + assetUrl('assets/brand/pluits-logo.svg') + '" alt="Logo PLUITS"><span>PLUITS</span><small>CONNECTED ECOSYSTEM</small></div>' +
            '<div class="home-visual-node home-visual-node--top"><span class="home-node-index">01</span><strong>Social</strong><small>Stories & community</small></div>' +
            '<div class="home-visual-node home-visual-node--right"><span class="home-node-index">02</span><strong>Discover</strong><small>Places & people</small></div>' +
            '<div class="home-visual-node home-visual-node--bottom"><span class="home-node-index">03</span><strong>Marketplace</strong><small>Products & services</small></div>' +
            '<div class="home-visual-node home-visual-node--left"><span class="home-node-index">04</span><strong>Services</strong><small>Everyday needs</small></div>' +
            '<span class="home-visual-caption">A connected experience, built step by step.</span></div></section>' +
        '<section class="home-intro-strip" id="tentang" aria-label="Tentang PLUITS"><div><span class="home-section-kicker">MENGENAL PLUITS</span><h2>Bukan sekadar satu fitur. Ini adalah sebuah ekosistem.</h2></div><p>PLUITS menyatukan berbagai pengalaman digital dalam satu identitas, sehingga orang dapat terhubung, menemukan hal baru, dan mengakses layanan sesuai kebutuhannya.</p></section>' +
        '<section class="home-ecosystem-section" id="ekosistem" aria-labelledby="ecosystem-title"><div class="home-section-heading"><div><span class="home-section-kicker">SATU PLATFORM, BERAGAM RUANG</span><h2 id="ecosystem-title">Apa yang bisa ditemukan di PLUITS?</h2></div><p>Kenali arah ekosistem PLUITS yang sedang dibangun secara bertahap.</p></div>' +
          '<div class="home-ecosystem-grid">' + cards + '</div><p class="home-availability-note">Setiap bagian memiliki tahap pengembangan masing-masing. Ketersediaan fitur akan diinformasikan sesuai kesiapan layanan.</p></section>' +
        '<section class="home-identity-section"><div class="home-identity-visual"><div class="home-identity-card"><span class="home-identity-label">YOUR PLUITS IDENTITY</span><div class="home-identity-mark"><img src="' + assetUrl('assets/brand/pluits-logo.svg') + '" alt=""></div><strong>Satu akun PLUITS</strong><p>Identitas yang menghubungkan pengalaman Anda di dalam ekosistem.</p><div class="home-identity-lines"><i></i><i></i><i></i></div></div></div>' +
          '<div class="home-identity-copy"><span class="home-section-kicker">SATU IDENTITAS</span><h2>Kenali satu identitas untuk berbagai pengalaman.</h2><p>Dengan satu identitas PLUITS, perjalanan Anda dirancang agar dapat terhubung lintas ruang dan layanan. Setiap peran dan akses tetap mengikuti kebutuhan serta izin masing-masing.</p><a class="home-inline-link" href="' + routeHref('register') + '">Pelajari akses akun <span aria-hidden="true">→</span></a></div></section>' +
        '<section class="home-mobile-section" id="mobile-title" aria-labelledby="mobile-heading"><div class="home-mobile-copy"><span class="home-section-kicker">PLUITS DI GENGGAMAN</span><h2 id="mobile-heading">Pengalaman yang disiapkan untuk menemani aktivitas Anda.</h2><p>PLUITS juga menyiapkan pengalaman melalui aplikasi Android. Informasi dan tautan unduhan resmi akan tersedia setelah aplikasi dipublikasikan.</p>' +
          '<span class="home-play-badge" aria-disabled="true"><span class="home-play-symbol" aria-hidden="true">▶</span><span><small>COMING SOON ON</small><strong>Google Play</strong></span></span><small class="home-store-note">Belum tersedia untuk diunduh.</small></div>' +
          '<div class="home-mobile-device" aria-hidden="true"><div class="home-device-frame"><div class="home-device-speaker"></div><div class="home-device-screen"><img src="' + assetUrl('assets/brand/pluits-logo.svg') + '" alt=""><strong>PLUITS</strong><span>Everything connected.</span><div class="home-device-pills"><i></i><i></i><i></i></div><div class="home-device-card"></div><div class="home-device-card home-device-card--short"></div></div></div></div></section>' +
        '<section class="home-final-cta"><span class="home-section-kicker">MULAI DARI SINI</span><h2>Ada banyak hal yang bisa dimulai dari satu tempat.</h2><p>Kenali PLUITS dan bersiap menjadi bagian dari ekosistem yang terus berkembang.</p><a class="home-button home-button--light" href="' + routeHref('register') + '">Lihat halaman pendaftaran <span aria-hidden="true">→</span></a><small>Pendaftaran akun baru saat ini belum dibuka untuk umum.</small></section>' +
      '</main>' +
      renderPageFooter({ copyright:'© 2026 PLUITS. All rights reserved.', attribution:'One connected digital ecosystem.',
        groups:[{title:'Jelajahi',items:[{label:'Tentang PLUITS',href:'#tentang'},{label:'Ekosistem',href:'#ekosistem'},{label:'Aplikasi Android',href:'#mobile-title'}]},
          {title:'Akun',items:[{label:'Masuk',route:'login'},{label:'Pendaftaran',route:'register'}]},
          {title:'Informasi',items:[{label:'Ketentuan Layanan',route:'terms'},{label:'Kebijakan Privasi',route:'privacy'}]}] }) +
    '</div>';
}
