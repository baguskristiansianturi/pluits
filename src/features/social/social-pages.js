import { routeHref } from '../../config/paths.js';
import '../../design-system/page-shell.css';
import { renderPageHeader } from '../../design-system/page-shell.js';
import { renderIcon } from '../../design-system/icons.js';
import { API_BASE_URL } from '../../config/runtime.js';
import './social-pages.css';
import { renderProfileCoverMenu, renderProfileCoverMenuTrigger, mountProfileCoverControls } from './profile-cover-controls.js';

// Short-lived in-memory cache prevents repeated profile navigation from
// re-fetching the same business-presence data on every mount.

function bottomNav(active){
 return '<nav class="global-bottom-nav" aria-label="Navigasi aplikasi">'
 + '<a href="'+routeHref('social')+'" class="'+(active==='social'?'is-active':'')+'">'+renderIcon('book')+'<span>Beranda</span></a>'
 + '<a href="'+routeHref('discover')+'" class="'+(active==='discover'?'is-active':'')+'">'+renderIcon('eye')+'<span>Jelajah</span></a>'
 + '<a class="social-plus" href="'+routeHref('dashboard')+'" aria-label="Buka Ruang Kerja"><span>+</span></a>'
 + '<a href="'+routeHref('messages')+'" class="'+(active==='messages'?'is-active':'')+'">'+renderIcon('message')+'<span>Pesan</span></a>'
 + '<a href="'+routeHref('profile')+'" class="'+(active==='profile'?'is-active':'')+'">'+renderIcon('user')+'<span>Profil</span></a></nav>';
}
function shell(title,subtitle,active,content){
 const header=renderPageHeader({brandHref:routeHref('home'),rightContent:'<div class="social-header-tools"><span>'+title+'</span><a href="'+routeHref('profile')+'">Profil</a></div>',className:'social-header'});
 return '<div class="pl-page-shell social-shell">'+header+'<main class="pl-page-main social-main"><section class="social-intro"><span class="social-kicker">PLUITS · '+title.toUpperCase()+'</span><h1>'+title+'</h1><p>'+subtitle+'</p></section>'+content+'</main>'+bottomNav(active)+'</div>';
}
function emptyPanel(title,text){return '<section class="social-empty-panel"><span>'+renderIcon('eye')+'</span><strong>'+title+'</strong><p>'+text+'</p></section>';}
export function mountCircleHomePage({root}={}){root.innerHTML=shell('Beranda Circle','Ruang personal yang mengikuti Circle, minat, dan konteks lokasi Anda.','social','<section class="social-home-section"><div class="social-section-heading"><h2>Circle Anda</h2><a href="'+routeHref('discover')+'">Temukan akun →</a></div>'+emptyPanel('Belum ada aktivitas Circle','Postingan dan pembaruan dari akun dalam Circle Anda akan muncul di sini.')+'</section><section class="social-home-section"><div class="social-section-heading"><h2>Di sekitar Anda</h2><span>Berbasis lokasi</span></div>'+emptyPanel('Rekomendasi lokasi belum tersedia','Aktifkan izin lokasi jika ingin melihat rekomendasi yang lebih akurat. Anda tetap dapat menggunakan PLUITS tanpa memberikan izin lokasi.')+'</section>');}
export function mountDiscoverPage({root}={}){root.innerHTML=shell('Jelajah','Temukan orang, cerita, tempat, komunitas, dan layanan dari seluruh wilayah PLUITS.','discover','<section class="social-home-section"><div class="social-section-heading"><h2>Jelajahi Indonesia</h2><span>Cakupan global</span></div>'+emptyPanel('Konten Jelajah belum tersedia','Konten publik dan direktori akan ditampilkan setelah sumber data PLUITS terhubung.')+'</section><section class="social-home-section"><div class="social-section-heading"><h2>Kategori</h2></div><div class="social-category-grid">'+['Orang & Komunitas','Feed & Reels','Blog','Tempat & Restoran','Produk Lokal','Transportasi & Layanan'].map(label=>'<article><strong>'+label+'</strong><span>Segera terhubung</span></article>').join('')+'</div></section>');}
export function mountMessagesPage({root}={}) {
 root.innerHTML=shell('Pesan','Pusat percakapan dan komunikasi Anda di PLUITS.','messages','<section class="social-home-section"><div class="social-section-heading"><h2>Kotak masuk</h2></div>'+emptyPanel('Belum ada percakapan','Pesan dari pengguna dan aktivitas komunikasi akan tampil di sini setelah layanan pesan diaktifkan.')+'</section>');
}
export function mountProfilePage({root,user=null,accessToken=null}={}) {
 const safe=value=>String(value??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const metadata=user?.user_metadata||{};
 let localAccountSettings={};
 try{localAccountSettings=JSON.parse(localStorage.getItem('pluits:account-settings:v1')||'{}')||{};}catch{}
 const profileSetupMode=!user;
 const guestPreview=false;
 const name=safe(localAccountSettings.displayName||metadata.display_name||metadata.full_name||metadata.name||(profileSetupMode?'Profil Anda':'Pengguna PLUITS'));
 const username=safe(localAccountSettings.username||metadata.username||(profileSetupMode?'atur_nama_pengguna':'nama_pengguna'));
 const level=String(metadata.account_level||'regular').toLowerCase();
 const allowedLevels=['regular','silver','gold','platinum','priority'];
 const accountLevel=allowedLevels.includes(level)?level:'regular';
 const verified=Boolean(metadata.is_verified||metadata.verified||user?.email_confirmed_at);
 const badgeLabel=accountLevel==='regular'?'Regular':accountLevel.charAt(0).toUpperCase()+accountLevel.slice(1);
 const initial=name.trim().charAt(0).toUpperCase()||'P';

 const bio=safe(metadata.bio||metadata.about||'Cerita, aktivitas, dan koneksi saya di PLUITS.');
 const location=safe(metadata.location||metadata.city||'Bali, Indonesia');
 const followers=Number(metadata.followers_count||0);
 const following=Number(metadata.following_count||0);
 const postsCount=Number(metadata.posts_count||0);

 let ownedStores=[];
 let professionalServices=[];
 const businessTabs=()=>{
  const tabs=[];
  if(ownedStores.length)tabs.push('<button type="button" role="tab" id="profile-tab-store" aria-controls="profile-panel-store" aria-selected="false" data-profile-tab="store">'+renderIcon('store')+'<span>Toko</span></button>');
  if(professionalServices.length)tabs.push('<button type="button" role="tab" id="profile-tab-service" aria-controls="profile-panel-service" aria-selected="false" data-profile-tab="service">'+renderIcon('briefcase')+'<span>Layanan</span></button>');
  return tabs.join('');
 };
 const businessPanels=()=>{
  const panels=[];
  if(ownedStores.length){
   const listClass=ownedStores.length>3?'social-profile-entity-list is-carousel':'social-profile-entity-list';
   panels.push('<section class="social-profile-tab-panel" role="tabpanel" id="profile-panel-store" aria-labelledby="profile-tab-store" data-profile-panel="store" hidden><div class="'+listClass+'">'+ownedStores.map(store=>'<article class="social-profile-business-card"><span class="social-profile-business-icon">'+renderIcon('store')+'</span><div><strong>'+safe(store.name)+'</strong><p>'+safe([store.public_area,store.public_city].filter(Boolean).join(', '))+'</p><small>'+safe(store.description||'Toko aktif dan terverifikasi di PLUITS')+'</small></div></article>').join('')+'</div>'+emptyPanel('Produk unggulan belum dipilih','Bagian ini hanya menampilkan produk yang dipilih pemilik sebagai unggulan. Katalog lengkap tetap berada di homepage toko.')+'</section>');
  }
  if(professionalServices.length){
   const listClass=professionalServices.length>3?'social-profile-entity-list is-carousel':'social-profile-entity-list';
   panels.push('<section class="social-profile-tab-panel" role="tabpanel" id="profile-panel-service" aria-labelledby="profile-tab-service" data-profile-panel="service" hidden><div class="'+listClass+'">'+professionalServices.map(service=>'<article class="social-profile-business-card"><span class="social-profile-business-icon">'+renderIcon('briefcase')+'</span><div><strong>'+safe(service.display_name||service.username)+'</strong><p>'+safe(service.headline||service.profession_category||'Layanan profesional')+'</p><small>'+safe(service.bio||'Profil layanan aktif dan publik')+'</small></div></article>').join('')+'</div></section>');
  }
  return panels.join('');
 };
 const profileContent='<section class="social-profile-page">'
  +'<section class="social-profile-card" aria-label="Identitas profil">'
  +(profileSetupMode?'<div class="social-profile-preview-label">Penyiapan profil pribadi · perubahan tampilan belum tersimpan ke akun</div>':'')
  +'<a class="social-profile-gear" href="'+routeHref('settings')+'" aria-label="Buka Pusat Pengaturan Akun" title="Pusat Pengaturan Akun"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"/><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg></a>'
  +'<div class="social-profile-cover-region"><div class="social-profile-cover"><span class="social-profile-cover-label">PLUITS · PROFILE</span><span class="social-profile-cover-glow" aria-hidden="true"></span></div>'+renderProfileCoverMenuTrigger()+'</div>'
  +renderProfileCoverMenu()
  +'<div class="social-profile-identity-row"><div class="social-profile-avatar-wrap"><a class="social-profile-avatar-story-link" href="'+routeHref('dashboard')+'" aria-label="Buat Story melalui Create" title="Buat Story"><div class="social-profile-avatar" role="img" aria-label="Avatar placeholder laki-laki"><svg class="social-profile-avatar-placeholder" viewBox="0 0 120 120" aria-hidden="true" focusable="false"><circle cx="60" cy="39" r="21" fill="currentColor"/><path d="M19 111c2-25 18-41 41-41s39 16 41 41" fill="currentColor"/></svg></div><span class="social-profile-story-plus" aria-hidden="true">+</span></a></div>'
  +'<div class="social-profile-identity"><h1>'+name+'</h1><p>@'+username+'</p><div class="social-profile-meta-row"><span class="social-profile-location"><span class="social-profile-country-flag" role="img" aria-label="Bendera Indonesia">🇮🇩</span><span>'+location+'</span></span><div class="social-profile-follow-stats"><span><strong>'+followers.toLocaleString('id-ID')+'</strong><small>Followers</small></span><span><strong>'+following.toLocaleString('id-ID')+'</strong><small>Following</small></span></div></div><div class="social-account-line"><span class="social-account-badge is-'+accountLevel+'">'+badgeLabel+'</span>'+(accountLevel==='regular'&&verified?'<span class="social-account-verified" role="img" aria-label="Terverifikasi" title="Terverifikasi"><svg viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M10 1.4 12 3l2.6-.1 1 2.4 2.2 1.4-.7 2.5.7 2.5-2.2 1.4-1 2.4-2.6-.1-2 1.6-2-1.6-2.6.1-1-2.4-2.2-1.4.7-2.5-.7-2.5 2.2-1.4 1-2.4 2.6.1L10 1.4Z"/><path d="m6.5 10 2.2 2.2 4.8-4.8" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>':'')+(accountLevel==='regular'?'<a class="social-account-upgrade" href="'+routeHref('settings')+'">Upgrade</a>':'')+'</div><p class="social-profile-bio">'+bio+'</p>'++'</div></div>'
  +'<div class="social-profile-stats"><div><strong>'+postsCount.toLocaleString('id-ID')+'</strong><span>Postingan</span></div></div>'
  +(guestPreview?'<div class="social-profile-actions"><button type="button" class="social-profile-primary" disabled aria-disabled="true" title="Fitur mengikuti akan aktif setelah backend PLUITS tersedia">Ikuti · segera tersedia</button><button type="button" class="social-profile-secondary" data-profile-share>Bagikan profil</button></div>':'<div class="social-profile-actions"><a class="social-profile-primary" href="'+routeHref('settings')+'">Edit profil</a><a class="social-profile-secondary" href="'+routeHref('dashboard')+'">Akun Bisnis</a><button type="button" class="social-profile-secondary" data-profile-quick aria-expanded="false">Pengaturan Profil Cepat</button></div>')
  +'<section class="social-profile-quick-panel" data-profile-quick-panel hidden><div class="social-profile-quick-heading"><strong>Pengaturan Profil Cepat</strong><span>Kelola informasi dan visibilitas profil Anda</span></div>'
  +'<a href="'+routeHref('settings')+'"><span>'+renderIcon('image')+'Foto profil</span><b>Kelola →</b></a>'
  +'<a href="'+routeHref('settings')+'"><span>'+renderIcon('book')+'Bio</span><b>Kelola →</b></a>'
  +'<a href="'+routeHref('settings')+'"><span>'+renderIcon('mapPin')+'Alamat</span><b>Kelola →</b></a>'
  +'<a href="'+routeHref('settings')+'"><span>'+renderIcon('mail')+'Kontak</span><b>Kelola →</b></a>'
  +'<a href="'+routeHref('settings')+'"><span>'+renderIcon('lock')+'Privasi profil · Publik / Privat</span><b>Kelola →</b></a></section>'
  +'</section>'
  +'<div class="social-profile-tabs" role="tablist" aria-label="Konten profil">'
  +'<button type="button" class="is-active is-icon-only" role="tab" id="profile-tab-feed" aria-label="Feed" aria-controls="profile-panel-feed" aria-selected="true" data-profile-tab="feed">'+renderIcon('grid')+'</button>'
  +'<button type="button" role="tab" id="profile-tab-reels" aria-controls="profile-panel-reels" aria-selected="false" data-profile-tab="reels">'+renderIcon('film')+'<span>Reels</span></button>'
  +'<button type="button" role="tab" id="profile-tab-trips" aria-controls="profile-panel-trips" aria-selected="false" data-profile-tab="trips">'+renderIcon('map')+'<span>Trips</span></button>'
  +'<button type="button" role="tab" id="profile-tab-blog" aria-controls="profile-panel-blog" aria-selected="false" data-profile-tab="blog">'+renderIcon('fileText')+'<span>Blog</span></button>'
  +businessTabs()
  +'</div>'
  +'<section class="social-profile-tab-panel is-active" role="tabpanel" id="profile-panel-feed" aria-labelledby="profile-tab-feed" data-profile-panel="feed">'+(guestPreview?emptyPanel('Belum ada postingan','Postingan publik profil akan tampil di sini setelah konten tersedia.'):emptyPanel('Memuat postingan Anda','Profil sedang mengambil Feed dari server PLUITS.',true))+'</section>'
  +'<section class="social-profile-tab-panel" role="tabpanel" id="profile-panel-reels" aria-labelledby="profile-tab-reels" data-profile-panel="reels" hidden>'+emptyPanel('Belum ada Reels','Video pendek yang dipublikasikan akan tampil di sini.')+'</section>'
  +'<section class="social-profile-tab-panel" role="tabpanel" id="profile-panel-trips" aria-labelledby="profile-tab-trips" data-profile-panel="trips" hidden>'+emptyPanel('Belum ada Trips','Perjalanan dan cerita perjalanan yang dipublikasikan akan tampil di sini.')+'</section>'
  +'<section class="social-profile-tab-panel" role="tabpanel" id="profile-panel-blog" aria-labelledby="profile-tab-blog" data-profile-panel="blog" hidden>'+emptyPanel('Belum ada Blog','Artikel blog yang dipublikasikan akan tampil di sini.')+'</section>'
  +businessPanels()
  +'</section>';
 root.innerHTML='<div class="pl-page-shell social-shell social-profile-shell">'+renderPageHeader({brandHref:routeHref('home'),label:'PLUITS — Profil',rightContent:'<div class="social-header-tools"><span>'+(profileSetupMode?'Profil Saya':'Profil')+'</span><a href="'+routeHref('settings')+'">Pengaturan</a></div>',className:'social-header'})+'<main class="pl-page-main social-main">'+profileContent+'</main>'+bottomNav('profile')+'</div>';
 const unmountCoverControls=mountProfileCoverControls({root,profileKey:user?.id||username});
 const controller=new AbortController();
 root.addEventListener('click',event=>{
  const tab=event.target.closest('[data-profile-tab]');
  if(tab&&root.contains(tab)){
   const selected=tab.dataset.profileTab;
   root.querySelectorAll('[data-profile-tab]').forEach(item=>{
    const active=item===tab;
    item.classList.toggle('is-active',active);
    item.setAttribute('aria-selected',String(active));
   });
   root.querySelectorAll('[data-profile-panel]').forEach(panel=>{
    const active=panel.dataset.profilePanel===selected;
    panel.classList.toggle('is-active',active);
    panel.hidden=!active;
   });
   return;
  }
  const share=event.target.closest('[data-profile-share]');
  if(share&&root.contains(share)){
   const shareUrl=window.location.href;
   if(navigator.share){navigator.share({title:name+' · PLUITS',text:'Lihat profil '+name+' di PLUITS',url:shareUrl}).catch(()=>{});}
   else if(navigator.clipboard?.writeText){navigator.clipboard.writeText(shareUrl).then(()=>{share.textContent='Tautan tersalin';}).catch(()=>{share.textContent='Salin tautan: '+shareUrl;});}
   else {share.textContent='Tautan: '+shareUrl;}
   return;
  }
  const quick=event.target.closest('[data-profile-quick]');
  if(!quick||!root.contains(quick))return;
  const panel=root.querySelector('[data-profile-quick-panel]');
  const expanded=quick.getAttribute('aria-expanded')==='true';
  quick.setAttribute('aria-expanded',String(!expanded));
  panel.hidden=expanded;
 });

 const feedPanel=root.querySelector('[data-profile-panel="feed"]');
 const renderPost=post=>'<article class="social-profile-post"><div class="social-profile-post-meta"><span>'+safe(post.visibility==='private'?'Privat':'Publik')+'</span><time>'+safe(post.created_at?new Date(post.created_at).toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'}):'')+'</time></div><p>'+safe(post.caption)+'</p></article>';
 const showFeedState=(title,description)=>emptyPanel(title,description);
 const loadOwnFeed=async()=>{
  if(!feedPanel)return;
  if(!API_BASE_URL||!accessToken){feedPanel.innerHTML=showFeedState('Feed belum terhubung','Sesi akun atau layanan backend PLUITS belum tersedia.');return;}
  try{
   const response=await fetch(API_BASE_URL+'/v1/social/posts/me',{headers:{Accept:'application/json',Authorization:'Bearer '+accessToken},mode:'cors',credentials:'omit',cache:'no-store',signal:controller.signal});
   if(!response.ok)throw new Error('Feed pribadi belum dapat dimuat.');
   const payload=await response.json();
   const posts=Array.isArray(payload.posts)?payload.posts:[];
   feedPanel.innerHTML=posts.length?posts.map(renderPost).join(''):showFeedState('Belum ada postingan','Postingan yang Anda terbitkan akan tampil di sini.');
  }catch(error){if(error.name!=='AbortError')feedPanel.innerHTML=showFeedState('Feed belum dapat dimuat','Periksa koneksi lalu buka kembali halaman Profil.');}
 };
 loadOwnFeed();
 return ()=>{controller.abort();unmountCoverControls();};

}
export function mountSettingsPage({root,user=null,onSignOut}={}) {
 const safe=value=>String(value??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const email=safe(user?.email||'Email tidak tersedia');
 const storageKey='pluits:account-settings:v1';
 const readSettings=()=>{
  try{return JSON.parse(localStorage.getItem(storageKey)||'{}')||{};}catch{return {};}
 };
 const saved=readSettings();
 const initialName=String(saved.displayName||user?.user_metadata?.display_name||user?.user_metadata?.full_name||user?.user_metadata?.name||'');
 const initialUsername=String(saved.username||user?.user_metadata?.username||'');
 const initialPrivacy=['public','private','friends'].includes(saved.privacy)?saved.privacy:'public';
 const sections=[
  {id:'privacy',label:'Privasi',icon:'lock',title:'Privasi profil',desc:'Tentukan siapa yang dapat melihat profil dan aktivitas publik Anda.'},
  {id:'displayName',label:'Nama Profil',icon:'user',title:'Atur nama profil',desc:'Nama yang akan ditampilkan pada halaman profil Anda.'},
  {id:'username',label:'Nama Pengguna',icon:'user',title:'Atur nama pengguna',desc:'Nama unik yang digunakan sebagai identitas @username Anda.'},
  {id:'account',label:'Akun',icon:'mail',title:'Akun & keamanan',desc:'Informasi akun yang digunakan untuk masuk ke PLUITS.'},
  {id:'notifications',label:'Notifikasi',icon:'bell',title:'Notifikasi',desc:'Preferensi pemberitahuan dari aktivitas PLUITS.'},
  {id:'cover',label:'Tema Profil',icon:'image',title:'Tema & sampul profil',desc:'Pengaturan tampilan dan sampul profil Anda.'},
  {id:'app',label:'Aplikasi',icon:'book',title:'Preferensi aplikasi',desc:'Pengaturan pengalaman penggunaan aplikasi PLUITS.'}
 ];
 let active='privacy';
 const renderField=(label,id,value,hint,maxlength=40)=>'<label class="social-settings-field" for="'+id+'"><span>'+label+'</span><input id="'+id+'" name="'+id+'" type="text" value="'+safe(value)+'" maxlength="'+maxlength+'" autocomplete="off" /><small>'+hint+'</small></label>';
 const localNote='<div class="social-settings-note">Mode pratinjau frontend: perubahan saat ini disimpan di browser/perangkat ini. Pengaturan belum disinkronkan ke server dan belum menjadi aturan akses privasi lintas pengguna.</div>';
 const render=()=>{
  const selected=sections.find(item=>item.id===active)||sections[0];
  let detail='';
  if(active==='privacy'){
   detail='<form class="social-settings-form" data-settings-form="privacy"><fieldset class="social-settings-choice-group"><legend>Siapa yang dapat melihat profil Anda?</legend>'
    +'<label class="social-settings-choice"><input type="radio" name="privacy" value="public" '+(saved.privacy==='public'||!saved.privacy?'checked':'')+' /><span><strong>Publik</strong><small>Semua orang dapat melihat profil dan konten yang Anda bagikan secara publik.</small></span></label>'
    +'<label class="social-settings-choice"><input type="radio" name="privacy" value="private" '+(saved.privacy==='private'?'checked':'')+' /><span><strong>Privat</strong><small>Profil dibatasi; orang lain perlu mendapatkan persetujuan untuk mengikuti Anda.</small></span></label>'
    +'<label class="social-settings-choice"><input type="radio" name="privacy" value="friends" '+(saved.privacy==='friends'?'checked':'')+' /><span><strong>Hanya Teman</strong><small>Profil dan konten dibatasi untuk akun yang sudah menjadi teman Anda.</small></span></label>'
    +'</fieldset><button class="social-settings-save" type="submit">Simpan pengaturan privasi</button></form>'+localNote;
  }else if(active==='displayName'){
   detail='<form class="social-settings-form" data-settings-form="displayName">'+renderField('Nama profil','settings-display-name',initialName,'Nama ini tampil sebagai nama utama di profil.',60)+'<button class="social-settings-save" type="submit">Simpan nama profil</button></form>'+localNote;
  }else if(active==='username'){
   detail='<form class="social-settings-form" data-settings-form="username">'+renderField('Nama pengguna','settings-username',initialUsername,'Gunakan huruf kecil, angka, titik, atau garis bawah. Tanpa simbol @.',30)+'<div class="social-settings-username-preview">PLUITS / <strong>@<span data-username-preview>'+safe(initialUsername||'nama_pengguna')+'</span></strong></div><button class="social-settings-save" type="submit">Simpan nama pengguna</button></form>'+localNote;
  }else if(active==='account'){
   detail='<div class="social-settings-detail-row"><span>Email akun</span><strong>'+email+'</strong></div><div class="social-settings-detail-row"><span>Metode masuk</span><strong>Email & kata sandi</strong></div><div class="social-settings-note">Perubahan email dan kata sandi dikelola melalui alur keamanan akun. Kata sandi tidak ditampilkan di halaman ini.</div>';
  }else if(active==='notifications'){
   detail='<div class="social-settings-detail-row"><span>Notifikasi aplikasi</span><strong>Belum terhubung</strong></div><div class="social-settings-note">Preferensi notifikasi akan tersedia setelah layanan notifikasi PLUITS diaktifkan.</div>';
  }else if(active==='cover'){
   detail='<div class="social-settings-detail-row"><span>Desain sampul profil</span><strong>Tetap tersedia</strong></div><div class="social-settings-note">Pengaturan sampul tetap dikelola melalui kontrol sampul pada halaman profil.</div>';
  }else{
   detail='<div class="social-settings-detail-row"><span>Pengalaman aplikasi</span><strong>Versi aplikasi web</strong></div><div class="social-settings-note">Pengaturan bahasa dan tampilan lanjutan belum diaktifkan.</div>';
  }
  root.innerHTML=shell('Pengaturan','Pusat pengaturan akun dan pengalaman Anda di PLUITS.','profile',
   '<section class="social-settings-layout"><nav class="social-settings-menu" role="tablist" aria-label="Pusat Pengaturan Akun">'+sections.map(item=>'<button type="button" role="tab" id="settings-tab-'+item.id+'" aria-controls="settings-panel-'+item.id+'" aria-selected="'+(active===item.id?'true':'false')+'" tabindex="'+(active===item.id?'0':'-1')+'" data-settings-tab="'+item.id+'" class="'+(active===item.id?'is-active':'')+'">'+renderIcon(item.icon)+'<span>'+item.label+'</span><b aria-hidden="true">›</b></button>').join('')+'</nav>'
   +'<section class="social-settings-panel" role="tabpanel" id="settings-panel-'+selected.id+'" aria-labelledby="settings-tab-'+selected.id+'"><div class="social-settings-panel-heading"><span class="social-kicker">PUSAT PENGATURAN AKUN</span><h2>'+selected.title+'</h2><p>'+selected.desc+'</p></div>'+detail+'</section>'
   +'<section class="social-settings-account"><div><strong>Keluar dari PLUITS</strong><p>Akhiri sesi akun pada perangkat ini.</p></div><button type="button" class="social-signout-button" data-sign-out>'+renderIcon('logout')+'<span>Keluar</span></button></section>'
   +'<a class="social-settings-back" href="'+routeHref('profile')+'">Kembali ke profil</a></section>');
 };
 const persist=()=>{try{localStorage.setItem(storageKey,JSON.stringify(saved));return true;}catch{return false;}};
 render();
 root.addEventListener('keydown',event=>{
  const tab=event.target.closest('[data-settings-tab]');
  if(tab&&root.contains(tab)){
   const current=sections.findIndex(item=>item.id===tab.dataset.settingsTab);
   let next=current;
   if(event.key==='ArrowDown'||event.key==='ArrowRight')next=(current+1)%sections.length;
   else if(event.key==='ArrowUp'||event.key==='ArrowLeft')next=(current-1+sections.length)%sections.length;
   else if(event.key==='Home')next=0;
   else if(event.key==='End')next=sections.length-1;
   else return;
   event.preventDefault();active=sections[next].id;render();root.querySelector('[data-settings-tab="'+active+'"]')?.focus();
   return;
  }
  if(event.target?.id==='settings-username'&&event.target.matches('input')){
   const preview=root.querySelector('[data-username-preview]');if(preview)preview.textContent=event.target.value.toLowerCase().replace(/[^a-z0-9._]/g,'');
  }
 });
 root.addEventListener('input',event=>{
  if(event.target?.id==='settings-username'){
   const preview=root.querySelector('[data-username-preview]');if(preview)preview.textContent=event.target.value.toLowerCase().replace(/[^a-z0-9._]/g,'');
  }
 });
 root.addEventListener('submit',event=>{
  const form=event.target.closest('[data-settings-form]');
  if(!form||!root.contains(form))return;
  event.preventDefault();
  const type=form.dataset.settingsForm;
  if(type==='privacy'){
   saved.privacy=form.querySelector('input[name="privacy"]:checked')?.value||'public';
  }else if(type==='displayName'){
   const value=form.querySelector('#settings-display-name')?.value.trim()||'';
   if(!value){window.alert('Masukkan nama profil terlebih dahulu.');return;}
   saved.displayName=value;
  }else if(type==='username'){
   const value=(form.querySelector('#settings-username')?.value||'').trim().toLowerCase();
   if(!/^[a-z0-9._]{3,30}$/.test(value)){window.alert('Nama pengguna harus 3–30 karakter dan hanya boleh berisi huruf kecil, angka, titik, atau garis bawah.');return;}
   saved.username=value;
  }
  if(!persist()){window.alert('Pengaturan tidak dapat disimpan di browser ini.');return;}
  const button=form.querySelector('button[type="submit"]');
  if(button){const original=button.textContent;button.textContent='Tersimpan di perangkat ini';button.disabled=true;window.setTimeout(()=>{if(button.isConnected){button.textContent=original;button.disabled=false;}},1800);}
 });
 root.addEventListener('click',async event=>{
  const tab=event.target.closest('[data-settings-tab]');
  if(tab&&root.contains(tab)){active=tab.dataset.settingsTab;render();return;}
  const signout=event.target.closest('[data-sign-out]');
  if(signout&&root.contains(signout)){
   if(!onSignOut||!window.confirm('Keluar dari akun PLUITS pada perangkat ini?'))return;
   signout.disabled=true;signout.textContent='Memproses…';
   try{const result=await onSignOut();if(result?.error)throw result.error;}
   catch(error){signout.disabled=false;signout.textContent='Keluar';window.alert(error?.message||'Tidak dapat keluar. Silakan coba lagi.');}
  }
 });
}
