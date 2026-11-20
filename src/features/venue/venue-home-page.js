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
 {name:'The Garden Table',type:'RESTAURANT · BRUNCH & DINING',area:'Seminyak',rating:'4.9',reviews:'328',price:'Mulai Rp45.000',image:'photo-1517248135467-4c7edcad34c4',tag:'POPULAR',isRestaurant:true},
 {name:'Sunday Coffee House',type:'CAFE · COFFEE & BAKERY',area:'Canggu',rating:'4.8',reviews:'214',price:'Mulai Rp28.000',image:'photo-1509042239860-f550ce710b93',tag:'COFFEE'},
 {name:'Coastline Social Club',type:'BEACH CLUB · LOUNGE & SOCIAL',area:'Berawa',rating:'4.8',reviews:'176',price:'Lounge & day pass',image:'photo-1510414842594-a61c69b5ae57',tag:'SOCIAL'}
];
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const categoryMarkup=()=>CATEGORIES.map((c,i)=>'<button class="vn-category" type="button" data-category="'+i+'"><span class="vn-category-image"><img src="'+photo(c.image,520)+'" alt="" loading="lazy"><span class="vn-category-label">'+c.name+'</span></span></button>').join('');
const placeCard=(p,i)=>'<article class="vn-place-card">'+(p.isRestaurant?'<a class="vn-place-photo" href="#/restaurant"><img src="'+photo(p.image,720)+'" alt="'+esc(p.name)+'" loading="lazy"><span class="vn-place-tag">'+p.tag+'</span></a>':'<div class="vn-place-photo"><img src="'+photo(p.image,720)+'" alt="'+esc(p.name)+'" loading="lazy"><span class="vn-place-tag">'+p.tag+'</span></div>')+'<button class="vn-place-wish" type="button" data-wish="'+i+'" aria-label="Simpan '+esc(p.name)+'">♡</button><div class="vn-place-info"><span class="vn-place-type">'+p.type+'</span><h3>'+(p.isRestaurant?'<a href="#/restaurant">'+p.name+'</a>':p.name)+'</h3><p class="vn-place-location">'+icon('mapPin')+' '+p.area+', Bali</p><div class="vn-place-meta"><span>★ '+p.rating+' <small>('+p.reviews+' ulasan)</small></span><b>'+p.price+'</b></div></div></article>';
