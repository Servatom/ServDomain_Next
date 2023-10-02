import axiosInstance from "@/axios";
import { paymentPagePlans, products } from "@/config";
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
      plan: "annual" | "personal" | "student";
      recordId: string;
      subdomain: string;
    };
  } = await req.json();

  const token = req.cookies.get("token")?.value;
  const { plan, recordId, subdomain } = data;
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
      name: `${
        // Capitalize first letter
        plan.charAt(0).toUpperCase() + plan.slice(1)
      } Plan - ${subdomain}`,
      description: `${paymentPagePlans[plan].description}`,
      metadata: {
        recordId,
        plan,
        firebaseId: user.firebaseUID,
      },
    });

    // 3. create session

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      allow_promotion_codes: true,
      line_items: [
        {
          price_data: {
            currency: "INR",
            product: product.id,
            unit_amount: products[plan].unit_amount,
            recurring: {
              interval: products[plan].interval,
            },
          },
          quantity: 1,
        },
      ],
      customer: customerId,
      success_url: `${process.env.NEXT_PUBLIC_ORIGIN}/account?recordId=${recordId}&paymentStatus=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_ORIGIN}/account?recordId=${recordId}&paymentStatus=cancelled`,
      metadata: {
        recordId,
        plan,
        firebaseId: user.firebaseUID,
      },
      subscription_data: {
        metadata: {
          recordId,
          plan,
          firebaseId: user.firebaseUID,
        },
      },
    });

    return new NextResponse(JSON.stringify(session), { status: 201 });
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
  const recordId = urlParams.searchParams.get("recordId") || "x";
  const token = req.cookies.get("token")?.value;

  try {
    const resp = await axiosInstance.delete(`/record/incomplete/${recordId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (resp.status !== 200) {
      let message = resp.data.message;
      return new NextResponse(
        JSON.stringify({
          message: "Error deleting record. " + message,
        }),
        { status: 500 }
      );
    } else {
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
