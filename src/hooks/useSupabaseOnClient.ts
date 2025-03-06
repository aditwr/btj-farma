import { createClient } from "@/utils/supabase/client";
import { useMemo } from "react";
import { SupabaseClient } from "@supabase/supabase-js";

export function useSupabaseOnClient(): SupabaseClient {
    const supabase = useMemo(() => createClient(), []);
    return supabase;
}