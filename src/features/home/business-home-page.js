import { routeHref } from '../../config/paths.js';
import { assetUrl } from '../../config/runtime.js';
import '../../design-system/page-shell.css';
import { renderBrand, renderPageFooter } from '../../design-system/page-shell.js';
import { renderIcon } from '../../design-system/icons.js';
import './business-home.css';

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
const icon = (name) => renderIcon(name);
const sectionIntro = (eyebrow, title, copy) => '<div class="business-section-intro"><span class="business-eyebrow">' + eyebrow + '</span><h2>' + title + '</h2><p>' + copy + '</p></div>';

function ecosystemOrbit() {
  return '<div class="business-orbit" aria-label="Empat ruang utama PLUITS: Social, Discover, Marketplace, dan Services">' +
    '<div class="business-orbit-core"><img src="' + assetUrl('assets/brand/pluits-logo.svg') + '" alt=""><strong>PLUITS</strong><small>ONE CONNECTED ECOSYSTEM</small></div>' +
    '<div class="business-orbit-node business-orbit-node--social"><span>' + icon('message') + '</span><b>Social</b><small>Bagikan cerita</small></div>' +
    '<div class="business-orbit-node business-orbit-node--discover"><span>' + icon('eye') + '</span><b>Discover</b><small>Temukan hal baru</small></div>' +
    '<div class="business-orbit-node business-orbit-node--marketplace"><span>' + icon('store') + '</span><b>Marketplace</b><small>Jelajahi kebutuhan</small></div>' +
    '<div class="business-orbit-node business-orbit-node--services"><span>' + icon('briefcase') + '</span><b>Services</b><small>Kenali layanan</small></div>' +
    '<span class="business-orbit-line business-orbit-line--one"></span><span class="business-orbit-line business-orbit-line--two"></span>' +
  '</div>';
}

function userExperience() {
  const items = [
    ['image','Bagikan cerita','Ungkapkan momen, ide, dan hal yang berarti bagi Anda.','user-story'],
    ['message','Temukan komunitas','Dekatkan diri dengan orang-orang yang punya minat serupa.','user-community'],
    ['mapPin','Jelajahi sekitar','Temukan tempat, aktivitas, dan inspirasi di sekitar Anda.','user-explore']
  ];
  return '<div class="business-benefit-grid">' + items.map(([symbol,title,copy,kind],index) =>
    '<article class="business-benefit-card ' + kind + '"><div class="business-benefit-art"><span class="business-art-index">0' + (index+1) + '</span><span class="business-art-icon">' + icon(symbol) + '</span><i></i><i></i></div><div class="business-benefit-copy"><h3>' + title + '</h3><p>' + copy + '</p></div></article>'
  ).join('') + '</div>';
}

function businessExperience() {
  const items = [
    ['store','Tampilkan bisnis Anda','Perkenalkan toko, produk, atau layanan agar lebih mudah ditemukan.'],
    ['users','Bangun hubungan pelanggan','Mulai dikenal, berinteraksi, dan tumbuhkan kepercayaan melalui kehadiran digital.'],
    ['mapPin','Jangkau lingkungan sekitar','Bantu orang menemukan usaha dan layanan yang relevan di sekitar mereka.']
  ];
  return '<div class="business-owner-grid">' + items.map(([symbol,title,copy],index) =>
    '<article class="business-owner-card"><span class="business-owner-number">0' + (index+1) + '</span><div class="business-owner-icon">' + icon(symbol) + '</div><h3>' + title + '</h3><p>' + copy + '</p></article>'
  ).join('') + '</div>';
}

function discoveryShowcase() {
  const cards = [
    ['Kuliner','Temukan tempat makan dan cerita di baliknya.','food'],
    ['Produk lokal','Kenali produk dan usaha dari berbagai daerah.','goods'],
    ['Tempat & aktivitas','Jelajahi destinasi dan kegiatan menarik.','places'],
    ['Layanan profesional','Temukan keahlian dan layanan yang Anda butuhkan.','services']
  ];
  return '<div class="business-discovery-grid">' + cards.map(([title,copy,kind],index) =>
    '<article class="business-discovery-card business-discovery-card--' + kind + '"><div class="business-discovery-visual"><span>0' + (index+1) + '</span><i></i><b>' + title + '</b></div><div class="business-discovery-copy"><h3>' + title + '</h3><p>' + copy + '</p></div></article>'
  ).join('') + '</div>';
}

export function mountBusinessHomePage({root,user=null}={}) {
  const primaryHref = routeHref(user ? 'dashboard' : 'register');
  const primaryLabel = user ? 'Buka Dashboard' : 'Bergabung dengan PLUITS';
  const headerAction = user
    ? '<a class="business-header-cta" href="' + routeHref('dashboard') + '">Dashboard</a>'
    : '<div class="business-header-actions"><a class="business-login-link" href="' + routeHref('login') + '">Masuk</a><a class="business-header-cta" href="' + routeHref('register') + '">Daftar</a></div>';

  root.innerHTML = '<div class="pl-page-shell business-home">' +
    '<header class="pl-page-header business-home-header">' + renderBrand({href:routeHref('home'),label:'PLUITS — Beranda'}) +
      '<nav class="business-home-nav" aria-label="Navigasi homepage"><a href="#untuk-pengguna">Untuk Pengguna</a><a href="#untuk-bisnis">Untuk Bisnis</a><a href="#ekosistem">Ekosistem</a></nav>' + headerAction +
    '</header>' +
    '<main class="pl-page-main business-home-main">' +
      '<section class="business-home-hero">' +
        '<div class="business-home-hero-copy"><span class="business-eyebrow">LEBIH DEKAT. LEBIH TERHUBUNG.</span><h1>Satu tempat untuk <em>terhubung</em>, menemukan, dan berkembang.</h1><p>Temukan cerita, orang, komunitas, bisnis, dan berbagai hal menarik di sekitar Anda. Semua berawal dari satu ruang yang menghubungkan banyak kemungkinan.</p><div class="business-home-cta"><a class="business-primary-cta" href="' + primaryHref + '">' + primaryLabel + ' <span aria-hidden="true">→</span></a><a class="business-secondary-cta" href="#ekosistem">Kenali PLUITS</a></div><div class="business-home-trustline"><span>' + icon('check') + '</span><small>Satu identitas untuk menjelajahi ekosistem PLUITS.</small></div></div>' +
        '<div class="business-home-hero-visual">' + ecosystemOrbit() + '</div>' +
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
        '<div class="business-home-business-visual"><div class="business-business-window"><div class="business-window-top"><span></span><span></span><span></span><small>YOUR BUSINESS, MORE VISIBLE</small></div><div class="business-window-cover"><i></i><b>Bisnis Anda punya cerita.</b></div><div class="business-window-profile"><span>' + icon('store') + '</span><div><b>Profil bisnis</b><small>Produk · Layanan · Cerita</small></div><em>' + icon('check') + '</em></div><div class="business-window-lines"><i></i><i></i><i></i></div></div></div>' +
      '</div><div class="business-owner-grid-wrap">' + businessExperience() + '</div></section>' +
      '<section class="business-home-section business-discovery-section" id="ekosistem">' +
        sectionIntro('LEBIH BANYAK UNTUK DIJELAJAHI','Dari cerita sehari-hari hingga kebutuhan lokal.','PLUITS membuka ruang untuk menemukan hal-hal yang dekat dengan kehidupan: tempat, produk, usaha, komunitas, dan layanan.') +
        discoveryShowcase() +
      '</section>' +
      '<section class="business-home-closing"><div><span class="business-eyebrow">MULAI DARI SINI</span><h2>Temukan ruang Anda di PLUITS.</h2><p>Terhubung sebagai diri sendiri, atau hadirkan bisnis Anda untuk ditemukan lebih banyak orang.</p></div><a class="business-primary-cta" href="' + primaryHref + '">' + primaryLabel + ' <span aria-hidden="true">→</span></a></section>' +
      '<section class="business-app-download" aria-labelledby="business-app-download-title"><div class="business-app-download-copy"><span class="business-eyebrow">PLUITS ON THE GO</span><h2 id="business-app-download-title">Tetap terhubung, di mana pun Anda berada.</h2><p>Aplikasi PLUITS untuk Android dan iOS sedang dalam persiapan. Nantikan kehadirannya.</p></div><div class="business-app-badges"><div class="business-app-badge" aria-label="Google Play untuk Android — Coming Soon"><span class="business-app-icon">' + icon('play') + '</span><span><small>GET IT ON</small><strong>Google Play</strong><em>Coming Soon</em></span></div><div class="business-app-badge" aria-label="App Store untuk iOS — Coming Soon"><span class="business-app-icon">' + icon('grid') + '</span><span><small>DOWNLOAD ON THE</small><strong>App Store</strong><em>Coming Soon</em></span></div></div></section>' +
    '</main>' +
    renderPageFooter({copyright:'© 2026 PLUITS. All rights reserved.',attribution:'One connected digital ecosystem.',groups:[{title:'Jelajahi',items:[{label:'Beranda',route:'home'},{label:'Jelajahi PLUITS',route:'discover'},{label:'Untuk Pengguna',href:'#untuk-pengguna'},{label:'Untuk Pelaku Usaha',href:'#untuk-bisnis'}]},{title:'Ekosistem',items:[{label:'Social',route:'social'},{label:'Discover',route:'discover'},{label:'Marketplace',route:'discover'},{label:'Services',route:'discover'}]},{title:'Akun',items:[{label:'Masuk',route:'login'},{label:'Daftar',route:'register'}]},{title:'Informasi',items:[{label:'Ketentuan Layanan',route:'terms'},{label:'Kebijakan Privasi',route:'privacy'}]}]}) +
  '</div>';
}
