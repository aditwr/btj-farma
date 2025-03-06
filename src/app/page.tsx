"use client";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { logout } from "./(auth)/auth/actions";
import { User } from "@supabase/supabase-js";
import { createClient as _createClient } from "@supabase/supabase-js";
import { useSupabaseOnClient } from "@/hooks/useSupabaseOnClient";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const supabase = useSupabaseOnClient();

  useEffect(() => {
    async function getUser(instance = supabase) {
      const {
        data: { user },
      } = await instance.auth.getUser();
      return user;
    }
    getUser().then((user) => {
      if (user !== null) setUser(user);
    });

    console.log("User : ", user)
  }, [supabase]);

  // get pg_jenis_outlet data
  useEffect(() => {
    async function getData() {
      const supabaseUrl = process.env.NEXT_PUBLIC_AMP_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_AMP_SUPABASE_ANON_KEY;
      if (supabaseUrl && supabaseKey) {
        const supabase = _createClient(supabaseUrl, supabaseKey);
        const { data: pg_jenis_outlet } = await supabase
          .from("pg_penjualan_btj_view")
          .select("*");
        return pg_jenis_outlet;
      } else {
        console.error("Supabase URL or Key is not defined");
        return null;
      }
    }
    getData().then(res=> console.log(res))
  }, [])

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
