import { TRecord } from "../types";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export const records: TRecord[] = [
  {
    type: "CNAME",
    name: "joshi",
    content: "example.com",
    plan: "student",
    expiry: "2023-05-01",
    id: "1",
  },
  {
    type: "A",
    name: "mydomain",
    content: "17.18.19.20",
    plan: "student",
    expiry: "2023-04-03",
    id: "2",
  },
  {
    type: "A",
    name: "nerdbyrd",
    content: "20.117.2.1",
    plan: "annual",
    expiry: "2023-03-27",
    id: "3",
  },
];

async function getData(): Promise<TRecord[]> {
  // Fetch data from your API here.
  return records;
}

export default async function RecordsTable() {
  const data = await getData();

  return (
    <div className="container mx-auto py-6">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
