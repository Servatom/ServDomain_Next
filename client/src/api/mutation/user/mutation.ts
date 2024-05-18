import { userApi } from "@/api/api";
import { toast } from "@/components/ui/use-toast";
import { IContextType } from "@/store/auth-context";
import { useMutation } from "react-query";

const useUpdateWaitlistStatus = (
  status: boolean,
  authCtx: IContextType,
  onSuccess: () => void
) =>
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
      onSuccess();
      return;
    },
    onError: () => {
      toast({
        title: "Error :/",
        description:
          "There was an error joining the waitlist. Try again later.",
        variant: "destructive",
      });
    },
  });

export { useUpdateWaitlistStatus };
