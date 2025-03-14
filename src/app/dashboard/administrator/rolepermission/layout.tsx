import DahsboardContentMenu from '@/components/dashboard/DashboardContentMenu'
import { MenuItem } from '@/types/antd'
import { CheckCircleOutlined } from '@ant-design/icons'
import React from 'react'

const menuItems: MenuItem[] = [
    {
      label: 'Manage Role',
      key: '/dashboard/administrator/rolepermission/role',
      icon: <CheckCircleOutlined />,
    },
    {
      label: 'Manage Permission',
      key: '/dashboard/administrator/rolepermission/permission',
      icon: <CheckCircleOutlined />,
    },
]

function DashboardRolePermissionLayoutPage({ children }: { children: React.ReactNode }) {
  return (
      <div className="">
          <div className="">
              <DahsboardContentMenu menuItems={menuItems} />
            </div>
          <div className="mt-3">{children}</div>
    </div>
  )
}

export default DashboardRolePermissionLayoutPage
