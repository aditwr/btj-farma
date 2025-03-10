'use client'
import { getUser } from "@/store/dashboard/userSlice";
import { useAppDispatch } from "@/store/hooks/hooks";
import { useEffect } from "react";

export default function UserProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    useEffect(() => {
      dispatch(getUser());
    }, []);
    
    return <>{children}</>;
}