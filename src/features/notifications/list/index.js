export async function renderNotificationPage({user,profile,supabaseClient,signed,escapeHtml=value=>String(value??''),formatDate=value=>new Date(value).toLocaleDateString('id-ID')}={}){
 const {data,error}=await supabaseClient.from('user_notifications').select('id,actor_user_id,notification_type,entity_type,entity_id,message,created_at,read_at').order('created_at',{ascending:false}).limit(60);
 if(error)throw error;
 const rows=data||[],ids=[...new Set(rows.map(item=>item.actor_user_id).filter(Boolean))];
 const profiles=ids.length?await supabaseClient.rpc('get_user_profile_directory_by_ids',{p_ids:ids}):{data:[],error:null};
 if(profiles.error)throw profiles.error;
 const people=new Map((profiles.data||[]).map(person=>[person.id,person]));
 const language=profile?.preferred_language||'id';
 const [announcementRes,readRes]=await Promise.all([
  supabaseClient.from('pluits_system_announcements').select('id,title,body,language,severity,published_at').eq('status','published').in('language',language==='en'?['en','id']:['id']).lte('published_at',new Date().toISOString()).or('expires_at.is.null,expires_at.gt.'+new Date().toISOString()).order('published_at',{ascending:false}).limit(20),
  supabaseClient.from('pluits_system_announcement_reads').select('announcement_id,read_at').eq('user_id',user.id)
 ]);
 if(announcementRes.error)throw announcementRes.error;
 if(readRes.error)throw readRes.error;
 const readAnnouncements=new Set((readRes.data||[]).map(item=>item.announcement_id));
 const announcements=announcementRes.data||[];
 const unread=rows.filter(item=>!item.read_at).length+announcements.filter(item=>!readAnnouncements.has(item.id)).length;
 const labels={follow_request:'Permintaan mengikuti',new_follower:'Pengikut baru',follow_accepted:'Permintaan diterima',unfollow:'Berhenti mengikuti',post_like:'Suka postingan',post_comment:'Komentar',new_message:'Pesan masuk',system_update:'Informasi sistem Pluits'};
 const items=(await Promise.all(rows.map(async item=>{
  const actor=people.get(item.actor_user_id),name=actor?.display_name||'Pengguna Pluits';
  const href=item.notification_type==='follow_request'?'#/account/requests':item.entity_type==='post'&&item.entity_id?'#/account/post/'+item.entity_id:item.entity_type==='conversation'&&item.entity_id?'#/messages?conversation='+encodeURIComponent(item.entity_id):item.notification_type==='system_update'?'#/help':actor?.username?'#/@'+encodeURIComponent(actor.username):'#/account/profile';
  const photo=actor?.avatar_path?await signed(actor.avatar_path):'';
  const avatarHtml=photo?'<img src="'+escapeHtml(photo)+'" alt="" loading="lazy">':escapeHtml(name.slice(0,1).toUpperCase());
  return '<a class="ua-notification-row '+(item.read_at?'':'is-unread')+'" href="'+href+'" data-notification-id="'+item.id+'" data-notification-href="'+href+'"><span class="ua-notification-avatar">'+avatarHtml+'</span><span class="ua-notification-copy"><strong>'+escapeHtml(name)+'</strong><span>'+escapeHtml(item.message||labels[item.notification_type]||'Aktivitas baru')+'</span><small>'+escapeHtml(labels[item.notification_type]||'Aktivitas')+' · '+formatDate(item.created_at)+'</small></span>'+(item.read_at?'':'<i aria-label="Belum dibaca"></i>')+'</a>';
 }))).join('');
 const systemItems=announcements.map(item=>'<button type="button" class="ua-notification-row ua-system-notice '+(readAnnouncements.has(item.id)?'':'is-unread')+'" data-announcement-id="'+item.id+'"><span class="ua-notification-avatar">P</span><span class="ua-notification-copy"><strong>Pluits</strong><span>'+escapeHtml(item.title)+'</span><small>'+escapeHtml(item.severity==='critical'?'Penting':item.severity==='important'?'Pembaruan':'Informasi')+' · '+formatDate(item.published_at)+'</small><p>'+escapeHtml(item.body)+'</p></span>'+(readAnnouncements.has(item.id)?'':'<i aria-label="Belum dibaca"></i>')+'</button>').join('');
 return '<div class="ua-page-heading"><div><span class="ua-eyebrow">AKTIVITAS AKUN</span><h1>Aktivitas</h1><p>'+(unread?unread+' pemberitahuan belum dibaca':'Semua aktivitas sudah dibaca')+'</p></div>'+(unread?'<button type="button" class="ua-outline" data-notifications-read-all>Tandai semua dibaca</button>':'')+'</div>'+(systemItems?'<section class="ua-panel ua-notification-list ua-system-list"><div class="ua-section-title"><strong>Informasi Pluits</strong></div>'+systemItems+'</section>':'')+'<section class="ua-panel ua-notification-list">'+(items||'<div class="ua-empty"><strong>Belum ada aktivitas</strong><p>Permintaan mengikuti, suka, komentar, dan pesan akan muncul di sini.</p></div>')+'</section>';
}
export async function getUnreadActivityCount({user,profile,supabaseClient}={}){
 const language=profile?.preferred_language||'id',now=new Date().toISOString();
 const [notifications,announcements,reads]=await Promise.all([
  supabaseClient.from('user_notifications').select('id',{count:'exact',head:true}).is('read_at',null),
  supabaseClient.from('pluits_system_announcements').select('id').eq('status','published').in('language',language==='en'?['en','id']:['id']).lte('published_at',now).or('expires_at.is.null,expires_at.gt.'+now).limit(100),
  supabaseClient.from('pluits_system_announcement_reads').select('announcement_id').eq('user_id',user.id)
 ]);
 const readIds=new Set((reads.data||[]).map(item=>item.announcement_id));
 return (notifications.error?0:(notifications.count||0))+(announcements.error?0:(announcements.data||[]).filter(item=>!readIds.has(item.id)).length);
}
export function paintUnreadBadge({documentRef=document,count=0}={}){
 documentRef.querySelectorAll('.pl-nav-activity,.pl-mobile-notice').forEach(link=>{
  let badge=link.querySelector('.pl-nav-unread');
  if(count>0){
   if(!badge){badge=documentRef.createElement('i');badge.className='pl-nav-unread';link.appendChild(badge);}
   badge.textContent=count>99?'99+':String(count);
  }else badge?.remove();
 });
}
export function bindNotificationInteractions({user,supabaseClient,notify=()=>{},mountAccount=()=>{},locationRef=location,documentRef=document,getChannel=()=>null,setChannel=()=>{},refreshUnreadBadge=async()=>{}}={}){
 const previous=getChannel();
 if(previous){supabaseClient.removeChannel(previous);setChannel(null);}
 if(user){
  const channel=supabaseClient.channel('pluits-activity-'+user.id)
   .on('postgres_changes',{event:'INSERT',schema:'public',table:'user_notifications',filter:'recipient_user_id=eq.'+user.id},async()=>{
    await refreshUnreadBadge();if(locationRef.hash.includes('/account/activity'))mountAccount('activity');
   })
   .on('postgres_changes',{event:'*',schema:'public',table:'pluits_system_announcements'},async()=>{
    await refreshUnreadBadge();if(locationRef.hash.includes('/account/activity'))mountAccount('activity');
   }).subscribe();
  setChannel(channel);
 }
 documentRef.querySelectorAll('[data-notification-id]').forEach(link=>link.addEventListener('click',async event=>{
  event.preventDefault();const id=link.dataset.notificationId,href=link.dataset.notificationHref;
  if(link.classList.contains('is-unread')){
   const {error}=await supabaseClient.from('user_notifications').update({read_at:new Date().toISOString()}).eq('id',id);
   if(error){notify('Status pemberitahuan belum dapat diperbarui.','error');return;}
  }
  locationRef.hash=href;
 }));
 documentRef.querySelectorAll('[data-announcement-id]').forEach(button=>button.addEventListener('click',async()=>{
  const {error}=await supabaseClient.from('pluits_system_announcement_reads').upsert({announcement_id:button.dataset.announcementId,user_id:user.id,read_at:new Date().toISOString()},{onConflict:'announcement_id,user_id'});
  if(error)notify(error.message,'error');else{button.classList.remove('is-unread');button.querySelector('i')?.remove();}
 }));
 documentRef.querySelector('[data-notifications-read-all]')?.addEventListener('click',async()=>{
  const {error}=await supabaseClient.from('user_notifications').update({read_at:new Date().toISOString()}).is('read_at',null);
  if(error){notify(error.message,'error');return;}
  const buttons=[...documentRef.querySelectorAll('[data-announcement-id]')];
  for(const button of buttons){await supabaseClient.from('pluits_system_announcement_reads').upsert({announcement_id:button.dataset.announcementId,user_id:user.id,read_at:new Date().toISOString()},{onConflict:'announcement_id,user_id'});}
  await mountAccount('activity');
 });
}
