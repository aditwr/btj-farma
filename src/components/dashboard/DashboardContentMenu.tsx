'use client'
import React, { useState } from "react";
import { Menu, MenuProps } from "antd";
import { menuItems } from "@/config/dashboard/report/sales/config";
import { useRouter } from "next/navigation";



const DahsboardContentMenu: React.FC = () => {
  const [current, setCurrent] = useState("mail");
  const router = useRouter();

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    router.push(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={menuItems}
    />
  );
};

export default DahsboardContentMenu;
