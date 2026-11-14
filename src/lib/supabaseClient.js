import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
const configured = Boolean(url && key);

if (!configured) {
  console.error(
    '[supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. ' +
      'Data-driven sections will show an error instead of loading.',
  );
}

/**
 * A missing env var used to blank the entire site, because `createClient`
 * throws while the module is being evaluated. Fail at call time instead: the
 * error is readable and the data hooks already turn it into an error state.
 */
const notConfigured = new Proxy(
  {},
  {
    get() {
      throw new Error(
        '[supabase] Not configured: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
      );
    },
  },
);

export const supabase = configured ? createClient(url, key) : notConfigured;
