import { renderIcon } from '../../design-system/icons.js';

const COVER_DB = 'pluits-profile-media';
const COVER_STORE = 'covers';
function openCoverDb() {
  return new Promise((resolve, reject) => {
    if (!globalThis.indexedDB) return reject(new Error('IndexedDB unavailable'));
    const request = indexedDB.open(COVER_DB, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(COVER_STORE)) request.result.createObjectStore(COVER_STORE, { keyPath: 'profileKey' });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
async function getCover(profileKey) {
  const db = await openCoverDb();
  return new Promise((resolve, reject) => {
    const request = db.transaction(COVER_STORE, 'readonly').objectStore(COVER_STORE).get(profileKey);
    request.onsuccess = () => { db.close(); resolve(request.result || null); };
    request.onerror = () => { db.close(); reject(request.error); };
  });
}
async function putCover(profileKey, file) {
  const db = await openCoverDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(COVER_STORE, 'readwrite');
    tx.objectStore(COVER_STORE).put({ profileKey, blob: file, type: file.type, name: file.name, updatedAt: Date.now() });
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => { db.close(); reject(tx.error); };
    tx.onabort = () => { db.close(); reject(tx.error); };
  });
}
async function removeCover(profileKey) {
  const db = await openCoverDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(COVER_STORE, 'readwrite');
    tx.objectStore(COVER_STORE).delete(profileKey);
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => { db.close(); reject(tx.error); };
    tx.onabort = () => { db.close(); reject(tx.error); };
  });
}

export function renderProfileCoverMenu() {
  return '<div class="social-profile-cover-menu-wrap">'
    + '<button type="button" class="social-profile-cover-menu-trigger" data-cover-menu-trigger aria-label="Pengaturan sampul profil" aria-haspopup="menu" aria-expanded="false" title="Pengaturan sampul profil">'+renderIcon('moreVertical')+'</button>'
    + '<div class="social-profile-cover-menu" data-cover-menu role="menu" hidden>'
    + '<button type="button" class="social-profile-cover-menu-close" data-cover-menu-close aria-label="Tutup menu">×</button>'
    + '<button type="button" role="menuitemcheckbox" data-cover-action="toggle" aria-checked="false"><span class="social-profile-cover-switch" aria-hidden="true"><span></span></span><span>Aktifkan sampul</span></button>'
    + '<button type="button" role="menuitem" data-cover-action="edit" disabled>'+renderIcon('image')+'<span>Edit sampul</span></button>'
    + '<button type="button" role="menuitem" data-cover-action="library">'+renderIcon('film')+'<span>Pustaka sampul</span></button>'
    + '</div></div>';
}

export function mountProfileCoverControls({ root, profileKey = 'profile' } = {}) {
  const card = root?.querySelector('.social-profile-card');
  const cover = card?.querySelector('.social-profile-cover');
  const menu = card?.querySelector('[data-cover-menu]');
  const trigger = card?.querySelector('[data-cover-menu-trigger]');
  if (!card || !cover || !menu || !trigger) return () => {};

  const stableProfileKey = String(profileKey || 'profile').replace(/[^a-zA-Z0-9_-]/g, '_');
  const enabledStorageKey = 'pluits:profile-cover:' + stableProfileKey + ':enabled';
  const dialog = document.createElement('div');
  dialog.className = 'social-profile-cover-dialog';
  dialog.hidden = true;
  dialog.innerHTML = '<section class="social-profile-cover-dialog-panel" role="dialog" aria-modal="true" aria-labelledby="profile-cover-dialog-title">'
    + '<header class="social-profile-cover-dialog-header"><div><h2 id="profile-cover-dialog-title">Atur sampul profil</h2><p data-cover-dialog-subtitle>Sesuaikan tampilan sampul profil Anda.</p></div><button type="button" class="social-profile-cover-dialog-close" data-cover-dismiss aria-label="Tutup">×</button></header>'
    + '<div data-cover-editor-view><div class="social-profile-cover-editor">'
    + '<label class="social-profile-cover-upload">'+renderIcon('image')+'<strong>Pilih gambar atau video sampul</strong><small>Gambar maksimal 10 MB · video maksimal 10 detik</small><img data-cover-file-preview alt="" hidden><video data-cover-video-preview muted playsinline controls hidden></video><input type="file" accept="image/jpeg,image/png,image/webp,video/mp4,video/webm" data-cover-file></label>'
    + '</div><p class="social-profile-cover-dialog-note">Perubahan ini tampil sebagai pratinjau di perangkat ini. Penyimpanan ke akun akan tersedia setelah layanan media profil aktif.</p></div>'
    + '<div data-cover-library-view hidden>'
    + '<div class="social-profile-cover-library-empty">'+renderIcon('film')+'<strong>Animasi sampul sedang disiapkan</strong><p>Pustaka ini akan berisi animasi pilihan PLUITS yang dapat dipasang pada area sampul. Ukuran dan posisi sampul tetap sama. Belum ada animasi resmi yang diterbitkan.</p></div>'
    + '</div>'
    + '<footer class="social-profile-cover-dialog-actions"><button type="button" data-cover-remove hidden>Hapus sampul</button><button type="button" data-cover-dismiss>Batal</button><button type="button" data-cover-save>Simpan pratinjau</button></footer></section>';
  card.append(dialog);

  const editorView = dialog.querySelector('[data-cover-editor-view]');
  const libraryView = dialog.querySelector('[data-cover-library-view]');
  const title = dialog.querySelector('#profile-cover-dialog-title');
  const subtitle = dialog.querySelector('[data-cover-dialog-subtitle]');
  const fileInput = dialog.querySelector('[data-cover-file]');
  const filePreview = dialog.querySelector('[data-cover-file-preview]');
  const videoPreview = dialog.querySelector('[data-cover-video-preview]');
  const saveButton = dialog.querySelector('[data-cover-save]');
  const removeButton = dialog.querySelector('[data-cover-remove]');
  const toggleAction = menu.querySelector('[data-cover-action="toggle"]');
  const editAction = menu.querySelector('[data-cover-action="edit"]');
  let coverEnabled = true;
  try {
    const savedEnabled = localStorage.getItem(enabledStorageKey);
    if (savedEnabled !== null) coverEnabled = savedEnabled === 'true';
  } catch { /* Keep the default active state when browser preferences are unavailable. */ }
  let isMounted = true;
  card.classList.toggle('is-cover-disabled', !coverEnabled);
  const syncCoverState = () => {
    toggleAction.setAttribute('aria-checked', String(coverEnabled));
    editAction.disabled = !coverEnabled;
  };
  let menuCloseTimer = null;
  const closeMenu = () => {
    trigger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    menu.classList.add('is-closing');
    if (menuCloseTimer) clearTimeout(menuCloseTimer);
    menuCloseTimer = setTimeout(() => {
      menu.hidden = true;
      menu.classList.remove('is-closing');
      menuCloseTimer = null;
    }, 150);
  };
  syncCoverState();
  let pendingObjectUrl = '';
  let selectedObjectUrl = '';
  let previousFocus = null;
  const applyCoverMedia = (file, objectUrl) => {
    cover.querySelector('.social-profile-cover-image')?.remove();
    const isVideo = /^video\//.test(file?.type || '');
    const media = document.createElement(isVideo ? 'video' : 'img');
    media.className = 'social-profile-cover-image';
    if (isVideo) {
      media.muted = true; media.loop = true; media.autoplay = true; media.playsInline = true;
      media.setAttribute('aria-label', 'Video sampul profil');
    } else media.alt = '';
    media.src = objectUrl;
    cover.prepend(media);
    if (isVideo) media.play().catch(() => {});
  };
  const restoreSavedCover = async () => {
    try {
      const saved = await getCover(stableProfileKey);
      if (!isMounted || !saved?.blob) return;
      selectedObjectUrl = URL.createObjectURL(saved.blob);
      applyCoverMedia(saved.blob, selectedObjectUrl);
    } catch {
      if (isMounted) subtitle.textContent = 'Media sampul tersimpan di perangkat ini belum dapat dibaca.';
    }
  };
  restoreSavedCover();

  const closeDialog = () => {
    dialog.hidden = true;
    if (pendingObjectUrl) { URL.revokeObjectURL(pendingObjectUrl); pendingObjectUrl = ''; }
    if (previousFocus?.isConnected) previousFocus.focus();
  };
  const openDialog = (view, focusText = false) => {
    previousFocus = trigger;
    menu.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    dialog.hidden = false;
    const library = view === 'library';
    editorView.hidden = library;
    libraryView.hidden = !library;
    title.textContent = library ? 'Pustaka sampul' : 'Atur sampul profil';
    subtitle.textContent = library ? 'Pilih koleksi sampul yang disediakan PLUITS.' : 'Ganti media sampul dengan gambar atau video.';
    const currentMedia = cover.querySelector('.social-profile-cover-image');
    removeButton.hidden = !currentMedia;
    saveButton.disabled = false;
    const currentIsVideo = currentMedia?.tagName === 'VIDEO';
    filePreview.hidden = !currentMedia || currentIsVideo;
    videoPreview.hidden = !currentMedia || !currentIsVideo;
    if (currentMedia && currentIsVideo) videoPreview.src = currentMedia.currentSrc || currentMedia.src;
    else if (currentMedia) filePreview.src = currentMedia.src;
    saveButton.hidden = library;
    dialog.querySelector('[data-cover-dismiss]').focus();
  };

  const onClick = event => {
    const menuTrigger = event.target.closest('[data-cover-menu-trigger]');
    if (menuTrigger && card.contains(menuTrigger)) {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!expanded));
      if (menuCloseTimer) { clearTimeout(menuCloseTimer); menuCloseTimer = null; }
      menu.classList.remove('is-closing');
      menu.hidden = expanded;
      if (!expanded) requestAnimationFrame(() => menu.classList.add('is-open'));
      else menu.classList.remove('is-open');
      return;
    }
    const action = event.target.closest('[data-cover-action]');
    if (action && card.contains(action)) {
      const selected = action.dataset.coverAction;
      if (selected === 'toggle') {
        coverEnabled = !coverEnabled;
        try { localStorage.setItem(enabledStorageKey, String(coverEnabled)); } catch { /* The switch remains usable for this session. */ }
        card.classList.toggle('is-cover-disabled', !coverEnabled);
        syncCoverState();
      } else if (selected === 'edit' && coverEnabled) {
        closeMenu();
        openDialog('editor');
      } else if (selected === 'library') {
        closeMenu();
        openDialog('library');
      }
      return;
    }
    if (event.target.closest('[data-cover-menu-close]')) { closeMenu(); return; }
    if (event.target.closest('[data-cover-dismiss]')) { closeDialog(); return; }
    if (event.target === dialog) { closeDialog(); return; }
    const tab = event.target.closest('[data-cover-library-tab]');
    if (tab && dialog.contains(tab)) {
      dialog.querySelectorAll('[data-cover-library-tab]').forEach(item => {
        const active = item === tab;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', String(active));
      });
      const labels = { photo: 'Koleksi foto sedang disiapkan', video: 'Koleksi video sedang disiapkan', fluvara: 'Koleksi Fluvara sedang disiapkan' };
      dialog.querySelector('[data-cover-library-title]').textContent = labels[tab.dataset.coverLibraryTab] || labels.photo;
    }
  };
  const onChange = event => {
    if (event.target !== fileInput) return;
    const file = fileInput.files?.[0];
    if (!file) return;
    const isImage = /^image\/(jpeg|png|webp)$/.test(file.type);
    const isVideo = /^video\/(mp4|webm)$/.test(file.type);
    if ((!isImage && !isVideo) || (isImage && file.size > 10 * 1024 * 1024)) {
      fileInput.value = '';
      subtitle.textContent = 'File tidak sesuai. Gunakan JPG, PNG, WebP maksimal 10 MB, atau video MP4/WebM maksimal 10 detik.';
      return;
    }
    if (menuCloseTimer) clearTimeout(menuCloseTimer);
    if (pendingObjectUrl) URL.revokeObjectURL(pendingObjectUrl);
    pendingObjectUrl = URL.createObjectURL(file);
    if (isVideo) {
      saveButton.disabled = true;
      filePreview.hidden = true; videoPreview.hidden = false; videoPreview.src = pendingObjectUrl;
      videoPreview.onloadedmetadata = () => {
        if (!Number.isFinite(videoPreview.duration) || videoPreview.duration > 10) {
          URL.revokeObjectURL(pendingObjectUrl); pendingObjectUrl = '';
          videoPreview.removeAttribute('src'); videoPreview.load(); videoPreview.hidden = true;
          fileInput.value = '';
          subtitle.textContent = 'Durasi video melebihi batas 10 detik. Pilih video yang lebih singkat.';
          return;
        }
        saveButton.disabled = false;
        subtitle.textContent = 'Pratinjau video siap. Tekan Simpan pratinjau untuk menerapkan.';
      };
      videoPreview.onerror = () => { saveButton.disabled = true; subtitle.textContent = 'Video tidak dapat dibaca. Pilih file MP4 atau WebM yang valid.'; };
      videoPreview.load();
    } else {
      saveButton.disabled = false;
      videoPreview.hidden = true; videoPreview.removeAttribute('src');
      filePreview.src = pendingObjectUrl; filePreview.hidden = false;
      subtitle.textContent = 'Pratinjau gambar siap. Tekan Simpan pratinjau untuk menerapkan.';
    }
  };
  const onSave = async event => {
    if (!event.target.closest('[data-cover-save]') || !pendingObjectUrl) return;
    const file = fileInput.files?.[0];
    if (!file) return;
    saveButton.disabled = true;
    subtitle.textContent = 'Menyimpan media di perangkat ini…';
    try {
      await putCover(stableProfileKey, file);
      if (selectedObjectUrl) URL.revokeObjectURL(selectedObjectUrl);
      selectedObjectUrl = URL.createObjectURL(file);
      if (pendingObjectUrl) URL.revokeObjectURL(pendingObjectUrl);
      pendingObjectUrl = '';
      applyCoverMedia(file, selectedObjectUrl);
      removeButton.hidden = false;
      coverEnabled = true;
      try { localStorage.setItem(enabledStorageKey, 'true'); } catch { /* Current session still reflects the active state. */ }
      card.classList.remove('is-cover-disabled');
      syncCoverState();
      closeDialog();
    } catch {
      saveButton.disabled = false;
      subtitle.textContent = 'Media belum dapat disimpan di perangkat ini. Periksa ruang penyimpanan browser lalu coba lagi.';
    }
  };

  const onRemove = async event => {
    if (!event.target.closest('[data-cover-remove]')) return;
    removeButton.disabled = true;
    try {
      await removeCover(stableProfileKey);
      cover.querySelector('.social-profile-cover-image')?.remove();
      if (selectedObjectUrl) { URL.revokeObjectURL(selectedObjectUrl); selectedObjectUrl = ''; }
      if (pendingObjectUrl) { URL.revokeObjectURL(pendingObjectUrl); pendingObjectUrl = ''; }
      fileInput.value = '';
      filePreview.removeAttribute('src'); filePreview.hidden = true;
      videoPreview.pause(); videoPreview.removeAttribute('src'); videoPreview.load(); videoPreview.hidden = true;
      removeButton.hidden = true;
      removeButton.disabled = false;
      saveButton.disabled = false;
      subtitle.textContent = 'Sampul telah dihapus dari perangkat ini.';
    } catch {
      removeButton.disabled = false;
      subtitle.textContent = 'Sampul belum dapat dihapus. Silakan coba lagi.';
    }
  };
  const onKeydown = event => {
    if (event.key === 'Escape') {
      if (!dialog.hidden) closeDialog();
      else {
        closeMenu();
      }
    }
  };

  root.addEventListener('click', onClick);
  dialog.addEventListener('change', onChange);
  dialog.addEventListener('click', onSave);
  dialog.addEventListener('click', onRemove);
  root.addEventListener('keydown', onKeydown);
  return () => {
    root.removeEventListener('click', onClick);
    dialog.removeEventListener('change', onChange);
    dialog.removeEventListener('click', onSave);
    dialog.removeEventListener('click', onRemove);
    isMounted = false;
    root.removeEventListener('keydown', onKeydown);
    if (menuCloseTimer) clearTimeout(menuCloseTimer);
    if (pendingObjectUrl) URL.revokeObjectURL(pendingObjectUrl);
    if (selectedObjectUrl) URL.revokeObjectURL(selectedObjectUrl);
    dialog.remove();
  };
}
