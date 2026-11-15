import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const root=new URL('../../src/pages/account/',import.meta.url);
const names=[
  "01-account-shell-and-settings.css",
  "02-profile-and-social-controls.css",
  "03-feed-and-media-layout.css",
  "04-profile-and-post-overrides.css",
  "05-creation-studio.css",
  "06-circle-home-discovery.css",
  "07-top-ten-and-content-shelves.css",
  "08-nearby-and-feed-overrides.css"
];

test('Account legacy CSS aggregator preserves the canonical ordered slices',async()=>{
 const aggregator=await readFile(new URL('user-account.css',root),'utf8');
 const expected=names.map(name=>`@import url('./styles/${name}');`);
 assert.deepEqual(aggregator.split('\\n').filter(line=>line.startsWith('@import')),expected);
 for(const name of names){
  const css=await readFile(new URL('styles/'+name,root),'utf8');
  assert.ok(css.trim().length>0,name+' must not be an empty placeholder.');
  assert.match(css,/\.ua-|\.pl-/,'Account slice must retain an owned PLUITS selector namespace.');
 }
});
