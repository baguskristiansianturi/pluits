import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const manifest = JSON.parse(await readFile(new URL('../../public/manifest.webmanifest', import.meta.url), 'utf8'));
const index = await readFile(new URL('../../index.html', import.meta.url), 'utf8');

async function pngDimensions(path) {
  const data = await readFile(new URL(path, import.meta.url));
  assert.deepEqual([...data.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
}

test('PWA manifest includes real 192px and 512px raster icons plus vector fallback', async () => {
  const sizes = new Set(manifest.icons.filter(icon => icon.type === 'image/png').map(icon => icon.sizes));
  assert.ok(sizes.has('192x192'));
  assert.ok(sizes.has('512x512'));
  assert.ok(manifest.icons.some(icon => icon.type === 'image/svg+xml' && icon.sizes === 'any'));
  assert.deepEqual(await pngDimensions('../../public/assets/brand/pluits-icon-192.png'), { width: 192, height: 192 });
  assert.deepEqual(await pngDimensions('../../public/assets/brand/pluits-icon-512.png'), { width: 512, height: 512 });
});

test('iOS home-screen icon points to a real 180px PNG', async () => {
  assert.ok(index.includes('rel="apple-touch-icon" sizes="180x180" href="%BASE_URL%assets/brand/apple-touch-icon.png"'));
  assert.deepEqual(await pngDimensions('../../public/assets/brand/apple-touch-icon.png'), { width: 180, height: 180 });
});
