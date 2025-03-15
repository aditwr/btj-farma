import { APIResponse } from "@/types/types";
import { canAccess } from "@/utils/dashboard/server";
import { getStartEndRange } from "@/utils/supabase/helpers";
import { createClient } from "@/utils/supabase/server";
import { redirect, useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest
): Promise<NextResponse<APIResponse>> {
  // check access
  const haveAccess = await canAccess(["all.access"]);
  if (!haveAccess) {
    return redirect("/error/forbidden");
  }
  const searchParams = request.nextUrl.searchParams;
  const activeStatus = searchParams.get("active");
  const page = parseInt(searchParams.get("page") || "1");
  const perPage = parseInt(searchParams.get("perPage") || "10");

  if (!activeStatus || !page || !perPage) {
    return NextResponse.json({
      status: "fail",
      message: "Bad Request",
      code: 400,
    });
  }

  const { start, end } = getStartEndRange({page: page, limit: perPage})

  const supabase = await createClient();
  const { data: users, error: errorFetchUsers } = await supabase
    .from("users")
    .select("*")
    .range(start, end)
    .eq("aktif", activeStatus === 'true')
    .order("created_at", { ascending: false });

  const { count, error: errorCountRecords } = await supabase.from("users").select("*", {count: "exact", head: true}).eq("aktif", activeStatus === 'true');
  
  if (errorFetchUsers || errorCountRecords) {
    if(errorFetchUsers) console.log(
      "/dashboard/administrator/verifikasi/api error fetch users: ",
      errorFetchUsers
    );
    if(errorCountRecords) console.log(
      "/dashboard/administrator/verifikasi/api error fetch count users records: ",
      errorFetchUsers
    );
    return NextResponse.json({
      status: "error",
      code: 500,
      message: "Internal Server Error",
    });
  }

  return NextResponse.json({
    status: "success",
    message: "Fetch users data success",
    data: {
      users: users,
      pagination: {
        total: count
      }
    },
  });
}

export async function PUT(request: NextRequest): Promise<NextResponse<APIResponse>> {
  const haveAccess = await canAccess(["all.access"]);
  if (!haveAccess) {
    return redirect("/error/forbidden");
  }
  // get data from request body
  const { id, id_role, aktif } = await request.json();
  console.log(id, id_role, aktif);
  if (!id || !id_role || aktif == null) {
    return NextResponse.json({
      status: 'fail',
      code: 400,
      message: "Bad Request",
    });
  }

  const supabase = await createClient();

  const { error: errorUpdateUser } = await supabase
    .from("users")
    .update({ id_role: id_role, aktif: aktif })
    .eq("id", id);

  if (errorUpdateUser) {
    console.log("/dashboard/admin/verifikasi error: ", errorUpdateUser);
    return NextResponse.json({
      status: "error",
      code: 500,
      message: "Internal Server Error",
    });
  }

  return NextResponse.json({
    status: "success",
    code: 200,
    message: "update user success",
  });
}
