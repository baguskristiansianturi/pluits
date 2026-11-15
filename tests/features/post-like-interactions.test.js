import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('Post like and media double-tap behavior is owned by the Posts feature',async()=>{
 const feature=await readFile(new URL('../../src/features/posts/like-interactions.js',import.meta.url),'utf8');
 const account=await readFile(new URL('../../src/pages/account/index.js',import.meta.url),'utf8');
 assert.match(feature,/export function bindPostLikeInteractions/);
 assert.match(feature,/from\('post_likes'\)/);
 assert.match(feature,/pointerup/);
 assert.match(feature,/lastTap&&now-lastTap<330/);
 assert.match(feature,/ua-double-tap-heart/);
 assert.ok(account.includes("import {bindPostLikeInteractions} from '../../features/posts/like-interactions.js'"));
 assert.ok(account.includes('bindPostLikeInteractions({'));
});
