import DashboardLayout from "@/components/layout/DashboardLayout";
import React from "react";

function DashboardLayoutPage({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

export default DashboardLayoutPage;
