"use client";
import AccountVerification from "./components/AccountVerification";
import { LoadingTopLevel } from "@/components/ui/Loading";
import { useEffect, useState } from "react";

export default function AccountVerificationPage() {
  return (
    <div className="">
      <div className="text-base font-semibold">Manage Active Users</div>
      <div className="">
        <AccountVerification />
      </div>
    </div>
  );
}
