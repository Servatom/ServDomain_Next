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
    accessorKey: "ttl",
    header: "TTL",
    cell: ({ row }) => {
      const ttl = row.original.ttl;
      if (ttl === 1) {
        return <span>Auto</span>;
      }
      return <span>{ttl}</span>;
    },
  },
  {
    accessorKey: "proxied",
    header: "Proxied",
    cell: ({ row }) => {
      const proxied = row.original.proxied;
      return <span>{proxied ? "Yes" : "No"}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const id = row.original._id;
      // const status = row.original.status;
      if (row.original.isActive) {
        return (
          <div className="flex flex-row justify-end w-full font-semibold">
            <button
              className="text-xs text-gray-300 hover:text-gray-500 focus:outline-none"
              onClick={() => {
                console.log("Edit", id);
              }}
            >
              <UpdateRecord {...row.original} />
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
