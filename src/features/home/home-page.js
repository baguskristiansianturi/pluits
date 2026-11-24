import { routeHref } from '../../config/paths.js';
import '../../design-system/page-shell.css';
import { renderPageHeader } from '../../design-system/page-shell.js';
import { renderIcon } from '../../design-system/icons.js';
import { API_BASE_URL } from '../../config/runtime.js';
import './home-page.css';
import { renderSocialPostCard as renderPostCard, renderDemoFeed, mountSocialPostInteractions } from './social-post-card.js';

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
const contentTabs = [{id:'all',icon:'grid',label:'Semua'},{id:'reels',icon:'film',label:'Reel'},{id:'blog',icon:'book',label:'Blog'},{id:'live',icon:'radio',label:'Live'}];
const demoCards = {
  global:[['TRENDING','Cerita dari Bali','Momen dan cerita yang sedang ramai','sunset'],['KOMUNITAS','Ruang kreatif','Temukan komunitas dengan minat serupa','creative'],['KULINER','Rasa Nusantara','Rekomendasi tempat dan pengalaman lokal','food'],['JELAJAH','Akhir pekan','Inspirasi perjalanan di Indonesia','travel']],
  nearby:[['DENPASAR','Sudut kota hari ini','Tempat menarik di sekitar Anda','city'],['KULINER','Tempat ngopi','Ruang santai untuk bertemu','coffee'],['AKTIVITAS','Agenda lokal','Aktivitas menarik di sekitar','event'],['KOMUNITAS','Teman sekitar','Kenali komunitas di area Anda','people']],
  people:[['TEMAN BARU','Ayu Pratiwi','Travel · Bali','person-a'],['TEMAN BARU','Raka Mahendra','Photography · Jakarta','person-b'],['TEMAN BARU','Nadia Putri','Food & Lifestyle · Bandung','person-c'],['TEMAN BARU','Dimas Saputra','Creative · Yogyakarta','person-d'],['TEMAN BARU','Sinta Maharani','Community · Surabaya','person-e']]
};
const heading = (title, note, action, href) => '<div class="global-section-heading"><div><h2>' + title + '</h2>' + (note ? '<p>' + note + '</p>' : '') + '</div>' + (action ? '<a href="' + href + '">' + action + ' ' + renderIcon('eye') + '</a>' : '') + '</div>';
function demoRail(items,label) {
  return '<div class="global-bleed-wrap"><div class="global-demo-rail" aria-label="' + label + '">' + items.map((item,index)=>'<article class="global-demo-card global-demo-card--' + item[3] + '"><div class="global-demo-art"><span>' + item[0] + '</span><i>' + (index+1).toString().padStart(2,'0') + '</i></div><div class="global-demo-copy"><strong>' + item[1] + '</strong><p>' + item[2] + '</p></div></article>').join('') + '</div></div>';
}
function storyRail() {
  const items=[['+','Cerita Anda','story-own',''],['Ayu','Ayu','story-b','photo-1534528741775-53994a69daeb'],['Raka','Raka','story-c','photo-1500648767791-00dcc994a43e'],['Nadia','Nadia','story-d','photo-1531123897727-8f129e1688ce'],['Dimas','Dimas','story-e','photo-1506794778202-cad84cf45f1d'],['Sinta','Sinta','story-f','photo-1544005313-94ddf0286df2']];
  return '<div class="global-bleed-wrap"><div class="global-story-rail" aria-label="Stories">' + items.map((item,index)=>'<div class="global-story-item"><span class="global-story-ring global-story-ring--' + item[2] + '">' + (item[3]?'<img src="https://images.unsplash.com/' + item[3] + '?auto=format&fit=crop&w=160&h=160&q=75" alt="" loading="lazy">':'<b>+</b>') + '</span><small>' + item[1] + '</small></div>').join('') + '</div></div>';
}
function bottomNav() {
  return '<nav class="global-bottom-nav" aria-label="Navigasi utama">' +
    '<a href="' + routeHref('social') + '" class="is-active" aria-current="page">' + renderIcon('book') + '<span>Beranda</span></a>' +
    '<a href="' + routeHref('discover') + '">' + renderIcon('eye') + '<span>Jelajah</span></a>' +
    '<a class="global-create-button" href="' + routeHref('dashboard') + '" aria-label="Buka Ruang Kerja" title="Ruang Kerja"><span>+</span></a>' +
    '<a href="' + routeHref('messages') + '" aria-label="Pesan">' + renderIcon('message') + '<span>Pesan</span></a>' +
    '<a href="' + routeHref('profile') + '" aria-label="Profil">' + renderIcon('user') + '<span>Profil</span></a></nav>';
}
function quickSearchSheet() {
  return '<div class="global-search-backdrop" data-quick-search-backdrop hidden><section class="global-search-sheet" role="dialog" aria-modal="true" aria-labelledby="quick-search-title"><header><div><span class="global-kicker">JELAJAHI PLUITS</span><h2 id="quick-search-title">Apa yang ingin Anda temukan?</h2></div><button type="button" data-close-quick-search aria-label="Tutup pencarian">×</button></header><form data-quick-search-form><label class="global-search-entry"><span class="ui-icon">' + renderIcon('search') + '</span><input type="search" name="q" placeholder="Cari tempat, restoran, makanan, aktivitas..." autocomplete="off" autofocus><button type="submit">Cari</button></label></form><p class="global-search-sheet-label">Jelajahi kategori</p><div class="global-search-category-grid"><a href="' + routeHref('discover') + '?category=places">Tempat & wisata</a><a href="' + routeHref('discover') + '?category=restaurants">Restoran & kafe</a><a href="' + routeHref('discover') + '?category=food">Makanan</a><a href="' + routeHref('discover') + '?category=activities">Aktivitas</a><a href="' + routeHref('discover') + '?category=people">Orang & komunitas</a><a href="' + routeHref('marketplace') + '">Produk & toko</a></div></section></div>';
}
function createSheet() {
  return '<div class="global-create-backdrop" data-create-backdrop hidden><section class="global-create-sheet" role="dialog" aria-modal="true" aria-labelledby="create-title"><button type="button" class="global-create-close" data-close-create aria-label="Tutup">×</button><span class="global-kicker">MULAI SESUATU</span><h2 id="create-title">Buat di PLUITS</h2><p>Pilih format yang ingin disiapkan. Publikasi akan diaktifkan setelah layanan terkait tersedia.</p><div class="global-create-options"><button disabled>Feed <small>Belum tersedia</small></button><button disabled>Reels <small>Belum tersedia</small></button><button disabled>Story <small>Belum tersedia</small></button><button disabled>Live <small>Belum tersedia</small></button><button disabled>Blog <small>Belum tersedia</small></button></div><a href="' + routeHref('dashboard') + '">Buka Dashboard pengelolaan →</a></section></div>';
}
function renderFeedState(message,loading=false) {
  return '<div class="global-feed-state' + (loading?' is-loading':'') + '">' + (loading?'<span class="global-feed-spinner" aria-hidden="true"></span>':'<span class="global-feed-state-icon">' + renderIcon('image') + '</span>') + '<strong>' + message + '</strong>' + (!loading?'<p>Konten publik yang sudah diterbitkan akan muncul di sini.</p>':'') + '</div>';
}
function demoContent(kind) {
  if(kind==='live')return '<div class="global-live-demo-grid"><article class="global-live-demo"><div class="global-live-art global-live-art--one"><span class="global-live-indicator">LIVE</span><div class="global-live-orbit">PL</div><strong>Suasana sore di Bali</strong><small>Berbagi cerita dan momen bersama</small></div><div class="global-live-meta"><strong>Ngobrol santai menjelang senja</strong><p>Ruang obrolan terbuka untuk berbagi cerita dan rekomendasi.</p><span>128 penonton</span></div></article><article class="global-live-demo"><div class="global-live-art global-live-art--two"><span class="global-live-indicator">LIVE</span><div class="global-live-orbit">PL</div><strong>Eksplorasi kuliner lokal</strong><small>Menjelajahi rasa dan cerita lokal</small></div><div class="global-live-meta"><strong>Jelajah rasa Nusantara</strong><p>Tur singkat mengenal hidangan dan ruang lokal.</p><span>86 penonton</span></div></article></div>';
  return '<div class="global-blog-demo-grid"><article class="global-blog-demo"><div class="global-blog-art global-blog-art--one"><span>JURNAL PERJALANAN</span></div><div><small>PERJALANAN · 6 MENIT BACA</small><strong>Menemukan sisi lain dari sebuah kota</strong><p>Kisah perjalanan, tempat menarik, dan pengalaman yang layak dibagikan.</p></div></article><article class="global-blog-demo"><div class="global-blog-art global-blog-art--two"><span>CATATAN HARIAN</span></div><div><small>CERITA · 4 MENIT BACA</small><strong>Cerita kecil yang layak dibagikan</strong><p>Catatan kecil tentang keseharian, inspirasi, dan hal-hal sederhana.</p></div></article></div>';
}
export function mountHomePage({root,user=null,onSignOut,accessToken=null}={}) {
  const account = '<a class="global-icon-button" href="' + routeHref(user?'profile':'login') + '" aria-label="' + (user?'Akun':'Masuk') + '" title="' + (user?'Akun':'Masuk') + '">' + renderIcon('user') + '</a>';
  const actions = '<div class="global-header-actions">' + account + '<a class="global-icon-button" href="' + routeHref('discover') + '" aria-label="Cari" title="Cari">' + renderIcon('search') + '</a><a class="global-icon-button" href="' + routeHref('dashboard') + '" aria-label="Keranjang" title="Keranjang">' + renderIcon('cart') + '</a><a class="global-icon-button" href="' + routeHref('dashboard') + '" aria-label="Notifikasi" title="Notifikasi">' + renderIcon('bell') + '</a></div>';
  const discovery = '<section class="global-section global-people-section" id="people"><div class="global-section-heading"><div><h2>Orang yang mungkin Anda kenal</h2><p>Temukan kenalan baru dari sekitar Anda.</p></div><a href="' + routeHref('discover') + '?mode=people">Jelajahi ' + renderIcon('eye') + '</a></div><div class="global-bleed-wrap"><div class="global-people-rail" aria-label="Rekomendasi orang">' + [['Ayu Pratiwi','Bali','photo-1534528741775-53994a69daeb'],['Raka Mahendra','Jakarta','photo-1500648767791-00dcc994a43e'],['Nadia Putri','Bandung','photo-1531123897727-8f129e1688ce'],['Dimas Saputra','Yogyakarta','photo-1506794778202-cad84cf45f1d'],['Sinta Maharani','Surabaya','photo-1544005313-94ddf0286df2']].map((person,i)=>'<a class="global-person-card" href="' + routeHref('discover') + '?mode=people"><img src="https://images.unsplash.com/' + person[2] + '?auto=format&fit=crop&w=480&q=80" alt="Foto profil ' + person[0] + '" loading="lazy"><span class="global-person-overlay"><strong>' + person[0] + '</strong><small>' + person[1] + '</small></span><span class="global-person-add" aria-hidden="true">+</span></a>').join('') + '</div></div></section>';
  const recommendationItems = [
    {id:'beach',name:'Pantai & alam',image:'photo-1507525428034-b723cf961d3e',app:null},
    {id:'seafood',name:'Seafood',image:'photo-1510130387422-82bed34b37e9',app:'fluid-food'},
    {id:'coffee',name:'Coffee & café',image:'photo-1495474472287-4d71bcdd2085',app:null},
    {id:'family',name:'Wisata keluarga',image:'photo-1511895426328-dc8714191300',app:null},
    {id:'culture',name:'Budaya lokal',image:'photo-1518548419970-58e3b4079ab2',app:null},
    {id:'wellness',name:'Wellness & spa',image:'photo-1540555700478-4be289fbeeff',app:null}
  ];
  const recommendations = '<section class="global-section global-recommendations" id="recommendations" aria-label="Rekomendasi untuk Anda">' +
    heading('Rekomendasi untuk Anda',null,'Jelajahi',routeHref('discover')+'?scope=interests') +
    '<div class="global-interest-grid">' + recommendationItems.map(item => {
      const target=routeHref('discover')+'?intent=interest&interest='+encodeURIComponent(item.id)+(item.app?'&app='+encodeURIComponent(item.app):'');
      return '<a class="global-interest-card" href="'+target+'" data-interest-id="'+item.id+'"><img src="https://images.unsplash.com/'+item.image+'?auto=format&fit=crop&w=760&q=78" alt="" loading="lazy" decoding="async" fetchpriority="low"><span class="global-interest-overlay"><strong>'+item.name+'</strong></span></a>';
    }).join('') + '</div></section>';
  // Named layout fixtures only; replace with GeoDirectory records and calculated distances when connected.
  const nearbyItems = [
    {id:'atlas-beach-club',name:'Atlas Beach Club',category:'Beach Club',location:'Berawa, Canggu',distance:'2,4 km',trust:'Ulasan pengunjung',description:'Beach club tepi pantai dengan kolam, restoran, dan hiburan.',image:'photo-1510414842594-a61c69b5ae57'},
    {id:'la-brisa-bali',name:'La Brisa Bali',category:'Beach Club',location:'Echo Beach, Canggu',distance:'3,1 km',trust:'Ulasan pengunjung',description:'Tempat bersantai di tepi pantai dengan suasana tropis.',image:'photo-1507525428034-b723cf961d3e'},
    {id:'finns-beach-club',name:'FINNS Beach Club',category:'Beach Club',location:'Berawa, Canggu',distance:'1,8 km',trust:'Ulasan pengunjung',description:'Beach club dengan kolam, pilihan bersantap, dan pemandangan laut.',image:'photo-1500375592092-40eb2168fd21'},
    {id:'the-lawn-canggu',name:'The Lawn Canggu',category:'Beach Club',location:'Pantai Batu Bolong, Canggu',distance:'2,7 km',trust:'Ulasan pengunjung',description:'Ruang tepi pantai untuk menikmati suasana dan matahari terbenam.',image:'photo-1473116763249-2faaef81ccda'}
  ];
  const nearby = '<section class="global-section global-nearby" id="nearby">' +
    heading('Di sekitar Anda',null,'Jelajahi',routeHref('discover')+'?scope=nearby&radius=5') +
    '<div class="global-local-rail" aria-label="Tempat di sekitar Anda">' + nearbyItems.map(item => {
      const target=routeHref('discover')+'?scope=nearby&radius=5&place='+encodeURIComponent(item.id);
      return '<a class="global-local-card global-local-card--listing global-local-card--preview" href="'+target+'"><div class="global-local-image"><img src="https://images.unsplash.com/'+item.image+'?auto=format&fit=crop&w=760&q=78" alt="" loading="lazy" decoding="async" fetchpriority="low"><span class="global-local-distance">'+item.distance+'</span></div><span class="global-local-copy"><small class="global-local-category">'+item.category+' · '+item.location+'</small><strong>'+item.name+'</strong><span class="global-local-trust">'+renderIcon('message')+'<span>'+item.trust+'</span></span><em>'+item.description+'</em></span></a>';
    }).join('') + '</div></section>';
  const streams = '<section class="global-content-section" id="content-all" data-content-stream><div class="global-post-list" data-live-feed>' + renderDemoFeed('feed') + '</div>' + demoContent('live').replace(/<article class="global-live-demo"/g,'<article class="global-live-demo" data-content-kind="live"') + '</section>';
  const composerMarkup = user
    ? (API_BASE_URL
      ? '<section class="global-composer" aria-labelledby="global-composer-title"><div class="global-composer-heading"><span class="global-composer-avatar">' + escapeHtml((user.user_metadata?.display_name || user.user_metadata?.full_name || 'P').slice(0,1).toUpperCase()) + '</span><div><strong id="global-composer-title">Bagikan cerita Anda</strong><small>Mulai percakapan dengan komunitas PLUITS</small></div></div><form data-social-composer><label class="global-composer-label" for="global-post-caption">Apa yang ingin Anda ceritakan?</label><textarea id="global-post-caption" name="caption" maxlength="5000" rows="3" required placeholder="Tulis sesuatu yang bermakna…"></textarea><div class="global-composer-footer"><label class="global-composer-visibility"><span>Visibilitas</span><select name="visibility"><option value="public">Publik</option><option value="private">Hanya saya</option></select></label><span data-composer-count>0 / 5.000</span><button type="submit" data-composer-submit>Terbitkan</button></div><p class="global-composer-status" data-composer-status role="status" aria-live="polite"></p></form></section>'
      : '<section class="global-composer is-unavailable"><strong>Bagikan cerita Anda</strong><p>Bagikan momen dan cerita Anda bersama circle.</p></section>')
    : '<section class="global-composer is-guest"><strong>Setiap cerita punya ruang.</strong><p>Masuk atau buat akun untuk mulai membagikan cerita Anda.</p><a href="' + routeHref('login') + '">Masuk ke PLUITS →</a></section>';
  const pageHeaderMarkup=renderPageHeader({brandHref:routeHref('home'),rightContent:'<div class="global-header-tools"><a class="global-icon-button global-favorite-link" href="' + routeHref('dashboard') + '" aria-label="Favorit" title="Favorit">' + renderIcon('heart') + '</a>' + actions + '</div>',className:'global-header',dataGlobalHeader:true});
  root.innerHTML = '<div class="pl-page-shell pl-page-shell--surface pl-page-shell--standard-content home-page global-home-page">' +
    pageHeaderMarkup +
    '<main class="pl-page-main home-main global-home-main"><button type="button" class="global-home-search-entry" data-open-quick-search><span>' + renderIcon('search') + '</span><span><strong>Cari di PLUITS</strong></span><b>' + renderIcon('arrow') + '</b></button>' +
    recommendations + nearby +
    '<div class="global-social-area">' + discovery +
    '<section class="global-section global-stories" id="stories">' + heading('Cerita dari circle Anda','Momen terbaru dari orang-orang di circle Anda.') + storyRail() + '</section>' +
    '<nav class="global-content-tabs" data-content-tabs aria-label="Filter konten">' + contentTabs.map((tab,i)=>'<button type="button" data-content-tab="' + tab.id + '" class="' + (i===0?'is-active':'') + '" aria-label="' + tab.label + '" aria-pressed="' + (i===0?'true':'false') + '">' + renderIcon(tab.icon) + '<span>' + tab.label + '</span></button>').join('') + '<button type="button" class="global-content-refresh" data-feed-refresh aria-label="Perbarui konten" title="Perbarui">' + renderIcon('refresh') + '<span data-feed-refresh-label>Perbarui</span></button></nav>' + composerMarkup +
    streams + '</div>' +
    '<section class="global-section global-products" id="local-products">' + heading('Produk lokal pilihan','Temukan pilihan dari sekitar Anda. Katalog dan cakupan lokasi diatur di Marketplace.','Jelajahi',routeHref('marketplace')) + '<div class="global-product-location"><span>' + renderIcon('mapPin') + '</span><div><strong>Jelajahi berdasarkan lokasi</strong><small>Marketplace dimulai dari cakupan lokasi pilihan; kota lain dan global dapat dipilih di sana.</small></div></div><div class="global-product-demo-rail">' + [['TAS ANYAMAN BALI','Tas Anyaman Bali','Rp159.000','Rp199.000','-20%'],['AKSESORI','Kacamata Vintage','Rp254.000','Rp299.000','-15%'],['KARYA LOKAL','Kalung Bali','Rp120.000','',''],['FASHION','Sandal Santai','Rp149.000','Rp199.000','-25%']].map((item,i)=>'<article class="global-product-demo"><div class="global-product-art global-product-art--' + (i+1) + '">' + (item[4]?'<b class="global-product-discount">' + item[4] + '</b>':'') + '</div><small>' + item[0] + '</small><strong>' + item[1] + '</strong><div class="global-product-price"><b>' + item[2] + '</b>' + (item[3]?'<del>' + item[3] + '</del>':'') + '</div><span>Pilihan dari pelaku usaha lokal</span></article>').join('') + '</div><a class="global-marketplace-cta" href="' + routeHref('marketplace') + '"><span class="global-marketplace-mark">' + renderIcon('store') + '</span><span><strong>Jelajahi Marketplace PLUITS</strong><small>Produk lokal, toko, kafe, restoran, dan lainnya</small></span><b>Belanja sekarang ' + renderIcon('arrow') + '</b></a></section>' +
    '<section class="global-section global-features" id="all-features">' + heading('Layanan PLUITS','Akses cepat ke layanan yang saling terhubung.','Jelajahi',routeHref('discover')) + '<div class="global-feature-rail">' + [['Transportasi','car'],['Toko & Perdagangan','store'],['Akomodasi','mapPin'],['Ticketing & Perjalanan','fileText'],['Layanan Profesional','briefcase'],['Makanan & Minuman','utensils'],['Properti & Ruang','mapPin'],['Mitra Lainnya','grid']].map(([label,icon])=>'<a class="global-feature-card" href="' + routeHref('discover') + '">' + renderIcon(icon) + '<strong>' + label + '</strong><span>Jelajahi mitra</span></a>').join('') + '</div></section>' + '<section class="global-section global-calendar-block"><div class="global-section-heading"><div><h2>Kalender & aktivitas</h2><p>Rencanakan agenda, perjalanan, dan pengalaman Anda.</p></div><a href="' + routeHref('discover') + '">Jelajahi ' + renderIcon('eye') + '</a></div><a class="global-calendar-card" href="' + routeHref('discover') + '"><span class="global-calendar-icon">' + renderIcon('book') + '</span><span><strong>Semua agenda dalam satu tempat</strong><small>Aktivitas, atraksi, perjalanan, dan jadwal pilihan Anda.</small></span><b>→</b></a></section>' + '<section class="global-about" aria-labelledby="global-about-title"><span class="global-kicker">SATU RUANG UNTUK BANYAK KEMUNGKINAN</span><h2 id="global-about-title">Terhubung, menemukan, dan bertransaksi bersama PLUITS.</h2><p>Mulai dari cerita teman, tempat menarik, produk lokal, hingga layanan sehari-hari—semuanya terhubung dalam satu ekosistem.</p><a href="' + routeHref('about') + '">Kenali PLUITS <span aria-hidden="true">→</span></a></section></main>' +
    bottomNav() + quickSearchSheet() + '</div>';
  const unmountSocialPostInteractions=mountSocialPostInteractions(root);
  const searchBackdrop=root.querySelector('[data-quick-search-backdrop]');
  const searchInput=root.querySelector('[data-quick-search-form] input[name="q"]');
  const closeQuickSearch=()=>{if(searchBackdrop)searchBackdrop.hidden=true;document.body.classList.remove('global-search-open');};
  root.querySelector('[data-open-quick-search]')?.addEventListener('click',()=>{if(searchBackdrop){searchBackdrop.hidden=false;document.body.classList.add('global-search-open');searchInput?.focus();}});
  root.querySelector('[data-close-quick-search]')?.addEventListener('click',closeQuickSearch);
  searchBackdrop?.addEventListener('click',event=>{if(event.target===searchBackdrop)closeQuickSearch();});
  root.querySelector('[data-quick-search-form]')?.addEventListener('submit',event=>{event.preventDefault();const query=searchInput?.value.trim()||'';window.location.href=routeHref('discover')+(query?'?q='+encodeURIComponent(query):'');});
  root.addEventListener('keydown',event=>{if(event.key==='Escape'&&searchBackdrop&&!searchBackdrop.hidden)closeQuickSearch();});
  root.addEventListener('click',event=>{const more=event.target.closest('[data-feed-more]');if(!more||!root.contains(more))return;const hidden=[...root.querySelectorAll('[data-feed-page-hidden]')].filter(card=>card.hidden);hidden.slice(0,6).forEach(card=>{card.hidden=false;card.removeAttribute('data-feed-page-hidden');});if(!root.querySelector('[data-feed-page-hidden]')){more.textContent='Jelajahi lagi';more.dataset.exhausted='true';}else{more.textContent='Tampilkan postingan lainnya';}});
  root.addEventListener('click',event=>{const more=event.target.closest('[data-feed-more][data-exhausted="true"]');if(more)window.location.href=routeHref('discover');});
  const buttons=[...root.querySelectorAll('[data-content-tab]')];
  const stream=root.querySelector('[data-content-stream]');
  let activeContentFilter='all';
  const applyContentFilter=(filter='all')=>{
    activeContentFilter=filter;
    buttons.forEach(button=>{const active=button.dataset.contentTab===filter;button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active));});
    stream?.querySelectorAll('[data-content-kind]').forEach(item=>{item.hidden=filter!=='all'&&item.dataset.contentKind!==filter;});
    stream?.querySelectorAll('[data-post-card]').forEach(card=>{const kind=card.dataset.contentKind||'photo';card.hidden=filter==='all'?false:filter==='reels'?kind!=='reel':filter==='blog'?kind!=='blog':true;});
    const feed=stream?.querySelector('[data-live-feed]');
    if(feed)feed.hidden=filter==='live';
    stream?.querySelectorAll('.pl-post-demo-stream-heading').forEach(heading=>heading.hidden=filter!=='all');
  };
  buttons.forEach(button=>button.addEventListener('click',()=>applyContentFilter(button.dataset.contentTab)));
  const controller=new AbortController();
  const feedTarget=root.querySelector('[data-live-feed]');

  const loadFeed = async () => {
    if (!feedTarget) return;
    if (!API_BASE_URL) { feedTarget.innerHTML=renderDemoFeed('feed'); applyContentFilter(activeContentFilter); return; }
    feedTarget.innerHTML=renderFeedState('Memuat postingan publik…',true);
    try {
      const response=await fetch(API_BASE_URL+'/v1/social/feed?limit=20',{headers:{Accept:'application/json'},mode:'cors',credentials:'omit',cache:'no-store',signal:controller.signal});
      if(!response.ok)throw new Error('Feed belum dapat dimuat.');
      const payload=await response.json();
      const posts=Array.isArray(payload.posts)?payload.posts:[];
      feedTarget.innerHTML=(posts.length?posts.map(post=>renderPostCard({authorName:post.author_name,username:post.username,caption:post.caption,content_kind:post.content_kind,created_at:post.created_at})).join(''):'')+renderDemoFeed('feed');
      applyContentFilter(activeContentFilter);
    } catch(error) {
      if(error.name!=='AbortError'){feedTarget.innerHTML=renderDemoFeed('feed');applyContentFilter(activeContentFilter);}
    }
  };
  const composer=root.querySelector('[data-social-composer]');
  if(composer){
    const captionField=composer.querySelector('[name="caption"]');
    const count=composer.querySelector('[data-composer-count]');
    const status=composer.querySelector('[data-composer-status]');
    const submit=composer.querySelector('[data-composer-submit]');
    captionField?.addEventListener('input',()=>{if(count)count.textContent=Array.from(captionField.value).length.toLocaleString('id-ID')+' / 5.000';});
    composer.addEventListener('submit',async event=>{
      event.preventDefault();
      const caption=captionField.value.trim();
      if(!caption){status.textContent='Tuliskan cerita terlebih dahulu.';captionField.focus();return;}
      if(!accessToken){status.textContent='Sesi akun tidak tersedia. Silakan masuk kembali.';return;}
      submit.disabled=true;status.textContent='Menerbitkan postingan…';
      try{
        const response=await fetch(API_BASE_URL+'/v1/social/posts',{method:'POST',headers:{Accept:'application/json','Content-Type':'application/json',Authorization:'Bearer '+accessToken},body:JSON.stringify({caption,visibility:composer.elements.visibility.value}),mode:'cors',credentials:'omit',cache:'no-store',signal:controller.signal});
        const payload=await response.json().catch(()=>({}));
        if(!response.ok)throw new Error(payload.error==='rate_limit_exceeded'?'Terlalu sering menerbitkan postingan. Coba lagi nanti.':'Postingan belum berhasil diterbitkan.');
        const post=payload;
        const card=renderPostCard({authorName:post.author_name,username:post.username,caption:post.caption,content_kind:post.content_kind,created_at:post.created_at});
        feedTarget?.insertAdjacentHTML('afterbegin',card);
        applyContentFilter(activeContentFilter);
        captionField.value='';if(count)count.textContent='0 / 5.000';
        status.textContent=post.visibility==='private'?'Postingan privat tersimpan dan hanya terlihat oleh Anda.':'Postingan berhasil diterbitkan.';
      }catch(error){if(error.name!=='AbortError')status.textContent=error.message||'Postingan belum berhasil diterbitkan.';}
      finally{submit.disabled=false;}
    });
  }
  loadFeed();
  root.querySelector('[data-feed-refresh]')?.addEventListener('click',async()=>{const refresh=root.querySelector('[data-feed-refresh]'),label=root.querySelector('[data-feed-refresh-label]');if(refresh?.classList.contains('is-refreshing'))return;window.scrollTo({top:0,behavior:'smooth'});refresh?.classList.add('is-refreshing');if(label)label.textContent='Memperbarui…';const minimumDelay=new Promise(resolve=>window.setTimeout(resolve,1500));try{await Promise.all([loadFeed(),minimumDelay]);}finally{refresh?.classList.remove('is-refreshing');if(label)label.textContent='Perbarui';}});
  return ()=>{controller.abort();observer?.disconnect();unmountSocialPostInteractions();document.body.classList.remove('global-search-open');};
}
