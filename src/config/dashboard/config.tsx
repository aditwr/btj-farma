import {
  DashboardOutlined,
  FileDoneOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { logout } from "@/app/(auth)/auth/actions";

export const dashboardSidebarMenu = [
  {
    key: "/dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "/dashboard/report",
    icon: <FileDoneOutlined />,
    label: "Report",
    children: [
      {
        key: "/dashboard/report/finance",
        label: "Finance",
      },
      {
        key: "/dashboard/report/sales",
        label: "Sales",
      },
      // Add more submenus here
    ],
  },
  {
    key: "/dashboard/setting",
    icon: <SettingOutlined />,
    label: "Setting",
  },
];

export const profileMenu: MenuProps["items"] = [
  {
    type: "divider",
  },
  {
    key: "profile",
    label: "Profile",
    extra: "⌘P",
  },
  {
    key: "billing",
    label: "Billing",
    extra: "⌘B",
  },
  {
    key: "setting",
    label: "Settings",
    icon: <SettingOutlined />,
    extra: "⌘S",
  },
  // add logout option
  {
    key: "logout",
    label: "Logout",
    icon: <LogoutOutlined />,
    style: { background: "#fb2c36", color: "white" },
    onClick: () => logout(),
  },
];

