import { use, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { TStatus } from "../types";
import { statusVariantClasses } from "@/config";
import Button from "../common/Button";
import Loader from "../common/Loader";
import { validateSubdomain } from "@/lib/utils";

export type TContentType = "hostname" | "IPv4 address";

interface IInputGroupProps {
  contentType: TContentType;
  contentPlaceholder: string;
  contentValidationHandler: (content: string) => boolean;
}

const InputGroup: React.FC<IInputGroupProps> = ({
  contentType,
  contentPlaceholder,
  contentValidationHandler,
}) => {
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

  const validateInputs = () => {
    let isInputValid = true;

    if (!validateSubdomain(subdomain)) {
      setSubdomainStatus({
        text: "Invalid subdomain",
        variant: "error",
      });
      isInputValid = false;
    } else {
      setSubdomainStatus({
        text: "Subdomain available",
        variant: "success",
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
    setIsInputValid(isInputValid);
  };

  useEffect(() => {
    setIsInputValid(false);
  }, [subdomain, content]);

  const addRecord = () => {};

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
        <label htmlFor="content" className="text-sm">
          Content
        </label>
        <Input
          id="content"
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
      >
        {isLoading && <Loader className="mr-3" size={14} />}
        <span className="text-lg">{isInputValid ? "Add" : "Check"}</span>
      </Button>
    </div>
  );
};

export default InputGroup;
