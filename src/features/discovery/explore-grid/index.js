const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const videoMark='<span class="ds-tile-video-mark" aria-label="Video"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m10 9 5 3-5 3z"></path></svg></span>';

export function renderDiscoveryMediaTile(media,post,index=0){
 if(!media?.url)return '<span class="ds-text-tile">'+esc((post?.caption||'PLUITS').slice(0,110))+'</span>';
 if(media.media_type==='video'){
  return '<span class="ds-video-poster-placeholder" aria-hidden="true"></span><video class="ds-tile-video" data-discovery-video src="'+esc(media.url)+'" muted playsinline loop preload="none" aria-label="Pratinjau video"></video>'+videoMark;
 }
 const priority=index<3?' fetchpriority="high"':'';
 const loading=index<9?'eager':'lazy';
 return '<span class="ds-image-fallback" aria-hidden="true"></span><img src="'+esc(media.url)+'" loading="'+loading+'" decoding="async"'+priority+' alt="Foto publik">';
}

function getConcurrentVideoBudget(){
 const connection=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
 const memory=Number(navigator.deviceMemory)||0;
 const cores=Number(navigator.hardwareConcurrency)||0;
 const isMobile=/Android|iPhone|iPad|Mobile/i.test(navigator.userAgent||'');
 if(connection?.saveData)return 1;
 if((memory>0&&memory<=2)||(cores>0&&cores<=4))return 1;
 if((memory>0&&memory<=4)||(cores>0&&cores<=6))return 2;
 return isMobile?2:4;
}

function capturePoster(video){
 try{
  if(!video.videoWidth||!video.videoHeight)return;
  const scale=Math.min(1,480/video.videoWidth);
  const canvas=document.createElement('canvas');
  canvas.width=Math.max(1,Math.round(video.videoWidth*scale));
  canvas.height=Math.max(1,Math.round(video.videoHeight*scale));
  const context=canvas.getContext('2d',{alpha:false});
  if(!context)return;
  context.drawImage(video,0,0,canvas.width,canvas.height);
  video.poster=canvas.toDataURL('image/jpeg',.82);
 }catch{/* Cross-origin or device canvas restrictions: the decoded video frame remains visible. */}
}

export function mountDiscoveryMediaPreviews(root){
 const images=[...root.querySelectorAll('.ds-tile-media img')];
 images.forEach(image=>{
  const fallback=image.previousElementSibling;
  const ready=()=>{image.classList.add('is-image-ready');fallback?.classList.add('is-hidden');};
  image.addEventListener('load',ready,{once:true});
  image.addEventListener('error',()=>{image.classList.add('is-image-unavailable');fallback?.classList.remove('is-hidden');},{once:true});
  if(image.complete&&image.naturalWidth)ready();
 });
 const videos=[...root.querySelectorAll('[data-discovery-video]')];
 if(!videos.length)return ()=>{};
 const reduceMotion=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
 if(reduceMotion)return ()=>videos.forEach(video=>video.pause());

 let observer=null,visibilityHandler=null,routeHandler=null;
 const visible=new Map(),active=new Set(),budget=getConcurrentVideoBudget();
 let disposed=false;
 const pause=video=>{video.pause();active.delete(video);};
 const update=()=>{
  if(disposed||document.hidden)return;
  const ranked=[...visible.entries()].sort((a,b)=>b[1]-a[1]).map(([video])=>video);
  const selected=new Set(ranked.slice(0,budget));
  active.forEach(video=>{if(!selected.has(video))pause(video);});
  selected.forEach(video=>{
   if(video.readyState<2||active.has(video)||video.classList.contains('is-preview-unavailable'))return;
   video.muted=true;video.playsInline=true;video.loop=true;
   const result=video.play();
   if(result?.then)result.then(()=>{if(!selected.has(video)||document.hidden)pause(video);}).catch(()=>{video.classList.add('is-autoplay-blocked');pause(video);});
   active.add(video);
  });
 };
 const onFrame=video=>{
  video.classList.add('has-frame');
  capturePoster(video);
  update();
 };
 videos.forEach(video=>{
  video.muted=true;video.playsInline=true;video.loop=true;
  video.addEventListener('loadedmetadata',()=>{
   if(visible.has(video)&&!video.seeking){
    try{video.currentTime=Math.min(.1,Number.isFinite(video.duration)?Math.max(.02,video.duration/30):.1);}catch{/* Keep the neutral fallback if seeking is unsupported. */}
   }
  },{once:true});
  video.addEventListener('loadeddata',()=>onFrame(video),{once:true});
  video.addEventListener('error',()=>{video.classList.add('is-preview-unavailable');pause(video);},{once:true});
  video.addEventListener('stalled',()=>{if(video.readyState<2)video.classList.add('is-preview-loading');});
  video.addEventListener('playing',()=>video.classList.remove('is-preview-loading'));
 });
 const requestLoad=video=>{
  if(video.dataset.previewRequested==='1')return;
  video.dataset.previewRequested='1';
  video.preload='metadata';
  video.load();
 };
 if('IntersectionObserver'in window){
  observer=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
    const video=entry.target;
    if(entry.isIntersecting&&entry.intersectionRatio>=.05){
     visible.set(video,entry.intersectionRatio);
     requestLoad(video);
    }else{
     visible.delete(video);
     if(active.has(video))pause(video);
    }
   });
   update();
  },{threshold:[0,.05,.2,.5,.8],rootMargin:'140px 0px'});
  videos.forEach(video=>observer.observe(video));
 }else{
  videos.slice(0,budget).forEach(video=>{visible.set(video,1);requestLoad(video);});
 }
 visibilityHandler=()=>{if(document.hidden){active.forEach(pause);}else update();};
 routeHandler=()=>cleanup();
 document.addEventListener('visibilitychange',visibilityHandler);
 window.addEventListener('hashchange',routeHandler,{once:true});
 function cleanup(){
  if(disposed)return;
  disposed=true;
  observer?.disconnect();
  document.removeEventListener('visibilitychange',visibilityHandler);
  window.removeEventListener('hashchange',routeHandler);
  videos.forEach(pause);
  visible.clear();
 }
 return cleanup;
}
