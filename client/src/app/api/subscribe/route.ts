import axiosInstance from "@/axios";
import { products } from "@/config";
import { setCookie } from "@/lib/actions.server";
import { TUser } from "@/types/types";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2022-11-15",
});

export async function POST(req: NextRequest) {
  const {
    data,
  }: {
    data: {
      paymentMethod: string;
      plan: "annual" | "personal" | "student";
      recordId: string;
      subdomain: string;
    };
  } = await req.json();

  const token = req.cookies.get("token")?.value;
  const { paymentMethod, plan, recordId, subdomain } = data;
  try {
    const user: TUser = await axiosInstance
      .get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data.data);

    let customerId = "";
    console.log(user);
    if (user.stripeCustomerId) {
      console.log("customer exists");
      customerId = user.stripeCustomerId;
    } else {
      // 1. create customer
      console.log("customer does not exist");
      const customer = await stripe.customers.create({
        email: user.email,
        phone: user.phoneNumber,
        payment_method: paymentMethod,
        invoice_settings: {
          default_payment_method: paymentMethod,
        },
        metadata: {
          firebaseId: user.firebaseUID,
        },
      });

      console.log(customer);

      customerId = customer.id;
      const updatedUser = await axiosInstance
        .patch(
          "/user/update",
          {
            stripeCustomerId: customerId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => res.data.data);
    }

    // 2. Create Product

    const product = await stripe.products.create({
      name: `${subdomain} - ${plan} plan`,
      metadata: {
        recordId,
        plan,
        firebaseId: user.firebaseUID,
      },
    });

    // 3. create subscription

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price_data: {
            currency: "INR",
            product: product.id,
            unit_amount: products[plan].unit_amount,
            recurring: {
              interval: products[plan].interval,
            },
          },
        },
      ],
      payment_settings: {
        payment_method_types: ["card"],
        save_default_payment_method: "on_subscription",
      },
      metadata: {
        recordId,
        plan,
        firebaseId: user.firebaseUID,
      },
      expand: ["latest_invoice.payment_intent"],
    });

    return new NextResponse(
      (subscription.latest_invoice as any).payment_intent.client_secret,
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return new NextResponse(error, {
      status: 500,
    });
  }
}

export async function DELETE(req: NextRequest) {
  // get the recordId from the query params
  const urlParams = new URL(req.url);
  console.log({ urlParams });
  const subscriptionId = urlParams.searchParams.get("subscriptionId") || "x";
  const token = req.cookies.get("token")?.value;

  try {
    const cf_resp = await axiosInstance.delete(`/record/${subscriptionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
