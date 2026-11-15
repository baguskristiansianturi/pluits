import test from 'node:test';
import assert from 'node:assert/strict';
import { getInboxPreferences, saveInboxPreferences } from '../../src/features/inbox/preferences.js';
const values=new Map();
globalThis.localStorage={getItem:key=>values.has(key)?values.get(key):null,setItem:(key,value)=>values.set(key,String(value))};
test('Inbox preferences use safe defaults and persist supported values',()=>{
 values.clear();
 assert.deepEqual(getInboxPreferences(),{theme:'light',fontSize:'normal',enterToSend:true,wallpaper:'none'});
 assert.deepEqual(saveInboxPreferences({theme:'dark',fontSize:'large',enterToSend:false,wallpaper:'ocean'}),{theme:'dark',fontSize:'large',enterToSend:false,wallpaper:'ocean'});
 assert.deepEqual(getInboxPreferences(),{theme:'dark',fontSize:'large',enterToSend:false,wallpaper:'ocean'});
});
test('unsupported preference values fall back to defaults',()=>{
 values.set('pluits:dm:preferences:v2',JSON.stringify({theme:'neon',fontSize:'giant',enterToSend:'false',wallpaper:'virus'}));
 assert.deepEqual(getInboxPreferences(),{theme:'light',fontSize:'normal',enterToSend:true,wallpaper:'none'});
});
test('legacy preference records are migrated on read',()=>{
 values.clear();values.set('pluits:dm:preferences:v1',JSON.stringify({theme:'dark',fontSize:'small',enterToSend:false}));
 assert.deepEqual(getInboxPreferences(),{theme:'dark',fontSize:'small',enterToSend:false,wallpaper:'none'});
});
test('oversized custom wallpapers are rejected safely',()=>{
 values.clear();saveInboxPreferences({wallpaper:'data:image/png;base64,'+'a'.repeat(1800000)});
 assert.equal(getInboxPreferences().wallpaper,'none');
});
