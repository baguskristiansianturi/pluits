import {createSignedUrlMap} from '../../services/storage/signed-urls.js';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export async function bindPublicBlogFeed({target,db}={}){
 if(!target||!db)return;
 const {data:routes,error:routeError}=await db.from('blog_public_routes').select('blog_id,username,slug,default_visibility').eq('default_visibility','public').limit(150);
 if(routeError)throw routeError;
 const routeRows=routes||[];
 if(!routeRows.length)return;
 const blogIds=[...new Set(routeRows.map(x=>x.blog_id).filter(Boolean))];
 const routeMap=new Map(routeRows.map(x=>[x.blog_id,x]));
 const [{data:blogs,error:blogError},{data:posts,error:postError}]=await Promise.all([
  db.from('blog_profiles').select('id,owner_user_id,display_title').in('id',blogIds),
  db.from('blog_posts').select('id,blog_id,owner_user_id,title,slug,description,cover_path,published_at,created_at,category_id').in('blog_id',blogIds).eq('status','published').eq('visibility','public').order('published_at',{ascending:false}).limit(100)
 ]);
 if(blogError||postError)throw blogError||postError;
 const blogRows=blogs||[],postRows=posts||[];
 if(!postRows.length)return;
 const owners=[...new Set(blogRows.map(x=>x.owner_user_id).filter(Boolean))];
 const [{data:profiles,error:profileError},{data:categories,error:categoryError}]=await Promise.all([
  owners.length?db.from('user_profiles').select('id,display_name,username,avatar_path,visibility').in('id',owners):Promise.resolve({data:[],error:null}),
  db.from('blog_categories').select('id,blog_id,name').in('blog_id',blogIds)
 ]);
 if(profileError||categoryError)throw profileError||categoryError;
 const profileMap=new Map((profiles||[]).map(x=>[x.id,x]));
 const blogMap=new Map(blogRows.map(x=>[x.id,x]));
 const categoryMap=new Map((categories||[]).map(x=>[x.id,x]));
 const eligible=postRows.filter(p=>routeMap.has(p.blog_id)&&profileMap.get(p.owner_user_id)?.visibility!=='private');
 if(!eligible.length)return;
 eligible.sort((a,b)=>new Date(b.published_at||b.created_at)-new Date(a.published_at||a.created_at));
 const post=eligible[0],author=profileMap.get(post.owner_user_id)||{},blog=blogMap.get(post.blog_id)||{},route=routeMap.get(post.blog_id)||{},category=categoryMap.get(post.category_id);
 const urls=await createSignedUrlMap(db.storage,'pluits-user-media',[post.cover_path,author.avatar_path].filter(Boolean),1800);
 const cover=urls.get(post.cover_path)||'',href='#/@'+encodeURIComponent(author.username||route.username||'')+'/blog/'+encodeURIComponent(route.slug||'')+'/'+encodeURIComponent(post.slug||'');
 const image=target.querySelector('img'),content=target.querySelector('div');
 if(image&&cover){image.src=cover;image.alt=post.title||'Artikel blog komunitas';}
 if(content){
  const eyebrow=content.querySelector('.pl-public-eyebrow');
  const title=content.querySelector('h3');
  const description=content.querySelector('p');
  const link=content.querySelector('a');
  if(eyebrow)eyebrow.textContent=[blog.display_title||'BLOG KOMUNITAS',category?.name].filter(Boolean).join(' · ').toUpperCase();
  if(title){title.textContent=post.title||'Artikel komunitas';title.innerHTML=esc(post.title||'Artikel komunitas');}
  if(description)description.textContent=[author.display_name?'Oleh '+author.display_name:'',post.description||''].filter(Boolean).join(' — ')||'Baca cerita dan pengalaman dari blog komunitas PLUITS.';
  if(link){link.href=href;link.textContent='Baca artikel →';}
 }
 target.dataset.blogArticleId=post.id;
}
