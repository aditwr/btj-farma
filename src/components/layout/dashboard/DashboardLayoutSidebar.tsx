import { Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { dashboardSidebarMenu } from "@/config/dashboard/config";
import { MenuProps } from "antd";
import { usePathname } from "next/navigation";
import { canView } from "@/utils/dashboard/client";
import { useAppSelector } from "@/store/hooks/hooks";
import store from "@/store/store";

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const getLevelKeys = (menuItems: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(menuItems);
  return key;
};

const levelKeys = getLevelKeys(dashboardSidebarMenu as LevelKeysProps[]);

function DashboardLayoutSidebar({
  collapsed,
  smallScreenWidth,
  openSidebarInSmallScreen,
  handleMenuClick,
}: {
  collapsed: boolean;
  smallScreenWidth: boolean;
  openSidebarInSmallScreen: boolean;
  currentPath: string;
  handleMenuClick: (e: { key: string }) => void;
}) {
  const pathname = usePathname();
  const [stateOpenKeys, setStateOpenKeys] = useState([pathname]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { user_permissions } = useAppSelector((state) => state.user);

  const onOpenChange: MenuProps["onOpenChange"] = (openKeys) => {
    const currentOpenKey = openKeys.find(
      (key) => stateOpenKeys.indexOf(key) === -1
    );
    // open
    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          // remove repeat key
          .filter((_, index) => index !== repeatIndex)
          // remove current level all child
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey])
      );
    } else {
      // close
      setStateOpenKeys(openKeys);
    }
  };

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
        defaultSelectedKeys={stateOpenKeys}
        openKeys={stateOpenKeys}
        onOpenChange={onOpenChange}
        onClick={handleMenuClick}
        style={{ height: "100%" }}
        items={dashboardSidebarMenu}
      />
    </Sider>
  );
}

export default DashboardLayoutSidebar;
