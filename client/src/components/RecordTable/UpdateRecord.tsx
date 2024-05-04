"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { validateHostname, validateIPv4 } from "@/lib/utils";
import { TRecord, TRecordType } from "@/types/types";
import { toast } from "../ui/use-toast";
import axiosInstance from "@/axios";
import AuthContext from "@/store/auth-context";

const UpdateRecord = (record: TRecord) => {
  const [content, setContent] = useState(record.content);
  const [type, setType] = useState(record.type);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const authCtx = useContext(AuthContext);
  const contentType = {
    CNAME: "Hostname",
    A: "IPv4 Address",
    TXT: "Text",
  };

  useEffect(() => {
    if (open) {
      setType(record.type);
      setContent(record.content);
      setError("");
    }
  }, [open]);

  useEffect(() => {
    if (record.type !== type) setContent("");
  }, [type]);

  const onEdit = async () => {
    setError("");
    if (type == "A") {
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

    try {
      const updateRecord = await axiosInstance
        .patch(
          `/record/${record._id}`,
          {
            type,
            content,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authCtx.user?.token}`,
            },
          }
        )
        .then((res) => res.data);

      if (updateRecord) {
        toast({
          title: "Wuhoo!",
          description: "Record updated successfully",
        });
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="px-4 py-2">Edit</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-2">Change Record?</DialogTitle>
          <DialogDescription>
            You can change the content of your CNAME/A Record as many times as
            you want. Updated DNS entries can take upto{" "}
            <span className="font-bold text-gray-200">24 hours</span> to
            propagate.
          </DialogDescription>
          <div className="pt-6 flex flex-col w-full gap-3 text-gray-400">
            <span className="text-sm">Type:</span>
            <Select
              onValueChange={(e) => {
                setType(e as TRecordType);
              }}
              defaultValue={record.type}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CNAME">CNAME</SelectItem>
                <SelectItem value="A">A</SelectItem>
                <SelectItem value="TXT">TXT</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="pt-6 flex flex-col w-full gap-3 text-gray-400">
            <span className="text-sm">Subdomain:</span>
            <Input className="text-sm" value={record.name} disabled />
          </div>
          <div className="pt-6 flex flex-col w-full gap-3 text-gray-400">
            <label className="text-sm" htmlFor="content">
              Content ({contentType[type]}) :
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
              disabled={content === record.content && type === record.type}
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
