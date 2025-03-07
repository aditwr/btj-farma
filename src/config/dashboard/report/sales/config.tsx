import { AppstoreOutlined, LineChartOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

export const menuItems: MenuItem[] = [
  {
    label: "Trends",
    key: "/",
    icon: <LineChartOutlined />,
    children: [
      {
        key: "/general-trends",
        label: "General Trend",
      },
      {
        key: "/product-trends",
        label: "Product Trend",
        children: [
          { label: "Option 3", key: "setting:3" },
          { label: "Option 4", key: "setting:4" },
        ],
      },
    ],
  },
  {
    label: "Navigation Two",
    key: "app",
    icon: <AppstoreOutlined />,
  },
];
