"use client";
import { axiosBackendInstance, axiosFrontendInstance } from "@/lib/axios";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { use, useContext, useEffect } from "react";
import { TPlanName, TRazorpaySubscriptionResponse } from "@/types/types";
import AuthContext from "@/store/auth-context";
import useRazorpay from "react-razorpay";
import { razorpayPlans } from "@/lib/config";

const PaymentPage = () => {
  const query = useSearchParams();
  const router = useRouter();
  const ctx = useContext(AuthContext);

  const plan = query.get("plan") as TPlanName;
  const subscriptionID = query.get("subscriptionID") || "";
  const orderID = query.get("orderID") || "";
  const razorpayKey = query.get("razorpayKey") || "";
  const planID = query.get("planID") || "";

  const [Razorpay, isLoaded] = useRazorpay();

  const handleSubscribe = async () => {
    try {
      const options = {
        key: razorpayKey,
        subscription_id: subscriptionID,
        order_id: orderID,
        currency: "INR",
        amount: String(razorpayPlans[plan!].unit_amount),
        name: "Servdomain",
        description:
          "Subscription for " + plan.slice(0, 1).toUpperCase() + plan.slice(1),
        handler: function (response: any) {
          const {
            razorpay_payment_id,
            razorpay_subscription_id,
            razorpay_signature,
          } = response;
          console.log(
            razorpay_payment_id,
            razorpay_subscription_id,
            razorpay_signature
          );

          // verify payment
          axiosBackendInstance.post("/plan/verify", {
            razorpay_payment_id,
            razorpay_subscription_id,
            razorpay_signature,
          });
        },
        prefill: {
          email: ctx.user?.email,
          contact: ctx.user?.phoneNumber,
        },
        notes: {
          ownerID: ctx.user?.userID,
          planID: planID,
        },
        theme: {
          color: "#7170F1",
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", function (response: any) {
        router.push("/account?paymentStatus=cancelled&planID=" + planID);
      });

      // successful payment
      rzp.on("payment.success", function (response: any) {
        console.log(response);
        router.push("/account?paymentStatus=success&planID=" + planID);
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Something went wrong!",
        description: "Please try again later.",
        variant: "destructive",
      });

      setTimeout(() => {
        router.replace("/");
      }, 3000);
    }
  };

  useEffect(() => {
    if (!plan || !subscriptionID || !orderID || !razorpayKey || !planID)
      router.push("/");

    if (isLoaded) handleSubscribe();
  }, [isLoaded]);

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col gap-3">
      <Skeleton className="h-8 w-64 " />
      <Skeleton className="h-8 w-48 " />
      <Skeleton className="h-8 w-48 " />
      <Skeleton className="h-8 w-64 " />
      <Skeleton className="h-8 w-64 " />
    </div>
  );
};

export default PaymentPage;
