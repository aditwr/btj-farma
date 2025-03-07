import DahsboardContentMenu from '@/components/dashboard/DashboardContentMenu'
import React from 'react'

function DashboardReportLayoutPage({ children }: { children: React.ReactNode }) {
  return (
      <div className="">
          <div className="">
              <DahsboardContentMenu />
            </div>
          <div className="">{children}</div>
    </div>
  )
}

export default DashboardReportLayoutPage
