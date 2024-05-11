"use client";
import { HTMLAttributes, use, useContext, useEffect, useState } from "react";
import DynamicInput from "../common/DynamicInput";
import Loader from "../common/Loader";
import { statusVariantClasses } from "@/config";
import { TStatus } from "@/types/types";
import { STATUS_TEXTS } from "@/lib/config";
import { useCheckSubdomainQuery } from "@/api/query/subdomain/query";
import { useDebounce } from "@/lib/hooks/debounce";
import DashContext from "@/store/dash-context";

const CheckForm: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { className } = props;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearch = useDebounce(searchQuery, 1000);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<TStatus>(STATUS_TEXTS.EMPTY);

  const { defaultDomainId } = useContext(DashContext);

  const {
    data: resp,
    refetch: refetchCheck,
    isError,
  } = useCheckSubdomainQuery(debouncedSearch, defaultDomainId);

  useEffect(() => {
    setStatus(STATUS_TEXTS.LOADING);
    setIsLoading(true);
    if (searchQuery.length === 0) {
      setStatus(STATUS_TEXTS.EMPTY);
    } else if (searchQuery.length < 3) {
      setStatus(STATUS_TEXTS.LENGTH);
    } else {
      if (isError) {
        setStatus(STATUS_TEXTS.ERROR);
        setIsLoading(false);
      }
      if (resp) {
        if (resp.isAvailable) {
          setStatus(STATUS_TEXTS.AVAILABLE);
        } else {
          setStatus(STATUS_TEXTS.UNAVAILABLE);
        }
      }
    }
    setIsLoading(false);
  }, [searchQuery, resp, isError]);

  useEffect(() => {
    if (debouncedSearch) {
      refetchCheck();
    }
  }, [debouncedSearch, refetchCheck]);

  return (
    <div className="flex flex-col m-4 p-4">
      <form
        className={`flex flex-row w-min mx-auto items-center justify-center ${className}`}
      >
        <DynamicInput
          type="text"
          placeholder="john"
          className="text-2xl text-center pr-2 py-1 placeholder:opacity-30 focus::outline focus:outline-2 focus:outline-gray-600"
          value={searchQuery}
          onSearch={setSearchQuery}
          enablePlaceholderAnimation={true}
        />
        <span className="text-2xl font-semibold ml-1">.servatom.xyz</span>
      </form>
      {status && (
        <div className="flex flex-row justify-center items-center text-xs font-normal mt-5 mx-auto">
          {isLoading && (
            <Loader
              size={10}
              color={statusVariantClasses[status.variant]}
              className={`mr-2`}
            />
          )}
          <span className={`errorText ${statusVariantClasses[status.variant]}`}>
            {status.text}
          </span>
        </div>
      )}
    </div>
  );
};

export default CheckForm;
