import { routeHref } from '../../config/paths.js';
import '../../design-system/page-shell.css';
import { renderBrand } from '../../design-system/page-shell.js';
import { renderIcon } from '../../design-system/icons.js';
import { supabase } from '../../lib/supabase/client.js';
import './social-pages.css';

function bottomNav(active){
 return '<nav class="global-bottom-nav" aria-label="Navigasi aplikasi">'
 + '<a href="'+routeHref('social')+'" class="'+(active==='social'?'is-active':'')+'">'+renderIcon('book')+'<span>Beranda</span></a>'
 + '<a href="'+routeHref('discover')+'" class="'+(active==='discover'?'is-active':'')+'">'+renderIcon('eye')+'<span>Jelajah</span></a>'
 + '<a class="social-plus" href="'+routeHref('dashboard')+'" aria-label="Buka Ruang Kerja"><span>+</span></a>'
 + '<a href="'+routeHref('messages')+'" class="'+(active==='messages'?'is-active':'')+'">'+renderIcon('message')+'<span>Pesan</span></a>'
 + '<a href="'+routeHref('profile')+'" class="'+(active==='profile'?'is-active':'')+'">'+renderIcon('user')+'<span>Profil</span></a></nav>';
}
function shell(title,subtitle,active,content){
 return '<div class="pl-page-shell social-shell"><header class="pl-page-header social-header"><div class="social-brand">'+renderBrand({href:routeHref('home'),label:'PLUITS'})+'<span>'+title+'</span></div><a href="'+routeHref('profile')+'">Profil</a></header><main class="pl-page-main social-main"><section class="social-intro"><span class="social-kicker">PLUITS · '+title.toUpperCase()+'</span><h1>'+title+'</h1><p>'+subtitle+'</p></section>'+content+'</main>'+bottomNav(active)+'</div>';
}
function emptyPanel(title,text){return '<section class="social-empty-panel"><span>'+renderIcon('eye')+'</span><strong>'+title+'</strong><p>'+text+'</p></section>';}
export function mountCircleHomePage({root}={}){root.innerHTML=shell('Beranda Circle','Ruang personal yang mengikuti Circle, minat, dan konteks lokasi Anda.','social','<section class="social-home-section"><div class="social-section-heading"><h2>Circle Anda</h2><a href="'+routeHref('discover')+'">Temukan akun →</a></div>'+emptyPanel('Belum ada aktivitas Circle','Postingan dan pembaruan dari akun dalam Circle Anda akan muncul di sini.')+'</section><section class="social-home-section"><div class="social-section-heading"><h2>Di sekitar Anda</h2><span>Berbasis lokasi</span></div>'+emptyPanel('Rekomendasi lokasi belum tersedia','Aktifkan izin lokasi jika ingin melihat rekomendasi yang lebih akurat. Anda tetap dapat menggunakan PLUITS tanpa memberikan izin lokasi.')+'</section>');}
export function mountDiscoverPage({root}={}){root.innerHTML=shell('Jelajah','Temukan orang, cerita, tempat, komunitas, dan layanan dari seluruh wilayah PLUITS.','discover','<section class="social-home-section"><div class="social-section-heading"><h2>Jelajahi Indonesia</h2><span>Cakupan global</span></div>'+emptyPanel('Konten Jelajah belum tersedia','Konten publik dan direktori akan ditampilkan setelah sumber data PLUITS terhubung.')+'</section><section class="social-home-section"><div class="social-section-heading"><h2>Kategori</h2></div><div class="social-category-grid">'+['Orang & Komunitas','Feed & Reels','Blog','Tempat & Restoran','Produk Lokal','Transportasi & Layanan'].map(label=>'<article><strong>'+label+'</strong><span>Segera terhubung</span></article>').join('')+'</div></section>');}
export function mountMessagesPage({root}={}) {
 root.innerHTML=shell('Pesan','Pusat percakapan dan komunikasi Anda di PLUITS.','messages','<section class="social-home-section"><div class="social-section-heading"><h2>Kotak masuk</h2></div>'+emptyPanel('Belum ada percakapan','Pesan dari pengguna dan aktivitas komunikasi akan tampil di sini setelah layanan pesan diaktifkan.')+'</section>');
}
export function mountProfilePage({root,user=null}={}) {
 const safe=value=>String(value??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const metadata=user?.user_metadata||{};
 const name=safe(metadata.display_name||metadata.full_name||metadata.name||'Pengguna PLUITS');
 const username=safe(metadata.username||'nama_pengguna');
 const level=String(metadata.account_level||'regular').toLowerCase();
 const allowedLevels=['regular','silver','gold','platinum','priority'];
 const accountLevel=allowedLevels.includes(level)?level:'regular';
 const verified=Boolean(metadata.is_verified||metadata.verified||user?.email_confirmed_at);
 const badgeLabel=accountLevel==='regular'?'Regular':accountLevel.charAt(0).toUpperCase()+accountLevel.slice(1);
 const initial=name.trim().charAt(0).toUpperCase()||'P';
 const bubbleDemo='<section class="social-profile-bubble-demo" aria-label="Demo Bubble Connections">'
  +'<div class="social-profile-cover"><span class="social-profile-cover-label">LIVING COVER · DEMO</span><span class="social-profile-cover-glow" aria-hidden="true"></span></div>'
  +'<div class="social-profile-bubble-field" data-bubble-field aria-label="Simulasi gelembung koneksi sosial">'
  +'<button type="button" class="social-profile-bubble is-large" data-bubble data-name="Pasangan" data-description="Contoh koneksi pasangan" aria-label="Demo gelembung Pasangan"><span class="social-profile-bubble-avatar is-portrait" aria-hidden="true"><svg viewBox="0 0 64 64" focusable="false"><circle cx="32" cy="32" r="31" fill="#e7e8df"/><path d="M13 29c0-15 8-23 20-23 12 0 20 9 19 23-5-5-10-8-18-8-7 0-14 3-21 8Z" fill="#34444a"/><ellipse cx="32" cy="34" rx="17" ry="20" fill="#d99d78"/><path d="M22 32q3-3 6 0M36 32q3-3 6 0" fill="none" stroke="#46352f" stroke-width="2" stroke-linecap="round"/><circle cx="25" cy="36" r="1.5" fill="#3b302d"/><circle cx="39" cy="36" r="1.5" fill="#3b302d"/><path d="M27 44q5 5 10 0" fill="none" stroke="#8f5146" stroke-width="2" stroke-linecap="round"/><path d="M17 58q4-12 15-12t15 12" fill="#547b78"/></svg></span></button>'
  +'<button type="button" class="social-profile-bubble is-medium" data-bubble data-name="Keluarga" data-description="Contoh koneksi keluarga" aria-label="Demo gelembung Keluarga"><span class="social-profile-bubble-avatar is-portrait" aria-hidden="true"><svg viewBox="0 0 64 64" focusable="false"><defs><linearGradient id="bubble-face-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7e8d9"/><stop offset="1" stop-color="#d6e8e4"/></linearGradient></defs><circle cx="32" cy="32" r="31" fill="url(#bubble-face-bg)"/><path d="M13 29c0-15 8-23 20-23 12 0 20 9 19 23-5-5-10-8-18-8-7 0-14 3-21 8Z" fill="#34444a"/><ellipse cx="32" cy="34" rx="17" ry="20" fill="#d99d78"/><path d="M22 32q3-3 6 0M36 32q3-3 6 0" fill="none" stroke="#46352f" stroke-width="2" stroke-linecap="round"/><circle cx="25" cy="36" r="1.5" fill="#3b302d"/><circle cx="39" cy="36" r="1.5" fill="#3b302d"/><path d="M27 44q5 5 10 0" fill="none" stroke="#8f5146" stroke-width="2" stroke-linecap="round"/><path d="M17 58q4-12 15-12t15 12" fill="#547b78"/></svg></span></button>'
  +'<button type="button" class="social-profile-bubble is-small" data-bubble data-name="Sahabat" data-description="Contoh koneksi sahabat" aria-label="Demo gelembung Sahabat"><span class="social-profile-bubble-avatar is-portrait" aria-hidden="true"><svg viewBox="0 0 64 64" focusable="false"><defs><linearGradient id="bubble-face-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7e8d9"/><stop offset="1" stop-color="#d6e8e4"/></linearGradient></defs><circle cx="32" cy="32" r="31" fill="url(#bubble-face-bg)"/><path d="M13 29c0-15 8-23 20-23 12 0 20 9 19 23-5-5-10-8-18-8-7 0-14 3-21 8Z" fill="#34444a"/><ellipse cx="32" cy="34" rx="17" ry="20" fill="#d99d78"/><path d="M22 32q3-3 6 0M36 32q3-3 6 0" fill="none" stroke="#46352f" stroke-width="2" stroke-linecap="round"/><circle cx="25" cy="36" r="1.5" fill="#3b302d"/><circle cx="39" cy="36" r="1.5" fill="#3b302d"/><path d="M27 44q5 5 10 0" fill="none" stroke="#8f5146" stroke-width="2" stroke-linecap="round"/><path d="M17 58q4-12 15-12t15 12" fill="#547b78"/></svg></span></button>'
  +'<button type="button" class="social-profile-bubble is-tiny" data-bubble data-name="Circle" data-description="Contoh anggota lingkaran sosial" aria-label="Demo gelembung Circle"><span class="social-profile-bubble-avatar is-portrait" aria-hidden="true"><svg viewBox="0 0 64 64" focusable="false"><defs><linearGradient id="bubble-face-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7e8d9"/><stop offset="1" stop-color="#d6e8e4"/></linearGradient></defs><circle cx="32" cy="32" r="31" fill="url(#bubble-face-bg)"/><path d="M13 29c0-15 8-23 20-23 12 0 20 9 19 23-5-5-10-8-18-8-7 0-14 3-21 8Z" fill="#34444a"/><ellipse cx="32" cy="34" rx="17" ry="20" fill="#d99d78"/><path d="M22 32q3-3 6 0M36 32q3-3 6 0" fill="none" stroke="#46352f" stroke-width="2" stroke-linecap="round"/><circle cx="25" cy="36" r="1.5" fill="#3b302d"/><circle cx="39" cy="36" r="1.5" fill="#3b302d"/><path d="M27 44q5 5 10 0" fill="none" stroke="#8f5146" stroke-width="2" stroke-linecap="round"/><path d="M17 58q4-12 15-12t15 12" fill="#547b78"/></svg></span></button>'
  +'</div><div class="social-profile-bubble-caption"><span class="social-profile-bubble-status" data-bubble-status aria-live="polite">Pratinjau interaksi · sentuh gelembung atau geser perlahan</span><button type="button" data-bubble-motion>Aktifkan gerak HP</button></div>'
  +'<p class="social-profile-bubble-note">Demo visual · belum ada akun atau hubungan yang terhubung</p></section>';
 let ownedStores=[];
 let professionalServices=[];
 let profileLoadController=new AbortController();
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
  +bubbleDemo
  +'<section class="social-profile-card" aria-label="Identitas profil">'
  +'<a class="social-profile-gear" href="'+routeHref('settings')+'" aria-label="Pusat pengaturan akun" title="Pusat pengaturan akun">'+renderIcon('settings')+'</a>'
  +'<div class="social-profile-avatar-wrap"><div class="social-profile-avatar">'+initial+'</div><div class="social-account-line"><span class="social-account-badge is-'+accountLevel+'">'+badgeLabel+'</span>'+(accountLevel==='regular'&&verified?'<span class="social-account-verified" role="img" aria-label="Terverifikasi" title="Terverifikasi"><svg viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M10 1.4 12 3l2.6-.1 1 2.4 2.2 1.4-.7 2.5.7 2.5-2.2 1.4-1 2.4-2.6-.1-2 1.6-2-1.6-2.6.1-1-2.4-2.2-1.4.7-2.5-.7-2.5 2.2-1.4 1-2.4 2.6.1L10 1.4Z"/><path d="m6.5 10 2.2 2.2 4.8-4.8" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>':'')+(accountLevel==='regular'?'<a class="social-account-upgrade" href="#/settings">Upgrade</a>':'')+'</div></div>'
  +'<div class="social-profile-identity"><h1>'+name+'</h1><p>@'+username+'</p></div>'
  +'<div class="social-profile-stats"><div><strong>—</strong><span>Pengikut</span></div><div><strong>—</strong><span>Mengikuti</span></div><div><strong>—</strong><span>Diikuti</span></div></div>'
  +'<div class="social-profile-actions"><a class="social-profile-primary" href="#/settings">Upgrade / Langganan</a><button type="button" class="social-profile-secondary" data-profile-quick aria-expanded="false">Pengaturan Profil Cepat</button></div>'
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
  +'<section class="social-profile-tab-panel is-active" role="tabpanel" id="profile-panel-feed" aria-labelledby="profile-tab-feed" data-profile-panel="feed">'+emptyPanel('Belum ada postingan','Postingan foto dan konten Feed yang dipublikasikan akan tampil di sini.')+'</section>'
  +'<section class="social-profile-tab-panel" role="tabpanel" id="profile-panel-reels" aria-labelledby="profile-tab-reels" data-profile-panel="reels" hidden>'+emptyPanel('Belum ada Reels','Video pendek yang dipublikasikan akan tampil di sini.')+'</section>'
  +'<section class="social-profile-tab-panel" role="tabpanel" id="profile-panel-trips" aria-labelledby="profile-tab-trips" data-profile-panel="trips" hidden>'+emptyPanel('Belum ada Trips','Perjalanan dan cerita perjalanan yang dipublikasikan akan tampil di sini.')+'</section>'
  +'<section class="social-profile-tab-panel" role="tabpanel" id="profile-panel-blog" aria-labelledby="profile-tab-blog" data-profile-panel="blog" hidden>'+emptyPanel('Belum ada Blog','Artikel blog yang dipublikasikan akan tampil di sini.')+'</section>'
  +businessPanels()
  +'</section>';
 root.innerHTML='<div class="pl-page-shell social-shell"><header class="pl-page-header social-header"><div class="social-brand">'+renderBrand({href:routeHref('home'),label:'PLUITS'})+'<span>Profil</span></div><a href="'+routeHref('settings')+'">Pengaturan akun</a></header><main class="pl-page-main social-main">'+profileContent+'</main>'+bottomNav('profile')+'</div>';
 const loadBusinessPresence=async()=>{
  if(!user?.id)return;
  const [storesResult,servicesResult]=await Promise.all([
   supabase.from('stores').select('id,name,username,description,public_city,public_area').eq('owner_user_id',user.id).eq('store_status','active').eq('verification_status','verified').order('name'),
   supabase.from('professional_profiles').select('id,username,display_name,headline,bio,profession_category').eq('user_id',user.id).eq('profile_status','active').eq('visibility','public').order('created_at')
  ]);
  if(profileLoadController.signal.aborted)return;
  if(!storesResult.error)ownedStores=storesResult.data||[];
  if(!servicesResult.error)professionalServices=servicesResult.data||[];
  if(!profileLoadController.signal.aborted){
   root.querySelector('.social-profile-tabs')?.insertAdjacentHTML('beforeend',businessTabs());
   const panels=root.querySelectorAll('[data-profile-panel]');
   panels[panels.length-1]?.insertAdjacentHTML('afterend',businessPanels());
  }
 };
 loadBusinessPresence().catch(()=>{});
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
  const quick=event.target.closest('[data-profile-quick]');
  if(!quick||!root.contains(quick))return;
  const panel=root.querySelector('[data-profile-quick-panel]');
  const expanded=quick.getAttribute('aria-expanded')==='true';
  quick.setAttribute('aria-expanded',String(!expanded));
  panel.hidden=expanded;
 },{signal:profileLoadController.signal});

 let bubbleFrame=0,bubbleRunning=false,bubbleLastTime=0,bubbleTiltX=0,bubbleTiltY=0,bubbleWidth=0,bubbleHeight=0;
 const bubbleField=root.querySelector('[data-bubble-field]');
 const bubbleStatus=root.querySelector('[data-bubble-status]');
 const bubbleMotionButton=root.querySelector('[data-bubble-motion]');
 const bubbleElements=bubbleField?[...bubbleField.querySelectorAll('[data-bubble]')]:[];
 const reducedMotion=window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches||false;
 const bubbleStates=bubbleElements.map((element,index)=>({element,x:0,y:0,vx:[.34,-.27,.22,-.31][index]||.2,vy:[-.19,.24,.29,-.16][index]||.18,radius:0,mass:1,sx:1,sy:1,dragging:false,lastX:0,lastY:0}));
 const resizeBubbles=()=>{
  if(!bubbleField)return;
  const rect=bubbleField.getBoundingClientRect();
  bubbleWidth=rect.width;bubbleHeight=rect.height;
  bubbleStates.forEach((state,index)=>{
   state.radius=state.element.offsetWidth/2;
   if(!state.initialized){state.x=rect.width*[.23,.52,.73,.39][index];state.y=rect.height*[.48,.29,.66,.78][index];state.initialized=true;}
   state.x=Math.max(state.radius,Math.min(rect.width-state.radius,state.x));
   state.y=Math.max(state.radius,Math.min(rect.height-state.radius,state.y));
   state.mass=state.radius*state.radius;
   state.element.style.left=state.x+'px';state.element.style.top=state.y+'px';
  });
 };
 const renderBubbles=()=>{
  if(!bubbleWidth||!bubbleHeight)return;
  const width=bubbleWidth,height=bubbleHeight;
  bubbleStates.forEach(state=>state.element.classList.remove('is-contacting'));
  bubbleStates.forEach(state=>{
   if(!state.dragging){
    state.vx+=bubbleTiltX*.00055;state.vy+=bubbleTiltY*.00055;
    state.vx*=.999;state.vy*=.999;state.x+=state.vx;state.y+=state.vy;
    if(state.x<state.radius){state.x=state.radius;state.vx=Math.abs(state.vx)*.84;}
    if(state.x>width-state.radius){state.x=width-state.radius;state.vx=-Math.abs(state.vx)*.84;}
    if(state.y<state.radius){state.y=state.radius;state.vy=Math.abs(state.vy)*.84;}
    if(state.y>height-state.radius){state.y=height-state.radius;state.vy=-Math.abs(state.vy)*.84;}
   }
  });
  for(let i=0;i<bubbleStates.length;i++)for(let j=i+1;j<bubbleStates.length;j++){
   const a=bubbleStates[i],b=bubbleStates[j],dx=b.x-a.x,dy=b.y-a.y,distance=Math.hypot(dx,dy)||.001,minDistance=a.radius+b.radius;
   if(distance>=minDistance)continue;
   a.element.classList.add('is-contacting');b.element.classList.add('is-contacting');
   const nx=dx/distance,ny=dy/distance,overlap=minDistance-distance,inverseA=1/a.mass,inverseB=1/b.mass,totalInverse=inverseA+inverseB;
   if(!a.dragging){a.x-=nx*overlap*.68*(inverseA/totalInverse);a.y-=ny*overlap*.68*(inverseA/totalInverse);}
   if(!b.dragging){b.x+=nx*overlap*.68*(inverseB/totalInverse);b.y+=ny*overlap*.68*(inverseB/totalInverse);}
   const relative=(b.vx-a.vx)*nx+(b.vy-a.vy)*ny;
   if(relative<0){
    const impulse=-(1+.28)*relative/totalInverse;
    if(!a.dragging){a.vx-=impulse*inverseA*nx;a.vy-=impulse*inverseA*ny;}
    if(!b.dragging){b.vx+=impulse*inverseB*nx;b.vy+=impulse*inverseB*ny;}
    const impact=Math.min(.28,Math.max(.045,Math.abs(relative)*.15));
    if(Math.abs(nx)>Math.abs(ny)){a.sx=b.sx=1-impact;a.sy=b.sy=1+impact*.48;}
    else{a.sy=b.sy=1-impact;a.sx=b.sx=1+impact*.48;}
   }
  }
  bubbleStates.forEach(state=>{
   state.sx+=(1-state.sx)*.13;state.sy+=(1-state.sy)*.13;
   state.element.style.left=state.x+'px';state.element.style.top=state.y+'px';
   state.element.style.setProperty('--bubble-sx',state.sx.toFixed(3));state.element.style.setProperty('--bubble-sy',state.sy.toFixed(3));
  });
 };
 const animateBubbles=()=>{
  if(!bubbleRunning||profileLoadController.signal.aborted)return;
  const now=performance.now();if(now-bubbleLastTime>16){renderBubbles();bubbleLastTime=now;}
  bubbleFrame=requestAnimationFrame(animateBubbles);
 };
 const startBubbles=()=>{if(!bubbleStates.length)return;resizeBubbles();if(reducedMotion||bubbleRunning)return;bubbleRunning=true;bubbleFrame=requestAnimationFrame(animateBubbles);};
 const stopBubbles=()=>{bubbleRunning=false;if(bubbleFrame)cancelAnimationFrame(bubbleFrame);bubbleFrame=0;};
 const orientationHandler=event=>{bubbleTiltX=Math.max(-25,Math.min(25,event.gamma||0));bubbleTiltY=Math.max(-25,Math.min(25,event.beta||0));};
 const enableDeviceMotion=async()=>{
  if(!bubbleMotionButton)return;
  try{
   const sensor=window.DeviceOrientationEvent;
   if(!sensor){if(bubbleStatus)bubbleStatus.textContent='Sensor gerak tidak tersedia; simulasi sentuh tetap aktif.';return;}
   if(typeof sensor.requestPermission==='function'){const permission=await sensor.requestPermission();if(permission!=='granted'){if(bubbleStatus)bubbleStatus.textContent='Izin sensor belum diberikan. Animasi tetap berjalan.';return;}}
   window.addEventListener('deviceorientation',orientationHandler);
   bubbleMotionButton.textContent='Gerak HP aktif';
   if(bubbleStatus)bubbleStatus.textContent='Miringkan HP perlahan untuk menggeser gelembung.';
  }catch(error){if(bubbleStatus)bubbleStatus.textContent='Sensor tidak dapat diaktifkan pada perangkat ini.';}
 };
 bubbleStates.forEach(state=>{
  state.element.addEventListener('click',()=>{if(bubbleStatus)bubbleStatus.textContent=state.element.dataset.name+' · '+state.element.dataset.description+' — hanya contoh demo.';});
  state.element.addEventListener('pointerdown',event=>{
   const rect=bubbleField.getBoundingClientRect();state.dragging=true;state.lastX=event.clientX-rect.left;state.lastY=event.clientY-rect.top;
   state.element.setPointerCapture?.(event.pointerId);
  });
  state.element.addEventListener('pointermove',event=>{
   if(!state.dragging)return;
   const rect=bubbleField.getBoundingClientRect(),x=event.clientX-rect.left,y=event.clientY-rect.top;
   state.vx=(x-state.lastX)*.18;state.vy=(y-state.lastY)*.18;state.x=x;state.y=y;state.lastX=x;state.lastY=y;
  });
  const release=()=>{state.dragging=false;};
  state.element.addEventListener('pointerup',release);state.element.addEventListener('pointercancel',release);
 });
 bubbleMotionButton?.addEventListener('click',enableDeviceMotion);
 const visibilityHandler=()=>{if(document.hidden)stopBubbles();else startBubbles();};
 document.addEventListener('visibilitychange',visibilityHandler);window.addEventListener('resize',resizeBubbles);startBubbles();
 return ()=>{
  profileLoadController.abort();stopBubbles();window.removeEventListener('deviceorientation',orientationHandler);
  window.removeEventListener('resize',resizeBubbles);document.removeEventListener('visibilitychange',visibilityHandler);
 };

}
export function mountSettingsPage({root,user=null,onSignOut}={}) {
 const safe=value=>String(value??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const email=safe(user?.email||'Email tidak tersedia');
 const sections=[
  {id:'account',label:'Akun',icon:'user',title:'Akun & keamanan',desc:'Informasi akun yang digunakan untuk masuk ke PLUITS.'},
  {id:'privacy',label:'Privasi',icon:'lock',title:'Privasi & visibilitas',desc:'Kontrol profil publik dan bagaimana orang menemukan Anda.'},
  {id:'notifications',label:'Notifikasi',icon:'bell',title:'Notifikasi',desc:'Preferensi pemberitahuan dari aktivitas PLUITS.'},
  {id:'cover',label:'Tema Profil',icon:'image',title:'Tema & sampul profil',desc:'Pratinjau pilihan tampilan profil dan efek visual.'},
  {id:'app',label:'Aplikasi',icon:'book',title:'Preferensi aplikasi',desc:'Pengaturan pengalaman penggunaan aplikasi PLUITS.'}
 ];
 let active='account';
 const render=()=>{
  const selected=sections.find(item=>item.id===active)||sections[0];
  const detail=active==='account'
   ? '<div class="social-settings-detail-row"><span>Email akun</span><strong>'+email+'</strong></div><div class="social-settings-detail-row"><span>Metode masuk</span><strong>Email & kata sandi</strong></div><div class="social-settings-note">Perubahan email dan kata sandi dikelola melalui alur keamanan akun. Kami tidak menampilkan atau menyimpan kata sandi di halaman ini.</div>'
   : active==='privacy'
   ? '<div class="social-settings-detail-row"><span>Visibilitas profil</span><strong>Pengaturan server belum tersedia</strong></div><div class="social-settings-note">Kontrol publik / privat belum diaktifkan karena belum ada penyimpanan preferensi privasi yang terhubung. Status profil tidak akan diubah hanya dari tampilan ini.</div>'
   : active==='notifications'
   ? '<div class="social-settings-detail-row"><span>Notifikasi aplikasi</span><strong>Belum terhubung</strong></div><div class="social-settings-note">Preferensi notifikasi akan tersedia setelah layanan notifikasi PLUITS diaktifkan.</div>'
   : active==='cover'
   ? '<div class="social-settings-detail-row"><span>Bubble Connections</span><strong>Demo gratis</strong></div><p class="social-settings-note">Coba tema sampul dengan gelembung koneksi yang bergerak, bertabrakan lembut, dan merespons kemiringan HP. Ini masih pratinjau visual; belum memasangkan akun atau menyimpan hubungan nyata.</p><a class="social-settings-shortcut" href="'+routeHref('profile')+'">Buka Profil & coba demo →</a><div class="social-settings-note">Tema ini direncanakan termasuk tanpa biaya tambahan selama satu tahun keanggotaan Gold. Aturan langganan belum diaktifkan.</div>'
   : '<div class="social-settings-detail-row"><span>Pengalaman aplikasi</span><strong>Versi aplikasi web</strong></div><div class="social-settings-note">PLUITS menggunakan tampilan aplikasi yang responsif. Pengaturan bahasa dan tampilan lanjutan belum diaktifkan.</div>';
  root.innerHTML=shell('Pengaturan','Pusat pengaturan akun dan pengalaman aplikasi Anda.','profile',
   '<section class="social-settings-layout"><nav class="social-settings-menu" aria-label="Kategori pengaturan">'+sections.map(item=>'<button type="button" data-settings-tab="'+item.id+'" class="'+(active===item.id?'is-active':'')+'">'+renderIcon(item.icon)+'<span>'+item.label+'</span><b>›</b></button>').join('')+'</nav>'
   +'<section class="social-settings-panel"><div class="social-settings-panel-heading"><span class="social-kicker">PENGATURAN PLUITS</span><h2>'+selected.title+'</h2><p>'+selected.desc+'</p></div>'+detail+'</section>'
   +'<section class="social-settings-account"><div><strong>Keluar dari PLUITS</strong><p>Akhiri sesi akun pada perangkat ini.</p></div><button type="button" class="social-signout-button" data-sign-out>'+renderIcon('logout')+'<span>Keluar</span></button></section>'
   +'<a class="social-settings-back" href="'+routeHref('profile')+'">← Kembali ke Profil</a></section>');
 };
 render();
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
