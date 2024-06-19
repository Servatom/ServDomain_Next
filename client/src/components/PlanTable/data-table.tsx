"use client";

import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { TPlan, TPlanName } from "@/types/types";
import PlanActionBtn from "./ActionBtn";
import RecordsTable from "../RecordTable/RecordTable";

export function DataTable({ data }: { data: TPlan[] }) {
  const subscriptionTypeLabels: {
    [key in TPlanName]: string;
  } = {
    personal: "Personal Plan",
    annual: "Annual Plan",
    vercel: "Vercel Starter Plan",
  };

  return (
    <div className="rounded-md border">
      <div className="border-b p-4 transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted font-semibold text-muted-foreground grid grid-cols-12">
        <span className="col-span-4">Plan Name</span>
        <span className="col-span-3">Subscription Type</span>
        <span className="col-span-2">Status</span>
        <span className="col-span-2">Expiry</span>
      </div>
      <Accordion className="w-full" type="single" collapsible>
        {data.map((plan) => {
          return (
            <AccordionItem
              value={`item-${plan._id}`}
              key={plan._id}
              className="w-full hover:bg-muted/50 px-4 border-b border-b-muted/70 transition-colors data-[state=open]:border-l-4 data-[state=open]:border-l-muted-foreground/50 data-[state=open]:bg-secondary/40"
            >
              <AccordionTrigger className="hover:no-underline">
                <div className="grid grid-cols-12 text-left w-full">
                  <span className="col-span-4">{plan.planLabel}</span>
                  <span className="col-span-3 ml-2">
                    {subscriptionTypeLabels[plan.planType]}
                  </span>
                  <span className="col-span-2 ml-3">{plan.status}</span>
                  <span className="col-span-2 ml-3">
                    {new Date(plan.expiry).toLocaleDateString()}
                  </span>
                  <PlanActionBtn plan={plan} />
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-base">
                <hr className="my-2 bg-muted mx-3 h-1" />
                <RecordsTable
                  data={plan.records || []}
                  paginated={false}
                  classname="px-2"
                />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
