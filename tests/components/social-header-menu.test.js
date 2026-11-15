import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('Social header menu interaction is owned by the shared social component',async()=>{
 const component=await readFile(new URL('../../src/components/social/header-menu.js',import.meta.url),'utf8');
 const account=await readFile(new URL('../../src/pages/account/index.js',import.meta.url),'utf8');
 assert.match(component,/export function bindSocialHeaderMenu/);
 assert.ok(component.includes("document.addEventListener('click'")&&component.includes("document.addEventListener('keydown'")&&component.includes("event.key!=='Escape'"));
 assert.ok(account.includes("import {bindSocialHeaderMenu} from '../../components/social/header-menu.js'")&&account.includes('function bindProfileMenu(){bindSocialHeaderMenu();}'));
});
