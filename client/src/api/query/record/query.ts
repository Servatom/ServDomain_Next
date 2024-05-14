import { domainApi, recordsApi } from "@/api/api";
import { useQuery } from "react-query";

const useGetUserRecords = () =>
  useQuery({
    queryKey: ["record", "all"],
    queryFn: () => recordsApi.getUserRecords(),
  });

export { useGetUserRecords };
