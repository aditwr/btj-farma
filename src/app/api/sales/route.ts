import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_AMP_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_AMP_SUPABASE_ANON_KEY;


export async function POST(req: NextRequest) {
    // get data from request body
    const { apiParams } = await req.json();
    if (!supabaseUrl || !supabaseKey) {
        throw new Error("Supabase URL or Key is not defined");
    }
    const supabase = createClient(supabaseUrl, supabaseKey);
    if( apiParams.startDate && apiParams.endDate ) {
        const { data: dataPenjualan, error: errorFetchDataPenjualan } = await supabase.from("pg_penjualan_btj_view").select("*").gte("tgl_nota", apiParams.startDate).lte("tgl_nota", apiParams.endDate);
        if (errorFetchDataPenjualan) {
            console.error(errorFetchDataPenjualan);
            return NextResponse.json({ success: false, message: "Internal Server Error"  });
        }
        return NextResponse.json({ data: dataPenjualan });
    } else if (apiParams.startMonth && apiParams.endMonth) {
        const { data: dataPenjualan, error: errorFetchDataPenjualan } = await supabase.from("pg_penjualan_btj_view").select("*").gte("tgl_nota", apiParams.startMonth).lte("tgl_nota", apiParams.endMonth);
        if (errorFetchDataPenjualan) {
          console.error(errorFetchDataPenjualan);
          return NextResponse.json({
            success: false,
            message: "Internal Server Error",
          });
        }
        return NextResponse.json({ success: true,data: dataPenjualan });
    }
}