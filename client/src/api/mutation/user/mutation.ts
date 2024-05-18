import { userApi } from "@/api/api";
import { toast } from "@/components/ui/use-toast";
import { IContextType } from "@/store/auth-context";
import { useMutation } from "react-query";

const useUpdateWaitlistStatus = (status: boolean, authCtx: IContextType) =>
  useMutation({
    mutationKey: ["user", "waitlist"],
    mutationFn: () => userApi.updateWaitlistStatus(status),
    onSuccess: () => {
      authCtx.updateWaitlistStatus(status);
      toast({
        title: "You have joined the waitlist!",
        description:
          "You will be notified when the subdomain marketplace is live via email.",
      });
      return;
    },
  });

export { useUpdateWaitlistStatus };
