interface Role {
  id: number;
  role: string;
  created_at: Date;
}

interface DataType {
  key: string;
  no: string;
  role: string;
  created_at: Date;
}

export function convertRolesToDataSource(roles: Role[]): DataType[] {
  return roles.map((item, index) => ({
    key: String(index + 1),
    no: String(index + 1),
    role: item.role,
    created_at: item.created_at,
    action: item,
  }));
}
