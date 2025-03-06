'use client'
import React, { useEffect, useState } from 'react'
import { Dropdown, Space, Avatar } from "antd";
import { CaretDownOutlined, UserOutlined } from '@ant-design/icons';
import { profileMenu as _profileMenu } from "@/config/dashboard/config";
import { createClient } from "@/utils/supabase/client";
import { User } from '@supabase/supabase-js';
import type { MenuProps } from "antd";
function HeaderProfileMenu() {
  const [user, setUser] = useState<User | null>(null);
  const [profileMenu, setProfileMenu] = useState<MenuProps["items"]>(_profileMenu);
  useEffect(() => {
    async function getUser() {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    }
    getUser().then((user) => {
      if (user !== null) setUser(user);
    });
  }, []);

  useEffect(() => {
    if (user !== null) {
      const userInfoItem = {
        key: "/userInfo",
        label: user?.email,
      };
      // destructure the array of menu props, put userInfoItem in first item
      const updatedProfileMenu = _profileMenu ? [..._profileMenu] : [];
      updatedProfileMenu.unshift(userInfoItem);
      setProfileMenu(updatedProfileMenu);
    }
  }, [user]);

  return (
    <div className="">
      <Dropdown menu={{ items: profileMenu }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Avatar
              style={{ backgroundColor: "#00bd7d", width: 24, height: 24, padding: "10px" }}
              icon={<UserOutlined />}
            />
            <CaretDownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}

export default HeaderProfileMenu
