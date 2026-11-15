import test from 'node:test';
import assert from 'node:assert/strict';
import { assetRegistry, findIconAsset } from '../../src/design-system/assets/registry.js';

test('asset warehouse inventories all local icon sources', () => {
  assert.equal(assetRegistry.icons.general.names.length, 12);
  assert.equal(assetRegistry.icons.social.names.length, 41);
  assert.equal(assetRegistry.icons.application.names.length, 12);
  assert.equal(assetRegistry.icons.sprite.names.length, 6);
  assert.ok(findIconAsset('search').length >= 3);
  assert.equal(findIconAsset('not-in-warehouse').length, 0);
});

test('asset warehouse records local font availability honestly', () => {
  assert.equal(assetRegistry.fonts.localFilesFound, false);
  assert.match(assetRegistry.fonts.policy, /system UI/);
});


test('all literal social icon references resolve to registered SVG artwork', async () => {
  const { readdir, readFile } = await import('node:fs/promises');
  const { SOCIAL_ICON_NAMES, socialIcon } = await import('../../src/design-system/icons/social-registry.js');
  const root = new URL('../../src/', import.meta.url);
  const files = [];
  async function walk(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const target = new URL(entry.name + (entry.isDirectory() ? '/' : ''), directory);
      if (entry.isDirectory()) await walk(target);
      else if (entry.name.endsWith('.js')) files.push(target);
    }
  }
  await walk(root);
  const missing = new Set();
  for (const file of files) {
    const source = await readFile(file, 'utf8');
    for (const match of source.matchAll(/socialIcon\(\s*(['"])([^'"]+)\1/g)) {
      if (!SOCIAL_ICON_NAMES.includes(match[2])) missing.add(match[2] + ' (' + file.pathname.split('/src/')[1] + ')');
    }
  }
  const account = await readFile(new URL('../../src/pages/account/index.js', import.meta.url), 'utf8');
  const settingsStart = account.indexOf('const groups=[');
  const settingsEnd = account.indexOf('const rows=groups.map', settingsStart);
  assert.ok(settingsStart >= 0 && settingsEnd > settingsStart, 'Account settings icon declarations must remain discoverable.');
  const settingsBlock = account.slice(settingsStart, settingsEnd);
  for (const match of settingsBlock.matchAll(/\[\s*'([a-z][a-z0-9-]*)'\s*,\s*'[^']+'\s*,\s*'[^']+'\s*,\s*'[^']+'/g)) {
    if (!SOCIAL_ICON_NAMES.includes(match[1])) missing.add(match[1] + ' (account settings)');
  }
  assert.deepEqual([...missing], [], 'Every literal and account-settings social icon reference must have a registered SVG path.');
  for (const name of SOCIAL_ICON_NAMES) assert.match(socialIcon(name), /^<svg\b[\s\S]*<\/svg>$/, 'Missing SVG output for ' + name);
});
