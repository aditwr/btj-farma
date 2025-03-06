import {
  DashboardOutlined,
  FileDoneOutlined,
  SettingOutlined,
} from "@ant-design/icons";

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
