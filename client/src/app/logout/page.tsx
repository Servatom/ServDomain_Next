"use client";

import AuthContext from "@/store/auth-context";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Logout() {
  const authCtx = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!authCtx.isLoggedIn) return;

    authCtx.logout();
  }, [authCtx]);

  return <>{router.push("/")}</>;
}
