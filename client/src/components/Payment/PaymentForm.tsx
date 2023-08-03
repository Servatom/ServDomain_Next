"use client";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios, { AxiosError } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "../ui/use-toast";
import Button from "../common/Button";
import { useRouter, useSearchParams } from "next/navigation";
import AuthContext from "@/store/auth-context";
import { Input } from "../ui/input";
import { paymentPagePlans } from "@/config";
import { TPlanFrequency } from "../types";
import { TPlanName } from "@/types/types";
import { StripeCardElementChangeEvent } from "@stripe/stripe-js";
import Loader from "../common/Loader";

export default function PaymentForm() {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const query = useSearchParams();
  const { user, isLoggedIn } = useContext(AuthContext);
  const plan = query.get("plan") as TPlanName;
  const recordId = query.get("recordId");
  const [name, setName] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [allowPayment, setAllowPayment] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const plan = query.get("plan");
    const recordId = query.get("recordId");

    if (!isLoggedIn) router.push("/login");

    if (!plan || !recordId) router.push("/");
  }, [isLoggedIn]);

  useEffect(() => {
    setAllowPayment(isChecked && !error && name.length > 0);
  }, [error, isChecked]);

  const cardErrorHandler = (e: StripeCardElementChangeEvent) => {
    setError(e.error?.message || "");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const cardElement = elements?.getElement("card");

    try {
      if (!stripe || !cardElement) return null;

      const paymentMethod = await stripe
        .createPaymentMethod({
          type: "card",
          card: cardElement,
        })
        .then((result) => {
          return result.paymentMethod;
        });

      const { data, status } = await axios.post("/api/subscribe", {
        data: {
          email: user?.email,
          phone: user?.phoneNumber,
          firebaseId: user?.firebaseUID,
          plan,
          recordId,
          paymentMethod: paymentMethod?.id,
        },
      });
      const clientSecret = data;

      if (status !== 200) throw new Error("Something went wrong.");

      const paymentResult = await stripe?.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod?.id,
      });

      if (paymentResult?.error) {
        setLoading(false);
        return toast({
          title: "Payment failed",
          description: paymentResult.error.message,
          variant: "destructive",
        });
      }
      setLoading(false);
      console.log(paymentResult);

      if (paymentResult.paymentIntent?.status === "succeeded") {
        toast({
          title: "Payment successful",
          description: "Your record will be activated within 24 hours.",
        });
      } else if (paymentResult.paymentIntent?.status === "canceled") {
        toast({
          title: "Payment failed",
          description: "Your record will be deleted within 24 hours.",
        });
      } else {
        toast({
          title: "Payment processing",
          description: "Your record status is pending.",
        });
      }

      router.replace("/account");
    } catch (error: AxiosError | any) {
      console.log(error);
      toast({
        title: "Payment failed",
        description: error.response.data,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  if (!plan) return null;

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto my-auto p-16 pt-8 bg-[#1b1b1b95] backdrop-blur-xl">
      <div className="flex flex-col gap-2 mt-4 mb-8 text-gray-400">
        <p className="font-medium text-xl">{plan?.toUpperCase()} PLAN</p>
        <div className="font-medium ">
          <span className="text-5xl text-white">
            ₹{paymentPagePlans[plan].price}.00
          </span>{" "}
          / {paymentPagePlans[plan].frequency}
        </div>
        <p>{paymentPagePlans[plan].description}</p>
      </div>
      <form
        onSubmit={onSubmit}
        className="w-full flex flex-col gap-8 text-white"
      >
        <div className="flex flex-col w-full gap-3">
          <label htmlFor="cc-name">Name on card:</label>
          <Input
            id="cc-name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="border-b-2 border-slate-800 pb-3">
          <CardElement
            onChange={cardErrorHandler}
            options={{
              style: {
                base: {
                  fontSize: "20px",
                  color: "#fff",
                  "::placeholder": {
                    color: "#a0a0a0",
                  },
                },
              },
              hidePostalCode: true,
            }}
          />
        </div>
        {error.length > 0 && <p className="text-red-500 -mt-5">{error}</p>}
        <div>
          <input
            type="checkbox"
            id="terms"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
          <label htmlFor="terms" className="ml-2">
            I agree to the{" "}
            <a
              href="https://domains.servatom.com/tnc"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              terms and conditions{" "}
            </a>
            of this service.
          </label>
        </div>
        <Button disabled={!allowPayment} type="submit">
          {loading && (
            <div className="animate-spin mr-3">
              <Loader />
            </div>
          )}
          Subscribe
        </Button>
        <span className="text-xs opacity-40 text-center">
          By confirming your subscription, you allow Servdomain to charge your
          card for this payment and future payments in accordance with their
          terms. You can always cancel your subscription.
        </span>
      </form>
    </div>
  );
}
