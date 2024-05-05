"use client";

import { ColumnDef } from "@tanstack/react-table";
import UpdateRecord from "./UpdateRecord";
import DeleteRecord from "./DeleteRecord";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Info } from "lucide-react";
import { TRecord } from "@/types/types";

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
      const expiry = row.original.expiry;
      const statusColour =
        status === "active"
          ? "text-green-300"
          : status === "processing"
          ? "text-yellow-200"
          : "text-red-400";
      return (
        <span className={`${statusColour} flex flex-row items-center gap-2`}>
          <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
          {status === "overdue" && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info size={16} />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    This record will become unusable in{" "}
                    {(
                      ((new Date(expiry).getTime() - new Date().getTime()) /
                        (1000 * 60 * 60 * 24) +
                        5) as number
                    ).toFixed(0)}{" "}
                    day(s). Please make sure to make a payment before that by
                    clicking the &quot;Manage Subscriptions&quot; button.
                    <br></br>
                    <br />
                    Failure to do so will result in the record being expired and
                    unusable.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original._id;
      const status = row.original.status;
      if (status === "active" || status === "overdue") {
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
      } else {
        return (
          <div className="flex flex-row w-24 justify-start gap-2 font-semibold opacity-30">
            -
          </div>
        );
      }
    },
  },
];
