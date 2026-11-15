import './explore-grid.css';

const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const icon=(name)=>name==='search'
 ? '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg>'
 : name==='play'
 ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 10 6-10 6z" fill="currentColor" stroke="none"></path></svg>'
 : name==='layers'
 ? '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="5" width="14" height="14" rx="2"></rect><path d="M3 8V3h5M16 3h5v5M21 16v5h-5M8 21H3v-5"></path></svg>'
 : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>';

function renderCard(post){
 const media=(post.media||[]).find(item=>item.url);
 const owner=post.owner||{};
 const username=escapeHtml(owner.username||'pengguna');
 const avatar=post.avatarUrl?'<img src="'+escapeHtml(post.avatarUrl)+'" alt="" loading="lazy">':'<span class="pl-explore-avatar-fallback">'+escapeHtml((owner.display_name||'P').slice(0,1).toUpperCase())+'</span>';
 const href='#/account/post/'+encodeURIComponent(post.id);
 let visual='';
 if(media?.media_type==='video'){
  visual='<video data-explore-video src="'+escapeHtml(media.url)+'" muted playsinline loop preload="none" aria-label="Pratinjau video dari @'+username+'"></video><span class="pl-explore-media-mark" aria-label="Video">'+icon('play')+'</span>';
 }else if(media?.url){
  visual='<img src="'+escapeHtml(media.url)+'" alt="Konten dari @'+username+'" loading="lazy" decoding="async">'+((post.media||[]).length>1?'<span class="pl-explore-media-mark" aria-label="Beberapa foto">'+icon('layers')+'</span>':'');
 }else{
  const copy=escapeHtml(String(post.caption||'').trim().slice(0,150));
  visual='<span class="pl-explore-text-tile">'+(copy||'Cerita dari komunitas PLUITS')+'</span>';
 }
 return '<a class="pl-explore-card" href="'+href+'" aria-label="Buka postingan dari @'+username+'"><span class="pl-explore-card-media">'+visual+'</span><span class="pl-explore-card-owner"><span class="pl-explore-avatar">'+avatar+'</span><span class="pl-explore-username">@'+username+'</span></span><span class="pl-explore-card-view" aria-hidden="true">'+icon('eye')+'</span></a>';
}

export function renderExploreGrid({posts=[],categories=[],selectedCategory='all',contentType='all',blogMarkup='',liveMarkup=''}={}){
 const typeOptions=[['all','Semua'],['reel','Reel'],['live','Live'],['blog','Artikel']];
 const typeChips=typeOptions.map(([value,label])=>'<button type="button" class="pl-explore-chip '+(contentType===value?'is-active':'')+'" data-content-type="'+value+'" aria-pressed="'+(contentType===value)+'">'+label+'</button>').join('');
 const categoryChips=categories.filter(item=>item?.slug&&item?.name).map(item=>{
  const slug=String(item.slug).toLowerCase();
  return '<button type="button" class="pl-explore-chip '+(selectedCategory===slug?'is-active':'')+'" data-explore-category="'+escapeHtml(slug)+'" aria-pressed="'+(selectedCategory===slug)+'">'+escapeHtml(item.name)+'</button>';
 }).join('');
 const content=contentType==='blog'?blogMarkup:contentType==='live'?liveMarkup:posts.length?posts.map(renderCard).join(''):'<div class="pl-explore-empty">Belum ada konten publik yang cocok.</div>';
 const contentClass=contentType==='blog'?'pl-explore-blog-feed':'pl-explore-grid';
 return '<section class="pl-explore-discovery" aria-label="Jelajah PLUITS"><header class="pl-explore-header"><h1>Jelajah</h1><a href="#/search" aria-label="Cari konten, orang, atau topik">'+icon('search')+'</a></header><nav class="pl-explore-category-carousel" aria-label="Kategori Jelajah">'+typeChips+categoryChips+'</nav><div class="'+contentClass+'">'+content+'</div></section>';
}

let playbackObserver=null;
let playbackVisibilityHandler=null;
export function bindExploreGridPlayback(){
 if(playbackObserver){playbackObserver.disconnect();playbackObserver=null;}
 if(playbackVisibilityHandler)document.removeEventListener('visibilitychange',playbackVisibilityHandler);
 const videos=[...document.querySelectorAll('[data-explore-video]')];
 if(!videos.length)return;
 let activeVideo=null;
 const pauseAll=()=>videos.forEach(video=>{if(!video.paused)video.pause();});
 if(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)return;
 const activate=video=>{
  if(document.hidden)return;
  if(activeVideo&&activeVideo!==video)activeVideo.pause();
  activeVideo=video;
  video.muted=true;video.loop=true;video.playsInline=true;
  const attempt=video.play();
  if(attempt?.catch)attempt.catch(()=>{});
 };
 playbackVisibilityHandler=()=>{
  if(document.hidden){pauseAll();activeVideo=null;}
 };
 document.addEventListener('visibilitychange',playbackVisibilityHandler);
 if(!('IntersectionObserver'in window)){activate(videos[0]);return;}
 playbackObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
   const video=entry.target;
   if(entry.isIntersecting&&entry.intersectionRatio>=.55)activate(video);
   else if(video===activeVideo){video.pause();activeVideo=null;}
  });
 },{threshold:[0,.2,.55,.8],rootMargin:'100px 0px'});
 videos.forEach(video=>playbackObserver.observe(video));
}
