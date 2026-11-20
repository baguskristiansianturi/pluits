import { routeHref } from '../../config/paths.js';
import { renderPageHeader } from '../../design-system/page-shell.js';
import { renderPublicFooter } from '../public-info/public-footer.js';
import '../../design-system/page-shell.css';
import './venue-home-page.css';

const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const photo = (id, width=900) => 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=' + width + '&q=82';

const CATEGORIES = [
  { id:'restaurant', title:'Restaurant & Café', eyebrow:'FOOD & BEVERAGE', description:'Kelola meja, menu, pesanan, dapur, reservasi, dan layanan pelanggan.', image:'photo-1414235077428-338989a2e8c0', tags:['Restoran','Kafe','Bakery','Bar'] },
  { id:'fitness', title:'Fitness & Sports', eyebrow:'MOVE & PERFORM', description:'Atur membership, kelas, jadwal pelatih, fasilitas, dan check-in.', image:'photo-1534438327276-14e5300c3a48', tags:['Gym','Yoga','Pilates','Lapangan'] },
  { id:'wellness', title:'Beauty & Wellness', eyebrow:'CARE & WELLBEING', description:'Kelola layanan, staf, appointment, durasi treatment, dan pelanggan.', image:'photo-1560066984-138dadb4c035', tags:['Salon','Barbershop','Spa','Massage'] },
  { id:'activities', title:'Activities & Entertainment', eyebrow:'PLAY & EXPLORE', description:'Atur aktivitas, tiket, sesi, kapasitas, jadwal, dan kunjungan.', image:'photo-1511882150382-421056c89033', tags:['Rekreasi','Karaoke','Playground','Aktivitas'] },
  { id:'spaces', title:'Spaces & Facilities', eyebrow:'SPACE & PLACE', description:'Kelola ruang, fasilitas, ketersediaan, booking, dan penyewaan.', image:'photo-1497366754035-f200968a6e72', tags:['Coworking','Meeting room','Studio','Venue'] },
  { id:'more', title:'Dan berbagai tempat lainnya', eyebrow:'GROW WITH YOUR BUSINESS', description:'Fondasi yang dapat diperluas untuk jenis tempat dan layanan baru.', image:'photo-1497366811353-6870744d04b2', tags:['Studio kreatif','Komunitas','Fasilitas lokal'] }
];

function categoryCards() {
  return CATEGORIES.map((item, index) => '<article class="venue-category-card venue-category-card--' + item.id + '">' +
    '<div class="venue-category-photo"><img src="' + photo(item.image, 900) + '" alt="' + esc(item.title) + '" loading="lazy" decoding="async"><span class="venue-category-index">0' + (index+1) + '</span><span class="venue-category-shade"></span><div class="venue-category-caption"><small>' + item.eyebrow + '</small><h3>' + item.title + '</h3></div></div>' +
    '<div class="venue-category-body"><p>' + item.description + '</p><div class="venue-category-tags">' + item.tags.map(tag => '<span>' + tag + '</span>').join('') + '</div></div></article>').join('');
}

function sharedCore() {
  const items = [
    ['01','Business & Branch','Profil usaha, cabang, lokasi, dan identitas pengelola.'],
    ['02','People & Access','Staf, peran, izin akses, dan pembagian tanggung jawab.'],
    ['03','Schedule & Booking','Jam operasional, kalender, reservasi, antrean, dan check-in.'],
    ['04','Customer & Payment','Pelanggan, transaksi, pembayaran, pembatalan, dan pengembalian dana.'],
    ['05','Engagement','Notifikasi, riwayat kunjungan, loyalitas, dan ulasan terverifikasi.'],
    ['06','Location & Discovery','Koneksi ke Geo Directory agar tempat mudah ditemukan.']
  ];
  return items.map(([n,title,copy]) => '<article class="venue-core-item"><span>' + n + '</span><div><h3>' + title + '</h3><p>' + copy + '</p></div></article>').join('');
}

export function mountVenueHomePage({root,user=null}={}) {
  const authAction = user
    ? '<a class="venue-header-action" href="' + routeHref('dashboard') + '">Dashboard</a>'
    : '<div class="venue-header-actions"><a href="' + routeHref('login') + '">Masuk</a><a class="venue-header-action" href="' + routeHref('register') + '">Daftar</a></div>';
  const primaryHref = routeHref(user ? 'dashboard' : 'register');
  root.innerHTML = '<div class="pl-page-shell venue-home">' +
    renderPageHeader({variant:'venue-home',brandHref:routeHref('home'),label:'PLUITS — Venue & Service Operations',rightContent:'<nav class="venue-nav" aria-label="Navigasi Venue & Service Operations"><a href="#venue-categories">Kategori</a><a href="#venue-core">Fondasi bersama</a><a href="#venue-modules">Cara kerja</a></nav>' + authAction}) +
    '<main class="pl-page-main venue-main">' +
      '<section class="venue-hero">' +
        '<div class="venue-hero-copy"><span class="venue-eyebrow">PLUITS · VENUE & SERVICE OPERATIONS</span><h1>Tempat usaha berjalan lebih <em>terhubung.</em></h1><p>Satu ekosistem untuk membantu bisnis berbasis tempat dan layanan mengelola operasionalnya—dari restoran dan gym hingga salon, aktivitas, dan ruang sewa.</p><div class="venue-hero-actions"><a class="venue-primary-button" href="#venue-categories">Jelajahi kategori <span>→</span></a><a class="venue-text-link" href="#venue-core">Kenali fondasinya</a></div><div class="venue-hero-note"><span></span>Fondasi bersama, modul operasional sesuai kebutuhan setiap bisnis.</div></div>' +
        '<div class="venue-hero-visual"><img src="' + photo('photo-1517248135467-4c7edcad34c4',1200) + '" alt="Interior restoran dengan meja makan yang tertata" fetchpriority="high"><div class="venue-hero-visual-overlay"></div><div class="venue-hero-visual-caption"><small>ONE CONNECTED OPERATIONS ECOSYSTEM</small><strong>Setiap tempat punya cara kerja. Sistemnya harus memahami itu.</strong></div><div class="venue-hero-stamp"><span>PLUITS</span><b>VENUE<br>& SERVICE</b></div></div>' +
      '</section>' +
      '<section class="venue-intro-band"><span>BUKAN MARKETPLACE.</span><p>Ini adalah sistem operasional di balik bisnis fisik—sementara Marketplace menjadi tempat pelanggan menemukan dan bertransaksi dengan bisnis tersebut.</p></section>' +
      '<section class="venue-section" id="venue-categories"><div class="venue-section-heading"><div><span class="venue-eyebrow">EXPLORE BUSINESS TYPES</span><h2>Satu ekosistem.<br><em>Beragam jenis tempat.</em></h2></div><p>Setiap kategori memiliki kebutuhan operasional yang berbeda. Karena itu, setiap modul dirancang sesuai karakter bisnisnya, bukan dipaksa memakai satu alur yang sama.</p></div><div class="venue-category-grid">' + categoryCards() + '</div></section>' +
      '<section class="venue-core-section" id="venue-core"><div class="venue-core-heading"><span class="venue-eyebrow">SHARED FOUNDATION</span><h2>Fondasi yang sama.<br><em>Operasional yang tetap spesifik.</em></h2><p>Bagian yang memang bisa digunakan bersama dibangun sebagai fondasi. Kebutuhan khusus setiap industri tetap berada di modul masing-masing.</p></div><div class="venue-core-grid">' + sharedCore() + '</div></section>' +
      '<section class="venue-modules-section" id="venue-modules"><div class="venue-modules-copy"><span class="venue-eyebrow">CONNECTED, NOT COMBINED</span><h2>Terhubung dengan ekosistem PLUITS lainnya.</h2><p>Tempat usaha mengelola operasionalnya di modul masing-masing. Geo Directory menyediakan identitas lokasi, sedangkan Marketplace membantu pelanggan menemukan dan membeli produk atau layanan yang tersedia.</p><div class="venue-connection-list"><div><b>Venue & Service Operations</b><span>Operasional bisnis fisik</span></div><div><b>Geo Directory</b><span>Identitas dan lokasi tempat</span></div><div><b>Marketplace</b><span>Discovery dan transaksi lintas bisnis</span></div><div><b>PLUITS Social</b><span>Akun personal, interaksi, dan komunitas</span></div></div></div><div class="venue-modules-visual"><div class="venue-ecosystem-center"><span>PLUITS</span><b>CONNECTED<br>ECOSYSTEM</b></div><div class="venue-ecosystem-node venue-node-top">Venue & Service</div><div class="venue-ecosystem-node venue-node-right">Marketplace</div><div class="venue-ecosystem-node venue-node-bottom">Geo Directory</div><div class="venue-ecosystem-node venue-node-left">Social</div></div></section>' +
      '<section class="venue-closing"><div><span class="venue-eyebrow">BUILT AROUND YOUR BUSINESS</span><h2>Operasional yang sesuai dengan cara bisnis Anda bekerja.</h2><p>Mulai dari satu kategori, lalu berkembang ke lebih banyak jenis layanan dengan fondasi yang konsisten.</p></div><a href="' + primaryHref + '" class="venue-primary-button">' + (user ? 'Buka Dashboard' : 'Mulai bersama PLUITS') + ' <span>→</span></a></section>' +
    '</main>' + renderPublicFooter() + '</div>';
}
