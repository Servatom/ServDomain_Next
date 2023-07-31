"use client";

import { Skeleton } from "@/components/ui/skeleton";
import AuthContext from "@/store/auth-context";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Logout() {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      router.replace("/");
    }
    authCtx.logout();
    router.replace("/");
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-4 flex-col gap-4">
      <Skeleton className="h-10 absolute left-12 top-12 md:w-[300px] opacity-50" />
      <Skeleton className="h-56 md:w-[40vw] opacity-40" />
      <div className="space-y-2">
        <Skeleton className="h-12 md:w-[40vw] opacity-50" />
      </div>
    </div>
  );
}
