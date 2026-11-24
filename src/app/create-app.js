import { resolveAuthenticatedRoute, resolveRoute } from './routes.js';
import { restoreInitialSession } from './restore-initial-session.js';
import { routeHref } from '../config/paths.js';
import { renderBottomNavigation } from '../design-system/page-shell.js';
import { mountHomePage } from '../features/social/home/home-page.js';
import { mountBusinessHomePage } from '../features/home/business-home-page.js';
import { mountVenueHomePage } from '../features/venue/venue-home-page.js';
import { mountVenueProviderPage } from '../features/venue/venue-provider-page.js';
import { mountMarketplaceHomePage } from '../features/marketplace/marketplace-home-page.js';
import { mountBlogPage } from '../features/social/blog/blog-page.js';
import { mountDiscoverPage, mountMessagesPage, mountProfilePage, mountSettingsPage } from '../features/social/social-pages.js';
import { mountDashboardPage } from '../features/dashboard/dashboard-page.js';
import { mountAuthPage } from '../features/auth/auth-page.js';
import { mountPolicyPage } from '../features/legal/policy-page.js';
import { mountPublicInfoPage } from '../features/public-info/public-info-page.js';

export function createApp({ root, authService }) {
  let session = null;
  let ready = false;
  let cleanupPage = null;

  const navigate = (route) => {
    const next = routeHref(route);
    if (window.location.pathname === new URL(next, window.location.origin).pathname) {
      render();
      return;
    }
    window.history.pushState({}, '', next);
    render();
  };

  function mountWithNavigation(active, mount) {
    const cleanup = mount();
    root.querySelectorAll('.global-bottom-nav').forEach((nav) => nav.remove());
    root.insertAdjacentHTML('beforeend', renderBottomNavigation(active));
    return cleanup;
  }

  function render() {
    cleanupPage?.();
    cleanupPage = null;

    if (!ready) {
      root.innerHTML = '<main class="app-loading" role="status">Menyiapkan PLUITS…</main>';
      return;
    }

    const requested = resolveRoute(window.location.pathname, window.location.search);

    // Public profile is intentionally mounted before auth routing. A visitor
    // must be able to inspect a profile even while backend/auth is unavailable.
    if (requested === 'profile') {
      cleanupPage = mountWithNavigation('profile', () => mountProfilePage({ root, user: session?.user || null, accessToken: session?.access_token || null }));
      return;
    }

    const route = resolveAuthenticatedRoute(requested, Boolean(session));
    if (route !== requested) {
      navigate(route);
      return;
    }

    if (route === 'home') { mountWithNavigation('', () => mountBusinessHomePage({ root, user: session?.user || null })); return; }
    if (route === 'venue') { cleanupPage = mountVenueHomePage({ root, user: session?.user || null }); return; }
    if (route === 'restaurant') { cleanupPage = mountVenueProviderPage({ root, user: session?.user || null }); return; }
    if (route === 'marketplace') { mountWithNavigation('discover', () => mountMarketplaceHomePage({ root })); return; }
    if (route === 'social') { cleanupPage = mountWithNavigation('social', () => mountHomePage({ root, user: session?.user || null, accessToken: session?.access_token || null, onSignOut: () => authService.signOut() })); return; }
    if (route === 'blog') { cleanupPage = mountWithNavigation('social', () => mountBlogPage({ root, user: session?.user || null })); return; }
    if (route === 'circle') { navigate('social'); return; }
    if (route === 'messages') { mountWithNavigation('messages', () => mountMessagesPage({ root, user: session?.user || null })); return; }
    if (route === 'settings') { mountWithNavigation('', () => mountSettingsPage({ root, user: session?.user || null, onSignOut: () => authService.signOut() })); return; }
    if (route === 'discover') { mountWithNavigation('discover', () => mountDiscoverPage({ root, user: session?.user || null })); return; }
    if (route === 'dashboard') { mountWithNavigation('', () => mountDashboardPage({ root, user: session?.user || null, onSignOut: () => authService.signOut() })); return; }
    if (route === 'terms' || route === 'privacy') { mountWithNavigation('', () => mountPolicyPage({ root, type: route })); return; }

    if ([
      'about', 'help', 'faq', 'contact', 'guidelines', 'marketplaceInfo',
      'sellerTerms', 'paymentPolicy', 'refundPolicy', 'shippingPolicy',
      'accountDeletion', 'safety', 'cookies', 'privacyChoices', 'complaints',
      'prohibitedItems'
    ].includes(route)) {
      mountWithNavigation('', () => mountPublicInfoPage({ root, type: route }));
      return;
    }

    mountWithNavigation('', () => mountAuthPage({
      root,
      mode: route,
      authService,
      hasRecoverySession: Boolean(session),
      onAuthenticated(nextSession) {
        session = nextSession;
        navigate('social');
      }
    }));
  }

  const unsubscribe = authService.subscribe((event, nextSession) => {
    session = nextSession;
    if (event === 'PASSWORD_RECOVERY') {
      const url = new URL(window.location.href);
      url.searchParams.set('auth', 'reset');
      window.history.replaceState(null, '', url);
    }
    if (event === 'SIGNED_OUT' && ready && ['dashboard', 'social', 'messages', 'settings'].includes(resolveRoute())) {
      navigate('home');
      return;
    }
    if (ready && ['INITIAL_SESSION', 'SIGNED_IN', 'SIGNED_OUT', 'PASSWORD_RECOVERY', 'USER_UPDATED'].includes(event)) render();
  });

  const onRouteChange = () => render();
  window.addEventListener('popstate', onRouteChange);

  const initialSession = restoreInitialSession(authService);

  initialSession.then((initial) => {
    session = initial;
    ready = true;
    if (initial && resolveRoute() === 'home') {
      navigate('social');
      return;
    }
    render();
  });

  return () => {
    cleanupPage?.();
    unsubscribe();
    window.removeEventListener('popstate', onRouteChange);
  };
}