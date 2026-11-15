import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('CSS boundary policy includes page styles and keeps Inbox root exceptions exact',async()=>{
 const checker=await readFile(new URL('../../scripts/verify-style-boundaries.mjs',import.meta.url),'utf8');
 const inbox=await readFile(new URL('../../src/pages/messages/messages.css',import.meta.url),'utf8');
 assert.match(checker,/const roots = \['src\/components', 'src\/features', 'src\/pages'\]/);
 for(const selector of ['html:has(.pl-msg)','body:has(.pl-msg)','#app:has(.pl-msg)']){
  assert.ok(checker.includes("'"+selector+"'"),selector+' must be an exact reviewed exception.');
  assert.ok(inbox.includes(selector),selector+' must remain tied to the Inbox root.');
 }
 assert.match(checker,/\.pluits-|#pl-/);
});
