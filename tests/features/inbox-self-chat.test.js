import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const inbox = readFileSync(new URL('../../src/pages/messages/index.js', import.meta.url), 'utf8');
const migration = readFileSync(new URL('../../supabase/migrations/20261115143631_pluits_inbox_self_conversation.sql', import.meta.url), 'utf8');

test('Inbox contact list is based on conversations, not social follows', () => {
  const start = inbox.indexOf('async function loadContacts()');
  const end = inbox.indexOf('function bindStartChat', start);
  const loader = inbox.slice(start, end);
  assert.match(loader, /user_conversation_members/);
  assert.doesNotMatch(loader, /user_follows/);
  assert.match(inbox, /Kontak Inbox/);
});

test('username search includes the signed-in account for self-chat', () => {
  assert.match(inbox, /username\.ilike/);
  assert.doesNotMatch(inbox, /\.neq\('id',user\.id\)/);
  assert.match(inbox, /person\.id===user\.id\?'Pesan ke diri sendiri'/);
  assert.match(inbox, /data-start-chat="\'+esc\(currentUser\.id\)/);
});

test('self-chat creates one stable private conversation membership', () => {
  assert.match(migration, /v_key := 'self:' \|\| v_me::text/);
  assert.match(migration, /values \(v_id, v_me, 'member'\)/);
  assert.match(migration, /on conflict \(conversation_id, user_id\) do nothing/);
  assert.match(inbox, /conversation\.direct_key==='self:'\+currentUser\.id/);
});
