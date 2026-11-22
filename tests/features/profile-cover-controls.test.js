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

test('cover editor uses a large cover canvas with the real file input as the direct tap target', () => {
  assert.ok(moduleSource.includes('class="social-profile-cover-picker" data-cover-picker'));
  assert.ok(moduleSource.includes('data-cover-file></div>'));
  assert.doesNotMatch(moduleSource, /fileInput\\.click\\(\\)/);
  assert.doesNotMatch(moduleSource, /data-cover-file tabindex=/);
  assert.ok(moduleSource.includes("fileInput.addEventListener('change', onChange)"));
  assert.ok(styles.includes('justify-content:center'));
  assert.ok(styles.includes('top:50%!important; left:50%!important; right:auto!important; bottom:auto!important; z-index:2!important'));
  assert.ok(styles.includes('clip-path:none!important'));
  assert.ok(styles.includes('pointer-events:auto!important; touch-action:manipulation'));
  assert.ok(styles.includes('opacity:0!important'));
});

test('cover editor accepts image or video media and limits video duration to ten seconds', () => {
  assert.match(moduleSource, /data-cover-image-crop/);
  assert.match(moduleSource, /data-cover-video-preview/);
  assert.ok(moduleSource.includes('accept=\"image/*,video/mp4,video/webm,.jpg,.jpeg,.png,.webp,.gif,.mp4,.webm\"'));
  assert.match(moduleSource, /jpeg\\|png\\|webp\\|gif/);
  assert.match(moduleSource, /GIF maksimal 10 MB/);
  assert.ok(moduleSource.includes('videoPreview.duration > 10'));
  assert.ok(moduleSource.includes('saveButton.disabled = true'));
  assert.match(moduleSource, /URL\.createObjectURL/);
  assert.doesNotMatch(moduleSource, /data-cover-text|Tulisan pada sampul|profile-cover-text/);
  assert.match(moduleSource, /Animasi sampul sedang disiapkan/);
  assert.match(moduleSource, /Ukuran dan posisi sampul tetap sama/);
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
  assert.match(moduleSource, /await putCover\(stableProfileKey, file, cropPosition\)/);
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
  assert.match(moduleSource, /Geser foto dengan satu jari\. Cubit dengan dua jari untuk memperbesar atau memperkecil/);
  assert.match(moduleSource, /cropStage\.addEventListener\('pointerdown', onCropPointerDown\)/);
  assert.match(moduleSource, /cropStage\.addEventListener\('pointermove', onCropPointerMove\)/);
  assert.match(moduleSource, /cropPosition\.x = Math\.max\(0, Math\.min\(100/);
  assert.match(moduleSource, /cropPosition\.y = Math\.max\(0, Math\.min\(100/);
  assert.match(moduleSource, /putCover\(stableProfileKey, file, cropPosition\)/);
  assert.match(moduleSource, /cropPosition = saved\.crop/);
  assert.match(styles, /\.social-profile-cover-crop-stage\{[\s\S]*touch-action:none/);
  assert.match(styles, /object-fit:cover/);
});

test('cover editor is centered on mobile and closes when the backdrop is tapped', () => {
  assert.match(moduleSource, /if \(event\.target === dialog\) \{ requestCloseDialog\(\); return; \}/);
  assert.match(moduleSource, /fileInput\.value = ''/);
  assert.match(styles, /\.social-profile-cover-dialog\{place-items:center/);
  assert.ok(styles.includes('@media(max-width:767px){\n .social-profile-cover-dialog{place-items:center'));
  assert.ok(styles.includes('pointer-events:auto!important'));
  assert.doesNotMatch(moduleSource, /Sinkronisasi ke akun dan perangkat lain memerlukan layanan media PLUITS/);
});


test('cover editor presents supported image, GIF, and video formats in a spacious glass dialog', () => {
  assert.match(moduleSource, /Tambahkan sampul profil/);
  assert.match(moduleSource, /Sentuh area ini untuk memilih foto, video, atau GIF/);
  assert.match(moduleSource, /Foto\/GIF: JPG, PNG, WebP, GIF · maks\. 10 MB\. Video: MP4\/WebM · maks\. 10 detik/);
  assert.match(moduleSource, /data-cover-save>Simpan/);
  assert.match(styles, /backdrop-filter: blur\(9px\)/);
  assert.match(styles, /background: rgba\(244, 248, 247, \.76\)/);
  assert.match(styles, /min-height: 390px/);
  assert.match(styles, /social-profile-cover-format-note/);
  assert.match(styles, /background: transparent/);
});


test('cover dialog keeps the page visible with a subtle dark scrim and reduced blur', () => {
  assert.match(styles, /background: rgba\(5, 12, 22, \.42\)/);
  assert.match(styles, /backdrop-filter: blur\(3px\) saturate\(92%\)/);
  assert.match(styles, /background: rgba\(244, 248, 247, \.90\)/);
});


test('cover picker is a large cover-shaped canvas and switches to the crop preview after selection', () => {
  assert.match(moduleSource, /data-cover-picker/);
  assert.match(moduleSource, /Tambahkan sampul profil/);
  assert.match(moduleSource, /Sentuh area ini untuk memilih foto, video, atau GIF/);
  assert.match(moduleSource, /const coverPicker = dialog\.querySelector\('\[data-cover-picker\]'\)/);
  assert.match(moduleSource, /coverPicker\.hidden = Boolean\(currentMedia\)/);
  assert.match(moduleSource, /coverPicker\.hidden = true/);
  assert.match(styles, /\.social-profile-cover-picker \{[\s\S]*aspect-ratio: 4 \/ 1/);
  assert.match(styles, /\.social-profile-cover-picker \.social-profile-cover-file-input[\s\S]*inset: 0 !important/);
  assert.match(styles, /\.social-profile-cover-crop-stage \{[\s\S]*min-height: 150px/);
});


test('cover crop supports one-finger panning and two-finger pinch zoom with bounded scale', () => {
  assert.match(moduleSource, /const cropPointers = new Map\(\)/);
  assert.match(moduleSource, /pointerDistance\(points\[0\], points\[1\]\)/);
  assert.match(moduleSource, /Math\.max\(1, Math\.min\(4,/);
  assert.match(moduleSource, /cropPosition\.zoom =/);
  assert.match(moduleSource, /media\.style\.transform = `scale\(\$\{crop\.zoom \|\| 1\}\)`/);
  assert.match(styles, /touch-action: none/);
});
test('unsaved cover changes require an explicit save, discard, or continue-editing choice', () => {
  assert.match(moduleSource, /Perubahan belum disimpan/);
  assert.match(moduleSource, /requestCloseDialog/);
  assert.match(moduleSource, /data-cover-save-pending/);
  assert.match(moduleSource, /data-cover-discard/);
  assert.match(moduleSource, /data-cover-keep-editing/);
  assert.match(moduleSource, /if \(hasUnsavedChanges\)/);
  assert.match(styles, /\.social-profile-cover-unsaved[\s\S]*place-items: center/);
  assert.match(styles, /\.social-profile-cover-dialog-actions-main/);
});
