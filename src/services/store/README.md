# Store Data Service

Owner: services/store  
Status: local demo adapter for frontend UAT only.

`local-demo-store-service.js` stores test store drafts in browser localStorage. It validates the basic form fields and duplicate demo usernames. Records are marked `demo_only: true` and `registration_status: draft`.

These records are device-local, are not sent to Supabase, are not published in Marketplace, and do not imply store verification, approval, active status, or online-sales permission. Production Store persistence and authorization must use the approved backend contract and owner-guarded database operations.
