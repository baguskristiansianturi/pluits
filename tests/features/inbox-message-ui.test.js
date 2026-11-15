import test from 'node:test';
import assert from 'node:assert/strict';
import { renderMessageMarkup, renderMessageStatus, formatMessageDuration } from '../../src/features/inbox/message-ui.js';

test('message status differentiates queued, sent, delivered and read', () => {
  assert.match(renderMessageStatus({ pending: true }), /Menunggu dikirim/);
  assert.match(renderMessageStatus({}), /Terkirim ke server/);
  assert.match(renderMessageStatus({ receipt: { delivered_at: '2026-11-15T10:00:00Z' } }), /Terkirim ke perangkat/);
  assert.match(renderMessageStatus({ receipt: { delivered_at: '2026-11-15T10:00:00Z', read_at: '2026-11-15T10:01:00Z' } }), /Dibaca/);
});

test('message markup escapes content and only exposes delete-for-everyone to sender', () => {
  const row = { id: 'm1', sender_id: 'u1', body: '<script>alert(1)</script>', created_at: '2026-11-15T10:00:00Z', message_type: 'text' };
  const own = renderMessageMarkup(row, { currentUserId: 'u1' });
  const other = renderMessageMarkup(row, { currentUserId: 'u2' });
  assert.doesNotMatch(own, /<script>/);
  assert.match(own, /data-message-action="delete-everyone"/);
  assert.doesNotMatch(other, /data-message-action="delete-everyone"/);
});

test('voice duration is formatted as minutes and seconds', () => {
  assert.equal(formatMessageDuration(125), '2:05');
});
