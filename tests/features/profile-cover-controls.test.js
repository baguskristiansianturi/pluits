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
  assert.match(pageSource, /mountProfileCoverControls\(\{root,profileKey:user\?\.id\|\|username\}\)/);
});

test('cover switch is compact, accessible, and gates editing without collapsing the cover slot', () => {
  assert.match(moduleSource, /role="menuitemcheckbox"/);
  assert.match(moduleSource, /aria-checked="false"/);
  assert.match(moduleSource, /editAction\.disabled = !coverEnabled/);
  assert.match(moduleSource, /selected === 'edit' && coverEnabled/);
  assert.match(styles, /\.social-profile-cover-switch/);
  assert.match(styles, /background: #2fa66a/);
  assert.match(styles, /\.social-profile-card\.is-cover-disabled > \.social-profile-cover \{ display: none; \}/);
  assert.match(styles, /\.social-profile-card\.is-cover-disabled > \.social-profile-identity-row \{\s*margin-top: 0;\s*padding-top: clamp\(40px, 9vw, 50px\)/);
  assert.match(styles, /social-profile-cover-menu-wrap \{ top: 14px; right: 0; \}/);
});

test('cover editor opens the native media picker from an explicit mobile-friendly button', () => {
  assert.match(moduleSource, /<label class="social-profile-cover-browse" data-cover-browse>Pilih foto atau video<input class="social-profile-cover-file-input" type="file"/);
  assert.doesNotMatch(moduleSource, /data-cover-file hidden/);
  assert.doesNotMatch(moduleSource, /fileInput\.showPicker|fileInput\.click\(\)/);
  assert.match(moduleSource, /dialog\.addEventListener\('change', onChange\)/);
  assert.match(styles, /\.social-profile-cover-browse[\s\S]*position: relative/);
  assert.match(styles, /\.social-profile-cover-file-input[\s\S]*opacity: 0/);
  assert.match(styles, /\.social-profile-cover-file-input[\s\S]*inset: 0/);
});

test('cover editor accepts image or video media and limits video duration to ten seconds', () => {
  assert.match(moduleSource, /data-cover-file-preview/);
  assert.match(moduleSource, /data-cover-video-preview/);
  assert.ok(moduleSource.includes('video/mp4,video/webm'));
  assert.ok(moduleSource.includes('videoPreview.duration > 10'));
  assert.ok(moduleSource.includes('saveButton.disabled = true'));
  assert.match(moduleSource, /URL\.createObjectURL/);
  assert.doesNotMatch(moduleSource, /data-cover-text|Tulisan pada sampul|profile-cover-text/);
  assert.match(moduleSource, /Animasi sampul sedang disiapkan/);
  assert.match(moduleSource, /Ukuran dan posisi sampul tetap sama/);
  assert.match(moduleSource, /Sinkronisasi ke akun dan perangkat lain memerlukan layanan media PLUITS/);
});

test('cover switch applies immediately and menu closes only through its X control', () => {
  assert.match(moduleSource, /data-cover-menu-close/);
  assert.doesNotMatch(moduleSource, /data-cover-save-settings|data-cover-cancel|Simpan pengaturan/);
  assert.match(moduleSource, /coverEnabled = !coverEnabled/);
  assert.match(moduleSource, /card\.classList\.toggle\('is-cover-disabled', !coverEnabled\)/);
  assert.match(moduleSource, /if \(event\.target\.closest\('\[data-cover-menu-close\]'\)\) \{ closeMenu\(\); return; \}/);
  assert.match(moduleSource, /setTimeout\(\(\) => \{\s*menu\.hidden = true/);
  assert.match(styles, /\.social-profile-cover-menu\.is-open/);
  assert.match(styles, /\.social-profile-cover-menu-close/);
});


test('profile cover visibility and selected media persist locally across reloads', () => {
  assert.match(moduleSource, /localStorage\.getItem\(enabledStorageKey\)/);
  assert.match(moduleSource, /localStorage\.setItem\(enabledStorageKey, String\(coverEnabled\)\)/);
  assert.match(moduleSource, /indexedDB\.open\(COVER_DB, 1\)/);
  assert.match(moduleSource, /objectStore\(COVER_STORE\)\.put\(/);
  assert.match(moduleSource, /objectStore\(COVER_STORE\)\.get\(profileKey\)/);
  assert.match(moduleSource, /await getCover\(stableProfileKey\)/);
  assert.match(moduleSource, /await putCover\\(stableProfileKey, file, cropPosition\\)/);
  assert.match(moduleSource, /await removeCover\(stableProfileKey\)/);
  assert.match(moduleSource, /let coverEnabled = true/);
  assert.match(moduleSource, /data-cover-remove/);
  assert.match(pageSource, /profileKey:user\?\.id\|\|username/);
});

test('turning the cover off preserves the saved media; only explicit removal deletes it', () => {
  assert.match(moduleSource, /card\.classList\.toggle\('is-cover-disabled', !coverEnabled\)/);
  assert.match(moduleSource, /if \(selectedObjectUrl\) \{ URL\.revokeObjectURL\(selectedObjectUrl\); selectedObjectUrl = ''; \}/);
  assert.match(moduleSource, /objectStore\(COVER_STORE\)\.delete\(profileKey\)/);
  assert.match(moduleSource, /cover\.querySelector\('\.social-profile-cover-image'\)\?\.remove\(\)/);
});


test('selecting a photo opens a draggable crop frame matching the live cover ratio', () => {
  assert.match(moduleSource, /data-cover-crop-stage/);
  assert.match(moduleSource, /data-cover-image-crop/);
  assert.match(moduleSource, /Geser foto di dalam bingkai/);
  assert.match(moduleSource, /cropStage\.addEventListener\('pointerdown', onCropPointerDown\)/);
  assert.match(moduleSource, /cropStage\.addEventListener\('pointermove', onCropPointerMove\)/);
  assert.match(moduleSource, /cropPosition\.x = Math\.max\(0, Math\.min\(100/);
  assert.match(moduleSource, /cropPosition\.y = Math\.max\(0, Math\.min\(100/);
  assert.match(moduleSource, /putCover\(stableProfileKey, file, cropPosition\)/);
  assert.match(moduleSource, /cropPosition = saved\\.crop/);
  assert.match(styles, /\.social-profile-cover-crop-stage\{[\s\S]*touch-action:none/);
  assert.match(styles, /object-fit:cover/);
});
