import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('Notification page, unread badge and realtime actions are owned by Notifications feature',async()=>{
 const feature=await readFile(new URL('../../src/features/notifications/list/index.js',import.meta.url),'utf8');
 const account=await readFile(new URL('../../src/pages/account/index.js',import.meta.url),'utf8');
 assert.match(feature,/export async function renderNotificationPage/);
 assert.match(feature,/export async function getUnreadActivityCount/);
 assert.match(feature,/export function paintUnreadBadge/);
 assert.match(feature,/export function bindNotificationInteractions/);
 assert.match(feature,/pluits_system_announcements/);
 assert.match(feature,/removeChannel/);
 assert.ok(account.includes("from '../../features/notifications/list/index.js'"));
 assert.ok(account.includes('return renderNotificationPage({'));
});
