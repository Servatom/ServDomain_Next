import { TRecord } from "../types";
import { columns } from "./columns";
import { DataTable } from "./data-table";

// async function getData(): Promise<TRecord[]> {
//   // Fetch data from your API here.
//   return records;
// }

export default async function RecordsTable() {
  const data: TRecord[] = (
    await fetch("/api/records").then((res) => res.json())
  ).data;
  return (
    <div className="container mx-auto py-6">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
