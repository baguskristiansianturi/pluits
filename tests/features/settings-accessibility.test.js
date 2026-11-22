import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('account settings categories expose accessible tab and panel relationships', async () => {
  const source = await readFile(new URL('../../src/features/social/social-pages.js', import.meta.url), 'utf8');
  assert.match(source, /class="social-settings-menu" role="tablist"/);
  assert.match(source, /role="tab" id="settings-tab-/);
  assert.match(source, /aria-controls="settings-panel-/);
  assert.match(source, /aria-selected="/);
  assert.match(source, /role="tabpanel" id="settings-panel-/);
  assert.match(source, /aria-labelledby="settings-tab-/);
});

test('account settings controls expose visible keyboard focus', async () => {
  const css = await readFile(new URL('../../src/features/social/social-pages.css', import.meta.url), 'utf8');
  assert.match(css, /\.social-settings-menu button:focus-visible/);
  assert.match(css, /\.social-signout-button:focus-visible/);
});
