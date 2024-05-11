import { subdomainApi } from "@/api/api";
import { useQuery } from "react-query";

const useCheckSubdomainQuery = (searchQuery: string, domainID: string) =>
  useQuery({
    queryKey: ["subdomain", "check", domainID, searchQuery],
    queryFn: () => subdomainApi.checkSubdomain(searchQuery, domainID),
    enabled: false,
    cacheTime: 6000,
  });

export { useCheckSubdomainQuery };
