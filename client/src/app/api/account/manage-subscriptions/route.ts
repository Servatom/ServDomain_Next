import axiosInstance from "@/axios";
import { TUser } from "@/types/types";
import { redirect } from "next/navigation";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2022-11-15",
});

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const user: TUser = await axiosInstance
    .get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data.data);

  if (!user.stripeCustomerId) {
    return new NextResponse(
      "No subscriptions found",

      {
        status: 500,
      }
    );
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: "http://localhost:3000/account",
  });

  return new NextResponse(
    JSON.stringify({
      url: session.url,
    }),
    {
      status: 200,
    }
  );
}
