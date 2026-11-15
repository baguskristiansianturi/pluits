import { supabase, SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } from '../../lib/supabase/client.js';
import { getInternalRoute, canonicalizeLegacyRoute } from '../../components/social/navigation-routes.js';
import { mountAuthPage } from '../../features/auth/auth.js';
import {socialIcon} from '../../components/common/social-icons.js';
import {renderBrandLogo} from '../../components/common/brand.js';
import {renderPostActions,renderPostCard} from '../../features/posts/index.js';
import {loadPostComments} from '../../features/posts/comments.js';
import {bindPostLikeInteractions} from '../../features/posts/like-interactions.js';
import {renderFollowListPage,bindRelationshipFollowActions} from '../../features/relationships/index.js';
import {bindRecommendationFollowActions} from '../../features/discovery/people-recommendation-actions.js';
import {renderNotificationPage,getUnreadActivityCount,paintUnreadBadge,bindNotificationInteractions} from '../../features/notifications/list/index.js';
import {bindPostGalleries,normalizeFeedMediaFrames} from '../../features/posts/post-media-layout.js';
import {bindSocialHeaderMenu} from '../../components/social/header-menu.js';
import {bindProfileTabs as bindAccountProfileTabs} from '../../features/profile/profile-tabs.js';
import {bindProfileImageFrameControls} from '../../features/profile/image-frame-controls.js';
import {bindProfileImageUpload} from '../../features/profile/image-upload.js';
import {bindProfileEditor} from '../../features/profile/profile-editor.js';
import {renderProfileBlogTab} from '../../features/profile/profile-blog-tab.js';
import {renderProfilePage} from '../../features/profile/profile-page.js';
import {renderPublicProfilePage} from '../../features/profile/public-profile-page.js';
import {bindExploreFilters} from '../../features/discovery/explore-filters.js';
import '../../features/posts/post-card.css';
import '../../features/posts/comments.css';
import {renderTopTenSection,loadTopTenTrending} from '../../features/discovery/top-ten-cards.js';
import {bindTopTenSlider} from '../../features/discovery/top-ten-slider.js';
import {rankPeopleRecommendations,renderPeopleRecommendations} from '../../features/discovery/people-recommendations.js';
import '../../features/discovery/people-recommendations.css';
import '../../features/posts/post-actions.css';
import {renderSocialHeader,renderSocialMobileNav} from '../../components/social/navigation.js';
import {renderDiscoveryHeader,bindDiscoveryHeader} from '../../components/social/discovery-header.js';
import {updateSEO} from '../seo.js';
import './user-account.css';
import './circle-experience.css';
import {renderPublicJoin} from '../../features/public-home/join.js';
import {renderAppDownload} from '../../features/app-download/app-download.js';
import '../../features/profile/image-framing.css';
import '../../features/profile/profile-hero.css';
import {renderReelCard} from '../../features/reels/reel-card.js';
import {bindReelsPlayback} from '../../features/reels/reel-playback.js';
import '../../features/reels/reels.css';
import '../../features/reels/viewer.css';
import {accountSecurityPage,bindAccountSecurity} from './security-settings.js';
import '../../styles/social-components.css';
import {loadAccountContext,contextHeader,professionalPage,professionalFormPage,accountSettingsPage,bindAccountContext} from './account-context.js';
import {listPrivateDrafts,getPrivateDraft,savePrivateDraft,deletePrivateDraft} from './drafts.js';
import {getMediaMime,getMediaExtension,validateMediaFile,getVideoDuration} from '../../features/media/media-types.js';
import {createMediaUploader} from '../../features/media/storage-upload.js';
import {createSignedUrlMap} from '../../services/storage/signed-urls.js';
import {DEFAULT_PROFILE_IMAGE_FRAME,normalizeProfileImageFrame,profileImageFrameCss,readProfileImageFrame} from '../../features/profile/image-framing.js';
import {homeNearbySection,bindHomeNearby} from '../directory/index.js';
import {renderLocalProductCard} from '../../features/marketplace/local-product-showcase.js';


const BUCKET='pluits-user-media';
const uploadMediaFile=createMediaUploader({supabase,bucket:BUCKET,supabaseUrl:SUPABASE_URL,publishableKey:SUPABASE_PUBLISHABLE_KEY});
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmtDate=v=>new Date(v).toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'});
const initials=v=>String(v||'P').trim().slice(0,1).toUpperCase();
let user=null,profile=null,profilePosts=[],profileImageFrame={...DEFAULT_PROFILE_IMAGE_FRAME},profileReels=[],addresses=[],noticeTimer=null,leafletMap=null,leafletMarker=null,exploreFilter='all',exploreCategory='all',exploreContentType='all',reelsFilter='recommended',activityNotificationChannel=null,unreadNotificationCount=0,currentComposeDraft=null,accountContext={active:'personal',professional:null,stores:[],prefs:{}};
function currentAccountView(){
 const path=getInternalRoute(window.location).split('?')[0];
 if(path==='circle'||path==='account/explore')return {section:'explore',parameter:''};
 if(path==='account/reels'||path==='reels')return {section:'reels',parameter:''};
 if(path.startsWith('account/post/'))return {section:'post',parameter:path.split('/')[2]||''};
 if(path==='profile/edit')return {section:'profile',parameter:'edit'};
 if(path.startsWith('@'))return {section:'user',parameter:path.slice(1)};
 return {section:'profile',parameter:''};
}
function refreshCurrentAccount({postId='',deleted=false}={}){
 const current=currentAccountView();
 if(deleted)return mountAccount(current.section==='explore'?'explore':'profile');
 if(postId&&current.section==='post')current.parameter=postId;
 return mountAccount(current.section,current.parameter);
}

function notify(message,type='success'){
 const el=document.querySelector('#ua-toast');if(!el)return;
 el.textContent=message;el.className='ua-toast show '+type;
 clearTimeout(noticeTimer);noticeTimer=setTimeout(()=>el.classList.remove('show'),3800);
}
function frame(content,active='explore',avatarUrl=''){
 if(active==='reels')return `<div class="ua-app ua-social-app ua-reels-app"><main class="ua-reels-main">${content}</main><div id="ua-toast" class="ua-toast" role="status"></div></div>`;
 const userAvatar=avatar(avatarUrl,profile?.display_name||user?.email||'P','',profileImageFrame);
 const profileView=active==='profile'||active==='preview'||active==='profile-edit';
 const showEditProfile=active==='profile'||active==='preview';
 return `<div class="ua-app ua-social-app">
  ${active==='post'?renderDiscoveryHeader({notificationCount:unreadNotificationCount}):renderSocialHeader({active,profileView,showEditProfile,user,profile,userAvatar,notificationCount:unreadNotificationCount})}
   <main class="ua-main plds-container ${profileView?'ua-profile-main':''} ${active==='create'?'ua-create-main':''}">${content}</main>
  ${renderSocialMobileNav({active,profileView,user,profile,userAvatar,notificationCount:unreadNotificationCount})}
     <div id="ua-toast" class="ua-toast" role="status"></div>
  <footer class="ua-footer">PLUITS · Identitas pengguna dan aktivitas komunitas</footer>
 </div>`;
}
function authScreen(mode='login'){
 mountAuthPage({supabase,mode,onAuthenticated:()=>{location.hash='#/account/explore';}});
 return;
 const app=document.querySelector('#app');
 app.innerHTML='<div class="ua-app ua-auth-app"><header class="ua-header">'+renderBrandLogo({className:'ua-brand',size:38,label:'Beranda PLUITS'})+'<a href="#/" class="ua-logout">Kembali</a></header>'+
 '<main class="ua-auth-wrap"><section class="ua-auth-copy"><span class="ua-eyebrow">PLUITS COMMUNITY</span><h1>Belanja, berbagi, dan membangun reputasi dalam satu akun.</h1><p>Masuk untuk melanjutkan aktivitas dan mengelola identitasmu di Pluits.</p></section>'+
 '<form id="ua-auth-form" class="ua-panel ua-auth-form"><span class="ua-eyebrow">SELAMAT DATANG</span><h2>Masuk ke Pluits</h2>'+
 '<label>Email<input name="email" type="email" required autocomplete="email" inputmode="email" placeholder="nama@email.com"></label>'+
 '<label>Password<input name="password" type="password" required autocomplete="current-password" placeholder="Password akun"></label>'+
 '<button class="ua-primary" type="submit">Masuk</button><p id="ua-auth-notice" class="ua-form-note" role="status" aria-live="polite"></p>'+
 '<p class="ua-auth-switch">Belum punya akun? <a href="#/account/register">Daftar</a></p></form></main><footer class="ua-footer">PLUITS INDONESIA</footer></div>';
 app.querySelector('#ua-auth-form').addEventListener('submit',async e=>{
  e.preventDefault();
  const form=new FormData(e.currentTarget),btn=e.currentTarget.querySelector('button'),note=app.querySelector('#ua-auth-notice');
  const email=String(form.get('email')||'').trim().toLowerCase(),password=String(form.get('password')||'');
  btn.disabled=true;btn.textContent='Memeriksa akun…';note.className='ua-form-note is-loading';note.textContent='Sedang memeriksa email dan password…';
  try{
   const {error}=await supabase.auth.signInWithPassword({email,password});
   if(error)throw error;
   await mountAccount('explore');
  }catch(err){
   note.className='ua-form-note is-error';
   note.textContent=err?.message||'Tidak dapat memproses akun.';
   btn.disabled=false;btn.textContent='Masuk';
  }
 });
}
async function signed(path){
 if(!path)return '';
 const {data,error}=await supabase.storage.from(BUCKET).createSignedUrl(path,3600);
 return error?'':data.signedUrl;
}
async function loadProfile(){
 const {data,error}=await supabase.from('user_profiles').select('*').eq('id',user.id).maybeSingle();
 if(error)throw error;
 if(data)profile=data;
 else{
  const seed='user_'+user.id.replaceAll('-','').slice(0,12);
  const {data:created,error:insertError}=await supabase.from('user_profiles').insert({id:user.id,display_name:user.user_metadata?.full_name||'Pengguna Pluits',username:seed}).select().single();
  if(insertError)throw insertError;profile=created;
 }
 const {data:frame,error:frameError}=await supabase.from('user_profile_image_frames').select('*').eq('user_id',user.id).maybeSingle();
 if(frameError)throw frameError;
 profileImageFrame=normalizeProfileImageFrame(frame||DEFAULT_PROFILE_IMAGE_FRAME);
}
async function loadAddresses(){
 const {data,error}=await supabase.from('user_addresses').select('*').eq('user_id',user.id).order('is_default',{ascending:false}).order('created_at',{ascending:false});
 if(error)throw error;addresses=data||[];
}
function avatar(url,name,size='',frameSettings=null){
 const frameStyle=frameSettings?' style="'+profileImageFrameCss(frameSettings,'avatar')+'"':'';
 return url?`<img class="ua-avatar ${size}" src="${url}" alt="Foto profil"${frameStyle}>`:`<span class="ua-avatar ua-avatar-fallback ${size}">${esc(initials(name))}</span>`;
}
function navProfile(){
 return `<div class="ua-subnav"><a href="#/account/profile">Personal</a><a href="#/account/followers">Pengikut</a><a href="#/account/following">Mengikuti</a><a href="#/account/requests">Permintaan</a><a href="#/messages">Pesan</a><a href="#/account/wallet">Wallet</a><a href="#/account/addresses">Alamat</a><a href="#/account/explore">Explore</a></div>`;
}
const rupiah=v=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(Number(v||0));
async function blockedAccountsPage(){
 const {data:rows,error}=await supabase.from('user_blocks').select('blocked_id,created_at').eq('blocker_id',user.id).order('created_at',{ascending:false});
 if(error)return '<div class="ua-panel"><h2>Daftar blokir belum dapat dimuat</h2><p>'+esc(error.message)+'</p></div>';
 const ids=(rows||[]).map(x=>x.blocked_id),{data:profiles}=ids.length?await supabase.from('user_profiles').select('id,display_name,username,avatar_path').in('id',ids):{data:[]};
 const people=new Map((profiles||[]).map(x=>[x.id,x]));
 return '<div class="ua-page-heading"><div><span class="ua-eyebrow">PRIVASI DAN KEAMANAN</span><h1>Akun yang diblokir</h1><p>Akun yang Anda blokir tidak akan muncul di Explore Anda.</p></div></div><section class="ua-panel ua-blocked-list">'+((rows||[]).map(x=>{const p=people.get(x.blocked_id)||{display_name:'Akun Pluits',username:'akun'};return '<article><div><b>'+esc(p.display_name)+'</b><small>@'+esc(p.username)+'</small></div><button data-unblock-user="'+x.blocked_id+'">Buka blokir</button></article>';}).join('')||'<div class="ua-empty">Anda belum memblokir akun apa pun.</div>')+'</section>';
}
function bindBlockedAccounts(){document.querySelectorAll('[data-unblock-user]').forEach(b=>b.onclick=async()=>{const {error}=await supabase.rpc('unblock_user',{p_blocked_user_id:b.dataset.unblockUser});if(error)notify(error.message,'error');else{notify('Blokir akun dibuka.');await mountAccount('blocked');}});}
function settingsHubPage(){
 const groups=[
  ['Akun & identitas','Kelola profil dan identitas yang terhubung ke satu akun',[
   ['shield','Keamanan akun','Password, perangkat, dan perlindungan akun','/account/security','ready'],
   ['briefcase','Profil profesional','Keahlian, portofolio, dan area layanan','/account/professional','ready'],
   ['store','Toko dan organisasi','Kelola identitas usaha dan keanggotaan','/seller','ready'],
   ['map-pin','Alamat tersimpan','Alamat privat untuk kebutuhan transaksi','/account/addresses','ready']]],
  ['Privasi & konten','Atur audiens dan kelola konten pribadi',[
   ['lock','Privasi dan audiens','Visibilitas default Post, Story, dan interaksi','/account/content-settings','ready'],
   ['edit','Draf konten','Lanjutkan atau hapus Post yang belum diterbitkan','/account/drafts','ready'],
   ['shield','Akun diblokir','Kelola akun yang tidak ingin Anda hubungi','/account/blocked','ready'],['eye-off','Konten disembunyikan','Kelola Post dan akun yang tidak ingin muncul di feed','/account/hidden-content','ready']]],
  ['Circle & hubungan','Atur interaksi sosial dan pengalaman komunitas',[
   ['users','Hubungan dan mengikuti','Kelola akun yang diikuti, dibisukan, dan dibatasi','/account/following','ready'],
   ['message-circle','Pesan dan komunikasi','Preferensi pesan, permintaan, dan interaksi','/messages','ready'],
   ['bell','Notifikasi','Atur pemberitahuan aktivitas, komentar, dan pesan','/account/settings','staged']]],
  ['Pengalaman aplikasi','Atur bahasa, tampilan, dan rekomendasi PLUITS',[
   ['globe','Bahasa','Bahasa tampilan dan format wilayah','/account/settings','staged'],
   ['palette','Tampilan','Tema, ukuran teks, dan kenyamanan visual','/account/settings','staged'],
   ['sliders-horizontal','Preferensi aplikasi','Kontrol pengalaman dan personalisasi aplikasi','/account/settings','staged']]],
  ['Bantuan & kebijakan','Panduan, aturan komunitas, dan perlindungan data',[
   ['help','Pusat Bantuan','Panduan dan jawaban penggunaan Pluits','/help','staged'],
   ['book','Pedoman Komunitas','Aturan konten dan interaksi yang aman','/guidelines','staged'],
   ['book','Ketentuan dan Privasi','Ketentuan layanan dan penggunaan data','/privacy','staged']]]
 ];
 if(['admin','moderator'].includes(user?.app_metadata?.role))groups.push(['Administrasi Pluits','Kelola keamanan komunitas dan informasi resmi', [['shield','Moderation Center','Tinjau laporan dan terbitkan informasi sistem','/admin/moderation','ready']]]);
 const rows=groups.map(g=>'<section class="ua-ac-group"><div class="ua-ac-group-head"><h2>'+g[0]+'</h2><p>'+g[1]+'</p></div><div class="ua-ac-list">'+g[2].map(x=>'<a class="ua-ac-row" href="#'+x[3]+'"><span class="ua-ac-icon">'+socialIcon(x[0],{size:18})+'</span><span class="ua-ac-copy"><strong>'+x[1]+'</strong><small>'+x[2]+'</small></span>'+(x[4]==='staged'?'<span class="ua-ac-stage">Bertahap</span>':'')+'<span class="ua-ac-arrow">›</span></a>').join('')+'</div></section>').join('');
 return '<div class="ua-account-center"><header class="ua-ac-header"><a class="ua-ac-back" href="#/account/profile" aria-label="Kembali ke profil">‹</a><div><span>PLUITS ACCOUNT</span><h1>Pusat Pengaturan</h1></div></header><section class="ua-ac-identity">'+avatar(profile?.avatar_url,profile?.display_name||user?.email||'P','large')+'<div class="ua-ac-identity-copy"><strong>'+esc(profile?.display_name||'Pengguna Pluits')+'</strong><span>@'+esc(profile?.username||'')+'</span><small>'+esc(user?.email||'')+'</small></div></section><div class="ua-ac-intro"><strong>Semua kendali akun Anda dalam satu tempat.</strong><p>Atur identitas, privasi, aktivitas sosial, dan layanan Pluits sesuai kebutuhan.</p></div>'+rows+'<section class="ua-ac-logout"><div><strong>Login dan keamanan</strong><small>Kelola sesi akun dan keluar dari Pluits.</small></div><button id="ua-settings-logout" type="button">Keluar dari akun</button></section><p class="ua-ac-version">PLUITS INDONESIA · Pusat Akun</p></div>';
}
async function walletPage(){
 const [a,r]=await Promise.all([
  supabase.from('wallet_accounts').select('balance_minor,currency,updated_at').eq('user_id',user.id).maybeSingle(),
  supabase.from('wallet_requests').select('id,request_type,amount_minor,payment_method,status,created_at').eq('user_id',user.id).order('created_at',{ascending:false}).limit(20)
 ]);
 if(a.error)throw a.error;if(r.error)throw r.error;
 const balance=a.data?.balance_minor||0,items=r.data||[];
 return `<div class="ua-page-heading"><div><span class="ua-eyebrow">KEUANGAN AKUN</span><h1>Wallet</h1><p>Kelola saldo, ajukan top up, dan tarik saldo Pluits.</p></div></div>
 ${navProfile()}
 <section class="ua-wallet-balance"><span>Saldo tersedia</span><strong>${rupiah(balance)}</strong><small>Saldo hanya berubah setelah transaksi diverifikasi dan diproses Pluits.</small></section>
 <section class="ua-wallet-actions"><form id="ua-wallet-form" class="ua-panel ua-wallet-form">
  <div class="ua-section-title"><div><span class="ua-eyebrow">AJUKAN TRANSAKSI</span><h2>Top Up atau Tarik Saldo</h2></div></div>
  <label>Jenis transaksi<select name="request_type"><option value="top_up">Top Up saldo</option><option value="withdrawal">Tarik saldo</option></select></label>
  <label>Nominal (Rp)<input name="amount" type="number" min="10000" step="1000" required placeholder="Contoh: 100000"></label>
  <label>Metode pembayaran / bank<input name="payment_method" maxlength="80" placeholder="Contoh: Transfer BCA"></label>
  <label>Detail rekening / referensi<textarea name="destination_details" rows="2" maxlength="500" placeholder="Isi detail yang diperlukan"></textarea></label>
  <label>Catatan tambahan<textarea name="note" rows="2" maxlength="300" placeholder="Opsional"></textarea></label>
  <p class="ua-wallet-disclaimer">Permintaan berstatus menunggu dan diproses manual untuk saat ini. Saldo tidak langsung berubah ketika formulir dikirim.</p>
  <button class="ua-primary" type="submit">Kirim permintaan</button><p id="ua-wallet-note" class="ua-form-note"></p>
 </form><aside class="ua-panel ua-wallet-info"><span class="ua-eyebrow">INFORMASI</span><h2>Transaksi tercatat</h2><p>Setiap permintaan tersimpan di riwayat akun. Jangan pernah membagikan password atau kode OTP.</p><p>Pembayaran otomatis dan verifikasi transfer akan dihubungkan pada tahap payment gateway.</p></aside></section>
 <section class="ua-panel ua-wallet-history"><div class="ua-section-title"><div><span class="ua-eyebrow">RIWAYAT</span><h2>Permintaan transaksi</h2></div></div>
 ${items.length?items.map(x=>`<div class="ua-wallet-row"><div><strong>${x.request_type==='top_up'?'Top Up':'Tarik Saldo'}</strong><small>${fmtDate(x.created_at)} · ${esc(x.payment_method||'Metode belum diisi')}</small></div><b>${rupiah(Number(x.amount_minor))}</b><span class="ua-wallet-status ${esc(x.status)}">${x.status==='pending'?'Menunggu':x.status==='approved'?'Disetujui':x.status==='rejected'?'Ditolak':'Dibatalkan'}</span></div>`).join(''):'<div class="ua-empty"><strong>Belum ada transaksi</strong><p>Riwayat permintaan top up dan penarikan akan tampil di sini.</p></div>'}
 </section>`;
}
function profileMenuMarkup(){
 return `<div class="pl-social-header-menu ua-profile-menu">
  <button class="pl-social-menu-trigger" type="button" aria-label="Pengaturan profil" aria-expanded="false" aria-controls="pl-account-menu"><span aria-hidden="true">•••</span></button>
  <div class="pl-social-menu-panel" id="pl-account-menu" hidden>
   <a href="#/account/profile/edit">${socialIcon('edit',{size:17})}<span>Edit profil</span></a>
   <a href="#/account/settings">${socialIcon('settings',{size:17})}<span>Pusat Pengaturan</span></a>
  </div>
 </div>`;
}
async function profilePage(preview=false,editMode=false){
 return renderProfilePage({
  preview,editMode,profile,user,supabaseClient:supabase,signed,hydratePosts,
  onProfilePosts:value=>{profilePosts=value;},
  onProfileReels:value=>{profileReels=value;},
  imageFrame:profileImageFrame,imageFrameCss:profileImageFrameCss,
  escapeHtml:esc,avatar,profileMenuMarkup,postGrid
 });
}

function bindProfileMenu(){bindSocialHeaderMenu();}

function bindProfileTabs(){
 bindAccountProfileTabs({
  ownPosts,profileReels,postGrid,loadBlog:profileBlogMarkup,escapeHtml:esc
 });
}
async function profileBlogMarkup(){
 return renderProfileBlogTab({
  documentRef:document,profile,user,supabaseClient:supabase,bucket:BUCKET,
  createSignedUrlMap,escapeHtml:esc,formatDate:fmtDate
 });
}

function postGrid(posts){return `<div class="ua-profile-post-feed">${posts.map(postCard).join('')}</div>`;}
async function hydratePosts(rows){
  if(!rows.length)return [];
  const postIds=rows.map(p=>p.id);
  const ownerIds=[...new Set(rows.map(p=>p.user_id).filter(Boolean))];
  const [tagRowsRes,mediaRowsRes,storiesRes]=await Promise.all([
   supabase.from('post_tags').select('post_id,tagged_user_id').in('post_id',postIds),
   supabase.from('post_media').select('id,post_id,user_id,media_path,media_type,position,duration_ms').in('post_id',postIds).order('position',{ascending:true}),
   ownerIds.length?supabase.from('user_stories').select('id,user_id,media_path,media_type,caption,created_at,expires_at').in('user_id',ownerIds).eq('visibility','public').gt('expires_at',new Date().toISOString()).order('created_at',{ascending:true}).limit(120):Promise.resolve({data:[],error:null})
  ]);
  if(tagRowsRes.error||mediaRowsRes.error||storiesRes.error)throw tagRowsRes.error||mediaRowsRes.error||storiesRes.error;
  const taggedRows=tagRowsRes.data||[],mediaRows=mediaRowsRes.data||[],activeStories=storiesRes.data||[];
  const ids=[...new Set([...rows.map(p=>p.user_id),...taggedRows.map(t=>t.tagged_user_id)])];
  const [profilesRes,likesRes,commentsRes,savesRes]=await Promise.all([
   supabase.from('user_profiles').select('id,display_name,username,avatar_path,public_city,public_province,visibility').in('id',ids),
   supabase.from('post_likes').select('post_id,user_id').in('post_id',postIds),
   supabase.from('post_comments').select('post_id').in('post_id',postIds),
   user?.id?supabase.from('post_saves').select('post_id,user_id').in('post_id',postIds).eq('user_id',user.id):Promise.resolve({data:[],error:null})
  ]);
  const queryError=profilesRes.error||likesRes.error||commentsRes.error||savesRes.error;
  if(queryError)throw queryError;
  const pmap=new Map((profilesRes.data||[]).map(x=>[x.id,x]));
  const saved=new Set((savesRes.data||[]).map(x=>x.post_id));
  const groupByPost=items=>{
   const grouped=new Map();
   for(const item of items){const list=grouped.get(item.post_id)||[];list.push(item);grouped.set(item.post_id,list);}
   return grouped;
  };
  const mediaByPost=groupByPost(mediaRows),tagsByPost=groupByPost(taggedRows);
  const likeCounts=new Map(),commentCounts=new Map(),likedPosts=new Set();
  for(const row of likesRes.data||[]){likeCounts.set(row.post_id,(likeCounts.get(row.post_id)||0)+1);if(user?.id===row.user_id)likedPosts.add(row.post_id);}
  for(const row of commentsRes.data||[])commentCounts.set(row.post_id,(commentCounts.get(row.post_id)||0)+1);
  const paths=[...mediaRows.map(m=>m.media_path),...rows.map(p=>p.media_path),...(profilesRes.data||[]).map(p=>p.avatar_path),...activeStories.map(story=>story.media_path)].filter(Boolean);
  const mediaUrls=await createSignedUrlMap(supabase.storage,BUCKET,paths,3600);
  const storiesByOwner=new Map();
  activeStories.forEach(story=>{const list=storiesByOwner.get(story.user_id)||[];const url=mediaUrls.get(story.media_path)||'';if(url)list.push({url,type:story.media_type,caption:story.caption||'',createdAt:story.created_at});storiesByOwner.set(story.user_id,list);});
  return rows.map(p=>{
   const owner=pmap.get(p.user_id)||{display_name:'Pengguna Pluits',username:'pengguna',visibility:'private'};
   const gallery=mediaByPost.get(p.id)||[];
   const media=gallery.length?gallery.map(m=>({...m,url:mediaUrls.get(m.media_path)||''})):(p.media_path?[{media_path:p.media_path,media_type:p.media_type,position:0,duration_ms:null,url:mediaUrls.get(p.media_path)||''}]:[]);
   return {...p,owner,media,storyItems:storiesByOwner.get(p.user_id)||[],tagged:(tagsByPost.get(p.id)||[]).map(t=>pmap.get(t.tagged_user_id)).filter(Boolean),mediaUrl:media[0]?.url||'',avatarUrl:mediaUrls.get(owner.avatar_path)||'',likes:likeCounts.get(p.id)||0,liked:likedPosts.has(p.id),comments:commentCounts.get(p.id)||0,saved:saved.has(p.id)};
  });
 }
async function blogFeedMarkup(){
 const {data:rows,error}=await supabase.from('blog_posts').select('id,title,description,cover_path,slug,published_at,created_at,owner_user_id,blog_profiles(display_title,slug)').eq('status','published').eq('visibility','public').order('published_at',{ascending:false}).limit(40);if(error)throw error;
 const ids=[...new Set((rows||[]).map(x=>x.owner_user_id).filter(Boolean))],{data:owners}=ids.length?await supabase.from('user_profiles').select('id,display_name,username').in('id',ids):{data:[]},ownerMap=new Map((owners||[]).map(x=>[x.id,x]));
 const hidden=await supabase.from('user_hidden_content').select('target_type,target_id').eq('viewer_id',user.id);if(hidden.error)throw hidden.error;const muted=new Set((hidden.data||[]).filter(x=>x.target_type==='user').map(x=>x.target_id));
 const visibleRows=(rows||[]).filter(row=>!muted.has(row.owner_user_id));
 const urls=await createSignedUrlMap(supabase.storage,BUCKET,visibleRows.map(x=>x.cover_path).filter(Boolean),1800);
 return visibleRows.map(row=>{const owner=ownerMap.get(row.owner_user_id)||{},blog=row.blog_profiles||{},href='#/blog/'+encodeURIComponent(row.slug||row.id);return "<article class='ua-blog-feed-card'><a href='"+href+"' class='ua-blog-feed-cover'>"+(urls.get(row.cover_path)?"<img src='"+esc(urls.get(row.cover_path))+"' alt='"+esc(row.title)+"' loading='lazy'>":"<span>PLUITS BLOG</span>")+"</a><div class='ua-blog-feed-copy'><small>"+esc(blog.display_title||owner.display_name||'Blog PLUITS')+" · "+fmtDate(row.published_at||row.created_at)+"</small><h3><a href='"+href+"'>"+esc(row.title)+"</a></h3><p>"+esc(row.description||'')+"</p><a class='ua-blog-read-link' href='"+href+"'>Baca artikel ↗</a></div></article>";}).join('')||"<div class='ua-feed-empty'><strong>Belum ada Blog publik</strong><p>Artikel yang diterbitkan akan tampil di sini.</p></div>";
}
async function hiddenContentPage(){
 const {data:rows,error}=await supabase.from('user_hidden_content').select('id,target_type,target_id,created_at').eq('viewer_id',user.id).order('created_at',{ascending:false});if(error)throw error;
 const ids=(rows||[]).filter(x=>x.target_type==='user').map(x=>x.target_id),{data:people}=ids.length?await supabase.from('user_profiles').select('id,display_name,username').in('id',ids):{data:[]},map=new Map((people||[]).map(x=>[x.id,x]));
 return "<div class='ua-page-heading'><div><span class='ua-eyebrow'>PREFERENSI KONTEN</span><h1>Konten disembunyikan</h1><p>Anda tetap mengikuti akun yang disembunyikan. Pilihan ini hanya mengatur apa yang muncul di feed Anda.</p></div></div><section class='ua-panel ua-hidden-content-list'>"+((rows||[]).map(row=>{const person=map.get(row.target_id);return "<article class='ua-hidden-content-row'><div><strong>"+(row.target_type==='user'?esc(person?.display_name||'Akun PLUITS'):'Postingan disembunyikan')+"</strong><small>"+(row.target_type==='user'?'@'+esc(person?.username||'akun')+' · Tetap mengikuti':'Tidak ditampilkan di feed')+"</small></div><button type='button' data-unhide-content='"+row.id+"'>Tampilkan kembali</button></article>";}).join('')||"<div class='ua-empty'><strong>Belum ada konten disembunyikan</strong><p>Gunakan menu titik tiga pada Post atau Reel untuk mengelola konten.</p></div>")+"</section>";
}
function bindHiddenContent(){document.querySelectorAll('[data-unhide-content]').forEach(button=>button.addEventListener('click',async()=>{button.disabled=true;const {error}=await supabase.from('user_hidden_content').delete().eq('id',button.dataset.unhideContent).eq('viewer_id',user.id);if(error){notify(error.message,'error');button.disabled=false;return;}notify('Konten akan ditampilkan kembali.');await mountAccount('hidden-content');}));}
async function feedPage(){
 let trendItems;try{trendItems=await loadTopTenTrending(supabase);}catch(error){console.warn('PLUITS Bali trending fallback',error);}
 const trendSection=renderTopTenSection(trendItems);
 const [interestQuery,followsResult,blocksResult,profileResult,relationshipResult,postsResult,storiesResult,registeredProfilesResult]=await Promise.all([
  supabase.from('user_interest_preferences').select('preference,directory_categories(name,slug)').eq('user_id',user.id),
  supabase.from('user_follows').select('following_id').eq('follower_id',user.id).eq('status','accepted'),
  supabase.from('user_blocks').select('blocker_id,blocked_id').or('blocker_id.eq.'+user.id+',blocked_id.eq.'+user.id),
  supabase.from('user_profiles').select('id,display_name,username,avatar_path,public_city,public_province,visibility,created_at').eq('visibility','public').neq('id',user.id).order('created_at',{ascending:false}).limit(60),
  supabase.from('user_follows').select('follower_id,following_id,status').or('follower_id.eq.'+user.id+',following_id.eq.'+user.id),
  supabase.from('user_posts').select('*').eq('content_kind','post').eq('visibility','public').eq('moderation_status','published').order('created_at',{ascending:false}).limit(60),
  supabase.from('user_stories').select('id,user_id,media_path,media_type,caption,created_at,expires_at').eq('visibility','public').gt('expires_at',new Date().toISOString()).order('created_at',{ascending:false}).limit(60),
  supabase.from('user_profiles').select('id',{count:'exact',head:true})
 ]);
 const queryError=interestQuery.error||followsResult.error||blocksResult.error||profileResult.error||relationshipResult.error||postsResult.error||storiesResult.error||registeredProfilesResult.error;
 if(queryError)throw queryError;
 const interests=(interestQuery.data||[]).map(x=>x.directory_categories).filter(Boolean);
 const followingIds=[...new Set((followsResult.data||[]).map(x=>x.following_id).filter(Boolean))];
 const blockedIds=(blocksResult.data||[]).map(x=>x.blocker_id===user.id?x.blocked_id:x.blocker_id);
 const relationships=relationshipResult.data||[];
 let mutualCounts={};
 if(followingIds.length){
  const mutualResult=await supabase.from('user_follows').select('follower_id,following_id').in('following_id',followingIds).eq('status','accepted').limit(300);
  if(mutualResult.error)throw mutualResult.error;
  const mutualSets=new Map();
  (mutualResult.data||[]).forEach(edge=>{
   if(edge.follower_id===user.id)return;
   if(!mutualSets.has(edge.follower_id))mutualSets.set(edge.follower_id,new Set());
   mutualSets.get(edge.follower_id).add(edge.following_id);
  });
  mutualCounts=Object.fromEntries([...mutualSets].map(([id,connections])=>[id,connections.size]));
 }
 const people=rankPeopleRecommendations({
  profiles:profileResult.data||[],viewerId:user.id,followingIds,blockedIds,relationships,mutualCounts,
  city:window.__pluitsHomeCity||profile?.public_city||'',province:profile?.public_province||''
 });
 const hiddenResult=await supabase.from('user_hidden_content').select('target_type,target_id').eq('viewer_id',user.id);if(hiddenResult.error)throw hiddenResult.error;
 const mutedUserIds=(hiddenResult.data||[]).filter(x=>x.target_type==='user').map(x=>x.target_id),hiddenPostIds=(hiddenResult.data||[]).filter(x=>x.target_type==='post').map(x=>x.target_id);
 const available=(postsResult.data||[]).filter(p=>!blockedIds.includes(p.user_id)&&!mutedUserIds.includes(p.user_id)&&!hiddenPostIds.includes(p.id)).slice(0,30);
 const [peopleAvatarUrls,peopleFramesResult,hydrated]=await Promise.all([
  createSignedUrlMap(supabase.storage,BUCKET,people.map(person=>person.avatar_path).filter(Boolean),3600),
  people.length?supabase.from('user_profile_image_frames').select('user_id,card_x,card_y,card_zoom').in('user_id',people.map(person=>person.id)):{data:[],error:null},
  hydratePosts(available)
 ]);
 if(peopleFramesResult.error)throw peopleFramesResult.error;
 const peopleImageFrames=new Map((peopleFramesResult.data||[]).map(frame=>[frame.user_id,frame]));
 const peopleSection=renderPeopleRecommendations({people,avatarUrls:peopleAvatarUrls,imageFrames:peopleImageFrames});
 const followedSet=new Set(followingIds);
 const visibleStories=(storiesResult.data||[]).filter(story=>followedSet.has(story.user_id)&&!blockedIds.includes(story.user_id)&&!mutedUserIds.includes(story.user_id));
 const storyOwners=new Map();
 visibleStories.forEach(story=>{if(!storyOwners.has(story.user_id))storyOwners.set(story.user_id,[]);storyOwners.get(story.user_id).push(story);});
 const storyProfileIds=[...storyOwners.keys()];
 const storyProfileResult=storyProfileIds.length?await supabase.from('user_profiles').select('id,display_name,avatar_path,visibility').in('id',storyProfileIds).eq('visibility','public'):{data:[],error:null};
 if(storyProfileResult.error)throw storyProfileResult.error;
 const storyProfiles=storyProfileResult.data||[];
 const [storyMediaUrls,storyAvatarUrls,storyFramesResult]=await Promise.all([
  createSignedUrlMap(supabase.storage,BUCKET,visibleStories.map(story=>story.media_path).filter(Boolean),1800),
  createSignedUrlMap(supabase.storage,BUCKET,storyProfiles.map(person=>person.avatar_path).filter(Boolean),3600),
  storyProfileIds.length?supabase.from('user_profile_image_frames').select('user_id,avatar_x,avatar_y,avatar_zoom').in('user_id',storyProfileIds):{data:[],error:null}
 ]);
 if(storyFramesResult.error)throw storyFramesResult.error;
 const storyImageFrames=new Map((storyFramesResult.data||[]).map(frame=>[frame.user_id,frame]));
 const storyCards=[...storyOwners.entries()].map(([ownerId,items])=>{
  const owner=storyProfiles.find(person=>person.id===ownerId);if(!owner)return '';
  const ready=items.map(story=>({...story,url:storyMediaUrls.get(story.media_path)||''})).filter(story=>story.url);
  if(!ready.length)return '';
  const name=esc(owner.display_name||'Pengguna PLUITS'),avatarUrl=storyAvatarUrls.get(owner.avatar_path)||'';
  const payload=esc(JSON.stringify(ready.map(story=>({url:story.url,type:story.media_type,caption:story.caption||'',createdAt:story.created_at}))));
  return "<button type='button' class='ua-story-group' data-story-items='"+payload+"' data-story-owner='"+esc(owner.display_name||'Pengguna PLUITS')+"' aria-label='Lihat Story "+name+"'><span class='ua-story-ring'><span class='ua-story-avatar'>"+(avatarUrl?"<img src='"+esc(avatarUrl)+"' alt='' loading='lazy' style='"+esc(profileImageFrameCss(storyImageFrames.get(ownerId)||{},'avatar'))+"'>":"<b>"+esc(initials(owner.display_name))+"</b>")+"</span></span><strong>"+name+"</strong><small>"+ready.length+" Story</small></button>";
 }).filter(Boolean).join('');
 const renderedStoryCount=(storyCards.match(/class='ua-story-group/g)||[]).length;
 const storiesSection="<section class='ua-circle-stories' aria-labelledby='ua-circle-stories-title'><div class='ua-circle-section-heading'><div><h2 id='ua-circle-stories-title'>Cerita dari circle</h2><p>Cerita dan hal baru yang dibagikan orang-orang di circle Anda.</p></div>"+"</div>"+(storyCards?"<div class='ua-circle-story-track'>"+storyCards+"</div>":"<div class='ua-circle-story-empty'>Belum ada Story teman yang aktif. Cerita dari circle Anda akan muncul di sini.</div>")+"</section>";
 const interestSlugs=new Set(interests.map(x=>String(x.slug||'').toLowerCase()));
 const score=p=>{const age=Math.max(0,(Date.now()-new Date(p.created_at).getTime())/3600000),tags=(p.tags||[]).map(x=>String(x).toLowerCase().replace(/^#/,'').replace(/ /g,'-')),interestMatch=tags.filter(tag=>interestSlugs.has(tag)).length;return (followingIds.includes(p.user_id)?80:0)+interestMatch*28+36*Math.exp(-age/72)+Math.min(45,(p.likes||0)*1.5+(p.comments||0)*2.5);};
 let typedPosts=exploreContentType==='reel'?hydrated.filter(post=>post.media?.length===1&&post.media[0].media_type==='video'&&Number(post.media[0].duration_ms||0)>0&&Number(post.media[0].duration_ms||0)<=60000):hydrated;
 let sorted=exploreFilter==='latest'?[...typedPosts].sort((a,b)=>new Date(b.created_at)-new Date(a.created_at))
  :exploreFilter==='random'?[...typedPosts].sort(()=>Math.random()-.5)
  :[...typedPosts].sort((a,b)=>score(b)-score(a)||new Date(b.created_at)-new Date(a.created_at));
 const inferredTags=new Map();
 const activityPosts=hydrated.filter(post=>followingIds.includes(post.user_id));
 (activityPosts.length?activityPosts:hydrated).forEach(post=>(post.tags||[]).forEach(raw=>{
  const slug=String(raw||'').toLowerCase().replace(/^#/,'').trim().replace(/\s+/g,'-');
  if(!slug||slug.length>36)return;
  inferredTags.set(slug,(inferredTags.get(slug)||0)+1);
 }));
 const inferredTopics=[...inferredTags.entries()].sort((a,b)=>b[1]-a[1]).slice(0,4).map(([slug])=>({slug,name:slug.split('-').map(w=>w.charAt(0).toUpperCase()+w.slice(1)).join(' ')}));
 const recommendationTopics=interests.length?interests:inferredTopics;
 const topicSections=recommendationTopics.map(topic=>{
  const slug=String(topic.slug||'').toLowerCase();
  const matching=hydrated.filter(post=>(post.tags||[]).some(tag=>String(tag).toLowerCase().replace(/^#/,'').trim().replace(/\s+/g,'-')===slug)).slice(0,8);
  if(!matching.length)return '';
  const topicId='ua-topic-'+slug.replace(/[^a-z0-9-]/g,'-');
  return "<section class='ua-home-topic' id='"+esc(topicId)+"'><div class='ua-home-section-heading'><div><h3>"+esc(topic.name)+"</h3></div><a href='#/places?category="+encodeURIComponent(slug)+"'>Lihat semua ↗</a></div><div class='ua-home-topic-carousel'>"+matching.map(postCard).join('')+"</div></section>";
 }).join('');
 const recommendationCards=sorted.slice(0,8);
 const interestSection=(topicSections|| (recommendationCards.length?"<div class='ua-home-topic-carousel ua-home-recommendation-carousel'>"+recommendationCards.map(postCard).join('')+"</div>":""));
 const categoryOptions=[...new Map([...interests,...inferredTopics].filter(Boolean).map(topic=>[String(topic.slug||'').toLowerCase(),topic])).values()];
 if(exploreCategory!=='all')sorted=sorted.filter(post=>(post.tags||[]).some(tag=>String(tag).toLowerCase().replace(/^#/,'').trim().replace(/\s+/g,'-')===exploreCategory));
 const filters=[['all','Semua'],['latest','Terbaru'],['random','Acak']];
 const categorySelect="<label class='ua-explore-category-label'><span>Kategori</span><select data-explore-category aria-label='Pilih kategori postingan'><option value='all' "+(exploreCategory==='all'?'selected':'')+">Semua kategori</option>"+categoryOptions.map(topic=>"<option value='"+esc(topic.slug)+"' "+(exploreCategory===String(topic.slug).toLowerCase()?'selected':'')+">"+esc(topic.name)+"</option>").join('')+"</select></label>";
 const contentTabs=[['all','Semua'],['reel','Reel'],['live','Live'],['blog','Blog']];
 const typeNav="<nav class='ua-content-tabs' aria-label='Jenis konten'>"+contentTabs.map(([key,label])=>"<button type='button' data-content-type='"+key+"' class='"+(exploreContentType===key?'is-active':'')+"' aria-pressed='"+(exploreContentType===key)+"'>"+label+"</button>").join('')+"<a class='ua-reels-open' href='#/account/reels' aria-label='Buka pemutar Reels'>Buka Reels ↗</a><button type='button' class='ua-feed-refresh' data-feed-refresh aria-label='Muat ulang postingan' title='Muat ulang'>↻</button></nav>";
 // .ua-explore-filters is intentionally omitted: content type tabs are the only feed navigation.
 // Circle Explore is discovery-only; omit the .ua-home-compose-prompt creation entry point.
  const filterNav="<div class='ua-explore-toolbar' aria-label='Navigasi konten Circle'>"+typeNav+"</div>";
 const empty='Belum ada postingan yang cocok dengan pilihan ini.';
 const action="";
 const homeHeading=''; // ua-home-following heading intentionally omitted so post cards begin directly below the tabs.
 const discoverMore="<section class='ua-home-discover-more'><div class='ua-home-section-heading'><div><h2>Temukan Lebih Banyak</h2><small>Perluas koneksi dan temukan cerita baru di PLUITS.</small></div></div><div class='ua-home-discover-links'><a href='#/search'><span>Orang &amp; komunitas</span><b>Jelajahi ↗</b></a><a href='#/places'><span>Tempat dan lingkungan</span><b>Jelajahi ↗</b></a></div></section>";
 let productCards='';
 try{
  const {data:products,error:productError}=await supabase.from('public_marketplace_products').select('id,store_id,store_name,name,variant_id,variant_name,brand,base_unit,online_price,discount_price,stock_quantity').gt('stock_quantity',0).order('name').limit(60);
  if(productError)throw productError;
  const storeIds=[...new Set((products||[]).map(p=>p.store_id).filter(Boolean))];
  const {data:localStores,error:storeError}=storeIds.length?await supabase.from('public_marketplace_stores').select('id,public_city,public_area').in('id',storeIds):{data:[],error:null};
  if(storeError)throw storeError;
  const baliAreas=['bali','denpasar','badung','gianyar','tabanan','buleleng','jembrana','karangasem','bangli','klungkung','ubud','kuta','canggu','seminyak','sanur','nusa dua','nusadua','lovina','celuk','tenganan'];
  const isBaliStore=store=>[store.public_city,store.public_area].some(value=>baliAreas.some(area=>String(value||'').toLocaleLowerCase('id').includes(area)));
  const baliStoreIds=new Set((localStores||[]).filter(isBaliStore).map(store=>store.id));
  const localProducts=(products||[]).filter(product=>baliStoreIds.has(product.store_id)).slice(0,10);
  const ids=[...new Set(localProducts.map(product=>product.id))];
  const {data:images,error:imageError}=ids.length?await supabase.from('product_images').select('product_id,storage_path,sort_order').in('product_id',ids).order('sort_order',{ascending:true}):{data:[],error:null};
  if(imageError)throw imageError;
  const paths=[...new Set((images||[]).map(item=>item.storage_path).filter(Boolean))];
  const {data:signed,error:signedError}=paths.length?await supabase.storage.from('pluits-store-media').createSignedUrls(paths,3600):{data:[],error:null};
  if(signedError)throw signedError;
  const urls=new Map((signed||[]).map(item=>[item.path,item.signedUrl])),firstImages=new Map();
  (images||[]).forEach(item=>{if(!firstImages.has(item.product_id))firstImages.set(item.product_id,urls.get(item.storage_path)||'');});
  const realCards=localProducts.map(product=>renderLocalProductCard({...product,image_url:firstImages.get(product.id)||''})).join('');
  productCards=realCards||"<div class='ua-home-product-empty'>Belum ada produk lokal tersedia di area ini.</div>";
 }catch(error){
  console.warn('PLUITS Bali local products could not be loaded',error);
  productCards="<div class='ua-home-product-empty'>Produk lokal belum dapat dimuat saat ini.</div>";
 }
 const maybeLike="<section class='ua-home-products'><div class='ua-home-section-heading'><div><h2>Produk Lokal</h2><small>Temukan produk dari toko dan pelaku usaha lokal di Bali.</small></div><a href='#/marketplace'>Lihat semua ↗</a></div><div class='ua-home-product-row ua-home-market-product-row'>"+productCards+"</div></section>";
 const collections="<section class='ua-home-collections'><div class='ua-home-section-heading'><div><h2>Kumpulan</h2><small>Jasa dan layanan pilihan</small></div><a href='#/places'>Jelajahi ↗</a></div><div class='ua-home-collection-row'><a href='#/places?category=professional-service'><span>✳</span><b>Jasa profesional</b></a><a href='#/places?category=transport'><span>⌁</span><b>Transportasi lokal</b></a><a href='#/trip'><span>◷</span><b>Aktivitas &amp; pengalaman</b></a><a href='#/marketplace'><span>◇</span><b>Produk lokal</b></a></div></section>";
 const serviceFilters="<section class='ua-home-service-filters'><div class='ua-home-section-heading'><div><h2>Layanan PLUITS</h2></div></div><div class='ua-home-service-chip-row'><a href='#/places?category=accommodation'>Akomodasi</a><a href='#/trip'>Tiket</a><a href='#/places?category=transport'>Transportasi</a><a href='#/places?category=professional-service'>Jasa</a></div></section>";
 const blogMarkup=exploreContentType==='blog'?await blogFeedMarkup():'';
 const liveMarkup=exploreContentType==='live'?"<div class='ua-feed-empty'><strong>Live PLUITS</strong><p>Siaran langsung akan muncul di sini saat fitur Live diaktifkan. Kerangka navigasi sudah tersedia.</p></div>":'';
 const feedMarkup=exploreContentType==='blog'?blogMarkup:exploreContentType==='live'?liveMarkup:sorted.length?sorted.map(post=>postCard(post)).join(''):"<div class='ua-feed-empty'><strong>"+empty+"</strong>"+action+"</div>";
 return " <div class='ua-social-home'>"+trendSection+homeNearbySection()+peopleSection+storiesSection+filterNav+homeHeading+"<div class='ua-home-feed-region'><section class='ua-feed'>"+feedMarkup+"</section></div>"+maybeLike+discoverMore+collections+serviceFilters+"<div class='pl-public-home ua-circle-bottom-promos'>"+renderPublicJoin()+renderAppDownload()+"</div></div>";
}

async function reelsPage(initialPostId=''){
 const q=await supabase.from('user_posts').select('*').eq('content_kind','reel').eq('visibility','public').eq('moderation_status','published').order('created_at',{ascending:false}).limit(80);
 if(q.error)throw q.error;
 let rows=q.data||[],followingIds=[],blockedIds=[];
 if(user?.id){
  const [b,hidden,f]=await Promise.all([
   supabase.from('user_blocks').select('blocker_id,blocked_id').or('blocker_id.eq.'+user.id+',blocked_id.eq.'+user.id),
   supabase.from('user_hidden_content').select('target_type,target_id').eq('viewer_id',user.id),
   supabase.from('user_follows').select('following_id').eq('follower_id',user.id).eq('status','accepted')
  ]);
  if(b.error||hidden.error||f.error)throw b.error||hidden.error||f.error;
  blockedIds=(b.data||[]).map(x=>x.blocker_id===user.id?x.blocked_id:x.blocker_id);
  const muted=(hidden.data||[]).filter(x=>x.target_type==='user').map(x=>x.target_id),hiddenPosts=(hidden.data||[]).filter(x=>x.target_type==='post').map(x=>x.target_id);
  rows=rows.filter(post=>!blockedIds.includes(post.user_id)&&!muted.includes(post.user_id)&&!hiddenPosts.includes(post.id));
  followingIds=(f.data||[]).map(x=>x.following_id);
 }
 const posts=await hydratePosts(rows),eligible=posts.filter(post=>post.media?.length===1&&post.media[0].media_type==='video'&&Number(post.media[0].duration_ms||0)>0&&Number(post.media[0].duration_ms)<=60000);
 const now=Date.now(),sorted=eligible.filter(post=>reelsFilter!=='following'||followingIds.includes(post.user_id)).sort((a,b)=>{
  if(reelsFilter==='latest')return new Date(b.created_at)-new Date(a.created_at);
  const score=post=>{const age=Math.max(0,(now-new Date(post.created_at).getTime())/3600000),follow=followingIds.includes(post.user_id)?45:0,recency=24*Math.exp(-age/48),engagement=Math.min(30,post.likes*1.5+post.comments*2.5);return follow+recency+engagement;};
  return score(b)-score(a)||new Date(b.created_at)-new Date(a.created_at);
 });
 const cards=sorted.map(post=>renderReelCard(post,{user,avatar,socialIcon,esc})).filter(Boolean).join('');
 return `<section class="ua-reels-viewer" aria-label="Pemutar Reels"><form class="ua-reel-discovery-search" data-reel-search-form role="search" aria-label="Cari video Reels"><span aria-hidden="true">${socialIcon('search',{size:17})}</span><input name="query" type="search" autocomplete="off" placeholder="Cari video, orang, atau topik…" aria-label="Cari video, orang, atau topik"><button type="reset" data-reel-search-clear aria-label="Hapus pencarian">×</button></form><div class="ua-reels-feed">${cards||'<div class="ua-reels-empty"><a class="ua-reel-back" href="#/account/explore" aria-label="Kembali">‹</a><strong>Belum ada Reel publik.</strong><p>Video yang dipublikasikan sebagai Reel akan muncul di sini.</p><a href="#/account/reel">＋ Buat Reel</a></div>'}</div></section>`;
}
function postCard(p){return renderPostCard(p,{user,avatar,socialIcon,renderActions:renderPostActions,esc});}

async function composePage(draftId='',kind='post'){
 currentComposeDraft=draftId?await getPrivateDraft(user.id,draftId):null;
 const {data:contentPrefs}=await supabase.from('account_content_preferences').select('*').eq('user_id',user.id).maybeSingle();
 const defaultAudience=accountContext.active==='professional'?(contentPrefs?.professional_default_visibility==='unlisted'?'private':'public'):accountContext.active==='business'?(contentPrefs?.business_default_visibility==='unlisted'?'private':'public'):(contentPrefs?.personal_default_visibility||'public');
 return `<div class="ua-compose-shell">
  <header class="ua-compose-header"><a href="#/account/create" class="ua-compose-back" aria-label="Kembali">‹</a><div><span class="ua-eyebrow">${currentComposeDraft?'DRAF':'PUBLIKASI'}</span><h1>${currentComposeDraft?'Lanjutkan draf':kind==='reel'?'Buat Reel':'Buat Post'}</h1></div><span class="ua-compose-kind">${kind==='reel'?'REEL':'POST'}</span></header>
  <form id="ua-post-form" class="ua-compose-form ua-clean-composer ua-compose-workspace" data-content-kind="${kind}" data-default-visibility="${currentComposeDraft?.visibility||defaultAudience}">
   <section class="ua-compose-media-section"><div class="ua-compose-section-heading"><strong>${kind==='reel'?'Video Reel':'Foto atau video'}</strong><small>${kind==='reel'?'Satu video, maksimal 60 detik':'Pilih satu atau beberapa media'}</small></div>
    <div class="ua-media-picker-row"><label class="ua-media-picker" for="ua-post-file" aria-label="${kind==='reel'?'Pilih video Reel':'Pilih foto atau video'}"><span aria-hidden="true">＋</span><strong>${kind==='reel'?'Pilih video':'Pilih dari perangkat'}</strong><small>${kind==='reel'?'Video dari galeri HP':'Foto dan video dari galeri HP'}</small><input id="ua-post-file" type="file" ${kind==='reel'?'accept="video/*,.mp4,.m4v,.mov,.webm,.3gp,.3gpp,.3g2,.3gp2"':'multiple accept="image/*,video/*,.mp4,.m4v,.mov,.webm,.3gp,.3gpp,.3g2,.3gp2"'} aria-label="${kind==='reel'?'Pilih video Reel':'Pilih foto atau video'}"></label><span class="ua-media-count" id="ua-media-count" aria-live="polite">Belum ada media</span></div>
    <div id="ua-media-preview" class="ua-media-preview ua-clean-preview"></div>
   </section>
   <label class="ua-compose-caption-label"><span>Caption <small>Opsional</small></span><textarea name="caption" rows="3" maxlength="2200" placeholder="Ceritakan sesuatu...">${esc(currentComposeDraft?.caption||'')}</textarea></label>
   <details class="ua-post-options"><summary><span>Audiens</span><b>${(currentComposeDraft?.visibility||defaultAudience)==='private'?'Hanya saya':'Publik'}</b></summary><div class="ua-post-option-fields">
    <label>Siapa yang bisa melihat?<select name="visibility"><option value="public" ${(currentComposeDraft?.visibility||defaultAudience)!=='private'?'selected':''}>Publik</option><option value="private" ${(currentComposeDraft?.visibility||defaultAudience)==='private'?'selected':''}>Hanya saya</option></select></label>
   </div></details>
   <div class="ua-progress" id="ua-upload-progress" hidden><span></span></div>
   <p class="ua-form-note" id="ua-compose-note">${currentComposeDraft?'Draf dipulihkan dari perangkat ini.':''}</p>
   <div class="ua-compose-actions"><button class="ua-text-action" type="button" id="ua-save-draft">Simpan draf</button><button class="ua-primary" type="submit">Bagikan</button></div>
  </form>
 </div>`;
}

async function savedPage(){
 const {data:saves,error}=await supabase.from('post_saves').select('post_id').eq('user_id',user.id);
 if(error)throw error;
 const ids=[...new Set((saves||[]).map(x=>x.post_id).filter(Boolean))];
 const {data:rows,error:postsError}=ids.length?await supabase.from('user_posts').select('*').in('id',ids).order('created_at',{ascending:false}):{data:[],error:null};
 if(postsError)throw postsError;
 const posts=await hydratePosts(rows||[]);
 return `<div class="ua-page-heading"><div><span class="ua-eyebrow">KOLEKSI PRIBADI</span><h1>Tersimpan</h1><p>Post yang Anda simpan hanya terlihat oleh akun Anda.</p></div></div><section class="ua-panel ua-posts-panel">${posts.length?posts.map(postCard).join(''):'<div class="ua-empty"><strong>Belum ada yang disimpan</strong><p>Gunakan ikon bookmark pada Post untuk menyimpannya di sini.</p><a class="ua-outline" href="#/account/explore">Jelajahi Post</a></div>'}</section>`;
}
async function draftsPage(){
 const drafts=await listPrivateDrafts(user.id);
 return `<div class="ua-page-heading"><div><span class="ua-eyebrow">KONTEN PRIVAT</span><h1>Draf postingan</h1><p>Draf hanya tersimpan di browser dan akun perangkat ini. Draf tidak tampil di profil, feed, Explore, atau pencarian publik.</p></div><a class="ua-primary ua-inline" href="#/account/compose">＋ Buat postingan</a></div>
 <section class="ua-drafts-list">${drafts.length?drafts.map(d=>`<article class="ua-draft-card" data-draft-id="${esc(d.id)}"><div class="ua-draft-copy"><strong>${esc(d.caption||'Draf tanpa caption')}</strong><small>${new Date(d.updated_at).toLocaleString('id-ID')} · ${(d.files||[]).length} media · ${esc(d.profile_context||'personal')}</small></div><div class="ua-draft-actions"><a class="ua-primary ua-inline" href="#/account/compose/${encodeURIComponent(d.id)}">Lanjutkan</a><button type="button" class="ua-outline" data-delete-draft="${esc(d.id)}">Hapus</button></div></article>`).join(''):'<div class="ua-empty"><strong>Belum ada draf</strong><p>Saat membuat postingan, pilih Simpan draf untuk melanjutkannya nanti.</p><a class="ua-primary ua-inline" href="#/account/compose">Buat postingan</a></div>'}</section>
 <p class="ua-drafts-note">Penyimpanan draf saat ini bersifat lokal pada browser/perangkat ini. Bersihkan data browser atau gunakan perangkat lain dapat membuat draf tidak tersedia. Sinkronisasi cloud belum aktif.</p>`;
}
function bindDrafts(){
 document.querySelectorAll('[data-delete-draft]').forEach(button=>button.addEventListener('click',async()=>{
  if(!confirm('Hapus draf ini dari perangkat?'))return;
  button.disabled=true;
  try{await deletePrivateDraft(user.id,button.dataset.deleteDraft);await mountAccount('drafts');}
  catch(error){notify(error.message||'Draf gagal dihapus.','error');button.disabled=false;}
 }));
}
async function addressPage(){
 await loadAddresses();
 return `<div class="ua-page-heading"><div><span class="ua-eyebrow">DATA PENGIRIMAN PRIVAT</span><h1>Alamat tersimpan</h1><p>Alamat lengkap dan titik peta hanya untuk akun Anda dan kebutuhan pemenuhan pesanan.</p></div></div>
 ${navProfile()}
 <section class="ua-grid-layout ua-address-layout"><div class="ua-panel"><div class="ua-section-title"><div><span class="ua-eyebrow">ALAMAT SAYA</span><h2>${addresses.length} alamat tersimpan</h2></div></div>
 ${addresses.length?addresses.map(a=>`<article class="ua-address-card"><div><strong>${esc(a.label)} ${a.is_default?'<span class="ua-default">UTAMA</span>':''}</strong><p>${esc(a.recipient_name)} · ${esc(a.phone)}</p><p>${esc(a.address_line)}, ${esc(a.village||'')}, ${esc(a.district)}, ${esc(a.city)}, ${esc(a.province)} ${esc(a.postal_code)}</p><small>${a.latitude!==null&&a.longitude!==null?'⌖ Titik peta tersimpan':'Titik peta belum ditentukan'}</small></div><div class="ua-address-actions"><button data-edit-address="${a.id}">Edit</button><button data-delete-address="${a.id}">Hapus</button></div></article>`).join(''):'<div class="ua-empty"><strong>Belum ada alamat</strong><p>Tambahkan alamat rumah, kantor, atau lokasi proyek agar pemesanan berikutnya lebih mudah.</p></div>'}
 </div><div class="ua-panel"><span class="ua-eyebrow">TAMBAH LOKASI</span><h2 id="ua-address-form-title">Tambah alamat</h2>
 <form id="ua-address-form" class="ua-address-form">
 <input type="hidden" name="id">
 <label>Label alamat<input name="label" required value="Rumah" placeholder="Rumah, kantor, proyek"></label>
 <label>Nama penerima<input name="recipient_name" required></label><label>Nomor telepon<input name="phone" type="tel" required></label>
 <label>Provinsi<input name="province" required placeholder="Bali"></label><label>Kota / Kabupaten<input name="city" required placeholder="Denpasar"></label>
 <label>Kecamatan<input name="district" required></label><label>Kelurahan / Desa<input name="village"></label>
 <label>Kode pos<input name="postal_code" inputmode="numeric" pattern="[0-9]{5}" maxlength="5" required placeholder="802xx"></label>
 <label>Alamat lengkap<textarea name="address_line" rows="3" required placeholder="Nama jalan, nomor, banjar, patokan…"></textarea></label>
 <label>Catatan kurir (opsional)<input name="delivery_note" placeholder="Petunjuk tambahan"></label>
 <div class="ua-map-head"><strong>Titik peta</strong><button type="button" id="ua-use-location" class="ua-outline">Gunakan lokasi saya</button></div>
 <div id="ua-address-map" class="ua-map"></div>
 <div class="ua-coordinates"><label>Latitude<input name="latitude" id="ua-lat" inputmode="decimal" placeholder="-8.65"></label><label>Longitude<input name="longitude" id="ua-lng" inputmode="decimal" placeholder="115.21"></label></div>
 <small class="ua-muted">Ketuk peta untuk memasang pin. Koordinat tidak ditampilkan di profil publik.</small>
 <label class="ua-checkbox"><input type="checkbox" name="is_default"> Jadikan alamat utama</label>
 <button class="ua-primary" type="submit">Simpan alamat</button><button class="ua-outline ua-full" type="button" id="ua-reset-address">Kosongkan formulir</button><p class="ua-form-note" id="ua-address-note"></p>
 </form></div></section>`;
}
async function loadLeaflet(){
 if(window.L)return;
 await new Promise((resolve,reject)=>{
  if(!document.querySelector('#ua-leaflet-css')){const l=document.createElement('link');l.id='ua-leaflet-css';l.rel='stylesheet';l.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';document.head.appendChild(l);}
  const s=document.createElement('script');s.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';s.onload=resolve;s.onerror=reject;document.head.appendChild(s);
 });
}
async function initMap(){
 const el=document.querySelector('#ua-address-map');if(!el)return;
 if(leafletMap){leafletMap.remove();leafletMap=null;leafletMarker=null;}
 try{
  await loadLeaflet();if(!document.querySelector('#ua-address-map'))return;
  leafletMap=window.L.map(el).setView([-8.65,115.2167],11);
  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap'}).addTo(leafletMap);
  const latInput=document.querySelector('#ua-lat'),lngInput=document.querySelector('#ua-lng');
  const setPin=(lat,lng)=>{latInput.value=Number(lat).toFixed(6);lngInput.value=Number(lng).toFixed(6);if(leafletMarker)leafletMarker.setLatLng([lat,lng]);else leafletMarker=window.L.marker([lat,lng]).addTo(leafletMap);};
  leafletMap.on('click',e=>setPin(e.latlng.lat,e.latlng.lng));
  if(latInput.value&&lngInput.value){const lat=Number(latInput.value),lng=Number(lngInput.value);leafletMap.setView([lat,lng],16);setPin(lat,lng);}
  latInput.addEventListener('change',()=>{if(latInput.value&&lngInput.value){const ll=[Number(latInput.value),Number(lngInput.value)];setPin(...ll);leafletMap.setView(ll,16);}});
  lngInput.addEventListener('change',()=>{if(latInput.value&&lngInput.value){const ll=[Number(latInput.value),Number(lngInput.value)];setPin(...ll);leafletMap.setView(ll,16);}});
  setTimeout(()=>leafletMap.invalidateSize(),250);
 }catch{el.innerHTML='<p class="ua-muted">Peta tidak dapat dimuat. Anda tetap dapat memasukkan koordinat secara manual atau memakai lokasi perangkat.</p>';}
}
async function publicProfilePage(username){
 return renderPublicProfilePage({
  username,user,supabaseClient:supabase,signed,hydratePosts,
  setProfileReels:value=>{profileReels=value;},
  postGrid,profileMenuMarkup,avatar,escapeHtml:esc,updateSEO,
  renderOwnProfile:()=>profilePage(false)
 });
}
async function notificationPage(){
 return renderNotificationPage({user,profile,supabaseClient:supabase,signed,escapeHtml:esc,formatDate:fmtDate});
}
async function countUnreadActivity(){
 return getUnreadActivityCount({user,profile,supabaseClient:supabase});
}
async function refreshUnreadBadge(){
 unreadNotificationCount=await countUnreadActivity();
 paintUnreadBadge({documentRef:document,count:unreadNotificationCount});
}
function bindNotificationActions(){
 bindNotificationInteractions({
  user,supabaseClient:supabase,notify,mountAccount,locationRef:location,documentRef:document,
  getChannel:()=>activityNotificationChannel,
  setChannel:value=>{activityNotificationChannel=value;},
  refreshUnreadBadge
 });
}
async function followListPage(kind='followers'){
 return renderFollowListPage({kind,user,supabaseClient:supabase,navProfile,avatar,escapeHtml:esc});
}
async function postDetailPage(id){
 const {data:selected,error}=await supabase.from('user_posts').select('*').eq('id',id).single();
 if(error)throw error;
 if(!selected)throw new Error('Postingan tidak tersedia.');
 const isOwner=!!user&&selected.user_id===user.id;
 if(!isOwner&&(selected.visibility!=='public'||selected.moderation_status!=='published'))throw new Error('Postingan ini tidak tersedia untuk publik.');
 const {data:rows,error:feedError}=await supabase.from('user_posts').select('*')
  .eq('user_id',selected.user_id).eq('visibility','public').eq('moderation_status','published')
  .order('created_at',{ascending:false}).limit(60);
 if(feedError)throw feedError;
 const streamRows=[...(rows||[])];
 if(isOwner&&!streamRows.some(post=>post.id===selected.id))streamRows.unshift(selected);
 const posts=await hydratePosts(streamRows);
 const owner=posts[0]?.owner||{username:'pengguna',display_name:'Pengguna Pluits'};
 return `<div class="ua-post-detail-page" data-post-author="${esc(owner.username)}">
  <div class="ua-post-stream-heading"><a class="ua-post-stream-back" href="#/@${encodeURIComponent(owner.username)}">← Profil @${esc(owner.username)}</a><span class="ua-eyebrow">POSTINGAN KOMUNITAS</span><h1>Feed ${esc(owner.display_name)}</h1><p>Geser foto ke samping untuk melihat seluruh media, lalu gulir ke bawah untuk postingan berikutnya.</p></div>
  <section class="ua-post-detail-stream">${posts.length?posts.map(post=>'<div class="ua-post-stream-item" id="ua-post-focus-'+post.id+'">'+postCard(post)+'</div>').join(''):'<div class="ua-empty">Belum ada postingan yang dapat ditampilkan.</div>'}</section>
  <a class="ua-post-stream-back ua-post-stream-bottom" href="#/@${encodeURIComponent(owner.username)}">Kembali ke profil</a>
 </div>`;
}
let homeSearchTypingTimer=null,homeSearchCycleTimer=null;
function startHomeSearchPrompt(locationText='Welcome to Bali'){
 const prompt=document.querySelector('#ua-home-search-prompt');if(!prompt)return;
 if(homeSearchTypingTimer)clearInterval(homeSearchTypingTimer);
 if(homeSearchCycleTimer)clearTimeout(homeSearchCycleTimer);
 const city=String(locationText||'Welcome to Bali').replace(/^Welcome to /i,'').split(',')[0].trim()||'Bali';const phrases=['Temukan yang menarik di '+city,'Jelajahi kuliner di '+city,'Apa yang sedang ramai di '+city,'Tempat dan cerita dari '+city];
 prompt.classList.remove('is-typing');prompt.textContent=locationText;
 let phraseIndex=0;
 const typeNext=()=>{
  const phrase=phrases[phraseIndex%phrases.length];let index=0;prompt.textContent='';prompt.classList.add('is-typing');
  homeSearchTypingTimer=setInterval(()=>{
   index++;prompt.textContent=phrase.slice(0,index);
   if(index>=phrase.length){clearInterval(homeSearchTypingTimer);homeSearchTypingTimer=null;homeSearchCycleTimer=setTimeout(()=>{
    let erase=phrase.length;
    homeSearchTypingTimer=setInterval(()=>{erase--;prompt.textContent=phrase.slice(0,Math.max(0,erase));if(erase<=0){clearInterval(homeSearchTypingTimer);homeSearchTypingTimer=null;prompt.classList.remove('is-typing');phraseIndex++;homeSearchCycleTimer=setTimeout(typeNext,250);}},28);
   },2100);}
  },48);
 };
 homeSearchCycleTimer=setTimeout(typeNext,2300);
}
async function refreshHomeLocalProducts(city){
 const target=document.querySelector('.ua-home-product-row');if(!target||!city)return;
 try{
  const {data:products,error}=await supabase.from('public_marketplace_products').select('id,store_id,store_name,name,variant_id,online_price,discount_price').order('name').limit(60);if(error)throw error;
  const storeIds=[...new Set((products||[]).map(p=>p.store_id).filter(Boolean))];
  const {data:stores,error:storeError}=storeIds.length?await supabase.from('public_marketplace_stores').select('id,public_city,public_area').in('id',storeIds):{data:[],error:null};if(storeError)throw storeError;
  const key=String(city).toLocaleLowerCase('id'),localIds=new Set((stores||[]).filter(x=>String(x.public_city||'').toLocaleLowerCase('id').includes(key)||key.includes(String(x.public_city||'').toLocaleLowerCase('id'))).map(x=>x.id));
  const local=(products||[]).filter(p=>localIds.has(p.store_id)).slice(0,8),ids=local.map(p=>p.id);
  const {data:images}=ids.length?await supabase.from('product_images').select('product_id,storage_path,sort_order').in('product_id',ids).order('sort_order',{ascending:true}):{data:[]};
  const paths=[...new Set((images||[]).map(x=>x.storage_path).filter(Boolean))],{data:signed}=paths.length?await supabase.storage.from('pluits-store-media').createSignedUrls(paths,3600):{data:[]};
  const urls=new Map((signed||[]).map(x=>[x.path,x.signedUrl])),first=new Map();(images||[]).forEach(x=>{if(!first.has(x.product_id))first.set(x.product_id,urls.get(x.storage_path)||'');});
  target.innerHTML=local.length?local.map(p=>"<a class='ua-home-product-card' href='#/market-product/"+encodeURIComponent(p.variant_id)+"'>"+(first.get(p.id)?"<img src='"+esc(first.get(p.id))+"' alt='"+esc(p.name)+"' loading='lazy'>":"<span class='ua-home-product-placeholder'>PLUITS</span>")+"<span><small>"+esc(p.store_name||'Penjual lokal')+"</small><b>"+esc(p.name)+"</b><strong>"+rupiah(p.discount_price||p.online_price)+"</strong></span></a>").join(''):"<a class='ua-home-product-empty' href='#/marketplace'>Belum ada produk dari penjual di "+esc(city)+". Jelajahi Marketplace ↗</a>";
  document.querySelectorAll('[data-home-location-city]').forEach(el=>el.textContent=city);
 }catch(error){console.warn('PLUITS local marketplace refresh',error);}
}
function bindHomeDiscoveryLocation(){
 const prompt=document.querySelector('#ua-home-search-prompt');
 if(!prompt)return;
 const loadNearby=location=>bindHomeNearby({location:location||null,personalize:true});
 if(window.__pluitsHomeLocation){
  startHomeSearchPrompt('Welcome to '+(window.__pluitsHomeCity||'area Anda'));loadNearby(window.__pluitsHomeLocation);return;
 }
 startHomeSearchPrompt('Mendeteksi lokasi Anda…');
 if(!navigator.geolocation){prompt.textContent='Izinkan lokasi perangkat untuk rekomendasi sekitar Anda';loadNearby(null);return;}
 navigator.geolocation.getCurrentPosition(position=>{
  const {latitude,longitude,accuracy}=position.coords,location={latitude,longitude,accuracy,updatedAt:Date.now()};
  window.__pluitsHomeLocation=location;fetch('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat='+encodeURIComponent(latitude)+'&lon='+encodeURIComponent(longitude),{headers:{'Accept-Language':'id'}}).then(response=>response.ok?response.json():null).then(place=>{const address=place?.address||{},city=address.city||address.town||address.village||address.county||address.state||'area Anda';window.__pluitsHomeCity=city;startHomeSearchPrompt('Welcome to '+city);refreshHomeLocalProducts(city);}).catch(()=>startHomeSearchPrompt('Welcome to area Anda'));loadNearby(location);
 },error=>{
  prompt.textContent=error.code===1?'Izinkan lokasi untuk pengalaman lokal':'Lokasi belum terdeteksi';loadNearby(null);
 },{enableHighAccuracy:true,timeout:15000,maximumAge:120000});
}
 let accountMountSequence=0;
async function mountAccount(section='profile',parameter=''){
 // Legacy and human-readable Circle route names must never fall through to Profile.
 if(['circle','home','feed'].includes(section))section='explore';
 // Legacy message destinations must always open Inbox, never the personal Profile fallback.
 if(['message','messages','inbox'].includes(section)){location.hash='#/inbox';return;}
 const mountSequence=++accountMountSequence,routeVersion=window.__pluitsRouteVersion||0,requestedAddress=location.pathname+location.search+location.hash;
 const isCurrent=()=>mountSequence===accountMountSequence&&routeVersion===(window.__pluitsRouteVersion||0)&&requestedAddress===(location.pathname+location.search+location.hash);
 if(section!=='activity'&&activityNotificationChannel){supabase.removeChannel(activityNotificationChannel);activityNotificationChannel=null;}
 try{
  const {data:{session}}=await supabase.auth.getSession();if(!isCurrent())return;
  user=session?.user||null;
  if(!user&&(section==='user'||section==='post')){
   const page=section==='user'?await publicProfilePage(parameter):await postDetailPage(parameter||currentAccountView().parameter||'');if(!isCurrent())return;
   document.querySelector('#app').innerHTML=frame(page,section==='post'?'post':'explore');if(section==='post')bindDiscoveryHeader();bindProfileTabs();return;
  }
  if(['auth','register','login'].includes(section)){authScreen(section==='auth'?parameter:section);return;}
  if(!user){if(section==='profile'){location.hash='#/account/login';return;}authScreen('login');return;}
  await loadProfile();if(!isCurrent())return;
  accountContext=await loadAccountContext(supabase,user);if(!isCurrent())return;
  unreadNotificationCount=await countUnreadActivity();if(!isCurrent())return;
  if(section==='profile')updateSEO({title:profile.display_name+' (@'+profile.username+') — Pluits',description:(profile.bio||'Profil komunitas '+profile.display_name+' di Pluits.').slice(0,160),path:'#/@'+encodeURIComponent(profile.username)});
  const page=section==='explore'?await feedPage():section==='activity'?await notificationPage():section==='reels'?await reelsPage(parameter):section==='create'?await createPage():section==='upgrade'?upgradePage():section==='story'?await storyComposePage():section==='live'?livePage():section==='saved'?await savedPage():section==='reel'?await composePage('', 'reel'):section==='compose'?await composePage(parameter):section==='drafts'?await draftsPage():section==='addresses'?await addressPage():section==='wallet'?await walletPage():section==='post'?await postDetailPage(parameter||currentAccountView().parameter||''):section==='user'?await publicProfilePage(parameter):section==='followers'?await followListPage('followers'):section==='following'?await followListPage('following'):section==='requests'?await followListPage('followers'):section==='preview'?await profilePage(true):section==='profile'?await profilePage(false,parameter==='edit'):section==='professional'?professionalPage(accountContext,profile):section==='professional-create'?professionalFormPage(accountContext,profile):section==='settings'?settingsHubPage():section==='security'?await accountSecurityPage(supabase,user):section==='blocked'?await blockedAccountsPage():section==='hidden-content'?await hiddenContentPage():section==='content-settings'?await accountSettingsPage(supabase,user):'<section class="ua-panel ua-error"><h1>Halaman akun tidak ditemukan</h1><p>Tujuan akun "'+esc(section)+'" belum tersedia.</p><a class="ua-outline" href="#/account/explore">Kembali ke Circle</a></section>';
  if(!isCurrent())return;
  const headerAvatar=await signed(profile.avatar_path);if(!isCurrent())return;
  const app=document.querySelector('#app');if(!app)return;
  const navActive=section==='profile'?(parameter==='edit'?'profile-edit':'profile'):section==='preview'?'preview':section==='explore'?'explore':section==='reels'?'reels':['create','compose','reel','story'].includes(section)?'create':section==='post'?'post':section==='activity'?'activity':section==='addresses'?'addresses':'account';
  app.classList.remove('pl-page-enter');app.innerHTML=frame(page,navActive,headerAvatar);requestAnimationFrame(()=>{if(isCurrent())app.classList.add('pl-page-enter');});
  document.querySelector('#ua-logout')?.addEventListener('click',async()=>{await supabase.auth.signOut();user=null;profile=null;authScreen('login');});
  bindAccountContext({db:supabase,user,ctx:accountContext,profile,refresh:mountAccount});
  if(section==='post')bindDiscoveryHeader();
  if(section==='explore')bindHomeDiscoveryLocation();
  bindProfileMenu();
  if(section==='security')bindAccountSecurity(supabase,user);
  document.querySelector('#ua-settings-logout')?.addEventListener('click',async()=>{await supabase.auth.signOut();user=null;profile=null;location.hash='/account/login';});
  document.querySelector('#ua-edit-profile-link')?.addEventListener('click',e=>{e.preventDefault();document.querySelector('#edit-profile')?.scrollIntoView({behavior:'smooth',block:'start'});});
  document.querySelector('#ua-menu-logout')?.addEventListener('click',async()=>{await supabase.auth.signOut();user=null;profile=null;location.hash='/';});
  normalizeFeedMediaFrames(document);bindPostGalleries();
  if(section==='post'){const focusId=parameter||currentAccountView().parameter||'';requestAnimationFrame(()=>document.getElementById('ua-post-focus-'+focusId)?.scrollIntoView({block:'start',behavior:'auto'}));}
  bindProfileTabs();bindNotificationActions();if(section==='drafts')bindDrafts();
  bindProfile();bindCompose();bindStoryCompose();bindStories();bindExploreFilters({getContentType:()=>exploreContentType,setContentType:value=>{exploreContentType=value;},getFilter:()=>exploreFilter,setFilter:value=>{exploreFilter=value;},setCategory:value=>{exploreCategory=value;},rerender:()=>mountAccount('explore')});bindPeopleRecommendationActions();bindTopTenSlider();bindAddresses();bindWallet();bindPostActions();bindFollowActions();
  if(section==='blocked')bindBlockedAccounts();if(section==='hidden-content')bindHiddenContent();if(section==='reels'){bindReelsPlayback();if(parameter)requestAnimationFrame(()=>{const target=[...document.querySelectorAll('[data-reel-post-id]')].find(el=>el.dataset.reelPostId===parameter);target?.scrollIntoView({block:'start'});});}if(section==='addresses')initMap();
 }catch(err){
  if(!isCurrent())return;
  const app=document.querySelector('#app');if(!app)return;
  app.innerHTML=frame('<div class="ua-panel ua-error"><h1>Ada kendala memuat akun</h1><p>'+esc(err.message)+'</p><button class="ua-primary" onclick="location.reload()">Coba lagi</button></div>');
  document.querySelector('#ua-logout')?.addEventListener('click',()=>supabase.auth.signOut());
 }
}
function bindWallet(){
 const form=document.querySelector('#ua-wallet-form');if(!form)return;
 form.addEventListener('submit',async e=>{
  e.preventDefault();const d=new FormData(form),amount=Number(d.get('amount')),type=String(d.get('request_type')),note=document.querySelector('#ua-wallet-note'),btn=form.querySelector('button[type=submit]');
  if(!Number.isSafeInteger(amount)||amount<10000){note.textContent='Nominal minimum Rp10.000.';return;}
  if(type==='withdrawal'&&!String(d.get('destination_details')||'').trim()){note.textContent='Isi detail rekening tujuan untuk penarikan.';return;}
  btn.disabled=true;note.textContent='Mengirim permintaan…';
  const {error}=await supabase.from('wallet_requests').insert({user_id:user.id,request_type:type,amount_minor:amount,payment_method:String(d.get('payment_method')||'').trim()||null,destination_details:String(d.get('destination_details')||'').trim()||null,note:String(d.get('note')||'').trim()||null});
  if(error){note.textContent=error.message;btn.disabled=false;return;}
  notify('Permintaan transaksi berhasil dikirim.');await mountAccount('wallet');
 });
}
function bindProfile(){
 bindProfileEditor({
  documentRef:document,user,getProfile:()=>profile,setProfile:value=>{profile=value;},
  supabaseClient:supabase,getImageFrame:()=>profileImageFrame,setImageFrame:value=>{profileImageFrame=value;},
  readImageFrame:readProfileImageFrame,notify,updateSEO
 });
 bindProfileImageFrames(); bindImageUpload('ua-avatar-file','avatar_path','avatar');bindImageUpload('ua-cover-file','cover_path','cover');
}
function bindProfileImageFrames(){
 bindProfileImageFrameControls({
  currentFrame:profileImageFrame,
  readFrame:readProfileImageFrame,
  renderFrameCss:profileImageFrameCss
 });
}
function bindImageUpload(inputId,column,label){
 bindProfileImageUpload({
  inputId,column,label,documentRef:document,supabaseClient:supabase,bucket:BUCKET,userId:user?.id,
  notify,onProfileUpdated:data=>{profile=data;},
  refreshProfile:()=>mountAccount('profile',currentAccountView().parameter==='edit'?'edit':'')
 });
}

function bindCompose(){
 const form=document.querySelector('#ua-post-form'),input=document.querySelector('#ua-post-file'),preview=document.querySelector('#ua-media-preview'),count=document.querySelector('#ua-media-count'),note=msg=>{const n=document.querySelector('#ua-compose-note');if(n)n.textContent=msg;};
 if(!form||!input||!preview)return;
 let selectedFiles=[];
 const visibilitySelect=form.querySelector('[name=visibility]'),audienceSummary=form.querySelector('.ua-post-options summary b');
 visibilitySelect?.addEventListener('change',()=>{if(audienceSummary)audienceSummary.textContent=visibilitySelect.value==='private'?'Hanya saya':'Publik';});
 const revoke=()=>{(JSON.parse(preview.dataset.urls||'[]')).forEach(url=>URL.revokeObjectURL(url));preview.dataset.urls='[]';};
 const syncInput=()=>{try{const transfer=new DataTransfer();selectedFiles.forEach(file=>transfer.items.add(file));input.files=transfer.files;}catch{}};
 const render=()=>{
  revoke();preview.innerHTML='';
  if(count)count.textContent=selectedFiles.length?selectedFiles.length+' media dipilih':'Belum ada media';
  if(!selectedFiles.length)return;
  const urls=selectedFiles.map(file=>URL.createObjectURL(file));preview.dataset.urls=JSON.stringify(urls);
  preview.innerHTML=selectedFiles.map((file,index)=>{
   const media=getMediaMime(file).startsWith('video/')?'<video controls playsinline preload="metadata" src="'+urls[index]+'"></video>':'<img src="'+urls[index]+'" alt="Media '+(index+1)+'">';
   return '<article class="ua-clean-media-item">'+media+'<button type="button" data-remove-media="'+index+'" aria-label="Hapus media">×</button><small>'+(index+1)+' / '+selectedFiles.length+'</small></article>';
  }).join('');
  preview.querySelectorAll('video').forEach(video=>{
   video.muted=true;video.playsInline=true;video.preload='auto';
   video.addEventListener('loadeddata',()=>{
    try{
     if(video.videoWidth&&video.videoHeight){
      const canvas=document.createElement('canvas');canvas.width=video.videoWidth;canvas.height=video.videoHeight;
      const context=canvas.getContext('2d');context.drawImage(video,0,0,canvas.width,canvas.height);
      video.poster=canvas.toDataURL('image/jpeg',.84);
     }
    }catch(error){console.debug('PLUITS local video cover preview unavailable',error);}
    video.pause();
   },{once:true});
  });
  preview.querySelectorAll('[data-remove-media]').forEach(button=>button.addEventListener('click',()=>{selectedFiles.splice(Number(button.dataset.removeMedia),1);syncInput();render();}));
 };
 input.addEventListener('change',()=>{
  const incoming=[...(input.files||[])];if(!incoming.length)return;
  const combined=[...selectedFiles,...incoming];
  if(combined.length>15){note('Maksimal 15 foto atau video dalam satu Post.');syncInput();return;}
  const bad=incoming.find(file=>!validateMediaFile(file).valid);
  if(bad){const check=validateMediaFile(bad);note(check.reason==='too-large'?'Ukuran maksimal 50 MB per file.':'File "'+bad.name+'" tidak dikenali. Tipe perangkat: '+(bad.type||'tidak tersedia')+'. Coba video MP4, MOV, WebM atau 3GP.');syncInput();return;}
  selectedFiles=combined;syncInput();render();note('');
 });
 const saveDraftButton=document.querySelector('#ua-save-draft');
 saveDraftButton?.addEventListener('click',async()=>{
  const caption=String(form.querySelector('[name=caption]')?.value||'').trim();
  if(!selectedFiles.length&&!caption){note('Pilih media atau tulis deskripsi sebelum menyimpan draf.');return;}
  saveDraftButton.disabled=true;saveDraftButton.textContent='Menyimpan…';
  try{
   const draftFiles=selectedFiles.length?selectedFiles.map(file=>({name:file.name,type:file.type,size:file.size,lastModified:file.lastModified,blob:file})):(currentComposeDraft?.files||[]);
   const draft={id:currentComposeDraft?.id||(crypto.randomUUID?crypto.randomUUID():'draft-'+Date.now()),user_id:user.id,caption,visibility:form.querySelector('[name=visibility]')?.value||form.dataset.defaultVisibility||'public',profile_context:accountContext.active,updated_at:new Date().toISOString(),files:draftFiles};
   await savePrivateDraft(draft);currentComposeDraft=draft;note('Draf tersimpan di perangkat ini.');saveDraftButton.disabled=false;saveDraftButton.textContent='Draf tersimpan';
  }catch(error){note(error.message||'Draf tidak dapat disimpan.');saveDraftButton.disabled=false;saveDraftButton.textContent='Coba lagi';}
 });
 if(currentComposeDraft?.files?.length){
  try{selectedFiles=currentComposeDraft.files.map(item=>new File([item.blob],item.name,{type:item.type,lastModified:item.lastModified||Date.now()}));syncInput();render();}
  catch{note('Draf teks dipulihkan. Lampiran belum dapat dipulihkan oleh browser ini.');}
 }
 form.addEventListener('submit',async event=>{
  event.preventDefault();
  const files=[...selectedFiles],data=new FormData(form),caption=String(data.get('caption')||'').trim(),button=form.querySelector('button[type=submit]'),progress=document.querySelector('#ua-upload-progress');
  if(!files.length&&!caption){note('Pilih foto/video atau tulis deskripsi.');return;}
  if(files.length>15){note('Maksimal 15 media dalam satu Post.');return;}
  if(form.dataset.contentKind==='reel'&&(files.length!==1||!getMediaMime(files[0]).startsWith('video/'))){note('Reel harus terdiri dari satu file video.');return;}
  const bad=files.find(file=>!validateMediaFile(file).valid);
  if(bad){const check=validateMediaFile(bad);note(check.reason==='too-large'?'Ukuran maksimal 50 MB per file.':'File "'+bad.name+'" tidak dikenali sebagai media yang didukung. Tipe perangkat: '+(bad.type||'tidak tersedia')+'.');return;}
  button.disabled=true;button.textContent='Mengunggah…';const uploaded=[];
  try{
   for(let i=0;i<files.length;i++){
    const file=files[i],mime=getMediaMime(file),ext=getMediaExtension(file,mime),token=crypto.randomUUID?crypto.randomUUID():Date.now()+'-'+Math.random().toString(36).slice(2),path=user.id+'/'+token+'.'+ext;
    const result=await uploadMediaFile(file,path,mime,pct=>{progress.hidden=false;progress.querySelector('span').style.width=Math.round((i+pct/100)/files.length*65)+'%';});
    if(result.error)throw result.error;
    const mediaRecord={media_path:path,media_type:mime.startsWith('video/')?'video':'image',position:i,duration_ms:null};uploaded.push(mediaRecord);
    let duration=null;
    if(mime.startsWith('video/'))duration=await getVideoDuration(file);
    if(form.dataset.contentKind==='reel'&&(!duration||duration>60000))throw new Error('Reel harus berupa video maksimal 60 detik.');
    mediaRecord.duration_ms=duration;
    progress.hidden=false;progress.querySelector('span').style.width=Math.round(65*uploaded.length/files.length)+'%';
   }
   const tags=[...new Set((caption.match(/#[\p{L}\p{N}_]+/gu)||[]).map(tag=>tag.slice(1).toLowerCase()))].slice(0,30);

   const context={profile_context:accountContext.active,professional_profile_id:accountContext.active==='professional'?accountContext.professional?.id||null:null,business_store_id:accountContext.active==='business'?(accountContext.prefs?.active_store_id||accountContext.stores[0]?.id||null):null};
   const first=uploaded[0],contentKind=form.dataset.contentKind==='reel'?'reel':'post',insert=await supabase.from('user_posts').insert({user_id:user.id,...context,content_kind:contentKind,caption,tags,media_path:first?.media_path||null,media_type:uploaded.length?(uploaded.length===1?first.media_type:'mixed'):'text',visibility:data.get('visibility')==='private'?'private':'public'}).select('id').single();
   if(insert.error)throw insert.error;
   if(uploaded.length){const link=await supabase.from('post_media').insert(uploaded.map(media=>({...media,post_id:insert.data.id,user_id:user.id})));if(link.error){await supabase.from('user_posts').delete().eq('id',insert.data.id);throw link.error;}}
   progress.querySelector('span').style.width='100%';revoke();
   let draftWarning=false;if(currentComposeDraft?.id){try{await deletePrivateDraft(user.id,currentComposeDraft.id);}catch{draftWarning=true;}}
   currentComposeDraft=null;notify(draftWarning?(contentKind==='reel'?'Reel berhasil diterbitkan, tetapi draf lokal belum terhapus.':'Post berhasil diterbitkan, tetapi draf lokal belum terhapus.'):(contentKind==='reel'?'Reel berhasil diterbitkan.':'Post berhasil diterbitkan.'),draftWarning?'error':'success');await mountAccount(contentKind==='reel'?'reels':'explore');
  }catch(error){
   if(uploaded.length)await supabase.storage.from(BUCKET).remove(uploaded.map(media=>media.media_path));
   const message=String(error?.message||error||'Upload gagal.');
   note(/failed to fetch|network|timeout/i.test(message)?'Koneksi upload terputus. Periksa jaringan lalu coba lagi.':message);
   button.disabled=false;button.textContent='Coba lagi';progress.hidden=true;
  }
 });
}
function bindStories(){
 document.querySelectorAll('.ua-story-group, .ua-post-avatar-link[data-story-items]').forEach(button=>{
  button.addEventListener('click',event=>{
   event.preventDefault();
   let items=[];try{items=JSON.parse(button.dataset.storyItems||'[]');}catch{}
   if(!items.length)return;
   let index=0;
   const overlay=document.createElement('div');overlay.className='ua-story-viewer ua-story-viewer-sequence';
   const render=()=>{
    const item=items[index],media=item.type==='video'?"<video src='"+esc(item.url)+"' autoplay controls playsinline preload='metadata'></video>":"<img src='"+esc(item.url)+"' alt='Story dari "+esc(button.dataset.storyOwner||'circle')+"'>";
    overlay.innerHTML="<div class='ua-story-viewer-card'><div class='ua-story-progress'>"+items.map((_,i)=>"<span class='"+(i<index?'is-done':i===index?'is-active':'')+"'><i></i></span>").join('')+"</div><button type='button' class='ua-story-viewer-close' data-story-close aria-label='Tutup Story'>×</button><button type='button' class='ua-story-step ua-story-prev' aria-label='Story sebelumnya'></button><button type='button' class='ua-story-step ua-story-next' aria-label='Story berikutnya'></button><div class='ua-story-viewer-media'>"+media+"</div><div class='ua-story-viewer-caption'><strong>"+esc(button.dataset.storyOwner||'Pengguna Pluits')+"</strong>"+(item.caption?"<p>"+esc(item.caption)+"</p>":"")+(button.dataset.demoStory==="true"?"<small class='ua-story-demo-note'>Pratinjau Story · data demo</small>":"")+"</div></div>";
    overlay.querySelector('.ua-story-prev').disabled=index===0;overlay.querySelector('.ua-story-next').disabled=index===items.length-1;
    overlay.querySelector('.ua-story-prev').onclick=()=>{if(index>0){index--;render();}};
    overlay.querySelector('.ua-story-next').onclick=()=>{if(index<items.length-1){index++;render();}};
    const video=overlay.querySelector('video');if(video)video.addEventListener('ended',()=>{if(index<items.length-1){index++;render();}});
   };
   render();document.body.appendChild(overlay);
   const close=()=>{overlay.remove();document.removeEventListener('keydown',keyHandler);};
   overlay.addEventListener('click',event=>{if(event.target===overlay||event.target.closest('[data-story-close]'))close();});
   const keyHandler=event=>{if(event.key==='Escape')close();else if(event.key==='ArrowRight'&&index<items.length-1){index++;render();}else if(event.key==='ArrowLeft'&&index>0){index--;render();}};
   document.addEventListener('keydown',keyHandler);
  });
 });
 document.querySelectorAll('.ua-story-item').forEach(button=>{
  button.addEventListener('click',()=>{
   const url=button.dataset.storyUrl||'';
   if(!url)return;
   const type=button.dataset.storyType||'image';
   const owner=button.dataset.storyOwner||'Pengguna Pluits';
   const caption=button.dataset.storyCaption||'';
   const media=type==='video'
    ?"<video src='"+esc(url)+"' controls playsinline preload='metadata'></video>"
    :"<img src='"+esc(url)+"' alt='Story dari "+esc(owner)+"'>";
   const overlay=document.createElement('div');
   overlay.className='ua-story-viewer';
   overlay.innerHTML="<div class='ua-story-viewer-card'><button type='button' class='ua-story-viewer-close' data-story-close aria-label='Tutup Story'>×</button><div class='ua-story-viewer-media'>"+media+"</div><div class='ua-story-viewer-caption'><strong>"+esc(owner)+"</strong>"+(caption?"<p>"+esc(caption)+"</p>":"")+"</div></div>";
   document.body.appendChild(overlay);
   overlay.addEventListener('click',event=>{
    if(event.target===overlay||event.target.closest('[data-story-close]'))overlay.remove();
   });
  });
 });
}
async function createPage(){
 const {data:blog,error}=await supabase.from('blog_profiles').select('id,display_title,slug').eq('owner_user_id',user.id).maybeSingle();
 if(error)throw error;
 const hasBlog=!!blog,blogHref='#/account/blog';
 const daily=(icon,title,href,kind='',status='')=>'<a class="ua-create-card ua-create-daily '+kind+'" href="'+href+'"><span class="ua-create-card-icon">'+socialIcon(icon,{size:22})+'</span><strong>'+title+'</strong>'+(status?'<em>'+status+'</em>':'')+'</a>';
 const feature=(icon,title,description,href,kind='',status='')=>{
  const body='<span class="ua-create-card-icon">'+socialIcon(icon,{size:22})+'</span><span class="ua-create-card-copy"><strong>'+title+'</strong><small>'+description+'</small>'+(status?'<em>'+status+'</em>':'')+'</span><span class="ua-create-card-arrow" aria-hidden="true">›</span>';
  return href?'<a class="ua-create-card ua-create-feature '+kind+'" href="'+href+'">'+body+'</a>':'<article class="ua-create-card ua-create-feature ua-create-staged '+kind+'" aria-disabled="true">'+body+'</article>';
 };
 const blogEntry=feature('book','Buat Blog','Terbitkan cerita, pengalaman, perjalanan, foto, dan video di ruang blog pribadi PLUITS.',blogHref,hasBlog?'is-blog':'is-blog',hasBlog?'KELOLA BLOG':'BUAT BLOG');
 return `<div class="ua-create-hub">
  <header class="ua-create-top"><h1>Mau buat apa hari ini?</h1><p>Mulai dari hal sederhana, bagikan sesuatu, atau bangun kehadiranmu di PLUITS.</p></header>
  <section class="ua-create-section ua-create-daily-section">
   <div class="ua-create-grid ua-create-social-grid">
    ${daily('camera','Story','#/account/story','is-story')}
    ${daily('image','Post','#/account/compose','is-post')}
    ${daily('reels','Reel','#/account/reel','is-reel')}
    <div class="ua-create-card ua-create-daily is-disabled" aria-disabled="true"><span class="ua-create-card-icon">${socialIcon('radio',{size:22})}</span><strong>Live</strong><em>COMING SOON</em></div>
   </div>
  </section>
  <section class="ua-create-section ua-create-secondary-section">
   <div class="ua-create-section-head"><h2>Klaim & Penerbitan</h2><p>Bangun identitas dan kelola keberadaanmu di PLUITS.</p></div>
   <div class="ua-create-feature-grid ua-create-publish-grid">
    ${blogEntry}
    ${feature('map-pin','Klaim Lokasi','Temukan tempat atau bisnis di peta. Jika sudah terdaftar, ajukan klaim untuk menghubungkannya dengan akun PLUITS.','#/places','is-claim')}
   </div>
  </section>
  <section class="ua-create-section ua-create-secondary-section">
   <div class="ua-create-section-head"><h2>Hubungkan Bisnis & Layanan</h2><p>Siapkan profil dan operasional usahamu dalam ekosistem PLUITS.</p></div>
   <div class="ua-create-feature-grid ua-create-business-grid">
    ${feature('store','Toko','Jual produk dan kelola katalog, pesanan, serta pelanggan.',null,'is-staged','DALAM PENGEMBANGAN')}
    ${feature('home','Restoran','Tampilkan menu, informasi restoran, dan layanan pelanggan.',null,'is-staged','DALAM PENGEMBANGAN')}
    ${feature('compass','Transportasi','Hubungkan armada dan tawarkan layanan perjalanan.',null,'is-staged','COMING SOON')}
    ${feature('send','Kurir','Siapkan layanan pengiriman dan pengelolaan pesanan.',null,'is-staged','COMING SOON')}
    ${feature('briefcase','Jasa Profesional','Tampilkan keahlian, paket layanan, dan portofolio.',null,'is-staged','DALAM PENGEMBANGAN')}
   </div>
  </section>
 </div>`;
}
function upgradePage(){
 return `<div class="ua-upgrade-page"><a class="ua-upgrade-back" href="#/account/create">‹ Kembali ke Buat</a><section class="ua-upgrade-hero"><span class="ua-eyebrow">PLUITS MEMBERSHIP</span><div class="ua-upgrade-symbol">${socialIcon('plus',{size:28})}</div><h1>Lebih banyak ruang untuk berkarya.</h1><p>Blog kini menjadi bagian dari Social Media PLUITS dan dapat digunakan oleh semua akun. Paket Premium disiapkan untuk modul lanjutan yang membutuhkan layanan tambahan.</p><span class="ua-upgrade-plan">PREMIUM</span></section><section class="ua-upgrade-feature"><div><span class="ua-eyebrow">FITUR PREMIUM</span><h2>Blog Studio</h2><p>Kelola ruang blog, buat kategori, simpan draft di akun, dan terbitkan tulisan dengan alamat khusus.</p></div><span class="ua-upgrade-feature-icon">${socialIcon('book',{size:25})}</span></section><div class="ua-upgrade-status"><strong>Upgrade Premium</strong><p>Pengaturan hak akses Premium sudah disiapkan. Pembayaran dan aktivasi paket otomatis belum tersedia, jadi akun belum akan dikenakan biaya dari halaman ini.</p><span>AKTIVASI PAKET MENYUSUL</span></div><a class="ua-primary ua-upgrade-cta" href="#/account/create">Kembali ke pilihan kreasi</a></div>`;
}

async function storyComposePage(){
 const {data:contentPrefs,error}=await supabase.from('account_content_preferences').select('story_default_visibility').eq('user_id',user.id).maybeSingle();
 if(error)throw error;
 const storyVisibility=contentPrefs?.story_default_visibility||'private';
 return `<div class="ua-page-heading"><div><span class="ua-eyebrow">STORY · 24 JAM</span><h1>Tambahkan Story</h1><p>Bagikan momen yang akan hilang setelah 24 jam.</p></div><a class="ua-outline" href="#/account/explore">Batal</a></div>
 <section class="ua-panel ua-compose-panel"><form id="ua-story-form" class="ua-compose-form">
  <label class="ua-upload-zone" for="ua-story-file"><span class="ua-upload-icon">＋</span><strong>Pilih foto atau video</strong><small>JPG, PNG, WebP, GIF, MP4, MOV, WebM, 3GP atau 3G2 · Maksimal 50 MB</small><input id="ua-story-file" type="file" accept="image/jpeg,image/png,image/webp,image/gif,video/*,.mp4,.m4v,.mov,.webm,.3gp,.3gpp,.3g2,.3gp2"></label>
  <div id="ua-story-preview" class="ua-media-preview"></div>
  <label class="ua-compose-caption-label"><textarea name="caption" rows="3" maxlength="500" placeholder="Tambahkan keterangan (opsional)"></textarea></label>
  <label class="ua-audience-field">Siapa yang dapat melihat Story?
   <select name="visibility"><option value="public" ${storyVisibility==='public'?'selected':''}>Publik</option><option value="private" ${storyVisibility==='private'?'selected':''}>Hanya saya</option></select>
  </label>
  <div class="ua-compose-actions"><button class="ua-primary" type="submit">Bagikan Story</button></div><p class="ua-form-note" id="ua-story-note"></p>
 </form></section>`;
}
function livePage(){
 return `<div class="ua-page-heading"><div><span class="ua-eyebrow">PLUITS LIVE</span><h1>Live belum tersedia</h1><p>Menu Live sudah disiapkan sebagai bagian dari alur Buat, tetapi siaran langsung belum diaktifkan.</p></div><a class="ua-outline" href="#/account/create">Kembali ke Buat</a></div><section class="ua-panel ua-empty"><strong>Kami tidak akan menampilkan tombol siaran palsu.</strong><p>Fitur ini memerlukan layanan streaming, moderasi real-time, dan pengujian koneksi sebelum dapat digunakan.</p></section>`;
}
function bindStoryCompose(){
 const form=document.querySelector('#ua-story-form');if(!form)return;
 const fileInput=form.querySelector("input[type='file']"),preview=document.querySelector('#ua-story-preview'),note=document.querySelector('#ua-story-note');
 fileInput?.addEventListener('change',()=>{
  if(preview.dataset.objectUrl)URL.revokeObjectURL(preview.dataset.objectUrl);
  preview.dataset.objectUrl='';preview.innerHTML='';
  const file=fileInput.files?.[0];if(!file)return;
  const mime=getMediaMime(file);
  if(!mime){note.textContent='Format tidak didukung. Gunakan JPG, PNG, WebP, GIF, MP4, MOV, WebM, 3GP atau 3G2.';fileInput.value='';return;}
  const url=URL.createObjectURL(file);preview.dataset.objectUrl=url;
  preview.innerHTML=mime.startsWith('video/')?"<video controls playsinline preload='metadata' src='"+url+"'></video>":"<img src='"+url+"' alt='Pratinjau Story'>";
 });
 form.addEventListener('submit',async event=>{
  event.preventDefault();
  const file=fileInput?.files?.[0];
  if(!file){note.textContent='Pilih foto atau video terlebih dahulu.';return;}
  const mime=getMediaMime(file);
  if(!mime){note.textContent='Format tidak didukung. Gunakan JPG, PNG, WebP, GIF, MP4, MOV, WebM, 3GP atau 3G2.';return;}
  if(file.size>50*1024*1024){note.textContent='Ukuran file maksimal 50 MB.';return;}
  const button=form.querySelector("button[type='submit']"),data=new FormData(form),caption=String(data.get('caption')||'').trim(),visibility=String(data.get('visibility')||'private');
  button.disabled=true;button.textContent='Mengunggah Story…';note.textContent='Mengunggah media ke Pluits…';
  let uploadedPath=null,storyInserted=false;
  try{
   const extension=getMediaExtension(file,mime),unique=crypto.randomUUID?crypto.randomUUID():Date.now()+'-'+Math.random().toString(36).slice(2),path=user.id+'/'+unique+'.'+extension;
   const upload=await uploadMediaFile(file,path,mime,()=>{});
   if(upload.error)throw new Error('Upload gagal: '+upload.error.message);
   uploadedPath=path;
   const insert=await supabase.from('user_stories').insert({user_id:user.id,media_path:uploadedPath,media_type:mime.startsWith('video/')?'video':'image',caption,visibility});
   if(insert.error)throw new Error('Story gagal disimpan: '+insert.error.message);
   storyInserted=true;uploadedPath=null;
   if(preview.dataset.objectUrl)URL.revokeObjectURL(preview.dataset.objectUrl);
   notify('Story berhasil dibagikan dan akan hilang setelah 24 jam.');
   await mountAccount('explore');
  }catch(error){
   if(uploadedPath&&!storyInserted){
    const cleanup=await supabase.storage.from(BUCKET).remove([uploadedPath]);
    if(cleanup.error)note.textContent='Story gagal disimpan dan file sementara tidak dapat dibersihkan: '+cleanup.error.message;
   }
   note.textContent=error.message||'Tidak dapat membagikan Story.';
   button.disabled=false;button.textContent='Coba lagi';
  }
 });
}

function bindAddresses(){
 const form=document.querySelector('#ua-address-form');if(!form)return;
 form.addEventListener('submit',async e=>{
  e.preventDefault();const f=new FormData(form),id=String(f.get('id')||''),note=document.querySelector('#ua-address-note');
  const payload={user_id:user.id,label:String(f.get('label')).trim(),recipient_name:String(f.get('recipient_name')).trim(),phone:String(f.get('phone')).trim(),province:String(f.get('province')).trim(),city:String(f.get('city')).trim(),district:String(f.get('district')).trim(),village:String(f.get('village')||'').trim()||null,postal_code:String(f.get('postal_code')).trim(),address_line:String(f.get('address_line')).trim(),delivery_note:String(f.get('delivery_note')||'').trim()||null,latitude:f.get('latitude')?Number(f.get('latitude')):null,longitude:f.get('longitude')?Number(f.get('longitude')):null,is_default:f.get('is_default')==='on'};
  if((payload.latitude===null)!==(payload.longitude===null)){note.textContent='Isi latitude dan longitude bersama-sama.';return;}
  const btn=form.querySelector('button[type=submit]');btn.disabled=true;note.textContent='Menyimpan alamat…';
  try{
   if(payload.is_default)await supabase.from('user_addresses').update({is_default:false}).eq('user_id',user.id);
   const result=id?await supabase.from('user_addresses').update(payload).eq('id',id).select().single():await supabase.from('user_addresses').insert(payload).select().single();
   if(result.error)throw result.error;notify('Alamat berhasil disimpan.');await mountAccount('addresses');
  }catch(err){note.textContent=err.message;btn.disabled=false;}
 });
 document.querySelector('#ua-reset-address')?.addEventListener('click',()=>{form.reset();form.elements.id.value='';document.querySelector('#ua-address-form-title').textContent='Tambah alamat';});
 document.querySelector('#ua-use-location')?.addEventListener('click',()=>{
  if(!navigator.geolocation){notify('Browser tidak mendukung lokasi perangkat.','error');return;}
  notify('Meminta izin lokasi perangkat…','info');
  navigator.geolocation.getCurrentPosition(pos=>{const lat=pos.coords.latitude,lng=pos.coords.longitude;form.elements.latitude.value=lat.toFixed(6);form.elements.longitude.value=lng.toFixed(6);if(leafletMap){leafletMap.setView([lat,lng],17);if(leafletMarker)leafletMarker.setLatLng([lat,lng]);else leafletMarker=window.L.marker([lat,lng]).addTo(leafletMap);}notify('Titik lokasi berhasil diambil. Periksa pin sebelum menyimpan.');},err=>notify(err.message,'error'),{enableHighAccuracy:true,timeout:12000});
 });
 document.querySelectorAll('[data-edit-address]').forEach(btn=>btn.addEventListener('click',()=>{
  const a=addresses.find(x=>x.id===btn.dataset.editAddress);if(!a)return;
  Object.entries(a).forEach(([k,v])=>{if(form.elements[k]){if(form.elements[k].type==='checkbox')form.elements[k].checked=!!v;else form.elements[k].value=v??'';}});
  document.querySelector('#ua-address-form-title').textContent='Edit alamat';document.querySelector('#ua-address-form').scrollIntoView({behavior:'smooth',block:'start'});
  if(leafletMap&&a.latitude!==null&&a.longitude!==null){leafletMap.setView([a.latitude,a.longitude],16);if(leafletMarker)leafletMarker.setLatLng([a.latitude,a.longitude]);else leafletMarker=window.L.marker([a.latitude,a.longitude]).addTo(leafletMap);}
 }));
 document.querySelectorAll('[data-delete-address]').forEach(btn=>btn.addEventListener('click',async()=>{
  if(!confirm('Hapus alamat ini?'))return;const {error}=await supabase.from('user_addresses').delete().eq('id',btn.dataset.deleteAddress);if(error)notify(error.message,'error');else{notify('Alamat dihapus.');await mountAccount('addresses');}
 }));
}
function bindPeopleRecommendationActions(){
 bindRecommendationFollowActions({documentRef:document,supabaseClient:supabase,user,notify});
}
function bindFollowActions(){
 bindRelationshipFollowActions({documentRef:document,supabaseClient:supabase,user,notify,mountAccount,locationRef:location});
}
function bindPostActions(){
 document.querySelectorAll('.ua-post-card').forEach(card=>{
  const id=card.dataset.postId;
  const menuButton=card.querySelector('[data-post-menu]'),menu=card.querySelector('.ua-post-menu');
  menuButton?.addEventListener('click',()=>{const wasOpen=menu?.hidden===false;document.querySelectorAll('.ua-post-menu').forEach(x=>x.hidden=true);document.querySelectorAll('[data-post-menu]').forEach(x=>x.setAttribute('aria-expanded','false'));if(menu){menu.hidden=wasOpen;menuButton.setAttribute('aria-expanded',String(!wasOpen));}});
  card.querySelector('[data-action="post-privacy"]')?.addEventListener('click',async()=>{
   if(menu)menu.hidden=true;menuButton?.setAttribute('aria-expanded','false');
   const panel=card.querySelector('.ua-post-privacy');if(!panel)return;
   const select=panel.querySelector('[data-post-visibility]'),save=panel.querySelector('[data-save-privacy]');
   panel.hidden=false;save.disabled=true;save.textContent='Memuat…';
   const result=await supabase.from('user_posts').select('visibility').eq('id',id).eq('user_id',user.id).single();
   if(result.error){notify(result.error.message,'error');panel.hidden=true;return;}
   select.value=result.data.visibility||'public';save.disabled=false;save.textContent='Simpan privasi';
   panel.querySelector('[data-close-privacy]').onclick=()=>{panel.hidden=true;};
   save.onclick=async()=>{
    save.disabled=true;save.textContent='Menyimpan…';
    const update=await supabase.from('user_posts').update({visibility:select.value}).eq('id',id).eq('user_id',user.id);
    if(update.error){notify(update.error.message,'error');save.disabled=false;save.textContent='Coba lagi';return;}
    notify('Privasi publikasi diperbarui.');panel.hidden=true;
   };
  });
  card.querySelector('[data-action="edit"]')?.addEventListener('click',async()=>{
   const box=card.querySelector('.ua-post-editor');if(!box)return;
   if(menu)menu.hidden=true;menuButton?.setAttribute('aria-expanded','false');
   box.hidden=false;
   if(box.dataset.ready==='1')return;
   box.innerHTML='<p class="ua-muted" role="status">Memuat editor postingan…</p>';
   try{
    const q=await supabase.from('user_posts').select('caption,tags,visibility').eq('id',id).eq('user_id',user.id).single();
    if(q.error)throw q.error;
    const mr=await supabase.from('post_media').select('id,media_path,media_type,position').eq('post_id',id).order('position');
    if(mr.error)throw mr.error;
    const media=await Promise.all((mr.data||[]).map(async x=>({...x,url:await signed(x.media_path)})));
    box.innerHTML='<div class="ua-edit-post-head"><strong>Edit postingan</strong><span>Perubahan akan diperbarui setelah disimpan.</span></div>'+
     '<label>Caption<textarea name="caption" rows="4" maxlength="2200">'+esc(q.data.caption||'')+'</textarea></label>'+
     '<label>Hashtag<input name="tags" value="'+esc((q.data.tags||[]).map(x=>'#'+String(x).replace(/^#/,'')).join(' '))+'" placeholder="#bali #kuliner"><small>Pisahkan hashtag dengan spasi.</small></label>'+
     '<label>Visibilitas<select name="visibility"><option value="public" '+(q.data.visibility==='public'?'selected':'')+'>Publik</option><option value="private" '+(q.data.visibility==='private'?'selected':'')+'>Privat</option></select></label>'+
     '<strong class="ua-edit-section-label">Media postingan</strong><div class="ua-edit-media-list">'+media.map(x=>'<div class="ua-edit-media">'+(x.media_type==='video'?'<video src="'+esc(x.url)+'" muted playsinline></video>':'<img src="'+esc(x.url)+'" alt="Media postingan">')+'<button type="button" data-remove-media="'+x.id+'" aria-label="Hapus media">×</button></div>').join('')+'</div>'+
     '<label class="ua-edit-add-media">Tambah foto atau video<input type="file" name="add_media" multiple accept="image/jpeg,image/png,image/webp,image/gif,video/*"><small>Maksimal 15 media, 50 MB per file.</small></label>'+
     '<div class="ua-edit-actions"><button type="button" class="ua-primary" data-save-post>Simpan perubahan</button><button type="button" class="ua-outline" data-close-post>Tutup</button></div>';
    box.dataset.ready='1';
    box.querySelector('[data-save-post]').onclick=async()=>{
     const btn=box.querySelector('[data-save-post]'),files=[...(box.querySelector('[name=add_media]')?.files||[])],caption=box.querySelector('[name=caption]').value.trim(),visibility=box.querySelector('[name=visibility]').value,raw=box.querySelector('[name=tags]').value,hashtags=[...new Set((raw.match(/#[A-Za-z0-9_]+/g)||[]).map(x=>x.slice(1).toLowerCase()))].slice(0,30);
     const bad=files.find(f=>!getMediaMime(f)||f.size>50*1024*1024);
     if(bad){notify(!getMediaMime(bad)?'Format file tidak didukung.':'Maksimal 50 MB per file.','error');return;}
     if(media.length+files.length>15){notify('Maksimal 15 media per postingan.','error');return;}
     btn.disabled=true;btn.textContent='Menyimpan…';const added=[];
     try{
      for(let i=0;i<files.length;i++){
       const file=files[i],mime=getMediaMime(file),ext=file.name.split('.').pop().toLowerCase(),token=crypto.randomUUID?crypto.randomUUID():Date.now()+'-'+Math.random().toString(36).slice(2),path=user.id+'/'+token+'.'+ext,up=await uploadMediaFile(file,path,mime,()=>{});
       if(up.error)throw up.error;
       let duration=null;
       if(mime.startsWith('video/'))duration=await getVideoDuration(file);
       added.push({post_id:id,user_id:user.id,media_path:path,media_type:mime.startsWith('video/')?'video':'image',position:media.reduce((max,item)=>Math.max(max,Number(item.position)||0),-1)+1+i,duration_ms:duration});
      }
      if(added.length){const ins=await supabase.from('post_media').insert(added);if(ins.error)throw ins.error;}
      const update=await supabase.from('user_posts').update({caption,tags:hashtags,visibility}).eq('id',id).eq('user_id',user.id);if(update.error)throw update.error;
      if(added.length&&!media.length){const parent=await supabase.from('user_posts').update({media_path:added[0].media_path,media_type:added.length===1?added[0].media_type:'mixed'}).eq('id',id).eq('user_id',user.id);if(parent.error)throw parent.error;}
      notify('Postingan berhasil diperbarui.');await refreshCurrentAccount({postId:id});
     }catch(err){
      if(added.length){await supabase.from('post_media').delete().in('media_path',added.map(x=>x.media_path));await supabase.storage.from(BUCKET).remove(added.map(x=>x.media_path));}
      notify(err.message||'Perubahan gagal disimpan.','error');btn.disabled=false;btn.textContent='Coba lagi';
     }
    };
    box.querySelector('[data-close-post]').onclick=()=>{box.hidden=true;};
    box.querySelectorAll('[data-remove-media]').forEach(btn=>btn.onclick=async()=>{
     if(!confirm('Hapus media ini dari postingan?'))return;
     const item=media.find(x=>x.id===btn.dataset.removeMedia);if(!item)return;btn.disabled=true;
     const del=await supabase.from('post_media').delete().eq('id',item.id).eq('post_id',id);
     if(del.error){notify(del.error.message,'error');btn.disabled=false;return;}
     const remaining=media.filter(x=>x.id!==item.id).sort((x,y)=>x.position-y.position),primary=remaining[0]||null;
     const parent=await supabase.from('user_posts').update({media_path:primary?.media_path||null,media_type:remaining.length>1?'mixed':primary?.media_type||'text'}).eq('id',id).eq('user_id',user.id);
     if(parent.error){notify(parent.error.message,'error');return;}
     const rm=await supabase.storage.from(BUCKET).remove([item.media_path]);if(rm.error)notify(rm.error.message,'error');
     notify('Media berhasil dihapus.');await mountAccount('profile');
    });
   }catch(err){
    box.innerHTML='<p class="ua-form-note is-error">'+esc(err.message||'Editor gagal dimuat.')+'</p><button type="button" class="ua-outline" data-retry-edit>Coba lagi</button>';
    box.querySelector('[data-retry-edit]')?.addEventListener('click',()=>{box.dataset.ready='';card.querySelector('[data-action="edit"]')?.click();});
   }
  });

  card.querySelector('[data-action="delete-post"]')?.addEventListener('click',async()=>{
   if(!user||card.dataset.ownerId!==user.id)return;
   if(menu)menu.hidden=true;menuButton?.setAttribute('aria-expanded','false');
   if(!confirm('Hapus postingan ini beserta media yang terhubung? Tindakan ini tidak dapat dibatalkan.'))return;
   const button=card.querySelector('[data-action="delete-post"]');if(button)button.disabled=true;
   try{
    const [mediaRes,postRes]=await Promise.all([
     supabase.from('post_media').select('media_path').eq('post_id',id),
     supabase.from('user_posts').select('media_path').eq('id',id).eq('user_id',user.id).single()
    ]);
    if(mediaRes.error)throw mediaRes.error;if(postRes.error)throw postRes.error;
    const paths=[...new Set([postRes.data.media_path,...(mediaRes.data||[]).map(x=>x.media_path)].filter(Boolean))];
    const del=await supabase.from('user_posts').delete().eq('id',id).eq('user_id',user.id);if(del.error)throw del.error;
    if(paths.length){const rm=await supabase.storage.from(BUCKET).remove(paths);if(rm.error)notify('Postingan terhapus, tetapi sebagian file media perlu dibersihkan: '+rm.error.message,'error');}
    notify('Postingan berhasil dihapus.');await refreshCurrentAccount({deleted:true});
   }catch(err){notify(err.message||'Postingan gagal dihapus.','error');if(button)button.disabled=false;}
  });

  card.querySelector('[data-action="hide-post"]')?.addEventListener('click',async()=>{if(menu)menu.hidden=true;const {error}=await supabase.from('user_hidden_content').upsert({viewer_id:user.id,target_type:'post',target_id:id},{onConflict:'viewer_id,target_type,target_id',ignoreDuplicates:true});if(error){notify(error.message,'error');return;}notify('Postingan disembunyikan dari feed Anda.');card.remove();});
  card.querySelector('[data-action="mute-user"]')?.addEventListener('click',async()=>{if(menu)menu.hidden=true;const ownerId=card.dataset.ownerId;if(!confirm('Sembunyikan semua Post, Reel, dan Story dari akun ini? Anda tetap mengikutinya.'))return;const {error}=await supabase.from('user_hidden_content').upsert({viewer_id:user.id,target_type:'user',target_id:ownerId},{onConflict:'viewer_id,target_type,target_id',ignoreDuplicates:true});if(error){notify(error.message,'error');return;}notify('Konten akun ini disembunyikan. Anda tetap mengikutinya.');document.querySelectorAll('.ua-post-card[data-owner-id="'+ownerId+'"]').forEach(item=>item.remove());});
  card.querySelector('[data-action="report"]')?.addEventListener('click',async()=>{if(menu)menu.hidden=true;const reason=prompt('Alasan laporan: spam, harassment, hate, violence, nudity, scam, misinformation, atau other','other');if(!reason)return;const allowed=['spam','harassment','hate','violence','nudity','scam','misinformation','other'];if(!allowed.includes(reason)){notify('Pilih alasan laporan yang tersedia.','error');return;}const {error}=await supabase.from('content_reports').insert({reporter_user_id:user.id,target_type:'post',target_id:id,reason});if(error)notify(error.message,'error');else notify('Laporan berhasil dikirim untuk ditinjau.');});
  bindPostLikeInteractions({
   card,postId:id,user,supabaseClient:supabase,notify,socialIcon,documentRef:document
  });
  card.querySelector('[data-action="save"]')?.addEventListener('click',async()=>{
   const p=await supabase.from('post_saves').select('post_id').eq('post_id',id).eq('user_id',user.id).maybeSingle();
   const result=p.data?await supabase.from('post_saves').delete().eq('post_id',id).eq('user_id',user.id):await supabase.from('post_saves').insert({post_id:id,user_id:user.id});
   if(result.error)notify(result.error.message,'error');else{notify(p.data?'Tanda disimpan dibatalkan.':'Postingan disimpan.');await refreshCurrentAccount({postId:id});}
  });
  card.querySelectorAll('[data-action="share"]').forEach(button=>button.addEventListener('click',async()=>{
   const url=location.origin+canonicalizeLegacyRoute('#/account/post/'+id);
   try{if(navigator.share)await navigator.share({title:'Postingan Pluits',url});else if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(url);notify('Tautan disalin.');}else{prompt('Salin tautan postingan ini:',url);}}catch{}
  }));
  card.querySelector('[data-action="tag"]')?.addEventListener('click',async()=>{
   const handle=prompt('Masukkan username akun yang ingin ditandai (tanpa @):');if(!handle)return;
   const username=handle.trim().replace(/^@/,'').toLowerCase();
   const {data:target,error:lookupError}=await supabase.from('user_profiles').select('id,username').eq('username',username).maybeSingle();
   if(lookupError||!target){notify(lookupError?.message||'Username tidak ditemukan.','error');return;}
   const {error}=await supabase.from('post_tags').insert({post_id:id,tagged_user_id:target.id,tagged_by:user.id});
   if(error)notify(error.code==='23505'?'Akun tersebut sudah ditandai.':error.message,'error');
   else{notify('@'+target.username+' berhasil ditandai.');await refreshCurrentAccount({postId:id});}
  });
  card.querySelector('[data-action="comments"]')?.addEventListener('click',async()=>{
   const box=card.querySelector('.ua-comments');box.hidden=!box.hidden;if(!box.hidden)await loadComments(id,box);
  });
 });
}
async function loadComments(postId,box){
 return loadPostComments({
  postId,box,supabaseClient:supabase,user,notify,escapeHtml:esc,formatDate:fmtDate,socialIcon,documentRef:document
 });
}
export function mountUserAccount(section='profile',parameter=''){return mountAccount(section,parameter);}
