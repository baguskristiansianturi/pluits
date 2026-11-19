import { routeHref } from '../../config/paths.js';
import { assetUrl } from '../../config/runtime.js';
import '../../design-system/page-shell.css';
import { renderBrand, renderPageFooter } from '../../design-system/page-shell.js';
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


function paymentExperience() {
  const methods = [
    ['grid','QRIS','Satu kode untuk berbagai aplikasi mobile banking dan dompet digital.','Pembayaran praktis'],
    ['briefcase','Transfer bank & Virtual Account','Pilihan transfer dari bank-bank besar di Indonesia.','BCA · BNI · BRI · Mandiri · BSI'],
    ['message','Dompet digital','Bayar langsung melalui aplikasi pembayaran pilihan pelanggan.','GoPay · OVO · DANA · ShopeePay · LinkAja'],
    ['lock','Kartu debit & kredit','Pilihan kartu untuk pelanggan lokal maupun internasional.','Visa · Mastercard · JCB · American Express'],
    ['store','Gerai pembayaran','Pilihan pembayaran tunai melalui jaringan gerai ritel.','Alfamart · Indomaret'],
    ['check','PayLater & cicilan','Pilihan pembayaran bertahap dari penyedia yang mendukung.','Kredivo · Akulaku · Indodana'],
    ['user','Debit langsung','Pembayaran langsung dari rekening bank, jika tersedia.','Mengikuti dukungan mitra']
  ];
  return '<section class="business-payment-showcase" aria-labelledby="business-payment-title">' +
    '<div class="business-payment-heading"><div><span class="business-eyebrow">PEMBAYARAN UNTUK BISNIS</span><h3 id="business-payment-title">Berikan pelanggan lebih banyak cara untuk membayar.</h3><p>Mulai dari QRIS hingga kartu dan dompet digital, pilihan pembayaran dirancang agar pelanggan dapat memilih cara yang paling nyaman.</p></div><span class="business-payment-note">DIRANCANG UNTUK INDONESIA</span></div>' +
    '<div class="business-payment-grid">' + methods.map(([symbol,title,copy,examples]) =>
      '<article class="business-payment-card"><span class="business-payment-icon">' + icon(symbol) + '</span><div><h4>' + title + '</h4><p>' + copy + '</p><small>' + examples + '</small></div></article>'
    ).join('') + '</div>' +
    '<div class="business-payment-trust"><div class="business-payment-trust-icon">' + icon('lock') + '</div><div><span class="business-card-overline">TRANSAKSI LEBIH TENANG</span><h4>Pembayaran melalui mitra tepercaya. Lebih jelas bagi kedua pihak.</h4><p>PLUITS merencanakan penggunaan payment gateway pihak ketiga untuk menjadi perantara pembayaran antara pelanggan dan bisnis. Mitra pembayaran membantu memproses transaksi dan mengirimkan konfirmasi, sementara PLUITS membantu pelanggan dan pemilik usaha mengikuti status pesanan dengan lebih jelas.</p><p class="business-payment-disclaimer">Pilihan dan ketersediaan metode mengikuti mitra pembayaran, jenis usaha, serta proses aktivasi. Fitur pembayaran ini belum aktif dan belum terhubung ke penyedia pembayaran.</p></div></div>' +
    '</section>';
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

  root.innerHTML = '<div class="pl-page-shell business-home">' +
    '<header class="pl-page-header business-home-header">' + renderBrand({href:routeHref('home'),label:'PLUITS — Beranda'}) +
      '<nav class="business-home-nav" aria-label="Navigasi homepage"><a href="#untuk-pengguna">Untuk Pengguna</a><a href="#untuk-bisnis">Untuk Bisnis</a><a href="#ekosistem">Jelajahi</a></nav>' + headerAction +
    '</header>' +
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
      '</div><div class="business-owner-grid-wrap">' + businessExperience() + '</div>' + paymentExperience() + '</section>' +
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
