import { theme } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";

function DashboardLayoutContent({
  children,
  collapsed,
}: {
  children: React.ReactNode;
  collapsed: boolean;
}) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div>
      <Content
        style={{
          transition: "margin-left 0.2s",
          padding: 24,
          minHeight: "90vh",
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
        className={`transition-all duration-200 ease-in-out mt-[64px] ml-0 ${
          collapsed ? "lg:ml-[92px]" : "lg:ml-[212px]"
        }`}
      >
        {children}
      </Content>
    </div>
  );
}

export default DashboardLayoutContent;
