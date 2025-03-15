"use client";
import AccountVerification from "./components/AccountVerification";
import { LoadingTopLevel } from "@/components/ui/Loading";
import { useEffect, useState } from "react";
import { getRoles, getUsers } from "./services";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { APIResponse } from "@/types/types";
import { Role, User } from "@/types/database";

function separateUsers(users: User[]) {
  const activeUsers = users.filter((user) => user.aktif === true);
  const inactiveUsers = users.filter((user) => user.aktif === false);

  return { activeUsers, inactiveUsers };
}

export default function AccountVerificationPage() {
  const [nonActiveUsers, setNonActiveUsers] = useState<User[]>([]);
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<{ id: number; role: string }[]>();
  const [refresh, setRefresh] = useState(false);

  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const queryRoles = useQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
  });

  const APIResponse: APIResponse<{ users: User[] } | null> = query.data;

  useEffect(() => {
    const APIResponse: APIResponse<{ users: User[] } | null> = query.data;
    if (query.isSuccess && query.data) {
      if (APIResponse.status == "success" && APIResponse.data) {
        const activeUsers = APIResponse.data.users.filter(
          (user) => user.aktif === true
        );
        const nonActiveUsers = APIResponse.data.users.filter(
          (user) => user.aktif === false
        );
        setActiveUsers(activeUsers);
        setNonActiveUsers(nonActiveUsers);
      }
    }
  }, [query.data, query.isSuccess]);

  useEffect(() => {
    const APIResponse: APIResponse<{ roles: Role[] } | null> = queryRoles.data;
    if (queryRoles.isSuccess && queryRoles.data) {
      if (APIResponse.status == "success" && APIResponse.data) {
        setRoles(APIResponse.data.roles);
      }
    }
  }, [queryRoles.data, queryRoles.isSuccess]);

  if (query.isLoading) return <LoadingTopLevel />;
  if (query.isError) return <div>Internal Server Error</div>;

  return (
    <div className="">
      <div className="text-base font-semibold">Manage Active Users</div>
      <div className="">
        <AccountVerification
          activeUsers={activeUsers}
          inactiveUsers={nonActiveUsers}
          roles={roles}
          setRefresh={setRefresh}
        />
      </div>
    </div>
  );
}
