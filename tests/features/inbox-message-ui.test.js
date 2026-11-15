import test from 'node:test';
import assert from 'node:assert/strict';
import { renderMessageMarkup, renderMessageStatus, formatMessageDuration } from '../../src/features/inbox/message-ui.js';
import { renderInboxSidebar } from '../../src/features/inbox/inbox-sidebar.js';

test('message status differentiates queued, sent, delivered and read', () => {
  assert.match(renderMessageStatus({ pending: true }), /Menunggu dikirim/);
  assert.match(renderMessageStatus({}), /Terkirim ke server/);
  assert.match(renderMessageStatus({ receipt: { delivered_at: '2026-11-15T10:00:00Z' } }), /Terkirim ke perangkat/);
  assert.match(renderMessageStatus({ receipt: { delivered_at: '2026-11-15T10:00:00Z', read_at: '2026-11-15T10:01:00Z' } }), /Dibaca/);
  assert.match(renderMessageStatus({ voice: true, receipt: { delivered_at: '2026-11-15T10:00:00Z', read_at: '2026-11-15T10:01:00Z', played_at: '2026-11-15T10:02:00Z' } }), /Pesan suara diputar/);
});

test('message markup escapes content and only exposes delete-for-everyone to sender', () => {
  const row = { id: 'm1', sender_id: 'u1', body: '<script>alert(1)</script>', created_at: new Date().toISOString(), message_type: 'text' };
  const own = renderMessageMarkup(row, { currentUserId: 'u1' });
  const other = renderMessageMarkup(row, { currentUserId: 'u2' });
  assert.doesNotMatch(own, /<script>/);
  assert.match(own, /data-message-action="delete-everyone"/);
  assert.doesNotMatch(other, /data-message-action="delete-everyone"/);
  const oldMessage = renderMessageMarkup({ ...row, created_at: new Date(Date.now() - 49 * 60 * 60 * 1000).toISOString() }, { currentUserId: 'u1' });
  assert.doesNotMatch(oldMessage, /data-message-action="delete-everyone"/);
});

test('voice duration is formatted as minutes and seconds', () => {
  assert.equal(formatMessageDuration(125), '2:05');
});

test('voice message markup carries its id for played receipts', () => {
  const voice = renderMessageMarkup({
    id: 'voice-1', sender_id: 'u2', body: '', created_at: new Date().toISOString(),
    message_type: 'voice', media_path: 'conversation/user/audio.webm', media_duration_seconds: 8
  }, { currentUserId: 'u1' });
  assert.match(voice, /data-message-id="voice-1"/);
  assert.match(voice, /data-voice-path=/);
});

test('Inbox tabs expose implemented All and Unread filters only', () => {
  const sidebar = renderInboxSidebar();
  assert.match(sidebar, /data-inbox-tab="primary"/);
  assert.match(sidebar, /data-inbox-tab="unread"/);
  assert.doesNotMatch(sidebar, /data-inbox-tab="requests"|data-inbox-tab="blocked"/);
});


test('image and file attachments render as private media cards', () => {
  const image = renderMessageMarkup({
    id:'img-1',sender_id:'u1',body:'',created_at:new Date().toISOString(),
    message_type:'image',media_path:'conversation/u1/photo.jpg',media_mime_type:'image/jpeg'
  }, {currentUserId:'u1'});
  const file = renderMessageMarkup({
    id:'file-1',sender_id:'u1',body:'',created_at:new Date().toISOString(),
    message_type:'file',media_path:'conversation/u1/brief.pdf',media_mime_type:'application/pdf',media_name:'brief.pdf'
  }, {currentUserId:'u1'});
  assert.match(image,/data-image-path=/);
  assert.match(file,/data-file-path=/);
  assert.match(file,/brief\.pdf/);
});

test('message markup exposes reply and starred state without unsafe HTML', () => {
  const markup=renderMessageMarkup({
    id:'m-star',sender_id:'u1',body:'Safe text',created_at:new Date().toISOString(),
    message_type:'text',is_starred:true,reply_preview:'Earlier message'
  },{currentUserId:'u1'});
  assert.match(markup,/data-message-action="star"/);
  assert.match(markup,/Pesan ditandai/);
  assert.match(markup,/Earlier message/);
  assert.doesNotMatch(markup,/<script>/);
});
