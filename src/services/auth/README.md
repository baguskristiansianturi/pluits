# Auth Service

Owner: services/auth  
Status: Supabase adapter plus isolated local-demo adapter.

The production service is injected with the single Supabase client and owns:
- get current session and subscribe to Auth state changes;
- register with display name metadata and canonical email redirect;
- resend signup confirmation;
- email/password sign-in;
- password reset request and password update;
- sign-out;
- input validation and user-facing error mapping.

The local-demo adapter is selected only by the explicit `?pluits-demo=1` preview query parameter. It persists a synthetic session locally, labels the user with `app_metadata.provider = local-demo`, and never calls Supabase Auth. It is strictly for frontend UAT and must never be used as production authentication or authorization.

Services must not render HTML, access the DOM, or decide user permissions from user_metadata.

The current database already has Auth-user triggers for profile and wallet creation. Do not duplicate those inserts in the production frontend.
