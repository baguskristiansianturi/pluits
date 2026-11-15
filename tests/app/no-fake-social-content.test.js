import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const account = await readFile(new URL('../../src/pages/account/index.js', import.meta.url), 'utf8');
const marketplace = await readFile(new URL('../../src/pages/marketplace/index.js', import.meta.url), 'utf8');

test('live Circle surfaces use only real people and real Stories', () => {
  assert.doesNotMatch(account, /CIRCLE_DEMO_PEOPLE|data-demo-story|showCircleDemo|demoStoryCards/);
  assert.match(account, /renderPeopleRecommendations\(\{people,avatarUrls:peopleAvatarUrls,imageFrames:peopleImageFrames\}\)/);
  assert.match(account, /const storiesSection=.*storyCards\?/);
});

test('live Circle product shelf has honest empty and error states instead of sample products', () => {
  assert.doesNotMatch(account, /LOCAL_PRODUCT_SHOWCASE|sampleCards|demoCount/);
  assert.match(account, /Belum ada produk lokal tersedia di area ini/);
  assert.match(account, /Produk lokal belum dapat dimuat saat ini/);
});

test('marketplace product detail resolves only from the published backend catalog', () => {
  assert.doesNotMatch(marketplace, /getLocalProductDemo|LOCAL_PRODUCT_SHOWCASE/);
  assert.match(marketplace, /from\('public_marketplace_products'\)/);
});
