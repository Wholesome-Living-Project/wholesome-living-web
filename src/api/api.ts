import { getUserIdFromLocalStorage } from "@/helpers/localStorageHelper";
import axios from "axios";
import { Configuration } from "./openapi";

const openApiConfig = new Configuration();

let baseURL =
  process.env.NEXT_PUBLIC_BACKEND_ENV === "PROD"
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : `http://localhost:8080`;

export const axiosInstance = axios.create({
  baseURL,
  timeout: 15000,
  headers: { "Content-Type": "*/*" },
});

axiosInstance.interceptors.request.use((requestConfig) => {
  console.info(
    "calling URL:",
    requestConfig.method,
    (requestConfig.baseURL ?? "") + (requestConfig.url ?? "")
  );

  if (requestConfig.headers === undefined) {
    requestConfig.headers = {};
  }

  return requestConfig;
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // check if config.headers undefined -> config cannot be undefined / config.header can be undefined
    if (config.headers === undefined) {
      config.headers = {};
    }

    const currentUser = getUserIdFromLocalStorage();

    console.log(currentUser);
    if (currentUser) config.headers.userId = currentUser;

    return config;
  },
  (error) => {
    console.log("error happened");
    // Do something with request error
    return Promise.reject(error);
  }
);

// can be used in reducers to check status of requests
export enum RequestStatus {
  IDLE = "idle",
  LOADING = "loading",
  UPDATING = "updating",
  SUCCESS = "success",
  ERROR = "error",
}
