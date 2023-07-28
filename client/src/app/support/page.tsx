"use client";
import { Terms } from "@/config";
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

export default function Support() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-start p-12 text-gray-300">
      <h1 className="font-semibold text-3xl flex flex-row items-center">
        <IoArrowBackOutline
          className="text-gray-300 mr-6 cursor-pointer"
          onClick={() => {
            router.back();
          }}
        />
        Support
      </h1>
      <p className="p-4 ml-10 mt-4">
        For any queries or support, you can write at{" "}
        <a
          href="mailto:yash22arora+servatom@gmail.com"
          className="underline underline-offset-2 text-pink-500"
        >
          yash22arora+servatom@gmail.com
        </a>{" "}
        . Queries will be answered within 4 business days.
      </p>
    </div>
  );
}
