import { axiosBackendInstance } from "@/axios";
import { TCheckSubdomainResponse, TDefaultDomainResponse } from "./types";

const subdomainApi = {
  checkSubdomain: async (searchQuery: string, domainID: string) => {
    return axiosBackendInstance
      .get<TCheckSubdomainResponse>(
        `/subdomain/check?subdomain=${searchQuery}&domainID=${domainID}`
      )
      .then((res) => res.data);
  },
};

const domainApi = {
  getDefaultDomain: async () => {
    return axiosBackendInstance
      .get<TDefaultDomainResponse>(`/domain/default`)
      .then((res) => res.data);
  },
};

export { subdomainApi, domainApi };
