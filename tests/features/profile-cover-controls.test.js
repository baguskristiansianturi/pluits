import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const moduleSource = await readFile(new URL('../../src/features/social/profile-cover-controls.js', import.meta.url), 'utf8');
const pageSource = await readFile(new URL('../../src/features/social/social-pages.js', import.meta.url), 'utf8');
const styles = await readFile(new URL('../../src/features/social/social-pages.css', import.meta.url), 'utf8');

test('profile hero exposes isolated cover actions and a real no-cover layout state', () => {
  for (const action of ['toggle', 'edit', 'text', 'library']) {
    assert.ok(moduleSource.includes('data-cover-action="' + action + '"'));
  }
  assert.match(pageSource, /mountProfileCoverControls\(\{root\}\)/);
  assert.match(styles, /\.social-profile-card\.is-cover-hidden > \.social-profile-cover\s*\{\s*display:\s*none;/);
  assert.match(styles, /\.social-profile-card\.is-cover-hidden > \.social-profile-identity-row/);
});

test('cover editor previews member images and does not invent curated library artwork', () => {
  assert.match(moduleSource, /data-cover-file-preview/);
  assert.match(moduleSource, /URL\.createObjectURL/);
  assert.match(moduleSource, /Belum ada sampul pustaka yang diterbitkan/);
  assert.match(moduleSource, /Foto/);
  assert.match(moduleSource, /Video/);
  assert.match(moduleSource, /Fluvara/);
  assert.match(moduleSource, /Penyimpanan ke akun akan tersedia/);
});
