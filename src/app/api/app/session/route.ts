import { createClient } from "@/utils/supabase/server";
import { APIRequestResponse } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<APIRequestResponse>> {
    const supabase = await createClient();
    const { data: { session }, error: errorGetSession } = await supabase.auth.getSession();
    
    if (errorGetSession) {
        return NextResponse.json({ success: false, message: "Internal Server Error" });
    }
    return NextResponse.json({ success: true, message: "get session success", data: session });
}