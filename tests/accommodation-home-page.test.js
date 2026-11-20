import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = path => readFile(new URL(path, import.meta.url), 'utf8');

test('Accommodation discovery is an isolated public feature route', async () => {
  const [paths, app, changeMap] = await Promise.all([
    read('../src/config/paths.js'),
    read('../src/app/create-app.js'),
    read('../src/CHANGE-MAP.md')
  ]);
  assert.match(paths, /accommodation:'accommodation'/);
  assert.match(app, /mountAccommodationHomePage/);
  assert.match(app, /route==='accommodation'/);
  assert.match(changeMap, /#\/accommodation/);
});

test('Accommodation homepage provides quick search and local discovery', async () => {
  const page = await read('../src/features/accommodation/accommodation-home-page.js');
  for (const selector of ['ac-search-form', 'ac-destination', 'ac-checkin', 'ac-checkout', 'ac-guests', 'ac-type', 'ac-budget', 'ac-nearby', 'ac-types', 'ac-explore']) {
    assert.ok(page.includes(selector), 'Missing expected Accommodation UI: ' + selector);
  }
  assert.match(page, /LOCAL DISCOVERY/);
  assert.match(page, /Contoh eksplorasi lokal/);
  assert.match(page, /Tanggal belum memeriksa ketersediaan/);
  assert.match(page, /propertyDetailMarkup/);
  assert.match(page, /ac-detail-gallery/);
  assert.match(page, /Pilih kamar atau unit/);
  assert.match(page, /Ulasan nantinya ditampilkan dari akun PLUITS/);
  assert.match(page, /ac-detail-mobile-bar/);
  assert.match(page, /ac-nav-location/);
});

test('Accommodation preview fixtures do not claim live inventory or verified reviews', async () => {
  const page = await read('../src/features/accommodation/accommodation-home-page.js');
  assert.match(page, /Frontend-only preview fixtures/);
  assert.match(page, /ACCOMMODATION_PREVIEW_PROPERTIES/);
  assert.match(page, /Preview eksplorasi menggunakan data contoh/);
  assert.match(page, /Informasi ini merupakan deskripsi contoh untuk memperlihatkan struktur halaman detail/);
  assert.match(page, /Belum ada reservasi atau pembayaran yang diproses/);
  assert.match(page, /Harga akhir, pajak, biaya layanan, dan ketersediaan akan dihitung setelah data inventori terhubung/);
  assert.doesNotMatch(page, /verified provider|verified property|ulasan terverifikasi/i);
});

test('Accommodation page styles remain feature-scoped and use shared tokens', async () => {
  const css = await read('../src/features/accommodation/accommodation-home-page.css');
  assert.match(css, /\.ac-page/);
  assert.match(css, /var\(--pl-color-ink\)/);
  assert.match(css, /var\(--pl-container-wide\)/);
  assert.match(css, /\.ac-detail-gallery/);
  assert.match(css, /\.ac-detail-mobile-bar/);
  assert.doesNotMatch(css, /:root\s*\{/);
});

test('Accommodation page does not hard-code a Push advertising placement', async () => {
  const page = await read('../src/features/accommodation/accommodation-home-page.js');
  assert.doesNotMatch(page, /Push Sponsored|Promoted Accommodation|Iklan Pilihan/);
});
