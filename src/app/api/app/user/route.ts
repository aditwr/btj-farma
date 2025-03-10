import { createClient } from "@/utils/supabase/server";
import { APIRequestResponse } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<APIRequestResponse>> {
    const supabase = await createClient();
    const { data: { user }, error: errorGetUser } = await supabase.auth.getUser();
    
    if (errorGetUser) {
        return NextResponse.json({ success: false, message: "Internal Server Error" });
    }
    return NextResponse.json({ success: true, message: "get user success", data: user });
}