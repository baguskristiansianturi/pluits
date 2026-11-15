# Relationships

**Status:** Follow-list rendering and follow/accept/remove interactions are extracted from the Account controller.

- `index.js` owns follower/following list rendering and relationship action bindings.
- Account supplies the active user, Supabase client, navigation/avatar helpers, notification callback and route remount callback.
- Existing `user_follows` rows, RPC directory lookup and database authorization policies remain unchanged.
