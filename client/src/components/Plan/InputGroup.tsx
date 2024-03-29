import { use, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { TStatus } from "../types";
import { statusVariantClasses } from "@/config";
import Button from "../common/Button";
import Loader from "../common/Loader";
import { validateSubdomain } from "@/lib/utils";
import { TRecordType } from "@/types/types";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { Textarea } from "../ui/textarea";

export type TContentType = "hostname" | "IPv4 address" | "text";

interface IInputGroupProps {
  recordType: TRecordType;
  contentType: TContentType;
  contentPlaceholder: string;
  contentValidationHandler: (content: string) => boolean;
}

const InputGroup: React.FC<IInputGroupProps> = ({
  recordType,
  contentType,
  contentPlaceholder,
  contentValidationHandler,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [subdomain, setSubdomain] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [subdomainStatus, setSubdomainStatus] = useState<TStatus>({
    variant: "neutral",
    text: "Check availability",
  });
  const [contentStatus, setContentStatus] = useState<TStatus>({
    variant: "neutral",
    text: "Enter a valid " + contentType,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInputValid, setIsInputValid] = useState<boolean>(false);

  const validateInputs = async () => {
    let isInputValid = true;
    setIsInputValid(false);
    setIsLoading(true);

    if (!validateSubdomain(subdomain)) {
      setSubdomainStatus({
        text: "Invalid subdomain",
        variant: "error",
      });
      isInputValid = false;
    } else {
      await fetch(`/api/subdomain?subdomain=${subdomain}`)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.isAvailable) {
            setSubdomainStatus({
              text: "Subdomain available",
              variant: "success",
            });
          } else {
            setSubdomainStatus({
              text: "Subdomain not available",
              variant: "error",
            });
            isInputValid = false;
          }
        })
        .catch((err) => {
          setSubdomainStatus({
            text: "Something went wrong",
            variant: "error",
          });
          isInputValid = false;
        });
    }

    if (!contentValidationHandler(content)) {
      setContentStatus({
        text: "Invalid " + contentType,
        variant: "error",
      });
      isInputValid = false;
    } else {
      setContentStatus({
        text: "Valid " + contentType,
        variant: "success",
      });
    }
    setIsLoading(false);
    setIsInputValid(isInputValid);
  };

  const validateTxtInput = () => {
    let isInputValid = true;
    setIsInputValid(false);
    setIsLoading(true);

    if (subdomain.length === 0) {
      setSubdomainStatus({
        text: "Name cannot be empty",
        variant: "error",
      });
      isInputValid = false;
    }

    if (contentValidationHandler(content)) {
      setContentStatus({
        text: "Valid " + contentType,
        variant: "success",
      });
    } else {
      setContentStatus({
        text: "Invalid " + contentType,
        variant: "error",
      });
      isInputValid = false;
    }

    setIsLoading(false);
    setIsInputValid(isInputValid);
  };

  useEffect(() => {
    setIsInputValid(false);
  }, [subdomain, content]);

  const addRecord = async () => {
    setIsLoading(true);
    const plan = pathname.split("/")[2];

    try {
      const data = await fetch("/api/records", {
        method: "POST",
        body: JSON.stringify({
          name: subdomain,
          content: content,
          type: recordType,
          plan: plan,
        }),
      });

      if (data.status === 201) {
        toast({
          title: "Record request submitted!",
          description:
            "It will be added to your account once the payment confirmation is received.",
        });

        const { recordId } = await data.json();
        router.push(
          `/payment?plan=${plan}&recordId=${recordId}&name=${subdomain}`
        );
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

  const addTxtRecord = async () => {
    setIsLoading(true);
    const plan = pathname.split("/")[2];

    try {
      const data = await fetch("/api/records", {
        method: "POST",
        body: JSON.stringify({
          name: subdomain,
          content: content,
          type: "TXT",
          plan: plan,
        }),
      });

      if (data.status === 201) {
        toast({
          title: "Record request submitted!",
          description:
            "It will be added to your account once the payment confirmation is received.",
        });

        const { recordId } = await data.json();
        router.push(
          `/payment?plan=${plan}&recordId=${recordId}&name=${subdomain}`
        );
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

  if (recordType === "TXT")
    return (
      <div className="flex flex-col justify-center gap-3 my-3 w-full">
        <div className="flex flex-col gap-3">
          <label htmlFor="name" className="text-sm">
            Name
          </label>
          <Input
            id="name"
            placeholder="_vercel"
            maxLength={24}
            value={subdomain}
            onChange={(e) => {
              setSubdomain(e.target.value);
            }}
          />
          <span
            className={`errorText text-xs mb-3 w-max ${
              statusVariantClasses[subdomainStatus.variant]
            }`}
          >
            {subdomainStatus.text}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor={"content-" + recordType} className="text-sm">
            Content
          </label>
          <Textarea
            id={"content-" + recordType}
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
    );
  else
    return (
      <div className="flex flex-row items-center gap-6 my-3">
        <div className="flex flex-col gap-3">
          <label htmlFor="subdomain" className="text-sm">
            Subdomain
          </label>
          <Input
            id="subdomain"
            placeholder="noobmaster69"
            maxLength={24}
            value={subdomain}
            onChange={(e) => {
              setSubdomain(e.target.value);
            }}
          />
          <span
            className={`errorText text-xs my-2 w-max ${
              statusVariantClasses[subdomainStatus.variant]
            }`}
          >
            {subdomainStatus.text}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor={"content-" + recordType} className="text-sm">
            Content
          </label>
          <Input
            id={"content-" + recordType}
            placeholder={contentPlaceholder}
            maxLength={24}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <span
            className={`errorText text-xs my-2 w-max ${
              statusVariantClasses[contentStatus.variant]
            }`}
          >
            {contentStatus.text}
          </span>
        </div>
        <Button
          className={""}
          onClick={!isInputValid ? validateInputs : addRecord}
          disabled={isLoading}
        >
          {isLoading && <Loader className="mr-3" size={14} />}
          <span className="text-lg">{isInputValid ? "Add" : "Check"}</span>
        </Button>
      </div>
    );
};

export default InputGroup;
