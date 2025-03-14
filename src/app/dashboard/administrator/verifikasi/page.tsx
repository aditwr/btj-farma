"use client";
import VerificationTable from "@/components/dashboard/administrator/verifikasi/VerificationTable";
import { LoadingTopLevel } from "@/components/ui/Loading";
import axios from "axios";
import { Suspense, useEffect, useState } from "react";

type User = {
  email: string;
  aktif: boolean;
  [key: string]: any;
};

const getAllUsers = async () => {
  try {
    const res = await axios.get("/api/dashboard/administrator/verifikasi");
    return res.data;
  } catch (error) {
    console.log("client: /dashboard/administrator/verifikasi error: ", error);
  }
};
function separateUsers(users: User[]) {
  const activeUsers = users.filter((user) => user.aktif === true);
  const inactiveUsers = users.filter((user) => user.aktif === false);

  return { activeUsers, inactiveUsers };
}

export default function NewAccountVerificationPage() {
  const [nonActiveUsers, setNonActiveUsers] = useState<User[]>([]);
  const [activeUsers, setActiveUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<{ id: number; role: string }[]>();
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    getAllUsers().then((res) => {
      if (res?.success) {
        const users = res?.data?.users;
        const roles = res?.data?.roles;
        const { activeUsers, inactiveUsers } = separateUsers(users);
        setNonActiveUsers(inactiveUsers);
        setActiveUsers(activeUsers);
        setRoles(roles);
      }
    });
  }, [refresh]);
  return (
    <div className="">
      <div className="text-base font-semibold">Manage Active Users</div>
      <div className="">
        <Suspense fallback={<LoadingTopLevel />}>
          <VerificationTable
            activeUsers={activeUsers}
            inactiveUsers={nonActiveUsers}
            roles={roles}
            setRefresh={setRefresh}
          />
        </Suspense>
      </div>
    </div>
  );
}
