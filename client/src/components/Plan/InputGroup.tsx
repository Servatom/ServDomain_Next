import { useState } from "react";
import { Input } from "../ui/input";
import { TStatus } from "../types";
import { statusVariantClasses } from "@/config";
import Button from "../common/Button";
import Loader from "../common/Loader";

export type TContentType = "hostname" | "IPv4 address";

interface IInputGroupProps {
  contentType: TContentType;
  contentPlaceholder: string;
  contentValidationHandler?: (content: string) => boolean;
}

const InputGroup: React.FC<IInputGroupProps> = ({
  contentType,
  contentPlaceholder,
}) => {
  const [subdomain, setSubdomain] = useState<string>("");
  const [subdomainStatus, setSubdomainStatus] = useState<TStatus>({
    variant: "neutral",
    text: "Check availability",
  });
  const [contentStatus, setContentStatus] = useState<TStatus>({
    variant: "neutral",
    text: "Enter a valid " + contentType,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInputValid, setIsInputValid] = useState<boolean>(false);

  return (
    <div className="flex flex-row items-center gap-6 my-3">
      <div className="flex flex-col gap-3">
        <label htmlFor="subdomain" className="text-sm">
          Subdomain
        </label>
        <Input id="subdomain" placeholder="noobmaster69" maxLength={24} />
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
        <Input id="content" placeholder={contentPlaceholder} maxLength={24} />
        <span
          className={`errorText text-xs my-2 w-max ${
            statusVariantClasses[contentStatus.variant]
          }`}
        >
          {contentStatus.text}
        </span>
      </div>
      <Button className={""} onClick={() => {}}>
        {isLoading && <Loader className="mr-3" size={14} />}
        <span className="text-lg">{isInputValid ? "Add" : "Check"}</span>
      </Button>
    </div>
  );
};

export default InputGroup;
