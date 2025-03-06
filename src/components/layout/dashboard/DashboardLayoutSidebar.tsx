import { Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import Image from "next/image";
import { dashboardSidebarMenu } from "@/config/dashboard/config";

function DashboardLayoutSidebar({
  collapsed,
  smallScreenWidth,
  openSidebarInSmallScreen,
  currentPath,
  handleMenuClick,
}: {
  collapsed: boolean;
  smallScreenWidth: boolean;
  openSidebarInSmallScreen: boolean;
  currentPath: string;
  handleMenuClick: (e: { key: string }) => void;
}) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Sider
      id="sidebar"
      trigger={null}
      style={{
        position: "fixed",
        height: "100vh",
        zIndex: 80,
        background: colorBgContainer,
      }}
      className={`absolute top-0 ${
        openSidebarInSmallScreen || !smallScreenWidth
          ? " left-0 "
          : "-left-[100%]"
      }`}
      collapsible
      collapsed={collapsed}
    >
      <div className="h-16 border-r-[1px] border-neutral-200 flex justify-center items-center gap-x-2">
        <div className="w-6 h-6 rounded-full bg-emerald-500 border-neutral-800">
          <Image src="/btj-farma-logo.png" alt="logo" width={24} height={24} />
        </div>
        <span
          className={`text-md font-medium text-emerald-700 transition-all duration-200 overflow-hidden ${
            collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
          }`}
        >
          BTJ FARMA
        </span>
      </div>
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[currentPath || "/dashboard"]} // Use selectedKeys instead of defaultSelectedKeys
        onClick={handleMenuClick}
        style={{ height: "100%" }}
        items={dashboardSidebarMenu}
      />
    </Sider>
  );
}

export default DashboardLayoutSidebar;
