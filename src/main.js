import { supabase as presenceDb } from './lib/supabase/client.js';
import { startGlobalPresence } from './services/realtime/presence/index.js';
import { canonicalizeLegacyRoute, getInternalRoute, SITE_BASE } from './components/social/navigation-routes.js';

void startGlobalPresence(presenceDb);

import './design-system/tokens/foundation.css';
import './design-system/layouts/foundation.css';
import './style.css';
import './styles/brand.css';
import './styles/page-transitions.css';
import './styles/social-navigation.css';
import './pages/account/circle-story-layout.css';
import { route } from './app/router.js';

let renderSequence = 0;
const currentAddress = () => location.pathname + location.search + location.hash;

async function render() {
  const sequence = ++renderSequence;
  // Convert bookmarked hash URLs to their readable page addresses once.
  if (location.hash.startsWith('#/')) {
    const clean = canonicalizeLegacyRoute(location.hash.slice(1));
    history.replaceState(null, '', clean);
  }
  const internal = getInternalRoute(location);
  const path = internal.split('?')[0].replace(/\/$/, '');
  if (['home', 'feed', 'beranda', 'guest'].includes(path)) {
    history.replaceState(null, '', SITE_BASE);
  }
  const finalAddress = currentAddress();
  await route();
  if (sequence !== renderSequence || currentAddress() !== finalAddress) return;
  if ((!path || path === 'guest') && document.querySelector('#pl-public-feed')) {
    const {bindHome}=await import('./pages/home/index.js');
    await bindHome();
  }
}

// Existing in-app links are upgraded centrally, so older page modules remain
// compatible while the visible browser address always uses canonical paths.
document.addEventListener('click', event => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const anchor = event.target.closest?.('a[href^="#/"]');
  if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
  event.preventDefault();
  const destination = canonicalizeLegacyRoute(anchor.getAttribute('href').slice(1));
  if (destination !== currentAddress()) history.pushState(null, '', destination);
  render();
});

window.addEventListener('popstate', render);
window.addEventListener('hashchange', render);
render();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`, {
        scope: import.meta.env.BASE_URL,
        updateViaCache: 'none'
      });
      await registration.update();
    } catch (error) {
      console.error('Pluits service worker update failed:', error);
    }
  });
}
