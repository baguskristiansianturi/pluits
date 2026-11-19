export async function restoreInitialSession(authService) {
 try {
  return await authService.getSession();
 } catch(error) {
  // A stale/unreadable persisted session must not prevent the public login page
  // from mounting. Continue as a guest; sign-in can establish a fresh session.
  console.warn('PLUITS could not restore the saved session; continuing in guest mode.', error);
  return null;
 }
}
