import axios from "axios";

const axiosBackendInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosFrontendInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosBackendInstance, axiosFrontendInstance };
