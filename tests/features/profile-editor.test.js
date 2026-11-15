import test from 'node:test';
import assert from 'node:assert/strict';
import {validatePersonalUsername,validatePersonalDisplayName} from '../../src/features/profile/profile-editor.js';

test('personal username validation preserves the public identity rules',()=>{
 assert.equal(validatePersonalUsername('Bagus'), '');
 assert.match(validatePersonalUsername('ab'),/3–30 karakter/);
 assert.match(validatePersonalUsername('bagus..id'),/3–30 karakter/);
 assert.match(validatePersonalUsername('bagus.com'),/akhiran seperti nama domain/);
});

test('personal display name validation rejects organization-first identities',()=>{
 assert.equal(validatePersonalDisplayName('Bagus Kristian'), '');
 assert.match(validatePersonalDisplayName('Toko Bagus'),/akun personal tidak boleh diawali/);
 assert.match(validatePersonalDisplayName('A'),/2–80 karakter/);
});
