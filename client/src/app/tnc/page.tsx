"use client";
import { CancellationTerms, Terms } from "@/lib/config";
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

export default function TnC() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-start p-12 text-gray-300">
      <h1 className="font-semibold text-3xl my-3 flex flex-row items-center">
        <IoArrowBackOutline
          className="mr-6 cursor-pointer hidden sm:block"
          onClick={() => {
            router.back();
          }}
        />
        Terms and Conditions
      </h1>
      <p className="px-14 mb-4">
        These terms including annexures and links herein, apply to your use of
        www.domains.servatom.com, any other linked pages, API keys, features,
        content or application services (including but without limitation to any
        mobile application, mobile site services) (<strong>“ Website ”</strong>)
        owned and operated by Servatom LLP (<strong>“ Servatom ”</strong>), a
        company incorporated under the provisions of the Companies Act, 1956 and
        having its registered office at J-406, Block J, Purva Fountain Square,
        Marathahalli, Bangalore Bangalore KA IN 560037.
        <br />
        <br />
        <strong>“We”, “Us”, “Our”</strong> - shall refer to Servatom.{" "}
        <strong> “You”, “Yours”, “Yourself”</strong> - refers to any
        non-registered individual or registered user of Servdomain.
      </p>
      <ol className="list-decimal list-inside sm:px-14 ">
        {Terms.map((term, index) => {
          return (
            <li key={index} className="px-4 py-1 list-item -indent-4">
              {term}
            </li>
          );
        })}
      </ol>
      <h1
        className="font-semibold text-3xl mt-10 mb-3 sm:ml-14"
        id="cancellation"
      >
        Cancellation & Refund Policy{" "}
      </h1>
      <div className="sm:px-14">
        <p className="mb-4">
          Servatom believes in helping its customers as far as possible, and has
          therefore a liberal cancellation policy. Under this policy:
        </p>
        <ol className="list-decimal list-inside">
          {CancellationTerms.map((term, index) => {
            return (
              <li key={index} className="px-4 py-1 list-item -indent-4">
                {term}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
