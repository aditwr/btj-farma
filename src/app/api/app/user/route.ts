import { createClient } from "@/utils/supabase/server";
import { APIRequestResponse } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse<APIRequestResponse>> {
  const supabase = await createClient();
  const {
    data: { user: authUser },
    error: errorGetAuthUser,
  } = await supabase.auth.getUser();
  const userId = authUser?.id;

  if (errorGetAuthUser) {
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }

  const { data: user, error: errorGetUser } = await supabase
    .from("users")
    .select(
      `*,
        roles:roles (
            role,
            role_permissions (
            permissions:permissions (
                permission
            )
            )
        )
        `
    )
    .eq("id", userId).single();

  if (errorGetUser) {
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }

  return NextResponse.json({
    success: true,
    message: "get user success",
    data: {
      user: user,
      authUser: authUser,
    },
  });
}
