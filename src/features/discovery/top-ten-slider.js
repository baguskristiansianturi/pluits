let autoTimer=null;
let visibilityHandler=null;
let activeCleanup=null;

export function bindTopTenSlider(root=document){
 activeCleanup?.();
 const track=root.querySelector('#ua-home-topten-grid');
 if(!track||!window.matchMedia('(max-width:760px)').matches)return ()=>{};
 const cards=[...track.querySelectorAll('.ua-topten-card')];
 if(cards.length<2)return ()=>{};

 let interacting=false,autoScrolling=false,animationFrame=null,settleTimer=null;
 const nearestIndex=()=>cards.reduce((best,card,i)=>{
  const distance=Math.abs(card.getBoundingClientRect().left-track.getBoundingClientRect().left);
  const bestDistance=Math.abs(cards[best].getBoundingClientRect().left-track.getBoundingClientRect().left);
  return distance<bestDistance?i:best;
 },0);
 const stopAuto=()=>{
  if(autoTimer){clearTimeout(autoTimer);autoTimer=null;}
 };
 const stopAnimation=()=>{
  if(animationFrame!==null){cancelAnimationFrame(animationFrame);animationFrame=null;}
  autoScrolling=false;
 };
 const scheduleAuto=(delay=4200)=>{
  stopAuto();
  if(interacting||document.hidden)return;
  autoTimer=setTimeout(()=>{
   autoTimer=null;
   if(interacting||document.hidden)return;
   const current=nearestIndex(),next=(current+1)%cards.length;
   const from=track.scrollLeft;
   const target=cards[next].offsetLeft-track.offsetLeft;
   const distance=target-from;
   if(Math.abs(distance)<2){scheduleAuto(4200);return;}
   autoScrolling=true;
   const duration=950,started=performance.now();
   const animate=now=>{
    if(!autoScrolling||interacting){animationFrame=null;return;}
    const progress=Math.min(1,(now-started)/duration);
    const eased=1-Math.pow(1-progress,5);
    track.scrollLeft=from+distance*eased;
    if(progress<1){animationFrame=requestAnimationFrame(animate);return;}
    animationFrame=null;autoScrolling=false;scheduleAuto(4200);
   };
   animationFrame=requestAnimationFrame(animate);
  },delay);
 };
 const beginInteraction=()=>{
  interacting=true;stopAuto();stopAnimation();
  if(settleTimer){clearTimeout(settleTimer);settleTimer=null;}
 };
 const endInteraction=()=>{
  interacting=false;
  scheduleAuto(3600);
 };
 const onScroll=()=>{
  if(autoScrolling||interacting)return;
  stopAuto();
  if(settleTimer)clearTimeout(settleTimer);
  settleTimer=setTimeout(()=>{
   settleTimer=null;
   if(!interacting)scheduleAuto(3600);
  },220);
 };
 const onVisibilityChange=()=>{
  if(document.hidden){stopAuto();stopAnimation();return;}
  if(!interacting)scheduleAuto(1200);
 };
 track.addEventListener('pointerdown',beginInteraction,{passive:true});
 track.addEventListener('pointerup',endInteraction,{passive:true});
 track.addEventListener('pointercancel',endInteraction,{passive:true});
 track.addEventListener('touchcancel',endInteraction,{passive:true});
 track.addEventListener('scroll',onScroll,{passive:true});
 track.addEventListener('mouseenter',beginInteraction);
 track.addEventListener('mouseleave',endInteraction);
 track.addEventListener('focusin',beginInteraction);
 track.addEventListener('focusout',endInteraction);
 visibilityHandler=onVisibilityChange;
 document.addEventListener('visibilitychange',visibilityHandler);
 scheduleAuto(4200);

 const cleanup=()=>{
  stopAuto();stopAnimation();
  if(settleTimer){clearTimeout(settleTimer);settleTimer=null;}
  track.removeEventListener('pointerdown',beginInteraction);
  track.removeEventListener('pointerup',endInteraction);
  track.removeEventListener('pointercancel',endInteraction);
  track.removeEventListener('touchcancel',endInteraction);
  track.removeEventListener('scroll',onScroll);
  track.removeEventListener('mouseenter',beginInteraction);
  track.removeEventListener('mouseleave',endInteraction);
  track.removeEventListener('focusin',beginInteraction);
  track.removeEventListener('focusout',endInteraction);
  if(visibilityHandler){document.removeEventListener('visibilitychange',visibilityHandler);visibilityHandler=null;}
  if(activeCleanup===cleanup)activeCleanup=null;
 };
 activeCleanup=cleanup;
 return cleanup;
}
