const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

export function formatMessageTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

export function formatMessageDuration(value) {
  const seconds = Math.max(0, Number(value) || 0);
  return Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2, '0');
}

export function renderMessageStatus({ pending = false, receipt = null, voice = false } = {}) {
  if (pending) return '<span class="pl-msg-status is-pending" aria-label="Menunggu dikirim" title="Menunggu dikirim">◷</span>';
  if (receipt?.read_at) return '<span class="pl-msg-status is-read" aria-label="Dibaca" title="Dibaca">✓✓</span>' + (voice && receipt?.played_at ? '<span class="pl-msg-played" aria-label="Pesan suara diputar" title="Pesan suara diputar">🎙</span>' : '');
  if (receipt?.delivered_at) return '<span class="pl-msg-status is-delivered" aria-label="Terkirim ke perangkat" title="Terkirim ke perangkat">✓✓</span>';
  return '<span class="pl-msg-status is-sent" aria-label="Terkirim ke server" title="Terkirim ke server">✓</span>';
}

export function renderMessageMarkup(row, { currentUserId, pending = false, receipt = null } = {}) {
  const mine = row.sender_id === currentUserId;
  const deleted = Boolean(row.deleted_at);
  const type = row.message_type || 'text';
  const voice = type === 'voice' && row.media_path && !deleted;
  let content = deleted
    ? '<span class="pl-msg-deleted">Pesan ini dihapus</span>'
    : voice
      ? '<div class="pl-msg-voice-player"><audio controls preload="none" data-voice-path="' + esc(row.media_path) + '" data-message-id="' + esc(row.id || '') + '"></audio><span>Pesan suara · ' + formatMessageDuration(row.media_duration_seconds) + '</span><button type="button" class="pl-msg-voice-speed" data-voice-speed aria-label="Kecepatan pemutaran">1×</button></div>'
      : type === 'image' && row.media_path
        ? '<div class="pl-msg-image-wrap"><img data-image-path="' + esc(row.media_path) + '" alt="Foto yang dikirim" loading="lazy"><span class="pl-msg-image-loading">Memuat foto…</span></div>' + (row.body ? '<div class="pl-msg-text">' + esc(row.body) + '</div>' : '')
        : type === 'file' && row.media_path
          ? '<a class="pl-msg-file" data-file-path="' + esc(row.media_path) + '" href="#" target="_blank" rel="noopener"><span class="pl-msg-file-icon" aria-hidden="true">PDF</span><span><b>' + esc(row.media_name || 'Dokumen') + '</b><small>' + esc(row.media_mime_type || 'File') + '</small></span><span aria-hidden="true">↓</span></a>' + (row.body ? '<div class="pl-msg-text">' + esc(row.body) + '</div>' : '')
          : '<div class="pl-msg-text">' + esc(row.body) + '</div>';
  const sentAt = new Date(row.created_at).getTime();
  const canDeleteForEveryone = mine && Number.isFinite(sentAt) && Date.now() >= sentAt && Date.now() - sentAt <= 48 * 60 * 60 * 1000;
  const actions = !pending && !deleted && row.id
    ? '<details class="pl-msg-actions"><summary aria-label="Menu pesan" title="Opsi pesan"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="19" cy="12" r="1.7"/></svg></summary><div class="pl-msg-actions-menu">' +
      '<button type="button" data-message-action="reply">Balas</button><button type="button" data-message-action="forward">Teruskan</button><button type="button" data-message-action="select">Pilih pesan</button>' +
      (type === 'text' ? '<button type="button" data-message-action="copy">Salin pesan</button>' : '') +
      '<button type="button" data-message-action="hide">Hapus untuk saya</button>' +
      (canDeleteForEveryone ? '<button type="button" data-message-action="delete-everyone">Hapus untuk semua</button>' : '') +
      '</div></details>'
    : '';
  const status = mine ? renderMessageStatus({ pending, receipt, voice }) : '';
  return '<article class="pl-msg-bubble ' + (mine ? 'mine' : 'theirs') + (pending ? ' is-pending' : '') + (deleted ? ' is-deleted' : '') + '" data-message-id="' + esc(row.id || '') + '" data-message-type="' + esc(type) + '" data-media-path="' + esc(row.media_path || '') + '" data-media-name="' + esc(row.media_name || '') + '" data-message-body="' + esc(row.body || '') + '">' +
    '<input class="pl-msg-select-box" type="checkbox" data-select-message aria-label="Pilih pesan" tabindex="-1">' + content + actions +
    '<footer class="pl-msg-meta"><time datetime="' + esc(row.created_at || '') + '">' + formatMessageTime(row.created_at) + '</time>' + status + '</footer></article>';
}
