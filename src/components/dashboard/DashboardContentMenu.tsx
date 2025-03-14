'use client'
import React, { useState } from "react";
import { Menu, MenuProps } from "antd";
import { usePathname, useRouter } from "next/navigation";



const DahsboardContentMenu = ({ menuItems }: { menuItems: MenuProps["items"]}) => {
  const pathname = usePathname();
  const [current, setCurrent] = useState(pathname.toString());
  const router = useRouter();

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    router.push(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      defaultSelectedKeys={['/dashboard/administrator/rolepermission/role']}
      selectedKeys={[current]}
      mode="horizontal"
      items={menuItems}
    />
  );
};

export default DahsboardContentMenu;
