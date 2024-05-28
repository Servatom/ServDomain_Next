import { planApi } from "@/api/api";
import { toast } from "@/components/ui/use-toast";
import { TSubscribePayload } from "@/types/types";
import { useMutation } from "react-query";

const useCreateSubscription = (onSuccess: () => void) =>
  useMutation({
    mutationKey: ["plan", "create"],
    mutationFn: (payload: TSubscribePayload) => planApi.createPlan(payload),
    onSuccess: () => {
      toast({
        title: "Subscription Created!",
        description: "Complete the payment to start using the plan.",
      });
      onSuccess();
      return;
    },
    onError: () => {
      toast({
        title: "Error :/",
        description:
          "There was an error creating subscription. Try again later.",
        variant: "destructive",
      });
    },
  });

export { useCreateSubscription };
