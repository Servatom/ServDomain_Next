"use client";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { TRecord } from "@/types/types";
import { useGetUserRecords } from "@/api/query/record/query";

const RecordsTable: React.FC<{ data: TRecord[] }> = ({ data }) => {
  const [records, setRecords] = useState<TRecord[]>([]);

  useEffect(() => {
    if (!data) return;

    // let overdue = data.filter((record) => record.status === "overdue");
    // let active = data.filter((record) => record.status === "active");
    // let processing = data.filter((record) => record.status === "processing");
    // let cancelled = data.filter((record) => record.status === "cancelled");
    // let expired = data.filter((record) => record.status === "expired");

    let cname = data.filter((record) => record.type === "CNAME");
    let a = data.filter((record) => record.type === "A");
    let txt = data.filter((record) => record.type === "TXT");

    let records = [...cname, ...a, ...txt];

    setRecords(records);
  }, [data]);
  return (
    <div className="container mx-auto py-6">
      <DataTable columns={columns} data={records} />
    </div>
  );
};

export default RecordsTable;
