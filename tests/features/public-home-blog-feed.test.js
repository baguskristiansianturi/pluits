import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('Global homepage includes public blog articles before the social post feed',async()=>{
 const [home,stories,feed,css]=await Promise.all([
  readFile(new URL('../../src/pages/home/index.js',import.meta.url),'utf8'),
  readFile(new URL('../../src/features/public-home/stories.js',import.meta.url),'utf8'),
  readFile(new URL('../../src/features/public-home/blog-feed.js',import.meta.url),'utf8'),
  readFile(new URL('../../src/features/public-home/blog-feed.css',import.meta.url),'utf8')
 ]);
 assert.match(home,/bindPublicBlogFeed/);
 assert.match(stories,/pl-public-blog-feed/);
 assert.match(feed,/blog_public_routes/);
 assert.match(feed,/\.eq\('status','published'\)/);
 assert.match(feed,/\.eq\('visibility','public'\)/);
 assert.match(feed,/blog_categories/);
 assert.match(feed,/pl-public-blog-author-chip/);
 assert.match(css,/pl-public-blog-author-chip/);
 assert.match(css,/grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/);
});

test('Global blog discovery groups same-named categories across different blogs and limits author repetition',async()=>{
 const feed=await readFile(new URL('../../src/features/public-home/blog-feed.js',import.meta.url),'utf8');
 assert.match(feed,/toLocaleLowerCase\('id'\)/);
 assert.match(feed,/if\(n>=3\)return false/);
 assert.match(feed,/groups\.values\(\)/);
});
