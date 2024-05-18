import { recordsApi } from "@/api/api";
import { useQuery } from "react-query";

const useGetUserRecords = () =>
  useQuery({
    queryKey: ["record", "all"],
    queryFn: () => recordsApi.getUserRecords(),
    cacheTime: 1000 * 60 * 5,
  });

export { useGetUserRecords };
