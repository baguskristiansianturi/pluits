import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const moduleSource = await readFile(new URL('../../src/features/social/profile-cover-controls.js', import.meta.url), 'utf8');
const pageSource = await readFile(new URL('../../src/features/social/social-pages.js', import.meta.url), 'utf8');
const styles = await readFile(new URL('../../src/features/social/social-pages.css', import.meta.url), 'utf8');

test('profile setup notice is rendered before the cover, not inside the identity bio', () => {
  const notice = pageSource.indexOf('social-profile-preview-label');
  const cover = pageSource.indexOf('social-profile-cover-region');
  assert.ok(notice >= 0 && cover >= 0 && notice < cover);
  assert.doesNotMatch(pageSource, /social-profile-bio[\\s\\S]{0,250}social-profile-preview-label/);
  assert.match(styles, /\.social-profile-preview-label\{[^}]*margin:0 0 10px/);
});

test('profile cover spans the top of the profile card, identity overlays its lower edge, and tabs follow below', () => {
  const cover = pageSource.indexOf('<div class="social-profile-cover-region">');
  const identity = pageSource.indexOf('<div class="social-profile-identity-row">');
  const tabs = pageSource.indexOf('<div class="social-profile-tabs"');
  assert.ok(cover >= 0 && identity > cover && tabs > identity);
  assert.ok(styles.includes('.social-profile-cover-region {\n  grid-column: 1 / -1;\n  grid-row: 1;'));
  assert.ok(styles.includes('grid-column: 1 / -1;\n  grid-row: 2;'));
  assert.ok(styles.includes('.social-profile-cover-region {\n  position: relative;\n  z-index: 1;'));
  assert.ok(styles.includes('.social-profile-identity-row {\n  position: relative;\n  z-index: 2;'));
});

test('profile cover menu contains the cover controls and edit profile photo', () => {
  assert.match(pageSource, /import \{[^}]*renderProfileCoverMenuTrigger[^}]*\} from '\.\/profile-cover-controls\.js'/);
  for (const action of ['toggle', 'edit', 'library', 'avatar']) {
    assert.ok(moduleSource.includes('data-cover-action="' + action + '"'));
  }
  const menuMarkup = moduleSource.slice(moduleSource.indexOf('export function renderProfileCoverMenu()'), moduleSource.indexOf('export function mountProfileCoverControls'));
  assert.equal((menuMarkup.match(/data-cover-action="/g) || []).length, 4);
  assert.match(moduleSource, /Aktifkan sampul/);
  assert.match(moduleSource, /Edit sampul/);
  assert.match(moduleSource, /Pustaka sampul/);
  assert.match(moduleSource, /Edit foto profil/);
  assert.match(moduleSource, /data-cover-action="avatar"/);
  assert.match(moduleSource, /putAvatar\(stableProfileKey, file\)/);
  assert.match(moduleSource, /data-profile-avatar-image/);
  assert.doesNotMatch(moduleSource, /data-cover-action="text"/);
  assert.match(pageSource, /mountProfileCoverControls\(\{root,profileKey:user\?\.id\|\|username\}\)/);
});

test('cover menu trigger stays above the identity row when the cover is disabled', () => {
  assert.match(styles, /\.social-profile-card\.is-cover-disabled > \.social-profile-cover-region \{\s*z-index: 4;\s*\}/);
  assert.match(styles, /\.social-profile-identity-row \{\s*position: relative;\s*z-index: 2;/);
  assert.match(styles, /\.social-profile-cover-region > \.social-profile-cover-menu-trigger \{\s*position: absolute;\s*top: 10px;\s*right: 10px;\s*z-index: 8;/);
});

test('cover switch is compact, accessible, and gates editing without collapsing the cover slot', () => {
  assert.match(moduleSource, /role="menuitemcheckbox"/);
  assert.match(moduleSource, /aria-checked="false"/);
  assert.match(moduleSource, /editAction\.disabled = !coverEnabled/);
  assert.match(moduleSource, /selected === 'edit' && coverEnabled/);
  assert.match(styles, /\.social-profile-cover-switch/);
  assert.match(styles, /background: #2fa66a/);
  assert.match(styles, /\.social-profile-card\.is-cover-disabled > \.social-profile-cover-region > \.social-profile-cover \{ display: none; \}/);
  assert.match(styles, /\.social-profile-card\.is-cover-disabled > \.social-profile-identity-row \{\s*margin-top: 0;\s*padding-top: clamp\(40px, 9vw, 50px\)/);
  assert.match(pageSource, /social-profile-cover-region[\s\S]*renderProfileCoverMenuTrigger\(\)[\s\S]*renderProfileCoverMenu\(\)/);
  assert.match(styles, /\.social-profile-cover-region > \.social-profile-cover-menu-trigger \{\s*position: absolute;\s*top: 10px;\s*right: 10px;/);
  assert.match(styles, /\.social-profile-card > \.social-profile-cover-menu-wrap \{\s*position: absolute;\s*top: 45px;\s*right: 5px;/);
  assert.match(styles, /@media \(max-width: 767px\) \{\s*\.social-profile-card > \.social-profile-cover-menu-wrap \{\s*right: calc\(5px - var\(--pl-page-gutter\)\);/);
  assert.equal((styles.match(/\.social-profile-card > \.social-profile-cover-menu-wrap\s*\{/g) || []).length, 2);
});

test('cover editor uses a large cover canvas with the real file input as the direct tap target', () => {
  assert.ok(moduleSource.includes('label for="profile-cover-media-input" class="social-profile-cover-picker" data-cover-picker'));
  assert.ok(moduleSource.includes('data-cover-file><label for="profile-cover-media-input" class="social-profile-cover-replace" data-cover-replace hidden>Pilih media lain</label>'));
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
  assert.match(moduleSource, /indexedDB\.open\(COVER_DB, 2\)/);
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
  assert.match(moduleSource, /replaceButton\.hidden = !currentMedia/);
  assert.match(moduleSource, /replaceButton\.hidden = false/);
  assert.match(styles, /\.social-profile-cover-file-input \{[\s\S]*clip-path: inset\(50%\) !important[\s\S]*pointer-events: none !important/);
  assert.match(styles, /\.social-profile-cover-replace\[hidden\] \{ display: none !important; \}/);
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


test('entire profile cover picker canvas opens the native file selector', () => {
  assert.match(moduleSource, /label for="profile-cover-media-input" class="social-profile-cover-picker"/);
  assert.match(moduleSource, /data-cover-replace hidden>Pilih media lain/);
  assert.match(styles, /\.social-profile-cover-file-input \{[\s\S]*clip-path: inset\(50%\) !important/);
  assert.match(styles, /\.social-profile-cover-picker\s*\{[\s\S]*min-height: 150px !important[\s\S]*aspect-ratio: 4 \/ 1 !important/);
});

test('Android browser Back closes the cover editor through the unsaved-changes guard', () => {
  assert.match(moduleSource, /const pushCoverHistoryState = \(\) =>/);
  assert.match(moduleSource, /history\.pushState\(/);
  assert.match(moduleSource, /const onCoverHistoryPop = \(\) =>/);
  assert.match(moduleSource, /window\.addEventListener\('popstate', onCoverHistoryPop\)/);
  assert.match(moduleSource, /window\.removeEventListener\('popstate', onCoverHistoryPop\)/);
  assert.match(moduleSource, /requestCloseDialog\(\);\s*handlingCoverHistoryPop = false/);
});


test('cover crop is performed on the profile-shaped frame with avatar alignment preview and top actions', () => {
  assert.match(moduleSource, /social-profile-cover-dialog-toolbar[\s\S]*data-cover-dismiss>Batalkan[\s\S]*data-cover-save>Simpan/);
  assert.match(moduleSource, /social-profile-cover-crop-viewport[\s\S]*data-cover-image-crop/);
  assert.match(moduleSource, /data-cover-avatar-preview/);
  assert.match(moduleSource, /profileAvatar\.cloneNode\(true\)/);
  assert.match(moduleSource, /coverUpload\.classList\.add\('is-cropping'\)/);
  assert.match(styles, /\.social-profile-cover-crop-viewport\s*\{[\s\S]*position: absolute[\s\S]*overflow: hidden/);
  assert.match(styles, /\.social-profile-cover-crop-avatar\s*\{[\s\S]*bottom: -40px[\s\S]*border-radius: 50%/);
  assert.match(styles, /\.social-profile-cover-dialog-toolbar\s*\{/);
  assert.match(styles, /\.social-profile-cover-upload\.is-cropping\s*\{/);
});
