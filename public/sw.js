// PLUITS V2 uses network-first document delivery and does not cache app pages.
// Remove only caches owned by earlier PLUITS shell releases.
const OWNED_CACHE_PREFIXES = ['pluits-shell-', 'pluits-v2-'];

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => OWNED_CACHE_PREFIXES.some((prefix) => key.startsWith(prefix)))
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// Intentionally no fetch handler: HTML and Vite assets are loaded from the current deployment.
