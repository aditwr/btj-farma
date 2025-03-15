export interface Role {
  id: number;
  role: string;
}

export interface User {
  id: string;
  email: string;
  aktif: boolean;
  id_role: number;
  created_at: string;
  updated_at: string;
}
