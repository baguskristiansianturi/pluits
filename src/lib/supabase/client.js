import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.119.0';

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://ytndswhqxayqpftszwfh.supabase.co';

const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_kOUbKBYg88nXgz8FQRSnvA_k0hvKY65';

// A publishable key is intended for browser use. Never place a service-role
// or secret key in this module, Vite environment variables, or client bundles.
export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    autoRefreshToken: true,
    detectSessionInUrl: true,
    persistSession: true
  }
});
