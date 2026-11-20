import { routeHref } from '../../config/paths.js';
import { renderPageHeader } from '../../design-system/page-shell.js';
import { renderPublicFooter } from '../public-info/public-footer.js';
import { renderIcon } from '../../design-system/icons.js';

const image = (id, width=720) => 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=' + width + '&q=74';
export const PRODUCTS = [
  {id:1,name:'Relaxed Linen Shirt',category:'Fashion',price:385000,old:485000,store:'Sundays Studio',area:'Seminyak',tag:'WARDROBE EDIT',image:'photo-1598033129183-c4f50c736f10'},
  {id:2,name:'Everyday Canvas Tote',category:'Fashion',price:245000,old:320000,store:'Common Ground',area:'Canggu',tag:'EVERYDAY',image:'photo-1590874103328-eac38a683ce7'},
  {id:3,name:'Minimal Leather Sandals',category:'Fashion',price:429000,old:560000,store:'Sundays Studio',area:'Seminyak',tag:'LOCAL FIND',image:'photo-1543163521-1bf539c55dd2'},
  {id:4,name:'Cotton Weekend Set',category:'Fashion',price:520000,old:650000,store:'The Linen Room',area:'Denpasar',tag:'NEW ARRIVAL',image:'photo-1483985988355-763728e1935b'},
  {id:5,name:'Handwoven Table Runner',category:'Lifestyle & Living',price:275000,old:350000,store:'Ruang Rupa Living',area:'Ubud',tag:'HANDCRAFTED',image:'photo-1600210492486-724fe5c67fb0'},
  {id:6,name:'Ceramic Everyday Cup',category:'Lifestyle & Living',price:145000,old:185000,store:'Ruang Rupa Living',area:'Ubud',tag:'MADE WITH CARE',image:'photo-1493106641515-6b5631de4bb9'},
  {id:7,name:'Natural Home Fragrance',category:'Lifestyle & Living',price:189000,old:245000,store:'Scent & Form',area:'Sanur',tag:'HOME RITUAL',image:'photo-1602874801007-bd458bb1b8b6'},
  {id:8,name:'Woven Market Basket',category:'Lifestyle & Living',price:315000,old:395000,store:'Ruang Rupa Living',area:'Ubud',tag:'LOCAL CRAFT',image:'photo-1590736969955-71cc94901144'}
];
const CATEGORIES = [
  {name:'Pakaian Wanita',parent:'Fashion',image:'photo-1483985988355-763728e1935b'},
  {name:'Pakaian Pria',parent:'Fashion',image:'photo-1515886657613-9f3515b0c78f'},
  {name:'Modest Fashion',parent:'Fashion',image:'photo-1539109136881-3be0616acf4b'},
  {name:'Sepatu & Sandal',parent:'Fashion',image:'photo-1543163521-1bf539c55dd2'},
  {name:'Tas & Aksesori',parent:'Fashion',image:'photo-1590874103328-eac38a683ce7'},
  {name:'Home & Living',parent:'Lifestyle & Living',image:'photo-1600210492486-724fe5c67fb0'},
  {name:'Dekorasi Rumah',parent:'Lifestyle & Living',image:'photo-1616486338812-3dadae4b4ace'},
  {name:'Produk Lokal',parent:'Lifestyle & Living',image:'photo-1603006905003-be475563bc59'}
];
const money = value => new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(value);
const esc = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icon = name => renderIcon(name);
const productCard = p => '<article class="mk-product" data-product="' + p.id + '"><div class="mk-product-media"><a class="mk-product-open" href="#/product?id=' + p.id + '" aria-label="Lihat detail ' + esc(p.name) + '"><img src="' + image(p.image,560) + '" alt="' + esc(p.name) + '" loading="lazy" decoding="async"><span class="mk-product-tag">' + esc(p.tag) + '</span></a><button class="mk-wish" type="button" aria-label="Simpan ' + esc(p.name) + '" aria-pressed="false">' + icon('heart') + '</button><button class="mk-quick-add" type="button" data-add="' + p.id + '">Tambah ke keranjang</button></div><div class="mk-product-info"><a class="mk-product-open" href="#/product?id=' + p.id + '"><span class="mk-product-category">' + esc(p.category) + '</span><h3>' + esc(p.name) + '</h3></a><div class="mk-price-row"><strong>' + money(p.price) + '</strong><del>' + money(p.old) + '</del></div><div class="mk-product-meta"><span>' + esc(p.store) + '</span><span>' + esc(p.area) + ', Bali</span></div></div></article>;
const sectionHead = (eyebrow,title,copy='',href='#koleksi') => '<div class="mk-section-head"><div><span class="mk-eyebrow">' + eyebrow + '</span><h2>' + title + '</h2>' + (copy?'<p>'+copy+'</p>':'') + '</div><a href="' + href + '">Jelajahi <span aria-hidden="true">↗</span></a></div>';

export function mountMarketplaceHomePage({root,user=null}={}) {
  let activeCategory='Semua', query='', cart=0;
  const saved = new Set();
  const categoryMarkup = CATEGORIES.map(c=>'<button class="mk-category" type="button" data-category="' + esc(c.parent) + '" aria-label="Jelajahi ' + esc(c.name) + '"><span class="mk-category-image"><img src="' + image(c.image,320) + '" alt="" loading="lazy" decoding="async"></span><span>' + esc(c.name) + '</span></button>').join('');
  const hero = '<section class="mk-hero"><div class="mk-hero-copy"><span class="mk-eyebrow">PLUITS MARKETPLACE · BALI EDITION</span><h1>Temukan gaya.<br><em>Temukan tempat.</em></h1><p>Jelajahi pilihan fashion dan lifestyle dari toko-toko lokal. Kenali produknya, temukan tokonya, lalu kunjungi langsung.</p><a class="mk-dark-button" href="#kategori">Jelajahi pilihan <span>↗</span></a><div class="mk-hero-index"><b>01</b><span></span><small>LOCAL STORES · GOOD FINDS</small></div></div><div class="mk-hero-image"><img src="' + image('photo-1529139574466-a303027c1d8b',1440) + '" alt="Editorial fashion collection" fetchpriority="high"><div class="mk-hero-image-caption"><span>FASHION & LIFESTYLE</span><strong>Made for everyday.</strong></div></div></section>';
  const categories = '<section class="mk-category-section" id="kategori"><div class="mk-section-head"><div><span class="mk-eyebrow">EXPLORE THE EDIT</span><h2>Jelajahi kategori</h2><p>Pilihan yang dekat dengan gaya dan keseharian Anda.</p></div></div><div class="mk-category-grid">' + categoryMarkup + '</div></section>';
  const feature = '<section class="mk-feature-banner"><div class="mk-feature-image"><img src="' + image('photo-1490481651871-ab68de25d43d',1100) + '" alt="Pilihan fashion untuk keseharian" loading="lazy"></div><div class="mk-feature-copy"><span class="mk-eyebrow">FASHION, WITH A LOCAL POINT OF VIEW</span><h2>Find your<br>everyday favourite.</h2><p>Dari butik, modest wear, hingga label lokal — temukan koleksi dan toko di balik setiap pilihan.</p><a href="#fashion" class="mk-text-link">Jelajahi fashion ↗</a></div></section>';
  const lifestyle = '<section class="mk-lifestyle-banner"><div class="mk-lifestyle-copy"><span class="mk-eyebrow">A LITTLE MORE MEANINGFUL</span><h2>Make room<br>for good living.</h2><p>Home essentials, dekorasi, kerajinan, dan temuan lokal untuk ruang yang terasa lebih personal.</p><a href="#lifestyle" class="mk-text-link">Jelajahi lifestyle ↗</a></div><div class="mk-lifestyle-image"><img src="' + image('photo-1600210492486-724fe5c67fb0',1100) + '" alt="Interior dan produk lifestyle" loading="lazy"></div></section>';
  const stores = '<section class="mk-stores" id="stores">' + sectionHead('MEET THE LOCAL STORES','Toko pilihan di Bali','Contoh tampilan toko yang nantinya terhubung ke Geo Directory.') + '<div class="mk-store-grid"><article><div class="mk-store-photo"><img src="' + image('photo-1490481651871-ab68de25d43d',760) + '" alt="Butik fashion" loading="lazy"></div><div class="mk-store-info"><span>FASHION BOUTIQUE · CONTOH</span><h3>Sundays Studio</h3><p>Seminyak, Bali</p><span class="mk-store-distance">Profil toko & lokasi akan terhubung ke Geo Directory</span></div></article><article><div class="mk-store-photo"><img src="' + image('photo-1600210492486-724fe5c67fb0',760) + '" alt="Toko home living" loading="lazy"></div><div class="mk-store-info"><span>LIFESTYLE & LIVING · CONTOH</span><h3>Ruang Rupa Living</h3><p>Ubud, Bali</p><span class="mk-store-distance">Profil toko & lokasi akan terhubung ke Geo Directory</span></div></article><article><div class="mk-store-photo"><img src="' + image('photo-1590874103328-eac38a683ce7',760) + '" alt="Toko aksesori" loading="lazy"></div><div class="mk-store-info"><span>FASHION & ACCESSORIES · CONTOH</span><h3>Common Ground</h3><p>Canggu, Bali</p><span class="mk-store-distance">Profil toko & lokasi akan terhubung ke Geo Directory</span></div></article></div></section>';
  const header = renderPageHeader({
    brandHref:routeHref('home'),label:'PLUITS Marketplace',className:'global-header mk-header',
    rightContent:'<div class="global-header-tools mk-header-tools"><label class="mk-search" aria-label="Cari produk dan toko">' + icon('search') + '<input id="mk-search-input" type="search" placeholder="Cari produk, brand, atau toko..." autocomplete="off"></label><div class="global-header-actions mk-header-actions"><button type="button" class="global-icon-button mk-header-icon" id="mk-wishlist-link" aria-label="Wishlist" title="Wishlist">' + icon('heart') + '</button><button type="button" class="global-icon-button mk-header-icon mk-cart" id="mk-cart" aria-label="Keranjang" title="Keranjang">' + icon('cart') + '<b id="mk-cart-count">0</b></button></div></div>',
    dataGlobalHeader:true
  });
  root.innerHTML = '<div class="pl-page-shell mk-page">' + header +
    '<nav class="mk-nav" aria-label="Navigasi Marketplace"><a href="#kategori">Kategori</a><a href="#fashion">Fashion</a><a href="#lifestyle">Lifestyle & Living</a><a href="#koleksi">Produk pilihan</a><a href="#stores">Toko lokal</a><span class="mk-nav-location">' + icon('mapPin') + ' BALI</span></nav>' +
    '<main class="pl-page-main mk-main"><div class="mk-preview-note"><span>PREVIEW CATALOG</span><p>Foto, produk, harga, dan nama toko adalah contoh visual — belum merupakan data merchant aktif.</p></div>' +
    hero + categories + feature +
    '<section class="mk-product-section" id="fashion">' + sectionHead('THE FASHION EDIT','Fashion finds','Koleksi contoh dari butik dan toko fashion lokal.') +
    '<div class="mk-filter-row"><div class="mk-filter-tabs" role="group" aria-label="Filter fashion"><button class="is-active" data-filter="Fashion">Semua fashion</button><button data-filter="Semua">Semua kategori</button></div><a href="#koleksi" class="mk-filter-more">Lihat koleksi lengkap ↗</a></div><div class="mk-product-grid" id="mk-fashion-grid"></div></section>' +
    lifestyle +
    '<section class="mk-product-section" id="lifestyle">' + sectionHead('LIFESTYLE & LIVING','Good things for living','Pilihan rumah, dekorasi, dan produk lokal.') +
    '<div class="mk-product-grid" id="mk-lifestyle-grid"></div></section>' +
    '<section class="mk-product-section mk-all-products" id="koleksi">' + sectionHead('DISCOVER MORE','Jelajahi semua pilihan','Cari produk fashion dan lifestyle dari toko-toko lokal.') +
    '<div class="mk-filter-row"><div class="mk-filter-tabs" role="group" aria-label="Filter produk"><button class="is-active" data-filter="Semua">Semua</button><button data-filter="Fashion">Fashion</button><button data-filter="Lifestyle & Living">Lifestyle & Living</button></div><label class="mk-sort-label">Urutkan <select id="mk-sort"><option value="featured">Pilihan</option><option value="low">Harga terendah</option><option value="high">Harga tertinggi</option></select></label></div><div class="mk-product-grid" id="mk-all-grid"></div><p class="mk-empty" id="mk-empty" hidden>Tidak ada produk yang cocok. Coba kata kunci lain.</p></section>' +
    stores +
    '<section class="mk-visit-cta"><div><span class="mk-eyebrow">MORE THAN JUST SHOPPING</span><h2>Temukan tokonya.<br>Datang dan rasakan langsung.</h2><p>Setiap merchant akan memiliki identitas lokasi yang terhubung dengan Geo Directory PLUITS.</p></div><a href="#stores" class="mk-dark-button">Jelajahi toko lokal <span>↗</span></a></section></main>' + renderPublicFooter() + '</div><div class="mk-toast" id="mk-toast" role="status" aria-live="polite"></div>';

  const fashionGrid=root.querySelector('#mk-fashion-grid');
  const lifestyleGrid=root.querySelector('#mk-lifestyle-grid');
  const allGrid=root.querySelector('#mk-all-grid');
  const sort=root.querySelector('#mk-sort');
  const search=root.querySelector('#mk-search-input');
  const toast=root.querySelector('#mk-toast');
  let toastTimer=null;
  const showToast=message=>{toast.textContent=message;toast.classList.add('is-visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('is-visible'),2200);};
  const filtered=()=>{
    let list=PRODUCTS.filter(p=>(activeCategory==='Semua'||p.category===activeCategory)&&(!query||(p.name+' '+p.category+' '+p.store+' '+p.area).toLowerCase().includes(query)));
    if(sort.value==='low')list=[...list].sort((a,b)=>a.price-b.price);
    if(sort.value==='high')list=[...list].sort((a,b)=>b.price-a.price);
    return list;
  };
  const renderAll=()=>{
    const list=filtered();
    allGrid.innerHTML=list.map(productCard).join('');
    fashionGrid.innerHTML=PRODUCTS.filter(p=>p.category==='Fashion').map(productCard).join('');
    lifestyleGrid.innerHTML=PRODUCTS.filter(p=>p.category==='Lifestyle & Living').map(productCard).join('');
    root.querySelector('#mk-empty').hidden=list.length>0;
    root.querySelectorAll('[data-filter]').forEach(button=>button.classList.toggle('is-active',button.dataset.filter===activeCategory));
  };
  const onInput=()=>{query=search.value.trim().toLowerCase();renderAll();};
  const onChange=()=>renderAll();
  const onClick=event=>{
    const add=event.target.closest('[data-add]');
    if(add){cart++;root.querySelector('#mk-cart-count').textContent=cart;showToast('Ditambahkan ke keranjang contoh.');return;}
    const wish=event.target.closest('.mk-wish');
    if(wish){const id=Number(wish.closest('[data-product]').dataset.product);if(saved.has(id)){saved.delete(id);wish.setAttribute('aria-pressed','false');wish.classList.remove('is-saved');showToast('Dihapus dari wishlist.');}else{saved.add(id);wish.setAttribute('aria-pressed','true');wish.classList.add('is-saved');showToast('Disimpan ke wishlist contoh.');}return;}
    const filter=event.target.closest('[data-filter]');
    if(filter){activeCategory=filter.dataset.filter;renderAll();root.querySelector('#koleksi').scrollIntoView({behavior:'smooth'});return;}
    const category=event.target.closest('[data-category]');
    if(category){activeCategory=category.dataset.category;renderAll();root.querySelector('#koleksi').scrollIntoView({behavior:'smooth'});return;}
    if(event.target.closest('#mk-cart'))showToast(cart+' item contoh di keranjang.');
    if(event.target.closest('#mk-wishlist-link'))showToast(saved.size+' produk contoh tersimpan.');
  };
  root.addEventListener('click',onClick);
  search.addEventListener('input',onInput);
  sort.addEventListener('change',onChange);
  renderAll();
  return ()=>{root.removeEventListener('click',onClick);search.removeEventListener('input',onInput);sort.removeEventListener('change',onChange);clearTimeout(toastTimer);};
}
