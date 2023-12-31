import { plans } from "@/config";
import PriceCard from "./PriceCard";
// grid md:grid-cols-2 grid-cols-1 xl:grid-cols-3
const Pricing: React.FC = () => {
  return (
    <div className="w-full md:max-w-2xl lg:max-w-6xl max-w-xs flex flex-row flex-wrap gap-8 justify-center items-center mt-12 mb-20 mx-auto">
      {plans.map((pricing) => (
        <PriceCard key={pricing.id} pricing={pricing} />
      ))}
    </div>
  );
};

export default Pricing;
