import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/database.types";
import { requireSupabaseConfig } from "@/lib/env";

export function createSupabasePublicClient() {
  const { url, anonKey } = requireSupabaseConfig();

  return createClient<Database>(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
