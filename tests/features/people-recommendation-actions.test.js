import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('People recommendation follow interactions are owned by Discovery feature',async()=>{
 const feature=await readFile(new URL('../../src/features/discovery/people-recommendation-actions.js',import.meta.url),'utf8');
 const account=await readFile(new URL('../../src/pages/account/index.js',import.meta.url),'utf8');
 assert.match(feature,/data-people-demo-follow/);
 assert.match(feature,/data-people-follow/);
 assert.match(feature,/from\('user_follows'\)/);
 assert.ok(account.includes("from '../../features/discovery/people-recommendation-actions.js'"));
 assert.ok(account.includes('bindRecommendationFollowActions({'));
});
