export const APP_ROUTES = Object.freeze({ home:'home', register:'register', login:'login', forgot:'forgot', reset:'reset', workspace:'workspace', terms:'terms', privacy:'privacy' });
export function routeHref(route) {
  const path = APP_ROUTES[route];
  if (!path) throw new TypeError('Unknown PLUITS route: ' + route);
  return '#/' + path;
}
