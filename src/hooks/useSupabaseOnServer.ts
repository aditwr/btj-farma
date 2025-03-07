import { createClient } from "@/utils/supabase/server";

export async function useSupabaseOnServer() {
    const supabase = await createClient();
    return supabase;
}
