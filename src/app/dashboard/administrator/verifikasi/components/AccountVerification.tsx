import { Tabs } from "antd";
import type { TabsProps } from "antd";
import InActiveUser from "./InActiveUser";
import ActiveUser from "./ActiveUser";
import { Role, User } from "@/types/database";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { APIResponse } from "@/types/types";
import { LoadingTopLevel } from "@/components/ui/Loading";
import { getAllRoles } from "@/utils/supabase/utils";

export default function AccountVerification() {
  const [roles, setRoles] = useState<{ id: number; role: string }[]>();
  const [activeTab, setActiveTab] = useState<string>("inactiveUsers");

  const queryClient = useQueryClient();

  const queryRoles = useQuery({
    queryKey: ["roles"],
    queryFn: getAllRoles,
  });

  useEffect(() => {
    const APIResponse: APIResponse<{ roles: Role[] } | null> = queryRoles.data;
    if (queryRoles.isSuccess && queryRoles.data) {
      if (APIResponse.status == "success" && APIResponse.data) {
        setRoles(APIResponse.data.roles);
      }
    }
  }, [queryRoles.data, queryRoles.isSuccess]);

  if (queryRoles.isLoading) return <LoadingTopLevel />;
  if (queryRoles.isError) return <div>Internal Server Error</div>;


  const items: TabsProps["items"] = [
    {
      key: "inactiveUsers",
      label: "Inactive Users",
      children: <>{activeTab == "inactiveUsers" && <InActiveUser roles={roles} />}</>,
    },
    {
      key: "activeUsers",
      label: "Active Users",
      // children: (
      //   <ActiveUser
      //     roles={roles}
      //   />
      // ),
    },
  ];

  const onChange = (key: string) => {
    setActiveTab(key)
  };

  return (
    <div className="">
      <Tabs
        activeKey={activeTab}
        items={items}
        onChange={onChange}
      />
    </div>
  );
}
