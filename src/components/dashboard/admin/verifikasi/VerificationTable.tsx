import { Tabs } from "antd";
import type { TabsProps } from "antd";
import InActiveUser from "./InActiveUser";
import ActiveUser from "./ActiveUser";

export type User = {
  email: string;
  aktif: boolean;
  [key: string]: any;
};

export default function VerificationTable({
  activeUsers,
  inactiveUsers,
  roles,
  setRefresh,
}: {
  activeUsers: User[];
  inactiveUsers: User[];
  roles: { id: number; role: string }[] | undefined;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
    //
  };

  return (
    <div className="">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}
