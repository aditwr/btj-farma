"use client";
import { Button } from "antd";
import { logout } from "@/app/(auth)/auth/actions";

export default function DashboardPage() {
  return (
    <div>
      <div className="">This is Dashboard</div>
      <Button onClick={() => logout()} danger={true} type="primary">
        Logout
      </Button>
    </div>
  );
}
