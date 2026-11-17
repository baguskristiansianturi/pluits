import { APP_ROUTES } from '../config/paths.js';

const ROUTES = new Set(Object.keys(APP_ROUTES));

export function resolveRoute(hash = '', search = '') {
  const query = new URLSearchParams(String(search || '').replace(/^\\?/, ''));
  if (query.get('auth') === 'reset') return 'reset';

  const raw = String(hash || '').replace(/^#\\/?/, '').split('?')[0];
  const route = raw.replace(/^\\/+|\\/+$/g, '');
  return ROUTES.has(route) ? route : 'register';
}

export function resolveAuthenticatedRoute(route, hasSession) {
  if (route === 'workspace' && !hasSession) return 'login';
  if (hasSession && ['register', 'login', 'forgot'].includes(route)) return 'workspace';
  return route;
}
