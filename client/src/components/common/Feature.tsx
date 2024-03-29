import { HTMLAttributes } from "react";

const Feature: React.FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => {
    return (
        <div className="flex flex-row w-max">
            <div className="flex-shrink-0">
                <svg
                    className="w-6 h-6 text-green-500"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                    ></path>
                </svg>
            </div>
            <p className="ml-2 text-base leading-6 text-gray-200">{children}</p>
        </div>
    );
};

export default Feature;
