import { resolveAuthenticatedRoute, resolveRoute } from './routes.js';
import { routeHref } from '../config/paths.js';
import { mountAuthPage } from '../features/auth/auth-page.js';
import { mountWorkspacePage } from '../features/workspace/workspace-page.js';
import { mountPolicyPage } from '../features/legal/policy-page.js';

export function createApp({ root, authService }) {
  let session = null;
  let ready = false;

  const navigate = (route) => {
    const next = routeHref(route);
    if (window.location.hash === next) {
      render();
      return;
    }
    window.location.hash = next;
  };

  function render() {
    if (!ready) {
      root.innerHTML = '<main class="app-loading" role="status">Menyiapkan PLUITS…</main>';
      return;
    }

    const requestedRoute = resolveRoute(window.location.hash, window.location.search);
    const route = resolveAuthenticatedRoute(requestedRoute, Boolean(session));

    if (route !== requestedRoute) {
      navigate(route);
      return;
    }

    if (route === 'workspace') {
      mountWorkspacePage({
        root,
        user: session.user,
        onSignOut: () => authService.signOut()
      });
      return;
    }

    if (route === 'terms' || route === 'privacy') {
      mountPolicyPage({ root, type: route });
      return;
    }

    mountAuthPage({
      root,
      mode: route,
      authService,
      hasRecoverySession: Boolean(session),
      onAuthenticated(nextSession) {
        session = nextSession;
        navigate('workspace');
      }
    });
  }

  const unsubscribe = authService.subscribe((event, nextSession) => {
    session = nextSession;

    if (event === 'PASSWORD_RECOVERY') {
      const url = new URL(window.location.href);
      url.searchParams.set('auth', 'reset');
      window.history.replaceState(null, '', url);
    }

    if (ready && ['INITIAL_SESSION', 'SIGNED_IN', 'SIGNED_OUT', 'PASSWORD_RECOVERY', 'USER_UPDATED'].includes(event)) {
      render();
    }
  });

  const onRouteChange = () => render();
  window.addEventListener('hashchange', onRouteChange);
  window.addEventListener('popstate', onRouteChange);

  authService.getSession()
    .then((initialSession) => {
      session = initialSession;
      ready = true;
      render();
    })
    .catch(() => {
      ready = true;
      root.innerHTML = '<main class="app-error" role="alert"><h1>PLUITS belum dapat terhubung</h1><p>Periksa koneksi internet lalu muat ulang halaman.</p><button type="button" data-retry>Ulangi</button></main>';
      root.querySelector('[data-retry]')?.addEventListener('click', () => window.location.reload());
    });

  return () => {
    unsubscribe();
    window.removeEventListener('hashchange', onRouteChange);
    window.removeEventListener('popstate', onRouteChange);
  };
}
