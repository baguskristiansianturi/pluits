import test from 'node:test';
import assert from 'node:assert/strict';
import { createDemoStore, listDemoStores } from '../src/services/store/local-demo-store-service.js';

function memoryStorage() {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value))
  };
}

test('demo store creation persists a draft locally without publishing it', () => {
  const storage = memoryStorage();
  const store = createDemoStore({ name: 'Toko Contoh', username: 'toko.contoh', city: 'Denpasar', description: 'Toko untuk uji frontend' }, storage);
  assert.equal(store.demo_only, true);
  assert.equal(store.registration_status, 'draft');
  assert.equal(listDemoStores(storage)[0].id, store.id);
});

test('demo store creation validates required owner-entered fields and duplicate usernames', () => {
  const storage = memoryStorage();
  createDemoStore({ name: 'Toko Contoh', username: 'toko.contoh', city: 'Denpasar' }, storage);
  assert.throws(() => createDemoStore({ name: 'Toko Kedua', username: 'toko.contoh', city: 'Denpasar' }, storage), /sudah digunakan/);
  assert.throws(() => createDemoStore({ name: 'A', username: 'x', city: '' }, storage), /Nama toko/);
});
