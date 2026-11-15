# Notifications Feature

**Status:** planned extraction; not an independent runtime module yet.

Current runtime owner: activity/notification behavior inside `src/pages/account/`, with shared navigation in `src/components/social/`.

Target responsibility: notification list, unread state, notification preferences and realtime notification behavior. Keep message unread counts separate from notification counts.


## Runtime extraction
- `list/index.js` owns notification page rendering, unread activity count, navigation badge painting and realtime/read-state interactions.
- Account injects current session/profile, Supabase client, signed avatar URLs, formatting, notifications and route remount callbacks.
- Existing notification and announcement tables and RLS remain unchanged.
