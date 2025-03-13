import {
  DashboardOutlined,
  DollarOutlined,
  FileDoneOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { logout } from "@/app/(auth)/auth/actions";
import { clearUser } from "@/store/dashboard/userInfoSlice";

export const dashboardSidebarMenu = [
  {
    key: "/dashboard",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "/dashboard/keuangan",
    icon: <DollarOutlined />,
    label: "Keuangan",
    children: [
      {
        key: "/dashboard/keuangan/penjualan",
        label: "Penjualan",
      },
    ],
  },
  {
    key: "/dashboard/administrasi",
    icon: <DollarOutlined />,
    label: "Administrasi",
  },
  {
    key: "/dashboard/hr",
    icon: <DollarOutlined />,
    label: "HR",
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
    key: "/dashboard/administrator",
    icon: <FileDoneOutlined />,
    label: "Administrator",
    children: [
      {
        key: "/dashboard/administrator/verifikasi",
        label: "Manage Akun",
      },
    ],
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
    onClick: () => {
      // clear user
      clearUser();
      // logout
      logout();
    },
  },
];
