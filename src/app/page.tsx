"use client";
import { Button } from "antd";
import TestSidebar from "@/components/dashboard/TestSidebar";

export default function Home() {
  return (
    <div>
      <TestSidebar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Button type="primary">Button</Button>
      </main>
    </div>
  );
}
