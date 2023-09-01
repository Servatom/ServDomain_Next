"use client";

import AddForm from "@/components/Plan/AddForm";
import RecordsTable from "@/components/RecordTable/RecordTable";
import Feature from "@/components/common/Feature";
import { features, plans } from "@/config";
import AuthContext from "@/store/auth-context";
import { TPlanName } from "@/types/types";
import { useRouter } from "next/navigation";
import { Suspense, useContext, useEffect } from "react";

interface PageProps {
  params: {
    plan: string;
  };
}

const PlanPage: React.FC<PageProps> = ({ params }) => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  const validPlans = ["personal", "student", "annual"];
  let planTitle = params.plan + " Plan";
  planTitle = planTitle.charAt(0).toUpperCase() + planTitle.slice(1);

  useEffect(() => {
    if (!validPlans.includes(params.plan)) {
      router.replace("/404");
    }

    if (!authCtx.isLoggedIn) {
      router.replace("/login?redirect=/plan/" + params.plan);
    }
  }, [params.plan]);

  let plan = plans.find((plan) => plan.name.toLowerCase() === params.plan);
  if (!plan) {
    return <></>;
  }
  let priceFreq =
    plan.frequency === "Daily"
      ? "/day"
      : plan.frequency === "Monthly"
      ? "/month"
      : "/year";

  return (
    <div className="p-16 pb-6 text-gray-300">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col items-start w-full">
          <h1 className="font-bold text-5xl">{planTitle} </h1>
          <span className="font-semibold text-3xl text-gray-600 mt-2">
            @ ₹{plan.price}
            {priceFreq}
          </span>
        </div>
        <div className="flex flex-row justify-between items-center max-w-[1024px] w-full ml-16 mt-8">
          {features[params.plan as TPlanName].map((feature, index) => (
            <div key={index} className="flex flex-row text-xl">
              <Feature>{feature}</Feature>
            </div>
          ))}
        </div>
      </div>
      {/* <AddForm plan={params.plan} /> */}
      <AddForm />
      <div className="mt-20 w-full">
        <h1 className="text-xl font-medium text-center">Your Records</h1>
        {/* <RecordsTable allowActions /> */}
        <Suspense>
          <RecordsTable />
        </Suspense>
      </div>
    </div>
  );
};

export default PlanPage;
