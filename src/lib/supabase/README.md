# Supabase Browser Client

One shared browser client is exported from client.js.

- Use the project URL and publishable key only.
- The existing PLUITS project and its local Auth storage key are retained so existing sessions can be recognized.
- Never include service-role or secret keys in browser code.
- Never reset or replace the production project as part of frontend work.
- Database schema, migrations, RLS, triggers, and data are outside the scope of this frontend bootstrap.
