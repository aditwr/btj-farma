import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = await createClient();
    const { data: roles, error: errorFetchRoles } = await supabase.from("roles").select("*").order("created_at", { ascending: true });
    if(errorFetchRoles) {
        console.log("/dashboard/admininistrator/rolepermission/role error: ", errorFetchRoles);
        return NextResponse.json({ status: 500, message: "Internal Server Error" });
    }

    return NextResponse.json({ status: 200, data: roles });
}