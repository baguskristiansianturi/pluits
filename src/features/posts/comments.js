export async function loadPostComments({
 postId,
 box,
 supabaseClient,
 user,
 notify=()=>{},
 escapeHtml=value=>String(value??''),
 formatDate=value=>new Date(value).toLocaleDateString('id-ID'),
 socialIcon=()=> '',
 documentRef=document
}={}){
 if(!box||!supabaseClient)return;
 box.innerHTML='<p class="ua-muted">Memuat komentar…</p>';
 const {data,error}=await supabaseClient.from('post_comments').select('id,post_id,user_id,body,created_at,parent_comment_id').eq('post_id',postId).order('created_at',{ascending:true});
 if(error){box.innerHTML='<p class="ua-muted">'+escapeHtml(error.message)+'</p>';return;}
 const comments=data||[],ids=[...new Set(comments.map(comment=>comment.user_id))],commentIds=comments.map(comment=>comment.id);
 const [profilesResult,likesResult]=await Promise.all([
  ids.length?supabaseClient.from('user_profiles').select('id,display_name,username').in('id',ids):Promise.resolve({data:[],error:null}),
  commentIds.length?supabaseClient.from('post_comment_likes').select('comment_id,user_id').in('comment_id',commentIds):Promise.resolve({data:[],error:null})
 ]);
 if(profilesResult.error||likesResult.error){box.innerHTML='<p class="ua-muted">'+escapeHtml((profilesResult.error||likesResult.error).message)+'</p>';return;}
 const people=new Map((profilesResult.data||[]).map(person=>[person.id,person])),likes=likesResult.data||[];
 const children=new Map();
 comments.forEach(comment=>{const parent=comment.parent_comment_id||'root';if(!children.has(parent))children.set(parent,[]);children.get(parent).push(comment);});
 const render=(comment,depth=0)=>{
  const person=people.get(comment.user_id),username=person?.username||'pengguna',liked=!!user?.id&&likes.some(item=>item.comment_id===comment.id&&item.user_id===user.id),count=likes.filter(item=>item.comment_id===comment.id).length;
  const replies=(children.get(comment.id)||[]).map(child=>render(child,Math.min(depth+1,3))).join('');
  return '<article class="ua-comment-item '+(depth?'ua-comment-nested':'ua-comment-root')+'" data-comment-id="'+comment.id+'" data-comment-depth="'+Math.min(depth,3)+'" style="--comment-depth:'+Math.min(depth,3)+'"><div class="ua-comment-copy"><a href="#/@'+encodeURIComponent(username)+'" class="ua-comment-author">'+escapeHtml(person?.display_name||'Pengguna Pluits')+'</a><p>'+escapeHtml(comment.body)+'</p><small>'+formatDate(comment.created_at)+'</small><div class="ua-comment-actions"><button type="button" data-comment-like="'+comment.id+'" class="'+(liked?'is-liked':'')+'" aria-label="'+(liked?'Batal suka komentar':'Sukai komentar')+'">'+socialIcon('heart',{size:14})+'<span>'+(liked?'Disukai':'Suka')+'</span><b>'+count+'</b></button><button type="button" data-comment-reply="'+comment.id+'">Balas</button></div><form class="ua-reply-form" data-reply-form="'+comment.id+'" hidden><input name="body" maxlength="1200" required placeholder="Tulis balasan…"><button type="submit">Kirim</button></form></div>'+replies+'</article>';
 };
 const reload=()=>loadPostComments({postId,box,supabaseClient,user,notify,escapeHtml,formatDate,socialIcon,documentRef});
 box.innerHTML='<div class="ua-comment-thread" aria-live="polite">'+(children.get('root')||[]).map(comment=>render(comment)).join('')+'</div><form class="ua-comment-form" aria-label="Kirim komentar"><input name="body" maxlength="1200" required autocomplete="off" aria-label="Tulis komentar" placeholder="Tulis komentar…"><button type="submit"><span>Kirim</span></button></form>';
 box.querySelectorAll('[data-comment-like]').forEach(button=>button.addEventListener('click',async()=>{
  if(!user?.id){notify('Masuk kembali untuk menyukai komentar.','error');return;}
  const commentId=button.dataset.commentLike;button.disabled=true;
  const exists=likes.some(item=>item.comment_id===commentId&&item.user_id===user.id);
  const result=exists?await supabaseClient.from('post_comment_likes').delete().eq('comment_id',commentId).eq('user_id',user.id):await supabaseClient.from('post_comment_likes').insert({comment_id:commentId,user_id:user.id});
  if(result.error){notify(result.error.message,'error');button.disabled=false;}else await reload();
 }));
 box.querySelectorAll('[data-comment-reply]').forEach(button=>button.addEventListener('click',()=>{
  const form=box.querySelector('[data-reply-form="'+button.dataset.commentReply+'"]');
  if(form){form.hidden=!form.hidden;if(!form.hidden)form.querySelector('input')?.focus();}
 }));
 const submitComment=async(form,parentId=null)=>{
  const body=String(new FormData(form).get('body')||'').trim();if(!body)return;
  if(!user?.id){notify('Masuk kembali untuk mengirim komentar.','error');return;}
  const submit=form.querySelector('button'),input=form.querySelector('[name="body"]');
  if(submit?.disabled)return;
  if(submit){submit.disabled=true;submit.dataset.originalLabel=submit.textContent;submit.textContent='Mengirim…';}
  try{
   const {error:insertError}=await supabaseClient.from('post_comments').insert({post_id:postId,user_id:user.id,body,parent_comment_id:parentId});
   if(insertError)throw insertError;
   if(input)input.value='';
   const counter=documentRef.querySelector('[data-post-id="'+postId+'"] [data-action="comments"] b');
   if(counter)counter.textContent=String(Number(counter.textContent||0)+1);
   await reload();
  }catch(error){
   notify(error?.message||'Komentar belum berhasil dikirim. Periksa koneksi lalu coba lagi.','error');
  }finally{
   if(submit){submit.disabled=false;submit.textContent=submit.dataset.originalLabel||'Kirim';}
  }
 };
 box.querySelector('.ua-comment-form')?.addEventListener('submit',event=>{event.preventDefault();submitComment(event.currentTarget);});
 box.querySelectorAll('[data-reply-form]').forEach(form=>form.addEventListener('submit',event=>{event.preventDefault();submitComment(form,form.dataset.replyForm);}));
}
