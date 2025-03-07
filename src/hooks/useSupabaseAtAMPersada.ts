import { useMemo } from "react";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export function useSupabaseAtAMPersada(): SupabaseClient | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_AMP_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_AMP_SUPABASE_ANON_KEY;

  const supabase = useMemo(() => {
    if (supabaseUrl && supabaseKey) {
      return createClient(supabaseUrl, supabaseKey);
    } else {
      console.error("Supabase URL or Key is not defined");
      return null;
    }
  }, [supabaseUrl, supabaseKey]);

  return supabase;
}
