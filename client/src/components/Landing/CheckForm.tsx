"use client";
import { HTMLAttributes, useState } from "react";
import DynamicInput from "../common/DynamicInput";
import Loader from "../common/Loader";

export type TStatus = {
  variant: "success" | "error" | "neutral";
  text: string;
};

const statusVariantClasses = {
  success: "text-green-400",
  error: "text-red-400",
  neutral: "text-gray-400",
};

const CheckForm: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const { className } = props;
  const [subdomain, setSubdomain] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<TStatus>({
    variant: "neutral",
    text: "Enter value to check availability",
  });
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
        <span className="text-2xl font-semibold ml-1">.servatom.com</span>
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
