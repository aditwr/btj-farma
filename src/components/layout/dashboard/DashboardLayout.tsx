"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import DashboardLayoutHeader from "./DashboardLayoutHeader";
import Layout from "antd/es/layout/layout";
import DashboardLayoutContent from "./DashboardLayoutContent";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const currentPath = usePathname();
  const [smallScreenWidth, setSmallScreenWidth] = useState(false);
  const [openSidebarInSmallScreen, setOpenSidebarInSmallScreen] =
    useState(false);

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
      <DashboardLayoutSidebar
        collapsed={collapsed}
        smallScreenWidth={smallScreenWidth}
        openSidebarInSmallScreen={openSidebarInSmallScreen}
        currentPath={currentPath}
        handleMenuClick={handleMenuClick}
      />
      <Layout>
        <DashboardLayoutHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          smallScreenWidth={smallScreenWidth}
          openSidebarInSmallScreen={openSidebarInSmallScreen}
          setOpenSidebarInSmallScreen={setOpenSidebarInSmallScreen}
        />
        <DashboardLayoutContent collapsed={collapsed}>
          {children}
        </DashboardLayoutContent>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
