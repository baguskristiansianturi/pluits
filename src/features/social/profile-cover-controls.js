import { renderIcon } from '../../design-system/icons.js';

export function renderProfileCoverMenu() {
  return '<div class="social-profile-cover-menu-wrap">'
    + '<button type="button" class="social-profile-cover-menu-trigger" data-cover-menu-trigger aria-label="Pengaturan sampul profil" aria-haspopup="menu" aria-expanded="false" title="Pengaturan sampul profil">'+renderIcon('moreVertical')+'</button>'
    + '<div class="social-profile-cover-menu" data-cover-menu role="menu" hidden>'
    + '<button type="button" role="menuitemcheckbox" data-cover-action="toggle" aria-checked="false"><span class="social-profile-cover-switch" aria-hidden="true"><span></span></span><span>Aktifkan sampul</span></button>'
    + '<button type="button" role="menuitem" data-cover-action="edit" disabled>'+renderIcon('image')+'<span>Edit sampul</span></button>'
    + '<button type="button" role="menuitem" data-cover-action="library">'+renderIcon('film')+'<span>Pustaka sampul</span></button>'
    + '</div></div>';
}

export function mountProfileCoverControls({ root } = {}) {
  const card = root?.querySelector('.social-profile-card');
  const cover = card?.querySelector('.social-profile-cover');
  const menu = card?.querySelector('[data-cover-menu]');
  const trigger = card?.querySelector('[data-cover-menu-trigger]');
  if (!card || !cover || !menu || !trigger) return () => {};

  const dialog = document.createElement('div');
  dialog.className = 'social-profile-cover-dialog';
  dialog.hidden = true;
  dialog.innerHTML = '<section class="social-profile-cover-dialog-panel" role="dialog" aria-modal="true" aria-labelledby="profile-cover-dialog-title">'
    + '<header class="social-profile-cover-dialog-header"><div><h2 id="profile-cover-dialog-title">Atur sampul profil</h2><p data-cover-dialog-subtitle>Sesuaikan tampilan sampul profil Anda.</p></div><button type="button" class="social-profile-cover-dialog-close" data-cover-dismiss aria-label="Tutup">×</button></header>'
    + '<div data-cover-editor-view><div class="social-profile-cover-editor">'
    + '<label class="social-profile-cover-upload">'+renderIcon('image')+'<strong>Pilih gambar sampul</strong><small>Format JPG, PNG, atau WebP · maksimal 10 MB</small><img data-cover-file-preview alt="" hidden><input type="file" accept="image/jpeg,image/png,image/webp" data-cover-file></label>'
    + '<div class="social-profile-cover-field"><label for="profile-cover-text">Tulisan pada sampul</label><input id="profile-cover-text" type="text" maxlength="48" data-cover-text placeholder="Contoh: PLUITS · PROFILE"></div>'
    + '</div><p class="social-profile-cover-dialog-note">Perubahan ini tampil sebagai pratinjau di perangkat ini. Penyimpanan ke akun akan tersedia setelah layanan media profil aktif.</p></div>'
    + '<div data-cover-library-view hidden>'
    + '<div class="social-profile-cover-library-empty">'+renderIcon('film')+'<strong>Animasi sampul sedang disiapkan</strong><p>Pustaka ini akan berisi animasi pilihan PLUITS yang dapat dipasang pada area sampul. Ukuran dan posisi sampul tetap sama. Belum ada animasi resmi yang diterbitkan.</p></div>'
    + '</div>'
    + '<footer class="social-profile-cover-dialog-actions"><button type="button" data-cover-dismiss>Batal</button><button type="button" data-cover-save>Simpan pratinjau</button></footer></section>';
  card.append(dialog);

  const editorView = dialog.querySelector('[data-cover-editor-view]');
  const libraryView = dialog.querySelector('[data-cover-library-view]');
  const title = dialog.querySelector('#profile-cover-dialog-title');
  const subtitle = dialog.querySelector('[data-cover-dialog-subtitle]');
  const textInput = dialog.querySelector('[data-cover-text]');
  const fileInput = dialog.querySelector('[data-cover-file]');
  const filePreview = dialog.querySelector('[data-cover-file-preview]');
  const saveButton = dialog.querySelector('[data-cover-save]');
  const toggleAction = menu.querySelector('[data-cover-action="toggle"]');
  const editAction = menu.querySelector('[data-cover-action="edit"]');
  let coverEnabled = Boolean(cover.querySelector('.social-profile-cover-image'));
  const syncCoverState = () => {
    card.classList.toggle('is-cover-disabled', !coverEnabled);
    toggleAction.setAttribute('aria-checked', String(coverEnabled));
    editAction.disabled = !coverEnabled;
  };
  syncCoverState();
  let pendingObjectUrl = '';
  let selectedObjectUrl = '';
  let previousFocus = null;

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
    subtitle.textContent = library ? 'Pilih koleksi sampul yang disediakan PLUITS.' : 'Tambah gambar dan atur tulisan yang tampil pada sampul.';
    textInput.value = cover.querySelector('.social-profile-cover-label')?.textContent || '';
    const currentImage = cover.querySelector('.social-profile-cover-image');
    filePreview.hidden = !currentImage;
    if (currentImage) filePreview.src = currentImage.src;
    saveButton.hidden = library;
    if (focusText && !library) textInput.focus();
    else dialog.querySelector('[data-cover-dismiss]').focus();
  };

  const onClick = event => {
    const menuTrigger = event.target.closest('[data-cover-menu-trigger]');
    if (menuTrigger && card.contains(menuTrigger)) {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!expanded));
      menu.hidden = expanded;
      return;
    }
    const action = event.target.closest('[data-cover-action]');
    if (action && card.contains(action)) {
      const selected = action.dataset.coverAction;
      menu.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
      if (selected === 'toggle') {
        coverEnabled = !coverEnabled;
        syncCoverState();
      } else if (selected === 'edit' && coverEnabled) {
        openDialog('editor');
      } else if (selected === 'library') {
        openDialog('library');
      }
      return;
    }
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
    if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size > 10 * 1024 * 1024) {
      fileInput.value = '';
      subtitle.textContent = 'File tidak sesuai. Gunakan JPG, PNG, atau WebP maksimal 10 MB.';
      return;
    }
    if (pendingObjectUrl) URL.revokeObjectURL(pendingObjectUrl);
    pendingObjectUrl = URL.createObjectURL(file);
    filePreview.src = pendingObjectUrl;
    filePreview.hidden = false;
    subtitle.textContent = 'Pratinjau gambar siap. Tekan Simpan pratinjau untuk menerapkan.';
  };
  const onSave = event => {
    if (!event.target.closest('[data-cover-save]')) return;
    const label = cover.querySelector('.social-profile-cover-label');
    if (label) label.textContent = textInput.value.trim() || 'PLUITS · PROFILE';
    if (pendingObjectUrl) {
      if (selectedObjectUrl) URL.revokeObjectURL(selectedObjectUrl);
      selectedObjectUrl = pendingObjectUrl;
      pendingObjectUrl = '';
      let image = cover.querySelector('.social-profile-cover-image');
      if (!image) {
        image = document.createElement('img');
        image.className = 'social-profile-cover-image';
        image.alt = '';
        cover.prepend(image);
      }
      image.src = selectedObjectUrl;
      coverEnabled = true;
      syncCoverState();
    }
    closeDialog();
  };
  const onKeydown = event => {
    if (event.key === 'Escape') {
      if (!dialog.hidden) closeDialog();
      else { menu.hidden = true; trigger.setAttribute('aria-expanded', 'false'); }
    }
  };

  root.addEventListener('click', onClick);
  dialog.addEventListener('change', onChange);
  dialog.addEventListener('click', onSave);
  root.addEventListener('keydown', onKeydown);
  return () => {
    root.removeEventListener('click', onClick);
    dialog.removeEventListener('change', onChange);
    dialog.removeEventListener('click', onSave);
    root.removeEventListener('keydown', onKeydown);
    if (pendingObjectUrl) URL.revokeObjectURL(pendingObjectUrl);
    if (selectedObjectUrl) URL.revokeObjectURL(selectedObjectUrl);
    dialog.remove();
  };
}
