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
    ? '<a class="business-header-cta" href="' + routeHref('dashboard') + '">Dashboard</a>'
    : '<div class="business-header-actions"><a class="business-login-link" href="' + routeHref('login') + '">Masuk</a><a class="business-header-cta" href="' + routeHref('register') + '">Daftar</a></div>';

  const footerMarkup = renderPublicFooter();

  root.innerHTML = '<div class="pl-page-shell business-home">' +
    renderPageHeader({variant:'business-home',brandHref:routeHref('home'),label:'PLUITS — Beranda',rightContent:'<nav class="business-home-nav" aria-label="Navigasi homepage"><a href="#untuk-pengguna">Untuk Pengguna</a><a href="#untuk-bisnis">Untuk Bisnis</a><a href="#ekosistem">Jelajahi</a></nav>'+headerAction}) +
    '<main class="pl-page-main business-home-main">' +
      '<section class="business-home-hero">' +
        '<div class="business-home-hero-copy"><span class="business-eyebrow">LEBIH DEKAT. LEBIH TERHUBUNG.</span><h1>Satu tempat untuk <em>terhubung</em>, menemukan, dan berkembang.</h1><p>Temukan cerita, orang, komunitas, bisnis, dan berbagai hal menarik di sekitar Anda. Semua berawal dari satu ruang yang menghubungkan banyak kemungkinan.</p><div class="business-home-cta"><a class="business-primary-cta" href="' + primaryHref + '">' + primaryLabel + ' <span aria-hidden="true">→</span></a><a class="business-secondary-cta" href="#ekosistem">Kenali PLUITS</a></div><div class="business-home-trustline"><span>' + icon('check') + '</span><small>Satu identitas untuk menjelajahi ekosistem PLUITS.</small></div></div>' +
        '<div class="business-home-hero-visual">' + heroVisual() + '</div>' +
      '</section>' +
      '<section class="business-home-intro-strip"><span>BUKAN HANYA TENTANG APA YANG ANDA TEMUKAN.</span><strong>Tetapi juga tentang siapa yang Anda temui dan peluang yang bisa tumbuh.</strong></section>' +
      '<section class="business-home-section business-user-section" id="untuk-pengguna">' +
        sectionIntro('UNTUK ANDA','Jadikan setiap hari lebih terhubung.','Bagikan hal yang Anda sukai, temukan inspirasi, dan perluas lingkaran Anda bersama orang-orang serta komunitas yang berarti.') +
        userExperience() +
        '<div class="business-section-action"><a href="' + routeHref('discover') + '">Mulai menjelajahi <span aria-hidden="true">→</span></a></div>' +
      '</section>' +
      '<section class="business-home-business-band" id="untuk-bisnis"><div class="business-home-business-inner">' +
        '<div class="business-home-business-copy">' + sectionIntro('UNTUK PELAKU USAHA','Bawa bisnis Anda lebih dekat kepada pelanggan.','Bangun kehadiran digital yang lebih mudah ditemukan. Perkenalkan apa yang Anda tawarkan, ceritakan nilai bisnis Anda, dan buka jalan untuk hubungan yang lebih bermakna.') +
          '<a class="business-primary-cta" href="' + primaryHref + '">' + (user ? 'Buka Dashboard' : 'Mulai bersama PLUITS') + ' <span aria-hidden="true">→</span></a></div>' +
        '<div class="business-home-business-visual"><div class="business-owner-photo">' + photo('business','') + '<div><span>UNTUK PELAKU USAHA</span><strong>Bisnis Anda punya cerita. Biarkan lebih banyak orang menemukannya.</strong></div></div></div>' +
      '</div><div class="business-owner-grid-wrap">' + businessExperience() + '</div></section>' +
      '<section class="business-home-section business-discovery-section" id="ekosistem">' +
        sectionIntro('LEBIH BANYAK UNTUK DIJELAJAHI','Dari cerita sehari-hari hingga kebutuhan lokal.','PLUITS membuka ruang untuk menemukan hal-hal yang dekat dengan kehidupan: tempat, produk, usaha, komunitas, dan layanan.') +
        discoveryShowcase() +
      '</section>' +
      '<section class="business-home-closing"><div><span class="business-eyebrow">MULAI DARI SINI</span><h2>Temukan ruang Anda di PLUITS.</h2><p>Terhubung sebagai diri sendiri, atau hadirkan bisnis Anda untuk ditemukan lebih banyak orang.</p></div><a class="business-primary-cta" href="' + primaryHref + '">' + primaryLabel + ' <span aria-hidden="true">→</span></a></section>' +
      '<section class="business-app-download" aria-labelledby="business-app-download-title"><div class="business-app-download-copy"><span class="business-eyebrow">PLUITS ON THE GO</span><h2 id="business-app-download-title">Tetap terhubung, di mana pun Anda berada.</h2><p>Aplikasi PLUITS untuk Android dan iOS sedang dalam persiapan. Nantikan kehadirannya.</p></div><div class="business-app-badges"><div class="business-app-badge business-app-badge--google" role="img" aria-label="Google Play untuk Android — segera hadir"><span class="business-app-icon business-app-icon--google"><svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#00A0FF" d="M7.2 4.9c-.8.8-1.2 2-1.2 3.6v31c0 1.6.4 2.8 1.2 3.6L25 24 7.2 4.9Z"/><path fill="#00D26A" d="m7.2 4.9 22.1 22.4 7.4-7.5L12.5 3.1C10.5 2 8.5 3.1 7.2 4.9Z"/><path fill="#FFCE00" d="m29.3 27.3-4.3-3.3 11.7-11.8 6.5 3.7c2.5 1.4 2.5 3.8 0 5.2l-13.9 8Z"/><path fill="#F44336" d="m7.2 43.1 22.1-22.4 7.4 7.5-24.2 13.6c-2 1.1-4 .1-5.3-1.7Z"/><path fill="#00C6A2" d="m29.3 20.7 7.4 7.5-7.4 4.2L21.9 24l7.4-3.3Z"/></svg></span><span><small>GET IT ON</small><strong>Google Play</strong><em>Coming Soon</em></span></div><div class="business-app-badge business-app-badge--apple" role="img" aria-label="Apple App Store untuk iOS — segera hadir"><span class="business-app-icon business-app-icon--apple"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M16.7 12.8c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-2.9-.8-1.5 0-2.9.9-3.7 2.2-1.6 2.8-.4 6.9 1.1 9.1.7 1.1 1.5 2.3 2.6 2.2 1-.1 1.4-.7 2.7-.7s1.7.7 2.8.7c1.2 0 1.9-1.1 2.6-2.2.8-1.2 1.1-2.4 1.1-2.5-.1 0-2.1-.8-2.1-3.7ZM14.4 6.2c.6-.8 1-1.8.9-2.9-.9 0-2 .6-2.6 1.4-.6.7-1.1 1.8-1 2.8 1 .1 2-.5 2.7-1.3Z"/></svg></span><span><small>DOWNLOAD ON THE</small><strong>App Store</strong><em>Coming Soon</em></span></div></div></section>' +
    '</main>' +
    footerMarkup +
  '</div>';
}
