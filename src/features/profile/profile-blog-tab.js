export async function renderProfileBlogTab({
 documentRef=document,
 profile,
 user,
 supabaseClient,
 bucket,
 createSignedUrlMap,
 escapeHtml=value=>String(value??''),
 formatDate=value=>new Date(value).toLocaleDateString('id-ID')
}={}){
 const nav=documentRef.querySelector('.ua-profile-tabs');
 const username=nav?.dataset.profileUsername||profile?.username;
 const ownerId=nav?.dataset.profileOwnerId||profile?.id;
 if(!username)return '<div class="ua-profile-tab-empty"><strong>Blog belum tersedia</strong><p>Akun ini belum memiliki alamat Blog.</p></div>';
 const {data:route,error:routeError}=await supabaseClient.from('blog_public_routes').select('blog_id,slug,display_title').eq('username',username).eq('default_visibility','public').maybeSingle();
 if(routeError)throw routeError;
 if(!route)return '<div class="ua-profile-tab-empty"><span>▤</span><strong>Belum ada Blog publik</strong><p>Artikel yang diterbitkan secara publik akan tampil di sini.</p>'+(user?.id===ownerId?'<a class="ua-outline" href="#/account/blog">Kelola Blog</a>':'')+'</div>';
 const {data:rows,error}=await supabaseClient.from('blog_posts').select('id,title,slug,description,cover_path,published_at,created_at').eq('blog_id',route.blog_id||route.id).eq('status','published').eq('visibility','public').order('published_at',{ascending:false}).limit(30);
 if(error)throw error;
 const posts=rows||[],urls=await createSignedUrlMap(supabaseClient.storage,bucket,posts.map(row=>row.cover_path).filter(Boolean),1800);
 const base='#/@'+encodeURIComponent(username)+'/blog/'+encodeURIComponent(route.slug);
 const cards=posts.map(row=>{const href=base+'/'+encodeURIComponent(row.slug);return "<article class='ua-profile-blog-card'><a class='ua-profile-blog-cover' href='"+href+"'>"+(urls.get(row.cover_path)?"<img src='"+escapeHtml(urls.get(row.cover_path))+"' alt='"+escapeHtml(row.title)+"' loading='lazy'>":"<span>PLUITS BLOG</span>")+"</a><div class='ua-profile-blog-copy'><small>"+formatDate(row.published_at||row.created_at)+"</small><h3><a href='"+href+"'>"+escapeHtml(row.title)+"</a></h3><p>"+escapeHtml(row.description||'')+"</p><a class='ua-blog-read-link' href='"+href+"'>Baca artikel ↗</a></div></article>";}).join('');
 return "<div class='ua-profile-blog-heading'><div><strong>"+escapeHtml(route.display_title||'Blog')+"</strong><span>"+posts.length+" tulisan</span></div><a href='"+base+"'>Kunjungi Blog ↗</a></div>"+(cards||"<div class='ua-profile-tab-empty'><strong>Belum ada tulisan</strong><p>Artikel publik yang diterbitkan akan tampil di sini.</p></div>");
}
