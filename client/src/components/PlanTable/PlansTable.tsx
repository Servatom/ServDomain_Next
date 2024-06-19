"use client";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { TPlan, TRecord } from "@/types/types";

const PlansTable: React.FC<{ data: TPlan[] }> = ({ data }) => {
  const [plans, setPlans] = useState<TPlan[]>([]);

  useEffect(() => {
    if (!data) return;

    // let overdue = data.filter((record) => record.status === "overdue");
    // let active = data.filter((record) => record.status === "active");
    // let processing = data.filter((record) => record.status === "processing");
    // let cancelled = data.filter((record) => record.status === "cancelled");
    // let expired = data.filter((record) => record.status === "expired");

    let vercel = data.filter((record) => record.planType === "vercel");
    let annual = data.filter((record) => record.planType === "annual");
    let personal = data.filter((record) => record.planType === "personal");

    let plans = [...vercel, ...annual, ...personal];

    setPlans(plans);
  }, [data]);
  return (
    <div className="container mx-auto py-6">
      <DataTable data={plans} />
    </div>
  );
};

export default PlansTable;
