import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;
  const supabase = await createClient();
  const { data: roles, error: errorFetchRoles } = await supabase
    .from("roles")
    .select("*")
    .range(start, end)
    .order("created_at", { ascending: true });

  const { count } = await supabase
    .from("roles")
    .select("*", { count: "exact", head: true });

  if (errorFetchRoles) {
    console.log(
      "/dashboard/admininistrator/rolepermission/role error: ",
      errorFetchRoles
    );
    return NextResponse.json({ status: 500, message: "Internal Server Error" });
  }

  return NextResponse.json({ status: 200, data: roles, countRecord: count });
}
