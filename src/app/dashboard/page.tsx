"use client";
import { useSupabaseOnClient } from "@/hooks/useSupabaseOnClient";
import { useEffect } from "react";

export default function DashboardPage() {
  const supabase = useSupabaseOnClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      console.log(user);
    });
  }, [])
  return (
    <div>
      <div className="">This is Dashboard</div>
    </div>
  );
}
