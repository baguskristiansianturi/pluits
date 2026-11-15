export function bindProfileTabs({
 documentRef=document,
 ownPosts=[],
 profileReels=[],
 postGrid,
 loadBlog,
 escapeHtml=value=>String(value??'')
}={}){
 const nav=documentRef.querySelector('.ua-profile-tabs');
 const panel=documentRef.querySelector('#ua-profile-tab-content');
 if(!nav||!panel||typeof postGrid!=='function'||typeof loadBlog!=='function')return;
 const postsMarkup=postGrid(ownPosts.filter(post=>post.content_kind!=='reel'));
 const reelsMarkup='<div class="ua-section-title"><strong>Reels</strong><a class="ua-outline" href="#/account/reel">＋ Buat Reel</a></div>'+(profileReels.length?postGrid(profileReels):'<div class="ua-empty"><strong>Belum ada Reels</strong><p>Video tunggal berdurasi hingga 60 detik akan muncul di sini.</p><a class="ua-primary ua-inline" href="#/account/reel">Unggah video</a></div>');
 const views={
  posts:postsMarkup,
  reels:reelsMarkup,
  trip:'<div class="ua-profile-tab-empty"><span>⌖</span><strong>Perjalanan Anda</strong><p>Trip yang Anda buat, ikuti, atau bagikan akan tampil di sini.</p><a class="ua-outline" href="#/trip">Jelajahi Trip</a></div>'
 };
 let blogRequest=0;
 nav.addEventListener('click',async event=>{
  const button=event.target.closest('[data-profile-tab]');
  if(!button||!nav.contains(button))return;
  const tab=button.dataset.profileTab;
  if(!['posts','reels','trip','blog'].includes(tab))return;
  nav.querySelectorAll('[data-profile-tab]').forEach(item=>{
   const active=item===button;
   item.classList.toggle('active',active);
   item.setAttribute('aria-selected',String(active));
  });
  panel.dataset.activeTab=tab;
  if(tab!=='blog'){
   blogRequest+=1;
   panel.innerHTML=views[tab];
   return;
  }
  const request=++blogRequest;
  panel.innerHTML='<div class="ua-profile-tab-empty" role="status">Memuat Blog…</div>';
  try{
   const markup=await loadBlog();
   if(request===blogRequest&&panel.dataset.activeTab==='blog')panel.innerHTML=markup;
  }catch(error){
   if(request!==blogRequest||panel.dataset.activeTab!=='blog')return;
   panel.innerHTML='<div class="ua-profile-tab-empty"><strong>Blog belum dapat dimuat</strong><p>'+escapeHtml(error?.message||'Periksa koneksi lalu coba lagi.')+'</p></div>';
  }
 });
}
