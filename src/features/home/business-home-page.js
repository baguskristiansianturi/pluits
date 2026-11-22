import { routeHref } from '../../config/paths.js';
import { assetUrl } from '../../config/runtime.js';
import '../../design-system/page-shell.css';
import { renderPageHeader } from '../../design-system/page-shell.js';
import { renderPublicFooter } from '../public-info/public-footer.js';
import { renderIcon } from '../../design-system/icons.js';
import { HOME_VISUALS } from './home-visuals.js';
import './business-home.css';

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
const icon = (name) => renderIcon(name);
const photo = (key, className = '', priority = false) => {
  const visual = HOME_VISUALS[key];
  return '<img class="' + className + '" src="' + escapeHtml(visual.src) + '" alt="' + escapeHtml(visual.alt) + '" loading="' + (priority ? 'eager' : 'lazy') + '" decoding="async"' + (priority ? ' fetchpriority="high"' : '') + '>';
};
const sectionIntro = (eyebrow, title, copy) => '<div class="business-section-intro"><span class="business-eyebrow">' + eyebrow + '</span><h2>' + title + '</h2><p>' + copy + '</p></div>';

function heroVisual() {
  return '<div class="business-hero-photo">' + photo('hero','business-hero-photo-image',true) +
    '<div class="business-hero-photo-shade"></div><div class="business-hero-photo-caption"><span>ONE CONNECTED ECOSYSTEM</span><strong>Lebih banyak hal baik dimulai dari sebuah koneksi.</strong></div>' +
    '<div class="business-hero-ecosystem"><span>Social</span><span>Discover</span><span>Marketplace</span><span>Services</span></div></div>';
}

function userExperience() {
  return '<div class="business-benefit-grid">' +
    '<article class="business-benefit-card business-benefit-card--featured"><div class="business-benefit-media">' + photo('community','') + '<span class="business-photo-kicker">SOCIAL</span></div><div class="business-benefit-copy"><span class="business-card-overline">BAGIKAN MOMEN</span><h3>Cerita Anda punya tempat.</h3><p>Bagikan momen, ide, dan hal yang berarti. Temukan orang-orang yang membuat setiap cerita terasa lebih dekat.</p></div></article>' +
    '<article class="business-benefit-card business-benefit-card--compact"><div class="business-benefit-media">' + photo('collaboration','') + '</div><div class="business-benefit-copy"><span class="business-card-overline">KOMUNITAS</span><h3>Temukan lingkaran Anda.</h3><p>Terhubung dengan orang yang punya minat serupa.</p></div></article>' +
    '<article class="business-benefit-card business-benefit-card--compact"><div class="business-benefit-media">' + photo('discovery','') + '</div><div class="business-benefit-copy"><span class="business-card-overline">JELAJAHI</span><h3>Selalu ada hal baru.</h3><p>Temukan tempat, aktivitas, dan inspirasi.</p></div></article>' +
    '</div>';
}

function businessExperience() {
  const items = [
    ['store','Tampilkan bisnis Anda','Perkenalkan toko, produk, atau layanan agar lebih mudah ditemukan.'],
    ['message','Bangun hubungan pelanggan','Mulai dikenal, berinteraksi, dan tumbuhkan kepercayaan melalui kehadiran digital.'],
    ['mapPin','Jangkau lingkungan sekitar','Bantu orang menemukan usaha dan layanan yang relevan di sekitar mereka.']
  ];
  return '<div class="business-owner-grid">' + items.map(([symbol,title,copy],index) =>
    '<article class="business-owner-card"><span class="business-owner-number">0' + (index+1) + '</span><div class="business-owner-icon">' + icon(symbol) + '</div><h3>' + title + '</h3><p>' + copy + '</p></article>'
  ).join('') + '</div>';
}



function discoveryShowcase() {
  const cards = [
    ['Kuliner','Temukan tempat makan dan cerita di baliknya.','food','food'],
    ['Produk & usaha lokal','Kenali produk dan usaha dari berbagai daerah.','business','local'],
    ['Tempat & aktivitas','Jelajahi destinasi dan kegiatan menarik.','discovery','places'],
    ['Ruang untuk bertemu','Temukan suasana baru untuk berbagi cerita.','coffee','coffee']
  ];
  return '<div class="business-discovery-grid">' + cards.map(([title,copy,image,kind],index) =>
    '<article class="business-discovery-card business-discovery-card--' + kind + '"><div class="business-discovery-visual">' + photo(image,'') + '<span>0' + (index+1) + '</span><b>' + title + '</b></div><div class="business-discovery-copy"><h3>' + title + '</h3><p>' + copy + '</p></div></article>'
  ).join('') + '</div>';
}

export function mountBusinessHomePage({root,user=null}={}) {
  const primaryHref = routeHref(user ? 'dashboard' : 'register');
  const primaryLabel = user ? 'Buka Dashboard' : 'Bergabung dengan PLUITS';
  const headerAction = user
    ? '<div class="business-header-actions"><a class="business-login-link" href="' + routeHref('dashboard') + '">Dashboard</a></div>'
    : '<div class="business-header-actions"><a class="business-login-link" href="' + routeHref('login') + '">Masuk</a><a class="business-header-cta" href="' + routeHref('register') + '">Daftar</a></div>';

  const footerMarkup = renderPublicFooter();

  root.innerHTML = '<div class="pl-page-shell business-home">' +
    renderPageHeader({variant:'business-home',brandHref:routeHref('home'),label:'PLUITS — Beranda',rightContent:'<nav class="business-home-nav" aria-label="Navigasi homepage"><a href="' + routeHref('marketplace') + '">Marketplace</a><a href="#untuk-pengguna">Untuk Pengguna</a><a href="#ekosistem">Jelajahi</a></nav>'+headerAction}) +
    '<main class="pl-page-main business-home-main">' +
      '<section class="business-home-hero">' +
        '<div class="business-home-hero-copy"><span class="business-eyebrow">LEBIH DEKAT. LEBIH TERHUBUNG.</span><h1>Satu tempat untuk <em>terhubung</em>, menemukan, dan berkembang.</h1><p>Temukan cerita, orang, komunitas, bisnis, dan berbagai hal menarik di sekitar Anda. Semua berawal dari satu ruang yang menghubungkan banyak kemungkinan.</p><div class="business-home-cta"><a class="business-primary-cta" href="' + primaryHref + '">' + primaryLabel + ' <span aria-hidden="true">→</span></a><a class="business-secondary-cta" href="' + routeHref('marketplace') + '">Jelajahi Marketplace</a></div><div class="business-home-trustline"><span>' + icon('check') + '</span><small>Satu identitas untuk menjelajahi ekosistem PLUITS.</small></div></div>' +
        '<div class="business-home-hero-visual">' + heroVisual() + '</div>' +
      '</section>' +
      '<section class="business-home-intro-strip"><span>BUKAN HANYA TENTANG APA YANG ANDA TEMUKAN.</span><strong>Tetapi juga tentang siapa yang Anda temui dan peluang yang bisa tumbuh.</strong></section>' +
      '<section class="business-home-section business-user-section" id="untuk-pengguna">' +
        sectionIntro('UNTUK ANDA','Jadikan setiap hari lebih terhubung.','Bagikan hal yang Anda sukai, temukan inspirasi, dan perluas lingkaran Anda bersama orang-orang serta komunitas yang berarti.') +
        userExperience() +
        '<div class="business-section-action"><a href="' + routeHref('discover') + '">Mulai menjelajahi <span aria-hidden="true">→</span></a></div>' +
      '</section>' +
      '<section class="business-home-section business-discovery-section" id="ekosistem">' +
        sectionIntro('LEBIH BANYAK UNTUK DIJELAJAHI','Dari cerita sehari-hari hingga kebutuhan lokal.','PLUITS membuka ruang untuk menemukan hal-hal yang dekat dengan kehidupan: tempat, produk, usaha, komunitas, dan layanan.') +
        discoveryShowcase() +
      '</section>' +
      '<section class="business-home-closing"><div><span class="business-eyebrow">MULAI DARI SINI</span><h2>Temukan ruang Anda di PLUITS.</h2><p>Terhubung sebagai diri sendiri, atau hadirkan bisnis Anda untuk ditemukan lebih banyak orang.</p></div><a class="business-primary-cta" href="' + primaryHref + '">' + primaryLabel + ' <span aria-hidden="true">→</span></a></section>' +
      `
<section class="business-app-download" aria-labelledby="business-app-download-title">
<div class="business-app-download-copy">
<span class="business-eyebrow">PLUITS</span>
<h2 id="business-app-download-title">Temukan cerita. Temukan dunia Anda.</h2>
<p>Bagikan momen, temukan tempat istimewa, dan terhubung dengan orang-orang yang membuat hari lebih berarti.</p>
<div class="business-app-store-badges">
<div class="business-app-badge" role="img" aria-label="Google Play — Segera Hadir"><span class="business-app-icon business-app-icon--google"><svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#00A0FF" d="M7 5v38l19-19Z"/><path fill="#00D26A" d="m7 5 23 22 7-8L13 3Z"/><path fill="#FFCE00" d="m30 27 13-7c3-2 3-4 0-6l-6-3-15 14Z"/><path fill="#F44336" d="m7 43 23-22 7 8-24 14c-3 2-5 1-6 0Z"/></svg></span><span><small>UNDUH DI</small><strong>Google Play</strong><em>Segera Hadir</em></span></div>
<div class="business-app-badge" role="img" aria-label="App Store — Segera Hadir"><span class="business-app-icon business-app-icon--apple"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.7 12.8c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-2.9-.8-1.5 0-2.9.9-3.7 2.2-1.6 2.8-.4 6.9 1.1 9.1.7 1.1 1.5 2.3 2.6 2.2 1-.1 1.4-.7 2.7-.7s1.7.7 2.8.7c1.2 0 1.9-1.1 2.6-2.2.8-1.2 1.1-2.4 1.1-2.5-.1 0-2.1-.8-2.1-3.7ZM14.4 6.2c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.6 1.4-.6.7-1.1 1.8-1 2.8 1 .1 2-.5 2.7-1.3Z"/></svg></span><span><small>UNDUH DI</small><strong>App Store</strong><em>Segera Hadir</em></span></div>
</div>

</div>
<div class="business-app-mockups" aria-label="Pratinjau aplikasi PLUITS pada Android dan iPhone">
  <article class="business-phone-card business-phone-card--android">
    <div class="business-device business-device--android">
      <div class="business-device-screen">
        <div class="business-os-status"><span>9:41</span><span>● ▮ ▰</span></div>
        <header class="pluits-app-topbar"><img src="${assetUrl('assets/brand/pluits-logo.svg')}" alt=""><strong>pluits</strong><button type="button" aria-label="Pesan">✉</button></header>
        <div class="pluits-app-greeting"><strong>Selamat pagi, Bagus Kristian</strong><span>Ada banyak cerita menarik hari ini.</span></div>
        <div class="pluits-story-row" aria-label="Cerita terbaru">
          <div class="pluits-story pluits-story--add"><span class="pluits-story-photo"><img src="${escapeHtml(HOME_VISUALS.community.src)}" alt=""></span><b>Cerita Anda</b></div>
          <div class="pluits-story"><span class="pluits-story-photo"><img src="${escapeHtml(HOME_VISUALS.business.src)}" alt=""></span><b>Nadia</b></div>
          <div class="pluits-story"><span class="pluits-story-photo"><img src="${escapeHtml(HOME_VISUALS.food.src)}" alt=""></span><b>Rizky</b></div>
          <div class="pluits-story"><span class="pluits-story-photo"><img src="${escapeHtml(HOME_VISUALS.discovery.src)}" alt=""></span><b>Amelia</b></div>
        </div>
        <article class="pluits-feed-card">
          <div class="pluits-post-head"><img src="${escapeHtml(HOME_VISUALS.business.src)}" alt=""><span><b>Bagus Kristian</b><small>Bali · 12 menit lalu</small></span><button type="button" aria-label="Lainnya">•••</button></div>
          <img class="pluits-post-photo" src="${escapeHtml(HOME_VISUALS.food.src)}" alt="Hidangan brunch di sebuah kafe">
          <div class="pluits-post-actions"><span class="pluits-like">♥ <b>128</b></span><span>◯ <b>24 komentar</b></span><span class="pluits-save">♡</span></div>
          <p class="pluits-post-caption"><b>Bagus Kristian</b> Menikmati sudut Bali yang selalu punya cerita. ☀️</p>
          <div class="pluits-comment-preview"><img src="${escapeHtml(HOME_VISUALS.community.src)}" alt=""><span><b>Rani</b> Tempatnya terlihat nyaman banget!</span></div>
        </article>
        <nav class="pluits-app-nav" aria-label="Navigasi aplikasi"><span class="is-active"><svg viewBox="0 0 24 24"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/></svg><small>Beranda</small></span><span><svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg><small>Jelajahi</small></span><span class="pluits-nav-add"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></span><span><svg viewBox="0 0 24 24"><path d="M20.8 8.8c0 5.2-8.8 11-8.8 11s-8.8-5.8-8.8-11a4.8 4.8 0 0 1 8.8-2.4 4.8 4.8 0 0 1 8.8 2.4Z"/></svg><small>Aktivitas</small></span><span><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></svg><small>Profil</small></span></nav>
        <div class="business-android-gesture"></div>
      </div>
    </div>
    
  </article>
  <article class="business-phone-card business-phone-card--iphone">
    <div class="business-device business-device--iphone">
      <div class="business-device-screen">
        <div class="business-iphone-island"></div>
        <div class="business-os-status business-os-status--iphone"><span>9:41</span><span>● ▮ ▰</span></div>
        <header class="pluits-app-topbar pluits-app-topbar--iphone"><img src="${assetUrl('assets/brand/pluits-logo.svg')}" alt=""><strong>Jelajahi</strong><button type="button" aria-label="Pesan">✉</button></header>
        <div class="pluits-discover-heading"><span>Temukan di sekitar Anda</span><strong>Ada banyak hal<br>menarik menanti.</strong></div>
        <div class="pluits-search-field"><span>⌕</span> Cari tempat, kuliner, dan lainnya</div>
        <div class="pluits-story-row pluits-story-row--iphone" aria-label="Cerita terbaru">
          <div class="pluits-story pluits-story--add"><span class="pluits-story-photo"><img src="${escapeHtml(HOME_VISUALS.community.src)}" alt=""></span><b>Cerita Anda</b></div>
          <div class="pluits-story"><span class="pluits-story-photo"><img src="${escapeHtml(HOME_VISUALS.discovery.src)}" alt=""></span><b>Travel</b></div>
          <div class="pluits-story"><span class="pluits-story-photo"><img src="${escapeHtml(HOME_VISUALS.food.src)}" alt=""></span><b>Kuliner</b></div>
          <div class="pluits-story"><span class="pluits-story-photo"><img src="${escapeHtml(HOME_VISUALS.business.src)}" alt=""></span><b>Lokal</b></div>
        </div>
        <div class="pluits-discover-section-head"><b>Tempat pilihan</b><span>Lihat semua</span></div>
        <article class="pluits-place-card"><img src="${escapeHtml(HOME_VISUALS.discovery.src)}" alt="Pemandangan alam Bali"><div><span>ALAM &amp; WISATA</span><b>Temukan sisi lain Bali</b><small>Tempat menarik untuk dikunjungi</small></div><i>♡</i></article>
        <article class="pluits-place-card pluits-place-card--food"><img src="${escapeHtml(HOME_VISUALS.food.src)}" alt="Hidangan di restoran"><div><span>KULINER</span><b>Rasa yang selalu dirindukan</b><small>Rekomendasi di sekitar Anda</small></div><i>♡</i></article>
        <nav class="pluits-app-nav pluits-app-nav--iphone" aria-label="Navigasi aplikasi"><span class="is-active"><svg viewBox="0 0 24 24"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/></svg><small>Beranda</small></span><span><svg viewBox="0 0 24 24"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg><small>Jelajahi</small></span><span class="pluits-nav-add"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></span><span><svg viewBox="0 0 24 24"><path d="M20.8 8.8c0 5.2-8.8 11-8.8 11s-8.8-5.8-8.8-11a4.8 4.8 0 0 1 8.8-2.4 4.8 4.8 0 0 1 8.8 2.4Z"/></svg><small>Aktivitas</small></span><span><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></svg><small>Profil</small></span></nav>
        <div class="business-iphone-home"></div>
      </div>
    </div>
    
  </article>
</div>` +
    '</main>' +
    footerMarkup +
  '</div>';
}
