const STORAGE_KEY = 'pluits-local-demo-stores-v1';

function readStores(storage) {
  try {
    const value = JSON.parse(storage?.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function listDemoStores(storage = globalThis.localStorage) {
  return readStores(storage);
}

export function createDemoStore(input, storage = globalThis.localStorage) {
  const name = String(input?.name || '').trim();
  const username = String(input?.username || '').trim().toLowerCase().replace(/^@/, '');
  const city = String(input?.city || '').trim();
  const description = String(input?.description || '').trim();
  if (name.length < 2 || name.length > 80) throw new Error('Nama toko harus terdiri dari 2 sampai 80 karakter.');
  if (!/^[a-z0-9][a-z0-9._-]{2,29}$/.test(username)) throw new Error('Username toko harus 3–30 karakter dan hanya memakai huruf kecil, angka, titik, garis bawah, atau tanda hubung.');
  if (city.length < 2 || city.length > 80) throw new Error('Kota atau area operasional wajib diisi.');
  const stores = readStores(storage);
  if (stores.some((store) => store.username === username)) throw new Error('Username toko ini sudah digunakan pada data simulasi.');
  const store = {
    id: 'demo-store-' + Date.now(),
    name,
    username,
    public_city: city,
    description,
    demo_only: true,
    registration_status: 'draft',
    created_at: new Date().toISOString()
  };
  stores.unshift(store);
  storage?.setItem(STORAGE_KEY, JSON.stringify(stores));
  return store;
}
