"use client";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { TRecord } from "@/types/types";

async function getData(): Promise<TRecord[]> {
  // Fetch data from your API here.
  const data: TRecord[] = (
    await fetch("/api/records").then((res) => res.json())
  ).data;
  return data;
}

export default function RecordsTable() {
  const [records, setRecords] = useState<TRecord[]>([]);
  useEffect(() => {
    let data = getData().then((data) => {
      let overdue = data.filter((record) => record.status === "overdue");
      let active = data.filter((record) => record.status === "active");
      let processing = data.filter((record) => record.status === "processing");
      let cancelled = data.filter((record) => record.status === "cancelled");
      let expired = data.filter((record) => record.status === "expired");

      let records = [
        ...overdue,
        ...active,
        ...processing,
        ...cancelled,
        ...expired,
      ];

      setRecords(records);
    });
  }, []);
  return (
    <div className="container mx-auto py-6">
      <DataTable columns={columns} data={records} />
    </div>
  );
}
