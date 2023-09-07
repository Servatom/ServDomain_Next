import axiosInstance from "@/axios";
import { TUser } from "@/types/types";
import { redirect } from "next/navigation";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2022-11-15",
});

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return redirect("/login");
  const user: TUser = await axiosInstance
    .get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.data);

  if (!user.stripeCustomerId) {
    return new NextResponse("No subscriptions found", {
      status: 500,
    });
  }

  const paymentMethods = await stripe.paymentMethods.list({
    customer: user.stripeCustomerId,
    type: "card",
  });

  return new NextResponse(
    JSON.stringify({
      data: paymentMethods.data,
    }),
    {
      status: 200,
    }
  );
}
