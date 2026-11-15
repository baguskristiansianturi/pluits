import { socialIcon } from './social-icons.js';

export function renderDiscoveryHeader({query='',notificationCount=0}={}){
 const badge=notificationCount>0?'<i class="ds-header-badge">'+(notificationCount>99?'99+':notificationCount)+'</i>':'';
 return `<header class="ds-top">
  <h1 class="ds-sr-only">Jelajah PLUITS</h1>
  <form class="ds-search" data-discovery-header-search role="search" aria-label="Cari di PLUITS">
   <span class="ds-search-icon"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"></circle><path d="m16 16 5 5"></path></svg></span>
   <span class="ds-search-label">Jelajah</span>
   <input id="ds-query" name="q" type="search" autocomplete="off" value="${String(query).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]))}" placeholder="Cari konten, orang, atau topik…" aria-label="Cari konten, orang, atau topik">
   <button type="submit" aria-label="Cari"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></button>
  </form>
  <a class="ds-header-notification" href="#/account/activity" aria-label="Notifikasi" title="Notifikasi">${socialIcon('bell',{size:20})}${badge}</a>
 </header>`;
}

export function bindDiscoveryHeader(root=document){
 root.querySelectorAll('[data-discovery-header-search]').forEach(form=>{
  if(form.dataset.bound==='1')return;
  form.dataset.bound='1';
  form.addEventListener('submit',event=>{
   event.preventDefault();
   const query=form.querySelector('input[name="q"]')?.value?.trim()||'';
   location.hash='#/search'+(query?'?q='+encodeURIComponent(query):'');
  });
 });
}
