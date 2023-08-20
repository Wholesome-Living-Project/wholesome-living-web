import { UUID_LOCAL_STORAGE_KEY } from "../lib/firebase";

export const getUserIdFromLocalStorage = (): string => {
  try {
    return localStorage.getItem(UUID_LOCAL_STORAGE_KEY) || "";
  } catch (e) {
    return "";
  }
};

export const setUserIdToLocalStorage = (userId: string): void => {
  return localStorage.setItem(UUID_LOCAL_STORAGE_KEY, userId);
};

export const clearUserIdFromLocalStorage = (): void => {
  localStorage.removeItem(UUID_LOCAL_STORAGE_KEY);
};
