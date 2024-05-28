import { axiosBackendInstance, axiosFrontendInstance } from "@/lib/axios";
import { TCheckSubdomainResponse, TDefaultDomainResponse } from "./types";
import {
  TDBPlan,
  TPlanName,
  TRazorpaySubscriptionResponse,
  TRecord,
  TRecordType,
  TSubscribePayload,
} from "@/types/types";

const userApi = {
  updateWaitlistStatus: async (value: boolean) => {
    const userString = localStorage.getItem("user");
    if (!userString) return;
    const token = JSON.parse(userString).token;
    console.log(token);

    return await axiosBackendInstance
      .post(
        "/user/waitlist",
        { onWaitlist: value },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => res.data);
  },
};

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
  createRecord: async (payload: {
    name: string;
    content: string;
    type: TRecordType;
    domainID: string;
    planID: string;
    token: string;
  }) => {
    return await axiosBackendInstance.post<TRecord>("/record", payload, {
      headers: {
        Authorization: `Bearer ${payload.token}`,
      },
    });
  },
};

const planApi = {
  createPlan: async (payload: TSubscribePayload) => {
    return await axiosFrontendInstance.post<TRazorpaySubscriptionResponse>(
      "/subscribe",
      payload
    );
  },

  deletePlan: async (planID: string) => {
    return await axiosBackendInstance.delete(`/plan/${planID}`); // TODO: Add the delete plan route
  },
};

export { subdomainApi, domainApi, recordsApi, userApi, planApi };
