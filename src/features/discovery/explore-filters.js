export function bindExploreFilters({getContentType,setContentType,getFilter,setFilter,setCategory,rerender,root=document}){
 root.querySelectorAll('[data-content-type]').forEach(button=>button.addEventListener('click',async()=>{
  const next=button.dataset.contentType;
  if(!['all','reel','live','blog'].includes(next)||next===getContentType())return;
  setContentType(next);
  await rerender();
 }));
 root.querySelector('[data-feed-refresh]')?.addEventListener('click',async event=>{
  const el=event.currentTarget;
  el.disabled=true;
  el.classList.add('is-loading');
  setFilter('latest');
  await rerender();
 });
 root.querySelectorAll('[data-explore-filter]').forEach(button=>button.addEventListener('click',async()=>{
  const next=button.dataset.exploreFilter;
  if(!['all','latest','random'].includes(next)||next===getFilter())return;
  setFilter(next);
  await rerender();
 }));
 root.querySelector('[data-explore-category]')?.addEventListener('change',async event=>{
  setCategory(String(event.currentTarget.value||'all'));
  await rerender();
 });
}
