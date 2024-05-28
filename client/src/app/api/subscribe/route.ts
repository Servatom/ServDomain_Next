import { recordsApi } from "@/api/api";
import { axiosBackendInstance } from "@/lib/axios";
import { razorpayPlans } from "@/lib/config";
import { TDBPlan, TPlanName, TSubscribePayload } from "@/types/types";
import { redirect } from "next/navigation";
import { NextResponse, NextRequest } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest) {
  const { plan, record }: TSubscribePayload = await req.json();
  const { ownerID, domainID, planLabel, planType } = plan;

  const token = req.cookies.get("token")?.value;

  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const subscription = await razorpay.subscriptions.create({
      plan_id: razorpayPlans[planType].planId,
      total_count: 12,
      customer_notify: 1,
      notes: {
        ownerID,
        domainID,
        planLabel,
        planType,
      },
    });

    const planResp = await axiosBackendInstance
      .post<{
        message: string;
        data: TDBPlan;
      }>(
        "/plan",
        {
          ownerID,
          domainID,
          planType,
          planLabel,
          razorpaySubscriptionID: subscription.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch(async (err) => {
        await razorpay.subscriptions.cancel(subscription.id);
        throw new Error(JSON.stringify(err));
      });

    const { name, content, type } = record;

    console.log("Plan:", planResp.data);

    const recordResp = await recordsApi
      .createRecord({
        domainID: domainID,
        name: name,
        content: content,
        type: type,
        planID: planResp.data.data._id,
        token: token!,
      })
      .catch(async (err) => {
        await axiosBackendInstance.delete(`/plan/${planResp.data.data._id}`, {
          //TODO: Add delete route in backend
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await razorpay.subscriptions.cancel(subscription.id);
        throw new Error(JSON.stringify(err));
      });

    console.log("Record:", recordResp.data);

    return new NextResponse(
      JSON.stringify({
        subscriptionID: subscription.id,
        orderID: subscription.id,
        razorpayKey: process.env.RAZORPAY_KEY_ID,
        planID: planResp.data.data._id,
        shortUrl: subscription.short_url,
      }),
      {
        status: 201,
      }
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        message: "Error creating subscription. " + JSON.stringify(err),
      }),
      { status: 500 }
    );
  }
}
