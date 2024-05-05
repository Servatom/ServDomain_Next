import axiosInstance from "@/axios";

const subdomainApi = {
  checkSubdomain: async (searchQuery: string) => {
    return axiosInstance
      .get(`/subdomain/check?subdomain=${searchQuery}`)
      .then((res) => res.data);
  },
};

export { subdomainApi };
