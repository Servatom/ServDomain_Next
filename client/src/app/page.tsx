import CheckForm from "@/components/Landing/CheckForm";
import Hero from "@/components/Landing/Hero";
import Pricing from "@/components/Landing/Pricing/Pricing";
import Callout from "@/components/common/Callout";
import Link from "next/link";

export default function Landing() {
  return (
    <div className="w-full h-full min-h-screen flex flex-col text-gray-300 items-center px-12 sm:px-28 lg:px-40 landing">
      <Hero />
      <CheckForm className="mt-12" />
      <Callout className="my-12 mb-12">
        <span className="font-semibold text-purple-400">✨ COMING SOON: </span>
        Subdomain{" "}
        <span className="underline underline-offset-4 decoration-purple-400">
          marketplace!
        </span>{" "}
        List your domain for subdomain rentals.
      </Callout>
      <Pricing />
      <div className="flex flex-row items-center gap-3 mb-8 opacity-80 text-sm underline underline-offset-4">
        <Link href={"/tnc"} className="text-center ">
          Terms and Conditions
        </Link>
        |
        <Link href={"/support"} className="text-center ">
          Support
        </Link>
      </div>
      <span className="pb-2 opacity-50 text-xs">
        Born at{" "}
        <a
          target="_blank"
          href="https://github.com/servatom"
          className="border-b border-spacing-4 border-purple-400"
        >
          Servatom
        </a>
      </span>
      <span className="pb-6 opacity-50 text-xs">
        {/* copyright */}© 2023 Servdomain. All rights reserved.
      </span>
    </div>
  );
}
