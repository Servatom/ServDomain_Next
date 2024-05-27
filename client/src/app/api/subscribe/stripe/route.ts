import { axiosBackendInstance } from "@/lib/axios";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2022-11-15",
});

export async function DELETE(req: NextRequest) {
  // get the recordId from the query params
  const urlParams = new URL(req.url);
  console.log({ urlParams });
  const subscriptionId = urlParams.searchParams.get("subscriptionId") || "x";
  const token = req.cookies.get("token")?.value;

  try {
    const cf_resp = await axiosBackendInstance.delete(
      `/record/${subscriptionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (cf_resp.status !== 200) {
      let message = cf_resp.data.message;
      return new NextResponse(
        JSON.stringify({
          message: "Error deleting record. " + message,
        }),
        { status: 500 }
      );
    } else {
      let stripeResp = await stripe.subscriptions.del(subscriptionId);
      return new NextResponse(
        JSON.stringify({
          message: "Record deleted successfully",
        }),
        { status: 200 }
      );
    }
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        message: "Error deleting record. " + JSON.stringify(err),
      }),
      { status: 500 }
    );
  }
}
