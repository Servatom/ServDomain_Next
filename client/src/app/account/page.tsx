"use client";

import RecordsTable from "@/components/RecordTable/RecordTable";
import Button from "@/components/common/Button";
import Loader from "@/components/common/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import AuthContext from "@/store/auth-context";
import { ArrowRight, Pencil } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense, useContext, useEffect, useState } from "react";

const Account = () => {
  const [hydrated, setHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  const handleManageSubscriptions = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/account/manage-subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.url) {
        router.push(data.url);
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error: any) {
      console.error(error);
      toast({
        title: error,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };
  return (
    <div className="w-full h-full flex flex-col items-center p-16 max-w-7xl mx-auto">
      <Avatar className="w-24 h-24 mt-8">
        <AvatarImage
          src={`https://api.dicebear.com/7.x/identicon/svg?seed=${authCtx.user?.firebaseUID}`}
        />
        <AvatarFallback>PFP</AvatarFallback>
      </Avatar>
      <div className="flex flex-row items-center justify-center gap-4 pt-8 pb-2">
        <h1 className="text-xl font-medium ">{authCtx.user?.phoneNumber}</h1>
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
      {authCtx.user?.email ? (
        <span className="text-gray-400 text-sm flex flex-row items-center gap-2">
          {authCtx.user.email}
          <div className="p-2 cursor-pointer hover:bg-slate-300 hover:bg-opacity-20 rounded-md">
            <Link href={"/account/complete-profile"}>
              <Pencil size={16} />
            </Link>
          </div>
        </span>
      ) : (
        <span className="text-yellow-400 text-sm flex flex-row items-center gap-1">
          Please update your email ASAP{" "}
          <Link
            href={"/account/complete-profile"}
            className="flex flex-row gap-1 items-center hover:underline hover:underline-offset-4"
          >
            here <ArrowRight size={16} />
          </Link>
        </span>
      )}
      <div className="flex flex-row justify-between items-start w-full mt-20 px-8">
        <p className="flex-grow pr-8">
          Your payments and subscriptions can be managed via Stripe Customer
          Portal. All your payments are processed by Stripe and we do not store
          any of your payment card information.
        </p>
        <div>
          <Button className="w-max" onClick={handleManageSubscriptions}>
            {isLoading && <Loader className="mr-3" size={14} />}
            Manage Subscriptions
          </Button>
        </div>
      </div>
      <div className="mt-16 w-full">
        <h1 className="text-xl font-medium text-center">Your Records</h1>
        {/* <RecordsTable allowActions /> */}
        <Suspense>
          <RecordsTable />
        </Suspense>
      </div>
      <span className="text-xs pb-8 text-gray-400">
        It may take 2-3 days to resolve payments and set subdomain status as
        active. Expiry date is set with respect to date of activation of the
        record. Subscriptions can be renewed manually in case auto-deduct fails,
        within 5 days after expiry. The subdomain will remain usable for the
        buffer of 5 days. Post 5 days, the subdomain will be terminated on
        failure of renewal of the subscription. Check out the cancellation
        policy on the{" "}
        <a href="/tnc" className="text-pink-500 underline underline-offset-4">
          Terms and Conditions
        </a>{" "}
        page.
      </span>
    </div>
  );
};

export default Account;
