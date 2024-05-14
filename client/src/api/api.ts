import { axiosBackendInstance, axiosFrontendInstance } from "@/axios";
import { TCheckSubdomainResponse, TDefaultDomainResponse } from "./types";
import { TRecord } from "@/types/types";

const subdomainApi = {
  checkSubdomain: async (searchQuery: string, domainID: string) => {
    return await axiosBackendInstance
      .get<TCheckSubdomainResponse>(
        `/subdomain/check?subdomain=${searchQuery}&domainID=${domainID}`
      )
      .then((res) => res.data);
  },
};

const domainApi = {
  getDefaultDomain: async () => {
    return await axiosBackendInstance
      .get<TDefaultDomainResponse>(`/domain/default`)
      .then((res) => res.data);
  },
};

const recordsApi = {
  getUserRecords: async () => {
    return await axiosFrontendInstance
      .get<TRecord[]>("/records")
      .then((res) => {
        return res.data;
      });
  },
};

export { subdomainApi, domainApi, recordsApi };
