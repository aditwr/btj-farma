interface Role {
  id: number;
  role: string;
}

interface DataSourceItem {
  key: string;
  no: string;
  role: string;
}

export function convertRolesToDataSource(roles: Role[]): DataSourceItem[] {
  return roles.map((item, index) => ({
    key: String(index + 1),
    no: String(index + 1),
    role: item.role,
    action: item,
  }));
}
