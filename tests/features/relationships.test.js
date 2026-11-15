import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('Follow list and relationship actions are owned by Relationships feature',async()=>{
 const feature=await readFile(new URL('../../src/features/relationships/index.js',import.meta.url),'utf8');
 const account=await readFile(new URL('../../src/pages/account/index.js',import.meta.url),'utf8');
 assert.match(feature,/export async function renderFollowListPage/);
 assert.match(feature,/get_user_profile_directory_by_ids/);
 assert.match(feature,/data-follow-accept/);
 assert.match(feature,/data-follow-remove/);
 assert.ok(account.includes("from '../../features/relationships/index.js'"));
 assert.ok(account.includes('return renderFollowListPage({'));
});
