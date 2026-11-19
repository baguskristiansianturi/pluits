export const APP_ROUTES = Object.freeze({
  home: '',
  social: 'social',
  circle: 'circle',
  discover: 'discover',
  dashboard: 'dashboard',
  messages: 'messages',
  profile: 'profile',
  settings: 'settings',
  register: 'register',
  login: 'login',
  forgot: 'forgot',
  reset: 'reset',
  terms: 'terms',
  privacy: 'privacy',
  about: 'about',
  help: 'help',
  faq: 'faq',
  contact: 'contact',
  guidelines: 'guidelines',
  marketplaceInfo: 'marketplace-info',
  sellerTerms: 'seller-terms',
  paymentPolicy: 'payment-policy',
  refundPolicy: 'refund-policy',
  shippingPolicy: 'shipping-policy',
  accountDeletion: 'account-deletion',
  safety: 'safety',
  cookies: 'cookies',
  privacyChoices: 'privacy-choices',
  complaints: 'complaints',
  prohibitedItems: 'prohibited-items'
});

const BASE_PATH = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : import.meta.env.BASE_URL + '/';

export function routeHref(route) {
  if (!Object.prototype.hasOwnProperty.call(APP_ROUTES, route)) {
    throw new TypeError('Unknown PLUITS route: ' + route);
  }
  const slug = APP_ROUTES[route];
  return BASE_PATH + (slug ? slug + '/' : '');
}
