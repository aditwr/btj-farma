export function canView(
  user_permission: string[],
  permissionRequired: string[]
) {
  return user_permission.some((permission) => {
    permissionRequired.includes(permission);
  });
}
