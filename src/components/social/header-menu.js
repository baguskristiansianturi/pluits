let bound=false;

export function bindSocialHeaderMenu(){
 if(bound)return;
 bound=true;
 document.addEventListener('click',event=>{
  const trigger=event.target.closest('.pl-social-menu-trigger');
  const activeMenu=trigger?.closest('.pl-social-header-menu');
  if(activeMenu){
   event.preventDefault();
   event.stopPropagation();
   const panel=activeMenu.querySelector('.pl-social-menu-panel');
   if(!panel)return;
   const shouldOpen=panel.hidden;
   document.querySelectorAll('.pl-social-header-menu .pl-social-menu-panel').forEach(item=>{item.hidden=true;});
   document.querySelectorAll('.pl-social-header-menu .pl-social-menu-trigger').forEach(item=>item.setAttribute('aria-expanded','false'));
   panel.hidden=!shouldOpen;
   trigger.setAttribute('aria-expanded',String(shouldOpen));
   return;
  }
  const link=event.target.closest('.pl-social-menu-panel a');
  if(link){
   const menu=link.closest('.pl-social-header-menu');
   const panel=menu?.querySelector('.pl-social-menu-panel');
   const button=menu?.querySelector('.pl-social-menu-trigger');
   if(panel)panel.hidden=true;
   if(button)button.setAttribute('aria-expanded','false');
   return;
  }
  document.querySelectorAll('.pl-social-header-menu').forEach(menu=>{
   if(menu.contains(event.target))return;
   const panel=menu.querySelector('.pl-social-menu-panel');
   const button=menu.querySelector('.pl-social-menu-trigger');
   if(panel)panel.hidden=true;
   if(button)button.setAttribute('aria-expanded','false');
  });
 });
 document.addEventListener('keydown',event=>{
  if(event.key!=='Escape')return;
  document.querySelectorAll('.pl-social-header-menu').forEach(menu=>{
   const panel=menu.querySelector('.pl-social-menu-panel');
   const button=menu.querySelector('.pl-social-menu-trigger');
   if(panel)panel.hidden=true;
   if(button)button.setAttribute('aria-expanded','false');
  });
 });
}
