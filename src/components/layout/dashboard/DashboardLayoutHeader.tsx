import React from "react";
import { theme, Button } from "antd";
import { Header } from "antd/es/layout/layout";
import {
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import HeaderProfileMenu from "./header/HeaderProfileMenu";
import HeaderContent from "./header/HeaderContent";


function DashboardLayoutHeader({
  collapsed,
  setCollapsed,
  smallScreenWidth,
  openSidebarInSmallScreen,
  setOpenSidebarInSmallScreen,
}: {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  smallScreenWidth: boolean;
  openSidebarInSmallScreen: boolean;
  setOpenSidebarInSmallScreen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div>
      <Header
        style={{
          padding: 0,
          height: "48px",
          position: "fixed",
          display: "block",
          left: 0,
          right: 0,
          background: colorBgContainer,
        }}
        className={`${
          collapsed ? "lg:ml-[80px]" : "lg:ml-[200px]"
        } transition-all duration-200 ease-in-out ml-0`}
      >
        <div className=" h-full ">
          {smallScreenWidth ? (
            <Button
              type="link"
              style={{
                top: 0,
                position: "absolute",
                width: 48,
                height: 48,
                zIndex: 99,
              }}
              className="hover:bg-neutral-100"
              icon={<MenuOutlined />}
              onClick={() =>
                setOpenSidebarInSmallScreen(!openSidebarInSmallScreen)
              }
            />
          ) : (
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={
                !smallScreenWidth ? () => setCollapsed(!collapsed) : undefined
              }
              style={{
                top: 0,
                position: "absolute",
                width: 48,
                height: 48,
              }}
              className=""
            />
          )}
          <HeaderContent />
        </div>
      </Header>
    </div>
  );
}

export default DashboardLayoutHeader;
