import { subdomainApi } from "@/api/api";
import { useQuery } from "react-query";

const useCheckSubdomainQuery = (searchQuery: string) =>
  useQuery({
    queryKey: ["subdomain", "check", searchQuery],
    queryFn: () => subdomainApi.checkSubdomain(searchQuery),
    enabled: false,
    cacheTime: 6000,
  });

export { useCheckSubdomainQuery };
