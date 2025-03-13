import { createClient } from "../supabase/server";

export async function getCurrentUserPermission(): Promise<string[]> {
  interface PermissionObj {
    permission: string;
  }

  interface RolePermission {
    permissions: PermissionObj;
  }

  interface Roles {
    role: string;
    role_permissions: RolePermission[];
  }

  interface Data {
    roles: Roles;
  }

  const supabase = await createClient();
  // get the public.users id
  const {
    data: { user },
    error: errorFetchUser,
  } = await supabase.auth.getUser();

  if (errorFetchUser) {
    console.log("/dashboard/admin/verifikasi error: ", errorFetchUser);
    return [];
  }

  const userId = user?.id;

  // access all permission belongs to user with query join
  const { data, error } = await supabase
    .from("users")
    .select(
      `
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
    .eq("id", userId)
    .single();

  if (error) {
    console.log("/dashboard/admin/verifikasi error: ", error);
    return [];
  }

  function extractPermissions(data: Data): string[] {
    // Mengambil setiap permission dari array role_permissions
    return data.roles.role_permissions.map(
      (item) => item.permissions.permission
    );
  }

  const permissionsArray: string[] = extractPermissions(data);

  return permissionsArray;
}

export async function canAccess(permissionRequired: string[]) {
  const permissionsArray = await getCurrentUserPermission();

  //   check, user must have some of the required permissions
  return permissionRequired.some((permission) =>
    permissionsArray.includes(permission)
  );
}
