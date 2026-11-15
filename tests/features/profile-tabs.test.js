import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('Profile tab interactions are owned by the Profile feature',async()=>{
 const feature=await readFile(new URL('../../src/features/profile/profile-tabs.js',import.meta.url),'utf8');
 const account=await readFile(new URL('../../src/pages/account/index.js',import.meta.url),'utf8');
 assert.match(feature,/export function bindProfileTabs/);
 assert.match(feature,/data-profile-tab/);
 assert.match(feature,/request===blogRequest&&panel\.dataset\.activeTab==='blog'/);
 assert.match(feature,/loadBlog\(\)/);
 assert.ok(account.includes("import {bindProfileTabs as bindAccountProfileTabs} from '../../features/profile/profile-tabs.js'"));
 assert.ok(account.includes('bindAccountProfileTabs({'));
 assert.doesNotMatch(account,/function bindProfileTabs\(\)\{[\s\S]{0,500}nav\.addEventListener/);
});
