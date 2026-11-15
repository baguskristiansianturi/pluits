import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('Profile avatar and cover upload behavior is owned by the Profile feature',async()=>{
 const feature=await readFile(new URL('../../src/features/profile/image-upload.js',import.meta.url),'utf8');
 const account=await readFile(new URL('../../src/pages/account/index.js',import.meta.url),'utf8');
 assert.match(feature,/export function bindProfileImageUpload/);
 assert.match(feature,/file\.size>8\*1024\*1024/);
 assert.match(feature,/image\/jpeg','image\/png','image\/webp/);
 assert.match(feature,/storage\.from\(bucket\)\.upload/);
 assert.match(feature,/from\('user_profiles'\)\.update/);
 assert.ok(account.includes("import {bindProfileImageUpload} from '../../features/profile/image-upload.js'"));
 assert.ok(account.includes('bindProfileImageUpload({'));
});
