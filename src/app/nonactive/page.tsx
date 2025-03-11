"use client";
import { Button } from "antd";
import { logout } from "../(auth)/auth/actions";

export default function NonActivePage() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="">
        <div className="text-xl font-semibold mb-3">Akunmu tidak aktif</div>
        <div className="text-base font-medium mb-4">
          Silahkan hubungi admin untuk mengaktifkan akun mu
        </div>
        <div className="space-x-2">
          <Button type="primary" onClick={() => window.location.reload()}>
            Refresh
          </Button>
          <Button onClick={() => logout()} type="primary" danger>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
