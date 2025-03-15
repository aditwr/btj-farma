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
  const { data: roles, error: errorFetchRoles } = await supabase
    .from("roles")
    .select("*");

  if (errorFetchRoles) {
    console.log(
      "/api/database/roles | error fetch roles : ",
      errorFetchRoles
    );
    return NextResponse.json({
      status: "error",
      code: 500,
      message: "Internal Server Error",
    });
  }

  return NextResponse.json({
    status: "success",
    message: "Fetch roles data success",
    data: {
      roles: roles,
    },
  });
}
