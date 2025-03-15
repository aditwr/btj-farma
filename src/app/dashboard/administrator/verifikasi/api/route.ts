import { APIResponse } from "@/types/types";
import { canAccess } from "@/utils/dashboard/server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest
): Promise<NextResponse<APIResponse>> {
  // check access
  const haveAccess = await canAccess(["all.access"]);
  if (!haveAccess) {
    return redirect("/error/forbidden");
  }
  const supabase = await createClient();
  const { data: users, error: errorFetchUsers } = await supabase
    .from("users")
    .select("*")
    .order("created_at", { ascending: false });

  if (errorFetchUsers) {
    console.log(
      "/dashboard/administrator/verifikasi/api error fetch users: ",
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
    },
  });
}

export async function PUT(request: NextRequest) {
  const haveAccess = await canAccess(["all.access"]);
  if (!haveAccess) {
    return redirect("/error/forbidden");
  }
  // get data from request body
  const { id, id_role, aktif } = await request.json();
  console.log(id, id_role, aktif);
  if (!id || !id_role || aktif == null) {
    return NextResponse.json({
      status: 400,
      success: false,
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
      status: 500,
      success: true,
      message: "Internal Server Error",
    });
  }

  return NextResponse.json({
    success: true,
    message: "update user success",
  });
}
