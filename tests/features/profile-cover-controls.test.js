import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const moduleSource = await readFile(new URL('../../src/features/social/profile-cover-controls.js', import.meta.url), 'utf8');
const pageSource = await readFile(new URL('../../src/features/social/social-pages.js', import.meta.url), 'utf8');
const styles = await readFile(new URL('../../src/features/social/social-pages.css', import.meta.url), 'utf8');

test('profile cover menu contains only the three requested controls', () => {
  for (const action of ['toggle', 'edit', 'library']) {
    assert.ok(moduleSource.includes('data-cover-action="' + action + '"'));
  }
  const menuMarkup = moduleSource.slice(moduleSource.indexOf('export function renderProfileCoverMenu()'), moduleSource.indexOf('export function mountProfileCoverControls'));
  assert.equal((menuMarkup.match(/data-cover-action="/g) || []).length, 3);
  assert.match(moduleSource, /Aktifkan sampul/);
  assert.match(moduleSource, /Edit sampul/);
  assert.match(moduleSource, /Pustaka sampul/);
  assert.doesNotMatch(moduleSource, /data-cover-action="text"/);
  assert.match(pageSource, /mountProfileCoverControls\(\{root\}\)/);
});

test('cover switch is compact, accessible, and gates editing without collapsing the cover slot', () => {
  assert.match(moduleSource, /role="menuitemcheckbox"/);
  assert.match(moduleSource, /aria-checked="false"/);
  assert.match(moduleSource, /editAction\.disabled = !coverEnabled/);
  assert.match(moduleSource, /selected === 'edit' && coverEnabled/);
  assert.match(styles, /\.social-profile-cover-switch/);
  assert.match(styles, /background: #2fa66a/);
  assert.match(styles, /\.social-profile-card\.is-cover-disabled \.social-profile-cover-image/);
  assert.doesNotMatch(styles, /\.social-profile-card\.is-cover-hidden > \.social-profile-cover\s*\{\s*display:\s*none;/);
});

test('cover editor previews uploaded images and the library is reserved for approved animations', () => {
  assert.match(moduleSource, /data-cover-file-preview/);
  assert.match(moduleSource, /URL\.createObjectURL/);
  assert.match(moduleSource, /Animasi sampul sedang disiapkan/);
  assert.match(moduleSource, /Ukuran dan posisi sampul tetap sama/);
  assert.match(moduleSource, /Penyimpanan ke akun akan tersedia/);
});

test('cover switch stays open as a draft until the user saves or cancels', () => {
  assert.match(moduleSource, /data-cover-save-settings/);
  assert.match(moduleSource, /data-cover-cancel/);
  assert.match(moduleSource, /draftCoverEnabled = !draftCoverEnabled/);
  assert.match(moduleSource, /coverEnabled = draftCoverEnabled/);
  assert.match(moduleSource, /if \(selected === 'toggle'\)[\s\S]*?draftCoverEnabled = !draftCoverEnabled;[\s\S]*?syncCoverState\(\);/);
  assert.doesNotMatch(moduleSource, /if \(selected === 'toggle'\)[\s\S]{0,180}menu\.hidden = true/);
});
