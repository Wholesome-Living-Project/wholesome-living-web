import { axiosInstance } from "@/api/api";
import {
  Configuration,
  ElevatorApi,
  FinanceApi,
  MeditationApi,
  ProgressApi,
  SettingsApi,
  UsersApi,
} from "./openapi";

const openApiConfig = new Configuration();

export const api = {
  userApi: new UsersApi(openApiConfig, "", axiosInstance),
  meditationApi: new MeditationApi(openApiConfig, "", axiosInstance),
  settingsApi: new SettingsApi(openApiConfig, "", axiosInstance),
  financeApi: new FinanceApi(openApiConfig, "", axiosInstance),
  levelApi: new ProgressApi(openApiConfig, "", axiosInstance),
  elevatorApi: new ElevatorApi(openApiConfig, "", axiosInstance),
};
