import { getUserIdFromLocalStorage } from "@/helpers/localStorageHelper";
import {
  useAuthentication,
  UserType,
} from "@/providers/AuthenticationProvider";
import { User } from "firebase/auth";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "./useAuth";

export type FullUserType = {
  firebaseUser: User | null;
  user: UserType | null;
  hasIdInLocalStorage: boolean;
};
export const useUser: () => FullUserType = () => {
  const firebaseUser = useAuth();
  const { user } = useAuthentication();

  const [hasIdInLocalStorage, setHasIdInLocalStorage] = useState(false);

  useEffect(() => {
    setHasIdInLocalStorage(Boolean(getUserIdFromLocalStorage()));
  }, [user]);

  return useMemo(() => {
    return { firebaseUser, user, hasIdInLocalStorage };
  }, [firebaseUser, hasIdInLocalStorage, user]);
};
