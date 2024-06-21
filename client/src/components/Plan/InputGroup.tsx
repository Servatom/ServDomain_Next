import { useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { statusVariantClasses } from "@/lib/config";
import Button from "../common/Button";
import Loader from "../common/Loader";
import { validateSubdomain } from "@/lib/utils";
import {
  TPlanName,
  TRazorpaySubscriptionResponse,
  TRecordType,
  TStatus,
  TSubscribePayload,
} from "@/types/types";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";
import { useDebounce } from "@/lib/hooks/debounce";
import { STATUS_TEXTS } from "@/lib/config";
import { useCheckSubdomainQuery } from "@/api/query/subdomain/query";
import DashContext from "@/store/dash-context";
import { useCreateSubscription } from "@/api/mutation/plan/mutation";
import AuthContext from "@/store/auth-context";

export type TContentType = "hostname" | "IPv4 address";

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
  const plan = pathname.split("/")[2] as TPlanName;
  const ctx = useContext(AuthContext);

  const [subdomain, setSubdomain] = useState<string>("");
  const debouncedSearch = useDebounce(subdomain, 200);
  const [content, setContent] = useState<string>("");
  const [subdomainStatus, setSubdomainStatus] = useState<TStatus>(
    STATUS_TEXTS.CHECK
  );
  const [contentStatus, setContentStatus] = useState<TStatus>({
    variant: "neutral",
    text: "Enter a valid " + contentType,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInputValid, setIsInputValid] = useState<boolean>(false);

  const { defaultDomainId } = useContext(DashContext);

  const {
    data: resp,
    refetch: refetchCheck,
    isError,
  } = useCheckSubdomainQuery(debouncedSearch, defaultDomainId);

  const {
    mutate: subscribeMutate,
    data: subscriptionData,
    isSuccess: isSubscriptionCreated,
  } = useCreateSubscription(() => {
    setIsLoading(false);
  });

  const validateInputs = async () => {
    let isInputValid = true;
    setIsInputValid(false);
    setIsLoading(true);

    if (!validateSubdomain(subdomain)) {
      setSubdomainStatus(STATUS_TEXTS.INVALID);
      isInputValid = false;
    } else {
      if (isError) {
        setSubdomainStatus(STATUS_TEXTS.ERROR);
        isInputValid = false;
      }
      if (resp) {
        if (resp.isAvailable) {
          setSubdomainStatus(STATUS_TEXTS.AVAILABLE);
        } else {
          setSubdomainStatus(STATUS_TEXTS.UNAVAILABLE);
          isInputValid = false;
        }
      }
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

  useEffect(() => {
    setIsInputValid(false);
  }, [subdomain, content]);

  useEffect(() => {
    if (debouncedSearch) {
      refetchCheck();
    }
  }, [debouncedSearch, refetchCheck]);

  const subscribe = async () => {
    setIsLoading(true);

    if (process.env.NODE_ENV === "production") {
      toast({
        title: "Payments disabled!",
        description:
          "Work in progress 🚧. Please try again later or write us a mail if you wish to avail a subdomain urgently.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      subscribeMutate({
        plan: {
          ownerID: ctx.user!.userID,
          domainID: defaultDomainId,
          planLabel: subdomain + "." + defaultDomainId,
          planType: plan,
        },
        record: {
          name: subdomain,
          content: content,
          type: recordType,
          domainID: defaultDomainId,
        },
      });
    } catch (err) {
      toast({
        title: "Something went wrong!",
        description: "Please try again later.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!subscriptionData) return;

    const { subscriptionID, orderID, razorpayKey, planID, shortUrl } =
      subscriptionData?.data as TRazorpaySubscriptionResponse;

    console.log(subscriptionID, orderID, razorpayKey, planID);

    // router.push(
    //   `/payment?subscriptionID=${subscriptionID}&orderID=${orderID}&razorpayKey=${razorpayKey}&planID=${planID}&plan=${plan}`
    // );

    // open shortUrl in new tab
    window.open(shortUrl, "_blank");

    // check if current tab is in focus and if yes, show toast
  }, [subscriptionData]);

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
        onClick={!isInputValid ? validateInputs : subscribe}
        disabled={isLoading}
      >
        {isLoading && <Loader className="mr-3" size={14} />}
        <span className="text-lg">{isInputValid ? "Subscribe" : "Check"}</span>
      </Button>
    </div>
  );
};

export default InputGroup;
