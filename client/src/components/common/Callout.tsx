import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const Callout: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <span
      className={twMerge(
        "p-6 rounded-lg backdrop-blur-md bg-gray-500 bg-opacity-10 my-4",
        props.className
      )}
    >
      {props.children}
    </span>
  );
};

export default Callout;
