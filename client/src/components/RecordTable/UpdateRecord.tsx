import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { TRecord } from "../types";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { validateHostname, validateIPv4 } from "@/lib/utils";

const UpdateRecord = (record: TRecord) => {
  const [content, setContent] = useState(record.content);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const onEdit = () => {
    setError("");
    if (record.type == "A") {
      if (!validateIPv4(content)) {
        setError("Invalid IPv4 Address");
        return;
      }
    } else {
      if (!validateHostname(content)) {
        setError("Invalid Hostname");
        return;
      }
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Edit</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-2">Change Record?</DialogTitle>
          <DialogDescription>
            You can change the content of your CNAME/A Record as many times as
            you want.
          </DialogDescription>
          <div className="pt-6 flex flex-col w-full gap-3 text-gray-400">
            <span className="text-sm">Subdomain:</span>
            <Input className="text-sm" value={record.name} disabled />
          </div>
          <div className="pt-6 flex flex-col w-full gap-3 text-gray-400">
            <label className="text-sm" htmlFor="content">
              Content ({record.type} Record) :
            </label>
            <Input
              className="text-sm"
              value={content}
              id="content"
              onChange={(e) => setContent(e.target.value)}
            />
            {error.length > 0 && (
              <span className="text-red-500 text-xs ml-1">{error}</span>
            )}
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant={"outline"}
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <div
            className={content === record.content ? "cursor-not-allowed" : ""}
          >
            <Button
              type="submit"
              variant={"default"}
              disabled={content === record.content}
              onClick={onEdit}
            >
              Edit
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateRecord;
