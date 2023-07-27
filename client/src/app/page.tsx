import CheckForm from "@/components/Landing/CheckForm";
import Hero from "@/components/Landing/Hero";
import Pricing from "@/components/Landing/Pricing/Pricing";
import Callout from "@/components/common/Callout";

export default function Landing() {
  return (
    <div className="w-full h-full min-h-screen flex flex-col text-gray-300 items-center px-12 sm:px-28 lg:px-40">
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
    </div>
  );
}
