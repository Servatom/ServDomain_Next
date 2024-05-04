"use client";
import { HTMLAttributes, useEffect, useState } from "react";
import DynamicInput from "../common/DynamicInput";
import Loader from "../common/Loader";
import axios from "@/axios";
import { statusVariantClasses } from "@/config";
import { TStatus } from "@/types/types";
import { STATUS_TEXTS } from "@/lib/config";

const CheckForm: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { className } = props;
  const [subdomain, setSubdomain] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<TStatus>(STATUS_TEXTS.EMPTY);

  useEffect(() => {
    setIsLoading(false);
    if (subdomain.length === 0) {
      setStatus(STATUS_TEXTS.EMPTY);
    } else if (subdomain.length < 3) {
      setStatus(STATUS_TEXTS.LENGTH);
    } else {
      setIsLoading(true);
      setStatus(STATUS_TEXTS.LOADING);
      const timeoutId = setTimeout(() => {
        if (subdomain.length >= 3) {
          fetch(`/api/subdomain?subdomain=${subdomain}`)
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              if (res.isAvailable) {
                setStatus(STATUS_TEXTS.AVAILABLE);
              } else {
                setStatus(STATUS_TEXTS.UNAVAILABLE);
              }
              setIsLoading(false);
            })
            .catch((err) => {
              setStatus(STATUS_TEXTS.ERROR);
              setIsLoading(false);
            });
        }
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [subdomain]);

  return (
    <div className="flex flex-col m-4 p-4">
      <form
        className={`flex flex-row w-min mx-auto items-center justify-center ${className}`}
      >
        <DynamicInput
          type="text"
          placeholder="john"
          className="text-2xl text-center pr-2 py-1 placeholder:opacity-30 focus::outline focus:outline-2 focus:outline-gray-600"
          value={subdomain}
          onSearch={setSubdomain}
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
