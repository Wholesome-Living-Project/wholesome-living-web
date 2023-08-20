import { UserUserDB } from "@/api/openapi";
import { useAuthentication } from "@/providers/AuthenticationProvider";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type UserType = { firebaseUID: string } & UserUserDB;
type LoadingType = {
  isInitialLoading: boolean;
};

const LoadingContext = createContext<LoadingType>({} as LoadingType);

export const useLoadingGuard = () => useContext(LoadingContext);

const useProvideLoading = (): LoadingType => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { loading } = useAuthentication();

  // handles redirecting to app/home if user is logged and vice versa
  useEffect(() => {
    if (!loading) {
      setIsInitialLoading(false);
    }
  }, [loading]);

  return {
    isInitialLoading,
  };
};

export const LoadingGuardProvider = ({ children }: PropsWithChildren) => {
  const providedLoading = useProvideLoading();
  return (
    <LoadingContext.Provider value={providedLoading}>
      {children}
    </LoadingContext.Provider>
  );
};
