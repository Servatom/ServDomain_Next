"use client";

import { useGetUserRecords } from "@/api/query/record/query";
import { axiosFrontendInstance } from "@/lib/axios";
import RecordsTable from "@/components/RecordTable/RecordTable";
import Button from "@/components/common/Button";
import Loader from "@/components/common/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import AuthContext from "@/store/auth-context";
import { ArrowRight, Pencil } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useContext, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import AddTXTRecord from "@/components/Plan/AddTXTRecord";
import { TPlanStats } from "@/types/types";
import PlansTable from "@/components/PlanTable/PlansTable";
import { DUMMY_PLANS } from "@/lib/constants";

const Account = () => {
  const [hydrated, setHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [txtRecordOpen, setTxtRecordOpen] = useState(false);
  const query = useSearchParams();
  const recordId = query.get("recordId");
  const paymentStatus = query.get("paymentStatus");
  const { data } = useGetUserRecords();
  const queryClient = useQueryClient();
  const authCtx = useContext(AuthContext);
  const router = useRouter();
  const [recordsQty, setRecordsQty] = useState<TPlanStats>({
    personal: 0,
    vercel: 0,
    annual: 0,
    txt: {
      total: 0,
      used: 0,
    },
  });

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (paymentStatus === "success") {
      queryClient.invalidateQueries(["records", "all"]);
      toast({
        title: "Wuhuu!",
        description: "Your subscription will be active shortly.",
      });
    }
    if (paymentStatus === "cancelled") {
      queryClient.invalidateQueries(["records", "all"]);
      toast({
        title: "Uh Oh :/",
        description: "Payment was not completed. Please try again.",
        variant: "destructive",
      });

      if (!recordId) return;
      // make api req to delete record
      try {
        handleIncompletePayment(recordId);
      } catch (error) {
        console.error(error);
      }
    }

    // remove query params from url

    if (paymentStatus) {
      const url = new URL(window.location.href);
      url.searchParams.delete("paymentStatus");
      url.searchParams.delete("recordId");
      window.history.replaceState({}, "", url.href);
    }
  }, [paymentStatus, recordId, queryClient]);

  useEffect(() => {
    if (!data) return;

    const txtUsed = data.filter((record) => record.type === "TXT").length;
    // get plan wise count from backend

    // const txtTotal = data.filter(
    //   (record) => record.plan === "vercel" || record.plan === "annual"
    // ).length;

    const txtTotal = 0;

    setRecordsQty((prev) => {
      return {
        ...prev,
        txt: {
          total: txtTotal,
          used: txtUsed,
        },
      };
    });
  }, [data]);

  const handleIncompletePayment = async (recordId: string) => {
    const { data, status } = await axiosFrontendInstance.delete(
      `/payment/stripe/create-checkout-session?recordId=${recordId}`
    );
    return { data, status };
  };

  const handleManageSubscriptions = async () => {
    setIsLoading(true);
    try {
      const res = await axiosFrontendInstance.post(
        "/account/manage-subscriptions",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(data);
      if (res.status === 200) {
        router.push(res.data.url);
      } else if (res.status === 404) {
        toast({
          title: "No subscriptions found",
          variant: "destructive",
        });
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error: any) {
      toast({
        title: error.response.data.message || "Something went wrong",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

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
      {/* <div className="flex flex-row justify-between items-start w-full mt-20 px-8">
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
      </div> */}
      <div className="mt-16 p-8 w-full grid grid-cols-3 gap-8">
        <Card className="w-full">
          <CardHeader className="flex flex-col justify-between h-full">
            <CardTitle>Personal Plans</CardTitle>
            <CardDescription>
              {recordsQty.personal} active subscriptions
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="w-full">
          <CardHeader className="flex flex-col justify-between h-full">
            <CardTitle>Vercel Plans</CardTitle>
            <CardDescription>
              {recordsQty.vercel} active subscriptions
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="w-full">
          <CardHeader className="flex flex-col justify-between h-full">
            <CardTitle>Annual Plans</CardTitle>
            <CardDescription>
              {recordsQty.annual} active subscriptions
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="w-full col-span-3 flex flex-row justify-between items-center">
          <CardHeader>
            <CardTitle>TXT Records</CardTitle>
            <CardDescription>
              {recordsQty.txt.used} / {recordsQty.txt.total} used
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 pr-6">
            {recordsQty.txt.used < recordsQty.txt.total ? (
              <Button className="w-full" onClick={() => setTxtRecordOpen(true)}>
                Add TXT Record
              </Button>
            ) : (
              <p className="text-muted-foreground">No more records to add</p>
            )}
          </CardContent>
        </Card>
      </div>
      <AddTXTRecord open={txtRecordOpen} onOpenChange={setTxtRecordOpen} />
      <div className="mt-16 w-full">
        <h1 className="text-xl font-medium text-center">Your Records</h1>
        {/* <RecordsTable allowActions /> */}
        <Suspense>
          <RecordsTable data={data || []} />
        </Suspense>
      </div>

      <div className="mt-16 w-full">
        <h1 className="text-xl font-medium text-center">Your Plans</h1>
        {/* <RecordsTable allowActions /> */}
        <Suspense>
          <PlansTable data={DUMMY_PLANS || []} />
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
