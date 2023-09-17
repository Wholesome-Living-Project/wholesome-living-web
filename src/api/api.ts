import axios from "axios";
import { Configuration, UsersApi } from "./openapi";

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

const getApi = (basePath: string) => {
  return {
    userApi: new UsersApi(openApiConfig, basePath, axiosInstance),
  };
};

// can be used in reducers to check status of requests
export enum RequestStatus {
  IDLE = "idle",
  LOADING = "loading",
  UPDATING = "updating",
  SUCCESS = "success",
  ERROR = "error",
}
