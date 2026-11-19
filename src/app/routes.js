import { APP_ROUTES } from '../config/paths.js';
const ROUTES = new Set(Object.keys(APP_ROUTES));
const ROUTE_KEYS_BY_PATH = new Map(Object.entries(APP_ROUTES).map(([key, path]) => [path, key]));
export function resolveRoute(hash = '', search = '') {
  const query = new URLSearchParams(String(search || '').replace(/^\?/, ''));
  if (query.get('auth') === 'reset') return 'reset';
  const raw = String(hash || '').replace(/^#\/?/, '').split('?')[0];
  if (!raw) return 'home';
  const route = raw.replace(/^\/+|\/+$/g, '');
  return ROUTES.has(route) ? route : (ROUTE_KEYS_BY_PATH.get(route) || 'register');
}
export function resolveAuthenticatedRoute(route, hasSession, developerProfilePreview = false) {
  // This flag is supplied only by createApp in Vite development builds.
  // It grants no access to any other authenticated route.
  if (route === 'profile' && developerProfilePreview) return 'profile';
  if (['dashboard','social','messages','profile','settings'].includes(route) && !hasSession) return 'login';
  if (route === 'circle') return 'social';
  if (hasSession && ['register', 'login', 'forgot'].includes(route)) return 'social';
  return route;
}