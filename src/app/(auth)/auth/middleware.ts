import { unAuthRoutes } from "@/config/config";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function checkAuth(req: NextRequest) {
  const url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;

  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  // Cek akses url, sesuai status login
  if (authUser && unAuthRoutes.includes(pathname)) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  } else if (
    !authUser &&
    !unAuthRoutes.includes(pathname) &&
    pathname !== "/"
  ) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (authUser) {
    // Jika user login, ambil role
    const userId = authUser?.id;
    const { data: user, error: errorFetchUser } = await supabase
      .from("users")
      .select(
        `
        *,
        roles (role)
        `
      )
      .eq("id", userId)
      .single();

    if (errorFetchUser) {
      return NextResponse.json({
        status: 501,
        error: errorFetchUser,
        message: "middleware error fetch user with (roles)",
      });
    }

    if (user) {
      if (user) {
        // Jika user tidak aktif, redirect ke halaman nonactive
        if (user.aktif === false && pathname !== "/nonactive") {
          url.pathname = "/nonactive";
          return NextResponse.redirect(url);
        }
      }
    }

    const userRole = user?.roles?.role;

    if (userRole != "superuser") {
      // Cek permission untuk route /keuangan
      if (pathname.startsWith("/dashboard/keuangan")) {
        if (userRole != "staff.keuangan") {
          url.pathname = "/error/forbidden";
          return NextResponse.redirect(url);
        }
      }

      // Cek permission untuk route /administrasi
      if (pathname.startsWith("/dashboard/administrasi")) {
        if (userRole != "staff.administrasi") {
          url.pathname = "/error/forbidden";
          return NextResponse.redirect(url);
        }
      }

      // Cek permission untuk route /hr
      if (pathname.startsWith("/dashboard/hr")) {
        if (userRole != "staff.hr") {
          url.pathname = "/error/forbidden";
          return NextResponse.redirect(url);
        }
      }
    }
  }
}
