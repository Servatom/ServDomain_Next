"use client";

import RecordsTable from "@/components/RecordTable/RecordTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AuthContext from "@/store/auth-context";
import { useRouter } from "next/navigation";
import { Suspense, useContext } from "react";

const Account = () => {
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  return (
    <div className="w-full h-full flex flex-col items-center p-16">
      <Avatar className="w-24 h-24 mt-12">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-row items-center justify-center gap-4 py-8">
        <h1 className="text-2xl font-medium">{authCtx.user?.phoneNumber}</h1>
        <span>|</span>
        <span
          className="cursor-pointer hover:underline underline-offset-4"
          onClick={() => {
            router.push("/logout");
          }}
        >
          Log Out
        </span>
      </div>
      <div className="mt-20 w-full">
        <h1 className="text-xl font-medium text-center">Your Records</h1>
        {/* <RecordsTable allowActions /> */}
        <Suspense>
          <RecordsTable />
        </Suspense>
      </div>
    </div>
  );
};

export default Account;
