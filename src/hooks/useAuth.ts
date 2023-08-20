import { getCurrentUser, onAuthStateChanged } from "@/lib/auth";
import { useSyncExternalStore } from "react";

export const useAuth = () => {
  return useSyncExternalStore(onAuthStateChanged, getCurrentUser, () => null);
};
