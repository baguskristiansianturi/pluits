import './design-system/tokens.css';
import './styles/global.css';
import './features/marketplace/marketplace-home.css';
import './features/dashboard/dashboard-page.css';
import './features/auth/auth-page.css';
import './features/legal/policy-page.css';
import './design-system/mobile-layout-contract.css';
import { createFirstPartyAuthService } from './services/auth/first-party-auth-service.js';
import { createApp } from './app/create-app.js';
import { APP_BASE_URL, API_BASE_URL } from './config/runtime.js';

const authService = createFirstPartyAuthService({
  apiBaseUrl: API_BASE_URL,
  appUrl: APP_BASE_URL
});
const root = document.querySelector('#app');
if (!root) throw new Error('PLUITS app root (#app) is missing.');
createApp({ root, authService });
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try { await navigator.serviceWorker.register(import.meta.env.BASE_URL + 'sw.js', { scope: import.meta.env.BASE_URL, updateViaCache: 'none' }); }
    catch (error) { console.error('PLUITS service worker registration failed.', error); }
  });
}
