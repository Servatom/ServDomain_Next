import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { STATUS_TEXTS, statusVariantClasses } from "@/lib/config";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Loader from "../common/Loader";
import { useEffect, useState } from "react";
import { TStatus } from "@/types/types";
import { validateTxtRecord } from "@/lib/utils";
import { toast } from "../ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface IAddTXTRecordProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddTXTRecord: React.FC<IAddTXTRecordProps> = ({ open, onOpenChange }) => {
  const [planID, setPlanID] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInputValid, setIsInputValid] = useState<boolean>(false);

  const [planStatus, setPlanStatus] = useState<TStatus>(STATUS_TEXTS.INVISIBLE);
  const [nameStatus, setNameStatus] = useState<TStatus>(STATUS_TEXTS.INVISIBLE);
  const [contentStatus, setContentStatus] = useState<TStatus>(
    STATUS_TEXTS.INVISIBLE
  );

  const contentPlaceholder =
    "vc-domain-verify=subdomain.domain.xyz,hvwivekf87293792";

  const validateTxtInput = () => {
    let isInputValid = true;
    setIsInputValid(false);
    setIsLoading(true);

    setPlanStatus(STATUS_TEXTS.INVISIBLE);
    setNameStatus(STATUS_TEXTS.INVISIBLE);
    setContentStatus(STATUS_TEXTS.INVISIBLE);

    if (planID.length === 0) {
      setPlanStatus({
        text: "Select a plan",
        variant: "error",
      });
      isInputValid = false;
    }

    if (name.length === 0) {
      setNameStatus({
        text: "Name cannot be empty",
        variant: "error",
      });
      isInputValid = false;
    }

    if (!validateTxtRecord(content)) {
      setContentStatus({
        text: "Invalid text",
        variant: "error",
      });
      isInputValid = false;
    }

    setIsLoading(false);
    setIsInputValid(isInputValid);
  };

  useEffect(() => {
    setIsInputValid(false);
  }, [name, content]);

  const addTxtRecord = async () => {
    setIsLoading(true);

    try {
      const data = await fetch("/api/records", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          content: content,
          type: "TXT",
          planId: planID, //TODO: accept planID on backend
        }),
      });

      if (data.status === 201) {
        toast({
          title: "TXT Record added successfully!",
          description: "Changes may take upto 24 hours to reflect.",
        });

        const { recordId } = await data.json();
      } else {
        toast({
          title: "Something went wrong!",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    } catch (err) {
      toast({
        title: "Something went wrong!",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => onOpenChange(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add TXT Record</DialogTitle>
          <DialogDescription>
            <div className="flex flex-col justify-center gap-3 my-3 w-full">
              <div className="flex flex-col gap-3">
                <label htmlFor="name" className="text-sm">
                  Plan
                </label>
                <Select onValueChange={(value) => setPlanID(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yhvauedv87t3wqrgd923">
                      Vercel - hbd.servatom.xyz
                    </SelectItem>
                    <SelectItem value="drgvauedv8drst3gd923">
                      Annual - lol.servatom.xyz
                    </SelectItem>
                  </SelectContent>
                </Select>

                <span
                  className={`errorText text-xs mb-3 w-max ${
                    statusVariantClasses[planStatus.variant]
                  }`}
                >
                  {planStatus.text}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="name" className="text-sm">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="_vercel"
                  maxLength={24}
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="text-base"
                />
                <span
                  className={`errorText text-xs mb-3 w-max ${
                    statusVariantClasses[nameStatus.variant]
                  }`}
                >
                  {nameStatus.text}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor={"content-TXT"} className="text-sm">
                  Content
                </label>
                <Textarea
                  id={"content-TXT"}
                  placeholder={contentPlaceholder}
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                />
                <span
                  className={`errorText text-xs mb-3 w-max ${
                    statusVariantClasses[contentStatus.variant]
                  }`}
                >
                  {contentStatus.text}
                </span>
              </div>
              <Button
                className={""}
                onClick={!isInputValid ? validateTxtInput : addTxtRecord}
                disabled={isLoading}
              >
                {isLoading && <Loader className="mr-3" size={14} />}
                <span className="text-lg">Add</span>
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddTXTRecord;
