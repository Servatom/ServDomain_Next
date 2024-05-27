"use client";
import { axiosFrontendInstance } from "@/lib/axios";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const PaymentPage = () => {
  const query = useSearchParams();
  const router = useRouter();
  const plan = query.get("plan");
  const recordId = query.get("recordId");
  const subdomain = query.get("name");

  const handleStripePayment = async () => {
    try {
      const { data, status } = await axiosFrontendInstance.post(
        "/payment/stripe/create-checkout-session",
        {
          data: {
            plan,
            recordId,
            subdomain,
          },
        }
      );

      if (status === 201) {
        // Redirect to Stripe Checkout
        const url = data.url;
        window.location.href = url;
      }
      console.log(data);
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
    if (!plan || !recordId) router.push("/");

    handleStripePayment();
  }, [recordId]);

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
