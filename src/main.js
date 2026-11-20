import './design-system/tokens.css';
import './styles/global.css';
import './features/home/home-page.css';
import './features/marketplace/marketplace-home-page.css';
import './features/dashboard/dashboard-page.css';
import './features/auth/auth-page.css';
import './features/legal/policy-page.css';
import { createAuthService } from './services/auth/auth-service.js';
import { createLocalDemoAuthService } from './services/auth/local-demo-auth-service.js';
import { createApp } from './app/create-app.js';
import { APP_BASE_URL } from './config/runtime.js';
const localDemoRequested = import.meta.env.VITE_PLUITS_DEMO_MODE === 'true'
  || new URLSearchParams(window.location.search).get('pluits-demo') === '1';
if (localDemoRequested) await import('./app/preview-tools.css');
const authService = localDemoRequested
  ? createLocalDemoAuthService()
  : createAuthService((await import('./lib/supabase/client.js')).supabase, { appUrl: APP_BASE_URL });
const root = document.querySelector('#app');
if (!root) throw new Error('PLUITS app root (#app) is missing.');
createApp({ root, authService });
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try { await navigator.serviceWorker.register(import.meta.env.BASE_URL + 'sw.js', { scope: import.meta.env.BASE_URL, updateViaCache: 'none' }); }
    catch (error) { console.error('PLUITS service worker registration failed.', error); }
  });
}
