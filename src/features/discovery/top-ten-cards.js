export async function loadTopTenTrending(db){
 if(!db)return [];
 const center={lat:-8.4095,lon:115.1889};
 const {data:rows,error}=await db.rpc('directory_nearby',{p_lat:center.lat,p_lon:center.lon,p_radius_m:100000,p_limit:100,p_category_slug:null,p_query:null});
 if(error)throw error;
 if(!rows?.length)return [];
 const ids=rows.map(row=>row.id).filter(Boolean);
 const since=new Date(Date.now()-7*86400000).toISOString();
 const {data:links,error:linkError}=await db.from('user_post_directory_entities').select('entity_id,post_id,created_at').in('entity_id',ids).gte('created_at',since).order('created_at',{ascending:false}).limit(1000);
 if(linkError)throw linkError;
 const postIds=[...new Set((links||[]).map(link=>link.post_id).filter(Boolean))];
 const {data:published,error:postError}=postIds.length?await db.from('user_posts').select('id').in('id',postIds).eq('visibility','public').eq('moderation_status','published'):{data:[],error:null};
 if(postError)throw postError;
 const visiblePosts=new Set((published||[]).map(post=>post.id)),counts=new Map();
 (links||[]).forEach(link=>{if(visiblePosts.has(link.post_id))counts.set(link.entity_id,(counts.get(link.entity_id)||0)+1);});
 const categoryLabels={restaurant:'Kuliner',cafe:'Kafe',bar:'Hiburan malam','beach-club':'Beach Club',beach:'Pantai','tourist-attraction':'Destinasi','tour-activity':'Aktivitas',event:'Acara','arts-culture':'Budaya'};
 const images={restaurant:'photo-1555939594-58d7cb561ad1',cafe:'photo-1495474472287-4d71bcdd2085',bar:'photo-1514525253161-7a46d19cd819','beach-club':'photo-1510414842594-a61c69b5ae57',beach:'photo-1507525428034-b723cf961d3e','tourist-attraction':'photo-1537996194471-e657df975ab4','tour-activity':'photo-1544551763-46a013bb70d5',event:'photo-1492684223066-81342ee5ff30','arts-culture':'photo-1514525253161-7a46d19cd819'};
 const ranked=rows.map(row=>{const category=(row.category_slugs||[]).find(slug=>categoryLabels[slug])||(row.entity_type==='event'?'event':'tourist-attraction');return {...row,_trend:counts.get(row.id)||0,_category:category};}).filter(row=>row._trend>0).sort((a,b)=>b._trend-a._trend||String(a.name).localeCompare(String(b.name))).slice(0,10);
 if(!ranked.length)return [];
 return ranked.map((row,index)=>({className:`ua-topten-card-${index+1}`,href:'#/place/'+encodeURIComponent(row.slug),image:images[row._category]||images['tourist-attraction'],width:index<2?1000:850,title:row.name,location:[row.locality,row.district,row.city].filter(Boolean)[0]||row.region||'Bali',category:categoryLabels[row._category]||'Bali',alt:row.name,priority:index===0}));
}
export function renderTopTenSection(items=[]){
 const safe=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
 const cards=(Array.isArray(items)?items:[]).map(item=>'<a class="ua-topten-card '+safe(item.className)+'" href="'+safe(item.href)+'"><img src="https://images.unsplash.com/'+safe(item.image)+'?auto=format&fit=crop&w='+Number(item.width||850)+'&q=85" alt="'+safe(item.alt)+'" '+(item.priority?'fetchpriority="high"':'loading="lazy"')+'><span class="ua-topten-copy"><strong>'+safe(item.title)+'</strong><em>⌖ '+safe(item.location)+'</em><small>'+safe(item.category)+'</small></span></a>').join('');
 const empty='<div class="ua-topten-empty" role="status"><strong>Tren komunitas sedang dikumpulkan</strong><p>Daftar Top 10 akan terisi dari aktivitas publik yang benar-benar tercatat di PLUITS.</p></div>';
 return '<section class="ua-home-trends ua-home-topten" aria-label="Top 10 Trending"><div class="ua-home-section-heading"><div><span class="ua-eyebrow">EXPLORE PLUITS</span><h2>Top 10 Trending</h2></div><a href="#/places?region=bali&amp;sort=trending">Lihat semua <b>↗</b></a></div><div class="ua-topten-grid ua-topten-track" id="ua-home-topten-grid">'+(cards||empty)+'</div></section>';
}
