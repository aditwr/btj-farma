import { Tabs } from "antd";
import type { TabsProps } from "antd";
import InActiveUser from "./InActiveUser";
import ActiveUser from "./ActiveUser";
import { Role, User } from "@/types/database";
import { useQueryClient } from "@tanstack/react-query";

export default function AccountVerification({
  activeUsers,
  inactiveUsers,
  roles,
  setRefresh,
}: {
  activeUsers: User[];
  inactiveUsers: User[];
  roles: Role[] | undefined;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const items: TabsProps["items"] = [
    {
      key: "inactiveUsers",
      label: "Inactive Users",
      children: (
        <InActiveUser
          inactiveUsers={inactiveUsers}
          roles={roles}
          setRefresh={setRefresh}
        />
      ),
    },
    {
      key: "activeUsers",
      label: "Active Users",
      children: (
        <ActiveUser
          activeUsers={activeUsers}
          roles={roles}
          setRefresh={setRefresh}
        />
      ),
    },
  ];

  const onChange = (key: string) => {
    queryClient.invalidateQueries({
      queryKey: ["users"],
    });
  };

  return (
    <div className="">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}
