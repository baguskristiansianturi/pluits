export function bindPostLikeInteractions({
 card,
 postId,
 user,
 supabaseClient,
 notify=()=>{},
 socialIcon=()=> '',
 documentRef=document
}={}){
 if(!card)return;
 const likeButton=card.querySelector('[data-action="like"]');
 const paintLikeState=(liked,count)=>{
  if(!likeButton)return;
  likeButton.classList.toggle('is-liked',liked);
  likeButton.setAttribute('aria-label',liked?'Batalkan suka':'Sukai');
  const countNode=likeButton.querySelector('b');if(countNode)countNode.textContent=String(count);
  const captionCount=card.querySelector('.ua-like-count');
  if(captionCount)captionCount.textContent=count+' suka';
 };
 const animateLikeTransition=(area,liked)=>{
  if(!area)return;
  area.querySelector('.ua-double-tap-heart')?.remove();
  const overlay=documentRef.createElement('span');overlay.className='ua-double-tap-heart '+(liked?'is-liking':'is-removing');
  const core=documentRef.createElement('span');core.className='ua-heart-core';core.innerHTML=socialIcon(liked?'heart':'heart-crack',{size:144});overlay.appendChild(core);
  const vectors=[[0,-94],[76,-58],[96,20],[42,88],[-46,84],[-96,18],[-76,-58]];
  vectors.forEach(([dx,dy],index)=>{const particle=documentRef.createElement('i');particle.className='ua-heart-particle';particle.style.setProperty('--dx',dx+'px');particle.style.setProperty('--dy',dy+'px');particle.style.setProperty('--delay',(index*32)+'ms');particle.innerHTML=socialIcon(liked?'heart':'heart-crack',{size:18});overlay.appendChild(particle);});
  area.appendChild(overlay);setTimeout(()=>overlay.remove(),1550);
 };
 const toggleLike=async(animationArea=null)=>{
  if(!user){notify('Masuk untuk menyukai postingan.','error');return;}
  if(!likeButton||likeButton.dataset.busy==='1')return;
  const wasLiked=likeButton.classList.contains('is-liked'),liked=!wasLiked;
  const oldCount=Number(card.querySelector('.ua-like-count')?.textContent.match(/[0-9]+/)?.[0]||0),nextCount=Math.max(0,oldCount+(liked?1:-1));
  likeButton.dataset.busy='1';
  paintLikeState(liked,nextCount);if(animationArea)animateLikeTransition(animationArea,liked);
  try{
   const result=wasLiked?await supabaseClient.from('post_likes').delete().eq('post_id',postId).eq('user_id',user.id):await supabaseClient.from('post_likes').insert({post_id:postId,user_id:user.id});
   if(result.error)throw result.error;
  }catch(error){paintLikeState(wasLiked,oldCount);notify(error.message||'Perubahan apresiasi belum tersimpan.','error');}
  finally{likeButton.dataset.busy='';}
 };
 likeButton?.addEventListener('click',()=>toggleLike());
 card.querySelectorAll('.ua-media img,.ua-gallery-item img').forEach(image=>{
  let lastTap=0;image.style.touchAction='manipulation';
  image.addEventListener('pointerup',event=>{
   if(event.pointerType==='mouse'&&event.button!==0)return;
   const now=Date.now();
   if(lastTap&&now-lastTap<330){lastTap=0;event.preventDefault();toggleLike(image.closest('.ua-media,.ua-gallery-item'));}
   else lastTap=now;
  });
 });
}
