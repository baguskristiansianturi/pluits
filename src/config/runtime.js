export const APP_BASE_URL = new URL(
  import.meta.env.BASE_URL || '/',
  window.location.origin
).toString();

export function assetUrl(path) {
  return new URL(String(path).replace(/^\/+/, ''), APP_BASE_URL).toString();
}

export const PASSWORD_RESET_URL = new URL('?auth=reset', APP_BASE_URL).toString();

export const AUTH_PROVIDER = 'first-party';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
export const PUBLIC_SIGNUP_ENABLED = import.meta.env.VITE_PUBLIC_SIGNUP_ENABLED === 'true' && AUTH_PROVIDER === 'first-party' && Boolean(API_BASE_URL);
