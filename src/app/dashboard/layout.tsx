import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import UserProvider from "@/components/providers/UserProvider";

function DashboardLayoutPage({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </UserProvider>
  );
}

export default DashboardLayoutPage;
