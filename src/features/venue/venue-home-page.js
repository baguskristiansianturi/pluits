import { routeHref } from '../../config/paths.js';
import { renderPageHeader } from '../../design-system/page-shell.js';
import { renderPublicFooter } from '../public-info/public-footer.js';
import { renderIcon } from '../../design-system/icons.js';
import './venue-home-page.css';
const photo=(id,w=720)=>'https://images.unsplash.com/'+id+'?auto=format&fit=crop&w='+w+'&q=74';
const icon=name=>renderIcon(name);
const CATEGORIES=[
 {name:'Restoran & Kafe',image:'photo-1414235077428-338989a2e8c0'},
 {name:'Fitness & Sports',image:'photo-1534438327276-14e5300c3a48'},
 {name:'Beauty & Wellness',image:'photo-1560066984-138dadb4c035'},
 {name:'Aktivitas & Hiburan',image:'photo-1511882150382-421056c89033'},
 {name:'Tempat & Ruang',image:'photo-1497366754035-f200968a6e72'},
 {name:'Wisata & Atraksi',image:'photo-1530789253388-582c481c54b0'}
];
const PLACES=[
 {name:'The Garden Table',type:'RESTAURANT · BRUNCH & DINING',area:'Seminyak',rating:'4.9',reviews:'328',price:'Mulai Rp45.000',image:'photo-1517248135467-4c7edcad34c4',tag:'POPULAR'},
 {name:'Kalyana Wellness',type:'SPA · MASSAGE & TREATMENT',area:'Canggu',rating:'4.8',reviews:'186',price:'Mulai Rp150.000',image:'photo-1540555700478-4be289fbecef',tag:'WELLNESS'},
 {name:'Northside Studio',type:'FITNESS · GYM & CLASSES',area:'Denpasar',rating:'4.9',reviews:'94',price:'Kelas mulai Rp60.000',image:'photo-1534438327276-14e5300c3a48',tag:'CLASSES'},
 {name:'Ubud Nature Escape',type:'ACTIVITY · OUTDOOR EXPERIENCE',area:'Ubud',rating:'4.9',reviews:'212',price:'Mulai Rp120.000',image:'photo-1470770841072-f978cf4d019e',tag:'EXPERIENCE'}
];
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const categoryMarkup=()=>CATEGORIES.map((c,i)=>'<button class="vn-category" type="button" data-category="'+i+'"><span class="vn-category-image"><img src="'+photo(c.image,520)+'" alt="" loading="lazy"><span class="vn-category-label">'+c.name+'</span></span></button>').join('');
const placeCard=(p,i)=>'<article class="vn-place-card"><a class="vn-place-photo" href="#/venue-place?id='+i+'"><img src="'+photo(p.image,720)+'" alt="'+esc(p.name)+'" loading="lazy"><span class="vn-place-tag">'+p.tag+'</span><button class="vn-place-wish" type="button" data-wish="'+i+'" aria-label="Simpan '+esc(p.name)+'">♡</button></a><div class="vn-place-info"><span class="vn-place-type">'+p.type+'</span><h3><a href="#/venue-place?id='+i+'">'+p.name+'</a></h3><p class="vn-place-location">'+icon('mapPin')+' '+p.area+', Bali</p><div class="vn-place-meta"><span>★ '+p.rating+' <small>('+p.reviews+' ulasan)</small></span><b>'+p.price+'</b></div></div></article>';
export function mountVenueHomePage({root,user=null}={}){
 const header=renderPageHeader({brandHref:routeHref('home'),label:'PLUITS',className:'global-header vn-header',rightContent:'<div class="global-header-tools vn-header-tools"><label class="vn-search" aria-label="Cari tempat dan aktivitas">'+icon('search')+'<input id="vn-search" type="search" placeholder="Cari tempat, aktivitas, atau layanan..." autocomplete="off"></label><div class="global-header-actions vn-header-actions"><button type="button" class="global-icon-button" id="vn-saved" aria-label="Tempat tersimpan">'+icon('heart')+'</button><a class="global-icon-button" href="'+routeHref(user?'dashboard':'login')+'" aria-label="Akun">'+icon('user')+'</a></div></div>',dataGlobalHeader:true});
 root.innerHTML='<div class="pl-page-shell vn-page">'+header+
 '<nav class="vn-nav" aria-label="Navigasi Venue"><a href="#vn-categories">Kategori</a><a href="#vn-popular">Tempat pilihan</a><a href="#vn-experiences">Aktivitas</a><a href="#vn-nearby">Di sekitar</a><span class="vn-nav-location">'+icon('mapPin')+' BALI</span></nav>'+
 '<main class="pl-page-main vn-main"><div class="vn-preview-note"><span>DISCOVER PLACES</span><p>Jelajahi tempat, layanan, dan pengalaman di sekitarmu.</p></div>'+
 '<section class="vn-hero"><div class="vn-hero-copy"><span class="vn-eyebrow">PLUITS · PLACES & EXPERIENCES</span><h1>Temukan tempat.<br><em>Rasakan pengalaman.</em></h1><p>Dari tempat makan favorit hingga aktivitas baru. Temukan tempat menarik, lihat apa yang tersedia, lalu rencanakan kunjunganmu.</p><a class="vn-dark-button" href="#vn-categories">Jelajahi tempat <span>↗</span></a><div class="vn-hero-index"><b>01</b><span></span><small>PLACES · SERVICES · EXPERIENCES</small></div></div><div class="vn-hero-image"><img src="'+photo('photo-1517248135467-4c7edcad34c4',1440)+'" alt="Suasana restoran dan pengunjung" fetchpriority="high"><div class="vn-hero-image-caption"><span>DISCOVER YOUR NEXT PLACE</span><strong>Good places. Great experiences.</strong></div></div></section>'+
 '<section class="vn-category-section" id="vn-categories"><div class="vn-section-head"><div><span class="vn-eyebrow">EXPLORE PLACES</span><h2>Jelajahi kategori</h2><p>Temukan tempat berdasarkan hal yang ingin kamu lakukan.</p></div></div><div class="vn-category-grid">'+categoryMarkup()+'</div></section>'+
 '<section class="vn-feature-banner" id="vn-experiences"><div class="vn-feature-image"><img src="'+photo('photo-1470770841072-f978cf4d019e',1100)+'" alt="Pengalaman menjelajahi alam Bali" loading="lazy"></div><div class="vn-feature-copy"><span class="vn-eyebrow">MAKE TIME FOR SOMETHING NEW</span><h2>Find your<br>next experience.</h2><p>Aktivitas, atraksi, kelas, dan pengalaman menarik untuk mengisi waktumu.</p><a href="#vn-popular" class="vn-text-link">Temukan pengalaman ↗</a></div></section>'+
 '<section class="vn-place-section" id="vn-popular"><div class="vn-section-head"><div><span class="vn-eyebrow">PLACES TO KNOW</span><h2>Tempat pilihan</h2><p>Inspirasi tempat yang bisa kamu kunjungi berikutnya.</p></div><a href="#vn-categories">Jelajahi semua <span>↗</span></a></div><div class="vn-place-grid">'+PLACES.slice(0,3).map(placeCard).join('')+'</div></section>'+
 '<section class="vn-lifestyle-banner" id="vn-nearby"><div class="vn-lifestyle-copy"><span class="vn-eyebrow">AROUND YOUR AREA</span><h2>Something good<br>is closer than you think.</h2><p>Temukan tempat di sekitar lokasimu dan rencanakan kunjungan dengan lebih mudah.</p><a href="#vn-popular" class="vn-text-link">Jelajahi tempat sekitar ↗</a></div><div class="vn-lifestyle-image"><img src="'+photo('photo-1519608487953-e999c86e7455',1100)+'" alt="Suasana destinasi dan lingkungan sekitar" loading="lazy"></div></section>'+
 '<section class="vn-place-section vn-more-places"><div class="vn-section-head"><div><span class="vn-eyebrow">MORE TO EXPLORE</span><h2>Lebih banyak untuk dikunjungi</h2></div></div><div class="vn-place-grid vn-place-grid-four">'+PLACES.map(placeCard).join('')+'</div></section>'+
 '<section class="vn-visit-cta"><div><span class="vn-eyebrow">FROM DISCOVERY TO YOUR VISIT</span><h2>Temukan tempatnya.<br>Jalani pengalamannya.</h2><p>Lihat informasi, pilih layanan atau aktivitas, lakukan pemesanan, lalu kunjungi tempatnya.</p></div><a class="vn-dark-button" href="#vn-categories">Mulai menjelajah <span>↗</span></a></section></main>'+renderPublicFooter()+'</div>';
 const search=root.querySelector('#vn-search');
 search?.addEventListener('input',()=>{const q=search.value.trim().toLowerCase();root.querySelectorAll('.vn-place-card').forEach(card=>{card.hidden=!!q&&!card.textContent.toLowerCase().includes(q);});});
 root.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>{const name=CATEGORIES[Number(button.dataset.category)]?.name||'Tempat pilihan';root.querySelector('#vn-popular h2').textContent=name;root.querySelector('#vn-popular')?.scrollIntoView({behavior:'smooth'});}));
 root.querySelectorAll('[data-wish]').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();button.classList.toggle('is-saved');button.textContent=button.classList.contains('is-saved')?'♥':'♡';}));
 root.querySelector('#vn-saved')?.addEventListener('click',()=>{const n=root.querySelectorAll('.vn-place-wish.is-saved').length;root.querySelector('#vn-popular h2').textContent=n+' tempat tersimpan';root.querySelector('#vn-popular')?.scrollIntoView({behavior:'smooth'});});
}
