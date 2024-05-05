import { axiosBackendInstance } from "@/axios";

const subdomainApi = {
  checkSubdomain: async (searchQuery: string) => {
    return axiosBackendInstance
      .get(`/subdomain/check?subdomain=${searchQuery}`)
      .then((res) => res.data);
  },
};

export { subdomainApi };
