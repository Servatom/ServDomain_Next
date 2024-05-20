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
              <ul className="list-decimal list-inside gap-6 flex flex-col my-4">
                <li>
                  If you are a student or young tech enthusiast with less budget
                  but dont wanna restrict yourself to free subdomains like{" "}
                  <em className="underline underline-offset-4">
                    your-project-name-and-some-extra-gibberish-h8735d.versail.com.
                  </em>{" "}
                  (Yuck! Will you put that on your résume ??)
                </li>
                <li>
                  If you have a VM running on cloud, hosting your application
                  and you are done accessing it through its IP address. (I mean,
                  you can keep using{" "}
                  <em className="underline underline-offset-4">
                    11.147.208.49/api/hello
                  </em>{" "}
                  but{" "}
                  <em className="underline underline-offset-4 text-purple-400">
                    cool-api.servatom.xyz/api/hello
                  </em>{" "}
                  is so much cooler and easy to remember!)
                </li>
                <li>
                  If you only need a good-looking domain for a few weeks and
                  dont want to pay hefty annual amounts for it.
                </li>
                <li>
                  If you really love a domain, and wish if you could own at
                  least a part of it, if not all?
                </li>
                <li>
                  If you are new to networking and DNS and want to experiment
                  with CNAME / A / TXT records.
                </li>
              </ul>
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
