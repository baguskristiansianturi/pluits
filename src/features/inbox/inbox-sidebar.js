/**
 * Inbox conversation-list sidebar.
 * Inbox controller owns tab state, conversation loading and event binding.
 */
export function renderInboxSidebar({loadingMarkup='<p class="pl-msg-empty">Memuat percakapan…</p>'}={}){
 return `<aside class="pl-msg-sidebar" aria-label="Daftar percakapan">
  <nav class="pl-msg-inbox-tabs" aria-label="Kategori pesan" role="tablist">
   <button type="button" class="is-active" data-inbox-tab="primary" role="tab" aria-selected="true">Semua</button>
   <button type="button" data-inbox-tab="unread" role="tab" aria-selected="false">Belum dibaca</button>
  </nav>
  <div id="pl-msg-conversations">${loadingMarkup}</div>
 </aside>`;
}
