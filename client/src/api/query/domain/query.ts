import { domainApi } from "@/api/api";
import { useQuery } from "react-query";

const useGetDefaultDomain = () =>
  useQuery({
    queryKey: ["domain", "default"],
    queryFn: () => domainApi.getDefaultDomain(),
    enabled: true,
    cacheTime: 60000,
  });

export { useGetDefaultDomain };
