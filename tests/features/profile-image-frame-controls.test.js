import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('Profile image-frame preview controls are owned by the Profile feature',async()=>{
 const feature=await readFile(new URL('../../src/features/profile/image-frame-controls.js',import.meta.url),'utf8');
 const account=await readFile(new URL('../../src/pages/account/index.js',import.meta.url),'utf8');
 assert.match(feature,/export function bindProfileImageFrameControls/);
 assert.match(feature,/data-image-frame-preview/);
 assert.match(feature,/data-frame-output/);
 assert.match(feature,/addEventListener\('input',update\)/);
 assert.ok(account.includes("import {bindProfileImageFrameControls} from '../../features/profile/image-frame-controls.js'"));
 assert.ok(account.includes('bindProfileImageFrameControls({'));
});
