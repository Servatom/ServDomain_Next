"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Info, MoreHorizontal } from "lucide-react";
import { TPlan, TPlanName, TRecord } from "@/types/types";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const columns: ColumnDef<TPlan>[] = [
  {
    accessorKey: "planLabel",
    header: "Plan Label",
  },
  {
    accessorKey: "planType",
    header: "Subscription Type",
    cell: ({ row }) => {
      const planType = row.original.planType;
      const subscriptionTypeLabels: {
        [key in TPlanName]: string;
      } = {
        personal: "Personal Plan",
        annual: "Annual Plan",
        vercel: "Vercel Starter Plan",
      };
      return subscriptionTypeLabels[planType as TPlanName];
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
    enableHiding: false,
    cell: ({ row }) => {
      const plan = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(plan._id)}
            >
              Copy Plan ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Manage Subscription</DropdownMenuItem>
            <DropdownMenuItem>Cancel Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
