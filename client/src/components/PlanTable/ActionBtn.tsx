import { TPlan } from "@/types/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { MouseEvent } from "react";

const PlanActionBtn = ({ plan }: { plan: TPlan }) => {
  const handleAction = (
    event: MouseEvent,
    action: "manage" | "cancel" | "copy"
  ) => {
    event.stopPropagation();

    switch (action) {
      case "manage":
        console.log("Manage Subscription");
        break;
      case "cancel":
        console.log("Cancel Subscription");
        break;
      case "copy":
        navigator.clipboard.writeText(plan._id);
        break;
    }
  };
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
        <DropdownMenuItem onClick={(event) => handleAction(event, "copy")}>
          Copy Plan ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={(event) => handleAction(event, "manage")}>
          Manage Subscription
        </DropdownMenuItem>
        <DropdownMenuItem onClick={(event) => handleAction(event, "cancel")}>
          Cancel Subscription
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PlanActionBtn;
