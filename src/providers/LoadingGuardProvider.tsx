import { useAuthentication } from "@/providers/AuthenticationProvider";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type LoadingType = {
  appIsReady: boolean;
};

const ADDITIONAL_LOADING_TIME = 500;

const LoadingContext = createContext<LoadingType>({} as LoadingType);

export const useLoadingGuard = () => useContext(LoadingContext);

type Props = {
  lightMode: boolean;
  setLightMode: (st: boolean) => void;
} & PropsWithChildren;
export const LoadingGuardProvider = ({
  lightMode,
  setLightMode,
  children,
}: Props) => {
  const { loading } = useAuthentication();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const lm = localStorage.getItem("lightMode");
    setLightMode(lm === "true");
    if (!loading) {
      setTimeout(() => setAppIsReady(true), ADDITIONAL_LOADING_TIME);
    }
  }, [loading, setLightMode]);

  return (
    <LoadingContext.Provider value={{ appIsReady }}>
      {appIsReady ? children : null}
    </LoadingContext.Provider>
  );
};
