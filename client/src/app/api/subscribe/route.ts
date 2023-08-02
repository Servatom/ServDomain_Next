import { setCookie } from "@/lib/actions.server";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
  apiVersion: "2022-11-15",
});

export async function POST(req: NextRequest) {
  const products: {
    [key: string]: {
      productId: string;
      interval: "month" | "year" | "week" | "day";
      unit_amount: number;
    };
  } = {
    annual: {
      productId: "prod_OMM6tsZxTAFR3O",
      interval: "year",
      unit_amount: 10000,
    },
    personal: {
      productId: "prod_OMM2P5yDisxbhd",
      interval: "month",
      unit_amount: 3000,
    },
    student: {
      productId: "prod_OMLgz8ig0G6jLY",
      interval: "month",
      unit_amount: 1500,
    },
  };
  const {
    data,
  }: {
    data: {
      email: string;
      phone: string;
      firebaseId: string;
      paymentMethod: string;
      plan: "annual" | "personal" | "student";
      recordId: string;
    };
  } = await req.json();
  const { email, phone, paymentMethod, plan, recordId, firebaseId } = data;
  try {
    // 1. create customer
    const customer = await stripe.customers.create({
      email: email,
      phone: phone,
      payment_method: paymentMethod,
      invoice_settings: {
        default_payment_method: paymentMethod,
      },
      metadata: {
        firebaseId,
      },
    });
    setCookie("stripeCustomerId", customer.id);
    console.log(customer);

    // 2. create subscription

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price_data: {
            currency: "inr",
            product: products[plan].productId,
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
        firebaseId,
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
