"use client";

import { createClient } from "@/utils/supabase/client";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { logout } from "./(auth)/auth/actions";
import { User } from "@supabase/supabase-js";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    async function getUser() {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    }
    getUser().then((user) => {
      console.log(user);
      if (user !== null) setUser(user);
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl">Hello, {user?.email}</h1>
      <Button type="primary">Button</Button>
      <Button onClick={() => logout()} type="primary" color="danger">
        Logout
      </Button>
    </main>
  );
}
