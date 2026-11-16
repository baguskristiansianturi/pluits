import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('Post media layout behavior is owned by the Posts feature',async()=>{
 const feature=await readFile(new URL('../../src/features/posts/post-media-layout.js',import.meta.url),'utf8');
 const account=await readFile(new URL('../../src/pages/account/index.js',import.meta.url),'utf8');
 assert.match(feature,/export function bindPostGalleries/);
 assert.match(feature,/export function normalizeFeedMediaFrames/);
 assert.ok(feature.includes('.ua-post-detail-page .ua-media img')&&feature.includes('const ratio=isDetail(el)?boundedRatio(w,h):4/5'));
 assert.ok(account.includes("import {renderPostActions,renderPostCard,loadPostComments,bindPostLikeInteractions,bindPostGalleries,normalizeFeedMediaFrames} from '../../features/posts/index.js'"));
 assert.ok(account.includes('normalizeFeedMediaFrames(document);bindPostGalleries();'));
 assert.doesNotMatch(account,/function (?:bindPostGalleries|normalizeFeedMediaFrames)\(/);
});
