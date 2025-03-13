"use client";
import React, { useEffect, useState } from "react";
import { Dropdown, Space, Avatar } from "antd";
import { CaretDownOutlined, UserOutlined } from "@ant-design/icons";
import { profileMenu as _profileMenu } from "@/config/dashboard/config";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import type { MenuProps } from "antd";
import { useAppSelector } from "@/store/hooks/hooks";
function HeaderProfileMenu() {
  const [profileMenu, setProfileMenu] =
    useState<MenuProps["items"]>(_profileMenu);
  const { user, user_role } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (user !== null) {
      const userEmail = {
        key: "/user_email",
        label: user?.email,
      };
      const userRole = {
        key: "/user_role",
        label: user_role,
      };
      // destructure the array of menu props, put userEmail in first item
      const updatedProfileMenu = _profileMenu ? [..._profileMenu] : [];
      updatedProfileMenu.unshift(userRole);
      updatedProfileMenu.unshift(userEmail);
      setProfileMenu(updatedProfileMenu);
    }
  }, [user]);

  return (
    <div className="">
      <Dropdown menu={{ items: profileMenu }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Avatar
              style={{
                backgroundColor: "#00bd7d",
                width: 24,
                height: 24,
                padding: "10px",
              }}
              icon={<UserOutlined />}
            />
            <CaretDownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}

export default HeaderProfileMenu;
