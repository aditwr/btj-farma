import DahsboardContentMenu from '@/components/dashboard/DashboardContentMenu'
import React from 'react'
import { menuItems } from "@/config/dashboard/report/sales/config";

function DashboardReportLayoutPage({ children }: { children: React.ReactNode }) {
  return (
      <div className="">
          <div className="">
              <DahsboardContentMenu menuItems={menuItems} />
            </div>
          <div className="">{children}</div>
    </div>
  )
}

export default DashboardReportLayoutPage
