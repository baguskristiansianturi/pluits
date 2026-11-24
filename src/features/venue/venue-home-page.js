import { routeHref } from '../../config/paths.js';
import { renderPageHeader } from '../../design-system/page-shell.js';
import { renderPublicFooter } from '../public-info/public-footer.js';
import { renderIcon } from '../../design-system/icons.js';
import './venue-home-page.css';

const photo=(id,w=720)=>'https://images.unsplash.com/'+id+'?auto=format&fit=crop&w='+w+'&q=74';
const icon=name=>renderIcon(name);
const CATEGORIES=[
 {name:'Restoran',image:'photo-1414235077428-338989a2e8c0'},
 {name:'Kafe & Coffee Shop',image:'photo-1509042239860-f550ce710b93'},
 {name:'Bar & Pub',image:'photo-1514933651103-005eec06c04b'},
 {name:'Nightclub',image:'photo-1571266028243-d220c9c3b4c2'},
 {name:'Beach Club',image:'photo-1510414842594-a61c69b5ae57'},
 {name:'Spa & Wellness',image:'photo-1540555700478-4be289fbecef'},
 {name:'Gym & Fitness',image:'photo-1534438327276-14e5300c3a48'},
 {name:'Sports & Recreation',image:'photo-1517836357463-d25dfeac3438'},
 {name:'Entertainment',image:'photo-1514525253161-7a46d19cd819'},
 {name:'Beauty & Personal Care',image:'photo-1560066984-138dadb4c035'},
 {name:'Coworking & Event Space',image:'photo-1497366754035-f200968a6e72'}
];
const PLACES=[
 // One restaurant profile is currently available in this preview.
 {name:'The Garden Table',type:'RESTAURANT · BRUNCH & DINING',area:'Seminyak',rating:'4.9',reviews:'328',price:'Mulai Rp45.000',image:'photo-1517248135467-4c7edcad34c4',tag:'RESTAURANT PROFILE',isRestaurant:true}
];
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const categoryMarkup=()=>CATEGORIES.map((c,i)=>'<button class="vn-category" type="button" data-category="'+i+'"><span class="vn-category-image"><img src="'+photo(c.image,520)+'" alt="" loading="lazy"><span class="vn-category-label">'+c.name+'</span></span></button>').join('');
const placeCard=(p,i)=>'<article class="vn-place-card">'+(p.isRestaurant?'<a class="vn-place-photo" href="'+routeHref('restaurant')+'"><img src="'+photo(p.image,720)+'" alt="'+esc(p.name)+'" loading="lazy"><span class="vn-place-tag">'+p.tag+'</span></a>':'<div class="vn-place-photo"><img src="'+photo(p.image,720)+'" alt="'+esc(p.name)+'" loading="lazy"><span class="vn-place-tag">'+p.tag+'</span></div>')+'<button class="vn-place-wish" type="button" data-wish="'+i+'" aria-label="Simpan '+esc(p.name)+'">♡</button><div class="vn-place-info"><span class="vn-place-type">'+p.type+'</span><h3>'+(p.isRestaurant?'<a href="'+routeHref('restaurant')+'">'+p.name+'</a>':p.name)+'</h3><p class="vn-place-location">'+icon('mapPin')+' '+p.area+', Bali</p><div class="vn-place-meta"><span>★ '+p.rating+' <small>('+p.reviews+' ulasan)</small></span><b>'+p.price+'</b></div></div></article>';

export function mountVenueHomePage({root,user=null}={}){
 const header=renderPageHeader({brandHref:routeHref('home'),label:'PLUITS',className:'global-header vn-header',rightContent:'<div class="global-header-tools vn-header-tools"><label class="vn-search" aria-label="Cari tempat dan aktivitas">'+icon('search')+'<input id="vn-search" type="search" placeholder="Cari restoran, kafe, hiburan, atau layanan..." autocomplete="off"></label><div class="global-header-actions vn-header-actions"><button type="button" class="global-icon-button" id="vn-saved" aria-label="Tempat tersimpan">'+icon('heart')+'</button><a class="global-icon-button" href="'+routeHref(user?'dashboard':'login')+'" aria-label="Akun">'+icon('user')+'</a></div></div>',dataGlobalHeader:true});
 root.innerHTML='<div class="pl-page-shell vn-page">'+header+
 '<nav class="vn-nav" aria-label="Navigasi Hangout & Leisure"><a href="#vn-categories">Kategori</a><a href="#vn-popular">Pilihan untuk dikunjungi</a><a href="#vn-experiences">Aktivitas</a><a href="#vn-nearby">Di sekitar</a><span class="vn-nav-location">'+icon('mapPin')+' BALI</span></nav>'+
 '<main class="pl-page-main vn-main"><div class="vn-preview-note"><span>HANGOUT & LEISURE</span><p>Temukan restoran, kafe, tempat bersantai, hiburan, dan layanan gaya hidup.</p></div>'+
 '<section class="vn-hero"><div class="vn-hero-copy"><span class="vn-eyebrow">PLUITS · HANGOUT & LEISURE</span><h1>Temukan tempat.<br><em>Rasakan pengalaman.</em></h1><p>Dari tempat makan favorit hingga tempat untuk bersantai, berolahraga, dan menikmati hiburan. Temukan tempat yang sesuai dengan waktumu.</p><a class="vn-dark-button" href="#vn-categories">Jelajahi kategori <span>↗</span></a><div class="vn-hero-index"><b>01</b><span></span><small>DINING · SOCIAL · LEISURE</small></div></div><div class="vn-hero-image"><img src="'+photo('photo-1517248135467-4c7edcad34c4',1440)+'" alt="Suasana restoran dan pengunjung" fetchpriority="high"><div class="vn-hero-image-caption"><span>DISCOVER HANGOUT & LEISURE</span><strong>Good places. Great experiences.</strong></div></div></section>'+
 '<section class="vn-category-section" id="vn-categories"><div class="vn-section-head"><div><span class="vn-eyebrow">EXPLORE HANGOUT & LEISURE</span><h2>Jelajahi Hangout & Leisure</h2><p>Pilih suasana dan layanan yang ingin kamu nikmati.</p></div></div><div class="vn-category-grid">'+categoryMarkup()+'</div></section>'+
 '<section class="vn-feature-banner" id="vn-experiences"><div class="vn-feature-image"><img src="'+photo('photo-1470770841072-f978cf4d019e',1100)+'" alt="Pengalaman aktivitas dan rekreasi" loading="lazy"></div><div class="vn-feature-copy"><span class="vn-eyebrow">MAKE TIME FOR SOMETHING NEW</span><h2>Find your<br>next good time.</h2><p>Aktivitas, hiburan, kelas, dan pengalaman menarik untuk mengisi waktumu.</p><a href="#vn-popular" class="vn-text-link">Temukan pengalaman ↗</a></div></section>'+
 '<section class="vn-place-section" id="vn-popular"><div class="vn-section-head"><div><span class="vn-eyebrow">PLACES TO DISCOVER</span><h2>Pilihan untuk dikunjungi</h2><p>Saat ini, The Garden Table adalah restoran dengan halaman profil lengkap yang dapat dijelajahi.</p></div><a href="#vn-categories">Jelajahi semua <span>↗</span></a></div><div class="vn-place-grid vn-place-grid-single">'+PLACES.map(placeCard).join('')+'</div></section>'+
 '<section class="vn-lifestyle-banner" id="vn-nearby"><div class="vn-lifestyle-copy"><span class="vn-eyebrow">AROUND YOUR AREA</span><h2>Something good<br>is closer than you think.</h2><p>Temukan tempat di sekitar lokasimu dan rencanakan kunjungan dengan lebih mudah.</p><a href="#vn-popular" class="vn-text-link">Jelajahi tempat sekitar ↗</a></div><div class="vn-lifestyle-image"><img src="'+photo('photo-1519608487953-e999c86e7455',1100)+'" alt="Suasana area dan lingkungan sekitar" loading="lazy"></div></section>'+
 ''+
 '<section class="vn-visit-cta"><div><span class="vn-eyebrow">FROM DISCOVERY TO YOUR VISIT</span><h2>Temukan tempatnya.<br>Nikmati waktumu.</h2><p>Lihat informasi, pilih layanan atau aktivitas, lakukan pemesanan, lalu kunjungi tempatnya.</p></div><a class="vn-dark-button" href="#vn-categories">Mulai menjelajah <span>↗</span></a></section></main>'+renderPublicFooter()+'</div>';
 const search=root.querySelector('#vn-search');
 search?.addEventListener('input',()=>{const q=search.value.trim().toLowerCase();root.querySelectorAll('.vn-place-card').forEach(card=>{card.hidden=!!q&&!card.textContent.toLowerCase().includes(q);});});
 root.querySelectorAll('[data-category]').forEach(button=>button.addEventListener('click',()=>{const name=CATEGORIES[Number(button.dataset.category)]?.name||'Pilihan untuk dikunjungi';root.querySelector('#vn-popular h2').textContent=name;root.querySelector('#vn-popular')?.scrollIntoView({behavior:'smooth'});}));
 root.querySelectorAll('[data-wish]').forEach(button=>button.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();button.classList.toggle('is-saved');button.textContent=button.classList.contains('is-saved')?'♥':'♡';}));
 root.querySelector('#vn-saved')?.addEventListener('click',()=>{const n=root.querySelectorAll('.vn-place-wish.is-saved').length;root.querySelector('#vn-popular h2').textContent=n+' tempat tersimpan';root.querySelector('#vn-popular')?.scrollIntoView({behavior:'smooth'});});
}
