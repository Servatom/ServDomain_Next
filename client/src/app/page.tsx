import CheckForm from "@/components/Landing/CheckForm";
import Hero from "@/components/Landing/Hero";
import Pricing from "@/components/Landing/Pricing/Pricing";
import Waitlist from "@/components/Landing/Waitlist";
import Callout from "@/components/common/Callout";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WhyServdomain } from "@/lib/config";

export default function Landing() {
  return (
    <div className="w-full h-full min-h-screen flex flex-col text-gray-300 items-center px-12 sm:px-28 lg:px-40 landing">
      <Hero />
      <CheckForm className="mt-12" />
      <Waitlist />
      <Pricing />
      <Callout className="mb-12 w-full max-w-xxl">
        <Accordion className=" " type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-2xl font-semibold">
              Why do I need this 🤔 ?
            </AccordionTrigger>
            <AccordionContent className="text-base">
              There are a plenty of reasons why you need this. Here are a few:
              <div className="gap-6 flex flex-col my-4">
                {WhyServdomain.map((reason, index) => (
                  <div key={index} className="flex flex-row items-start gap-4">
                    <span className="text-xl">🙋‍♂️</span>
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
              <p>.</p>
              <p>.</p>
              <p>.</p>
              <p>.</p>
              <p>.</p>
              <p className="mt-8">
                The list goes on and on. But you get the point, right?
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Callout>

      <div className="flex flex-row items-center gap-3 mb-8 opacity-80 text-sm underline underline-offset-4">
        <Link href={"/privacy"} className="text-center ">
          Privacy Policy
        </Link>
        |
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
        {/* copyright */}© {new Date().getFullYear()} Servdomain. All rights
        reserved.
      </span>
    </div>
  );
}
