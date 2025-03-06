import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import React from "react";

function DashboardLayoutPage({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

export default DashboardLayoutPage;
