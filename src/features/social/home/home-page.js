import { routeHref } from '../../../config/paths.js';
import '../../../design-system/page-shell.css';
import { renderPageHeader } from '../../../design-system/page-shell.js';
import { renderIcon } from '../../../design-system/icons.js';
import { API_BASE_URL } from '../../../config/runtime.js';
import './home-page.css';
import { renderSocialPostCard as renderPostCard, renderDemoFeed, mountSocialPostInteractions } from '../feed/social-post-card.js';
import { renderStoriesRail } from '../stories/stories-rail.js';
import { renderLivePreview } from '../live/live-preview.js';

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
const contentTabs = [{id:'all',icon:'grid',label:'Semua'},{id:'reels',icon:'film',label:'Reel'},{id:'blog',icon:'book',label:'Blog'},{id:'live',icon:'radio',label:'Live'}];
const heading = (title, note, action, href) => '<div class="global-section-heading"><div><h2>' + title + '</h2>' + (note ? '<p>' + note + '</p>' : '') + '</div>' + (action ? '<a href="' + href + '">' + action + ' ' + renderIcon('eye') + '</a>' : '') + '</div>';
function quickSearchSheet() {
  return '<div class="global-search-backdrop" data-quick-search-backdrop hidden><section class="global-search-sheet" role="dialog" aria-modal="true" aria-labelledby="quick-search-title"><header><div><span class="global-kicker">SOCIAL MEDIA PLUITS</span><h2 id="quick-search-title">Temukan orang dan cerita.</h2></div><button type="button" data-close-quick-search aria-label="Tutup pencarian">×</button></header><form data-quick-search-form><label class="global-search-entry"><span class="ui-icon">' + renderIcon('search') + '</span><input type="search" name="q" placeholder="Cari orang, cerita, artikel..." autocomplete="off" autofocus><button type="submit">Cari</button></label></form><p class="global-search-sheet-label">Jelajahi Social Media</p><div class="global-search-category-grid"><a href="' + routeHref('discover') + '?category=people">Orang & komunitas</a><a href="' + routeHref('blog') + '">Artikel Blog</a></div></section></div>';
}
function renderFeedState(message,loading=false) {
  return '<div class="global-feed-state' + (loading?' is-loading':'') + '">' + (loading?'<span class="global-feed-spinner" aria-hidden="true"></span>':'<span class="global-feed-state-icon">' + renderIcon('image') + '</span>') + '<strong>' + message + '</strong>' + (!loading?'<p>Konten publik yang sudah diterbitkan akan muncul di sini.</p>':'') + '</div>';
}
export function mountHomePage({root,user=null,onSignOut,accessToken=null}={}) {
  const account = '<a class="global-icon-button" href="' + routeHref(user?'profile':'login') + '" aria-label="' + (user?'Akun':'Masuk') + '" title="' + (user?'Akun':'Masuk') + '">' + renderIcon('user') + '</a>';
  const actions = '<div class="global-header-actions"><a class="global-icon-button global-marketplace-entry" href="' + routeHref('marketplace') + '" aria-label="Marketplace" title="Marketplace">' + renderIcon('shoppingBag') + '</a>' + account + '<a class="global-icon-button" href="' + routeHref('discover') + '" aria-label="Cari di Social Media" title="Cari di Social Media">' + renderIcon('search') + '</a></div>';
  const discovery = '<section class="global-section global-people-section" id="people"><div class="global-section-heading"><div><h2>Orang yang mungkin Anda kenal</h2><p>Temukan kenalan baru dari sekitar Anda.</p></div><a href="' + routeHref('discover') + '?mode=people">Jelajahi ' + renderIcon('eye') + '</a></div><div class="global-bleed-wrap"><div class="global-people-rail" aria-label="Rekomendasi orang">' + [['Ayu Pratiwi','Bali','photo-1534528741775-53994a69daeb'],['Raka Mahendra','Jakarta','photo-1500648767791-00dcc994a43e'],['Nadia Putri','Bandung','photo-1531123897727-8f129e1688ce'],['Dimas Saputra','Yogyakarta','photo-1506794778202-cad84cf45f1d'],['Sinta Maharani','Surabaya','photo-1544005313-94ddf0286df2']].map((person,i)=>'<a class="global-person-card" href="' + routeHref('discover') + '?mode=people"><img src="https://images.unsplash.com/' + person[2] + '?auto=format&fit=crop&w=480&q=80" alt="Foto profil ' + person[0] + '" loading="lazy"><span class="global-person-overlay"><strong>' + person[0] + '</strong><small>' + person[1] + '</small></span><span class="global-person-add" aria-hidden="true">+</span></a>').join('') + '</div></div></section>';
  const streams = '<section class="global-content-section" id="content-all" data-content-stream><div class="global-post-list" data-live-feed>' + renderDemoFeed('feed') + '</div>' + renderLivePreview() + '</section>';
  const composerMarkup = user
    ? (API_BASE_URL
      ? '<section class="global-composer" aria-labelledby="global-composer-title"><div class="global-composer-heading"><span class="global-composer-avatar">' + escapeHtml((user.user_metadata?.display_name || user.user_metadata?.full_name || 'P').slice(0,1).toUpperCase()) + '</span><div><strong id="global-composer-title">Bagikan cerita Anda</strong><small>Mulai percakapan dengan komunitas PLUITS</small></div></div><form data-social-composer><label class="global-composer-label" for="global-post-caption">Apa yang ingin Anda ceritakan?</label><textarea id="global-post-caption" name="caption" maxlength="5000" rows="3" required placeholder="Tulis sesuatu yang bermakna…"></textarea><div class="global-composer-footer"><label class="global-composer-visibility"><span>Visibilitas</span><select name="visibility"><option value="public">Publik</option><option value="private">Hanya saya</option></select></label><span data-composer-count>0 / 5.000</span><button type="submit" data-composer-submit>Terbitkan</button></div><p class="global-composer-status" data-composer-status role="status" aria-live="polite"></p></form></section>'
      : '<section class="global-composer is-unavailable"><strong>Bagikan cerita Anda</strong><p>Bagikan momen dan cerita Anda bersama circle.</p></section>')
    : '';
  const pageHeaderMarkup=renderPageHeader({brandHref:routeHref('home'),rightContent:'<div class="global-header-tools">' + actions + '</div>',className:'global-header',dataGlobalHeader:true});
  root.innerHTML = '<div class="pl-page-shell pl-page-shell--surface pl-page-shell--standard-content home-page global-home-page">' +
    pageHeaderMarkup +
    '<main class="pl-page-main home-main global-home-main"><button type="button" class="global-home-search-entry" data-open-quick-search><span>' + renderIcon('search') + '</span><span><strong>Cari di Social Media</strong></span><b>' + renderIcon('arrow') + '</b></button>' +
        '<div class="global-social-area">' + discovery +
    '<section class="global-section global-stories" id="stories">' + heading('Cerita dari circle Anda','Momen terbaru dari orang-orang di circle Anda.') + renderStoriesRail() + '</section>' +
    composerMarkup + '<nav class="global-content-tabs" data-content-tabs aria-label="Filter konten">' + contentTabs.map((tab,i)=>tab.id==='blog'?'<a class="global-content-tab-link" href="' + routeHref('blog') + '" aria-label="Buka Blog" title="Blog">' + renderIcon('book') + '<span>' + tab.label + '</span></a>':'<button type="button" data-content-tab="' + tab.id + '" class="' + (i===0?'is-active':'') + '" aria-label="' + tab.label + '" aria-pressed="' + (i===0?'true':'false') + '" title="' + tab.label + '">' + renderIcon(tab.id==='all'?'sparkles':tab.id==='reels'?'play':tab.id==='live'?'radio':'refresh') + (tab.id==='all'?'':'<span>' + tab.label + '</span>') + '</button>').join('') + '<button type="button" class="global-content-refresh" data-feed-refresh aria-label="Perbarui feed" title="Perbarui feed">' + renderIcon('refresh') + '<span>Perbarui</span></button></nav>' +
    streams + '</div>' +
    '</main>' +
    quickSearchSheet() + '</div>';
  const unmountSocialPostInteractions=mountSocialPostInteractions(root);
  const searchBackdrop=root.querySelector('[data-quick-search-backdrop]');
  const searchInput=root.querySelector('[data-quick-search-form] input[name="q"]');
  const closeQuickSearch=()=>{if(searchBackdrop)searchBackdrop.hidden=true;document.body.classList.remove('global-search-open');};
  root.querySelector('[data-open-quick-search]')?.addEventListener('click',()=>{if(searchBackdrop){searchBackdrop.hidden=false;document.body.classList.add('global-search-open');searchInput?.focus();}});
  root.querySelector('[data-close-quick-search]')?.addEventListener('click',closeQuickSearch);
  searchBackdrop?.addEventListener('click',event=>{if(event.target===searchBackdrop)closeQuickSearch();});
  root.querySelector('[data-quick-search-form]')?.addEventListener('submit',event=>{event.preventDefault();const query=searchInput?.value.trim()||'';window.location.href=routeHref('discover')+(query?'?q='+encodeURIComponent(query):'');});
  root.addEventListener('keydown',event=>{if(event.key==='Escape'&&searchBackdrop&&!searchBackdrop.hidden)closeQuickSearch();});
  root.addEventListener('click',event=>{const more=event.target.closest('[data-feed-more]');if(!more||!root.contains(more))return;if(more.dataset.exhausted==='true'){window.location.href=routeHref('discover');return;}const hidden=[...root.querySelectorAll('[data-feed-page-hidden]')].filter(card=>card.hidden&&(activeContentFilter==='all'||(activeContentFilter==='reels'&&card.dataset.contentKind==='reel')||(activeContentFilter==='blog'&&card.dataset.contentKind==='blog')));hidden.slice(0,6).forEach(card=>{card.removeAttribute('data-feed-page-hidden');});applyContentFilter(activeContentFilter);if(!root.querySelector('[data-feed-page-hidden]')){more.textContent='Jelajahi lagi';more.dataset.exhausted='true';}});
  const buttons=[...root.querySelectorAll('[data-content-tab]')];
  const stream=root.querySelector('[data-content-stream]');
  let activeContentFilter='all';
  const applyContentFilter=(filter='all')=>{
    activeContentFilter=filter;
    buttons.forEach(button=>{const active=button.dataset.contentTab===filter;button.classList.toggle('is-active',active);button.setAttribute('aria-pressed',String(active));});
    stream?.querySelectorAll('[data-content-kind]').forEach(item=>{item.hidden=filter!=='all'&&item.dataset.contentKind!==filter;});
    stream?.querySelectorAll('[data-post-card]').forEach(card=>{const kind=card.dataset.contentKind||'photo',matches=filter==='all'||(filter==='reels'&&kind==='reel')||(filter==='blog'&&kind==='blog');card.hidden=card.hasAttribute('data-feed-page-hidden')||!matches;});
    const feed=stream?.querySelector('[data-live-feed]');
    if(feed)feed.hidden=filter==='live';
    const moreButton=stream?.querySelector('[data-feed-more]');
    if(moreButton){const hasMore=[...(stream.querySelectorAll('[data-feed-page-hidden]'))].some(card=>filter==='all'||(filter==='reels'&&card.dataset.contentKind==='reel')||(filter==='blog'&&card.dataset.contentKind==='blog'));moreButton.hidden=false;moreButton.dataset.exhausted=String(!hasMore);moreButton.textContent=hasMore?'Tampilkan postingan lainnya':'Jelajahi lagi';}
    stream?.querySelectorAll('.pl-post-demo-stream-heading').forEach(heading=>heading.hidden=filter!=='all');
  };
  buttons.forEach(button=>button.addEventListener('click',()=>applyContentFilter(button.dataset.contentTab)));
  const controller=new AbortController();
  const feedTarget=root.querySelector('[data-live-feed]');

  const loadFeed = async () => {
    if (!feedTarget) return;
    if (!API_BASE_URL) { feedTarget.innerHTML=renderDemoFeed('feed'); applyContentFilter(activeContentFilter); return; }
    feedTarget.innerHTML=renderFeedState('Memuat postingan publik…',true);
    try {
      const response=await fetch(API_BASE_URL+'/v1/social/feed?limit=20',{headers:{Accept:'application/json'},mode:'cors',credentials:'omit',cache:'no-store',signal:controller.signal});
      if(!response.ok)throw new Error('Feed belum dapat dimuat.');
      const payload=await response.json();
      const posts=Array.isArray(payload.posts)?payload.posts:[];
      feedTarget.innerHTML=(posts.length?posts.map(post=>renderPostCard({authorName:post.author_name,username:post.username,caption:post.caption,content_kind:post.content_kind,created_at:post.created_at})).join(''):'')+renderDemoFeed('feed');
      applyContentFilter(activeContentFilter);
    } catch(error) {
      if(error.name!=='AbortError'){feedTarget.innerHTML=renderDemoFeed('feed');applyContentFilter(activeContentFilter);}
    }
  };
  const composer=root.querySelector('[data-social-composer]');
  if(composer){
    const captionField=composer.querySelector('[name="caption"]');
    const count=composer.querySelector('[data-composer-count]');
    const status=composer.querySelector('[data-composer-status]');
    const submit=composer.querySelector('[data-composer-submit]');
    captionField?.addEventListener('input',()=>{if(count)count.textContent=Array.from(captionField.value).length.toLocaleString('id-ID')+' / 5.000';});
    composer.addEventListener('submit',async event=>{
      event.preventDefault();
      const caption=captionField.value.trim();
      if(!caption){status.textContent='Tuliskan cerita terlebih dahulu.';captionField.focus();return;}
      if(!accessToken){status.textContent='Sesi akun tidak tersedia. Silakan masuk kembali.';return;}
      submit.disabled=true;status.textContent='Menerbitkan postingan…';
      try{
        const response=await fetch(API_BASE_URL+'/v1/social/posts',{method:'POST',headers:{Accept:'application/json','Content-Type':'application/json',Authorization:'Bearer '+accessToken},body:JSON.stringify({caption,visibility:composer.elements.visibility.value}),mode:'cors',credentials:'omit',cache:'no-store',signal:controller.signal});
        const payload=await response.json().catch(()=>({}));
        if(!response.ok)throw new Error(payload.error==='rate_limit_exceeded'?'Terlalu sering menerbitkan postingan. Coba lagi nanti.':'Postingan belum berhasil diterbitkan.');
        const post=payload;
        const card=renderPostCard({authorName:post.author_name,username:post.username,caption:post.caption,content_kind:post.content_kind,created_at:post.created_at});
        feedTarget?.insertAdjacentHTML('afterbegin',card);
        applyContentFilter(activeContentFilter);
        captionField.value='';if(count)count.textContent='0 / 5.000';
        status.textContent=post.visibility==='private'?'Postingan privat tersimpan dan hanya terlihat oleh Anda.':'Postingan berhasil diterbitkan.';
      }catch(error){if(error.name!=='AbortError')status.textContent=error.message||'Postingan belum berhasil diterbitkan.';}
      finally{submit.disabled=false;}
    });
  }
  const pageShell=root.querySelector('.global-home-page');
  const pageHeader=root.querySelector('[data-global-header]');
  const contentTabsNav=root.querySelector('[data-content-tabs]');
  const socialArea=root.querySelector('.global-social-area');
  let stickyHandoffFrame=0;
  const updateStickyHandoff=()=>{
    if(stickyHandoffFrame)return;
    stickyHandoffFrame=window.requestAnimationFrame(()=>{
      stickyHandoffFrame=0;
      if(!pageShell||!pageHeader||!contentTabsNav||!socialArea)return;
      if(!window.matchMedia('(max-width: 767px)').matches){
        pageShell.classList.remove('has-content-tabs-pinned');
        return;
      }
      const headerHeight=pageHeader.getBoundingClientRect().height;
      const tabsRect=contentTabsNav.getBoundingClientRect();
      const areaBottom=socialArea.getBoundingClientRect().bottom;
      const bottomChromeSpace=parseFloat(getComputedStyle(pageShell).paddingBottom)||0;
      const contentStillExtendsBelowViewport=areaBottom>window.innerHeight-bottomChromeSpace;
      const tabsOwnStickyLayer=tabsRect.top<=headerHeight+1&&contentStillExtendsBelowViewport;
      pageShell.classList.toggle('has-content-tabs-pinned',tabsOwnStickyLayer);
    });
  };
  window.addEventListener('scroll',updateStickyHandoff,{passive:true});
  window.addEventListener('resize',updateStickyHandoff);
  updateStickyHandoff();
  loadFeed();
  root.querySelector('[data-feed-refresh]')?.addEventListener('click',async()=>{const refresh=root.querySelector('[data-feed-refresh]');if(refresh?.classList.contains('is-refreshing'))return;refresh?.classList.add('is-refreshing');refresh?.setAttribute('aria-busy','true');try{await loadFeed();}finally{refresh?.classList.remove('is-refreshing');refresh?.removeAttribute('aria-busy');}});
  return ()=>{controller.abort();observer?.disconnect();window.removeEventListener('scroll',updateStickyHandoff);window.removeEventListener('resize',updateStickyHandoff);if(stickyHandoffFrame)window.cancelAnimationFrame(stickyHandoffFrame);pageShell?.classList.remove('has-content-tabs-pinned');unmountSocialPostInteractions();document.body.classList.remove('global-search-open');};
}
