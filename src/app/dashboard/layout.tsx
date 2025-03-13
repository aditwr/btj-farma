import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import UserInfoProvider from "@/components/providers/UserInfoProvider";

function DashboardLayoutPage({ children }: { children: React.ReactNode }) {
  return (
    <UserInfoProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </UserInfoProvider>
  );
}

export default DashboardLayoutPage;
