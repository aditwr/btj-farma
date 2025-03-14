import { createClient } from "../supabase/server";

export async function getCurrentUserPermission(): Promise<string[]> {
  type RolePermissionReturnedData = {
    roles: {
      role: any;
      role_permissions: {
        permissions: {
          permission: any;
        };
      }[];
    };
  } | null;

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
  const { data, error }: { data: RolePermissionReturnedData; error: any } =
    await supabase
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

  function extractPermissions(data: RolePermissionReturnedData): string[] {
    // Mengambil setiap permission dari array role_permissions
    if (data) {
      return data.roles.role_permissions.map(
        (item) => item.permissions.permission
      );
    }
    return [];
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
