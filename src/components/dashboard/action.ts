import { createClient } from "@/utils/supabase/server";

export async function getAllRoles(): Promise<{
  data: any[] | null;
  error: any;
}> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("roles").select("*");
  return { data, error };
}
