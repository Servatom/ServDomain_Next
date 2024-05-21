import { axiosBackendInstance } from "@/lib/axios";
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
  const user: TUser = await axiosBackendInstance
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

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_ORIGIN}/account`,
    });

    return new NextResponse(
      JSON.stringify({
        url: session.url,
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        message: "Error creating session. " + JSON.stringify(err),
      }),
      { status: 500 }
    );
  }
}
