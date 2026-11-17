# Auth Service

Owner: services/auth  
Status: active bootstrap service.

The service is injected with the single Supabase client and owns:
- get current session and subscribe to Auth state changes;
- register with display name metadata and canonical email redirect;
- resend signup confirmation;
- email/password sign-in;
- password reset request and password update;
- sign-out;
- input validation and user-facing error mapping.

It must not render HTML, access the DOM, or decide user permissions from user_metadata.

The current database already has Auth-user triggers for profile and wallet creation. Do not duplicate those inserts in the frontend.
