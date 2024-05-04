import Button from "@/components/common/Button";
import Feature from "@/components/common/Feature";
import { IPricingCardProps } from "@/components/types";
import Link from "next/link";

const PriceCard: React.FC<IPricingCardProps> = ({ pricing }) => {
  let pricingFreq = "/day";
  switch (pricing.frequency) {
    case "Daily":
      pricingFreq = "/day";
      break;
    case "Monthly":
      pricingFreq = "/month";
      break;
    case "Yearly":
      pricingFreq = "/year";
      break;
    default:
      pricingFreq = "/one-time";
  }
  return (
    <div className="mb-4 overflow-hidden w-full basis-full md:min-w-[300px] lg:min-w-0  md:max-w-[calc(50%_-_32px)] xl:max-w-[calc(34%_-_32px)] rounded-lg shadow-lg bg-gray-800 bg-opacity-40 backdrop-blur-lg ">
      <div className="px-6 py-8  sm:p-10 sm:pb-6">
        <div className="flex justify-center">
          <span className="inline-flex px-4 py-1 text-sm font-semibold leading-5 tracking-wide uppercase rounded-full dark:text-white">
            {pricing.path === "vercel"
              ? "Vercel Starter Plan 🚀"
              : pricing.name + " Plan"}
          </span>
        </div>
        <div className="flex justify-center mt-4 text-5xl font-extrabold leading-none dark:text-white">
          <span className="ml-1 mr-3 text-base font-medium leading-8 text-gray-500 dark:text-gray-400">
            from
          </span>
          ₹{pricing.price}
          <span className="pt-6 ml-1 text-lg font-medium leading-8 text-gray-500 dark:text-gray-400">
            {pricingFreq}
          </span>
        </div>
      </div>
      <div className="px-6 pt-4 pb-8  sm:p-10 sm:pt-4">
        <ul>
          {pricing.features.map((feature, index) => (
            <li className="flex items-start justify-start mt-4" key={index}>
              <Feature>{feature}</Feature>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <Link href={`/api/plan?plan=${pricing.path}`}>
            <Button>
              <span>Start {pricing.name} plan</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
