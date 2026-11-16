import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('Public home loads blog articles into the single community content stream',async()=>{
 const [home,stories,feed,css]=await Promise.all([
  readFile(new URL('../../src/pages/home/index.js',import.meta.url),'utf8'),
  readFile(new URL('../../src/features/public-home/stories.js',import.meta.url),'utf8'),
  readFile(new URL('../../src/features/public-home/blog-feed.js',import.meta.url),'utf8'),
  readFile(new URL('../../src/features/public-home/blog-feed.css',import.meta.url),'utf8')
 ]);
 assert.match(home,/bindPublicBlogFeed/);
 assert.doesNotMatch(stories,/pl-public-blog-feed/);
 assert.match(stories,/aria-label="Konten komunitas publik"/);
 assert.match(feed,/blog_public_routes/);
 assert.match(feed,/\.eq\('status','published'\)/);
 assert.match(feed,/\.eq\('visibility','public'\)/);
 assert.match(feed,/blog_categories/);
 assert.match(feed,/pl-public-blog-author-chip/);
 assert.match(feed,/pl-public-post-feed/);
 assert.match(css,/pl-public-blog-author-chip/);
 assert.match(css,/pl-public-blog-stream-label/);
});

test('Community blog articles are grouped by category and limit author repetition',async()=>{
 const feed=await readFile(new URL('../../src/features/public-home/blog-feed.js',import.meta.url),'utf8');
 assert.match(feed,/localeCompare\(String\(cats\.get\(a\.category_id\)/);
 assert.match(feed,/if\(n>=3\)return false/);
 assert.match(feed,/Artikel dari blog komunitas/);
});
