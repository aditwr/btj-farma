import { createClient } from "@supabase/supabase-js";

export async function getPenjualanFromAMPersada() {
  const supabaseUrl = process.env.NEXT_PUBLIC_AMP_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_AMP_SUPABASE_ANON_KEY;
  if (supabaseUrl && supabaseKey) {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data: pg_jenis_outlet } = await supabase
      .from("pg_penjualan_btj_view")
      .select("*");
    return pg_jenis_outlet;
  } else {
    console.error("Supabase URL or Key is not defined");
    return null;
  }
}
