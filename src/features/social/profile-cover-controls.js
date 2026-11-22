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
async function putCover(profileKey, file, crop = { x: 50, y: 50 }) {
  const db = await openCoverDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(COVER_STORE, 'readwrite');
    tx.objectStore(COVER_STORE).put({ profileKey, blob: file, type: file.type, name: file.name, crop, updatedAt: Date.now() });
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

export function renderProfileCoverMenuTrigger() {
  return '<button type="button" class="social-profile-cover-menu-trigger" data-cover-menu-trigger aria-label="Pengaturan sampul profil" aria-haspopup="menu" aria-expanded="false" title="Pengaturan sampul profil">'+renderIcon('moreVertical')+'</button>';
}

export function renderProfileCoverMenu() {
  return '<div class="social-profile-cover-menu-wrap">'
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
    + '<header class="social-profile-cover-dialog-header"><div><h2 id="profile-cover-dialog-title">Edit sampul</h2><p data-cover-dialog-subtitle>Pilih foto, video, atau GIF.</p></div><div class="social-profile-cover-dialog-toolbar"><button type="button" data-cover-dismiss>Batalkan</button><button type="button" data-cover-save>Simpan</button></div><button type="button" class="social-profile-cover-dialog-close" data-cover-dismiss aria-label="Tutup">×</button></header>'
    + '<div data-cover-editor-view><div class="social-profile-cover-editor">'
    + '<div class="social-profile-cover-upload"><label for="profile-cover-media-input" class="social-profile-cover-picker" data-cover-picker><div class="social-profile-cover-picker-art" aria-hidden="true"><svg viewBox="0 0 64 48" fill="none"><rect x="2" y="2" width="60" height="44" rx="8" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 3"/><circle cx="21" cy="17" r="4" stroke="currentColor" stroke-width="1.5"/><path d="m7 39 17-15 10 9 8-7 15 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M48 8v12M42 14h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg><strong>Tambahkan sampul profil</strong><small>Sentuh area ini untuk memilih foto, video, atau GIF</small></div></label><input id="profile-cover-media-input" class="social-profile-cover-file-input" type="file" accept="image/*,video/mp4,video/webm,.jpg,.jpeg,.png,.webp,.gif,.mp4,.webm" aria-label="Pilih foto, video, atau GIF untuk sampul" data-cover-file><label for="profile-cover-media-input" class="social-profile-cover-replace" data-cover-replace hidden>Pilih media lain</label><div class="social-profile-cover-crop-stage" data-cover-crop-stage hidden><div class="social-profile-cover-crop-viewport"><img data-cover-image-crop alt="Pratinjau posisi foto sampul" draggable="false"></div><div class="social-profile-cover-crop-avatar" data-cover-avatar-preview aria-hidden="true"></div></div><video data-cover-video-preview muted playsinline controls hidden></video><small class="social-profile-cover-format-note">Foto/GIF: JPG, PNG, WebP, GIF · maks. 10 MB. Video: MP4/WebM · maks. 10 detik.</small></div>'
    + '</div></div>'
    + '<div data-cover-library-view hidden>'
    + '<div class="social-profile-cover-library-empty">'+renderIcon('film')+'<strong>Animasi sampul sedang disiapkan</strong><p>Pustaka ini akan berisi animasi pilihan PLUITS yang dapat dipasang pada area sampul. Ukuran dan posisi sampul tetap sama. Belum ada animasi resmi yang diterbitkan.</p></div>'
    + '</div>'
    + '<footer class="social-profile-cover-dialog-actions"><button type="button" data-cover-remove hidden>Hapus sampul</button></footer>'
    + '<div class="social-profile-cover-unsaved" data-cover-unsaved hidden><section role="alertdialog" aria-modal="true" aria-labelledby="cover-unsaved-title"><h3 id="cover-unsaved-title">Perubahan belum disimpan</h3><p>Apakah Anda ingin menyimpan perubahan sampul sebelum keluar?</p><div><button type="button" data-cover-keep-editing>Lanjut edit</button><button type="button" data-cover-discard>Buang perubahan</button><button type="button" data-cover-save-pending>Simpan perubahan</button></div></section></div></section>';
  card.append(dialog);

  const editorView = dialog.querySelector('[data-cover-editor-view]');
  const libraryView = dialog.querySelector('[data-cover-library-view]');
  const title = dialog.querySelector('#profile-cover-dialog-title');
  const subtitle = dialog.querySelector('[data-cover-dialog-subtitle]');
  const fileInput = dialog.querySelector('[data-cover-file]');
  const cropStage = dialog.querySelector('[data-cover-crop-stage]');
  const coverPicker = dialog.querySelector('[data-cover-picker]');
  const replaceButton = dialog.querySelector('[data-cover-replace]');
  const coverUpload = dialog.querySelector('.social-profile-cover-upload');
  const cropImage = dialog.querySelector('[data-cover-image-crop]');
  const cropAvatarPreview = dialog.querySelector('[data-cover-avatar-preview]');
  const profileAvatar = card.querySelector('.social-profile-avatar');
  if (profileAvatar) {
    const avatarClone = profileAvatar.cloneNode(true);
    avatarClone.removeAttribute('id');
    avatarClone.setAttribute('aria-hidden', 'true');
    cropAvatarPreview.append(avatarClone);
  }
  const videoPreview = dialog.querySelector('[data-cover-video-preview]');
  let cropPosition = { x: 50, y: 50, zoom: 1 };
  let cropPointer = null;
  const cropPointers = new Map();
  let pinchStart = null;
  let hasUnsavedChanges = false;
  let editingFile = null;
  const unsavedConfirm = dialog.querySelector('[data-cover-unsaved]');
  const saveButton = dialog.querySelector('.social-profile-cover-dialog-toolbar [data-cover-save]');
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
  let coverHistoryActive = false;
  let handlingCoverHistoryPop = false;
  const pushCoverHistoryState = () => {
    if (coverHistoryActive) return;
    const currentState = history.state && typeof history.state === 'object' ? history.state : {};
    history.pushState({ ...currentState, pluitsCoverDialog: stableProfileKey }, '', location.href);
    coverHistoryActive = true;
  };
  const applyCoverMedia = (file, objectUrl, crop = { x: 50, y: 50 }) => {
    cover.querySelector('.social-profile-cover-image')?.remove();
    const isVideo = /^video\//.test(file?.type || '');
    const media = document.createElement(isVideo ? 'video' : 'img');
    media.className = 'social-profile-cover-image';
    media.style.objectPosition = `${crop.x ?? 50}% ${crop.y ?? 50}%`;
    media.style.transform = `scale(${crop.zoom || 1})`;
    media.style.transformOrigin = 'center';
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
      cropPosition = saved.crop || { x: 50, y: 50 };
      applyCoverMedia(saved.blob, selectedObjectUrl, cropPosition);
    } catch {
      if (isMounted) subtitle.textContent = 'Media sampul tersimpan di perangkat ini belum dapat dibaca.';
    }
  };
  restoreSavedCover();

  const closeDialog = () => {
    dialog.hidden = true;
    unsavedConfirm.hidden = true;
    if (coverHistoryActive && !handlingCoverHistoryPop) {
      coverHistoryActive = false;
      history.back();
    } else {
      coverHistoryActive = false;
    }
    hasUnsavedChanges = false;
    cropPointers.clear(); pinchStart = null;
    if (pendingObjectUrl) { URL.revokeObjectURL(pendingObjectUrl); pendingObjectUrl = ''; }
    fileInput.value = '';
    cropStage.hidden = true;
    coverUpload.classList.remove('is-cropping');
    coverPicker.hidden = false;
    cropImage.removeAttribute('src');
    videoPreview.pause();
    videoPreview.removeAttribute('src');
    videoPreview.load();
    videoPreview.hidden = true;
    saveButton.disabled = false;
    if (previousFocus?.isConnected) previousFocus.focus();
  };
  const openDialog = (view, focusText = false) => {
    previousFocus = trigger;
    menu.hidden = true;
    trigger.setAttribute('aria-expanded', 'false');
    dialog.hidden = false;
    pushCoverHistoryState();
    const library = view === 'library';
    editorView.hidden = library;
    libraryView.hidden = !library;
    title.textContent = library ? 'Pustaka sampul' : 'Edit sampul';
    subtitle.textContent = library ? 'Koleksi sampul PLUITS.' : 'Pilih foto, video, atau GIF.';
    const currentMedia = cover.querySelector('.social-profile-cover-image');
    editingFile = null;
    if (currentMedia && currentMedia.tagName !== 'VIDEO') getCover(stableProfileKey).then(saved => {
      editingFile = saved?.blob || null;
      if (saved?.crop && !dialog.hidden && !cropStage.hidden) {
        cropPosition = { x: saved.crop.x ?? 50, y: saved.crop.y ?? 50, zoom: saved.crop.zoom || 1 };
        updateCropPosition();
      }
    }).catch(() => {});
    removeButton.hidden = library || !currentMedia;
    saveButton.disabled = false;
    const currentIsVideo = currentMedia?.tagName === 'VIDEO';
    coverPicker.hidden = Boolean(currentMedia);
    replaceButton.hidden = !currentMedia;
    cropStage.hidden = !currentMedia || currentIsVideo;
    coverUpload.classList.toggle('is-cropping', Boolean(currentMedia && !currentIsVideo));
    coverPicker.style.aspectRatio = `${cover.clientWidth} / ${cover.clientHeight}`;
    if (currentMedia && currentIsVideo) {
      videoPreview.hidden = false;
      videoPreview.src = currentMedia.currentSrc || currentMedia.src;
    } else {
      videoPreview.hidden = true;
      videoPreview.removeAttribute('src');
      if (currentMedia) {
        cropPosition = { ...cropPosition };
        cropImage.src = currentMedia.currentSrc || currentMedia.src;
        cropImage.style.objectPosition = `${cropPosition.x}% ${cropPosition.y}%`;
        cropStage.style.aspectRatio = `${cover.clientWidth} / ${cover.clientHeight}`;
      }
    }
    saveButton.hidden = library;
    dialog.querySelector('[data-cover-dismiss]').focus();
  };

  const updateCropPosition = () => {
    cropImage.style.objectPosition = `${cropPosition.x}% ${cropPosition.y}%`;
    cropImage.style.transform = `scale(${cropPosition.zoom || 1})`;
  };
  const pointerDistance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const requestCloseDialog = () => {
    if (hasUnsavedChanges) {
      unsavedConfirm.hidden = false;
      unsavedConfirm.querySelector('[data-cover-save-pending]').focus();
      return;
    }
    closeDialog();
  };
  const onCropPointerDown = event => {
    if (cropStage.hidden || !cropImage.src) return;
    cropPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    cropStage.setPointerCapture?.(event.pointerId);
    cropStage.classList.add('is-dragging');
    if (cropPointers.size === 2) {
      const points = [...cropPointers.values()];
      pinchStart = { distance: pointerDistance(points[0], points[1]), zoom: cropPosition.zoom || 1 };
      cropPointer = null;
    } else if (cropPointers.size === 1) {
      const rect = cropStage.getBoundingClientRect();
      const naturalWidth = cropImage.naturalWidth || rect.width;
      const naturalHeight = cropImage.naturalHeight || rect.height;
      const fit = Math.max(rect.width / naturalWidth, rect.height / naturalHeight) * (cropPosition.zoom || 1);
      cropPointer = { id: event.pointerId, x: event.clientX, y: event.clientY, cropX: cropPosition.x, cropY: cropPosition.y, overflowX: rect.width - naturalWidth * fit, overflowY: rect.height - naturalHeight * fit };
    }
    event.preventDefault();
  };
  const onCropPointerMove = event => {
    if (!cropPointers.has(event.pointerId)) return;
    cropPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (cropPointers.size >= 2 && pinchStart) {
      const points = [...cropPointers.values()];
      cropPosition.zoom = Math.max(1, Math.min(4, pinchStart.zoom * (pointerDistance(points[0], points[1]) / Math.max(1, pinchStart.distance))));
      updateCropPosition();
      hasUnsavedChanges = true;
    } else if (cropPointer && cropPointer.id === event.pointerId) {
      if (cropPointer.overflowX) cropPosition.x = Math.max(0, Math.min(100, cropPointer.cropX + ((event.clientX - cropPointer.x) / cropPointer.overflowX) * 100));
      if (cropPointer.overflowY) cropPosition.y = Math.max(0, Math.min(100, cropPointer.cropY + ((event.clientY - cropPointer.y) / cropPointer.overflowY) * 100));
      updateCropPosition();
      hasUnsavedChanges = true;
    }
    event.preventDefault();
  };
  const onCropPointerUp = event => {
    cropPointers.delete(event.pointerId);
    if (cropPointers.size < 2) pinchStart = null;
    if (cropPointers.size === 1) {
      const [id, point] = [...cropPointers.entries()][0];
      const rect = cropStage.getBoundingClientRect();
      const naturalWidth = cropImage.naturalWidth || rect.width;
      const naturalHeight = cropImage.naturalHeight || rect.height;
      const fit = Math.max(rect.width / naturalWidth, rect.height / naturalHeight) * (cropPosition.zoom || 1);
      cropPointer = { id, x: point.x, y: point.y, cropX: cropPosition.x, cropY: cropPosition.y, overflowX: rect.width - naturalWidth * fit, overflowY: rect.height - naturalHeight * fit };
    } else cropPointer = null;
    if (!cropPointers.size) cropStage.classList.remove('is-dragging');
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
    if (event.target.closest('[data-cover-dismiss]')) { requestCloseDialog(); return; }
    if (event.target === dialog) { requestCloseDialog(); return; }
    if (event.target.closest('[data-cover-keep-editing]')) { unsavedConfirm.hidden = true; return; }
    if (event.target.closest('[data-cover-discard]')) { hasUnsavedChanges = false; closeDialog(); return; }
    if (event.target.closest('[data-cover-save-pending]')) { saveButton.click(); return; }
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
    const isImage = /^image\/(jpeg|png|webp|gif)$/.test(file.type);
    const isVideo = /^video\/(mp4|webm)$/.test(file.type);
    if ((!isImage && !isVideo) || (isImage && file.size > 10 * 1024 * 1024)) {
      fileInput.value = '';
      subtitle.textContent = 'File tidak sesuai. Gunakan JPG, PNG, WebP, atau GIF maksimal 10 MB; video MP4/WebM maksimal 10 detik.';
      return;
    }
    if (menuCloseTimer) clearTimeout(menuCloseTimer);
    if (pendingObjectUrl) URL.revokeObjectURL(pendingObjectUrl);
    pendingObjectUrl = URL.createObjectURL(file);
    replaceButton.hidden = false;
    hasUnsavedChanges = true;
    if (isVideo) {
      coverPicker.hidden = true;
      cropStage.hidden = true;
      saveButton.disabled = true;
      videoPreview.hidden = false; videoPreview.src = pendingObjectUrl;
      videoPreview.onloadedmetadata = () => {
        if (!Number.isFinite(videoPreview.duration) || videoPreview.duration > 10) {
          URL.revokeObjectURL(pendingObjectUrl); pendingObjectUrl = '';
          videoPreview.removeAttribute('src'); videoPreview.load(); videoPreview.hidden = true;
          coverPicker.hidden = false;
          hasUnsavedChanges = false;
          fileInput.value = '';
          subtitle.textContent = 'Durasi video melebihi batas 10 detik. Pilih video yang lebih singkat.';
          return;
        }
        saveButton.disabled = false;
        subtitle.textContent = 'Video siap disimpan.';
      };
      videoPreview.onerror = () => { saveButton.disabled = true; coverPicker.hidden = false; subtitle.textContent = 'Video tidak dapat dibaca. Pilih file MP4 atau WebM yang valid.'; };
      videoPreview.load();
    } else {
      cropPosition = { x: 50, y: 50, zoom: 1 };
      hasUnsavedChanges = true;
      coverPicker.hidden = true;
      videoPreview.hidden = true; videoPreview.removeAttribute('src');
      cropImage.src = pendingObjectUrl;
      cropImage.style.objectPosition = '50% 50%';
      cropStage.style.aspectRatio = `${cover.clientWidth} / ${cover.clientHeight}`;
      cropStage.hidden = false;
      coverUpload.classList.add('is-cropping');
      saveButton.disabled = false;
      subtitle.textContent = 'Geser foto dengan satu jari. Cubit dengan dua jari untuk memperbesar atau memperkecil.';
    }
  };
  const onSave = async event => {
    if (!event.target.closest('[data-cover-save]') || (!pendingObjectUrl && !hasUnsavedChanges)) return;
    let file = fileInput.files?.[0] || editingFile;
    if (!file) {
      try { file = (await getCover(stableProfileKey))?.blob || null; } catch { file = null; }
    }
    if (!file) { subtitle.textContent = 'Foto sampul tidak dapat dibaca untuk disimpan ulang.'; return; }
    saveButton.disabled = true;
    subtitle.textContent = 'Menyimpan…';
    try {
      await putCover(stableProfileKey, file, cropPosition);
      if (selectedObjectUrl) URL.revokeObjectURL(selectedObjectUrl);
      selectedObjectUrl = URL.createObjectURL(file);
      if (pendingObjectUrl) URL.revokeObjectURL(pendingObjectUrl);
      pendingObjectUrl = '';
      editingFile = file;
      applyCoverMedia(file, selectedObjectUrl, cropPosition);
      fileInput.value = '';
      cropStage.hidden = true;
      coverPicker.hidden = true;
      
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
      cropStage.hidden = true; coverUpload.classList.remove('is-cropping'); coverPicker.hidden = false; replaceButton.hidden = true; cropImage.removeAttribute('src');
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
  const onCoverHistoryPop = () => {
    if (dialog.hidden) {
      coverHistoryActive = false;
      return;
    }
    handlingCoverHistoryPop = true;
    coverHistoryActive = false;
    requestCloseDialog();
    handlingCoverHistoryPop = false;
    if (!dialog.hidden) pushCoverHistoryState();
  };
  const onKeydown = event => {
    if (event.key === 'Escape') {
      if (!dialog.hidden && !unsavedConfirm.hidden) { unsavedConfirm.hidden = true; return; }
      if (!dialog.hidden) requestCloseDialog();
      else {
        closeMenu();
      }
    }
  };

  root.addEventListener('click', onClick);
  cropStage.addEventListener('pointerdown', onCropPointerDown);
  cropStage.addEventListener('pointermove', onCropPointerMove);
  cropStage.addEventListener('pointerup', onCropPointerUp);
  cropStage.addEventListener('pointercancel', onCropPointerUp);
  fileInput.addEventListener('change', onChange);
  dialog.addEventListener('click', onSave);
  dialog.addEventListener('click', onRemove);
  root.addEventListener('keydown', onKeydown);
  window.addEventListener('popstate', onCoverHistoryPop);
  return () => {
    root.removeEventListener('click', onClick);
    cropStage.removeEventListener('pointerdown', onCropPointerDown);
    cropStage.removeEventListener('pointermove', onCropPointerMove);
    cropStage.removeEventListener('pointerup', onCropPointerUp);
    cropStage.removeEventListener('pointercancel', onCropPointerUp);
    fileInput.removeEventListener('change', onChange);
    dialog.removeEventListener('click', onSave);
    dialog.removeEventListener('click', onRemove);
    isMounted = false;
    root.removeEventListener('keydown', onKeydown);
    window.removeEventListener('popstate', onCoverHistoryPop);
    if (menuCloseTimer) clearTimeout(menuCloseTimer);
    if (pendingObjectUrl) URL.revokeObjectURL(pendingObjectUrl);
    if (selectedObjectUrl) URL.revokeObjectURL(selectedObjectUrl);
    dialog.remove();
  };
}
