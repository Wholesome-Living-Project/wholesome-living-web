import {
  useAuthentication,
  UserType,
} from "@/providers/AuthenticationProvider";
import { User } from "firebase/auth";
import { useMemo } from "react";

export type FullUserType = {
  firebaseUser: User | null;
  user: UserType | null;
};
export const useUser: () => FullUserType = () => {
  const { currentFirebaseUser } = useAuthentication();
  const { user } = useAuthentication();

  return useMemo(() => {
    return { firebaseUser: currentFirebaseUser, user };
  }, [currentFirebaseUser, user]);
};
