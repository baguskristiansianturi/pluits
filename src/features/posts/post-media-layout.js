function bindPostGalleries(root=document){
 root.querySelectorAll('.ua-media-gallery[data-gallery]').forEach(gallery=>{
  const track=gallery.querySelector('.ua-gallery-track'),counter=gallery.querySelector('[data-gallery-count]');
  if(!track||!counter||track.dataset.bound==='1')return;
  track.dataset.bound='1';
  const update=()=>{const width=track.clientWidth||1;const index=Math.min(track.children.length,Math.max(1,Math.round(track.scrollLeft/width)+1));counter.textContent=index+'/'+track.children.length;};
  track.addEventListener('scroll',update,{passive:true});update();
 });
}
function normalizeFeedMediaFrames(root=document){
 const mediaNodes=root.querySelectorAll('.ua-social-home .ua-media img,.ua-social-home .ua-media video,.ua-social-home .ua-gallery-item img,.ua-social-home .ua-gallery-item video,.ua-post-detail-page .ua-media img,.ua-post-detail-page .ua-media video,.ua-post-detail-page .ua-gallery-item img,.ua-post-detail-page .ua-gallery-item video');
 const dimensions=el=>({w:el.naturalWidth||el.videoWidth,h:el.naturalHeight||el.videoHeight});
 const boundedRatio=(w,h)=>Math.min(4/5,Math.max(1/1.91,w/h));
 const isDetail=el=>!!el.closest('.ua-post-detail-page');
 const apply=el=>{
  const gallery=el.closest('.ua-media-gallery');
  if(gallery){
   const first=gallery.querySelector('.ua-gallery-item img,.ua-gallery-item video');
   if(!first)return;
   const {w,h}=dimensions(first);if(!w||!h)return;
   const ratio=isDetail(first)?boundedRatio(w,h):4/5;
   gallery.querySelectorAll('.ua-gallery-item').forEach(frame=>{
    frame.style.aspectRatio=String(ratio);
    frame.dataset.mediaRatio=ratio.toFixed(4);
   });
   return;
  }
  const {w,h}=dimensions(el);if(!w||!h)return;
  const ratio=isDetail(el)?boundedRatio(w,h):4/5;
  const frame=el.closest('.ua-media');
  if(!frame)return;
  frame.style.aspectRatio=String(ratio);
  frame.dataset.mediaRatio=ratio.toFixed(4);
 };
 mediaNodes.forEach(el=>{
  if(el.tagName==='VIDEO'){
   if(el.readyState>=1)apply(el);else el.addEventListener('loadedmetadata',()=>apply(el),{once:true});
  }else{
   if(el.complete)apply(el);else el.addEventListener('load',()=>apply(el),{once:true});
  }
 });
}
