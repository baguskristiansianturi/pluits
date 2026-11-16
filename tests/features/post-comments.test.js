import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('Post comment threads and reply interactions are owned by the Posts feature',async()=>{
 const feature=await readFile(new URL('../../src/features/posts/comments.js',import.meta.url),'utf8');
 const account=await readFile(new URL('../../src/pages/account/index.js',import.meta.url),'utf8');
 assert.match(feature,/export async function loadPostComments/);
 assert.match(feature,/from\('post_comments'\)/);
 assert.match(feature,/parent_comment_id:parentId/);
 assert.match(feature,/from\('post_comment_likes'\)/);
 assert.match(feature,/data-comment-reply/);
 assert.match(feature,/Math\.min\(depth\+1,3\)/);
 assert.ok(account.includes("import {renderPostActions,renderPostCard,loadPostComments,bindPostLikeInteractions,bindPostGalleries,normalizeFeedMediaFrames} from '../../features/posts/index.js'"));
 assert.ok(account.includes('return loadPostComments({'));
});
