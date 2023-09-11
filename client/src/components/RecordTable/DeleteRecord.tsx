import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { TRecord } from "../types";
import { Input } from "../ui/input";
import { useRef, useState } from "react";
import { toast } from "../ui/use-toast";

const DeleteRecord = (record: TRecord) => {
  const [inp, setInp] = useState("");
  const [open, setOpen] = useState(false);
  const handleDelete = async () => {
    try {
      let resp = await fetch(
        `/api/subscribe?subscriptionId=${record.stripeSubscriptionId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await resp.json();
      toast({
        title: "Subscription cancelled succesfully!",
        // description: data.message,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Something went wrong :/",
        description: JSON.stringify(err),
        variant: "destructive",
      });
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="px-4 py-2">Delete</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-2">Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently mark this record
            as{" "}
            <code className="text-xs text-red-400 rounded-sm px-1 bg-red-400 bg-opacity-25 border border-red-400 border-opacity-60">
              cancelled
            </code>{" "}
            and would make it unreserved. In case of an ongoing plan, the plan
            will be cancelled and no money would be refunded. The same subdomain
            can be bought all over again subject to availability.
          </DialogDescription>
          <div className="pt-6 flex flex-col w-full gap-3 text-gray-400">
            <span className="text-sm">
              Enter{" "}
              <span className="font-mono select-none">`{record.name}`</span> to
              delete the record:{" "}
            </span>
            <Input
              className="text-sm"
              value={inp}
              onChange={(e) => setInp(e.target.value)}
              onPaste={(e) => e.preventDefault()}
            />
          </div>
        </DialogHeader>
        <DialogFooter>
          <div className={inp !== record.name ? "cursor-not-allowed" : ""}>
            <Button
              type="submit"
              variant={"destructive"}
              disabled={inp !== record.name}
              onClick={async () => {
                await handleDelete();
                setOpen(false);
              }}
            >
              Delete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteRecord;
