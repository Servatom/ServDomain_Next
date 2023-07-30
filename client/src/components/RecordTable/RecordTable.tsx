"use client";
import { useEffect, useState } from "react";
import { TRecord } from "../types";
import { columns } from "./columns";
import { DataTable } from "./data-table";

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
      setRecords(data);
    });
  }, []);
  return (
    <div className="container mx-auto py-6">
      <DataTable columns={columns} data={records} />
    </div>
  );
}
