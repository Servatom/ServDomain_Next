"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TRecord } from "../types";
import UpdateRecord from "./UpdateRecord";
import DeleteRecord from "./DeleteRecord";

export const columns: ColumnDef<TRecord>[] = [
  {
    accessorKey: "type",
    header: "Record Type",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "content",
    header: "Content",
  },
  {
    accessorKey: "plan",
    header: "Plan",
    cell: ({ row }) => {
      // Capitalise first letter
      const plan = row.original.plan;
      return plan.charAt(0).toUpperCase() + plan.slice(1);
    },
  },
  {
    accessorKey: "expiry",
    header: "Expiry",
    cell: ({ row }) => {
      const expiry = new Date(row.original.expiry).getTime();
      let today = new Date().getTime();
      let diff = expiry - today;
      // let dateColour =
      //   diff > 0
      //     ? diff > 5 * 24 * 60 * 60 * 1000
      //       ? "text-green-300"
      //       : "text-yellow-200"
      //     : "text-red-400";
      return (
        <span className={``}>{new Date(expiry).toLocaleDateString()}</span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const statusColour =
        status === "active"
          ? "text-green-300"
          : status === "processing"
          ? "text-yellow-200"
          : "text-red-400";
      return (
        <span className={`${statusColour}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original._id;
      return (
        <div className="flex flex-row w-24 justify-start gap-2 font-semibold">
          <button
            className="text-xs text-gray-300 hover:text-gray-500 -ml-4 focus:outline-none"
            onClick={() => {
              console.log("Edit", id);
            }}
          >
            <UpdateRecord {...row.original} />
          </button>
          <button
            className="text-xs text-gray-300 hover:text-gray-500 focus:outline-none ml-2"
            onClick={() => {
              console.log("Delete", id);
            }}
          >
            <DeleteRecord {...row.original} />
          </button>
        </div>
      );
    },
  },
];
