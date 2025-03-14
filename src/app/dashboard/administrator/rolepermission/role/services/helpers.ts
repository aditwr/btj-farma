import { formatDate } from "@/helpers";

interface Role {
  id: number;
  role: string;
  created_at: string;
}

interface DataType {
  key: string;
  no: string;
  role: string;
  created_at: string;
}

export function convertRolesToDataSource(roles: Role[]): DataType[] {
  return roles.map((item, index) => ({
    key: String(index + 1),
    no: String(index + 1),
    role: item.role,
    created_at: formatDate(item.created_at),
    action: item,
  }));
}
