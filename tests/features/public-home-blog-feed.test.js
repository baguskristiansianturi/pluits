import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('Community blog content fills the existing Konten Komunitas feature card',async()=>{
 const [home,stories,feed,css]=await Promise.all([
  readFile(new URL('../../src/pages/home/index.js',import.meta.url),'utf8'),
  readFile(new URL('../../src/features/public-home/stories.js',import.meta.url),'utf8'),
  readFile(new URL('../../src/features/public-home/blog-feed.js',import.meta.url),'utf8'),
  readFile(new URL('../../styles/home-layout.css',import.meta.url),'utf8')
 ]);
 assert.match(stories,/pl-public-story-feature/);
 assert.match(stories,/KONTEN KOMUNITAS/);
 assert.match(stories,/pl-public-feed/);
 assert.match(home,/target:document\.querySelector\('\.pl-public-story-feature'\)/);
 assert.match(feed,/blog_public_routes/);
 assert.match(feed,/\.eq\('status','published'\)/);
 assert.match(feed,/\.eq\('visibility','public'\)/);
 assert.match(feed,/pl-public-story-feature/);
 assert.match(feed,/Baca artikel/);
 assert.doesNotMatch(feed,/pl-public-post-feed|pl-public-blog-stream-label|append\(|prepend\(/);
 assert.match(css,/\.pl-public-story-feature/);
});

test('Public blog feature selects a public article and respects private author visibility',async()=>{
 const feed=await readFile(new URL('../../src/features/public-home/blog-feed.js',import.meta.url),'utf8');
 assert.match(feed,/visibility!=='private'/);
 assert.match(feed,/eligible\[0\]/);
 assert.match(feed,/blog_categories/);
 assert.match(feed,/createSignedUrlMap/);
});
