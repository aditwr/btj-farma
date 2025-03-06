"use client";
import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useRouter, usePathname } from "next/navigation";
import { dashboardSidebarMenu } from "@/config/dashboard/config";

const { Header, Sider, Content } = Layout;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const currentPath = usePathname();
  const [smallScreenWidth, setSmallScreenWidth] = useState(false);
  const [openSidebarInSmallScreen, setOpenSidebarInSmallScreen] =
    useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e: { key: string }) => {
    router.push(e.key);
  };

  const checkScreenSize = () => {
    const width = window.innerWidth;
    if (width < 1024) {
      setSmallScreenWidth(true);
      setCollapsed(false);
    } else {
      setSmallScreenWidth(false);
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      openSidebarInSmallScreen &&
      !document.getElementById("sidebar")?.contains(e.target as Node)
    ) {
      setOpenSidebarInSmallScreen(false);
    }
  };

  useEffect(() => {
    if (openSidebarInSmallScreen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openSidebarInSmallScreen]);

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
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
          <div className="w-6 h-6 rounded-full bg-emerald-500 border-neutral-800"></div>
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
      <Layout>
        <Header
          style={{
            padding: 0,
            height: "48px",
            position: "fixed",
            display: "block",
            width: "100%",
            background: colorBgContainer,
          }}
          className={`${
            collapsed ? "lg:ml-[80px]" : "lg:ml-[200px]"
          } transition-all duration-200 ease-in-out ml-0`}
        >
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
        </Header>
        <Content
          style={{
            transition: "margin-left 0.2s",
            padding: 24,
            minHeight: 28000,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
          className={`transition-all duration-200 ease-in-out mt-[64px] ml-0 ${
            collapsed ? "lg:ml-[92px]" : "lg:ml-[212px]"
          }`}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
