import { routeHref } from '../../config/paths.js';
import '../../design-system/page-shell.css';
import { renderPageHeader } from '../../design-system/page-shell.js';
import { renderIcon } from '../../design-system/icons.js';
import { API_BASE_URL } from '../../config/runtime.js';
import './home-page.css';

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
const contentTabs = [{id:'feed',label:'Feed'},{id:'reels',label:'Reels'},{id:'live',label:'Live'},{id:'blog',label:'Blog'}];
const demoCards = {
  global:[['TRENDING','Cerita dari Bali','Momen dan cerita yang sedang ramai','sunset'],['KOMUNITAS','Ruang kreatif','Temukan komunitas dengan minat serupa','creative'],['KULINER','Rasa Nusantara','Rekomendasi tempat dan pengalaman lokal','food'],['JELAJAH','Akhir pekan','Inspirasi perjalanan di Indonesia','travel']],
  nearby:[['DENPASAR','Sudut kota hari ini','Tempat menarik di sekitar Anda','city'],['KULINER','Tempat ngopi','Ruang santai untuk bertemu','coffee'],['AKTIVITAS','Agenda lokal','Aktivitas menarik di sekitar','event'],['KOMUNITAS','Teman sekitar','Kenali komunitas di area Anda','people']],
  people:[['TEMAN BARU','Ayu Pratiwi','Travel · Bali','person-a'],['TEMAN BARU','Raka Mahendra','Photography · Jakarta','person-b'],['TEMAN BARU','Nadia Putri','Food & Lifestyle · Bandung','person-c'],['TEMAN BARU','Dimas Saputra','Creative · Yogyakarta','person-d'],['TEMAN BARU','Sinta Maharani','Community · Surabaya','person-e']]
};
const heading = (title, note, action, href) => '<div class="global-section-heading"><div><h2>' + title + '</h2><p>' + note + '</p></div>' + (action ? '<a href="' + href + '">' + action + ' <span aria-hidden="true">→</span></a>' : '') + '</div>';
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
function renderPostCard(post) {
  const media = post.mediaUrl
    ? (post.media_type === 'video'
      ? '<video class="global-post-media" src="' + escapeHtml(post.mediaUrl) + '" controls playsinline preload="none"></video>'
      : '<img class="global-post-media" src="' + escapeHtml(post.mediaUrl) + '" alt="Konten dari ' + escapeHtml(post.authorName) + '" loading="lazy">')
    : '';
  const avatar = post.avatarUrl
    ? '<img src="' + escapeHtml(post.avatarUrl) + '" alt="" loading="lazy">'
    : '<span>' + escapeHtml((post.authorName || 'P').slice(0,1).toUpperCase()) + '</span>';
  const caption = post.caption ? '<p class="global-post-caption">' + escapeHtml(post.caption) + '</p>' : '';
  const kind = (post.visibility === 'private' ? 'PRIVAT · ' : '') + (post.content_kind === 'reel' ? 'REELS' : 'FEED');
  const date = post.created_at ? new Date(post.created_at).toLocaleDateString('id-ID',{day:'numeric',month:'short'}) : (post.isDemo?'2 jam yang lalu':'');
  return '<article class="global-post-card' + (post.isDemo?' is-demo':'') + (post.content_kind==='reel'?' is-reel':'') + '"><header class="global-post-author"><span class="global-post-avatar">' + avatar + '</span><span class="global-post-author-copy"><strong>' + escapeHtml(post.authorName) + '</strong><small>@' + escapeHtml(post.username || 'pengguna') + ' · ' + date + '</small></span><span class="global-post-kind">' + kind + '</span></header>' + media + caption + (post.isDemo?'':'') + '<footer class="global-post-actions"><span>' + renderIcon('heart') + ' ' + (post.isDemo?post.likes+' suka':'Suka') + '</span><span>' + renderIcon('message') + ' ' + (post.isDemo?post.comments+' komentar':'Komentar') + '</span><span>' + renderIcon('arrow') + ' Bagikan</span></footer></article>';
}
const demoFeedPosts = [
  {authorName:'Ayu Pratiwi',username:'ayu.pratiwi',avatarUrl:'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=75',caption:'Senja di pesisir Bali selalu punya cara sendiri untuk membuat kita berhenti sejenak. 🌅\n\nSudut favorit untuk menikmati sore dan cerita baru.',mediaUrl:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=85',created_at:'',likes:245,comments:48,isDemo:true},
  {authorName:'Raka Mahendra',username:'raka.visual',avatarUrl:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=75',caption:'Mencari detail kecil di tengah hiruk pikuk kota. Kadang perspektif baru datang dari berjalan lebih pelan. 📷',mediaUrl:'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1100&q=85',created_at:'',likes:182,comments:23,isDemo:true},
  {authorName:'Nadia Putri',username:'nadia.tastes',avatarUrl:'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=120&h=120&q=75',caption:'Akhir pekan, secangkir kopi, dan tempat nyaman untuk bertukar cerita. Ada rekomendasi tempat serupa?',mediaUrl:'https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1100&q=85',created_at:'',likes:136,comments:19,isDemo:true}
];
const demoReels = [
  {authorName:'Dimas Saputra',username:'dimas.moves',avatarUrl:'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&h=120&q=75',caption:'Potongan suasana pagi di Ubud. 🌿',mediaUrl:'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=700&h=1000&q=85',content_kind:'reel',likes:324,comments:31,isDemo:true},
  {authorName:'Sinta Maharani',username:'sinta.explores',avatarUrl:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=1000&q=85',caption:'Warna-warni pasar lokal yang selalu menarik untuk dijelajahi.',mediaUrl:'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=700&h=1000&q=85',content_kind:'reel',likes:291,comments:27,isDemo:true}
];
function renderDemoFeed(kind='feed') {
  const posts=kind==='reels'?demoReels:demoFeedPosts;
  return posts.map(renderPostCard).join('');
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
  const discovery = '<section class="global-section global-people-section" id="people"><div class="global-section-heading"><div><h2>Orang yang mungkin Anda kenal</h2><p>Temukan kenalan baru dari sekitar Anda.</p></div><a href="' + routeHref('discover') + '?mode=people">Lihat semua <span aria-hidden="true">→</span></a></div><div class="global-bleed-wrap"><div class="global-people-rail" aria-label="Rekomendasi orang">' + [['Ayu Pratiwi','Bali','photo-1534528741775-53994a69daeb'],['Raka Mahendra','Jakarta','photo-1500648767791-00dcc994a43e'],['Nadia Putri','Bandung','photo-1531123897727-8f129e1688ce'],['Dimas Saputra','Yogyakarta','photo-1506794778202-cad84cf45f1d'],['Sinta Maharani','Surabaya','photo-1544005313-94ddf0286df2']].map((person,i)=>'<a class="global-person-card" href="' + routeHref('discover') + '?mode=people"><img src="https://images.unsplash.com/' + person[2] + '?auto=format&fit=crop&w=480&q=80" alt="Foto profil ' + person[0] + '" loading="lazy"><span class="global-person-overlay"><strong>' + person[0] + '</strong><small>' + person[1] + '</small></span><span class="global-person-add" aria-hidden="true">+</span></a>').join('') + '</div></div></section>';
  const topTenItems = [
    {name:'Pura Luhur Uluwatu',type:'Wisata & budaya',image:'photo-1537996194471-e657df975ab4',rating:'4,9',reviews:'2.840 ulasan',category:'places'},
    {name:'Warung Mak Beng',type:'Restoran · Seafood',image:'photo-1517248135467-4c7edcad34c4',rating:'4,7',reviews:'1.260 ulasan',category:'restaurants'},
    {name:'Pantai Melasti',type:'Pantai & alam',image:'photo-1507525428034-b723cf961a3e',rating:'4,8',reviews:'3.120 ulasan',category:'places'},
    {name:'Nasi Ayam Kedewatan',type:'Kuliner khas Bali',image:'photo-1547592180-85f173990554',rating:'4,8',reviews:'986 ulasan',category:'food'},
    {name:'Tegallalang Rice Terrace',type:'Wisata alam',image:'photo-1518548419970-58e3b4079ab2',rating:'4,7',reviews:'2.410 ulasan',category:'places'},
    {name:'Sate Lilit Bali',type:'Kuliner khas Bali',image:'photo-1555939594-58d7cb561ad1',rating:'4,8',reviews:'742 ulasan',category:'food'},
    {name:'Jimbaran Seafood',type:'Restoran · Seafood',image:'photo-1510130387422-82bed34b37e9',rating:'4,6',reviews:'1.540 ulasan',category:'restaurants'},
    {name:'Campuhan Ridge Walk',type:'Aktivitas & alam',image:'photo-1470770841072-f978cf4d019e',rating:'4,8',reviews:'1.890 ulasan',category:'activities'},
    {name:'Desa Penglipuran',type:'Desa wisata & budaya',image:'photo-1519681393784-d120267933ba',rating:'4,7',reviews:'1.120 ulasan',category:'places'},
    {name:'Kopi Seniman Ubud',type:'Kafe & kopi',image:'photo-1501339847302-ac426a4a7cbb',rating:'4,7',reviews:'864 ulasan',category:'restaurants'}
  ];
  const topTen = '<section class="global-section global-top-ten" aria-label="Top 10 pilihan di Bali"><div class="global-section-heading"><div><h2>Top 10 di Bali</h2><p>Pilihan tempat, restoran, kuliner, dan aktivitas yang sedang dijelajahi.</p></div><a href="' + routeHref('discover') + '?scope=bali">Jelajahi semua <span aria-hidden="true">→</span></a></div><div class="global-top-ten-controls"><span>10 pilihan teratas</span><div><button type="button" data-top-ten-prev aria-label="Geser Top 10 ke kiri">‹</button><button type="button" data-top-ten-next aria-label="Geser Top 10 ke kanan">›</button></div></div><div class="global-top-ten-rail" data-top-ten-rail aria-label="Sepuluh pilihan teratas di Bali">' + topTenItems.map((item,index) => '<a class="global-top-ten-card" href="' + routeHref('discover') + '?scope=bali"><img src="https://images.unsplash.com/' + item.image + '?auto=format&fit=crop&w=900&q=82" alt="' + item.name + '" loading="lazy"><span class="global-top-ten-rank">TOP ' + String(index+1).padStart(2,'0') + '</span><span class="global-top-ten-overlay"><small>' + item.type + '</small><strong>' + item.name + '</strong><span class="global-top-ten-meta">★ ' + item.rating + ' <i>·</i> ' + item.reviews + '</span></span></a>').join('') + '</div></section>';
  const nearbyItems = [
    {name:'Sundara Beach Club',category:'Beach club & restoran',location:'Jimbaran, Denpasar Selatan',distance:'4,2 km',image:'photo-1519046904884-53103b34b206',rating:'4,8',reviews:'214 ulasan',quote:'“Pemandangan lautnya indah, staf sigap, dan area makannya tertata nyaman.”'},
    {name:'Kopi Nako Denpasar',category:'Kafe & kedai kopi',location:'Renon, Denpasar',distance:'1,1 km',image:'photo-1501339847302-ac426a4a7cbb',rating:'4,7',reviews:'186 ulasan',quote:'“Tempatnya nyaman untuk bekerja sebentar, pilihan kopi dan makanannya beragam.”'},
    {name:'Bale Udang Mang Engking',category:'Restoran keluarga',location:'Kuta, Badung',distance:'5,6 km',image:'photo-1517248135467-4c7edcad34c4',rating:'4,7',reviews:'532 ulasan',quote:'“Suasana saung di atas air cocok untuk makan bersama keluarga.”'},
    {name:'Warung Wardani',category:'Kuliner khas Bali',location:'Renon, Denpasar',distance:'2,3 km',image:'photo-1547592180-85f173990554',rating:'4,6',reviews:'428 ulasan',quote:'“Nasi campurnya lengkap dengan rasa bumbu Bali yang kuat.”'},
    {name:'Taman Inspirasi Mertasari',category:'Pantai & ruang rekreasi',location:'Sanur, Denpasar Selatan',distance:'3,8 km',image:'photo-1507525428034-b723cf961a3e',rating:'4,5',reviews:'316 ulasan',quote:'“Area pantainya teduh dan enak untuk berjalan santai menjelang sore.”'}
  ];
  const nearby = '<section class="global-section global-nearby" id="nearby">' + heading('Di sekitar Anda','Tempat, usaha, dan pengalaman menarik di area Denpasar.','Lihat semua',routeHref('discover')) + '<div class="global-local-rail">' + nearbyItems.map(item=>'<a class="global-local-card" href="' + routeHref('discover') + '"><div class="global-local-image"><img src="https://images.unsplash.com/' + item.image + '?auto=format&fit=crop&w=760&q=82" alt="' + item.name + '" loading="lazy"><span class="global-local-rating">★ ' + item.rating + ' <i>·</i> ' + item.reviews + '</span><span class="global-local-distance">' + item.distance + '</span></div><span class="global-local-copy"><small class="global-local-category">' + item.category + '</small><strong>' + item.name + '</strong><span class="global-local-location">' + item.location + '</span><span class="global-local-review"><b>ULASAN PENGUNJUNG</b>' + item.quote + '</span></span></a>').join('') + '</div></section>';
  const streams = contentTabs.map((tab,index) => {
    const body=tab.id==='feed'?'<div class="global-post-list" data-live-feed>' + renderDemoFeed('feed') + '</div>'
      :tab.id==='reels'?'<div class="global-post-list global-reels-list" data-live-reels>' + renderDemoFeed('reels') + '</div>'
      :demoContent(tab.id);
    const note=tab.id==='feed'?'Postingan publik dari seluruh akun PLUITS.':tab.id==='reels'?'Video pendek dari kreator PLUITS.':tab.id==='live'?'Siaran dan percakapan langsung.':'Artikel dan cerita dari penulis PLUITS.';
    return '<section class="global-content-section" id="content-' + tab.id + '" data-content-section="' + tab.id + '"><div class="global-content-intro"><span class="global-kicker">' + String(index+1).padStart(2,'0') + ' / SOCIAL CONTENT</span><h2>' + tab.label + '</h2><p>' + note + '</p></div>' + body + '</section>';
  }).join('');
  const composerMarkup = user
    ? (API_BASE_URL
      ? '<section class="global-composer" aria-labelledby="global-composer-title"><div class="global-composer-heading"><span class="global-composer-avatar">' + escapeHtml((user.user_metadata?.display_name || user.user_metadata?.full_name || 'P').slice(0,1).toUpperCase()) + '</span><div><strong id="global-composer-title">Bagikan cerita Anda</strong><small>Mulai percakapan dengan komunitas PLUITS</small></div></div><form data-social-composer><label class="global-composer-label" for="global-post-caption">Apa yang ingin Anda ceritakan?</label><textarea id="global-post-caption" name="caption" maxlength="5000" rows="3" required placeholder="Tulis sesuatu yang bermakna…"></textarea><div class="global-composer-footer"><label class="global-composer-visibility"><span>Visibilitas</span><select name="visibility"><option value="public">Publik</option><option value="private">Hanya saya</option></select></label><span data-composer-count>0 / 5.000</span><button type="submit" data-composer-submit>Terbitkan</button></div><p class="global-composer-status" data-composer-status role="status" aria-live="polite"></p></form></section>'
      : '<section class="global-composer is-unavailable"><strong>Bagikan cerita Anda</strong><p>Bagikan momen dan cerita Anda bersama circle.</p></section>')
    : '<section class="global-composer is-guest"><strong>Setiap cerita punya ruang.</strong><p>Masuk atau buat akun untuk mulai membagikan cerita Anda.</p><a href="' + routeHref('login') + '">Masuk ke PLUITS →</a></section>';
  const pageHeaderMarkup=renderPageHeader({brandHref:routeHref('home'),rightContent:'<div class="global-header-tools"><a class="global-icon-button global-favorite-link" href="' + routeHref('dashboard') + '" aria-label="Favorit" title="Favorit">' + renderIcon('heart') + '</a>' + actions + '</div>',className:'global-header',dataGlobalHeader:true});
  root.innerHTML = '<div class="pl-page-shell pl-page-shell--surface pl-page-shell--standard-content home-page global-home-page">' +
    pageHeaderMarkup +
    '<main class="pl-page-main home-main global-home-main"><button type="button" class="global-home-search-entry" data-open-quick-search><span>' + renderIcon('search') + '</span><span><strong>Cari di PLUITS</strong><small>Tempat, restoran, makanan, aktivitas, dan lainnya</small></span><b>' + renderIcon('arrow') + '</b></button>' +
    '<div class="global-location-row"><span>' + renderIcon('mapPin') + '</span><span><small>Area rekomendasi</small><strong>Bali</strong></span><span class="global-location-context">Global · Pulau Bali</span></div>' + topTen + nearby +
    '<div class="global-social-area">' + discovery +
    '<section class="global-section global-stories" id="stories">' + heading('Cerita dari circle Anda','Momen terbaru dari orang-orang di circle Anda.') + storyRail() + '</section>' +
    '<nav class="global-content-tabs" data-content-tabs aria-label="Kategori konten">' + contentTabs.map((tab,i)=>'<button type="button" data-content-tab="' + tab.id + '" class="' + (i===0?'is-active':'') + '" aria-controls="content-' + tab.id + '">' + tab.label + '</button>').join('') + '</nav>' + composerMarkup +
    streams + '</div>' +
    '<section class="global-section global-products" id="local-products">' + heading('Produk lokal pilihan','Temukan pilihan dari sekitar Anda. Katalog dan cakupan lokasi diatur di Marketplace.','Lihat semua',routeHref('marketplace')) + '<div class="global-product-location"><span>' + renderIcon('mapPin') + '</span><div><strong>Jelajahi berdasarkan lokasi</strong><small>Marketplace dimulai dari cakupan lokasi pilihan; kota lain dan global dapat dipilih di sana.</small></div></div><div class="global-product-demo-rail">' + [['TAS ANYAMAN BALI','Tas Anyaman Bali','Rp159.000','Rp199.000','-20%'],['AKSESORI','Kacamata Vintage','Rp254.000','Rp299.000','-15%'],['KARYA LOKAL','Kalung Bali','Rp120.000','',''],['FASHION','Sandal Santai','Rp149.000','Rp199.000','-25%']].map((item,i)=>'<article class="global-product-demo"><div class="global-product-art global-product-art--' + (i+1) + '">' + (item[4]?'<b class="global-product-discount">' + item[4] + '</b>':'') + '</div><small>' + item[0] + '</small><strong>' + item[1] + '</strong><div class="global-product-price"><b>' + item[2] + '</b>' + (item[3]?'<del>' + item[3] + '</del>':'') + '</div><span>Pilihan dari pelaku usaha lokal</span></article>').join('') + '</div><a class="global-marketplace-cta" href="' + routeHref('marketplace') + '"><span class="global-marketplace-mark">' + renderIcon('store') + '</span><span><strong>Jelajahi Marketplace PLUITS</strong><small>Produk lokal, toko, kafe, restoran, dan lainnya</small></span><b>Belanja sekarang ' + renderIcon('arrow') + '</b></a></section>' +
    '<section class="global-section global-features" id="all-features">' + heading('Layanan PLUITS','Akses cepat ke layanan yang saling terhubung.','Jelajahi semua',routeHref('discover')) + '<div class="global-feature-rail">' + [['Transportasi','car'],['Toko & Perdagangan','store'],['Akomodasi','mapPin'],['Ticketing & Perjalanan','fileText'],['Layanan Profesional','briefcase'],['Makanan & Minuman','utensils'],['Properti & Ruang','mapPin'],['Mitra Lainnya','grid']].map(([label,icon])=>'<a class="global-feature-card" href="' + routeHref('discover') + '">' + renderIcon(icon) + '<strong>' + label + '</strong><span>Jelajahi mitra</span></a>').join('') + '</div></section>' + '<section class="global-section global-calendar-block"><div class="global-section-heading"><div><h2>Kalender & aktivitas</h2><p>Rencanakan agenda, perjalanan, dan pengalaman Anda.</p></div><a href="' + routeHref('discover') + '">Jelajahi <span aria-hidden="true">→</span></a></div><a class="global-calendar-card" href="' + routeHref('discover') + '"><span class="global-calendar-icon">' + renderIcon('book') + '</span><span><strong>Semua agenda dalam satu tempat</strong><small>Aktivitas, atraksi, perjalanan, dan jadwal pilihan Anda.</small></span><b>→</b></a></section>' + '<section class="global-about" aria-labelledby="global-about-title"><span class="global-kicker">SATU RUANG UNTUK BANYAK KEMUNGKINAN</span><h2 id="global-about-title">Terhubung, menemukan, dan bertransaksi bersama PLUITS.</h2><p>Mulai dari cerita teman, tempat menarik, produk lokal, hingga layanan sehari-hari—semuanya terhubung dalam satu ekosistem.</p><a href="' + routeHref('about') + '">Kenali PLUITS <span aria-hidden="true">→</span></a></section></main>' +
    bottomNav() + quickSearchSheet() + '</div>';
  const searchBackdrop=root.querySelector('[data-quick-search-backdrop]');
  const searchInput=root.querySelector('[data-quick-search-form] input[name="q"]');
  const closeQuickSearch=()=>{if(searchBackdrop)searchBackdrop.hidden=true;document.body.classList.remove('global-search-open');};
  root.querySelector('[data-open-quick-search]')?.addEventListener('click',()=>{if(searchBackdrop){searchBackdrop.hidden=false;document.body.classList.add('global-search-open');searchInput?.focus();}});
  root.querySelector('[data-close-quick-search]')?.addEventListener('click',closeQuickSearch);
  searchBackdrop?.addEventListener('click',event=>{if(event.target===searchBackdrop)closeQuickSearch();});
  root.querySelector('[data-quick-search-form]')?.addEventListener('submit',event=>{event.preventDefault();const query=searchInput?.value.trim()||'';window.location.href=routeHref('discover')+(query?'?q='+encodeURIComponent(query):'');});
  root.addEventListener('keydown',event=>{if(event.key==='Escape'&&searchBackdrop&&!searchBackdrop.hidden)closeQuickSearch();});
  const buttons=[...root.querySelectorAll('[data-content-tab]')];
  buttons.forEach(button=>button.addEventListener('click',()=>{root.querySelector('#content-'+button.dataset.contentTab)?.scrollIntoView({behavior:'smooth',block:'start'});buttons.forEach(item=>item.classList.toggle('is-active',item===button));}));
  let observer=null;
  if ('IntersectionObserver' in window) {
    observer=new IntersectionObserver(entries=>{const current=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(current)buttons.forEach(button=>button.classList.toggle('is-active',button.dataset.contentTab===current.target.dataset.contentSection));},{rootMargin:'-100px 0px -55% 0px',threshold:[0,.15,.35,.6]});
    root.querySelectorAll('[data-content-section]').forEach(section=>observer.observe(section));
  }
  const autoplayCleanups=[];
  root.querySelectorAll('[data-top-ten-rail]').forEach(rail=>{
    const first=rail.firstElementChild;
    if(!first)return;
    const clone=first.cloneNode(true);clone.setAttribute('aria-hidden','true');clone.tabIndex=-1;rail.append(clone);
    if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return;
    let timer=null,resumeTimer=null,autoMoving=false;
    const advance=()=>{
      const next=rail.scrollLeft+rail.clientWidth;
      autoMoving=true;
      rail.scrollTo({left:next,behavior:'smooth'});
      window.setTimeout(()=>{
        const atLoop=rail.scrollLeft+rail.clientWidth>=rail.scrollWidth-2;
        if(atLoop){rail.scrollTo({left:0,behavior:'instant'});}
        autoMoving=false;
      },520);
    };
    const start=()=>{window.clearInterval(timer);timer=window.setInterval(advance,2600);};
    const pause=()=>{window.clearInterval(timer);window.clearTimeout(resumeTimer);resumeTimer=window.setTimeout(start,6000);};
    ['pointerdown','touchstart','wheel','focusin'].forEach(type=>rail.addEventListener(type,pause,{passive:true}));
    rail.addEventListener('scroll',()=>{if(!autoMoving)pause();},{passive:true});
    start();
    autoplayCleanups.push(()=>{window.clearInterval(timer);window.clearTimeout(resumeTimer);});
  });
  const controller=new AbortController();
  const feedTarget=root.querySelector('[data-live-feed]');
  const reelsTarget=root.querySelector('[data-live-reels]');
  const loadFeed = async () => {
    if (!feedTarget) return;
    if (!API_BASE_URL) { feedTarget.innerHTML=renderDemoFeed('feed'); return; }
    feedTarget.innerHTML=renderFeedState('Memuat postingan publik…',true);
    try {
      const response=await fetch(API_BASE_URL+'/v1/social/feed?limit=20',{headers:{Accept:'application/json'},mode:'cors',credentials:'omit',cache:'no-store',signal:controller.signal});
      if(!response.ok)throw new Error('Feed belum dapat dimuat.');
      const payload=await response.json();
      const posts=Array.isArray(payload.posts)?payload.posts:[];
      feedTarget.innerHTML=posts.length?posts.map(post=>renderPostCard({authorName:post.author_name,username:post.username,caption:post.caption,content_kind:post.content_kind,created_at:post.created_at})).join(''):renderDemoFeed('feed');
    } catch(error) {
      if(error.name!=='AbortError')feedTarget.innerHTML=renderDemoFeed('feed');
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
        captionField.value='';if(count)count.textContent='0 / 5.000';
        status.textContent=post.visibility==='private'?'Postingan privat tersimpan dan hanya terlihat oleh Anda.':'Postingan berhasil diterbitkan.';
      }catch(error){if(error.name!=='AbortError')status.textContent=error.message||'Postingan belum berhasil diterbitkan.';}
      finally{submit.disabled=false;}
    });
  }
  loadFeed();
  if(reelsTarget)reelsTarget.innerHTML=renderDemoFeed('reels');
  return ()=>{controller.abort();observer?.disconnect();autoplayCleanups.forEach(cleanup=>cleanup());document.body.classList.remove('global-search-open');};
}
