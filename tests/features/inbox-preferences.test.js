import test from 'node:test';
import assert from 'node:assert/strict';
import { getInboxPreferences, saveInboxPreferences } from '../../src/features/inbox/preferences.js';

const values=new Map();
globalThis.localStorage={
  getItem:key=>values.has(key)?values.get(key):null,
  setItem:(key,value)=>values.set(key,String(value))
};

test('Inbox preferences use safe defaults and persist supported values',()=>{
  values.clear();
  assert.deepEqual(getInboxPreferences(),{theme:'light',fontSize:'normal',enterToSend:true});
  assert.deepEqual(saveInboxPreferences({theme:'dark',fontSize:'large',enterToSend:false}),{theme:'dark',fontSize:'large',enterToSend:false});
  assert.deepEqual(getInboxPreferences(),{theme:'dark',fontSize:'large',enterToSend:false});
});

test('unsupported preference values fall back to defaults',()=>{
  values.set('pluits:dm:preferences:v1',JSON.stringify({theme:'neon',fontSize:'giant',enterToSend:'false'}));
  assert.deepEqual(getInboxPreferences(),{theme:'light',fontSize:'normal',enterToSend:true});
});
