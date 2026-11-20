import { routeHref } from '../../config/paths.js';
import { renderPageHeader } from '../../design-system/page-shell.js';
import { renderPublicFooter } from '../public-info/public-footer.js';
import '../../design-system/page-shell.css';
import './venue-home-page.css';

const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const photo = (id, width=900) => 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=' + width + '&q=82';

const CATEGORIES = [
  {id:'food',title:'Restoran & Kafe',sub:'Makan, minum, dan berkumpul',image:'photo-1414235077428-338989a2e8c0',count:'Temukan tempat makan',filter:'restaurant'},
  {id:'beauty',title:'Beauty & Wellness',sub:'Rawat diri dan relaksasi',image:'photo-1560066984-138dadb4c035',count:'Salon, spa, dan perawatan',filter:'wellness'},
  {id:'fitness',title:'Fitness & Sports',sub:'Bergerak dan tetap aktif',image:'photo-1534438327276-14e5300c3a48',count:'Gym, kelas, dan lapangan',filter:'fitness'},
  {id:'activity',title:'Aktivitas & Hiburan',sub:'Isi waktu dengan pengalaman',image:'photo-1511882150382-421056c89033',count:'Aktivitas dan tiket',filter:'activities'},
  {id:'spaces',title:'Tempat & Ruang',sub:'Temukan ruang sesuai kebutuhan',image:'photo-1497366754035-f200968a6e72',count:'Studio, coworking, dan venue',filter:'spaces'}
];

const PLACES = [
  {name:'The Garden Table',type:'Restaurant · Brunch & Dining',area:'Seminyak, Bali',rating:'4.9',reviews:'328 ulasan',price:'Mulai Rp45.000',image:'photo-1517248135467-4c7edcad34c4',tag:'Pilihan populer'},
  {name:'Kalyana Wellness',type:'Spa · Massage & Treatment',area:'Canggu, Bali',rating:'4.8',reviews:'186 ulasan',price:'Mulai Rp150.000',image:'photo-1540555700478-4be289fbecef',tag:'Banyak dipesan'},
  {name:'Northside Studio',type:'Fitness · Gym & Classes',area:'Denpasar, Bali',rating:'4.9',reviews:'94 ulasan',price:'Kelas mulai Rp60.000',image:'photo-1534438327276-14e5300c3a48',tag:'Kelas tersedia'}
];

function categoryCards(){
  return CATEGORIES.map((item,index)=>'<a class="venue-discovery-category" href="#venue-results" data-category="'+item.filter+'"><div class="venue-discovery-category-image"><img src="'+photo(item.image,700)+'" alt="'+esc(item.title)+'" loading="lazy"><span>0'+(index+1)+'</span></div><div class="venue-discovery-category-copy"><h3>'+item.title+'</h3><p>'+item.sub+'</p></div></a>').join('');
}
function placeCards(){
  return PLACES.map((item,index)=>'<article class="venue-place-card"><a class="venue-place-image" href="'+routeHref('marketplace')+'"><img src="'+photo(item.image,850)+'" alt="'+esc(item.name)+'" loading="lazy"><span class="venue-place-tag">'+item.tag+'</span><button class="venue-favorite" type="button" aria-label="Simpan '+esc(item.name)+'" data-favorite="'+index+'">♡</button></a><div class="venue-place-info"><div class="venue-place-type">'+item.type+'</div><h3><a href="'+routeHref('marketplace')+'">'+item.name+'</a></h3><p class="venue-place-area"><span>⌖</span> '+item.area+'</p><div class="venue-place-meta"><span>★ '+item.rating+' <small>('+item.reviews+')</small></span><b>'+item.price+'</b></div><a class="venue-place-action" href="'+routeHref('marketplace')+'">Lihat tempat <span>→</span></a></div></article>').join('');
}

export function mountVenueHomePage({root,user=null}={}){
  const authAction=user
    ? '<a class="venue-user-link" href="'+routeHref('dashboard')+'">Akun saya</a>'
    : '<div class="venue-user-actions"><a href="'+routeHref('login')+'">Masuk</a><a class="venue-user-signup" href="'+routeHref('register')+'">Daftar</a></div>';
  root.innerHTML='<div class="pl-page-shell venue-home">'+
    renderPageHeader({variant:'venue-home',brandHref:routeHref('home'),label:'PLUITS',rightContent:'<nav class="venue-nav" aria-label="Navigasi"><a href="#venue-categories">Kategori</a><a href="#venue-results">Tempat pilihan</a><a href="#venue-how">Cara menggunakan</a></nav>'+authAction})+
    '<main class="pl-page-main venue-main">'+
      '<section class="venue-discovery-hero"><div class="venue-hero-copy"><span class="venue-eyebrow">TEMUKAN PENGALAMAN DI SEKITARMU</span><h1>Ada tempat menarik untuk <em>kamu temukan.</em></h1><p>Jelajahi restoran, kafe, salon, tempat olahraga, aktivitas, dan berbagai layanan. Temukan tempatnya, pesan yang kamu butuhkan, lalu nikmati pengalamannya.</p><form class="venue-search" id="venue-search"><span>⌕</span><input type="search" aria-label="Cari tempat atau aktivitas" placeholder="Cari restoran, salon, gym, aktivitas..."><button type="submit">Cari</button></form><div class="venue-location-note"><span>⌖</span> Jelajahi tempat berdasarkan lokasi dan kebutuhanmu</div></div><div class="venue-hero-photo"><img src="'+photo('photo-1517248135467-4c7edcad34c4',1300)+'" alt="Suasana pengunjung menikmati restoran" fetchpriority="high"><div class="venue-hero-photo-caption"><span>YOUR NEXT EXPERIENCE</span><strong>Temukan tempat. Buat rencana. Nikmati waktumu.</strong></div></div></section>'+
      '<section class="venue-category-section" id="venue-categories"><div class="venue-section-title"><div><span class="venue-eyebrow">JELAJAHI BERDASARKAN KATEGORI</span><h2>Mau ke mana hari ini?</h2></div><a href="#venue-results">Jelajahi semua <span>→</span></a></div><div class="venue-category-row">'+categoryCards()+'</div></section>'+
      '<section class="venue-featured-section" id="venue-results"><div class="venue-section-title"><div><span class="venue-eyebrow">TEMPAT UNTUK KAMU</span><h2>Temukan tempat menarik</h2><p>Inspirasi tempat dan layanan untuk pengalaman berikutnya.</p></div><a href="'+routeHref('marketplace')+'">Lihat semua tempat <span>→</span></a></div><div class="venue-place-grid">'+placeCards()+'</div></section>'+
      '<section class="venue-how-section" id="venue-how"><div class="venue-how-heading"><span class="venue-eyebrow">DARI MENEMUKAN SAMPAI BERKUNJUNG</span><h2>Semua pengalaman,<br><em>lebih mudah dalam satu tempat.</em></h2><p>PLUITS menghubungkan perjalananmu dari mencari tempat sampai menikmati layanan yang tersedia.</p></div><div class="venue-how-steps"><article><span>01</span><div class="venue-step-icon">⌕</div><h3>Temukan</h3><p>Cari tempat berdasarkan kategori, lokasi, kebutuhan, dan ulasan pengunjung.</p></article><article><span>02</span><div class="venue-step-icon">▤</div><h3>Pilih & pesan</h3><p>Lihat foto, layanan, menu, harga, jadwal, lalu reservasi atau lakukan pemesanan.</p></article><article><span>03</span><div class="venue-step-icon">⌖</div><h3>Kunjungi</h3><p>Dapatkan informasi lokasi, datang ke tempat, check-in, dan gunakan layananmu.</p></article><article><span>04</span><div class="venue-step-icon">☆</div><h3>Bagikan pengalaman</h3><p>Tulis ulasan, simpan tempat favorit, dan temukan rekomendasi berikutnya.</p></article></div></section>'+
      '<section class="venue-experience-banner"><div><span class="venue-eyebrow">YOUR CITY, YOUR EXPERIENCE</span><h2>Tempat berikutnya yang ingin kamu kunjungi?</h2><p>Mulai jelajahi berbagai tempat dan pengalaman di PLUITS.</p></div><a href="#venue-categories" class="venue-explore-button">Mulai menjelajah <span>→</span></a></section>'+
    '</main>'+renderPublicFooter()+'</div>';
  const search=root.querySelector('#venue-search');
  search?.addEventListener('submit',(event)=>{event.preventDefault();const query=search.querySelector('input')?.value?.trim();if(query){const target=root.querySelector('#venue-results');target?.scrollIntoView({behavior:'smooth',block:'start'});const heading=target?.querySelector('h2');if(heading)heading.textContent='Hasil jelajah untuk “'+query+'”';}});
  root.querySelectorAll('[data-category]').forEach(link=>link.addEventListener('click',()=>{const heading=root.querySelector('#venue-results h2');if(heading)heading.textContent='Jelajahi '+(CATEGORIES.find(item=>item.filter===link.dataset.category)?.title||'tempat pilihan');}));
  root.querySelectorAll('[data-favorite]').forEach(button=>button.addEventListener('click',(event)=>{event.preventDefault();event.stopPropagation();const active=button.classList.toggle('is-saved');button.textContent=active?'♥':'♡';button.setAttribute('aria-pressed',String(active));}));
}
