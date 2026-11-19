import test from 'node:test';
import assert from 'node:assert/strict';
import { restoreInitialSession } from '../../src/app/create-app.js';

test('a failed persisted-session restore falls back to guest mode so login can mount',async()=>{
 const warnings=[];
 const originalWarn=console.warn;
 console.warn=(...args)=>warnings.push(args);
 try{
  const session=await restoreInitialSession({getSession:async()=>{throw new Error('refresh token unavailable')}});
  assert.equal(session,null);
  assert.equal(warnings.length,1);
  assert.match(warnings[0][0],/continuing in guest mode/);
 }finally{
  console.warn=originalWarn;
 }
});

test('a valid persisted session is preserved during app bootstrap',async()=>{
 const expected={user:{id:'user-1'}};
 const session=await restoreInitialSession({getSession:async()=>expected});
 assert.equal(session,expected);
});
