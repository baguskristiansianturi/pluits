export async function renderProfilePage({
 preview=false,
 editMode=false,
 profile,
 user,
 supabaseClient,
 signed,
 hydratePosts,
 onProfilePosts=()=>{},
 onProfileReels=()=>{},
 imageFrame={},
 imageFrameCss=()=> '',
 escapeHtml=value=>String(value??''),
 avatar=()=> '',
 profileMenuMarkup=()=> '',
 postGrid=()=> ''
}={}){
 const [avatarUrl,coverUrl,postsResult,storesResult]=await Promise.all([
  signed(profile.avatar_path),signed(profile.cover_path),
  supabaseClient.from('user_posts').select('*').eq('user_id',user.id).order('created_at',{ascending:false}),
  supabaseClient.from('stores').select('id,name,username,public_city,public_area,store_status').eq('owner_user_id',user.id)
 ]);
 if(postsResult.error)throw postsResult.error;
 const ownPosts=await hydratePosts(postsResult.data||[]);
 onProfilePosts(ownPosts);
 onProfileReels(ownPosts.filter(post=>post.content_kind==='reel'&&post.media?.length===1&&post.media[0].media_type==='video'&&Number(post.media[0].duration_ms||0)>0&&Number(post.media[0].duration_ms||0)<=60000));
 const [followersCount,followingCount,pendingCount]=await Promise.all([
  supabaseClient.from('user_follows').select('*',{count:'exact',head:true}).eq('following_id',user.id).eq('status','accepted'),
  supabaseClient.from('user_follows').select('*',{count:'exact',head:true}).eq('follower_id',user.id).eq('status','accepted'),
  supabaseClient.from('user_follows').select('*',{count:'exact',head:true}).eq('following_id',user.id).eq('status','pending')
 ]);
 if(followersCount.error||followingCount.error||pendingCount.error)throw followersCount.error||followingCount.error||pendingCount.error;
 const stores=storesResult.error?[]:(storesResult.data||[]);
 if(editMode){
  return `<div class="ua-profile-editor">
   <header class="ua-profile-editor-head"><a href="#/account/profile" aria-label="Kembali ke profil" class="ua-editor-back">‹</a><div><span>PERSONAL PROFILE</span><h1>Edit profil</h1><p>Atur bagaimana orang mengenal Anda di Pluits.</p></div><button class="ua-editor-save" type="submit" form="ua-profile-form">Simpan</button></header>
   <form id="ua-profile-form" class="ua-profile-edit-form" autocomplete="off">
    <section class="ua-editor-photo"><div class="ua-editor-avatar">${avatar(avatarUrl,profile.display_name,'large',imageFrame)}</div><div><strong>Foto profil</strong><small>Gunakan foto yang jelas dan mudah dikenali.</small><label for="ua-avatar-file" class="ua-editor-photo-action">Ubah foto profil</label><input id="ua-avatar-file" type="file" accept="image/jpeg,image/png,image/webp"></div></section>
    <section class="ua-editor-section ua-profile-image-framing">
     <div class="ua-editor-section-title"><h2>Atur tampilan foto</h2><p>Foto asli tetap utuh. Atur bagian yang terlihat secara terpisah untuk avatar bundar dan kartu rekomendasi.</p></div>
     <div class="ua-image-frame-previews">
      <div class="ua-image-frame-preview-group"><div class="ua-image-frame-preview ua-image-frame-preview-avatar"><img data-image-frame-preview="avatar" src="${avatarUrl||''}" alt="Pratinjau foto profil" style="${imageFrameCss(imageFrame,'avatar')}" ${avatarUrl?'':'hidden'}></div><small class="ua-image-frame-preview-label">Avatar profil</small></div>
      <div class="ua-image-frame-preview-group"><div class="ua-image-frame-preview ua-image-frame-preview-card"><img data-image-frame-preview="card" src="${avatarUrl||''}" alt="Pratinjau foto kartu Circle" style="${imageFrameCss(imageFrame,'card')}" ${avatarUrl?'':'hidden'}></div><small class="ua-image-frame-preview-label">Kartu Circle</small></div>
     </div>
     <div class="ua-image-frame-controls">
      ${[['avatar_x','Avatar · posisi horizontal',0,100,1],['avatar_y','Avatar · posisi vertikal',0,100,1],['avatar_zoom','Avatar · pembesaran',1,2.5,.01],['card_x','Kartu · posisi horizontal',0,100,1],['card_y','Kartu · posisi vertikal',0,100,1],['card_zoom','Kartu · pembesaran',1,2.5,.01]].map(([key,label,min,max,step])=>'<label class="ua-image-frame-control"><span>'+label+' <output data-frame-output="'+key+'">'+imageFrame[key]+'</output></span><input type="range" data-image-frame="'+key+'" min="'+min+'" max="'+max+'" step="'+step+'" value="'+imageFrame[key]+'"></label>').join('')}
     </div>
     <p class="ua-image-frame-hint">Geser posisi untuk menentukan titik fokus foto. Pembesaran membantu menyesuaikan komposisi. Pengaturan avatar dan kartu tidak saling mengubah.</p>
    </section>
    <section class="ua-editor-section"><div class="ua-editor-section-title"><h2>Informasi pribadi</h2><p>Informasi ini membantu orang menemukan dan mengenali Anda.</p></div>
     <label class="ua-editor-field"><span>Nama</span><input name="display_name" maxlength="80" required value="${escapeHtml(profile.display_name||'')}" placeholder="Nama Anda"></label>
     <label class="ua-editor-field"><span>Username</span><div class="ua-editor-input-prefix"><b>@</b><input name="username" minlength="3" maxlength="30" autocapitalize="none" autocomplete="off" spellcheck="false" required value="${escapeHtml(profile.username||'')}" placeholder="username"></div><small>3–30 karakter. Gunakan huruf kecil, angka, titik, garis bawah, atau tanda hubung.</small></label>
     <label class="ua-editor-field"><span>Bio</span><textarea name="bio" rows="3" maxlength="500" placeholder="Ceritakan sedikit tentang diri Anda">${escapeHtml(profile.bio||'')}</textarea><small>Maksimal 500 karakter.</small></label>
    </section>
    <section class="ua-editor-section"><div class="ua-editor-section-title"><h2>Informasi tambahan</h2><p>Lokasi publik bersifat opsional.</p></div>
     <div class="ua-editor-two-col"><label class="ua-editor-field"><span>Kota</span><input name="public_city" maxlength="80" value="${escapeHtml(profile.public_city||'')}" placeholder="Kota"></label><label class="ua-editor-field"><span>Provinsi</span><input name="public_province" maxlength="80" value="${escapeHtml(profile.public_province||'')}" placeholder="Provinsi"></label></div>
    </section>
    <section class="ua-editor-section"><div class="ua-editor-section-title"><h2>Privasi profil</h2><p>Tentukan siapa yang dapat melihat profil dan postingan publik Anda.</p></div>
     <label class="ua-editor-field"><span>Jenis akun</span><select name="visibility"><option value="public" ${profile.visibility==='public'?'selected':''}>Publik · dapat ditemukan semua orang</option><option value="private" ${profile.visibility==='private'?'selected':''}>Pribadi · batasi akses ke postingan</option></select></label>
     <label class="ua-editor-toggle"><span><strong>Tampilkan toko di profil</strong><small>Tautkan toko Anda pada halaman profil personal.</small></span><input type="checkbox" name="show_store" ${profile.show_store?'checked':''}></label>
    </section>
    <p id="ua-profile-note" class="ua-form-note" role="status" aria-live="polite"></p>
    <div class="ua-editor-bottom-actions"><a href="#/account/profile">Batal</a><button class="ua-editor-save" type="submit">Simpan perubahan</button></div>
   </form>
  </div>`;
 }
 if(preview){
  const visiblePosts=profile.visibility==='public'?ownPosts.filter(post=>post.visibility==='public'&&post.moderation_status==='published'):[];
  return `<div class="ua-page-heading"><div><span class="ua-eyebrow">PRATINJAU PROFIL</span><h1>Begini profil Anda terlihat</h1><p>Ini adalah simulasi tampilan profil bagi pengunjung Pluits.</p></div><a class="ua-outline" href="#/account/profile">← Kembali ke Edit Profil</a></div>
  <div class="ua-preview-status">${profile.visibility==='public'?'Profil Anda bersifat publik.':'Profil Anda privat. Pengunjung lain tidak dapat melihat postingan Anda.'}</div>
  <section class="ua-profile-card ua-public-profile">
   ${profileMenuMarkup()}
   <div class="ua-cover ${coverUrl?'has-cover':'no-cover'}" ${coverUrl?`style="background-image:url('${coverUrl}')"`:''}>${coverUrl?'<span>PLUITS PROFILE</span>':''}</div>
   <div class="ua-profile-content"><div class="ua-profile-avatar">${avatar(avatarUrl,profile.display_name,'large',imageFrame)}</div>
    <div class="ua-profile-identity"><h2>${escapeHtml(profile.display_name)}</h2><div class="ua-username">@${escapeHtml(profile.username)}</div><div class="ua-location">${profile.public_city&&profile.public_province?'⌖ '+escapeHtml(profile.public_city)+', '+escapeHtml(profile.public_province):''}</div><p>${escapeHtml(profile.bio||'Bio belum ditambahkan.')}</p></div>
    <div class="ua-profile-count"><strong>${visiblePosts.length}</strong><span>Postingan publik</span></div>
   </div>
  </section>
  <section class="ua-panel ua-posts-panel"><div class="ua-section-title"><div><span class="ua-eyebrow">KONTEN PROFIL</span><h2>Postingan</h2></div></div>
   ${profile.visibility!=='public'?'<div class="ua-empty"><strong>Akun ini privat</strong><p>Postingan hanya dapat dilihat oleh pemilik akun.</p></div>':visiblePosts.length?postGrid(visiblePosts):'<div class="ua-empty"><strong>Belum ada postingan publik</strong><p>Postingan yang Anda atur sebagai privat tidak ditampilkan di profil publik.</p></div>'}
  </section>`;
 }
 return `
 <section class="ua-profile-card">
  ${profileMenuMarkup()}
  <div class="ua-cover ${coverUrl?'has-cover':'no-cover'}" ${coverUrl?`style="background-image:url('${coverUrl}')"`:''}></div>
  <div class="ua-profile-content"><div class="ua-profile-avatar">${avatar(avatarUrl,profile.display_name,'large',imageFrame)}</div>
   <div class="ua-profile-identity"><div class="ua-profile-name-row"><div><h2>${escapeHtml(profile.display_name)}</h2><div class="ua-username">@${escapeHtml(profile.username)}</div></div></div><p>${escapeHtml(profile.bio||'Bio belum ditambahkan.')}</p><div class="ua-location">${profile.public_city&&profile.public_province?'⌖ '+escapeHtml(profile.public_city)+', '+escapeHtml(profile.public_province):''}</div><div class="ua-profile-stats"><a href="#profile-posts"><strong>${ownPosts.length}</strong><span>Postingan</span></a><a href="#/account/followers"><strong>${followersCount.count||0}</strong><span>Pengikut</span></a><a href="#/account/following"><strong>${followingCount.count||0}</strong><span>Mengikuti</span></a></div><a class="ua-profile-story-link" href="#/account/story">＋ Tambah Story</a></div>
  </div>
 </section>
 <nav class="ua-profile-tabs" role="tablist" aria-label="Konten profil" data-profile-username="${escapeHtml(profile.username)}" data-profile-owner-id="${profile.id}">
  <button class="active" type="button" role="tab" aria-selected="true" data-profile-tab="posts" title="Feed"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg><span>Feed</span></button>
  <button type="button" role="tab" aria-selected="false" data-profile-tab="reels" title="Reels"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="m10 8 6 4-6 4z"/></svg><span>Reels</span></button>
  <button type="button" role="tab" aria-selected="false" data-profile-tab="trip" title="Trip"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg><span>Trip</span></button>
  <button type="button" role="tab" aria-selected="false" data-profile-tab="blog" title="Blog"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v17H6.5A2.5 2.5 0 0 1 4 17.5z"/><path d="M4 17.5A2.5 2.5 0 0 1 6.5 15H20M8 7h8M8 10h8"/></svg><span>Blog</span></button>
 </nav>
 <section id="ua-profile-tab-content" class="ua-profile-tab-content" role="tabpanel">
  ${ownPosts.length?postGrid(ownPosts):'<div class="ua-empty"><strong>Belum ada postingan</strong><p>Bagikan foto atau video pertama melalui tombol Buat pada navigasi utama.</p></div>'}
 </section>
 `;
}
