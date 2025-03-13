"use client";
import { getUserInfo } from "@/store/dashboard/userInfoSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { useEffect } from "react";

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return <>{children}</>;
}
